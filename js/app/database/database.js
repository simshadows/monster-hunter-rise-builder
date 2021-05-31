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
    isWeaponEndlineTagStr,
    isEleStatStr,
    toNameFilterString,
} from "../common.js";
import {
    skillMap,
    skillMapShortIds,
} from "./hardcoded_data/skills.js";
import {
    RampageSkillsData,
} from "./hardcoded_data/rampage_skills.js";
import {
    petalaceMap,
} from "./hardcoded_data/petalace_data.js";

const WEAPON_GS_PATH  = "../../../../data/weapons_greatsword.json";
const WEAPON_LS_PATH  = "../../../../data/weapons_longsword.json";
const WEAPON_SNS_PATH = "../../../../data/weapons_swordandshield.json";
const WEAPON_DB_PATH  = "../../../../data/weapons_dualblades.json";
const WEAPON_L_PATH   = "../../../../data/weapons_lance.json";
const WEAPON_GL_PATH  = "../../../../data/weapons_gunlance.json";
const WEAPON_H_PATH   = "../../../../data/weapons_hammer.json";
const WEAPON_HH_PATH  = "../../../../data/weapons_huntinghorn.json";
const WEAPON_SA_PATH  = "../../../../data/weapons_switchaxe.json";
const WEAPON_CB_PATH  = "../../../../data/weapons_chargeblade.json";
const WEAPON_IG_PATH  = "../../../../data/weapons_insectglaive.json";
const WEAPON_LBG_PATH = "../../../../data/weapons_lightbowgun.json";
const WEAPON_HBG_PATH = "../../../../data/weapons_heavybowgun.json";
const WEAPON_BOW_PATH = "../../../../data/weapons_bow.json";

const ARMOUR_PATH = "../../../../data/armour.json";
const ARMOUR_NAMING_SCHEMES_PATH = "../../../../data/armour_naming_schemes.json";

const DECORATIONS_PATH = "../../../../data/decorations.json";


/* WEAPONS ******************************************************************************/


/*** Downloading and Validating Weapon Data (without referential integrity checking) ***/

// Common stuff
function validateWeaponData(weaponData) {
    assert(isWeaponCategoryStr(weaponData.category), "Category must be valid.");

    assert(isInt(weaponData.rarity), "Rarity must be an integer.");

    assert(isWeaponEndlineTagStr(weaponData.endlineTag), "Endline tag must be valid.");

    assert(isNonEmptyStr(weaponData.name), "Name must be a non-empty string.");

    assert(isNonEmptyStr(weaponData.treeName), "Tree name must be a non-empty string.");
    
    assert(isObj(weaponData.filterHelpers), "Filter helpers must be an Object.");
    // Not going to further test the structure of this.

    assert(isInt(weaponData.attack) && (weaponData.attack > 0), "Attack must be an integer >0.");

    assert(isInt(weaponData.affinity), "Affinity must be an integer.");
    assert((weaponData.affinity >= -100) && (weaponData.affinity <= 100), "Affinity must be <=100 and >=-100.");

    assert(isInt(weaponData.defense) && (weaponData.defense >= 0), "Defense must be an integer >=0.");

    assert(isArr(weaponData.decoSlots), "Deco slots must be an Array.");
    assert((weaponData.decoSlots.length <= 3), "Must not have more than 3 deco slots.");
    for (const slotSize of weaponData.decoSlots) {
        assert(isInt(slotSize), "Deco slot size must be an integer.");
        assert((slotSize > 0 && slotSize <= 3), "Deco slot size must be 1, 2, or 3.");
    }

    assert(isEleStatStr(weaponData.eleStatType), "Must be a valid element or stat type, or none.");
    if (weaponData.eleStatType === "none") {
        assert((weaponData.eleStatValue == 0), "None-type element/status must have a value of 0.");
    } else {
        assert((weaponData.eleStatValue > 0), "Element/status must have a value >0.");
    }

    assert(isArr(weaponData.rampSkills), "Ramp skills must be an Array of Arrays.");
    assert((weaponData.rampSkills.length <= 3), "Must not have more than 3 ramp skill slots.");
    for (const possibleRampSkills of weaponData.rampSkills) {
        assert(isArr(possibleRampSkills), "Possible ramp skills must be an Array.");
        assert((possibleRampSkills.length > 1), "Must have at least two possible ramp skills."); // Or three?
        for (const rampID of possibleRampSkills) {
            assert(isNonEmptyStr(rampID), "Ramp skill ID must be a non-empty string.");
            // TODO: Include a check that a ramp ID is valid, and probably also a check for duplicate IDs.
        }
    }
}

