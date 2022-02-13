// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isObj,
    isFunction,
    isInt,
    isStr,
    isNonEmptyStr,
    isArr,
    isMap,
    isBool,
    assert,
} from "../check";
import {
    sleep,
    strHasOnlyLowerNumeral,
    strHasOnlyLowerNumeralUnder,
    isWeaponCategoryStr,
    isTierStr,
    isWeaponEndlineTagStr,
    isEleStatStr,
    toNameFilterString,
} from "../common";
import {
    setDifference,
} from "../utils";

import {
    skillMap,
    skillMapShortIds,
    rampageSkillsMap,
    rampageSkillsMapShortIds,
    decosMap,
    weaponsMap as newWeaponsMap,
    armourMap,
    armourArrays,
} from "./generated_code";
import {
    petalaceMap,
} from "./hardcoded_data/petalace_data";

import {bowgunAmmoTypesMap      } from "./hardcoded_data/special_weapon_mechanics/bowguns";
import {specialSelectionTypesMap} from "./hardcoded_data/special_weapon_mechanics/general";

const WEAPON_LBG_PATH = "./data/weapons_lightbowgun.json";
const WEAPON_HBG_PATH = "./data/weapons_heavybowgun.json";


/* WEAPONS ******************************************************************************/

/*** Downloading and Validating Weapon Data (without referential integrity checking) ***/

// Common stuff
function validateWeaponData(weaponData) {
    assert(isWeaponCategoryStr(weaponData.category));

    assert(isInt(weaponData.rarity));

    assert(isWeaponEndlineTagStr(weaponData.endlineTag));

    assert(isNonEmptyStr(weaponData.name));

    assert(isNonEmptyStr(weaponData.treeName));
    
    assert(isObj(weaponData.filterHelpers));
    // Not going to further test the structure of this.

    assert(isInt(weaponData.attack) && (weaponData.attack > 0));

    assert(isInt(weaponData.affinity));
    assert((weaponData.affinity >= -100) && (weaponData.affinity <= 100));

    assert(isInt(weaponData.defense) && (weaponData.defense >= 0));

    assert(isArr(weaponData.decoSlots));
    assert((weaponData.decoSlots.length <= 3));
    for (const slotSize of weaponData.decoSlots) {
        assert(isInt(slotSize));
        assert((slotSize > 0 && slotSize <= 3));
    }

    assert(isObj(weaponData.eleStat));
    for (const [eleStatType, eleStatValue] of Object.entries(weaponData.eleStat)) {
        assert(isEleStatStr(eleStatType));
        assert(eleStatType !== "none");
        assert(eleStatValue > 0);
    }

    assert(isArr(weaponData.rampSkills), "Ramp skills must be an Array of Arrays.");
    assert((weaponData.rampSkills.length <= 6));
    for (const possibleRampSkills of weaponData.rampSkills) {
        assert(isArr(possibleRampSkills));
        assert((possibleRampSkills.length > 0), "Must have at least one possible ramp skill.");
        for (const [rampID, inheritedFromWeaponID] of possibleRampSkills) {
            assert(isNonEmptyStr(rampID));
            assert(isStr(inheritedFromWeaponID)); // Empty string is allowed
        }
    }
}

function validateWeaponDataBowguns(weaponData) {
    const so = weaponData.bowgunStats;

    assert(isInt(so.deviation.severity));
    assert((so.deviation.severity >= 0) && (so.deviation.severity <= 2));
    assert(isBool(so.deviation.left));
    assert(isBool(so.deviation.right));

    assert(isInt(so.recoil));
    assert((so.recoil >= 2) && (so.recoil <= 5)); // Recoil is in [0, 5], but base value hasn't been seen outside [2, 5]

    assert(isInt(so.reload));
    assert((so.reload >= 1) && (so.reload <= 6)); // Recoil is in [0, 8], but base value hasn't been seen outside [1, 6]

    // so.ammo keys have already been validated, so we'll just check other things
    for (const [k, v] of Object.entries(so.ammo)) {
        assert(isBool(v.available));
        assert(isInt(v.ammoCapacity) && (v.ammoCapacity >= 0));
        assert(!(v.available && (v.ammoCapacity === 0)), "Ammo can't be available while also having zero ammo capacity.");
    }
}

