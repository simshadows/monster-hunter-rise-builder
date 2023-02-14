/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type MHRDatabase,
} from "../../database";

import {Build} from "../build";
import {CalcState} from "../calc_state";

function getMiscBuffContributions(
    db:        {"readonly": MHRDatabase},
    build:     Build,
    calcState: CalcState,
) {
    db; // TODO: Remove the parameter
    const weaponRO = build.getWeaponObjRO();

    const allCalcStateSpec = calcState.getSpecification();
    const allCalcState = calcState.getCurrState();

    const petalaceRO = build.getPetalaceObjRO();

    function buffState(groupName: string, stateName: string): number {
        // TODO: Refactor to avoid needing runtime undefineds-checking?

        const specGroupMap = allCalcStateSpec.get(groupName);
        if (specGroupMap === undefined) throw new Error("Unexpected undefined.");

        const specStateMap = specGroupMap.get(stateName);
        if (specStateMap === undefined) throw new Error("Unexpected undefined.");

        const presentations = specStateMap.presentations;
        const numPossibleStates = presentations.length;
        if (numPossibleStates <= 2) throw new Error("Unexpected value.");

        const groupMap = allCalcState.get(groupName);
        if (groupMap === undefined) throw new Error("Unexpected undefined.");

        const stateValue = groupMap.get(stateName);
        console.log(stateValue);
        if ((stateValue === undefined) || (stateValue % 1 !== 0)
            || (stateValue < 0) || (stateValue >= numPossibleStates)) {
            throw new Error("Unexpected value.");
        }
        return stateValue;
    }
    function miscBuffState(stateName: string): number {
        return buffState("Misc.", stateName);
    }

    // Defined for code readability. Returns whether a binary state is "on" or "off".
    function buffActive(groupName: string, stateName: string): boolean {
        // TODO: Refactor to avoid needing runtime undefineds-checking?
        // TODO: Also, this is a duplicate.

        const specGroupMap = allCalcStateSpec.get(groupName);
        if (specGroupMap === undefined) throw new Error("Unexpected undefined.");

        const specStateMap = specGroupMap.get(stateName);
        if (specStateMap === undefined) throw new Error("Unexpected undefined.");

        const presentations = specStateMap.presentations;
        const numPossibleStates = presentations.length;
        // This line below is the only difference (at the time of writing)
        if (numPossibleStates != 2) throw new Error("Unexpected value.");

        const groupMap = allCalcState.get(groupName);
        if (groupMap === undefined) throw new Error("Unexpected undefined.");

        const stateValue = groupMap.get(stateName);
        if ((stateValue === undefined) || (stateValue % 1 !== 0)
            || (stateValue < 0) || (stateValue >= numPossibleStates)) {
            throw new Error("Unexpected value.");
        }
        return (stateValue === 1);
    }
    function itemBoxBuffActive(stateName: string): boolean {
        return buffActive("Item Box", stateName);
    }
    function miscBuffActive(stateName: string): boolean {
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

