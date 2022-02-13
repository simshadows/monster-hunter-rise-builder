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
    isPositiveNZInt,
} from "../../generic/check";
import {
    FrozenMap,
} from "../../generic/frozen-containers";

import {
    type ArmourSlot,
    type Skill,
    type RampageSkill,
    type Decoration,

    type ArmourPiece,
    type ArmourSet,
} from "../../common/types";
import {
    toNameFilterString,
} from "../../common/mappings";
import {
    populate,
} from "../_internals";

import {skillsArray} from "./_generated_skills";
import {rampsArray} from "./_generated_rampage_skills";
import {decosArray} from "./_generated_decorations";
import {armourSetsArray} from "./_generated_armour";

import {weaponsMap} from "./weapons";

/*** Skills ***/

const skillMap = new Map<string, Skill>();
const skillMapShortIds = new Map<number, Skill>();

for (const obj of skillsArray) {
    // Validate
    console.assert(/^[_a-z0-9]+$/.test(obj.id));
    console.assert(isPositiveNZInt(obj.shortId));
    console.assert(obj.name !== "");
    console.assert(isPositiveNZInt(obj.maxLevels) && (obj.maxLevels < 8)); // Change if needed

    console.assert(obj.filterHelpers.nameLower !== "");
    console.assert(obj.filterHelpers.nameLower === toNameFilterString(obj.name));
    
    // Check for duplicates
    console.assert(!skillMap.has(obj.id));
    console.assert(!skillMapShortIds.has(obj.shortId));

    skillMap.set(obj.id, obj);
    skillMapShortIds.set(obj.shortId, obj);
}

const finalSkillMap = new FrozenMap<string, Skill>(skillMap);
const finalSkillMapShortIds = new FrozenMap<number, Skill>(skillMapShortIds);

/*** Rampage Skills ***/

// Now, we populate these maps.
const rampsMap = new Map<string, RampageSkill>();
const rampsMapShortIds = new Map<string, RampageSkill>();

// For convenience, we also attach IDs to each object
for (const obj of rampsArray) {

    // Validate
    console.assert(/^[_a-z0-9]+$/.test(obj.id));
    console.assert(/^[a-z0-9]+$/.test(obj.shortID));
    console.assert(obj.name !== "");

    // Check for duplicates
    console.assert(!rampsMap.has(obj.id));
    console.assert(!rampsMapShortIds.has(obj.shortID));

    rampsMap.set(obj.id, obj);
    rampsMapShortIds.set(obj.shortID, obj);
}

const finalRampsMap = new FrozenMap<string, RampageSkill>(rampsMap);
const finalRampsMapShortIds = new FrozenMap<string, RampageSkill>(rampsMapShortIds);

/*** Decorations ***/

const decosMap: FrozenMap<number, Decoration> = populate(
    decosArray,
    (obj) => {
        // Validate
        console.assert(isPositiveNZInt(obj.id));
        console.assert(obj.name !== "");
        console.assert(obj.skills.length > 0); // Should be at least one skill in there
        for (const [_, v] of obj.skills) console.assert(isPositiveNZInt(v));

        console.assert(obj.filterHelpers.nameLower !== "");
        console.assert(obj.filterHelpers.nameLower === toNameFilterString(obj.name));

        return obj;
    },
);

/*** Armour ***/

const tmpSlotIDList: ArmourSlot[] = ["head", "chest", "arms", "waist", "legs"];

const armourMap: FrozenMap<number, ArmourSet> = populate(
    armourSetsArray,
    (obj) => {
        // Validate
        console.assert(isPositiveNZInt(obj.id));
        console.assert(obj.name !== "");
        for (const slotID of tmpSlotIDList) {
            const piece = obj[slotID]
            if (!piece) continue;
            console.assert(piece.setID === obj.id);
            console.assert(piece.setName === obj.name);
            console.assert(piece.name !== "");
            for (const [_, v] of piece.skills) console.assert(isPositiveNZInt(v));

            console.assert((piece.defenseAtLevel1 % 1 === 0) && (piece.defenseAtLevel1 >= 0));
            console.assert(piece.fireRes    % 1 === 0);
            console.assert(piece.waterRes   % 1 === 0);
            console.assert(piece.thunderRes % 1 === 0);
            console.assert(piece.iceRes     % 1 === 0);
            console.assert(piece.dragonRes  % 1 === 0);

            console.assert(piece.filterHelpers.nameLower !== "");
            console.assert(piece.filterHelpers.nameLower === toNameFilterString(piece.name));

            console.assert(piece.filterHelpers.setNameLower !== "");
            console.assert(piece.filterHelpers.setNameLower === toNameFilterString(piece.setName));

            // piece.filterHelpers.hintStrLower doesn't need validation
        }
        return obj;
    },
);

const armourArrays: Readonly<{[key in ArmourSlot]: Readonly<ArmourPiece[]>}> = (()=>{
    const ret: {[key in ArmourSlot]: ArmourPiece[]} = {
        head:  [],
        chest: [],
        arms:  [],
        waist: [],
        legs:  [],
    };
    for (const [_, armourSet] of armourMap.entries()) {
        for (const slotID of tmpSlotIDList) {
            const armourPiece = armourSet[slotID];
            if (armourPiece) ret[slotID].push(armourPiece);
        }
    }
    return ret;
})();

export {
    finalSkillMap         as skillMap,
    finalSkillMapShortIds as skillMapShortIds,
    finalRampsMap         as rampageSkillsMap,
    finalRampsMapShortIds as rampageSkillsMapShortIds,
    decosMap,
    weaponsMap,
    armourMap,
    armourArrays,
};

