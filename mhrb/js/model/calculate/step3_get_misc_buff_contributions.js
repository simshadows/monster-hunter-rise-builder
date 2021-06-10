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

function getMiscBuffContributions(db, build, calcState) {
    assert(isObj(db));
    assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure

    assert(build instanceof Build);
    assert(calcState instanceof CalcState);

    const allCalcStateSpec = calcState.getSpecification();
    const allCalcState = calcState.getCurrState();

    // Defined for code readability. Returns whether a binary state is "on" or "off".
    function buffActive(stateLabel) {
        const presentations = allCalcStateSpec.get("Item Box").get(stateLabel).presentations;
        const numPossibleStates = presentations.length;
        assert(numPossibleStates === 2);
        const stateValue = allCalcState.get("Item Box").get(stateLabel);
        assert(isInt(stateValue) && (stateValue >= 0) && (stateValue < 2));
        return (stateValue === 1);
    }

    let rawAdd = 0;
    let defense = 0;

    if (buffActive("Powercharm")) {
        rawAdd += 6;
    }
    if (buffActive("Powertalon")) {
        rawAdd += 9;
    }
    if (buffActive("Armorcharm")) {
        defense += 12;
    }
    if (buffActive("Armortalon")) {
        defense += 18;
    }

    const ret = {
        rawAdd,
        defense,
    };
    return ret;
}


export {getMiscBuffContributions};

