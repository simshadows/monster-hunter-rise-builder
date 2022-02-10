/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isPositiveInt,
} from "../../generic/check";
import {
    FrozenMap,
} from "../../generic/frozen-containers";

import {
    type Rarity,
    type Petalace,
    type PetalaceRO,
} from "../../common/types";
import {
    toNameFilterString,
} from "../../common/mappings";
import {getImgPath} from "../../images";


type HardcodedPetalaceData = Omit<Petalace, "iconImgPath" | "filterHelpers">;

const hardcodedPetalaceData: HardcodedPetalaceData[] = [
    {
        id: "h3",
        name: "Hunting Petalace III",

        endlineTag: "hr",
        rarity: 6,

        healthUp:    70,
        healthGain:  8,
        staminaUp:   70,
        staminaGain: 8,
        attackUp:    13,
        attackGain:  2,
        defenseUp:   30,
        defenseGain: 3,
    },
    {
        id: "s3",
        name: "Strength Petalace III",

        endlineTag: "hr",
        rarity: 6,

        healthUp:    100,
        healthGain:  9,
        staminaUp:   90,
        staminaGain: 9,
        attackUp:    10,
        attackGain:  2,
        defenseUp:   15,
        defenseGain: 2,
    },
    {
        id: "f3",
        name: "Fortitude Petalace III",

        endlineTag: "hr",
        rarity: 6,

        healthUp:    50,
        healthGain:  8,
        staminaUp:   100,
        staminaGain: 10,
        attackUp:    8,
        attackGain:  1,
        defenseUp:   40,
        defenseGain: 4,
    },
    {
        id: "d3",
        name: "Demon Petalace III",

        endlineTag: "hr",
        rarity: 6,

        healthUp:    50,
        healthGain:  5,
        staminaUp:   90,
        staminaGain: 9,
        attackUp:    20,
        attackGain:  4,
        defenseUp:   20,
        defenseGain: 2,
    },
    {
        id: "a",
        name: "Absolute Petalace",

        endlineTag: "hr",
        rarity: 7,

        healthUp:    100,
        healthGain:  10,
        staminaUp:   70,
        staminaGain: 10,
        attackUp:    15,
        attackGain:  2,
        defenseUp:   50,
        defenseGain: 5,
    },
    {
        id: "u",
        name: "Underworld Petalace",

        endlineTag: "hr",
        rarity: 7,
        
        healthUp:    70,
        healthGain:  10,
        staminaUp:   100,
        staminaGain: 10,
        attackUp:    15,
        attackGain:  2,
        defenseUp:   50,
        defenseGain: 5,
    },
];

function makeFinalMap(): FrozenMap<string, PetalaceRO> {
    const ret = new Map<string, PetalaceRO>();

    function petalaceRarityToIconImgPath(rarity: Rarity): string {
        return getImgPath(`petalace_r${rarity}`);
    }

    // For convenience, we also attach IDs and filter helpers to each object
    for (const obj of hardcodedPetalaceData) {

        const mergeIn = {
            iconImgPath: petalaceRarityToIconImgPath(obj.rarity),
            filterHelpers: {
                nameLower: toNameFilterString(obj.name),
            },
        } as const;

        const finalObj: PetalaceRO = {...obj, ...mergeIn}; 

        console.assert(finalObj.id !== "");
        console.assert(finalObj.name !== "");
        console.assert(isPositiveInt(finalObj.healthUp   ));
        console.assert(isPositiveInt(finalObj.healthGain ));
        console.assert(isPositiveInt(finalObj.staminaUp  ));
        console.assert(isPositiveInt(finalObj.staminaGain));
        console.assert(isPositiveInt(finalObj.attackUp   ));
        console.assert(isPositiveInt(finalObj.attackGain ));
        console.assert(isPositiveInt(finalObj.defenseUp  ));
        console.assert(isPositiveInt(finalObj.defenseGain));
        console.assert((finalObj.healthUp  > finalObj.healthGain ) && (finalObj.healthGain  <= 100));
        console.assert((finalObj.staminaUp > finalObj.staminaGain) && (finalObj.staminaGain <= 100));
        console.assert((finalObj.attackUp  > finalObj.attackGain ) && (finalObj.attackGain  <= 100));
        console.assert((finalObj.defenseUp > finalObj.defenseGain) && (finalObj.defenseGain <= 100));

        // And now, we check for duplicates and add

        if (ret.has(finalObj.id)) console.error(`Duplicate pentalace ID: ${finalObj.id}`);
        ret.set(finalObj.id, finalObj);
    }
    return new FrozenMap<string, PetalaceRO>(ret);
}

const petalaceMap = makeFinalMap();

export {petalaceMap};

