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
    isEleStr,
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


const bowgunAmmoUpCapacityTable = new Map([
    // [id, [Ammo Up 1, Ammo Up 2, Ammo Up 3]]

    ["normal_1", [1, 1, 2]], ["pierce_1", [1, 1, 2]], ["spread_1", [1, 1, 2]],
    ["normal_2", [0, 1, 2]], ["pierce_2", [0, 1, 1]], ["spread_2", [0, 1, 1]],
    ["normal_3", [0, 0, 1]], ["pierce_3", [0, 0, 1]], ["spread_3", [0, 0, 1]],

    ["shrapnel_1", [1, 1, 2]], ["sticky_1", [0, 1, 1]], ["cluster_1", [0, 0, 1]],
    ["shrapnel_2", [0, 1, 2]], ["sticky_2", [0, 0, 1]], ["cluster_2", [0, 0, 1]],
    ["shrapnel_3", [0, 0, 1]], ["sticky_3", [0, 0, 1]], ["cluster_3", [0, 0, 1]],

    ["fire"   , [0, 1, 1]], ["piercing_fire"   , [0, 1, 1]],
    ["water"  , [0, 1, 1]], ["piercing_water"  , [0, 1, 1]],
    ["thunder", [0, 1, 1]], ["piercing_thunder", [0, 1, 1]],
    ["ice"    , [0, 1, 1]], ["piercing_ice"    , [0, 1, 1]],
    ["dragon" , [0, 0, 1]], ["piercing_dragon" , [0, 0, 1]],

    ["poison_1", [0, 1, 1]], ["paralysis_1", [0, 0, 1]], ["sleep_1", [0, 0, 1]],
    ["poison_2", [0, 0, 1]], ["paralysis_2", [0, 0, 1]], ["sleep_2", [0, 0, 1]],

    ["exhaust_1", [0, 0, 1]], ["recover_1", [0, 1, 1]],
    ["exhaust_2", [0, 0, 1]], ["recover_2", [0, 0, 1]],

    ["demon"  , [0, 0, 1]],
    ["armor"  , [0, 0, 1]],
    ["slicing", [0, 1, 1]],
    ["wyvern" , [0, 0, 0]],
    ["tranq"  , [1, 1, 1]],
]);


const bowgunRecoilPerAmmoTable = new Map([
    // Converts main stat into ammo-specific recoil values.
    // Main stat is:                Ammo-specific values are:
    //      5 = High                    3 = Very High
    //      4 = Average                 2 = High
    //      3 = Some                    1 = Average
    //      2 = Low                     0 = Low
    //      1 = Very Low
    //      0 = Smallest

    ["normal_1", [0,0,0,0,0,0]], ["pierce_1", [0,0,0,0,0,1]], ["spread_1", [0,0,0,0,0,1]],
    ["normal_2", [0,0,0,0,0,1]], ["pierce_2", [0,0,0,1,2,2]], ["spread_2", [0,0,0,0,1,2]],
    ["normal_3", [0,0,0,0,0,1]], ["pierce_3", [0,0,0,1,2,2]], ["spread_3", [0,0,0,1,2,2]],

    ["shrapnel_1", [0,0,0,0,0,1]], ["sticky_1", [0,0,0,1,2,2]], ["cluster_1", [0,1,2,2,3,3]],
    ["shrapnel_2", [0,0,0,0,1,2]], ["sticky_2", [0,0,1,2,2,3]], ["cluster_2", [1,2,2,3,3,3]],
    ["shrapnel_3", [0,0,0,1,2,2]], ["sticky_3", [0,0,1,2,2,3]], ["cluster_3", [1,2,2,3,3,3]],

    ["fire"   , [0,0,0,0,0,1]], ["piercing_fire"   , [0,0,0,0,1,2]],
    ["water"  , [0,0,0,0,0,1]], ["piercing_water"  , [0,0,0,0,1,2]],
    ["thunder", [0,0,0,0,0,1]], ["piercing_thunder", [0,0,0,0,1,2]],
    ["ice"    , [0,0,0,0,0,1]], ["piercing_ice"    , [0,0,0,0,1,2]],
    ["dragon" , [0,0,1,2,2,3]], ["piercing_dragon" , [1,2,2,3,3,3]],

    ["poison_1", [0,0,1,2,2,3]], ["paralysis_1", [0,0,1,2,2,3]], ["sleep_1", [0,0,1,2,2,3]],
    ["poison_2", [1,2,2,3,3,3]], ["paralysis_2", [1,2,2,3,3,3]], ["sleep_2", [1,2,2,3,3,3]],

    ["exhaust_1", [0,0,0,1,2,2]], ["recover_1", [0,0,0,0,1,2]],
    ["exhaust_2", [0,0,1,2,2,3]], ["recover_2", [0,0,1,2,2,3]],

    ["demon"  , [0,0,0,0,1,2]],
    ["armor"  , [0,0,0,0,1,2]],
    ["slicing", [0,0,1,2,2,3]],
    ["wyvern" , [null,null,null,null,null,null]], // The UI writes "Wyvern" for this one
    ["tranq"  , [0,0,0,0,1,2]],
]);


