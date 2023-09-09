/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type SharpnessMutable,
    type Sharpness,
    isBowgunRecoil,
    isBowgunReload,
    clampBowgunRecoil,
    clampBowgunReload,
    clampBowgunDeviationSeverity,
    isBowChargeLevelLimit,
    type BowgunStatsMutable,
    isBowgunAmmoType,
} from "../../common/types";

import {
    type MHRDatabase,
} from "../../database";
import {Build} from "../build";
import {CalcState} from "../calc_state";

import {getBaseValues} from "./step1_get_base_values";
import {getSkillContributions} from "./step2_get_skill_contributions";
import {getMiscBuffContributions} from "./step3_get_misc_buff_contributions";

import {
    isEleStr,
    getWeaponTags,
} from "../../common";
import {
    sum,
} from "../../utils";


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
    1.39, // 7: Purple
];


const elementalSharpnessModifiers = [
    0.25,   // 1: Red
    0.50,   // 2: Orange
    0.75,   // 3: Yellow
    1.00,   // 4: Green
    1.0625, // 5: Blue
    1.15,   // 6: White
    1.25,   // 7: Purple
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


function calculateBuildPerformance(
    db:        {"readonly": MHRDatabase},
    build:     Build,
    calcState: CalcState,
) {

    const weaponRO = build.getWeaponObjRO();
    const armourROs = build.getArmourROs();
    const tagset   = getWeaponTags(weaponRO.category);

    //
    // STAGE 1: Calculating base values and skill contributions.
    //
    // We obtain base values by getting the weapon's original values, then applying all rampage skills.
    //

    const b = getBaseValues(db, build, calcState);
    console.log(b);

    const s = getSkillContributions(db, build, calcState);

    const m = getMiscBuffContributions(db, build, calcState);

    //
    // STAGE 2: Find Sharpness Modifiers
    //

    let realSharpnessBar;
    let maxSharpnessBar;
    let rawSharpnessModifier;
    let elementalSharpnessModifier;

    if (tagset.has("melee")) {
        
        // We first determine if the sharpness bar is full.

        // TODO: Remove this runtime type check
        if (b.meleeStats === null) {
            throw new Error("Unexpected null.");
        }

        const minSharpnessTotalHits = b.meleeStats.minSharpness.reduce(sum);
        const maxSharpnessTotalHits = b.meleeStats.maxSharpness.reduce(sum);

        const barIsFull = (()=>{
                if (minSharpnessTotalHits === maxSharpnessTotalHits) {
                    return true;
                } else {
                    // TODO: Do this check again during database initialization.
                    if (minSharpnessTotalHits + 50 !== maxSharpnessTotalHits) {
                        throw new Error("Mismatch");
                    }
                    return false;
                }
            })();

        // If the bar is full, we consider handicraft to be max for this calculation.
        const effectiveHandicraftLevel = (barIsFull) ? 5 : s.handicraftLevel;

        // Now, we apply this effective handicraft level.
        const sharpnessValues = getSharpnessValues(
            b.meleeStats.maxSharpness,
            effectiveHandicraftLevel,
            m.sharpnessLevelReduction,
        );
        realSharpnessBar           = sharpnessValues.realSharpnessBar;
        maxSharpnessBar            = b.meleeStats.maxSharpness;
        rawSharpnessModifier       = sharpnessValues.rawSharpnessModifier;
        elementalSharpnessModifier = sharpnessValues.elementalSharpnessModifier;
    }

    //
    // STAGE 3: Handle some special conditions
    //

    const bludgeonerBaseRawMul = (()=>{
        if (!realSharpnessBar) return 1;
        if (!tagset.has("melee")) throw new Error("Expected melee.");

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
                if (armourRO.setName !== "Ibushi") throw new Error("Failed sanity check.");
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

    function getCritModifier(critDamage: number, blunderDamage: number) {
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
    if (rawSharpnessModifier !== undefined) {
        if (!tagset.has("melee")) throw new Error("Expected melee.");
        effectiveRaw *= rawSharpnessModifier;
    }

    let effectiveEleStat = new Map();
    for (const [eleStatID, postbaseEleStatValue] of postbaseEleStat.entries()) {
        let effectiveEleStatValue = postbaseEleStatValue;
        if (isEleStr(eleStatID)) {
            effectiveEleStatValue *= elementalCritModifier;
            if (elementalSharpnessModifier) {
                if (!tagset.has("melee")) throw new Error("Expected melee.");
                effectiveEleStatValue *= elementalSharpnessModifier;
            }
        }
        effectiveEleStat.set(eleStatID, effectiveEleStatValue);
    }

    //
    // STAGE 8: Special Mechanics
    //

    let gunlanceStats = b.glStats;
    if ((weaponRO.category === "gunlance") !== (gunlanceStats !== null)) {
        throw new Error("Mismatch.");
    }

    let huntingHornSongs = b.hhStats;
    if ((weaponRO.category === "huntinghorn") !== (huntingHornSongs !== null)) {
        throw new Error("Mismatch.");
    }

    let switchAxeStats = b.saStats;
    if ((weaponRO.category === "switchaxe") !== (switchAxeStats !== null)) {
        throw new Error("Mismatch.");
    }

    let chargeBladeStats = b.cbStats;
    if ((weaponRO.category === "chargeblade") !== (chargeBladeStats !== null)) {
        throw new Error("Mismatch.");
    }

    let insectglaiveStats = b.igStats;
    if ((weaponRO.category === "insectglaive") !== (insectglaiveStats !== null)) {
        throw new Error("Mismatch.");
    }

    let bowStats = b.bowStats;
    if ((weaponRO.category === "bow") !== (bowStats !== null)) {
        throw new Error("Mismatch.");
    }
    if ((weaponRO.category === "bow") && (s.bowChargePlusLevel !== 0)) {
        if (s.bowChargePlusLevel !== 1) throw new Error();
        if (!bowStats) throw new Error("Unexpected null/undefined.");
        const cllMax = bowStats.chargeShot.length;
        const cll = bowStats.chargeLevelLimit;
        if (!((cllMax === cll) || (cllMax === cll + 1))) throw new Error("CLL should be at most -1 of max.");
        if (!isBowChargeLevelLimit(cllMax)) throw new Error(`Invalid value ${cllMax}`);
        bowStats.chargeLevelLimit = cllMax; // Sets chargeLevelLimit to max
    }

    let bowgunStats = b.bowgunStats;
    if (
        ((weaponRO.category === "lightbowgun") || (weaponRO.category === "heavybowgun"))
        !== (bowgunStats !== null)
    ) {
        throw new Error("Mismatch.");
    }
    if (bowgunStats) {
        if ((weaponRO.category !== "lightbowgun") && (weaponRO.category !== "heavybowgun")) {
            throw new Error(`Invalid category ${weaponRO.category}`);
        }
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


function getSharpnessValues(
    maxSharpness:            Sharpness,
    handicraftLevel:         number,
    sharpnessLevelReduction: number,
) {
    const realSharpnessBar: SharpnessMutable = applyHandicraft(maxSharpness, handicraftLevel);

    let r = sharpnessLevelReduction;
    for (const [i, sharpnessValue] of realSharpnessBar.slice().reverse().entries()) {
    //for (let i = realSharpnessBar.length - 1; i > 0; --i) {
        if (r <= 0) break;
        if (sharpnessValue > 0) {
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


function applyHandicraft(
    maxSharpness:    Sharpness,
    handicraftLevel: number,
): SharpnessMutable {
    if ((handicraftLevel % 1 !== 0) || (handicraftLevel < 0) || (handicraftLevel > 5)) {
        throw new Error("Handicraft should be a valid integer level.");
    }

    // TODO: We shouldn't need to do something this verbose.
    const realSharpnessBar: SharpnessMutable = [
        maxSharpness[0],
        maxSharpness[1],
        maxSharpness[2],
        maxSharpness[3],
        maxSharpness[4],
        maxSharpness[5],
        maxSharpness[6],
    ];
    let hitsToSubtract = 50 - (handicraftLevel * 10);

    if ((hitsToSubtract % 1 !== 0) || (hitsToSubtract < 0) || (hitsToSubtract > 50)) {
        throw new Error("Unexpected value.");
    }

    for (const [i, sharpnessValue] of realSharpnessBar.slice().reverse().entries()) {
        const currHits = sharpnessValue;
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


function getHighestSharpnessIndex(realSharpnessBar: Sharpness): number {
    let highestIndex = -1;
    for (const [i, sharpnessValue] of realSharpnessBar.slice().reverse().entries()) {
        if (sharpnessValue > 0) {
            highestIndex = i;
            break;
        }
    }
    if ((highestIndex < 0) || (highestIndex >= 7) || (highestIndex % 1 !== 0)) {
        throw new Error("Returned index must be within range.");
    }
    return highestIndex;
}


/****************************************************************************************/
/*  Bowguns  ****************************************************************************/
/****************************************************************************************/


// IMPURE FUNCTION. Will modify the bowgun ammo object with new values.
function applyBuffsToBowgunAmmoAndClamp(
    bowgunStats:      BowgunStatsMutable,
    ammoUpLevel:      number,
    recoilDownLevel:  number,
    reloadSpeedLevel: number,
    steadinessLevel:  number,
) {
    if ((ammoUpLevel % 1 !== 0) || (ammoUpLevel < 0) || (ammoUpLevel > 3)) {
        throw new Error("Unexpected Ammo Up level.");
    }

    bowgunStats.deviation.severity = clampBowgunDeviationSeverity(
        bowgunStats.deviation.severity - steadinessLevel
    );
    const recoilStage = bowgunStats.recoil = clampBowgunRecoil(
        bowgunStats.recoil - recoilDownLevel
    );
    const reloadStage = bowgunStats.reload = clampBowgunReload(
        bowgunStats.reload + reloadSpeedLevel
    );

    const keys = Object.keys(bowgunStats.ammo);
    for (const k of keys) {
        if (!isBowgunAmmoType(k)) throw new Error("Must be an ammo type.");
        if (ammoUpLevel > 0) {
            const subtable = bowgunAmmoUpCapacityTable.get(k);
            if (!subtable) throw new Error("Key must exist.");
            const addedCapacity = subtable[ammoUpLevel - 1];
            if (addedCapacity === undefined) throw new Error("Key should exist.");
            bowgunStats.ammo[k].ammoCapacity += addedCapacity;
        }

        const subtable1 = bowgunRecoilPerAmmoTable.get(k);
        if (!subtable1) throw new Error("Key must exist.");
        const recoil = subtable1[recoilStage];
        if (typeof recoil !== "number") throw new Error("Must be a number");
        if (!isBowgunRecoil(recoil)) throw new Error("Invalid number.");
        if (recoil > 3) throw new Error("Invalid number.");
        bowgunStats.ammo[k].recoil = recoil;

        const subtable2 = bowgunReloadPerAmmoTable.get(k);
        if (!subtable2) throw new Error("Key must exist.");
        const reload = subtable2[reloadStage];
        if (typeof reload !== "number") throw new Error("Must be a number");
        if (!isBowgunReload(reload)) throw new Error("Invalid number.");
        if (reload > 3) throw new Error("Invalid number.");
        bowgunStats.ammo[k].reload = reload;
    }
}


export {calculateBuildPerformance};

