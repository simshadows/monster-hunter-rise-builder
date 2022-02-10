/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type HHSongRO,
} from "../../../common/types";
import {
    FrozenMap,
} from "../../../generic/frozen-containers";

import {
    populate,
} from "../../_internals";

const hardcoded: HHSongRO[] = [
    {
        id: "attack_up",
        name: "Attack Up",
    },
    {
        id: "affinity_up",
        name: "Affinity Up",
    },
    {
        id: "defense_up",
        name: "Defense Up",
    },
    {
        id: "attack_and_defense_up",
        name: "Attack and Defense Up",
    },
    {
        id: "attack_and_affinity_up",
        name: "Attack and Affinity Up",
    },

    /*** ***/

    {
        id: "blight_negated",
        name: "Blight Negated",
    },
    {
        id: "divine_protection",
        name: "Divine Protection",
    },
    {
        id: "earplugs_l",
        name: "Earplugs (L)",
    },
    {
        id: "earplugs_s",
        name: "Earplugs (S)",
    },
    {
        id: "elemental_attack_boost",
        name: "Elemental Attack Boost",
    },
    {
        id: "environment_damage_negated",
        name: "Environment Damage Negated",
    },
    {
        id: "health_recovery_s",
        name: "Health Recovery (S)",
    },
    {
        id: "health_recovery_s_plus_antidote",
        name: "Health Recovery (S) + Antidote",
    },
    {
        id: "health_recovery_l",
        name: "Health Recovery (L)",
    },
    {
        id: "health_regeneration",
        name: "Health Regeneration",
    },
    {
        id: "knockbacks_negated",
        name: "Knockbacks Negated",
    },
    {
        id: "sharpness_loss_reduced",
        name: "Sharpness Loss Reduced",
    },
    {
        id: "sonic_barrier",
        name: "Sonic Barrier",
    },
    {
        id: "sonic_wave",
        name: "Sonic Wave",
    },
    {
        id: "stamina_use_reduced",
        name: "Stamina Use Reduced",
    },
    {
        id: "stamina_recovery_up",
        name: "Stamina Recovery Up",
    },
    {
        id: "stun_negated",
        name: "Stun Negated",
    },
    {
        id: "tremors_negated",
        name: "Tremors Negated",
    },
    {
        id: "wind_pressure_negated",
        name: "Wind Pressure Negated",
    },
];

export const huntingHornSongsMap: FrozenMap<string, HHSongRO> = populate(hardcoded, (obj) => obj);

