// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Everything to do with query string manipulation in this app happens here.
 */

import * as check from "./check";
import {Build} from "./model/build";

const assert = console.assert;

const SPLIT_CHAR = " ";
const NUMBER_BASE = 36;


function getQueryValue(key) {
    const q = new URLSearchParams(window.location.search);
    return q.get(key);
}

function updateQueryKeys(map) {
    console.assert(map instanceof Map);

    const q = new URLSearchParams();
    for (const [k, v] of map.entries()) {
        q.set(k, v);
    }
    q.sort();
    const newQueryStr = "?" + q.toString();
    history.pushState(null, null, newQueryStr);
}

/****************************************************************************************/
/*** BUILD DESERIALIZATION **************************************************************/
/****************************************************************************************/

export function getBuildFromQueryString(db) {
    const build = new Build(db, db.getDefaultWeapon());

    function processIfQueryIsValid(queryStringValue, expectedLength, processingFunction) {
        if (queryStringValue === "") return; // Do nothing for empty value
        if (typeof queryStringValue === "string") {
            const decomp = queryStringValue.split(SPLIT_CHAR);
            if (decomp.length === expectedLength) {
                processingFunction(decomp, db, build);
            }
        }
    }
    function processFlexibleLength(queryStringValue, processingFunction) {
        if (queryStringValue === "") return; // Do nothing for empty value
        if (typeof queryStringValue === "string") {
            const decomp = queryStringValue.split(SPLIT_CHAR);
            processingFunction(decomp, db, build);
        }
    }

    const basicEquipsStr = getQueryValue("a");
    processIfQueryIsValid(basicEquipsStr, 8, readDecomposedBasicEquipsStr);

    // IMPORTANT: Parsing rampage skills is dependent on first parsing the weapon.
    const rampSkillsStr = getQueryValue("b");
    processFlexibleLength(rampSkillsStr, readDecomposedRampSkillsStr);

    // IMPORTANT: Parsing weapon special selection is dependent on first parsing the weapon.
    const weaponSpecialSelectionStr = getQueryValue("c");
    processFlexibleLength(weaponSpecialSelectionStr, readDecomposedWeaponSpecialSelectionStr);

    // "d" is reserved for further weapon customization, in case we get something
    // similar to Safi weapons from Monster Hunter World.

    const taliStr = getQueryValue("e");
    processIfQueryIsValid(taliStr, 7, readDecomposedTalismanStr);

    // IMPORTANT: Parsing decorations must be done almost last due to dependence on most things.
    const decosStr = getQueryValue("f");
    processIfQueryIsValid(decosStr, (7 * 3), readDecomposedDecosStr); // 7 gear slots * 3 deco slots each

    // Switch skills might take on "g"

    // Further new customization options may take on letters "h" and beyond.

    return build;
}

function readDecomposedBasicEquipsStr(arr, db, build) {
    const weaponCategory = arr[0];
    const weaponID       = arr[1];
    const armourIDs = {
            head         : arr[2],
            chest        : arr[3],
            arms         : arr[4],
            waist        : arr[5],
            legs         : arr[6],
        };
    const petalaceID     = arr[7];

    const weaponCategoryMap = db.readonly.weapons.map[weaponCategory];
    if (weaponCategoryMap !== undefined) {
        const weaponRO = weaponCategoryMap.get(weaponID);
        if (weaponRO !== undefined) {
            build.setWeapon(db, weaponRO);
        }
    }

    const armourMap = db.readonly.armour.map;
    for (const [slotID, queryValue] of Object.entries(armourIDs)) {
        const subMap = armourMap.get(parseInt(queryValue, NUMBER_BASE));
        if (subMap !== undefined) {
            const armourRO = subMap[slotID];
            if (armourRO !== undefined) {
                build.setArmourPiece(db, slotID, armourRO);
            }
        }
    }

    const petalaceRO = db.readonly.petalaces.map.get(petalaceID);
    if (petalaceRO !== undefined) {
        build.setPetalace(db, petalaceRO);
    }
}

