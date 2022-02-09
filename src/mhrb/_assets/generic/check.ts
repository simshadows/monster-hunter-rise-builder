/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Contains runtime checks specifically for testing common value invariants, and emits errors in console if they are broken.
 */

export function isPositiveInt(num: number): void {
    if ((num <= 0) || (num % 1 !== 0)) console.error(`[isPositiveInt] Number ${num} is not a positive integer.`);
}

export function isNonEmptyStr(str: string): void {
    if (str === "") console.error("[isNonEmptyStr] String is empty.");
}

