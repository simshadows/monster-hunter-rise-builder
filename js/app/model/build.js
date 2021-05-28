/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isObj,
    isInt,
    assert,
} from "../check.js";
import {
    isWeaponCategoryStr,
    isEleStatStr,
    toNameFilterString,
} from "../common.js";

class Build {

    _validateState() {
        if (this.weaponRO !== null) {
            assert(isObj(this.weaponRO));
            assert(isInt(this.weaponRO.affinity)); // Spot check for structure
        }
    }
    _validateWeaponNotNull() {
        if (this.weaponRO === null) {
            throw new Error("Cannot call this method when weapon is null.");
        }
    }

    constructor(weaponObj) {
        this.weaponRO = weaponObj; // Object from the databasea, or null

        this._validateState();
    }

    // Usefully returns self for use in React state transitions.
    setWeapon(weaponObj) {
        this.weaponRO = weaponObj;
        return this;
    }

    // THIS WILL ONLY SUCCEED IF this.weaponRO IS NOT NULL
    getRenderingProps() {
        this._validateWeaponNotNull();

        return {
                weaponRO: {
                    name: this.weaponRO.name,
                    attack: this.weaponRO.attack,
                    affinity: this.weaponRO.affinity,
                    defense: this.weaponRO.defense,
                    eleStatType: this.weaponRO.eleStatType,
                    eleStatValue: this.weaponRO.eleStatValue,
                    rampSkillNamesArray: ["Affinity Boost I",
                                          "~~NOTREAL~~",
                                          "~~NOTREAL~~"],
                    decosArray: [[2, "Charger Jewel 2"],
                                 [1, "~~NOTREAL~~"]],
                },
            };
    }

}

export {
    Build,
};