function readDecomposedRampSkillsStr(arr, db, build) {
    const weaponRO = build.getWeaponObjRO();

    if (arr.length > weaponRO.rampSkills.length) {
        console.warn("Invalid rampage skills input length.");
        return;
    }

    function op(rampSkillShortID, position) {
        const optionsSubArray = weaponRO.rampSkills[position];
        if (optionsSubArray === undefined) return;

        assert((optionsSubArray instanceof Array) && (optionsSubArray.length > 0));
        for (const [rampSkillRO, inheritedFromWeaponID] of optionsSubArray) {
            if (rampSkillShortID === rampSkillRO.shortId) {
                // TODO: It's weird that we need the query the database again for the rampage skill.
                build.setRampageSkill(db, position, rampSkillRO.id);
            }
        }
    }

    for (const [i, rampSkillID] of arr.entries()) {
        op(rampSkillID, i);
    }
}

function readDecomposedWeaponSpecialSelectionStr(arr, db, build) {
    const weaponRO = build.getWeaponObjRO();

    const isBowgun = (weaponRO.category === "lightbowgun") || (weaponRO.category === "heavybowgun");
    if ((arr.length > 1) || (!isBowgun && (arr.length != 0))) {
        console.warn("Invalid special sepection input length.");
        return;
    }

    if (!isBowgun) return; // Nothing to do

    const specialSelectionID = parseInt(arr[0]);
    const specialSelectionRO = db.readonly.weaponSpecialSelections.map.get(specialSelectionID);
    if (specialSelectionRO !== undefined) {
        const expectedType = weaponRO.category + "mod";
        if (specialSelectionRO.type === expectedType) {
            build.setWeaponSpecialSelection(db, specialSelectionID);
        } else {
            console.warn("Parsed a special selection string, but weapon category is incompatible with it.");
        }
    }
}

function readDecomposedTalismanStr(arr, db, build) {
    const skill0ShortID = arr[0];
    const skill1ShortID = arr[1];
    const skill0Lvl     = arr[2];
    const skill1Lvl     = arr[3];
    const decoSlot0     = arr[4];
    const decoSlot1     = arr[5];
    const decoSlot2     = arr[6];

    const skillMap = db.readonly.skills.shortIdsMap;

    function op1(_skillIndex, _skillID, _skillLevel) {
        const skillRO = skillMap.get(parseInt(_skillID, NUMBER_BASE));
        const parsedLevel = parseInt(_skillLevel);
        if ((skillRO !== undefined) && (parsedLevel > 0) && (parsedLevel <= skillRO.maxLevels)) {
            build.setTalismanSkill(db, _skillIndex, skillRO, parsedLevel);
        }
    }
    function op2(_decoIndex, _slotSize) {
        const parsedSize = parseInt(_slotSize);
        if ((parsedSize >= 0) && (parsedSize <= 3)) {
            build.setTalismanDecoSlot(db, _decoIndex, parsedSize);
        }
    }

    op1(0, skill0ShortID, skill0Lvl);
    op1(1, skill1ShortID, skill1Lvl);

    op2(0, decoSlot0);
    op2(1, decoSlot1);
    op2(2, decoSlot2);
}

function readDecomposedDecosStr(arr, db, build) {

    const decoMap = db.readonly.decorations.map;

    const weaponRO = build.getWeaponObjRO();

    function readGearSlotDecos(slotID, startingIndex) {
        for (let position = 0; position < 3; ++position) {
            const decoID = parseInt(arr[startingIndex + position], NUMBER_BASE);
            const decoRO = decoMap.get(decoID);
            if (decoRO === undefined) continue;

            const slotSize = build.getDecoSlotSize(slotID, position);
            if (decoRO.slotSize > slotSize) continue;

            build.setDecoration(db, decoRO, slotID, position);
        }
    }

    readGearSlotDecos("weapon"  , 3 * 0);
    readGearSlotDecos("head"    , 3 * 1);
    readGearSlotDecos("chest"   , 3 * 2);
    readGearSlotDecos("arms"    , 3 * 3);
    readGearSlotDecos("waist"   , 3 * 4);
    readGearSlotDecos("legs"    , 3 * 5);
    readGearSlotDecos("talisman", 3 * 6);
}


