/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

export function isObj(obj) {
    const res = (typeof obj === "object");
    console.assert(res, "Expected an Object type. Instead got:", obj);
    return res;
}
export function isObjOrNull(obj) {
    const res = (typeof obj === "object") || (obj == null);
    console.assert(res, "Expected an Object type or null. Instead got:", obj);
    return res;
}

export function isFunction(obj) {
    const res = (typeof obj === "function");
    console.assert(res, "Expected a function type. Instead got:", obj);
    return res;
}

export function isInt(obj) {
    const res = (typeof obj === "number") && (obj % 1 === 0);
    console.assert(res, "Expected an integer. Instead got:", obj);
    return res;
}

export function isBool(obj) {
    const res = (typeof obj === "boolean");
    console.assert(res, "Expected a boolean. Instead got:", obj);
    return res;
}

export function isStr(obj) {
    const res = (typeof obj === "string");
    console.assert(res, "Expected a string. Instead got:", obj);
    return res;
}
export function isNonEmptyStr(obj) {
    const res = (typeof obj === "string") && (obj.length > 0);
    console.assert(res, "Expected a string. Instead got:", obj);
    return res;
}
export function isStrOrNull(obj) {
    const res = (typeof obj === "string") || (obj === null);
    console.assert(res, "Expected a string or null. Instead got:", obj);
    return res;
}
export function isStrOrUndef(obj) {
    const res = (typeof obj === "string") || (obj === undefined);
    console.assert(res, "Expected a string or undefined. Instead got:", obj);
    return res;
}

export function isArr(obj) {
    const res = Array.isArray(obj);
    console.assert(res, "Expected an Array type. Instead got:", obj);
    return res;
}

export function isMap(obj) {
    const res = (obj instanceof Map);
    console.assert(res, "Expected a Map type. Instead got:", obj);
    return res;
}

export function isSet(obj) {
    const res = (obj instanceof Set);
    console.assert(res, "Expected a Set type. Instead got:", obj);
    return res;
}

/****/

// This throws an error.
export function assert(testResult, ...args) {
    if (!testResult) {
        throw new Error(...args);
    }
}

