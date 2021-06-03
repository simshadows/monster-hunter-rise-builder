/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {Build} from "./build.js";
import {CalcState} from "./calc_state.js";

import {
    isObj,
    isInt,
    isNonEmptyStr,
    isStrOrNull,
    isArr,
    isMap,
} from "../check.js";
import {
    isDecoEquippableSlotStr,
    isWeaponCategoryStr,
    isEleStatStr,
    isArmourSlotStr,
    toNameFilterString,
} from "../common.js";

const assert = console.assert;

function calculateBuildPerformance(db, build, calcState) {
    assert(isObj(db));
    assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure

    assert(build instanceof Build);
    assert(calcState instanceof CalcState);

    // We first gather all the information we need from the build.

    const weaponRO = build.getWeaponObjRO();
    const allSkills = build.getCurrentSkills();
    const allRampSkills = build.getRampSkills(db);

    const state = calcState.getCurrState(); // TODO: This overloading of the term "state" is annoying.

    console.log(weaponRO);
    console.log(allSkills);
    console.log(allRampSkills);
    console.log(state);

    // Placeholder implementation

    // TODO: Continue this!

    return {
        efr: weaponRO.attack,
        affinity: weaponRO.affinity,
    };
}

export {calculateBuildPerformance};

