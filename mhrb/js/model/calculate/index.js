/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {Build} from "../build.js";
import {CalcState} from "../calc_state.js";

import {getBaseValues} from "./step1_get_base_values.js";
import {getSkillContributions} from "./step2_get_skill_contributions.js";
import {getMiscBuffContributions} from "./step3_get_misc_buff_contributions.js";

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

    //
    // STAGE 1: Calculating base values and skill contributions.
    //
    // We obtain base values by getting the weapon's original values, then applying all rampage skills.
    //

    const b = getBaseValues(db, build, calcState);
    assert(b.baseRaw      !== undefined);
    assert(b.baseAffinity !== undefined);
    assert(b.baseEleStat  !== undefined);
    assert(b.minSharpness !== undefined);
    assert(b.maxSharpness !== undefined);
    assert(b.baseDefense  !== undefined);

    const s = getSkillContributions(db, build, calcState);
    assert(s.rawAdd                  !== undefined);
    assert(s.rawMul                  !== undefined);
    assert(s.affinityAdd             !== undefined);
    assert(s.rawBlunderDamage        !== undefined);
    assert(s.rawCriticalDamage       !== undefined);
    assert(s.elementalBlunderDamage  !== undefined);
    assert(s.elementalCriticalDamage !== undefined);
    assert(s.handicraftLevel         !== undefined);

    const m = getMiscBuffContributions(db, build, calcState);
    assert(m.rawAdd  !== undefined);
    assert(m.defense !== undefined);

    //
    // STAGE 2: Calculate post-base values
    //

    const postbaseRaw      = Math.trunc(b.baseRaw * s.rawMul) + s.rawAdd + m.rawAdd;
    const postbaseAffinity = b.baseAffinity + s.affinityAdd;

    const postbaseEleStat = b.baseEleStat;

    //
    // STAGE 3: Find Sharpness Modifiers
    //

    let realSharpnessBar           = null;
    let rawSharpnessModifier       = null;
    let elementalSharpnessModifier = null;

    if (tagset.has("melee")) {
        
        // We first determine if the sharpness bar is full.

        const minSharpnessTotalHits = b.minSharpness.reduce(sum);
        const maxSharpnessTotalHits = b.maxSharpness.reduce(sum);

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
        const effectiveHandicraftLevel = (barIsFull) ? 5 : s.handicraftLevel;

        // Now, we apply this effective handicraft level.
        const sharpnessValues = getSharpnessValues(b.maxSharpness, effectiveHandicraftLevel);
        realSharpnessBar           = sharpnessValues.realSharpnessBar;
        rawSharpnessModifier       = sharpnessValues.rawSharpnessModifier;
        elementalSharpnessModifier = sharpnessValues.elementalSharpnessModifier;
    }

    //
    // STAGE 4: Find and Apply Crit Modifiers
    //

    function getCritModifier(critDamage, blunderDamage) {
        if (postbaseAffinity < 0) {
            // Negative affinity causes chance for "blunder"
            const blunderChance = -(Math.max(postbaseAffinity, -100) / 100); // Clip and convert to probability
            return (blunderDamage * blunderChance) + (1 - blunderChance);
        } else {
            // Positive affinity causes chance for extra damage
            const critChance = Math.min(postbaseAffinity, 100) / 100; // Clip and convert to probability
            return (critDamage * critChance) + (1 - critChance);
        }
    }
    const rawCritModifier = getCritModifier(s.rawCriticalDamage, s.rawBlunderDamage);
    const elementalCritModifier = getCritModifier(s.elementalCriticalDamage, s.elementalBlunderDamage);

    //
    // STAGE 5: We finally calculate effective raw!
    //

    let effectiveRaw     = postbaseRaw * rawCritModifier;
    let effectiveEleStat = postbaseEleStat;

    if (tagset.has("melee")) {
        effectiveRaw = effectiveRaw * rawSharpnessModifier;
    }

    const ret = {

        // This part goes to the equips section
        // TODO: Rename it to baseAttack, etc.

        weaponAttack:   b.baseRaw,
        weaponAffinity: b.baseAffinity,
        weaponDefense:  b.baseDefense,
        weaponEleStat:  b.baseEleStat,

        // The rest goes to the calculated values section

        effectiveRaw:     effectiveRaw,
        effectiveEleStat: effectiveEleStat,
        affinity:         postbaseAffinity,

        rawCritDmgMultiplier:       s.rawCriticalDamage,
        rawCritModifier:            rawCritModifier,
        elementalCritDmgMultiplier: s.elementalCriticalDamage,
        elementalCritModifier:      elementalCritModifier,

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

