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


/****************************************************************************************/
/*  Data  *******************************************************************************/
/****************************************************************************************/

/*** Sharpness ***/

const rawSharpnessModifiers = [
    0.50, // 1: Red
    0.75, // 2: Orange
    1.00, // 3: Yellow
    1.05, // 4: Green
    1.20, // 5: Blue
    1.32, // 6: White
];


const elementalSharpnessModifiers = [
    0.25,   // 1: Red
    0.50,   // 2: Orange
    0.75,   // 3: Yellow
    1.00,   // 4: Green
    1.0625, // 5: Blue
    1.15,   // 6: White
];


/*** Critical Hits ***/

const blunderDamageMultiplier = 0.75;

const criticalBoostDamageMultipliers = [
    1.25, // Level 0
    1.30, // Level 1
    1.35, // Level 2
    1.40, // Level 3
];


/****************************************************************************************/
/*  Main Formula  ***********************************************************************/
/****************************************************************************************/


function calculateBuildPerformance(db, build, calcState) {
    assert(isObj(db));
    assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure

    assert(build instanceof Build);
    assert(calcState instanceof CalcState);

    const weaponRO = build.getWeaponObjRO();
    const allCurrentSkills = build.getCurrentSkills();
    const allCurrentRampSkills = build.getRampSkills(db);
    const allCalcStateSpec = calcState.getSpecification();
    const allCalcState = calcState.getCurrState();

    //console.log(weaponRO);
    //console.log(allCurrentSkills);
    //console.log(allCurrentRampSkills);
    //console.log(allCalcStateSpec);
    //console.log(allCalcState);

    // Defined for code readability
    function skillLevel(skillLongID) {
        const maxLevel = db.readonly.skills.longIdsMap.get(skillLongID).maxLevels;
        assert(isInt(maxLevel) && (maxLevel > 0) && (maxLevel < 10)); // Don't know any skills with bigger levels
        const obj = allCurrentSkills.get(skillLongID);
        if (obj === undefined) {
            return 0;
        } else {
            const currLevel = obj[1];
            assert(isInt(currLevel) && (currLevel > 0) && (currLevel <= maxLevel));
            return currLevel;
        }
    }

    // Defined for code readability. Returns whether a binary state is "on" or "off".
    function skillActive(stateLabel) {
        const presentations = allCalcStateSpec.get("Skill Trigger Conditions").get(stateLabel).presentations;
        const numPossibleStates = presentations.length;
        assert(numPossibleStates === 2);
        const stateValue = allCalcState.get("Skill Trigger Conditions").get(stateLabel);
        assert(isInt(stateValue) && (stateValue >= 0) && (stateValue < 2));
        return (stateValue === 1);
    }

    //
    // STAGE 1: We get all the variables we need.
    //

    const weaponRaw          = weaponRO.attack;
    const weaponAffinity     = weaponRO.affinity;
    const weaponEleStatType  = weaponRO.eleStatType;
    const weaponEleStatValue = weaponRO.eleStatValue;
    const weaponMaxSharpness = weaponRO.maxSharpness;

    const weaponDefense = weaponRO.defense;

    //
    // STAGE 2
    //

    const baseRaw      = weaponRaw;
    const baseAffinity = weaponAffinity;

    //
    // STAGE 3: Find Sharpness Modifiers
    //

    const s = getSharpnessValues(weaponMaxSharpness, skillLevel("handicraft"))
    const realSharpnessBar = s.realSharpnessBar;
    const rawSharpnessModifier = s.rawSharpnessModifier;
    const elementalSharpnessModifier = s.elementalSharpnessModifier;

    //
    // STAGE 4: Find and Apply Crit Modifiers
    //

    const critDamageMultiplier = criticalBoostDamageMultipliers[skillLevel("critical_boost")];

    const critModifier = (()=>{
            if (baseAffinity < 0) {
                // Negative affinity causes chance for "blunder"
                const blunderChance = (baseAffinity < -100) ? -1 : -(baseAffinity / 100)
                return (blunderDamageMultiplier * blunderChance) + (1 - blunderChance);
            } else {
                // Positive affinity causes chance for extra damage
                const critChance = (baseAffinity > 100) ? 1 : (baseAffinity / 100)
                return (critDamageMultiplier * critChance) + (1 - critChance);
            }
        })();

    //
    // STAGE 5: We finally calculate effective raw!
    //

    const effectiveRaw = baseRaw * rawSharpnessModifier * critModifier;


    const ret = {
        effectiveRaw: effectiveRaw,
        affinity:     baseAffinity,

        critDmgMultiplier: critDamageMultiplier,
        critModifier:      critModifier,

        realSharpnessBar:           realSharpnessBar,
        rawSharpnessModifier:       rawSharpnessModifier,
        elementalSharpnessModifier: elementalSharpnessModifier

    };
    return ret;
}


/****************************************************************************************/
/*  Sharpness  **************************************************************************/
/****************************************************************************************/


function getSharpnessValues(maxSharpness, handicraftLevel) {
    const realSharpnessBar = applyHandicraft(maxSharpness, handicraftLevel);
    const highestSharpnessLevel = getHighestSharpnessIndex(realSharpnessBar);
    return {
        realSharpnessBar:           realSharpnessBar,
        rawSharpnessModifier:       rawSharpnessModifiers[highestSharpnessLevel],
        elementalSharpnessModifier: elementalSharpnessModifiers[highestSharpnessLevel]
    };
}


function applyHandicraft(maxSharpness, handicraftLevel) {
    assert(isArr(maxSharpness) && (maxSharpness.length === 6)); // We only go up to white sharpness
    assert(isInt(handicraftLevel) && (handicraftLevel >= 0) && (handicraftLevel <= 5));

    const realSharpnessBar = [...maxSharpness];
    let hitsToSubtract = 50 - (handicraftLevel * 10);

    assert(isInt(hitsToSubtract) && (hitsToSubtract >= 0)) && (hitsToSubtract <= 50);

    for (let i = realSharpnessBar.length - 1; i >= 0; --i) {
        const currHits = realSharpnessBar[i];
        const newHits = currHits - hitsToSubtract;
        if (newHits < 0) {
            hitsToSubtract = -newHits;
            realSharpnessBar[i] = 0;
        } else {
            hitsToSubtract = 0;
            realSharpnessBar[i] = newHits;
        }
    }
    return realSharpnessBar;
}


function getHighestSharpnessIndex(realSharpnessBar) {
    assert(isArr(realSharpnessBar) && (realSharpnessBar.length === 6)); // We only go up to white sharpness
    
    let highestIndex = null;
    for (let i = realSharpnessBar.length - 1; i >= 0; --i) {
        if (realSharpnessBar[i] > 0) {
            highestIndex = i;
            break;
        }
    }
    assert(highestIndex !== null); // We always find a sharpness level
    return highestIndex;
}


export {calculateBuildPerformance};