const bowgunReloadPerAmmoTable = new Map([
    // Converts main stat into ammo-specific reload values.
    // Main stat is:                Ammo-specific values are:
    //      0 = Slowest                 0 = Slowest
    //      1 = Very Slow               1 = Slow
    //      2 = Slow                    2 = Fast
    //      3 = Below Avg.              3 = Fastest
    //      4 = Average
    //      5 = Above Avg.
    //      6 = Fast
    //      7 = Very Fast
    //      8 = Fastest

    ["normal_1", [1,1,2,3,3,3,3,3,3]], ["pierce_1", [0,1,1,2,2,3,3,3,3]], ["spread_1", [1,1,2,2,3,3,3,3,3]],
    ["normal_2", [1,1,2,2,3,3,3,3,3]], ["pierce_2", [0,0,1,1,2,2,3,3,3]], ["spread_2", [0,1,1,2,2,3,3,3,3]],
    ["normal_3", [0,1,1,2,2,3,3,3,3]], ["pierce_3", [0,0,1,1,2,2,3,3,3]], ["spread_3", [0,0,1,1,2,2,3,3,3]],

    ["shrapnel_1", [1,1,2,2,3,3,3,3,3]], ["sticky_1", [0,0,1,1,2,2,3,3,3]],
    ["shrapnel_2", [0,1,1,2,2,3,3,3,3]], ["sticky_2", [0,0,0,1,1,2,2,3,3]],
    ["shrapnel_3", [0,0,1,1,2,2,3,3,3]], ["sticky_3", [0,0,0,0,1,1,2,2,3]],

    ["cluster_1", [0,0,0,0,1,1,2,2,3]],
    ["cluster_2", [0,0,0,0,0,1,1,2,2]],
    ["cluster_3", [0,0,0,0,0,1,1,2,2]], // Main stat "Slowest" and "Very Slow" have guessed ammo-specific values.

    ["fire"   , [0,1,1,2,2,3,3,3,3]], ["piercing_fire"   , [0,0,1,1,2,2,3,3,3]],
    ["water"  , [0,1,1,2,2,3,3,3,3]], ["piercing_water"  , [0,0,1,1,2,2,3,3,3]],
    ["thunder", [0,1,1,2,2,3,3,3,3]], ["piercing_thunder", [0,0,1,1,2,2,3,3,3]],
    ["ice"    , [0,1,1,2,2,3,3,3,3]], ["piercing_ice"    , [0,0,1,1,2,2,3,3,3]],
    ["dragon" , [0,0,0,0,1,1,2,2,3]], ["piercing_dragon" , [0,0,1,1,2,2,3,3,3]],

    ["poison_1", [0,0,1,1,2,2,3,3,3]], ["paralysis_1", [0,0,0,1,1,2,2,3,3]], ["sleep_1", [0,0,0,1,1,2,2,3,3]],
    ["poison_2", [0,0,0,0,1,1,2,2,3]], ["paralysis_2", [0,0,0,0,1,1,2,2,3]], ["sleep_2", [0,0,0,0,1,1,2,2,3]],

    ["exhaust_1", [0,0,1,1,2,2,3,3,3]], ["recover_1", [1,1,2,2,3,3,3,3,3]],
    ["exhaust_2", [0,0,0,1,1,2,2,3,3]], ["recover_2", [0,0,1,1,2,2,3,3,3]],

    ["demon"  , [0,0,0,1,1,2,2,3,3]],
    ["armor"  , [0,0,0,1,1,2,2,3,3]],
    ["slicing", [0,0,0,1,1,2,2,3,3]],
    ["wyvern" , [0,0,0,1,1,2,2,3,3]], // Main stat "Slowest" and "Very Slow" have guessed ammo-specific values.
    ["tranq"  , [1,1,2,2,3,3,3,3,3]],
]);


