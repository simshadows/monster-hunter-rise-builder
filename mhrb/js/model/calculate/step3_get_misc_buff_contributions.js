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

    const weaponRO = build.getWeaponObjRO();

    const allCalcStateSpec = calcState.getSpecification();
    const allCalcState = calcState.getCurrState();

    const petalaceRO = build.getPetalaceObjRO();

    function buffState(groupName, stateName) {
        const presentations = allCalcStateSpec.get(groupName).get(stateName).presentations;
        const numPossibleStates = presentations.length;
        assert(numPossibleStates > 2);
        const stateValue = allCalcState.get(groupName).get(stateName);
        assert(isInt(stateValue) && (stateValue >= 0) && (stateValue < numPossibleStates));
        return stateValue;
    }
    function miscBuffState(stateName) {
        return buffState("Misc.", stateName);
    }

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
    let eleMul = 1;
    let defenseAdd = 0;
    let defenseMul = 1;

    let reloadSpeedAdd = 0;

    let sharpnessLevelReduction = 0;

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

    let infernalMelodyActive = false;
    if (miscBuffActive("Song: Infernal Melody")) {
        rawMul *= 1.20;
        infernalMelodyActive = true; // We overwrite the Attack Up song
    }
    if (miscBuffActive("Song: Attack Up")) {
        if (!infernalMelodyActive) {
            rawMul *= 1.10;
        }
    }
    if (miscBuffActive("Song: Affinity Up")) {
        affinityAdd += 20;
    }
    if (miscBuffActive("Song: Elem. Attack Boost")) {
        eleMul *= 1.10;
    }

    if (miscBuffActive("Palico: Rousing Roar")) {
        affinityAdd += 30;
    }
    if (miscBuffActive("Palico: Power Drum")) {
        rawMul *= 1.05;
        defenseMul *= 1.20;
    }

    if (miscBuffActive("LBG Switch Skill: Elemental Reload") && (weaponRO.category === "lightbowgun")) {
        reloadSpeedAdd -= 2;
    }

    sharpnessLevelReduction = miscBuffState("Reduce Sharpness Level");

    const ret = {
        rawAdd,
        rawMul,
        affinityAdd,
        eleMul,
        defenseAdd,
        defenseMul,

        reloadSpeedAdd,

        sharpnessLevelReduction,
    };
    return ret;
}


export {getMiscBuffContributions};

