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
    assert,
} from "../check.js";
import {
    sleep,
    strHasOnlyLowerNumeral,
    strHasOnlyLowerNumeralUnder,
    isWeaponCategoryStr,
    isTierStr,
    isArmourSlotStr,
    isWeaponEndlineTagStr,
    isEleStatStr,
    toNameFilterString,
} from "../common.js";
import {
    setDifference,
} from "../utils.js";

import {getImgPath} from "../images.js";
import {
    skillMap,
    skillMapShortIds,
} from "./hardcoded_data/skills.js";
import {
    rampageSkillsMap,
    rampageSkillsMapShortIds,
} from "./hardcoded_data/rampage_skills.js";
import {
    petalaceMap,
} from "./hardcoded_data/petalace_data.js";
import {
    huntingHornSongsMap,
    switchAxePhialTypesMap,
    chargeBladePhialTypesMap,
    insectGlaiveKinsectsMap,
    insectGlaiveKinsectTypesMap,
    insectGlaiveKinsectBonusesMap,
} from "./hardcoded_data/special_weapon_mechanics.js";

const WEAPON_GS_PATH  = "./data/weapons_greatsword.json";
const WEAPON_LS_PATH  = "./data/weapons_longsword.json";
const WEAPON_SNS_PATH = "./data/weapons_swordandshield.json";
const WEAPON_DB_PATH  = "./data/weapons_dualblades.json";
const WEAPON_L_PATH   = "./data/weapons_lance.json";
const WEAPON_GL_PATH  = "./data/weapons_gunlance.json";
const WEAPON_H_PATH   = "./data/weapons_hammer.json";
const WEAPON_HH_PATH  = "./data/weapons_huntinghorn.json";
const WEAPON_SA_PATH  = "./data/weapons_switchaxe.json";
const WEAPON_CB_PATH  = "./data/weapons_chargeblade.json";
const WEAPON_IG_PATH  = "./data/weapons_insectglaive.json";
const WEAPON_LBG_PATH = "./data/weapons_lightbowgun.json";
const WEAPON_HBG_PATH = "./data/weapons_heavybowgun.json";
const WEAPON_BOW_PATH = "./data/weapons_bow.json";

const ARMOUR_PATH = "./data/armour.json";
const ARMOUR_NAMING_SCHEMES_PATH = "./data/armour_naming_schemes.json";

const DECORATIONS_PATH = "./data/decorations.json";


/* WEAPONS ******************************************************************************/

function weaponAndRarityToIconImgPath(weaponType, rarity) {
    assert(isWeaponCategoryStr(weaponType));
    assert(isInt(rarity) && (rarity > 0) && (rarity <= 7));
    return getImgPath("weapon_" + weaponType + "_r" + parseInt(rarity));
}

/*** Downloading and Validating Weapon Data (without referential integrity checking) ***/