/****************************************************************************************/
/*  Main Formula  ***********************************************************************/
/****************************************************************************************/


function calculateBuildPerformance(db, build, calcState) {
    assert(isObj(db));
    assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure

    assert(build instanceof Build);
    assert(calcState instanceof CalcState);

    const weaponRO = build.getWeaponObjRO();
    const armourROs = build.getArmourROs();
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

    assert(b.baseRawAdd      !== undefined);
    assert(b.baseRawMul      !== undefined);
    assert(b.rawPostTruncMul !== undefined);

    assert(b.affinityAdd !== undefined);

    assert(b.eleStatMul !== undefined);

    assert(b.narwaSoulActive !== undefined);

    assert(b.gunlanceStats     !== undefined);
    assert(b.huntingHornSongs  !== undefined);
    assert(b.switchaxeStats    !== undefined);
    assert(b.chargebladeStats  !== undefined);
    assert(b.insectglaiveStats !== undefined);
    assert(b.bowStats          !== undefined);
    assert(b.bowgunStats       !== undefined);

    const s = getSkillContributions(db, build, calcState);
    assert(s.rawAdd                  !== undefined);
    assert(s.rawMul                  !== undefined);
    assert(s.affinityAdd             !== undefined);
    assert(s.eleStatAdd              !== undefined);
    assert(s.eleStatMul              !== undefined);
    assert(s.rawBlunderDamage        !== undefined);
    assert(s.rawCriticalDamage       !== undefined);
    assert(s.elementalBlunderDamage  !== undefined);
    assert(s.elementalCriticalDamage !== undefined);
    assert(s.ammoUpLevel             !== undefined);
    assert(s.bludgeonerLevel         !== undefined);
    assert(s.bowChargePlusLevel      !== undefined);
    assert(s.handicraftLevel         !== undefined);
    assert(s.mastersTouchLevel       !== undefined);
    assert(s.razorSharpLevel         !== undefined);
    assert(s.recoilDownLevel         !== undefined);
    assert(s.reloadSpeedLevel        !== undefined);
    assert(s.steadinessLevel         !== undefined);
    assert(s.defenseAdd              !== undefined);
    assert(s.defenseMul              !== undefined);
    assert(s.eleResAdd               !== undefined);

    assert(s.rawPostTruncMul !== undefined);

    const m = getMiscBuffContributions(db, build, calcState);
    assert(m.rawAdd      !== undefined);
    assert(m.rawMul      !== undefined);
    assert(m.affinityAdd !== undefined);
    assert(m.eleMul      !== undefined);
    assert(m.defenseAdd  !== undefined);
    assert(m.defenseMul  !== undefined);

    assert(m.reloadSpeedAdd !== undefined);

    assert(m.sharpnessLevelReduction !== undefined);

    //
    // STAGE 2: Find Sharpness Modifiers
    //

    let realSharpnessBar              = null;
    let maxSharpnessBar               = null;
    let rawSharpnessModifier          = null;
    let elementalSharpnessModifier    = null;

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
        const sharpnessValues = getSharpnessValues(b.maxSharpness, effectiveHandicraftLevel, m.sharpnessLevelReduction);
        realSharpnessBar           = sharpnessValues.realSharpnessBar;
        maxSharpnessBar            = b.maxSharpness;
        rawSharpnessModifier       = sharpnessValues.rawSharpnessModifier;
        elementalSharpnessModifier = sharpnessValues.elementalSharpnessModifier;
    }

    //
    // STAGE 3: Handle some special conditions
    //

    const bludgeonerBaseRawMul = (()=>{
        if (!tagset.has("melee")) return 1;

        const highestSharpnessIndex = getHighestSharpnessIndex(realSharpnessBar);
        if ((s.bludgeonerLevel === 1) && (highestSharpnessIndex <= 2)) { // Yellow or lower
            return 1.05;
        } else if ((s.bludgeonerLevel === 2) && (highestSharpnessIndex <= 2)) { // Yellow or lower
            return 1.1;
        } else if ((s.bludgeonerLevel === 3) && (highestSharpnessIndex <= 3)) { // Green or lower
            return 1.1;
        }
        return 1;
    })();

    const narwaSoulAffinityAdd = (()=>{
        if (!b.narwaSoulActive) return 0;
        // We count Ibushi pieces
        let ibushiPieces = 0;
        for (const [_, armourRO] of Object.entries(armourROs)) {
            if ((armourRO !== null) && (armourRO.setID === 144 || armourRO.setID === 145)) {
                assert(armourRO.setName === "Ibushi"); // Sanity check
                ++ibushiPieces;
            }
        }
        switch (ibushiPieces) {
            case 1: return 4;
            case 2: return 6;
            case 3: return 10;
            case 4: return 12;
            case 5: return 40;
            default: console.error(`Counted ${ibushiPieces} Ibushi armour pieces.`); // Fallthrough
            case 0: return 0;
        }
    })();

    //
    // STAGE 4: Calculate post-base values
    //

    // TODO: It's confusing that we're overloading the term "base raw" here
    const baseRaw = Math.trunc((b.baseRaw * b.baseRawMul) + b.baseRawAdd + 0.1); // TODO: Does this truncation step exist?
    const postbaseRaw = (Math.trunc((baseRaw * s.rawMul * m.rawMul * bludgeonerBaseRawMul) + 0.1) + s.rawAdd + m.rawAdd) * b.rawPostTruncMul * s.rawPostTruncMul;
    const postbaseAffinity = b.baseAffinity + b.affinityAdd + s.affinityAdd + m.affinityAdd + narwaSoulAffinityAdd;

    const postbaseEleStat = new Map();
    for (const [eleStatID, baseEleStatValue] of b.baseEleStat.entries()) {
        let x = baseEleStatValue * s.eleStatMul[eleStatID] * b.eleStatMul[eleStatID];
        if (isEleStr(eleStatID)) {
            x *= m.eleMul;
        }
        const postbaseEleStatValue = Math.trunc(x) + s.eleStatAdd[eleStatID];
        postbaseEleStat.set(eleStatID, postbaseEleStatValue);
    }

    let hitsMultiplier = 1; // To be accumulated over later

    //
    // STAGE 5: Find and Apply Crit Modifiers
    //

    const critChance = Math.min(postbaseAffinity, 100) / 100; // Clip values to 1 or less

    function getCritModifier(critDamage, blunderDamage) {
        if (critChance < 0) {
            // Negative affinity causes chance for "blunder"
            const blunderChance = -Math.max(critChance, -1); // Clip values to 1 or above, then convert to positive probability
            return (blunderDamage * blunderChance) + (1 - blunderChance);
        } else {
            // Positive affinity causes chance for extra damage
            return (critDamage * critChance) + (1 - critChance);
        }
    }
    const rawCritModifier = getCritModifier(s.rawCriticalDamage, s.rawBlunderDamage);
    const elementalCritModifier = getCritModifier(s.elementalCriticalDamage, s.elementalBlunderDamage);

    //
    // STAGE 6: Apply Master's Touch and Razor Sharp to the sharpness bar
    //

    // Innate razor sharp
    switch (weaponRO.category) {
        case "dualblades":   hitsMultiplier *= 3;   break; // 2/3 razor sharp, i.e. 1 of 3 hits reduces sharpness
        case "insectglaive": hitsMultiplier *= 1.5; break; // 1/3 razor sharp, i.e. 2 of 3 hits reduces sharpness
        default:
            // Do nothing
    }

    if (s.razorSharpLevel > 0) {
        const chanceOfNoSharpnessLoss = (()=>{
                switch (s.razorSharpLevel) {
                    case 1: return 0.10;
                    case 2: return 0.25;
                    case 3: return 0.50;
                    default:
                        console.warn("Unexpected Razor Sharp level: " + String(s.razorSharpLevel));
                        return 0;
                }
            })();
        hitsMultiplier *= 1 / (1 - chanceOfNoSharpnessLoss)
    }

    if ((s.mastersTouchLevel > 0) && (critChance > 0)) {
        const chanceOfNoSharpnessLossOnCrit = (()=>{
                switch (s.mastersTouchLevel) {
                    case 1: return 0.2;
                    case 2: return 0.4;
                    case 3: return 0.8;
                    default:
                        console.warn("Unexpected Master's Touch level: " + String(s.mastersTouchLevel));
                        return 0;
                }
            })();
        const chanceOfNoSharpnessLoss = chanceOfNoSharpnessLossOnCrit * critChance;
        hitsMultiplier *= 1 / (1 - chanceOfNoSharpnessLoss)
    }

    //
    // STAGE 7: We finally calculate effective raw!
    //

    let effectiveRaw = postbaseRaw * rawCritModifier;
    if (tagset.has("melee")) {
        effectiveRaw *= rawSharpnessModifier;
    }

    let effectiveEleStat = new Map();
    for (const [eleStatID, postbaseEleStatValue] of postbaseEleStat.entries()) {
        let effectiveEleStatValue = postbaseEleStatValue;
        if (isEleStr(eleStatID)) {
            effectiveEleStatValue *= elementalCritModifier;
            if (tagset.has("melee")) {
                effectiveEleStatValue *= elementalSharpnessModifier;
            }
        }
        effectiveEleStat.set(eleStatID, effectiveEleStatValue);
    }

    //
    // STAGE 8: Special Mechanics
    //

    let gunlanceStats = b.gunlanceStats;
    assert((weaponRO.category === "gunlance") === (gunlanceStats !== null));

    let huntingHornSongs = b.huntingHornSongs;
    assert((weaponRO.category === "huntinghorn") === (huntingHornSongs !== null));

    let switchAxeStats = b.switchaxeStats;
    assert((weaponRO.category === "switchaxe") === (switchAxeStats !== null));

    let chargeBladeStats = b.chargebladeStats;
    assert((weaponRO.category === "chargeblade") === (chargeBladeStats !== null));

    let insectglaiveStats = b.insectglaiveStats;
    assert((weaponRO.category === "insectglaive") === (insectglaiveStats !== null));

    let bowStats = b.bowStats;
    assert((weaponRO.category === "bow") === (bowStats !== null));
    if ((weaponRO.category === "bow") && (s.bowChargePlusLevel !== 0)) {
        assert(s.bowChargePlusLevel === 1);
        const cllMax = bowStats.chargeShot.length;
        const cll = bowStats.chargeLevelLimit;
        assert((cllMax === cll) || (cllMax === cll + 1)); // Assume cll is at most -1 of max
        bowStats.chargeLevelLimit = cllMax; // Sets chargeLevelLimit to max
    }

    let bowgunStats = b.bowgunStats;
    assert(((weaponRO.category === "lightbowgun") || (weaponRO.category === "heavybowgun")) === (bowgunStats !== null));
    if ((weaponRO.category === "lightbowgun") || (weaponRO.category === "heavybowgun")) {
        bowgunStats.reload += m.reloadSpeedAdd;
        applyBuffsToBowgunAmmoAndClamp(bowgunStats, s.ammoUpLevel, s.recoilDownLevel, s.reloadSpeedLevel, s.steadinessLevel);
    }

    const ret = {

        // This part goes to the equips section
        // TODO: Rename it to baseAttack, etc.

        weaponAttack:   baseRaw,
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
        maxSharpnessBar:            maxSharpnessBar,
        hitsMultiplier:             hitsMultiplier,
        rawSharpnessModifier:       rawSharpnessModifier,
        elementalSharpnessModifier: elementalSharpnessModifier,

        gunlanceStats:     gunlanceStats,
        huntingHornSongs:  huntingHornSongs,
        switchAxeStats:    switchAxeStats,
        chargeBladeStats:  chargeBladeStats,
        insectGlaiveStats: insectglaiveStats,
        bowStats:          bowStats,
        bowgunStats:       bowgunStats,
    };
    return ret;
}


