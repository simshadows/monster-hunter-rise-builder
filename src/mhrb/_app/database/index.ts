/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    FrozenMap,
} from "../generic/frozen-containers";

import {
    type Skill,
    type RampageSkill,
    type WeaponSpecialSelection,
    type Weapon,
    type WeaponMap,
    type ArmourSlot,
    type ArmourPiece,
    type ArmourSet,
    type Petalace,
    type Decoration,
} from "../common/types";

import {
    skillMap,
    skillMapShortIds,
    rampageSkillsMap,
    rampageSkillsMapShortIds,
    decosMap,
    weaponsMap,
    armourMap,
    armourArrays,
} from "./generated_code";
import {
    petalaceMap,
} from "./hardcoded_data/petalace_data";

import {specialSelectionTypesMap} from "./hardcoded_data/special_weapon_mechanics/general";

interface ArrayMapPair<K, T> {
    readonly array: Readonly<T[]>;
    readonly map:   Readonly<FrozenMap<K, T>>;
}

export interface MHRDatabase {
    readonly skills: {
        readonly array:       Readonly<Skill[]>;
        readonly longIdsMap:  Readonly<FrozenMap<string, Skill>>;
        readonly shortIdsMap: Readonly<FrozenMap<number, Skill>>;
    },
    readonly weaponRampSkills: {
        readonly longIdsMap:  Readonly<FrozenMap<string, RampageSkill>>;
        readonly shortIdsMap: Readonly<FrozenMap<string, RampageSkill>>;
    },
    readonly weaponSpecialSelections: ArrayMapPair<number, WeaponSpecialSelection>;
    readonly weapons: {
        readonly array: Readonly<Weapon[]>;
        readonly map:   WeaponMap;
    },
    readonly armour: {
        readonly arrays: Readonly<{[Key in ArmourSlot]: Readonly<ArmourPiece[]>}>;
        readonly map:    Readonly<FrozenMap<number, ArmourSet>>;
    },
    readonly petalaces:   ArrayMapPair<string, Petalace>;
    readonly decorations: ArrayMapPair<number, Decoration>;
}

function getWeaponsArray() {
    let ret: Weapon[] = [];
    for (const [_, dataMap] of Object.entries(weaponsMap)) {
        //ret = ret.concat(Array.from(dataMap.values()));
        for (const [_, weapon] of dataMap.entries()) {
            ret.push(weapon);
        }
    }
    return ret;
}

export const db: MHRDatabase = {
    skills: {
        array:       Array.from(skillMap.values()),
        longIdsMap:  skillMap,
        shortIdsMap: skillMapShortIds,
    },
    weaponRampSkills: {
        longIdsMap:  rampageSkillsMap,
        shortIdsMap: rampageSkillsMapShortIds,
    },
    weaponSpecialSelections: {
        array: Array.from(specialSelectionTypesMap.values()),
        map:   specialSelectionTypesMap,
    },
    weapons: {
        array: getWeaponsArray(),
        map:   weaponsMap,
    },
    armour: {
        arrays: armourArrays,
        map:    armourMap,
    },
    petalaces: {
        array: Array.from(petalaceMap.values()),
        map:   petalaceMap,
    },
    decorations: {
        array: Array.from(decosMap.values()),
        map:   decosMap,
    },
};

export function getDefaultWeapon(): Weapon {
    const ret = db.weapons.map.greatsword.get("1f");
    if (ret === undefined) throw "Expected to find something.";
    return ret;
}

