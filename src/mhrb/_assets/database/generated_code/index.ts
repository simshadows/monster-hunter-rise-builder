/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * This file is NOT generated code.
 * The generated code files are the '_generated_*.ts' files.
 *
 * This file processes the generated code for consumption by the rest of the application.
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

import {skillsArray} from "./_generated_skills";

const skillMap = new Map<string, SkillRO>();
const skillMapShortIds = new Map<number, SkillRO>();

for (const obj of skillsArray) {
    // Validate
    console.assert(/^[_a-z0-9]+$/.test(obj.id));
    console.assert(isPositiveInt(obj.shortId));
    console.assert(obj.name !== "");
    console.assert(isPositiveInt(obj.maxLevels) && (obj.maxLevels < 8)); // Change if needed

    console.assert(obj.filterHelpers.nameLower !== "");
    console.assert(obj.filterHelpers.nameLower === toNameFilterString(obj.name));
    
    // Check for duplicates
    console.assert(!skillMap.has(obj.id));
    console.assert(!skillMapShortIds.has(obj.shortId));

    skillMap.set(obj.id, obj);
    skillMapShortIds.set(obj.shortId, obj);
}

const finalSkillMap = new FrozenMap<string, SkillRO>(skillMap);
const finalSkillMapShortIds = new FrozenMap<number, SkillRO>(skillMapShortIds);

export {
    finalSkillMap as skillMap,
    finalSkillMapShortIds as skillMapShortIds,
};