/****************************************************************************************/
/*  Sharpness  **************************************************************************/
/****************************************************************************************/


function getSharpnessValues(maxSharpness, handicraftLevel, sharpnessLevelReduction) {
    const realSharpnessBar = applyHandicraft(maxSharpness, handicraftLevel);

    let r = sharpnessLevelReduction;
    for (let i = realSharpnessBar.length - 1; i > 0; --i) {
        if (r <= 0) break;
        if (realSharpnessBar[i] > 0) {
            realSharpnessBar[i] = 0;
            --r;
        }
    }

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


/****************************************************************************************/
/*  Bowguns  ****************************************************************************/
/****************************************************************************************/


// IMPURE FUNCTION. Will modify the bowgun ammo object with new values.
function applyBuffsToBowgunAmmoAndClamp(bowgunStats, ammoUpLevel, recoilDownLevel, reloadSpeedLevel, steadinessLevel) {
    assert((ammoUpLevel >= 0) && (ammoUpLevel <= 3));

    bowgunStats.deviation.severity = Math.max(0, Math.min(2, bowgunStats.deviation.severity - steadinessLevel));
    const recoilStage = bowgunStats.recoil = Math.max(0, Math.min(5, bowgunStats.recoil - recoilDownLevel));
    const reloadStage = bowgunStats.reload = Math.max(0, Math.min(8, bowgunStats.reload + reloadSpeedLevel));

    const keys = Object.keys(bowgunStats.ammo);
    for (const k of keys) {
        if (ammoUpLevel > 0) {
            const addedCapacity = bowgunAmmoUpCapacityTable.get(k)[ammoUpLevel - 1];
            assert(addedCapacity !== undefined);
            bowgunStats.ammo[k].ammoCapacity += addedCapacity;
        }
        bowgunStats.ammo[k].recoil = bowgunRecoilPerAmmoTable.get(k)[recoilStage];
        assert(bowgunStats.ammo[k].recoil >= 0);
        assert(bowgunStats.ammo[k].recoil <= 3);

        bowgunStats.ammo[k].reload = bowgunReloadPerAmmoTable.get(k)[reloadStage];
        assert(bowgunStats.ammo[k].reload >= 0);
        assert(bowgunStats.ammo[k].reload <= 3);
    }
}


export {calculateBuildPerformance};

