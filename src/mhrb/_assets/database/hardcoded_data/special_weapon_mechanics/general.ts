/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type WeaponSpecialSelection,
} from "../../../common/types";
import {
    FrozenMap,
} from "../../../generic/frozen-containers";

import {
    populate,
} from "../../_internals";

const hardcoded: WeaponSpecialSelection[] = [
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

export const specialSelectionTypesMap: FrozenMap<number, WeaponSpecialSelection> = populate(hardcoded, (obj) => obj);

