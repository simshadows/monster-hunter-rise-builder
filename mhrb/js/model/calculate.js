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
    isSet,
} from "../check.js";
import {
    isDecoEquippableSlotStr,
    isWeaponCategoryStr,
    isEleStatStr,
    isArmourSlotStr,
    getWeaponTags,
    toNameFilterString,
} from "../common.js";
import {
    sum,
} from "../utils.js";

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
    assert(isMap(allCurrentSkills));

    const allCurrentRampSkills = (()=>{
            const x = build.getRampSkills(db);
            assert(isArr(x));
            return new Set(x);
        })();
    assert(isSet(allCurrentRampSkills));

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

    // Defined for code readability
    function sumHits(sharpnessValues) {
        return sharpnessValues.reduce(sum);
    }

    //
    // STAGE 1: We get all the variables we need.
    //
    // We consider "weapon values to be the values before rampage skills are applied.
    //

    const tagset = getWeaponTags(weaponRO.category);

    const weaponRaw           = weaponRO.attack;
    const weaponAffinity      = weaponRO.affinity;
    const weaponEleStat       = weaponRO.eleStat;
    const weaponBaseSharpness = weaponRO.baseSharpness;
    const weaponMaxSharpness  = weaponRO.maxSharpness;
    const weaponDefense = weaponRO.defense;

    //
    // STAGE 2: Calculating base values.
    //
    // We consider "base values" to be the weapon's values after rampage skills are applied.
    //

    let baseRaw      = weaponRaw;
    let baseAffinity = weaponAffinity;

    //
    // STAGE 3: Find Sharpness Modifiers
    //

    let realSharpnessBar           = null;
    let rawSharpnessModifier       = null;
    let elementalSharpnessModifier = null;

    if (tagset.has("melee")) {
        
        // We first determine if the sharpness bar is full.

        const baseSharpnessTotalHits = sumHits(weaponBaseSharpness);
        const maxSharpnessTotalHits = sumHits(weaponMaxSharpness);

        const barIsFull = (()=>{
                if (baseSharpnessTotalHits === maxSharpnessTotalHits) {
                    return true;
                } else {
                    // TODO: Do this check again during database initialization.
                    assert(baseSharpnessTotalHits + 50 === maxSharpnessTotalHits);
                    return false;
                }
            })();

        // If the bar is full, we consider handicraft to be max for this calculation.
        const effectiveHandicraftLevel = (barIsFull) ? 5 : skillLevel("handicraft");

        // Now, we apply this effective handicraft level.
        const s = getSharpnessValues(weaponMaxSharpness, effectiveHandicraftLevel);
        realSharpnessBar           = s.realSharpnessBar;
        rawSharpnessModifier       = s.rawSharpnessModifier;
        elementalSharpnessModifier = s.elementalSharpnessModifier;
    }

    //
    // STAGE 4: Find and Apply Crit Modifiers
    //

    const rawCritDamageMultiplier = criticalBoostDamageMultipliers[skillLevel("critical_boost")];

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

        weaponAttack:   weaponRaw,
        weaponAffinity: weaponAffinity,
        weaponDefense:  weaponDefense,
        weaponEleStat:  weaponEleStat,

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