/****************************************************************************************/
/*** BUILD SERIALIZATION ****************************************************************/
/****************************************************************************************/

export function writeBuildToQueryString(build) {
    assert(build instanceof Build);

    const weaponRO = build.getWeaponObjRO();
    const armourROs = build.getArmourROs();
    const petalaceRO = build.getPetalaceObjRO();

    const rampSkills = [];
    for (let i = 0; i < weaponRO.rampSkills.length; ++i) {
        rampSkills.push(build.getRampSkill(i));
    }
    const weaponSpecialSelectionRO = build.getWeaponSpecialSelectionRO();

    const talismanSkillsRO = build.getTalismanSkills();
    const talismanSlotsRO = build.getTalismanDecoSlots();

    //const decosRO = ???; // We read decos later.

    /*** ***/

    const basicEquipsStr = [
            weaponRO.category,
            weaponRO.id,
            ((armourROs.head  === null) ? "0" : armourROs.head.setID.toString(NUMBER_BASE) ),
            ((armourROs.chest === null) ? "0" : armourROs.chest.setID.toString(NUMBER_BASE)),
            ((armourROs.arms  === null) ? "0" : armourROs.arms.setID.toString(NUMBER_BASE) ),
            ((armourROs.waist === null) ? "0" : armourROs.waist.setID.toString(NUMBER_BASE)),
            ((armourROs.legs  === null) ? "0" : armourROs.legs.setID.toString(NUMBER_BASE) ),
            ((petalaceRO      === null) ? "0" : petalaceRO.id                              ),
        ].join(SPLIT_CHAR);

    const rampSkillsStr = (()=>{
            const tmp = [];
            for (const rampSkillRO of rampSkills) {
                tmp.push((rampSkillRO === null) ? "" : rampSkillRO.shortId);
            }
            return tmp.join(SPLIT_CHAR);
        })();

    const weaponSpecialSelectionStr = (weaponSpecialSelectionRO === null) ? "" : weaponSpecialSelectionRO.id.toString();
    
    const taliStr = [
            // Talisman skills
            ((talismanSkillsRO[0].skillRO === null) ? "" : talismanSkillsRO[0].skillRO.shortId.toString(NUMBER_BASE)),
            ((talismanSkillsRO[1].skillRO === null) ? "" : talismanSkillsRO[1].skillRO.shortId.toString(NUMBER_BASE)),
            // Talisman skill levels
            ((talismanSkillsRO[0].skillLevel === null) ? "" : talismanSkillsRO[0].skillLevel),
            ((talismanSkillsRO[1].skillLevel === null) ? "" : talismanSkillsRO[1].skillLevel),
            // Talisman decoration slots
            ((talismanSlotsRO[0] === 0) ? "" : talismanSlotsRO[0]),
            ((talismanSlotsRO[1] === 0) ? "" : talismanSlotsRO[1]),
            ((talismanSlotsRO[2] === 0) ? "" : talismanSlotsRO[2]),
        ].join(SPLIT_CHAR);

    function generateDecoElements(slotID) {
        const ret = [
                build.getDeco(slotID, 0),
                build.getDeco(slotID, 1),
                build.getDeco(slotID, 2),
            ];
        for (let i = 0; i < ret.length; ++i) {
            ret[i] = ((ret[i] === null) || (ret[i] === undefined)) ? "" : ret[i].id.toString(NUMBER_BASE);
        }
        return ret;
    }
    const decosStr = [
            ...generateDecoElements("weapon"  ),
            ...generateDecoElements("head"    ),
            ...generateDecoElements("chest"   ),
            ...generateDecoElements("arms"    ),
            ...generateDecoElements("waist"   ),
            ...generateDecoElements("legs"    ),
            ...generateDecoElements("talisman"),
        ].join(SPLIT_CHAR);

    updateQueryKeys(new Map([
        ["a", basicEquipsStr],
        ["b", rampSkillsStr],
        ["c", weaponSpecialSelectionStr],
        ["e", taliStr],
        ["f", decosStr],
    ]));
}

