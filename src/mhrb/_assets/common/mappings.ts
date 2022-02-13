/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type GLShellingType,
    type HHSong,
} from "./types";

export function toNameFilterString(s: string): string {
    // IMPORTANT: Please maintain parity between this Javascript implementation and the Python implementation.
    // TODO: Also strip out punctuation?
    return s.toLowerCase().replace(/\s/g, "");
}

export function glShellingTypeName(s: GLShellingType): string {
    switch (s) {
        default: console.error(`Unexpected value: ${s}`); // Fallthrough for graceful failure
        case "normal": return "Normal";
        case "long":   return "Long";
        case "wide":   return "Wide";
    }
}

export function hhSongName(s: HHSong): string {
    switch (s) {
        default: console.error(`Unexpected value: ${s}`); // Fallthrough for graceful failure
        case "attack_up":              return "Attack Up";
        case "affinity_up":            return "Affinity Up";
        case "defense_up":             return "Defense Up";
        case "attack_and_defense_up":  return "Attack and Defense Up";
        case "attack_and_affinity_up": return "Attack and Affinity Up";

        case "blight_negated":                  return "Blight Negated";
        case "divine_protection":               return "Divine Protection";
        case "earplugs_l":                      return "Earplugs (L)";
        case "earplugs_s":                      return "Earplugs (S)";
        case "elemental_attack_boost":          return "Elemental Attack Boost";
        case "environment_damage_negated":      return "Environment Damage Negated";
        case "health_recovery_s":               return "Health Recovery (S)";
        case "health_recovery_s_plus_antidote": return "Health Recovery (S) + Antidote";
        case "health_recovery_l":               return "Health Recovery (L)";
        case "health_regeneration":             return "Health Regeneration";
        case "knockbacks_negated":              return "Knockbacks Negated";
        case "sharpness_loss_reduced":          return "Sharpness Loss Reduced";
        case "sonic_barrier":                   return "Sonic Barrier";
        case "sonic_wave":                      return "Sonic Wave";
        case "stamina_use_reduced":             return "Stamina Use Reduced";
        case "stamina_recovery_up":             return "Stamina Recovery Up";
        case "stun_negated":                    return "Stun Negated";
        case "tremors_negated":                 return "Tremors Negated";
        case "wind_pressure_negated":           return "Wind Pressure Negated";
    }
}

