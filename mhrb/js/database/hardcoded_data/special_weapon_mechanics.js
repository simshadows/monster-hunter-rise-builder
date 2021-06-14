/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isNonEmptyStr,
    assert,
} from "../../check.js";

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

// Now, we populate these maps.
const huntingHornSongsMap = new Map();

// For convenience, we also attach IDs to each object
for (const [weaponID, dataObj] of hardcodedHuntingHornSongs) {
    dataObj.id = weaponID;

    //
    // Validate
    //

    assert(isNonEmptyStr(dataObj.id));
    assert(isNonEmptyStr(dataObj.name));

    // And now, we check for duplicates and add
    assert(!huntingHornSongsMap.has(dataObj.id));
    huntingHornSongsMap.set(dataObj.id, dataObj);
}

export {
    huntingHornSongsMap,
};

