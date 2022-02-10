/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type CBPhialTypeRO,
} from "../../../common/types";
import {
    FrozenMap,
} from "../../../generic/frozen-containers";

import {
    populate,
} from "./_internals";

const hardcoded: CBPhialTypeRO[] = [
    {
        id: "impact_phial",
        name: "Impact Phial",
    },
    {
        id: "element_phial",
        name: "Element Phial",
    },
];

export const chargeBladePhialTypesMap: FrozenMap<string, CBPhialTypeRO> = populate(hardcoded, (obj) => obj);

