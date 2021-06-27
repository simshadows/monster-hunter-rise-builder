/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isNonEmptyStr,
    isInt,
    assert,
} from "../../check.js";
import {
    isRawTypeStr,
} from "../../common.js";

const hardcodedHuntingHornSongs = [
    ["attack_up", {
        name: "Attack Up",
    }],
    ["affinity_up", {
        name: "Affinity Up",
    }],
    ["defense_up", {
        name: "Defense Up",
    }],
    ["attack_and_defense_up", {
        name: "Attack and Defense Up",
    }],
    ["attack_and_affinity_up", {
        name: "Attack and Affinity Up",
    }],

    /*** ***/

    ["blight_negated", {
        name: "Blight Negated",
    }],
    ["divine_protection", {
        name: "Divine Protection",
    }],
    ["earplugs_l", {
        name: "Earplugs (L)",
    }],
    ["earplugs_s", {
        name: "Earplugs (S)",
    }],
    ["elemental_attack_boost", {
        name: "Elemental Attack Boost",
    }],
    ["environment_damage_negated", {
        name: "Environment Damage Negated",
    }],
    ["health_recovery_s", {
        name: "Health Recovery (S)",
    }],
    ["health_recovery_s_plus_antidote", {
        name: "Health Recovery (S) + Antidote",
    }],
    ["health_recovery_l", {
        name: "Health Recovery (L)",
    }],
    ["health_regeneration", {
        name: "Health Regeneration",
    }],
    ["knockbacks_negated", {
        name: "Knockbacks Negated",
    }],
    ["sharpness_loss_reduced", {
        name: "Sharpness Loss Reduced",
    }],
    ["sonic_barrier", {
        name: "Sonic Barrier",
    }],
    ["sonic_wave", {
        name: "Sonic Wave",
    }],
    ["stamina_use_reduced", {
        name: "Stamina Use Reduced",
    }],
    ["stamina_recovery_up", {
        name: "Stamina Recovery Up",
    }],
    ["stun_negated", {
        name: "Stun Negated",
    }],
    ["tremors_negated", {
        name: "Tremors Negated",
    }],
    ["wind_pressure_negated", {
        name: "Wind Pressure Negated",
    }],
];

const hardcodedInsectGlaiveKinsects = [
    [1, {
        rarity: 1,
        name: "Culldrone",

        attackType: "severing",
        kinsectType: "normal",
        kinsectBonus: "bonus_heal",
    }],
    [2, {
        rarity: 1,
        name: "Mauldrone",

        attackType: "blunt",
        kinsectType: "normal",
        kinsectBonus: "bonus_heal",
    }],

    [3, {
        rarity: 2,
        name: "Alucanid",

        attackType: "severing",
        kinsectType: "assist",
        kinsectBonus: "dual_color_defense",
    }],
    [4, {
        rarity: 2,
        name: "Foebeetle",

        attackType: "blunt",
        kinsectType: "assist",
        kinsectBonus: "dual_color_defense",
    }],

    [5, {
        rarity: 2,
        name: "Rigiprayne",

        attackType: "severing",
        kinsectType: "powder_paralysis",
        kinsectBonus: "stamina_use_slowed",
    }],
    [6, {
        rarity: 2,
        name: "Ladytarge",

        attackType: "blunt",
        kinsectType: "powder_poison",
        kinsectBonus: "stamina_use_slowed",
    }],

    [7, {
        rarity: 2,
        name: "Windchopper",

        attackType: "severing",
        kinsectType: "speed",
        kinsectBonus: "triple_up_time",
    }],
    [8, {
        rarity: 2,
        name: "Gullshad",

        attackType: "blunt",
        kinsectType: "speed",
        kinsectBonus: "triple_up_time",
    }],

    [9, {
        rarity: 4,
        name: "Monarch Alucanid",

        attackType: "severing",
        kinsectType: "assist",
        kinsectBonus: "dual_color_attack",
    }],
    [10, {
        rarity: 4,
        name: "Carnage Beetle",

        attackType: "blunt",
        kinsectType: "assist",
        kinsectBonus: "dual_color_attack",
    }],

    [11, {
        rarity: 4,
        name: "Empresswing",

        attackType: "severing",
        kinsectType: "assist",
        kinsectBonus: "dual_color_speed",
    }],
    [12, {
        rarity: 4,
        name: "Bonnetfille",

        attackType: "blunt",
        kinsectType: "assist",
        kinsectBonus: "dual_color_speed",
    }],

    [13, {
        rarity: 4,
        name: "Cancadaman",

        attackType: "severing",
        kinsectType: "powder_poison_paralysis",
        kinsectBonus: "auto_attack_frequency_up",
    }],
    [14, {
        rarity: 4,
        name: "Ladypavise",

        attackType: "blunt",
        kinsectType: "powder_heal_poison",
        kinsectBonus: "auto_attack_frequency_up",
    }],

    [15, {
        rarity: 4,
        name: "Fiddlebrix",

        attackType: "severing",
        kinsectType: "powder_blast",
        kinsectBonus: "idle_stamina_recovery_up",
    }],
    [16, {
        rarity: 4,
        name: "Arkmaiden",

        attackType: "blunt",
        kinsectType: "powder_heal",
        kinsectBonus: "idle_stamina_recovery_up",
    }],

    [17, {
        rarity: 4,
        name: "Grancathar",

        attackType: "severing",
        kinsectType: "speed",
        kinsectBonus: "charged_chain_attack",
    }],
    [18, {
        rarity: 4,
        name: "Bullshroud",

        attackType: "blunt",
        kinsectType: "speed",
        kinsectBonus: "charged_chain_attack",
    }],

    [19, {
        rarity: 4,
        name: "Pseudocath",

        attackType: "severing",
        kinsectType: "speed",
        kinsectBonus: "fast_charge",
    }],
    [20, {
        rarity: 4,
        name: "Whispervesp",

        attackType: "blunt",
        kinsectType: "speed",
        kinsectBonus: "fast_charge",
    }],
];
const hardcodedInsectGlaiveKinsectTypes = [
    ["assist", {
        name: "Assist",
    }],
    ["normal", {
        name: "Normal",
    }],
    ["powder_blast", {
        name: "Powder (Blast)",
    }],
    ["powder_heal", {
        name: "Powder (Heal)",
    }],
    ["powder_heal_poison", {
        name: "Powder (Heal/Poison)",
    }],
    ["powder_paralysis", {
        name: "Powder (Paralysis)",
    }],
    ["powder_poison", {
        name: "Powder (Poison)",
    }],
    ["powder_poison_paralysis", {
        name: "Powder (Poison/Paralysis)",
    }],
    ["speed", {
        name: "Speed",
    }],
];
const hardcodedInsectGlaiveKinsectBonuses = [
    ["auto_attack_frequency_up", {
        name: "Auto-attack Frequency Up",
    }],
    ["bonus_heal", {
        name: "Bonus Heal",
    }],
    ["charged_chain_attack", {
        name: "Charged Chain Attack",
    }],
    ["dual_color_attack", {
        name: "Dual Color (Attack)",
    }],
    ["dual_color_defense", {
        name: "Dual Color (Defense)",
    }],
    ["dual_color_speed", {
        name: "Dual Color (Speed)",
    }],
    ["fast_charge", {
        name: "Fast Charge",
    }],
    ["idle_stamina_recovery_up", {
        name: "Idle Stamina Recovery Up",
    }],
    ["stamina_use_slowed", {
        name: "Stamina Use Slowed",
    }],
    ["triple_up_time", {
        name: "Triple Up Time",
    }],
];

