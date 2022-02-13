// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    sleep,
    isWeaponCategoryStr,
} from "../common";

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

class GameData {

    static _makeWeaponsArray() {
        let ret = [];
        for (const [category, dataMap] of Object.entries(weaponsMap)) {
            console.assert(isWeaponCategoryStr(category));
            ret = ret.concat(Array.from(dataMap.values()));
        }
        return ret;
    }

    // Builder Function
    static async downloadRawData() {
        //await sleep(3000); // For testing

        const obj = new GameData("hello smish");
        obj.readonly = {
            skills: {
                array: Array.from(skillMap.values()),
                longIdsMap: skillMap,
                shortIdsMap: skillMapShortIds,
            },
            weaponRampSkills: {
                longIdsMap: rampageSkillsMap,
                shortIdsMap: rampageSkillsMapShortIds,
            },
            weaponSpecialSelections: {
                array: Array.from(specialSelectionTypesMap.values()),
                map: specialSelectionTypesMap,
            },
            weapons: {
                array: GameData._makeWeaponsArray(weaponsMap),
                map: weaponsMap,
            },
            armour: {
                arrays: armourArrays,
                map: armourMap,
            },
            petalaces: {
                array: Array.from(petalaceMap.values()),
                map: petalaceMap,
            },
            decorations: {
                array: Array.from(decosMap.values()),
                map: decosMap,
            },
        };

        return obj;
    }

    constructor(magic_phrase) {
        if (magic_phrase != "hello smish") {
            throw new Error("Do not instantiate directly.");
        }
    }

    getDefaultWeapon() {
        return this.readonly.weapons.map.greatsword.get("1f");
    }
}

// Convenience
async function downloadRawData() {
    return GameData.downloadRawData();
}

export {
    GameData,
    downloadRawData,
};

