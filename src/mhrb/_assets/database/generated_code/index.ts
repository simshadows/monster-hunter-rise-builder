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
    sumArray,
} from "../../generic/utils";
import {
    FrozenMap,
} from "../../generic/frozen-containers";

import {
    type ArmourSlot,
    type SkillRO,
    type RampageSkillRO,
    type DecorationRO,

    type WeaponRO,
    type MeleeWeaponRO,
    type GreatswordRO,

    type ArmourPieceRO,
    type ArmourSetRO,
    type WeaponMap,
} from "../../common/types";
import {
    isMeleeRO,
} from "../../common/type_predicates";
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

import {greatswordsArray} from "./_generated_weapon_greatsword";

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

/*** Rampage Skills ***/

// Now, we populate these maps.
const rampsMap = new Map<string, RampageSkillRO>();
const rampsMapShortIds = new Map<string, RampageSkillRO>();

// For convenience, we also attach IDs to each object
for (const obj of rampsArray) {

    // Validate
    console.assert(/^[_a-z0-9]+$/.test(obj.id));
    console.assert(/^[a-z0-9]+$/.test(obj.shortId));
    console.assert(obj.name !== "");

    // Check for duplicates
    console.assert(!rampsMap.has(obj.id));
    console.assert(!rampsMapShortIds.has(obj.shortId));

    rampsMap.set(obj.id, obj);
    rampsMapShortIds.set(obj.shortId, obj);
}

const finalRampsMap = new FrozenMap<string, RampageSkillRO>(rampsMap);
const finalRampsMapShortIds = new FrozenMap<string, RampageSkillRO>(rampsMapShortIds);

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
    },
);

/*** Weapons ***/

function validateMeleeWeapon(w: MeleeWeaponRO): void {
    const baseSum = sumArray(w.baseSharpness);
    const maxSum = sumArray(w.maxSharpness);

    console.assert((baseSum === maxSum) || (baseSum + 50 === maxSum));
    
    console.assert(w.baseSharpness.length === w.maxSharpness.length); // sanity check
    let levelMustBeEqual = false;
    for (let i = w.baseSharpness.length - 1; i >= 0; --i) {
        const b = w.baseSharpness[i]!; // DANGER: Type assertion!
        const m = w.maxSharpness[i]!;

        // Check to see that the assertions are correct
        console.assert(b !== undefined);
        console.assert(m !== undefined);

        console.assert((b % 1 === 0) && (b >= 0));
        console.assert((m % 1 === 0) && (m >= 0));

        if (levelMustBeEqual) {
            console.assert(b === m);
        } else {
            if (b > 0) levelMustBeEqual = true;
            console.assert(b <= m);
        }
    }
}

function processWeapon<W extends WeaponRO>(arr: Readonly<W[]>): FrozenMap<string, W> {
    return populate<W>(
        arr,
        (obj) => {

            // Validate common invariants
            console.assert(/^[a-z0-9]+$/.test(obj.id));
            console.assert(obj.name !== "");
            console.assert(obj.treeName !== "");
            console.assert(isPositiveInt(obj.attack));
            console.assert(obj.affinity % 1 === 0);
            console.assert((obj.defense % 1 === 0) && (obj.defense >= 0));
            for (const [_, eleStatValue] of obj.eleStat.entries()) {
                console.assert(isPositiveInt(eleStatValue));
            }

            console.assert(obj.filterHelpers.nameLower !== "");
            console.assert(obj.filterHelpers.nameLower === toNameFilterString(obj.name));

            console.assert(obj.filterHelpers.treeNameLower !== "");
            console.assert(obj.filterHelpers.treeNameLower === toNameFilterString(obj.treeName));

            if (isMeleeRO(obj)) validateMeleeWeapon(obj);
            return obj;
        },
    );
}

const weaponsMap: Readonly<WeaponMap> = {
    greatsword: processWeapon<GreatswordRO>(greatswordsArray),
};

/*** Armour ***/

const tmpSlotIDList: ArmourSlot[] = ["head", "chest", "arms", "waist", "legs"];

const armourMap: FrozenMap<number, ArmourSetRO> = populate(
    armourSetsArray,
    (obj) => {
        // Validate
        console.assert(isPositiveInt(obj.id));
        console.assert(obj.name !== "");
        for (const slotID of tmpSlotIDList) {
            const piece = obj[slotID]
            if (!piece) continue;
            console.assert(piece.setID === obj.id);
            console.assert(piece.setName === obj.name);
            console.assert(piece.name !== "");
            for (const [_, v] of piece.skills) console.assert(isPositiveInt(v));

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

const armourArrays: Readonly<{[key in ArmourSlot]: Readonly<ArmourPieceRO[]>}> = (()=>{
    const ret: {[key in ArmourSlot]: ArmourPieceRO[]} = {
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

