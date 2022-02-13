// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * TODO: I'll need to eventually use this when I implement kinsects.
 */

import {
    type IGKinsectTypeRO,
    type IGKinsectBonusRO,
    type IGKinsectRO,
} from "../../../common/types";
import {
    FrozenMap,
} from "../../../generic/frozen-containers";

import {
    populate,
} from "../../_internals";

type HardcodedKinsect = Readonly<Omit<IGKinsectRO, "kinsectType" | "kinsectBonus"> & {
    kinsectType: string; // These will be converted to their final types
    kinsectBonus: string;
}>;

const hardcodedTypes: IGKinsectTypeRO[] = [
    {
        id: "assist",
        name: "Assist",
    },
    {
        id: "normal",
        name: "Normal",
    },
    {
        id: "powder_blast",
        name: "Powder (Blast)",
    },
    {
        id: "powder_heal",
        name: "Powder (Heal)",
    },
    {
        id: "powder_heal_poison",
        name: "Powder (Heal/Poison)",
    },
    {
        id: "powder_paralysis",
        name: "Powder (Paralysis)",
    },
    {
        id: "powder_poison",
        name: "Powder (Poison)",
    },
    {
        id: "powder_poison_paralysis",
        name: "Powder (Poison/Paralysis)",
    },
    {
        id: "speed",
        name: "Speed",
    },
];

export const insectGlaiveKinsectTypesMap: FrozenMap<string, IGKinsectTypeRO> = populate(hardcodedTypes, (obj) => obj);

const hardcodedBonuses: IGKinsectBonusRO[] = [
    {
        id: "auto_attack_frequency_up",
        name: "Auto-attack Frequency Up",
    },
    {
        id: "bonus_heal",
        name: "Bonus Heal",
    },
    {
        id: "charged_chain_attack",
        name: "Charged Chain Attack",
    },
    {
        id: "dual_color_attack",
        name: "Dual Color (Attack)",
    },
    {
        id: "dual_color_defense",
        name: "Dual Color (Defense)",
    },
    {
        id: "dual_color_speed",
        name: "Dual Color (Speed)",
    },
    {
        id: "fast_charge",
        name: "Fast Charge",
    },
    {
        id: "idle_stamina_recovery_up",
        name: "Idle Stamina Recovery Up",
    },
    {
        id: "stamina_use_slowed",
        name: "Stamina Use Slowed",
    },
    {
        id: "triple_up_time",
        name: "Triple Up Time",
    },
];

export const insectGlaiveKinsectBonusesMap: FrozenMap<string, IGKinsectBonusRO> = populate(hardcodedBonuses, (obj) => obj);

const hardcodedKinsects: HardcodedKinsect[] = [
    {
        id: 1,
        rarity: 1,
        name: "Culldrone",

        attackType: "severing",
        kinsectType: "normal",
        kinsectBonus: "bonus_heal",
    },
    {
        id: 2,
        rarity: 1,
        name: "Mauldrone",

        attackType: "blunt",
        kinsectType: "normal",
        kinsectBonus: "bonus_heal",
    },

    {
        id: 3,
        rarity: 2,
        name: "Alucanid",

        attackType: "severing",
        kinsectType: "assist",
        kinsectBonus: "dual_color_defense",
    },
    {
        id: 4,
        rarity: 2,
        name: "Foebeetle",

        attackType: "blunt",
        kinsectType: "assist",
        kinsectBonus: "dual_color_defense",
    },

    {
        id: 5,
        rarity: 2,
        name: "Rigiprayne",

        attackType: "severing",
        kinsectType: "powder_paralysis",
        kinsectBonus: "stamina_use_slowed",
    },
    {
        id: 6,
        rarity: 2,
        name: "Ladytarge",

        attackType: "blunt",
        kinsectType: "powder_poison",
        kinsectBonus: "stamina_use_slowed",
    },

    {
        id: 7,
        rarity: 2,
        name: "Windchopper",

        attackType: "severing",
        kinsectType: "speed",
        kinsectBonus: "triple_up_time",
    },
    {
        id: 8,
        rarity: 2,
        name: "Gullshad",

        attackType: "blunt",
        kinsectType: "speed",
        kinsectBonus: "triple_up_time",
    },

    {
        id: 9,
        rarity: 4,
        name: "Monarch Alucanid",

        attackType: "severing",
        kinsectType: "assist",
        kinsectBonus: "dual_color_attack",
    },
    {
        id: 10,
        rarity: 4,
        name: "Carnage Beetle",

        attackType: "blunt",
        kinsectType: "assist",
        kinsectBonus: "dual_color_attack",
    },

    {
        id: 11,
        rarity: 4,
        name: "Empresswing",

        attackType: "severing",
        kinsectType: "assist",
        kinsectBonus: "dual_color_speed",
    },
    {
        id: 12,
        rarity: 4,
        name: "Bonnetfille",

        attackType: "blunt",
        kinsectType: "assist",
        kinsectBonus: "dual_color_speed",
    },

    {
        id: 13,
        rarity: 4,
        name: "Cancadaman",

        attackType: "severing",
        kinsectType: "powder_poison_paralysis",
        kinsectBonus: "auto_attack_frequency_up",
    },
    {
        id: 14,
        rarity: 4,
        name: "Ladypavise",

        attackType: "blunt",
        kinsectType: "powder_heal_poison",
        kinsectBonus: "auto_attack_frequency_up",
    },

    {
        id: 15,
        rarity: 4,
        name: "Fiddlebrix",

        attackType: "severing",
        kinsectType: "powder_blast",
        kinsectBonus: "idle_stamina_recovery_up",
    },
    {
        id: 16,
        rarity: 4,
        name: "Arkmaiden",

        attackType: "blunt",
        kinsectType: "powder_heal",
        kinsectBonus: "idle_stamina_recovery_up",
    },

    {
        id: 17,
        rarity: 4,
        name: "Grancathar",

        attackType: "severing",
        kinsectType: "speed",
        kinsectBonus: "charged_chain_attack",
    },
    {
        id: 18,
        rarity: 4,
        name: "Bullshroud",

        attackType: "blunt",
        kinsectType: "speed",
        kinsectBonus: "charged_chain_attack",
    },

    {
        id: 19,
        rarity: 4,
        name: "Pseudocath",

        attackType: "severing",
        kinsectType: "speed",
        kinsectBonus: "fast_charge",
    },
    {
        id: 20,
        rarity: 4,
        name: "Whispervesp",

        attackType: "blunt",
        kinsectType: "speed",
        kinsectBonus: "fast_charge",
    },
];

export const insectGlaiveKinsectsMap: FrozenMap<number, IGKinsectRO> = populate<HardcodedKinsect, IGKinsectRO>(
    hardcodedKinsects,
    (obj) => {
        const kinsectType = insectGlaiveKinsectTypesMap.get(obj.kinsectType);
        const kinsectBonus = insectGlaiveKinsectBonusesMap.get(obj.kinsectBonus);
        if (!kinsectType) throw `Kinsect type '${kinsectType}' not found.`;
        if (!kinsectBonus) throw `Kinsect bonus '${kinsectType}' not found.`;
        return {
            id: obj.id,
            name: obj.name,
            rarity: obj.rarity,

            attackType: obj.attackType,
            kinsectType: kinsectType,
            kinsectBonus: kinsectBonus,
        };
    }
);

