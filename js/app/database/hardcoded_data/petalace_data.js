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
} from "../../check.js";
import {
    isWeaponEndlineTagStr,
    toNameFilterString,
} from "../../common.js";

const petalaceMap = new Map([
    ["h3", {
        endlineTag: "hr",
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
]);

// For convenience, we also attach IDs and filter helpers to each object
for (const [petalaceID, petalaceObj] of petalaceMap.entries()) {
    petalaceObj.id = petalaceID;
    petalaceObj.filterHelpers = {};
    petalaceObj.filterHelpers.nameLower = toNameFilterString(petalaceObj.name);

    //
    // Validate
    //

    assert(isNonEmptyStr(petalaceObj.id), "Petalaces must have IDs.");
    assert(isNonEmptyStr(petalaceObj.endlineTag), "Petalaces must have endline tags.");
    assert(isNonEmptyStr(petalaceObj.name), "Petalaces must have names.");
    assert(isInt(petalaceObj.healthUp), "Petalaces must have a health up value.");
    assert(isInt(petalaceObj.healthGain), "Petalaces must have a health gain value.");
    assert(isInt(petalaceObj.staminaUp), "Petalaces must have a stamina up value.");
    assert(isInt(petalaceObj.staminaGain), "Petalaces must have a stamina gain value.");
    assert(isInt(petalaceObj.attackUp), "Petalaces must have a attack up value.");
    assert(isInt(petalaceObj.attackGain), "Petalaces must have a attack gain value.");
    assert(isInt(petalaceObj.defenseUp), "Petalaces must have a defense up value.");
    assert(isInt(petalaceObj.defenseGain), "Petalaces must have a defense gain value.");

    assert(isWeaponEndlineTagStr(petalaceObj.endlineTag), "Wrong endline tag format. Petalace ID: " + petalaceObj.id);
    assert(
        (petalaceObj.healthGain  > 0) && (petalaceObj.healthUp  > petalaceObj.healthGain ) && (petalaceObj.healthUp  <= 100) &&
        (petalaceObj.staminaGain > 0) && (petalaceObj.staminaUp > petalaceObj.staminaGain) && (petalaceObj.staminaUp <= 100) &&
        (petalaceObj.attackGain  > 0) && (petalaceObj.attackUp  > petalaceObj.attackGain ) && (petalaceObj.attackUp  <= 100) &&
        (petalaceObj.defenseGain > 0) && (petalaceObj.defenseUp > petalaceObj.defenseGain) && (petalaceObj.defenseUp <= 100),
        "Invalid numerical value(s). Petalace ID: " + petalaceObj.id,
    );
}

export {petalaceMap};

