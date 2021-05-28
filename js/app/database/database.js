/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isObj,
    isFunction,
    isInt,
    isNonEmptyStr,
    isArr,
    assert,
} from "../check.js";
import {
    sleep,
    isWeaponCategoryStr,
    isWeaponEndlineTagStr,
    isEleStatStr,
    toNameFilterString,
} from "../common.js";
import {
    RampageSkillsData,
} from "./hardcoded_data/rampage_skills.js";

/*** Downloading and Validating Weapon Data (without referential integrity checking) ***/

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

// Common stuff
function validateWeaponData(weaponData) {
    assert(isWeaponCategoryStr(weaponData.category), "Category must be valid.");

    assert(isInt(weaponData.rarity), "Rarity must be an integer.");

    assert(isWeaponEndlineTagStr(weaponData.endlineTag), "Endline tag must be valid.");

    assert(isNonEmptyStr(weaponData.name), "Name must be a non-empty string.");

    assert(isNonEmptyStr(weaponData.treeName), "Tree name must be a non-empty string.");
    
    assert(isObj(weaponData.filterHelpers), "Filter helpers must be a non-empty string.");
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

/*** GameData Class ***/

class GameData {

    // Builder Function
    static async downloadRawData() {
        //await sleep(3000); // For testing

        // Pull all data first
        // Also verify data, except we verify referential integrity later.
        const weaponData = await downloadAllRawWeaponData();
        const rampSkillsData = new RampageSkillsData()

        // Replace all ramp skill IDs with ramp skill objects
        joinRampSkillObjsToWeaponData(weaponData, rampSkillsData);

        // Return Data
        const obj = new GameData("hello smish");
        obj.readonly = {
            weaponRampSkills: rampSkillsData,
            weapons:          weaponData,
        };

        return obj;
    }

    constructor(magic_phrase) {
        if (magic_phrase != "hello smish") {
            throw new Error("Do not instantiate directly.");
        }
    }

    getWeaponsArray() {
        let ret = [];
        for (const [category, dataMap] of Object.entries(this.readonly.weapons)) {
            assert(isWeaponCategoryStr(category));
            ret = ret.concat(Array.from(dataMap.values()));
        }
        return ret;
    }
    getDefaultWeapon() {
        return this.readonly.weapons.greatsword.get("1a");
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

