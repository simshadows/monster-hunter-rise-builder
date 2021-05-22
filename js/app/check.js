/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

export function isObj(obj) {
    console.assert((typeof obj === "object"), "Expected an Object type. Instead got:", obj);
}

export function isFunction(obj) {
    console.assert((typeof obj === "function"), "Expected a function type. Instead got:", obj);
}

export function isInt(obj) {
    console.assert((typeof obj === "number") && (obj % 1 === 0), "Expected an integer. Instead got:", obj);
}

export function isStr(obj) {
    console.assert((typeof obj === "string"), "Expected a string. Instead got:", obj);
}
export function isStrOrNull(obj) {
    console.assert((typeof obj === "string") || (obj === null), "Expected a string or null. Instead got:", obj);
}

export function isArr(obj) {
    console.assert(Array.isArray(obj), "Expected an Array type. Instead got:", obj);
}

export function isMap(obj) {
    console.assert((obj instanceof Map), "Expected a Map type. Instead got:", obj);
}

