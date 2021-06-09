/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {Build} from "../build.js";
import {CalcState} from "../calc_state.js";

import {
    isObj,
    isInt,
    isNonEmptyStr,
    isStrOrNull,
    isArr,
    isMap,
    isSet,
    isFunction,
} from "../../check.js";

const assert = console.assert;


function getSkillContributions(db, build, calcState) {
    assert(isObj(db));
    assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure

    assert(build instanceof Build);
    assert(calcState instanceof CalcState);

    const allCurrentSkills = build.getCurrentSkills();
    assert(isMap(allCurrentSkills));

    const allCalcStateSpec = calcState.getSpecification();
    const allCalcState = calcState.getCurrState();

    // Defined for code readability. Returns whether a binary state is "on" or "off".
    function skillActive(stateLabel) {
        const presentations = allCalcStateSpec.get("Skill Trigger Conditions").get(stateLabel).presentations;
        const numPossibleStates = presentations.length;
        assert(numPossibleStates === 2);
        const stateValue = allCalcState.get("Skill Trigger Conditions").get(stateLabel);
        assert(isInt(stateValue) && (stateValue >= 0) && (stateValue < 2));
        return (stateValue === 1);
    }

    // Define variables we want to find

    let addRaw = 0;
    let multiplyRaw = 1;

    let handicraftLevel = 0;
    let criticalBoostLevel = 0;

    // Define what all rampage skills do

    const skillOps = new Map([

        ["attack_boost", (lvl)=>{ console.log("TODO"); }],

        ["handicraft",     (lvl)=>{ handicraftLevel    = lvl; }],
        ["critical_boost", (lvl)=>{ criticalBoostLevel = lvl; }],

        // MANY OTHER SKILLS NOT YET IMPLEMENTED
    ]);

    // Warn if any skill IDs are incorrect
    for (const skillLongID of skillOps.keys()) {
        if (!db.readonly.skills.longIdsMap.has(skillLongID)) {
            console.warn("Skill ID " + skillLongID + " not present in the database.");
        }
    }

    // Process all rampage skills in the build
    for (const [skillLongID, [skillRO, skillLevel]] of allCurrentSkills.entries()) {
        const op = skillOps.get(skillLongID);
        if (op !== undefined) {
            op(skillLevel);
        }
    }

    const ret = {
        addRaw,
        multiplyRaw,

        handicraftLevel,
        criticalBoostLevel,
    };
    return ret;
}


export {getSkillContributions};

