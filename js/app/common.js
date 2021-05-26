/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

const element = React.createElement;

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function setUnion(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

/*** Enums Verification ***/

const eleStatStrs = new Set(["none", "fire", "water", "thunder", "ice", "dragon", "paralysis", "sleep", "blast"]);
export function isEleStatStr(obj) {
    return eleStatStrs.has(obj);
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

const eleStatStrToEmojiMap = {
    none: "-",

    fire: "\ud83d\udd25",
    water: "\ud83d\udca7",
    thunder: "\u26a1",
    ice: "\u2744\ufe0f",
    dragon: "\ud83d\udc32",

    paralysis: "\ud83e\udda0",
    sleep: "\ud83d\udca4",
    blast: "\ud83d\udca5",
}
export function eleStatStrToEmoji(obj) {
    return eleStatStrToEmojiMap[obj];
}

/*** Common React Components ***/

export function br() {
    return element("br", null, null);
}

