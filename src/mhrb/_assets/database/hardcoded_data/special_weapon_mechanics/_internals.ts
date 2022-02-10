/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isPositiveInt,
} from "../../../generic/check";
import {
    FrozenMap,
} from "../../../generic/frozen-containers";

// TODO: Get this to work?
//function defaultMapper<In, Out>(obj: In): Out {
//    return {...obj};
//}

type HasIDandName<K> = {
    id: K;
    name: string;
};

// NOTE: hardcodedData can be modified by this operation!
export function populate<
    PreprocessedDataObj extends HasIDandName<PreprocessedDataObj["id"]>,
    FinalDataObj        extends HasIDandName<PreprocessedDataObj["id"]> = PreprocessedDataObj,
>(
    hardcodedData: PreprocessedDataObj[],
    mapper       : (x: PreprocessedDataObj) => FinalDataObj,
): FrozenMap<PreprocessedDataObj["id"], FinalDataObj> {

    const ret = new Map<PreprocessedDataObj["id"], FinalDataObj>();
    for (const obj of hardcodedData) {
        console.assert((obj.id !== "") && ((typeof obj.id !== "number") || isPositiveInt(obj.id)));
        console.assert(obj.name !== "");

        const finalObj: FinalDataObj = mapper(obj);

        // Check for duplicates
        console.assert(!ret.has(finalObj.id));

        ret.set(finalObj.id, finalObj);
    }
    return new FrozenMap<PreprocessedDataObj["id"], FinalDataObj>(ret);
}