async function downloadCategoryRawWeaponData(category, path, op) {
    console.assert(isWeaponCategoryStr(category));
    isNonEmptyStr(path);
    isFunction(op);

    const res = await fetch(path);
    const rawData = await res.json();

    // Used for issuing useful warnings
    //const huntingHornSeenSongs = new Set();

    const finalData = new Map();
    for (const [treeName, treeData] of Object.entries(rawData)) {
        assert(isNonEmptyStr(treeName), "Tree name must be a non-empty string.");
        for (const [weaponID, weaponData] of Object.entries(treeData)) {
            // Merge in data
            weaponData.category = category;
            weaponData.id = weaponID;
            weaponData.treeName = treeName;
            // Merge in helper strings for filter functions
            weaponData.filterHelpers = {};
            weaponData.filterHelpers.nameLower = toNameFilterString(weaponData.name);
            weaponData.filterHelpers.treeNameLower = toNameFilterString(treeName);

            // Convert the eleStat object to a map because it's easier to work with
            weaponData.eleStat = new Map(Object.entries(weaponData.eleStat));

            // Add bowgun mechanics
            if ((weaponData.category === "lightbowgun") || (weaponData.category === "heavybowgun")) {
                const newAmmoObj = {};
                for (const [k, v] of Object.entries(weaponData.bowgunStats.ammo)) {
                    assert(v.length > 0);

                    function op(_ammoTypeKey, _available, _capacity) {
                        const ammoRO = bowgunAmmoTypesMap.get(_ammoTypeKey);
                        assert(ammoRO !== undefined); // Check if the ammo type is valid
                        newAmmoObj[_ammoTypeKey] = {
                            ammoRO: ammoRO, // Merge in
                            available: _available,
                            ammoCapacity: _capacity,
                        };
                    }

                    if (v.length === 1) {
                        assert(v[0].length === 2);
                        op(k, v[0][0], v[0][1]);
                    } else {
                        for (const [i, [available, ammoCapacity]] of v.entries()) {
                            op(k + "_" + String(i + 1), available, ammoCapacity);
                        }
                    }
                }
                // Knowing all ammo types were found, this should complete the check for equality
                // between the hardcoded set of ammo type keys and the keys found here.
                assert(Object.keys(newAmmoObj).length === bowgunAmmoTypesMap.size);

                weaponData.bowgunStats.ammo = newAmmoObj;
            }

            // Validate Common Data
            validateWeaponData(weaponData);
            // Validate Specific Data
            op(weaponData);

            // Validate Key
            assert(isNonEmptyStr(weaponData.id), "Weapon ID must be a non-empty string.");
            assert(weaponData.id != "0", "Weapon ID must not be 0 since that is a reserved ID.");
            assert(!finalData.has(weaponData.id), "Weapon ID already exists. ID: " + weaponData.id);
            // Insert Key and Value
            finalData.set(weaponID, weaponData);
        }
    }
    return finalData;
}

async function downloadAllRawWeaponData() {
    const validateBowgun       = (weaponData) => {validateWeaponDataBowguns(weaponData);};

    const lbgDataFut = downloadCategoryRawWeaponData("lightbowgun",    WEAPON_LBG_PATH, validateBowgun     );
    const hbgDataFut = downloadCategoryRawWeaponData("heavybowgun",    WEAPON_HBG_PATH, validateBowgun     );
    return {
            greatsword:     newWeaponsMap.greatsword,
            longsword:      newWeaponsMap.longsword,
            swordandshield: newWeaponsMap.swordandshield,
            dualblades:     newWeaponsMap.dualblades,
            lance:          newWeaponsMap.lance,
            gunlance:       newWeaponsMap.gunlance,
            hammer:         newWeaponsMap.hammer,
            huntinghorn:    newWeaponsMap.huntinghorn,
            switchaxe:      newWeaponsMap.switchaxe,
            chargeblade:    newWeaponsMap.chargeblade,
            insectglaive:   newWeaponsMap.insectglaive,
            lightbowgun:    await lbgDataFut,
            heavybowgun:    await hbgDataFut,
            bow:            newWeaponsMap.bow,
        };
}