// Now, we populate these maps.

const huntingHornSongsMap = new Map();

const insectGlaiveKinsectsMap = new Map();
const insectGlaiveKinsectTypesMap = new Map();
const insectGlaiveKinsectBonusesMap = new Map();

for (const [weaponID, dataObj] of hardcodedHuntingHornSongs) {
    dataObj.id = weaponID; // Attach IDs to each object

    assert(isNonEmptyStr(dataObj.id));
    assert(isNonEmptyStr(dataObj.name));

    // And now, we check for duplicates and add
    assert(!huntingHornSongsMap.has(dataObj.id));
    huntingHornSongsMap.set(dataObj.id, dataObj);
}

for (const [typeID, dataObj] of hardcodedInsectGlaiveKinsectTypes) {
    dataObj.id = typeID; // Attach IDs to each object

    assert(isNonEmptyStr(dataObj.id));
    assert(isNonEmptyStr(dataObj.name));

    // And now, we check for duplicates and add
    assert(!insectGlaiveKinsectTypesMap.has(dataObj.id));
    insectGlaiveKinsectTypesMap.set(dataObj.id, dataObj);
}
for (const [bonusID, dataObj] of hardcodedInsectGlaiveKinsectBonuses) {
    dataObj.id = bonusID; // Attach IDs to each object

    assert(isNonEmptyStr(dataObj.id));
    assert(isNonEmptyStr(dataObj.name));

    // And now, we check for duplicates and add
    assert(!insectGlaiveKinsectBonusesMap.has(dataObj.id));
    insectGlaiveKinsectBonusesMap.set(dataObj.id, dataObj);
}
for (const [kinsectID, dataObj] of hardcodedInsectGlaiveKinsects) {
    dataObj.id = kinsectID; // Attach IDs to each object

    const kinsectTypeObj = insectGlaiveKinsectTypesMap.get(dataObj.kinsectType);
    assert(kinsectTypeObj !== undefined, "Invalid kinsect type ID: " + String(dataObj.kinsectType));
    dataObj.kinsectType = kinsectTypeObj;

    const kinsectBonusObj = insectGlaiveKinsectBonusesMap.get(dataObj.kinsectBonus);
    assert(kinsectBonusObj !== undefined, "Invalid kinsect type ID: " + String(dataObj.kinsectBonus));
    dataObj.kinsectBonus = kinsectBonusObj;

    //
    // Validate
    //

    assert(isInt(dataObj.id) && (dataObj.id > 0));
    assert(isNonEmptyStr(dataObj.name));

    assert(isRawTypeStr(dataObj.attackType));
    // kinsectType is already checked
    // kinsectBonus is already checked

    // And now, we check for duplicates and add
    assert(!insectGlaiveKinsectsMap.has(dataObj.id));
    insectGlaiveKinsectsMap.set(dataObj.id, dataObj);
}

export {
    huntingHornSongsMap,
    insectGlaiveKinsectsMap,
    insectGlaiveKinsectTypesMap,
    insectGlaiveKinsectBonusesMap,
};

