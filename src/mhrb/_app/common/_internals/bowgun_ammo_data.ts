/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type BowgunAmmoInfo,
} from "../types";
import {
    FrozenMap,
} from "../../generic/frozen-containers";

import {
    populate,
} from "../utils";

function generateBowgunAmmoTypes(keyBase: string, nameBase: string, num: number): BowgunAmmoInfo[] {
    const ret = [];
    for (let i = 0; i < num; ++i) {
        ret.push({
            id: keyBase + "_" + String(i+1),
            name: nameBase + " Ammo " + String(i+1),
            shortName: nameBase + " " + String(i+1),
        });
    }
    return ret;
}
function generateBowgunEleAmmoTypes(keyBase: string, nameBase: string): BowgunAmmoInfo[] {
    return [
        {
            id: keyBase,
            name: `${nameBase} Ammo`,
            shortName: nameBase,
        },
        {
            id: `piercing_${keyBase}`,
            name: `Piercing ${nameBase} Ammo`,
            shortName: `P. ${nameBase}`,
        },
    ];
}

const hardcodedAmmoTypes: BowgunAmmoInfo[] = [
    ...generateBowgunAmmoTypes("normal"  , "Normal"  , 3),
    ...generateBowgunAmmoTypes("pierce"  , "Pierce"  , 3),
    ...generateBowgunAmmoTypes("spread"  , "Spread"  , 3),
    ...generateBowgunAmmoTypes("shrapnel", "Shrapnel", 3),
    ...generateBowgunAmmoTypes("sticky"  , "Sticky"  , 3),
    ...generateBowgunAmmoTypes("cluster" , "Cluster" , 3),

    {
        id: "fire",
        name: "Flaming Ammo",
        shortName: "Flaming",
    },
    {
        id: "piercing_fire",
        name: "Piercing Fire Ammo",
        shortName: "P. Fire",
    },
    ...generateBowgunEleAmmoTypes("water"  , "Water"),
    ...generateBowgunEleAmmoTypes("thunder", "Thunder"),
    {
        id: "ice",
        name: "Freeze Ammo",
        shortName: "Freeze",
    },
    {
        id: "piercing_ice",
        name: "Piercing Ice Ammo",
        shortName: "P. Ice",
    },
    ...generateBowgunEleAmmoTypes("dragon" , "Dragon"),

    ...generateBowgunAmmoTypes("poison"   , "Poison"   , 2),
    ...generateBowgunAmmoTypes("paralysis", "Paralysis", 2),
    ...generateBowgunAmmoTypes("sleep"    , "Sleep"    , 2),
    ...generateBowgunAmmoTypes("exhaust"  , "Exhaust"  , 2),
    ...generateBowgunAmmoTypes("recover"  , "Recover"  , 2),

    {
        id: "demon",
        name: "Demon Ammo",
        shortName: "Demon",
    },
    {
        id: "armor",
        name: "Armor Ammo",
        shortName: "Armor",
    },
    {
        id: "slicing",
        name: "Slicing Ammo",
        shortName: "Slicing",
    },
    {
        id: "wyvern",
        name: "Wyvern Ammo",
        shortName: "Wyvern",
    },
    {
        id: "tranq",
        name: "Tranq Ammo",
        shortName: "Tranq",
    },
];

export const bowgunAmmoInfoMap: FrozenMap<string, BowgunAmmoInfo> = populate(hardcodedAmmoTypes, (obj) => obj);