/*** Joining Data ***/

function joinRampSkillObjsToWeaponData(weaponData) {
    assert(isObj(weaponData));
    //assert(isMap(rampageSkillsMap)); // Commented because it broke
    for (const [categoryID, weaponDataMap] of Object.entries(weaponData)) {
        if (!["lightbowgun", "heavybowgun"].includes(categoryID)) continue; // Bandaid for refactoring
        for (const [weaponID, weaponDataObj] of weaponDataMap.entries()) {
            const newRampArray = [];
            for (const rampSkillRampArray of weaponDataObj.rampSkills) {
                const newRampSubArray = [];
                for (const [rampSkillID, inheritedFromWeaponID] of rampSkillRampArray) {
                    assert(
                        rampageSkillsMap.has(rampSkillID),
                        "Invalid rampage skill ID '" + rampSkillID + "' from " + categoryID + " " + weaponID
                    );

                    const inheritedFromWeaponRO = (()=>{
                            if (inheritedFromWeaponID === "") {
                                return null;
                            } else {
                                const ret = weaponDataMap.get(inheritedFromWeaponID);
                                assert(ret !== undefined);
                                return ret;
                            }
                        })();

                    const newRampEntry = [
                        rampageSkillsMap.get(rampSkillID),
                        inheritedFromWeaponRO,
                    ];
                    newRampSubArray.push(newRampEntry);
                }
                newRampArray.push(newRampSubArray);
            }
            weaponDataObj.rampSkills = newRampArray;
        }
    }
}


/* GameData CLASS ***********************************************************************/


class GameData {

    static _makeWeaponsArray(weaponsMap) {
        let ret = [];
        for (const [category, dataMap] of Object.entries(weaponsMap)) {
            console.assert(isWeaponCategoryStr(category));
            ret = ret.concat(Array.from(dataMap.values()));
        }
        return ret;
    }

    // Builder Function
    static async downloadRawData() {
        //await sleep(3000); // For testing

        // Start all downloads
        // Also verify data, except we verify referential integrity later.
        const weaponDataFut = downloadAllRawWeaponData();

        const weaponsMap = await weaponDataFut;

        const obj = new GameData("hello smish");
        obj.readonly = {
            skills: {
                array: Array.from(skillMap.values()),
                longIdsMap: skillMap,
                shortIdsMap: skillMapShortIds,
            },
            weaponRampSkills: {
                longIdsMap: rampageSkillsMap,
                shortIdsMap: rampageSkillsMapShortIds,
            },
            weaponMechanics: {
                bowguns: {
                    ammoTypesMap: bowgunAmmoTypesMap,
                }
            },
            weaponSpecialSelections: {
                array: Array.from(specialSelectionTypesMap.values()),
                map: specialSelectionTypesMap,
            },
            weapons: {
                array: GameData._makeWeaponsArray(weaponsMap),
                map: weaponsMap,
            },
            armour: {
                arrays: armourArrays,
                map: armourMap,
            },
            petalaces: {
                array: Array.from(petalaceMap.values()),
                map: petalaceMap,
            },
            decorations: {
                array: Array.from(decosMap.values()),
                map: decosMap,
            },
        };

        // Replace all weapon ramp skill IDs with ramp skill objects
        joinRampSkillObjsToWeaponData(weaponsMap);

        return obj;
    }

    constructor(magic_phrase) {
        if (magic_phrase != "hello smish") {
            throw new Error("Do not instantiate directly.");
        }
    }

    getDefaultWeapon() {
        return this.readonly.weapons.map.greatsword.get("1f");
    }
}

// Convenience
async function downloadRawData() {
    return GameData.downloadRawData();
}

export {
    GameData,
    downloadRawData,
};

