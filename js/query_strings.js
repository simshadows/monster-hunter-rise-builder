/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Everything to do with query string manipulation in this app happens here.
 */

import * as check from "./check.js";
import {Build} from "./model/build.js";

const assert = console.assert;

const SPLIT_CHAR = " ";


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
        if (typeof queryStringValue === "string") {
            const decomp = queryStringValue.split(SPLIT_CHAR);
            if (decomp.length === expectedLength) {
                processingFunction(decomp, db, build);
            }
        }
    }

    const basicEquipsStr = getQueryValue("a");
    processIfQueryIsValid(basicEquipsStr, 8, readDecomposedBasicEquipsStr);

    // IMPORTANT: Parsing rampage skills is dependent on first parsing the weapon.
    const rampSkillsStr = getQueryValue("b");
    processIfQueryIsValid(rampSkillsStr, 3, readDecomposedRampSkillsStr);

    const taliStr = getQueryValue("c");
    processIfQueryIsValid(taliStr, 7, readDecomposedTalismanStr);

    // IMPORTANT: Parsing decorations must be done last due to dependence on everything else.
    const decosStr = getQueryValue("d");
    processIfQueryIsValid(decosStr, (7 * 3), readDecomposedDecosStr); // 7 gear slots * 3 deco slots each

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
        const subMap = armourMap.get(queryValue);
        if (subMap !== undefined) {
            const armourRO = subMap.get(slotID);
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
        const skillRO = skillMap.get(_skillID);
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

function readDecomposedRampSkillsStr(arr, db, build) {
    const rampSkill0ID = arr[0];
    const rampSkill1ID = arr[1];
    const rampSkill2ID = arr[2];

    const weaponRO = build.getWeaponObjRO();

    function op(rampSkillID, position) {
        const optionsSubArray = weaponRO.rampSkills[position];
        if (optionsSubArray !== undefined) {
            assert((optionsSubArray instanceof Array) && (optionsSubArray.length > 0));
            for (const rampSkillRO of optionsSubArray) {
                if (rampSkillID === rampSkillRO.id) {
                    // TODO: It's weird that we need the query the database again for the rampage skill.
                    build.setRampageSkill(db, position, rampSkillRO.id);
                }
            }
        }
    }

    op(rampSkill0ID, 0);
    op(rampSkill1ID, 1);
    op(rampSkill2ID, 2);
}

function readDecomposedDecosStr(arr, db, build) {

    const decoMap = db.readonly.decorations.map;

    const weaponRO = build.getWeaponObjRO();

    function readGearSlotDecos(slotID, startingIndex) {
        for (let position = 0; position < 3; ++position) {
            const decoID = arr[startingIndex + position];
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

    const rampSkill0 = build.getRampSkill(0);
    const rampSkill1 = build.getRampSkill(1);
    const rampSkill2 = build.getRampSkill(2);

    const talismanSkillsRO = build.getTalismanSkills();
    const talismanSlotsRO = build.getTalismanDecoSlots();

    //const decosRO = ???; // We read decos later.

    /*** ***/

    const basicEquipsStr = [
            weaponRO.category,
            weaponRO.id,
            ((armourROs.head  === null) ? "0" : armourROs.head.setID ),
            ((armourROs.chest === null) ? "0" : armourROs.chest.setID),
            ((armourROs.arms  === null) ? "0" : armourROs.arms.setID ),
            ((armourROs.waist === null) ? "0" : armourROs.waist.setID),
            ((armourROs.legs  === null) ? "0" : armourROs.legs.setID ),
            ((petalaceRO      === null) ? "0" : petalaceRO.id        ),
        ].join(SPLIT_CHAR);
    
    const rampSkillsStr = [
            ((rampSkill0 === null) ? "" : rampSkill0.id),
            ((rampSkill1 === null) ? "" : rampSkill1.id),
            ((rampSkill2 === null) ? "" : rampSkill2.id),
        ].join(SPLIT_CHAR);

    const taliStr = [
            // Talisman skills
            ((talismanSkillsRO[0].skillRO === null) ? "" : talismanSkillsRO[0].skillRO.shortId),
            ((talismanSkillsRO[1].skillRO === null) ? "" : talismanSkillsRO[1].skillRO.shortId),
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
            ret[i] = ((ret[i] === null) || (ret[i] === undefined)) ? "" : ret[i].id;
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
        ["c", taliStr],
        ["d", decosStr],
    ]));
}

