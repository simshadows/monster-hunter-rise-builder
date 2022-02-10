// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isNonEmptyStr,
    isInt,
    assert,
} from "../../check";
import {
    isRawTypeStr,
} from "../../common";

function generateBowgunAmmoTypes(keyBase, nameBase, num) {
    const ret = [];
    for (let i = 0; i < num; ++i) {
        ret.push([keyBase + "_" + String(i+1), {
            name: nameBase + " Ammo " + String(i+1),
            shortName: nameBase + " " + String(i+1),
        }]);
    }
    return ret;
}
function generateBowgunEleAmmoTypes(keyBase, nameBase) {
    return [
        [keyBase, {
            name: nameBase + " Ammo",
            shortName: nameBase,
        }],
        ["piercing_" + keyBase, {
            name: "Piercing " + nameBase + " Ammo",
            shortName: "P. " + nameBase,
        }],
    ];
}
const hardcodedBowgunAmmoTypes = [
    ...generateBowgunAmmoTypes("normal"  , "Normal"  , 3),
    ...generateBowgunAmmoTypes("pierce"  , "Pierce"  , 3),
    ...generateBowgunAmmoTypes("spread"  , "Spread"  , 3),
    ...generateBowgunAmmoTypes("shrapnel", "Shrapnel", 3),
    ...generateBowgunAmmoTypes("sticky"  , "Sticky"  , 3),
    ...generateBowgunAmmoTypes("cluster" , "Cluster" , 3),

    ["fire", {
        name: "Flaming Ammo",
        shortName: "Flaming",
    }],
    ["piercing_fire", {
        name: "Piercing Fire Ammo",
        shortName: "P. Fire",
    }],
    ...generateBowgunEleAmmoTypes("water"  , "Water"),
    ...generateBowgunEleAmmoTypes("thunder", "Thunder"),
    ["ice", {
        name: "Freeze Ammo",
        shortName: "Freeze",
    }],
    ["piercing_ice", {
        name: "Piercing Ice Ammo",
        shortName: "P. Ice",
    }],
    ...generateBowgunEleAmmoTypes("dragon" , "Dragon"),

    ...generateBowgunAmmoTypes("poison"   , "Poison"   , 2),
    ...generateBowgunAmmoTypes("paralysis", "Paralysis", 2),
    ...generateBowgunAmmoTypes("sleep"    , "Sleep"    , 2),
    ...generateBowgunAmmoTypes("exhaust"  , "Exhaust"  , 2),
    ...generateBowgunAmmoTypes("recover"  , "Recover"  , 2),

    ["demon", {
        name: "Demon Ammo",
        shortName: "Demon",
    }],
    ["armor", {
        name: "Armor Ammo",
        shortName: "Armor",
    }],
    ["slicing", {
        name: "Slicing Ammo",
        shortName: "Slicing",
    }],
    ["wyvern", {
        name: "Wyvern Ammo",
        shortName: "Wyvern",
    }],
    ["tranq", {
        name: "Tranq Ammo",
        shortName: "Tranq",
    }],
];

const hardcodedSpecialSelectionTypes = [
    [1, {
        name: "Silencer",
        type: "lightbowgunmod",
    }],
    [2, {
        name: "Long Barrel",
        type: "lightbowgunmod",
    }],

    [3, {
        name: "Shield",
        type: "heavybowgunmod",
    }],
    [4, {
        name: "Power Barrel",
        type: "heavybowgunmod",
    }],
];

// Now, we populate these maps.

const bowgunAmmoTypesMap = new Map();

const specialSelectionTypesMap = new Map();

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

populate(hardcodedBowgunAmmoTypes, bowgunAmmoTypesMap, (dataObj) => {
    assert(isNonEmptyStr(dataObj.id));
});

populate(hardcodedSpecialSelectionTypes, specialSelectionTypesMap, (dataObj) => {
    assert(Number.isInteger(dataObj.id));
    assert(isNonEmptyStr(dataObj.name));
    assert(dataObj.type === "lightbowgunmod" || dataObj.type === "heavybowgunmod");
});

export {
    bowgunAmmoTypesMap,

    specialSelectionTypesMap,
};

