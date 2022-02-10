/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type BowArcShotTypeRO,
    type BowChargeShotTypeRO,
} from "../../../common/types";
import {
    FrozenMap,
} from "../../../generic/frozen-containers";

import {
    populate,
} from "../../_internals";

const hardcodedArcShotTypes: BowArcShotTypeRO[] = [
    {
        id: "recovery",
        name: "Recovery",
    },
    {
        id: "affinity",
        name: "Affinity",
    },
    {
        id: "brace",
        name: "Brace",
    },
]
const hardcodedChargeShotTypes: BowChargeShotTypeRO[] = [
    {
        id: "pierce",
        name: "Pierce",
    },
    {
        id: "rapid",
        name: "Rapid",
    },
    {
        id: "spread",
        name: "Spread",
    },
];

export const bowArcShotTypesMap: FrozenMap<string, BowArcShotTypeRO> = populate(hardcodedArcShotTypes, (obj) => obj);
export const bowChargeShotTypesMap: FrozenMap<string, BowChargeShotTypeRO> = populate(hardcodedChargeShotTypes, (obj) => obj);

