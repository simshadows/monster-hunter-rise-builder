/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {Build} from "../build.js";
import {CalcState} from "../calc_state.js";

import {getBaseValues} from "./step1_get_base_values.js";
import {getSkillContributions} from "./step2_get_skill_contributions.js";

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
import {
    getWeaponTags,
} from "../../common.js";
import {
    sum,
} from "../../utils.js";

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
    const tagset   = getWeaponTags(weaponRO.category);

    const allCalcStateSpec = calcState.getSpecification();
    const allCalcState = calcState.getCurrState();

    console.log(build.getCurrentSkills());

    //
    // STAGE 1: Calculating base values.
    //
    // We obtain base values by getting the weapon's original values, then applying all rampage skills.
    //

    const baseValues = getBaseValues(db, build, calcState);

    // Make sure we're not missing anything
    assert(Object.keys(baseValues).length === 6);

    // Raw
    const baseRaw      = baseValues.baseRaw;
    const baseAffinity = baseValues.baseAffinity;
    // Elemental
    const baseEleStat  = baseValues.baseEleStat;
    // Sharpness
    const minSharpness = baseValues.minSharpness;
    const maxSharpness = baseValues.maxSharpness;
    // Defense
    const baseDefense  = baseValues.baseDefense;

    //
    // STAGE 2: Gathering skill contribution values
    //

    const skillContribution = getSkillContributions(db, build, calcState);

    // Make sure we're not missing anything
    assert(Object.keys(skillContribution).length === 4);

    const addRaw      = skillContribution.addRaw;
    const multiplyRaw = skillContribution.multiplyRaw;

    const handicraftLevel    = skillContribution.handicraftLevel;
    const criticalBoostLevel = skillContribution.criticalBoostLevel;

    //
    // STAGE 3: Find Sharpness Modifiers
    //

    let realSharpnessBar           = null;
    let rawSharpnessModifier       = null;
    let elementalSharpnessModifier = null;

    if (tagset.has("melee")) {
        
        // We first determine if the sharpness bar is full.

        const minSharpnessTotalHits = minSharpness.reduce(sum);
        const maxSharpnessTotalHits = maxSharpness.reduce(sum);

        const barIsFull = (()=>{
                if (minSharpnessTotalHits === maxSharpnessTotalHits) {
                    return true;
                } else {
                    // TODO: Do this check again during database initialization.
                    assert(minSharpnessTotalHits + 50 === maxSharpnessTotalHits);
                    return false;
                }
            })();

        // If the bar is full, we consider handicraft to be max for this calculation.
        const effectiveHandicraftLevel = (barIsFull) ? 5 : handicraftLevel;

        // Now, we apply this effective handicraft level.
        const s = getSharpnessValues(maxSharpness, effectiveHandicraftLevel);
        realSharpnessBar           = s.realSharpnessBar;
        rawSharpnessModifier       = s.rawSharpnessModifier;
        elementalSharpnessModifier = s.elementalSharpnessModifier;
    }

    //
    // STAGE 4: Find and Apply Crit Modifiers
    //

    const rawCritDamageMultiplier = criticalBoostDamageMultipliers[criticalBoostLevel];

    const rawCritModifier = (()=>{
            if (baseAffinity < 0) {
                // Negative affinity causes chance for "blunder"
                const blunderChance = (baseAffinity < -100) ? -1 : -(baseAffinity / 100)
                return (blunderDamageMultiplier * blunderChance) + (1 - blunderChance);
            } else {
                // Positive affinity causes chance for extra damage
                const critChance = (baseAffinity > 100) ? 1 : (baseAffinity / 100)
                return (rawCritDamageMultiplier * critChance) + (1 - critChance);
            }
        })();

    //
    // STAGE 5: We finally calculate effective raw!
    //

    let effectiveRaw = baseRaw * rawCritModifier;

    if (tagset.has("melee")) {
        effectiveRaw = effectiveRaw * rawSharpnessModifier;
    }

    const ret = {

        // This part goes to the equips section
        // TODO: Rename it to baseAttack, etc.

        weaponAttack:   baseRaw,
        weaponAffinity: baseAffinity,
        weaponDefense:  baseDefense,
        weaponEleStat:  baseEleStat,

        // The rest goes to the calculated values section

        effectiveRaw: effectiveRaw,
        affinity:     baseAffinity,

        rawCritDmgMultiplier: rawCritDamageMultiplier,
        rawCritModifier:      rawCritModifier,

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

