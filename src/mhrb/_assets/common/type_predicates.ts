/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * All complex type predicates are contained here.
 *
 * This is all dangerous code because it makes type assertions! Bugs here can lead
 * to bypassing type safety!
 */

import {
    type WeaponCategory,
    type MeleeWeaponCategory,
    type WeaponRO,
    type MeleeWeaponRO,
} from "./types";

export function isMeleeCategory(s: WeaponCategory): s is MeleeWeaponCategory {
    return (s !== "lightbowgun") && (s !== "heavybowgun") && (s !== "bow");
}

export function isMeleeRO(obj: WeaponRO): obj is MeleeWeaponRO {
    return isMeleeCategory(obj.category);
}

