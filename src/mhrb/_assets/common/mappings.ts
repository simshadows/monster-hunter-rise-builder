/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type GLShellingType,
} from "./types";

export function toNameFilterString(s: string): string {
    // IMPORTANT: Please maintain parity between this Javascript implementation and the Python implementation.
    // TODO: Also strip out punctuation?
    return s.toLowerCase().replace(/\s/g, "");
}

export function glShellingTypeName(s: GLShellingType): string {
    switch (s) {
        default: console.error(`Unexpected value: ${s}`); // Fallthrough
        case "normal": return "Normal";
        case "long":   return "Long";
        case "wide":   return "Wide";
    }
}

