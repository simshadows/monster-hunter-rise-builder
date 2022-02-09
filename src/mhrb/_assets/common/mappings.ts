/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

export function toNameFilterString(s: string): string {
    // TODO: Also strip out punctuation?
    return s.toLowerCase().replace(/\s/g, "");
}

