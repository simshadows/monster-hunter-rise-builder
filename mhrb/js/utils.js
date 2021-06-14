/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

export function removeElementByID(elementID) {
    document.getElementById(elementID).remove();
}

export function sum(a, b) {
    return a + b;
}

// Left minus Right
export function setDifference(setA, setB) {
    console.assert(setA instanceof Set);
    console.assert(setB instanceof Set);
    return new Set([...setA].filter(x => !setB.has(x)));
}

