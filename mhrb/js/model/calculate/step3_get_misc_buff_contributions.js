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

    const petalaceRO = build.getPetalaceObjRO();

    // Defined for code readability. Returns whether a binary state is "on" or "off".
    function buffActive(groupName, stateName) {
        const presentations = allCalcStateSpec.get(groupName).get(stateName).presentations;
        const numPossibleStates = presentations.length;
        assert(numPossibleStates === 2);
        const stateValue = allCalcState.get(groupName).get(stateName);
        assert(isInt(stateValue) && (stateValue >= 0) && (stateValue < 2));
        return (stateValue === 1);
    }
    function itemBoxBuffActive(stateName) {
        return buffActive("Item Box", stateName);
    }
    function miscBuffActive(stateName) {
        return buffActive("Misc.", stateName);
    }

    let rawAdd = 0;
    let rawMul = 1;
    let affinityAdd = 0;
    let defenseAdd = 0;
    let defenseMul = 1;

    if (itemBoxBuffActive("Powercharm")) {
        rawAdd += 6;
    }
    if (itemBoxBuffActive("Powertalon")) {
        rawAdd += 9;
    }
    if (itemBoxBuffActive("Armorcharm")) {
        defenseAdd += 12;
    }
    if (itemBoxBuffActive("Armortalon")) {
        defenseAdd += 18;
    }

    if (itemBoxBuffActive("Might Seed")) {
        rawAdd += 10;
    }
    if (itemBoxBuffActive("Demon Powder")) {
        rawAdd += 10;
    }
    if (itemBoxBuffActive("Demondrug")) {
        rawAdd += 5;
    }
    if (itemBoxBuffActive("Mega Demondrug")) {
        rawAdd += 7;
    }

    if (itemBoxBuffActive("Adamant Seed")) {
        defenseAdd += 20;
    }
    if (itemBoxBuffActive("Hardshell Powder")) {
        defenseAdd += 20;
    }
    if (itemBoxBuffActive("Armorskin")) {
        defenseAdd += 15;
    }
    if (itemBoxBuffActive("Mega Armorskin")) {
        defenseAdd += 25;
    }

    if (miscBuffActive("Petalace Attack (Max)")) {
        // TODO: Allow setting different levels of petalace buffs instead of just max.
        if (petalaceRO !== null) {
            rawAdd += petalaceRO.attackUp;
        }
    }

    if (miscBuffActive("Dango Booster")) {
        rawAdd += 9;
        defenseAdd += 15;
    }

    if (miscBuffActive("Palico: Rousing Roar")) {
        affinityAdd += 30;
    }
    if (miscBuffActive("Palico: Power Drum")) {
        rawMul *= 1.05;
        defenseMul *= 1.20;
    }

    const ret = {
        rawAdd,
        rawMul,
        affinityAdd,
        defenseAdd,
        defenseMul,
    };
    return ret;
}


export {getMiscBuffContributions};

