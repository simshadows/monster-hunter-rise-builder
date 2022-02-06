/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isObj,
    isInt,
    isStr,
    isNonEmptyStr,
    assert,
} from "../../check.ts";
import {
    isWeaponEndlineTagStr,
    toNameFilterString,
} from "../../common.ts";
import {getImgPath} from "../../images.ts";

const hardcodedPetalaceData = [
    ["h3", {
        endlineTag: "hr",
        rarity: 6,
        name: "Hunting Petalace III",
        healthUp:    70,
        healthGain:  8,
        staminaUp:   70,
        staminaGain: 8,
        attackUp:    13,
        attackGain:  2,
        defenseUp:   30,
        defenseGain: 3,
    }],
    ["s3", {
        endlineTag: "hr",
        rarity: 6,
        name: "Strength Petalace III",
        healthUp:    100,
        healthGain:  9,
        staminaUp:   90,
        staminaGain: 9,
        attackUp:    10,
        attackGain:  2,
        defenseUp:   15,
        defenseGain: 2,
    }],
    ["f3", {
        endlineTag: "hr",
        rarity: 6,
        name: "Fortitude Petalace III",
        healthUp:    50,
        healthGain:  8,
        staminaUp:   100,
        staminaGain: 10,
        attackUp:    8,
        attackGain:  1,
        defenseUp:   40,
        defenseGain: 4,
    }],
    ["d3", {
        endlineTag: "hr",
        rarity: 6,
        name: "Demon Petalace III",
        healthUp:    50,
        healthGain:  5,
        staminaUp:   90,
        staminaGain: 9,
        attackUp:    20,
        attackGain:  4,
        defenseUp:   20,
        defenseGain: 2,
    }],
    ["a", {
        endlineTag: "hr",
        rarity: 7,
        name: "Absolute Petalace",
        healthUp:    100,
        healthGain:  10,
        staminaUp:   70,
        staminaGain: 10,
        attackUp:    15,
        attackGain:  2,
        defenseUp:   50,
        defenseGain: 5,
    }],
    ["u", {
        endlineTag: "hr",
        rarity: 7,
        name: "Underworld Petalace",
        healthUp:    70,
        healthGain:  10,
        staminaUp:   100,
        staminaGain: 10,
        attackUp:    15,
        attackGain:  2,
        defenseUp:   50,
        defenseGain: 5,
    }],
];

const petalaceMap = new Map();

function petalaceRarityToIconImgPath(rarity) {
    assert(isInt(rarity) && (rarity > 0) && (rarity <= 7));
    return getImgPath("petalace_r" + String(rarity));
}

// For convenience, we also attach IDs and filter helpers to each object
for (const [petalaceID, petalaceObj] of hardcodedPetalaceData) {
    petalaceObj.id = petalaceID;
    petalaceObj.iconImgPath = petalaceRarityToIconImgPath(petalaceObj.rarity);
    petalaceObj.filterHelpers = {};
    petalaceObj.filterHelpers.nameLower = toNameFilterString(petalaceObj.name);

    //
    // Validate
    //

    assert(isNonEmptyStr(petalaceObj.id));
    assert(isWeaponEndlineTagStr(petalaceObj.endlineTag));
    assert(isInt(petalaceObj.rarity) && (petalaceObj.rarity > 0) && (petalaceObj.rarity <= 7));
    assert(isNonEmptyStr(petalaceObj.name));
    assert(isInt(petalaceObj.healthUp));
    assert(isInt(petalaceObj.healthGain));
    assert(isInt(petalaceObj.staminaUp));
    assert(isInt(petalaceObj.staminaGain));
    assert(isInt(petalaceObj.attackUp));
    assert(isInt(petalaceObj.attackGain));
    assert(isInt(petalaceObj.defenseUp));
    assert(isInt(petalaceObj.defenseGain));

    assert(
        (petalaceObj.healthGain  > 0) && (petalaceObj.healthUp  > petalaceObj.healthGain ) && (petalaceObj.healthUp  <= 100) &&
        (petalaceObj.staminaGain > 0) && (petalaceObj.staminaUp > petalaceObj.staminaGain) && (petalaceObj.staminaUp <= 100) &&
        (petalaceObj.attackGain  > 0) && (petalaceObj.attackUp  > petalaceObj.attackGain ) && (petalaceObj.attackUp  <= 100) &&
        (petalaceObj.defenseGain > 0) && (petalaceObj.defenseUp > petalaceObj.defenseGain) && (petalaceObj.defenseUp <= 100),
        "Invalid numerical value(s). Petalace ID: " + petalaceObj.id,
    );

    // And now, we check for duplicates and add

    assert(!(petalaceMap.has(petalaceObj.id)), "Duplicate petalace ID: " + petalaceObj.id);
    petalaceMap.set(petalaceObj.id, petalaceObj);
}

export {petalaceMap};

