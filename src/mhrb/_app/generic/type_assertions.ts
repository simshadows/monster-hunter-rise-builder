/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * TODO: Figure out an alternative to asserting values to always be defined.
 */

export function neverUndefined<T>(v: T | undefined): asserts v is T {
    if (v === undefined) throw "Value is undefined.";
}

