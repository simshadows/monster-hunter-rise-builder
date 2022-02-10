/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type SAPhialTypeRO,
} from "../../../common/types";
import {
    FrozenMap,
} from "../../../generic/frozen-containers";

import {
    populate,
} from "./_internals";

const hardcoded: SAPhialTypeRO[] = [
    {
        id: "power_phial",
        name: "Power Phial",
    },
    {
        id: "element_phial",
        name: "Element Phial",
    },
    {
        id: "poison_phial",
        name: "Poison Phial",
    },
    {
        id: "paralysis_phial",
        name: "Paralysis Phial",
    },
    {
        id: "dragon_phial",
        name: "Dragon Phial",
    },
    {
        id: "exhaust_phial",
        name: "Exhaust Phial",
    },
];

export const switchAxePhialTypesMap: FrozenMap<string, SAPhialTypeRO> = populate(hardcoded, (obj) => obj);