// Only weapons with sharpness bars
function validateWeaponDataSharpness(weaponData) {
    assert(isArr(weaponData.maxSharpness), "Maximum sharpness must be an Array.");
    assert((weaponData.maxSharpness.length == 6), "Maximum sharpness must have 6 numbers (each corresponding to a colour).");
    // First element is red sharpness. Last element is white sharpness.

    let hitSum = 0;
    let prevHits = 1;
    for (const hits of weaponData.maxSharpness) {
        assert(isInt(hits) && (hits >= 0), "Hits must be an integer >= 0.");
        assert((hits == 0) || (prevHits > 0), "Hits must not skip a colour."); // If this is wrong, remove this check.
        hitSum += hits;
        prevHits = hits;
    }
    assert((hitSum > 100), "Hits must add up to at least 100."); // If we find cases where this is wrong, remove this check.
}

async function downloadCategoryRawWeaponData(category, path, op) {
    console.assert(isWeaponCategoryStr(category));
    isNonEmptyStr(path);
    isFunction(op);

    const res = await fetch(path);
    const rawData = await res.json();

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
    const validateSimpleMelee  = (weaponData) => {validateWeaponDataSharpness(weaponData);};
    const validateSimpleRanged = (weaponData) => {};

    const gsDataFut  = downloadCategoryRawWeaponData("greatsword",     WEAPON_GS_PATH,  validateSimpleMelee);
    const lsDataFut  = downloadCategoryRawWeaponData("longsword",      WEAPON_LS_PATH,  validateSimpleMelee);
    const snsDataFut = downloadCategoryRawWeaponData("swordandshield", WEAPON_SNS_PATH, validateSimpleMelee);
    const dbDataFut  = downloadCategoryRawWeaponData("dualblades",     WEAPON_DB_PATH,  validateSimpleMelee);
    const lDataFut   = downloadCategoryRawWeaponData("lance",          WEAPON_L_PATH,   validateSimpleMelee);
    const glDataFut  = downloadCategoryRawWeaponData("gunlance",       WEAPON_GL_PATH,  validateSimpleMelee);
    const hDataFut   = downloadCategoryRawWeaponData("hammer",         WEAPON_H_PATH,   validateSimpleMelee);
    const hhDataFut  = downloadCategoryRawWeaponData("huntinghorn",    WEAPON_HH_PATH,  validateSimpleMelee);
    const saDataFut  = downloadCategoryRawWeaponData("switchaxe",      WEAPON_SA_PATH,  validateSimpleMelee);
    const cbDataFut  = downloadCategoryRawWeaponData("chargeblade",    WEAPON_CB_PATH,  validateSimpleMelee);
    const igDataFut  = downloadCategoryRawWeaponData("insectglaive",   WEAPON_IG_PATH,  validateSimpleMelee);
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

function joinRampSkillObjsToWeaponData(weaponData, rampSkillsData) {
    assert(isObj(weaponData));
    assert(rampSkillsData instanceof RampageSkillsData);
    for (const [categoryID, weaponDataMap] of Object.entries(weaponData)) {
        for (const [weaponID, weaponDataObj] of weaponDataMap.entries()) {
            const newRampArray = [];
            for (const rampSkillRampArray of weaponDataObj.rampSkills) {
                const newRampSubArray = [];
                for (const rampSkillID of rampSkillRampArray) {
                    assert(
                        rampSkillsData.isValidRampSkillID(rampSkillID),
                        "Invalid rampage skill ID '" + rampSkillID + "' from " + categoryID + " " + weaponID
                    );
                    newRampSubArray.push(rampSkillsData.getRampSkill(rampSkillID));
                }
                newRampArray.push(newRampSubArray);
            }
            weaponDataObj.rampSkills = newRampArray;
        }
    }
}


/* ARMOUR *******************************************************************************/


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
    const errorIDString = "Error with armour set ID: " + armourPieceObj.setID;

    // Set ID should already be validated by now.
    // Slot ID should also be valid.

    assert(isNonEmptyStr(armourPieceObj.tierID), errorIDString);
    assert(isTierStr(armourPieceObj.tierID), "Tier value must be valid. " + armourPieceObj.setID);

    assert(isNonEmptyStr(armourPieceObj.setName), errorIDString);
    assert(isNonEmptyStr(armourPieceObj.name), errorIDString);

    assert(isArr(armourPieceObj.decorationSlots), errorIDString);
    assert(armourPieceObj.decorationSlots.length <= 3, "Can't exceed 3 deco slots. Armour set ID: " + armourPieceObj.setID);
    for (const slotSize of armourPieceObj.decorationSlots) {
        assert(isInt(slotSize), errorIDString);
        assert((slotSize > 0) && (slotSize <= 3), "Slot sizes must be 1, 2, or 3. Armour set ID: " + armourPieceObj.setID);
    }

    assert(isObj(armourPieceObj.skills), errorIDString);
    for (const [skillLongID, skillLevel] of Object.entries(armourPieceObj.skills)) {
        assert(isNonEmptyStr(skillLongID), errorIDString);
        assert(strHasOnlyLowerNumeralUnder(skillLongID), "Invalid skill long ID. Armour set ID: " + armourPieceObj.setID);

        assert(isInt(skillLevel), errorIDString);
        assert(skillLevel > 0, "Skill level must be positive non-zero. Armour set ID: " + armourPieceObj.setID);
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

    validateArmourNamingSchemes(namingSchemesRawData);

    const expectedSlotIDs = ["head", "chest", "arms", "waist", "legs"];

    const finalData = new Map(); // This is a two-layer map: {set ID string: {piece ID string: data object}}
    for (const [armourSetID, armourRawDataObj] of Object.entries(armourRawData)) {
        const namingScheme = namingSchemesRawData[armourRawDataObj.namingScheme];
        const errorIDString = "Error with armour set ID: " + armourSetID;

        assert(isNonEmptyStr(armourSetID), errorIDString);
        assert(isObj(armourRawDataObj), errorIDString);

        assert(isTierStr(armourRawDataObj.tier), "Armour set tier must be a valid string. Armour set ID: " + armourSetID);
        assert(isInt(armourRawDataObj.rarity), errorIDString);
        assert(isNonEmptyStr(armourRawDataObj.setName), errorIDString);

        if (armourRawDataObj.prefix instanceof Array) {
            assert(
                armourRawDataObj.prefix.length === 5,
                "If prefix is an Array, it must have 5 elements. Armour set ID: " + armourSetID
            );
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

        assert((armourRawDataObj.rarity > 0) && (armourRawDataObj.rarity <= 7), "Invalid rarity. Armour set ID: " + armourSetID);
        assert(Object.keys(armourRawDataObj.pieces).length === 5, "Pieces key must have 5 elements. Armour set ID: " + armourSetID);
        assert(Object.keys(armourRawDataObj.defenses).length === 6, "Unexpected object size. Armour set ID: " + armourSetID);

        if (!finalData.has(armourSetID)) {
            finalData.set(armourSetID, new Map());
        }

        for (const [i, slotID] of expectedSlotIDs.entries()) {
            const p = armourRawDataObj.pieces[slotID];
            if (p !== null) {
                assert(isArr(p), errorIDString);
                assert(p.length === 2, "Array must be length 2. Armour set ID: " + armourSetID);

                let prefix = (armourRawDataObj.prefix instanceof Array) ? armourRawDataObj.prefix[i] : armourRawDataObj.prefix;
                prefix = (prefix.length == 0) ? "" : prefix + " ";

                const suffix = (armourRawDataObj.suffix == "") ? "" : " " + armourRawDataObj.suffix;

                // Create the final data object without verifying first
                const newPiece = {
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
                };
                newPiece.filterHelpers.nameLower = toNameFilterString(newPiece.name);

                // Now, we verify the structure
                validateFinalArmourPieceObject(newPiece);

                finalData.get(armourSetID).set(slotID, newPiece);
            }
        }

    }

    return finalData;
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

    assert(isObj(rawData));

    const ret = new Map();
    for (const [decoID, decoObj] of Object.entries(rawData)) {
        assert(isNonEmptyStr(decoID) && strHasOnlyLowerNumeral(decoID));
        assert(isObj(decoObj));
        
        assert(isNonEmptyStr(decoObj.name));
        assert(isInt(decoObj.slotSize) && (decoObj.slotSize > 0) && (decoObj.slotSize <= 3));
        assert(isInt(decoObj.rarity) && (decoObj.rarity >= 4) && (decoObj.rarity <= 7));
        assert(isObj(decoObj.skills));

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

                filterHelpers: {}, // Populate after
            };
        finalDecoObj.filterHelpers.nameLower = toNameFilterString(decoObj.name);

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

    // Builder Function
    static async downloadRawData() {
        //await sleep(3000); // For testing

        // Start all downloads
        // Also verify data, except we verify referential integrity later.
        const weaponDataFut = downloadAllRawWeaponData();
        const armourDataFut = downloadAllRawArmourData();
        const decorationsDataFut = downloadAllRawDecorationsData();

        const obj = new GameData("hello smish");
        obj.readonly = {
            skills: {
                longIds: skillMap,
                shortIds: skillMapShortIds,
            },
            weaponRampSkills: new RampageSkillsData(),
            weapons:          await weaponDataFut,
            armour:           await armourDataFut,
            petalaces:        petalaceMap,
            decorations:      await decorationsDataFut,
        };

        // Replace all weapon ramp skill IDs with ramp skill objects
        joinRampSkillObjsToWeaponData(obj.readonly.weapons, obj.readonly.weaponRampSkills);
        // Replace all armour skill long IDs with skill objects
        joinSkillObjsToArmourData(obj.readonly.armour, obj.readonly.skills.longIds);
        // Replace all decoration skill long IDs with skill objects
        joinSkillObjsToDecoData(obj.readonly.decorations, obj.readonly.skills.longIds);

        return obj;
    }

    constructor(magic_phrase) {
        if (magic_phrase != "hello smish") {
            throw new Error("Do not instantiate directly.");
        }
    }

    getSkillsArray() {
        return Array.from(this.readonly.skills.longIds.values());
    }
    getSkillsMapLongIds() {
        return this.readonly.skills.longIds;
    }

    getWeaponsArray() {
        let ret = [];
        for (const [category, dataMap] of Object.entries(this.readonly.weapons)) {
            console.assert(isWeaponCategoryStr(category));
            ret = ret.concat(Array.from(dataMap.values()));
        }
        return ret;
    }
    getDefaultWeapon() {
        return this.readonly.weapons.greatsword.get("1a");
    }

    // Returns an object of arrays: { head": array of head pieces, chest: array of chest pieces, ...}
    getArmourArrays() {
        const ret = { head:[], chest:[], arms:[], waist:[], legs:[] };
        for (const [armourSetID, armourSetData] of this.readonly.armour.entries()) {
            console.assert(isStr(armourSetID));
            console.assert(isMap(armourSetData));
            for (const [armourSlotID, armourPieceData] of armourSetData.entries()) {
                ret[armourSlotID].push(armourPieceData);
            }
        }
        return ret;
    }

    getPetalacesArray() {
        return Array.from(this.readonly.petalaces.values());
    }

    getDecorationsArray() {
        return Array.from(this.readonly.decorations.values());
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