// Common stuff
function validateWeaponData(weaponData) {
    assert(isWeaponCategoryStr(weaponData.category));

    assert(isInt(weaponData.rarity));

    assert(isWeaponEndlineTagStr(weaponData.endlineTag));

    assert(isNonEmptyStr(weaponData.name));

    assert(isNonEmptyStr(weaponData.treeName));

    assert(isNonEmptyStr(weaponData.iconImgPath));
    
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

function validateWeaponDataSharpness(weaponData) {
    // Only weapons with sharpness bars
    function op(values) {
        assert(isArr(values), "Maximum sharpness must be an Array.");
        assert((values.length == 6), "Maximum sharpness must have 6 numbers (each corresponding to a colour). " + weaponData.category + " " + weaponData.id);
        // First element is red sharpness. Last element is white sharpness.

        let hitSum = 0;
        let prevHits = 1;
        for (const hits of values) {
            assert(isInt(hits) && (hits >= 0), "Hits must be an integer >= 0.");
            //assert((hits == 0) || (prevHits > 0), "Hits must not skip a colour."); // This check is wrong.
            hitSum += hits;
            prevHits = hits;
        }
        assert((hitSum > 100), "Hits must add up to at least 100."); // If we find cases where this is wrong, remove this check.
    }
    op(weaponData.baseSharpness);
    op(weaponData.maxSharpness);
}

function validateWeaponDataHuntingHorn(weaponData) {
    assert(isObj(weaponData.huntinghornSongs));
    //assert(isNonEmptyStr(weaponData.huntinghornSongs.x_x));
    //assert(isNonEmptyStr(weaponData.huntinghornSongs.a_a));
    //assert(isNonEmptyStr(weaponData.huntinghornSongs.xa_xa));
}

function validateWeaponDataChargeBlade(weaponData) {
    const cbStats = weaponData.chargebladeStats;
    assert(isInt(kinsectLevel) && (kinsectLevel > 0) && (kinsectLevel <= 8));
}

function validateWeaponDataInsectGlaive(weaponData) {
    const kinsectLevel = weaponData.insectglaiveStats.kinsectLevel;
    assert(isInt(kinsectLevel) && (kinsectLevel > 0) && (kinsectLevel <= 8));
}

async function downloadCategoryRawWeaponData(category, path, op) {
    console.assert(isWeaponCategoryStr(category));
    isNonEmptyStr(path);
    isFunction(op);

    const res = await fetch(path);
    const rawData = await res.json();

    // Used for issuing useful warnings
    const huntingHornSeenSongs = new Set();

    const finalData = new Map();
    for (const [treeName, treeData] of Object.entries(rawData)) {
        assert(isNonEmptyStr(treeName), "Tree name must be a non-empty string.");
        for (const [weaponID, weaponData] of Object.entries(treeData)) {
            // Merge in data
            weaponData.category = category;
            weaponData.id = weaponID;
            weaponData.treeName = treeName;
            weaponData.iconImgPath = weaponAndRarityToIconImgPath(category, weaponData.rarity);
            // Merge in helper strings for filter functions
            weaponData.filterHelpers = {};
            weaponData.filterHelpers.nameLower = toNameFilterString(weaponData.name);
            weaponData.filterHelpers.treeNameLower = toNameFilterString(treeName);

            // Convert the eleStat object to a map because it's easier to work with
            weaponData.eleStat = new Map(Object.entries(weaponData.eleStat));

            // Add Hunting Horn mechanics
            if (weaponData.category === "huntinghorn") {
                function getSong(songID) {
                    const _ret = huntingHornSongsMap.get(songID);
                    assert(_ret !== undefined, "Unknown song ID: " + String(songID));
                    return _ret;
                }
                const tmp = new Map([
                    ["x", getSong(weaponData.huntinghornSongs["x_x"])],
                    ["a", getSong(weaponData.huntinghornSongs["a_a"])],
                    ["xa", getSong(weaponData.huntinghornSongs["xa_xa"])],
                ]);
                huntingHornSeenSongs.add(tmp.get("x").id);
                huntingHornSeenSongs.add(tmp.get("a").id);
                huntingHornSeenSongs.add(tmp.get("xa").id);
                weaponData.huntinghornSongs = tmp;
            }

            // Add Switch Axe mechanics
            if (weaponData.category === "switchaxe") {
                const phialTypeID = weaponData.switchaxeStats.phialType;
                const phialTypeRO = switchAxePhialTypesMap.get(phialTypeID);
                assert(phialTypeRO !== undefined, "Unknown phial type ID: " + String(phialTypeID));
                weaponData.switchaxeStats.phialType = phialTypeRO;
            }

            // Add Charge Blade mechanics
            if (weaponData.category === "chargeblade") {
                const phialTypeID = weaponData.chargebladeStats.phialType;
                const phialTypeRO = chargeBladePhialTypesMap.get(phialTypeID);
                assert(phialTypeRO !== undefined, "Unknown phial type ID: " + String(phialTypeID));
                weaponData.chargebladeStats.phialType = phialTypeRO;
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

    if (category === "huntinghorn") {
        assert(huntingHornSeenSongs.size <= huntingHornSongsMap.size);
        const unseenSongs = setDifference(new Set(huntingHornSongsMap.keys()), huntingHornSeenSongs);
        if (unseenSongs.size !== 0) {
            for (const songID of unseenSongs) {
                console.warn("Song ID present in database but not used on a weapon: " + String(songID));
            }
        }
    } else {
        assert(huntingHornSeenSongs.size === 0);
    }

    return finalData;
}

async function downloadAllRawWeaponData() {
    const validateSimpleMelee  = (weaponData) => {validateWeaponDataSharpness(weaponData);};
    const validateHH           = (weaponData) => {validateWeaponDataSharpness(weaponData);
                                                  validateWeaponDataHuntingHorn(weaponData);};
    const validateIG           = (weaponData) => {validateWeaponDataSharpness(weaponData);
                                                  validateWeaponDataInsectGlaive(weaponData);};
    const validateSimpleRanged = (weaponData) => {};

    const gsDataFut  = downloadCategoryRawWeaponData("greatsword",     WEAPON_GS_PATH,  validateSimpleMelee );
    const lsDataFut  = downloadCategoryRawWeaponData("longsword",      WEAPON_LS_PATH,  validateSimpleMelee );
    const snsDataFut = downloadCategoryRawWeaponData("swordandshield", WEAPON_SNS_PATH, validateSimpleMelee );
    const dbDataFut  = downloadCategoryRawWeaponData("dualblades",     WEAPON_DB_PATH,  validateSimpleMelee );
    const lDataFut   = downloadCategoryRawWeaponData("lance",          WEAPON_L_PATH,   validateSimpleMelee );
    const glDataFut  = downloadCategoryRawWeaponData("gunlance",       WEAPON_GL_PATH,  validateSimpleMelee );
    const hDataFut   = downloadCategoryRawWeaponData("hammer",         WEAPON_H_PATH,   validateSimpleMelee );
    const hhDataFut  = downloadCategoryRawWeaponData("huntinghorn",    WEAPON_HH_PATH,  validateHH          );
    const saDataFut  = downloadCategoryRawWeaponData("switchaxe",      WEAPON_SA_PATH,  validateSimpleMelee );
    const cbDataFut  = downloadCategoryRawWeaponData("chargeblade",    WEAPON_CB_PATH,  validateSimpleMelee );
    const igDataFut  = downloadCategoryRawWeaponData("insectglaive",   WEAPON_IG_PATH,  validateIG          );
    const lbgDataFut = downloadCategoryRawWeaponData("lightbowgun",    WEAPON_LBG_PATH, validateSimpleRanged);
    const hbgDataFut = downloadCategoryRawWeaponData("heavybowgun",    WEAPON_HBG_PATH, validateSimpleRanged);
    const bowDataFut = downloadCategoryRawWeaponData("bow",            WEAPON_BOW_PATH, validateSimpleRanged);
    return {
            greatsword:     await gsDataFut,
            longsword:      await lsDataFut,
            swordandshield: await snsDataFut,
            dualblades:     await dbDataFut,
            lance:          await lDataFut,
            gunlance:       await glDataFut,
            hammer:         await hDataFut,
            huntinghorn:    await hhDataFut,
            switchaxe:      await saDataFut,
            chargeblade:    await cbDataFut,
            insectglaive:   await igDataFut,
            lightbowgun:    await lbgDataFut,
            heavybowgun:    await hbgDataFut,
            bow:            await bowDataFut,
        };
}

/*** Joining Data ***/

function joinRampSkillObjsToWeaponData(weaponData) {
    assert(isObj(weaponData));
    assert(isMap(rampageSkillsMap));
    for (const [categoryID, weaponDataMap] of Object.entries(weaponData)) {
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


/* ARMOUR *******************************************************************************/

function armourSlotAndRarityToIconImgPath(armourSlot, rarity) {
    assert(isArmourSlotStr(armourSlot));
    assert(isInt(rarity) && (rarity > 0) && (rarity <= 7));
    return getImgPath(armourSlot + "_r" + parseInt(rarity));
}

function validateArmourNamingSchemes(namingSchemesData) {
    for (const [armourNamingSchemeID, armourNamingSchemeObj] of Object.entries(namingSchemesData)) {
        assert(
            isNonEmptyStr(armourNamingSchemeID),
            "Armour naming scheme IDs must be non-empty strings. Object used: " + armourNamingSchemeID
        );
        assert(
            isArr(armourNamingSchemeObj),
            "Armour naming schemes must be arrays. Scheme ID: " + armourNamingSchemeID
        );
        
        assert(
            strHasOnlyLowerNumeralUnder(armourNamingSchemeID),
            "Invalid armour naming scheme name. Scheme ID: " + armourNamingSchemeID
        );
        assert(
            (armourNamingSchemeObj.length === 5),
            "Armour naming schemes must be arrays of 5 strings. Scheme ID: " + armourNamingSchemeID
        );
        
        for (const s of armourNamingSchemeObj) {
            assert(isNonEmptyStr(s), "Armour naming must be a non-empty string. Scheme ID: " + armourNamingSchemeID);
        }
    }
}

function validateFinalArmourPieceObject(armourPieceObj) {
    const errorIDString = "Error with armour set ID: " + String(armourPieceObj.setID);

    // Set ID should already be validated by now.
    // Slot ID should also be valid.

    assert(isNonEmptyStr(armourPieceObj.tierID), errorIDString);
    assert(isTierStr(armourPieceObj.tierID), errorIDString);

    assert(isNonEmptyStr(armourPieceObj.setName), errorIDString);
    assert(isNonEmptyStr(armourPieceObj.name), errorIDString);

    assert(isArr(armourPieceObj.decorationSlots), errorIDString);
    assert(armourPieceObj.decorationSlots.length <= 3, errorIDString);
    for (const slotSize of armourPieceObj.decorationSlots) {
        assert(isInt(slotSize), errorIDString);
        assert((slotSize > 0) && (slotSize <= 3), errorIDString);
    }

    assert(isObj(armourPieceObj.skills), errorIDString);
    for (const [skillLongID, skillLevel] of Object.entries(armourPieceObj.skills)) {
        assert(isNonEmptyStr(skillLongID), errorIDString);
        assert(strHasOnlyLowerNumeralUnder(skillLongID), errorIDString);

        assert(isInt(skillLevel), errorIDString);
        assert(skillLevel > 0, errorIDString);
    }

    assert(isInt(armourPieceObj.defenseAtLevel1), errorIDString);
    assert(armourPieceObj.defenseAtLevel1 > 0, errorIDString);

    assert(isInt(armourPieceObj.fireRes), errorIDString);
    assert(isInt(armourPieceObj.waterRes), errorIDString);
    assert(isInt(armourPieceObj.thunderRes), errorIDString);
    assert(isInt(armourPieceObj.iceRes), errorIDString);
    assert(isInt(armourPieceObj.dragonRes), errorIDString);
}

async function downloadAllRawArmourData() {
    const namingSchemesFut = fetch(ARMOUR_NAMING_SCHEMES_PATH);
    const armourFut = fetch(ARMOUR_PATH);

    const namingSchemesRawData = await (await namingSchemesFut).json();
    const armourRawData = await (await armourFut).json();

    assert(isArr(armourRawData));
    validateArmourNamingSchemes(namingSchemesRawData);

    const expectedSlotIDs = ["head", "chest", "arms", "waist", "legs"];

    const finalDataMap = new Map(); // This is a two-layer map: {set ID string: {piece ID string: data object}}
    const finalDataArrays = { head:[], chest:[], arms:[], waist:[], legs:[] };

    for (const [armourSetID, armourRawDataObj] of armourRawData) {
        const namingScheme = namingSchemesRawData[armourRawDataObj.namingScheme];
        const errorIDString = "Error with armour set ID: " + String(armourSetID);

        assert(isInt(armourSetID) && (armourSetID > 0), errorIDString);
        assert(isObj(armourRawDataObj), errorIDString);

        assert(isTierStr(armourRawDataObj.tier), errorIDString);
        assert(isInt(armourRawDataObj.rarity), errorIDString);
        assert(isNonEmptyStr(armourRawDataObj.setName), errorIDString);
        assert(isStr(armourRawDataObj.searchHint), errorIDString); // Can be empty string

        if (armourRawDataObj.prefix instanceof Array) {
            assert(armourRawDataObj.prefix.length === 5, errorIDString);
            for (const prefix of armourRawDataObj.prefix) {
                assert(isNonEmptyStr(prefix), errorIDString);
            }
        } else {
            assert(isStr(armourRawDataObj.prefix), errorIDString);
        }
        assert(isStr(armourRawDataObj.suffix), errorIDString);
        assert(isNonEmptyStr(armourRawDataObj.namingScheme), errorIDString);

        assert(isObj(armourRawDataObj.pieces), errorIDString);
        assert(isObj(armourRawDataObj.defenses), errorIDString);

        //

        assert((armourRawDataObj.rarity > 0) && (armourRawDataObj.rarity <= 7), errorIDString);
        assert(Object.keys(armourRawDataObj.pieces).length === 5, errorIDString);
        assert(Object.keys(armourRawDataObj.defenses).length === 6, errorIDString);

        // Must never be a duplicate
        assert(!finalDataMap.has(armourSetID), errorIDString);

        finalDataMap.set(armourSetID, new Map());

        for (const [i, slotID] of expectedSlotIDs.entries()) {
            const p = armourRawDataObj.pieces[slotID];
            if (p !== null) {
                assert(isArr(p), errorIDString);
                assert(p.length === 2, errorIDString);

                let prefix = (armourRawDataObj.prefix instanceof Array) ? armourRawDataObj.prefix[i] : armourRawDataObj.prefix;
                prefix = (prefix.length == 0) ? "" : prefix + " ";

                const suffix = (armourRawDataObj.suffix == "") ? "" : " " + armourRawDataObj.suffix;

                // Create the final data object without verifying first
                const newPiece = {
                    rarity: armourRawDataObj.rarity,
                    tierID: armourRawDataObj.tier,
                    setID: armourSetID,
                    setName: armourRawDataObj.setName,
                    slotID: slotID,
                    name: prefix + namingScheme[i] + suffix,
                    decorationSlots: p[0],
                    skills: p[1],

                    defenseAtLevel1: armourRawDataObj.defenses["defLvl1"],

                    fireRes: armourRawDataObj.defenses["f"],
                    waterRes: armourRawDataObj.defenses["w"],
                    thunderRes: armourRawDataObj.defenses["t"],
                    iceRes: armourRawDataObj.defenses["i"],
                    dragonRes: armourRawDataObj.defenses["d"],

                    filterHelpers: {}, // Populate after

                    iconImgPath: armourSlotAndRarityToIconImgPath(slotID, armourRawDataObj.rarity),
                };
                newPiece.filterHelpers.nameLower = toNameFilterString(newPiece.name);
                newPiece.filterHelpers.setNameLower = toNameFilterString(newPiece.setName);
                newPiece.filterHelpers.hintStrLower = toNameFilterString(armourRawDataObj.searchHint);

                // Now, we verify the structure
                validateFinalArmourPieceObject(newPiece);

                finalDataMap.get(armourSetID).set(slotID, newPiece);
                finalDataArrays[slotID].push(newPiece);
            }
        }

    }

    return [finalDataMap, finalDataArrays];
}

/*** Joining Data ***/

function joinSkillObjsToArmourData(armourData, skillDataLongIdMap) {
    assert(isMap(armourData));
    assert(isMap(skillDataLongIdMap));
    for (const [armourSetID, armourSetMap] of armourData.entries()) {
        for (const [slotID, armourPieceObj] of armourSetMap.entries()) {
            const newSkillArray = [];
            for (const [skillLongID, skillLevel] of Object.entries(armourPieceObj.skills)) {
                assert(skillDataLongIdMap.has(skillLongID), "Missing skill long ID: " + skillLongID);
                newSkillArray.push([skillDataLongIdMap.get(skillLongID), skillLevel]);
            }
            armourPieceObj.skills = newSkillArray; // Overwrite old object with new array
        }
    }
}


/* DECORATIONS **************************************************************************/


async function downloadAllRawDecorationsData() {
    const res = await fetch(DECORATIONS_PATH);
    const rawData = await res.json();

    assert(isArr(rawData));

    const ret = new Map();
    for (const [decoID, decoObj] of rawData) {
        assert(isInt(decoID) && (decoID > 0));
        assert(isObj(decoObj));
        
        assert(isNonEmptyStr(decoObj.name));
        assert(isInt(decoObj.slotSize) && (decoObj.slotSize > 0) && (decoObj.slotSize <= 3));
        assert(isInt(decoObj.rarity) && (decoObj.rarity >= 4) && (decoObj.rarity <= 7));
        assert(isObj(decoObj.skills));

        assert(isNonEmptyStr(decoObj.icon));

        for (const [skillLongID, skillLevel] of Object.entries(decoObj.skills)) {
            assert(isNonEmptyStr(skillLongID) && strHasOnlyLowerNumeralUnder(skillLongID));
            assert(skillLevel === 1);
        }

        const finalDecoObj = {
                id: decoID,
                name: decoObj.name + " Jewel " + parseInt(decoObj.slotSize),
                slotSize: decoObj.slotSize,
                rarity: decoObj.rarity,
                skills: decoObj.skills,

                icon: decoObj.icon,

                filterHelpers: {}, // Populate after
            };
        finalDecoObj.filterHelpers.nameLower = toNameFilterString(decoObj.name);

        // Check for duplicates, then add
        assert(!ret.has(decoID));
        ret.set(decoID, finalDecoObj);
    }

    return ret;
}

/*** Joining Data ***/

function joinSkillObjsToDecoData(decoData, skillDataLongIdMap) {
    assert(isMap(decoData));
    assert(isMap(skillDataLongIdMap));
    for (const [decoID, decoItemData] of decoData.entries()) {
        const newSkillsArray = [];
        for (const [skillLongID, skillLevel] of Object.entries(decoItemData.skills)) {
            assert(skillDataLongIdMap.has(skillLongID), "Missing skill long ID: " + skillLongID);
            newSkillsArray.push([skillDataLongIdMap.get(skillLongID), skillLevel]);
        }
        decoItemData.skills = newSkillsArray;
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
        const armourDataFut = downloadAllRawArmourData();
        const decosDataFut = downloadAllRawDecorationsData();

        const weaponsMap = await weaponDataFut;
        const [armourMap, armourArrays] = await armourDataFut;
        const decosMap = await decosDataFut;

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
            huntingHornSongs: {
                map: huntingHornSongsMap,
            },
            switchAxePhialTypes: {
                map: switchAxePhialTypesMap,
            },
            chargeBladePhialTypes: {
                map: chargeBladePhialTypesMap,
            },
            insectGlaiveKinsects: {
                map: insectGlaiveKinsectsMap,

                kinsectTypesMap: insectGlaiveKinsectTypesMap,
                bonusesMap: insectGlaiveKinsectBonusesMap,
            },
        };

        // Replace all weapon ramp skill IDs with ramp skill objects
        joinRampSkillObjsToWeaponData(weaponsMap);
        // Replace all armour skill long IDs with skill objects
        joinSkillObjsToArmourData(armourMap, obj.readonly.skills.longIdsMap);
        // Replace all decoration skill long IDs with skill objects
        joinSkillObjsToDecoData(decosMap, obj.readonly.skills.longIdsMap);

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

