/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * This file is NOT generated code.
 * The generated code files are the '_generated_*.ts' files.
 */

import {
    isPositiveInt,
} from "../../generic/check";
import {
    FrozenMap,
} from "../../generic/frozen-containers";

import {
    type SkillRO,
} from "../../common/types";
import {
    toNameFilterString,
} from "../../common/mappings";
import {getImgPath} from "../../images";

import {hardcodedSkills} from "./_generated_skills";

const skillMap = new Map<string, SkillRO>();
const skillMapShortIds = new Map<number, SkillRO>();

for (const obj of hardcodedSkills) {

    const mergeIn = {
        // For convenience, we also attach IDs and filter helpers to each object
        iconImgPath: getImgPath(obj.iconImgID),

        // We will also convert the icon string to an icon image path.
        // This will also implicitly check for the icon validity
        filterHelpers: {
            nameLower: toNameFilterString(obj.name),
        },
    } as const;

    const finalObj: SkillRO = {...obj, ...mergeIn}; 

    // Validate
    console.assert(/^[_a-z0-9]+$/.test(finalObj.id));
    console.assert(isPositiveInt(finalObj.shortId));
    console.assert(finalObj.name !== "");
    console.assert(isPositiveInt(finalObj.maxLevels) && (finalObj.maxLevels < 8)); // Change if needed
    console.assert(finalObj.iconImgPath !== "");
    console.assert(finalObj.filterHelpers.nameLower !== "");
    
    // Check for duplicates
    console.assert(!skillMap.has(obj.id));
    console.assert(!skillMapShortIds.has(obj.shortId));

    skillMap.set(finalObj.id, finalObj);
    skillMapShortIds.set(finalObj.shortId, finalObj);
}

const finalSkillMap = new FrozenMap<string, SkillRO>(skillMap);
const finalSkillMapShortIds = new FrozenMap<number, SkillRO>(skillMapShortIds);

export {
    finalSkillMap as skillMap,
    finalSkillMapShortIds as skillMapShortIds,
};

