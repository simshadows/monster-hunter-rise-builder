/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

const eleStatStrs = new Set(["none", "fire", "water", "thunder", "ice", "dragon", "paralysis", "sleep", "blast"]);

export function isEleStatStr(obj) {
    return eleStatStrs.has(obj);
}

/****/

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
