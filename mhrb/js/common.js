/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import * as check from "./check.js";
import {getImgPath} from "./images.js";

const element = React.createElement;
const assert = console.assert;

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function setUnion(setA, setB) {
    check.isSet(setA);
    check.isSet(setB);
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

export function strHasOnlyLowerUnder(s) {
    check.isStr(s);
    const match = s.match(/^[a-z_]+$/g);
    return (match !== null);
}
export function strHasOnlyLowerNumeral(s) {
    check.isStr(s);
    const match = s.match(/^[a-z0-9]+$/g);
    return (match !== null);
}
export function strHasOnlyLowerNumeralUnder(s) {
    check.isStr(s);
    const match = s.match(/^[a-z0-9_]+$/g);
    return (match !== null);
}

/*** Enums Verification ***/

export const weaponCategoryStrs = new Set([
    "greatsword",
    "longsword",
    "swordandshield",
    "dualblades",
    "switchaxe",
    "chargeblade",
    "hammer",
    "huntinghorn",
    "lance",
    "gunlance",
    "insectglaive",
    "bow",
    "lightbowgun",
    "heavybowgun",
]);
export function isWeaponCategoryStr(obj) {
    return weaponCategoryStrs.has(obj);
}

const tierStrs = new Set(["lr", "hr"]);
export function isTierStr(obj) {
    return tierStrs.has(obj);
}

const weaponEndlineTagStrs = new Set(["", "hr"]);
export function isWeaponEndlineTagStr(obj) {
    return weaponEndlineTagStrs.has(obj);
}

export const eleStatStrs = new Set(["none", "fire", "water", "thunder", "ice", "dragon", "poison", "paralysis", "sleep", "blast"]);
export function isEleStatStr(obj) {
    return eleStatStrs.has(obj);
}
export const eleStrs = new Set(["fire", "water", "thunder", "ice", "dragon"]);
export function isEleStr(obj) {
    return eleStrs.has(obj);
}

const armourSlotStrs = new Set(["head", "chest", "arms", "waist", "legs"]);
export function isArmourSlotStr(obj) {
    return armourSlotStrs.has(obj);
}

const decoEquippableSlotStrs = setUnion((new Set(["weapon", "talisman"])), armourSlotStrs);
export function isDecoEquippableSlotStr(obj) {
    return decoEquippableSlotStrs.has(obj);
}

const equipSlotStrs = setUnion((new Set(["petalace"])), decoEquippableSlotStrs);
export function isEquipSlotStr(obj) {
    return equipSlotStrs.has(obj);
}

/*** Maps ***/

const tierIDToAbbrevMap = {
    lr: "LR",
    hr: "HR",
}
export function tierIDToAbbrev(obj) {
    return tierIDToAbbrevMap[obj];
}

const weaponCategoryToNameMap = {
    greatsword: "Greatsword",
    longsword: "Longsword",
    swordandshield: "Sword and Shield",
    dualblades: "Dual Blades",
    switchaxe: "Switch Axe",
    chargeblade: "Charge Blade",
    hammer: "Hammer",
    huntinghorn: "Hunting Horn",
    lance: "Lance",
    gunlance: "Gunlance",
    insectglaive: "Insect Glaive",
    bow: "Bow",
    lightbowgun: "Light Bowgun",
    heavybowgun: "Heavy Bowgun",
}
export function weaponCategoryToName(obj) {
    return weaponCategoryToNameMap[obj];
}

const equipmentSlotToNameMap = {
    head:  "Head",
    chest: "Chest",
    arms:  "Arms",
    waist: "Waist",
    legs:  "Legs",
}
export function equipmentSlotToName(obj) {
    return equipmentSlotToNameMap[obj];
}

const eleStatIdToNameMap = {
    fire:      "Fire",
    water:     "Water",
    thunder:   "Thunder",
    ice:       "Ice",
    dragon:    "Dragon",
    poison:    "Poison",
    paralysis: "Paralysis",
    sleep:     "Sleep",
    blast:     "Blast",
}
export function eleStatIdToName(obj) {
    return eleStatIdToNameMap[obj];
}

const weaponTagsMap = {
    greatsword    : new Set(["melee"]),
    longsword     : new Set(["melee"]),
    swordandshield: new Set(["melee"]),
    dualblades    : new Set(["melee"]),
    switchaxe     : new Set(["melee"]),
    chargeblade   : new Set(["melee"]),
    hammer        : new Set(["melee"]),
    huntinghorn   : new Set(["melee"]),
    lance         : new Set(["melee"]),
    gunlance      : new Set(["melee"]),
    insectglaive  : new Set(["melee"]),
    bow           : new Set(),
    lightbowgun   : new Set(),
    heavybowgun   : new Set(),
}
export function getWeaponTags(obj) {
    return weaponTagsMap[obj];
}

/*** Common React Components ***/

export function br() {
    return element("br", null, null);
}

export function clipsafeSpan(...children) {
    return element("span", {className: "clipsafe"}, ...children);
}

const MAX_TOTAL_SHARPNESS = 400;
const SHARPNESS_LEVELS = [
    ["red"   , "var(--color-sharpness--red)"   ],
    ["orange", "var(--color-sharpness--orange)"],
    ["yellow", "var(--color-sharpness--yellow)"],
    ["green" , "var(--color-sharpness--green)" ],
    ["blue"  , "var(--color-sharpness--blue)"  ],
    ["white" , "var(--color-sharpness--white)" ],
]
export function SharpnessBar(props) {
    assert(check.isArr(props.baseSharpness));
    assert(check.isArr(props.maxSharpness));

    function renderSection(values) {
        const elements = [];
        for (const [i, [levelName, backgroundColour]] of SHARPNESS_LEVELS.entries()) {
            // levelName not used yet
            const width = ((values[i] / MAX_TOTAL_SHARPNESS) * 100).toFixed(4) + "%";
            elements.push(
                element("div",
                    {
                    style: {
                            background: backgroundColour,
                            width: width,
                            height: "100%",
                        },
                    },
                )
            );
        }
        return element("div",
            {
            className: "sharpness-bar-section",
            },
            ...elements,
        );
    }

    return element("div",
        {
        className: "sharpness-bar",
        },
        renderSection(props.baseSharpness),
        renderSection(props.maxSharpness),
    );
}



/*** Others ***/

export function toNameFilterString(s) {
    // TODO: Also strip out punctuation?
    return s.toLowerCase().replace(/\s/g, "");
}

const eleStatOrdering = {
    fire: 0,
    water: 1,
    thunder: 2,
    ice: 3,
    dragon: 4,
    poison: 5,
    paralysis: 6,
    sleep: 7,
    blast: 8,
}
export function iterateEleStatMapInLogicalOrder(eleStatMap) {
    assert(check.isMap(eleStatMap));
    const ret = [];
    for (const [eleStatType, v] of eleStatMap.entries()) {
        ret.push([eleStatType, v]);
    }
    ret.sort((a, b) => {
            const av = eleStatOrdering[a[0]];
            const bv = eleStatOrdering[b[0]];
            if (av === bv) return 0;
            return (av > bv) ? 1 : -1;
        });
    return ret;
}

