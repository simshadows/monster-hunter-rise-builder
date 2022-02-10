/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type WeaponSpecialSelectionRO,
} from "../../../common/types";
import {
    FrozenMap,
} from "../../../generic/frozen-containers";

import {
    populate,
} from "./_internals";

const hardcoded: WeaponSpecialSelectionRO[] = [
    {
        id: 1,
        name: "Silencer",
        type: "lightbowgunmod",
    },
    {
        id: 2,
        name: "Long Barrel",
        type: "lightbowgunmod",
    },

    {
        id: 3,
        name: "Shield",
        type: "heavybowgunmod",
    },
    {
        id: 4,
        name: "Power Barrel",
        type: "heavybowgunmod",
    },
];

export const specialSelectionTypesMap: FrozenMap<number, WeaponSpecialSelectionRO> = populate(hardcoded, (obj) => obj);

