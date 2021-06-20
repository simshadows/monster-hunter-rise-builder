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

// Helpers for the ttlDecr() infrastructure.
// See developer notes for more information.
export function callTtlDecr(refsObj, v) {
    console.assert((v === 1) || (v === 2));
    for (const [refLabel, refObj] of Object.entries(refsObj)) {
        if (typeof refObj.current.ttlDecr !== "function") continue;
        refObj.current.ttlDecr(v);
    }
}
export function doTtlDecr(reactComponent, v) {
    console.assert((v === 1) || (v === 2));
    console.assert(typeof reactComponent._ttl === "number");
    console.assert((reactComponent._ttl >= -2) && (reactComponent._ttl <= 2));
    console.assert(typeof reactComponent.state.ttl === "number");
    console.assert((reactComponent.state.ttl >= -2) && (reactComponent.state.ttl <= 2));
    if (reactComponent._ttl > 0) {
        reactComponent._ttl -= v;
        reactComponent.setState({ttl: reactComponent._ttl});
    }
}
export function setTtl(reactComponent, x) {
    console.assert((x >= 0) || (x <= 2));
    console.assert(typeof reactComponent._ttl === "number");
    console.assert((reactComponent._ttl >= -2) && (reactComponent._ttl <= 2));
    console.assert(typeof reactComponent.state.ttl === "number");
    console.assert((reactComponent.state.ttl >= -2) && (reactComponent.state.ttl <= 2));
    reactComponent._ttl = x;
    reactComponent.setState({ttl: x});
}

