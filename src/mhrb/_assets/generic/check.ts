/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

export function isPositiveInt(num: number): boolean {
    return (num > 0) && (num % 1 === 0);
}

