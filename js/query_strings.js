/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Everything to do with query string manipulation in this app happens here.
 */

import * as check from "./check.js";
import {Build} from "./model/build.js";

const assert = console.assert;


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

/*** ***/

function getBuildFromQueryString(db, defaultWeapon) {
    const build = new Build(db, defaultWeapon);

    const weaponQ = {
        category: getQueryValue("a"),
        id:       getQueryValue("b"),
    };
    
    const armourQ = {
        head:  getQueryValue("c"),
        chest: getQueryValue("d"),
        arms:  getQueryValue("e"),
        waist: getQueryValue("f"),
        legs:  getQueryValue("g"),
    };

    const petalaceQ = getQueryValue("h");

    const talismanQ = {
        skillID0: getQueryValue("i"), // Short IDs
        skillID1: getQueryValue("j"),
        skillLevel0: getQueryValue("il"),
        skillLevel1: getQueryValue("jl"),
        
        slot0: getQueryValue("o"), // Integers
        slot1: getQueryValue("p"),
        slot2: getQueryValue("q"),
    };

    const weaponCategoryMap = db.readonly.weapons.map[weaponQ.category];
    if (weaponCategoryMap !== undefined) {
        const weaponRO = weaponCategoryMap.get(weaponQ.id);
        if (weaponRO !== undefined) {
            build.setWeapon(db, weaponRO);
        }
    }

    const armourMap = db.readonly.armour.map;
    for (const [slotID, queryValue] of Object.entries(armourQ)) {
        const subMap = armourMap.get(queryValue);
        if (subMap !== undefined) {
            const armourRO = subMap.get(slotID);
            if (armourRO !== undefined) {
                build.setArmourPiece(db, slotID, armourRO);
            }
        }
    }

    const petalaceRO = db.readonly.petalaces.map.get(petalaceQ);
    if (petalaceRO !== undefined) {
        build.setPetalace(db, petalaceRO);
    }

    const skillMap = db.readonly.skills.shortIdsMap;
    function op1(_skillIndex, _skillID, _skillLevel) {
        const skillRO = skillMap.get(_skillID);
        const parsedLevel = parseInt(_skillLevel);
        if ((skillRO !== undefined) && (parsedLevel > 0) && (parsedLevel <= skillRO.maxLevels)) {
            build.setTalismanSkill(db, _skillIndex, skillRO, parsedLevel);
        }
    }
    op1(0, talismanQ.skillID0, talismanQ.skillLevel0);
    op1(1, talismanQ.skillID1, talismanQ.skillLevel1);
    function op2(_decoIndex, _slotSize) {
        const parsedSize = parseInt(_slotSize);
        if ((parsedSize >= 0) && (parsedSize <= 3)) {
            build.setTalismanDecoSlot(db, _decoIndex, parsedSize);
        }
    }
    op2(0, talismanQ.slot0);
    op2(1, talismanQ.slot1);
    op2(2, talismanQ.slot2);

    return build;
}

function writeBuildToQueryString(build) {
    assert(build instanceof Build);

    const weaponRO = build.getWeaponObjRO();
    const armourROs = build.getArmourROs();
    const petalaceRO = build.getPetalaceObjRO();

    const talismanSkillsRO = build.getTalismanSkills();
    const talismanSlotsRO = build.getTalismanDecoSlots();

    //const decosRO = build.getAllDecos();

    //function decoVal(_slotID, _decoSlotID) {
    //    const decoSlotData = decosRO[_slotID][_decoSlotID];
    //    if ((decoSlotData !== undefined) && (decoSlotData.decoRO !== null)) {
    //        return decoSlotData.decoRO.id;
    //    } else {
    //        return "0";
    //    }
    //}

    updateQueryKeys(new Map([

        ["a", weaponRO.category],
        ["b", weaponRO.id      ],

        ["c", (armourROs.head  === null) ? "0" : armourROs.head.setID ],
        ["d", (armourROs.chest === null) ? "0" : armourROs.chest.setID],
        ["e", (armourROs.arms  === null) ? "0" : armourROs.arms.setID ],
        ["f", (armourROs.waist === null) ? "0" : armourROs.waist.setID],
        ["g", (armourROs.legs  === null) ? "0" : armourROs.legs.setID ],

        ["h", (petalaceRO === null) ? "0" : petalaceRO.id],

        // Talisman skills
        ["i", (talismanSkillsRO[0].skillRO === null) ? "0" : talismanSkillsRO[0].skillRO.shortId],
        ["j", (talismanSkillsRO[1].skillRO === null) ? "0" : talismanSkillsRO[1].skillRO.shortId],
        // Talisman skill levels
        ["il", (talismanSkillsRO[0].skillLevel === null) ? "0" : talismanSkillsRO[0].skillLevel],
        ["jl", (talismanSkillsRO[1].skillLevel === null) ? "0" : talismanSkillsRO[1].skillLevel],
        // Intentionally skip letters
        // Talisman decoration slots
        ["o", talismanSlotsRO[0]],
        ["p", talismanSlotsRO[1]],
        ["q", talismanSlotsRO[2]],

        // Terrible.
        //["raa", decoVal("weapon", 0)],
        //["rab", decoVal("weapon", 1)],
        //["rac", decoVal("weapon", 2)],
        //["rba", decoVal("head", 0)],
        //["rbb", decoVal("head", 1)],
        //["rbc", decoVal("head", 2)],
        //["rca", decoVal("chest", 0)],
        //["rcb", decoVal("chest", 1)],
        //["rcc", decoVal("chest", 2)],
        //["rda", decoVal("waist", 0)],
        //["rdb", decoVal("waist", 1)],
        //["rdc", decoVal("waist", 2)],
        //["rea", decoVal("legs", 0)],
        //["reb", decoVal("legs", 1)],
        //["rec", decoVal("legs", 2)],
        //["rfa", decoVal("talisman", 0)],
        //["rfb", decoVal("talisman", 1)],
        //["rfc", decoVal("talisman", 2)],
    ]));
}

export {
    getBuildFromQueryString,
    writeBuildToQueryString,
};

