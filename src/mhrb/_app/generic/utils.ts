/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

export function sumArray(arr: Readonly<number[]>): number {
    return arr.reduce((partialSum, n) => (partialSum + n), 0);
}

