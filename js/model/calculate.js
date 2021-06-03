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

function calculateBuildPerformance(build, calcState) {
    assert(build instanceof Build);
    assert(calcState instanceof CalcState);

    return {
        efr: 42,
        affinity: 20,
    };
}

export {calculateBuildPerformance};

