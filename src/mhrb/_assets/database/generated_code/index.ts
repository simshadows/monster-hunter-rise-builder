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
    type DecorationRO,
} from "../../common/types";
import {
    toNameFilterString,
} from "../../common/mappings";
import {
    populate,
} from "../_internals";

import {skillsArray} from "./_generated_skills";
import {decosArray} from "./_generated_decorations";

/*** Skills ***/

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

/*** Decorations ***/

const decosMap: FrozenMap<number, DecorationRO> = populate(
    decosArray,
    (obj) => {
        // Validate
        console.assert(isPositiveInt(obj.id));
        console.assert(obj.name !== "");
        console.assert(obj.skills.length > 0); // Should be at least one skill in there
        for (const [_, v] of obj.skills) console.assert(isPositiveInt(v));

        console.assert(obj.filterHelpers.nameLower !== "");
        console.assert(obj.filterHelpers.nameLower === toNameFilterString(obj.name));

        return obj;
    }
);

export {
    decosMap,
    finalSkillMap as skillMap,
    finalSkillMapShortIds as skillMapShortIds,
};

