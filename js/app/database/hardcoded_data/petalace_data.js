/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isObj,
    isInt,
    isStr,
    assert,
} from "../../check.js";
import {
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
}

// TODO: Verify data validity?

export {petalaceMap};

