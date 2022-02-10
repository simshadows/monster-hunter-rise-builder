/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type GLShellingTypeRO,
} from "../../../common/types";
import {
    FrozenMap,
} from "../../../generic/frozen-containers";

import {
    populate,
} from "./_internals";

const hardcoded: GLShellingTypeRO[] = [
    {id: "normal", name: "Normal"},
    {id: "long"  , name: "Long"  },
    {id: "wide"  , name: "Wide"  },
];

export const gunlanceShellingTypesMap: FrozenMap<string, GLShellingTypeRO> = populate(hardcoded, (obj) => obj);

