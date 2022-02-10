/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isPositiveInt,
} from "../../generic/check";
import {
    FrozenMap,
} from "../../generic/frozen-containers";

import {
    type SkillIcon,
    type Skill,
    type SkillRO,
} from "../../common/types";
import {
    toNameFilterString,
} from "../../common/mappings";
import {getImgPath} from "../../images";

type HardcodedSkill = Omit<Skill, "iconImgPath" | "filterHelpers">;

/*
 * GENERATED DATA
 */


const hardcodedSkills: HardcodedSkill[] = [
%SKILLS_ARRAY_GOES_HERE%
];


/*
 * DATA PROCESSING
 */

const iconsToImageID: {[key in SkillIcon]: string} = {
    blue     : "skill_icon_blue",
    brown    : "skill_icon_brown",
    darkblue : "skill_icon_darkblue",
    gold     : "skill_icon_gold",
    green    : "skill_icon_green",
    grey     : "skill_icon_grey",
    lightblue: "skill_icon_lightblue",
    orange   : "skill_icon_orange",
    pink     : "skill_icon_pink",
    purple   : "skill_icon_purple",
    red      : "skill_icon_red",
    white    : "skill_icon_white",
    yellow   : "skill_icon_yellow",
}

const skillMap = new Map<string, SkillRO>();
const skillMapShortIds = new Map<number, SkillRO>();

for (const obj of hardcodedSkills) {

    const mergeIn = {
        // For convenience, we also attach IDs and filter helpers to each object
        iconImgPath: getImgPath(iconsToImageID[obj.icon]),

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

