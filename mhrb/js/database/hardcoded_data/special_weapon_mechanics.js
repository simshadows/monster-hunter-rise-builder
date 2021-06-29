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

const hardcodedGunlanceShellingTypes = [
    ["normal", {
        name: "Normal",
    }],
    ["long", {
        name: "Long",
    }],
    ["wide", {
        name: "Wide",
    }],
];

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

const hardcodedSwitchAxePhialTypes = [
    ["power_phial", {
        name: "Power Phial",
    }],
    ["element_phial", {
        name: "Element Phial",
    }],
    ["poison_phial", {
        name: "Poison Phial",
    }],
    ["paralysis_phial", {
        name: "Paralysis Phial",
    }],
    ["dragon_phial", {
        name: "Dragon Phial",
    }],
    ["exhaust_phial", {
        name: "Exhaust Phial",
    }],
];

const hardcodedChargeBladePhialTypes = [
    ["impact_phial", {
        name: "Impact Phial",
    }],
    ["element_phial", {
        name: "Element Phial",
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

const hardcodedBowArcShotTypes = [
    ["recovery", {
        name: "Recovery",
    }],
    ["affinity", {
        name: "Affinity",
    }],
    ["brace", {
        name: "Brace",
    }],
]
const hardcodedBowChargeShotTypes = [
    ["pierce", {
        name: "Pierce",
    }],
    ["rapid", {
        name: "Rapid",
    }],
    ["spread", {
        name: "Spread",
    }],
];

// Now, we populate these maps.

const gunlanceShellingTypesMap = new Map();

const huntingHornSongsMap = new Map();

const switchAxePhialTypesMap = new Map();

const chargeBladePhialTypesMap = new Map();

const insectGlaiveKinsectsMap = new Map();
const insectGlaiveKinsectTypesMap = new Map();
const insectGlaiveKinsectBonusesMap = new Map();

const bowArcShotTypesMap = new Map();
const bowChargeShotTypesMap = new Map();

function populate(hardcodedData, finalMap, additionalOps) {
    for (const [k, dataObj] of hardcodedData) {
        dataObj.id = k; // Attach IDs to each object

        assert((dataObj.id !== undefined) && (dataObj.id !== null)); // We know IDs must always be defined
        assert(isNonEmptyStr(dataObj.name)); // We know names will always need to be non-empty strings

        additionalOps(dataObj);

        // And now, we check for duplicates and add
        assert(!finalMap.has(dataObj.id));
        finalMap.set(dataObj.id, dataObj);
    }
}

populate(hardcodedGunlanceShellingTypes, gunlanceShellingTypesMap, (dataObj) => {
    assert(isNonEmptyStr(dataObj.id));
});

populate(hardcodedHuntingHornSongs, huntingHornSongsMap, (dataObj) => {
    assert(isNonEmptyStr(dataObj.id));
});

populate(hardcodedSwitchAxePhialTypes, switchAxePhialTypesMap, (dataObj) => {
    assert(isNonEmptyStr(dataObj.id));
});

populate(hardcodedChargeBladePhialTypes, chargeBladePhialTypesMap, (dataObj) => {
    assert(isNonEmptyStr(dataObj.id));
});

populate(hardcodedInsectGlaiveKinsectTypes, insectGlaiveKinsectTypesMap, (dataObj) => {
    assert(isNonEmptyStr(dataObj.id));
});
populate(hardcodedInsectGlaiveKinsectBonuses, insectGlaiveKinsectBonusesMap, (dataObj) => {
    assert(isNonEmptyStr(dataObj.id));
});
populate(hardcodedInsectGlaiveKinsects, insectGlaiveKinsectsMap, (dataObj) => {
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
    // name is already checked

    assert(isRawTypeStr(dataObj.attackType));
    // kinsectType is already checked
    // kinsectBonus is already checked
});

populate(hardcodedBowArcShotTypes, bowArcShotTypesMap, (dataObj) => {
    assert(isNonEmptyStr(dataObj.id));
});
populate(hardcodedBowChargeShotTypes, bowChargeShotTypesMap, (dataObj) => {
    assert(isNonEmptyStr(dataObj.id));
});

export {
    gunlanceShellingTypesMap,

    huntingHornSongsMap,

    switchAxePhialTypesMap,

    chargeBladePhialTypesMap,

    insectGlaiveKinsectsMap,
    insectGlaiveKinsectTypesMap,
    insectGlaiveKinsectBonusesMap,

    bowArcShotTypesMap,
    bowChargeShotTypesMap,
};

