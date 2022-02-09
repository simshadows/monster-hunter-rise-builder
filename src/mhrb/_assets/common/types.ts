/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

export type Tier = "lr" | "hr";
export type Rarity = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ElementStr = "fire" | "water" | "thunder" | "ice" | "dragon";
export type StatStr = "poison" | "paralysis" | "sleep" | "blast";
export type EleStatStr = ElementStr | StatStr;

export type EndlineTag = "" | "hr";

export interface Petalace {
    id:   string;
    name: string;

    endlineTag:  EndlineTag;
    rarity:      Rarity;

    healthUp:    number;
    healthGain:  number;
    staminaUp:   number;
    staminaGain: number;
    attackUp:    number;
    attackGain:  number;
    defenseUp:   number;
    defenseGain: number;

    iconImgPath: string;
    filterHelpers: Readonly<{
        nameLower: string;
    }>;
}
export type PetalaceRO = Readonly<Petalace>;

