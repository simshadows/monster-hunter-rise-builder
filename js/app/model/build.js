/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isObj,
    isInt,
    isStrOrNull,
    isMap,
} from "../check.js";
import {
    isWeaponCategoryStr,
    isEleStatStr,
    toNameFilterString,
} from "../common.js";

const assert = console.assert;

class Build {

    _validateState() {
        if (this._weaponRO !== null) {
            assert(isObj(this._weaponRO));
            assert(isInt(this._weaponRO.affinity)); // Spot check for structure
        }
    }
    _validateWeaponNotNull() {
        if (this._weaponRO === null) {
            throw new Error("Cannot call this method when weapon is null.");
        }
    }

    _initWeaponRampSkillSelections() {
        const numSlots = this._weaponRO.rampSkills.length;
        return new Array(numSlots).fill(null); // Array of nulls
    }

    constructor(weaponObj) {
        // Equipment Selections
        this._weaponRO = weaponObj; // Object from the databasea, or null
        this._weaponRampSkillSelections = null; // Initialize later

        this._petalaceRO = null;

        this._validateState();
    }

    // Usefully returns self for use in React state transitions.
    setWeapon(db, weaponObj) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.greatsword)); // Spot check for structure

        this._weaponRO = weaponObj;
        this._validateWeaponNotNull();
        this._weaponRampSkillSelections = this._initWeaponRampSkillSelections();
        return this;
    }

    // Usefully returns self for use in React state transitions.
    setPetalace(db, petalaceObj) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.greatsword)); // Spot check for structure

        this._validateWeaponNotNull();
        this._petalaceRO = petalaceObj;
        return this;
    }

    // Usefully returns self for use in React state transitions.
    setRampageSkill(db, position, rampageSkillID) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.greatsword)); // Spot check for structure
        assert(isInt(position));
        assert(isStrOrNull(rampageSkillID));
        this._validateWeaponNotNull();

        assert((position >= 0) && (position < this._weaponRampSkillSelections.length));
        // TODO: Verify if the rampage skill ID is valid?

        this._weaponRampSkillSelections[position] = db.readonly.weaponRampSkills.getRampSkill(rampageSkillID);
        return this;
    }

    // THIS WILL ONLY SUCCEED IF this._weaponRO IS NOT NULL
    getWeaponObjRO() {
        this._validateWeaponNotNull();
        return this._weaponRO;
    }

    // THIS WILL ONLY SUCCEED IF this._weaponRO IS NOT NULL
    getPetalaceObjRO() {
        this._validateWeaponNotNull();
        return this._petalaceRO;
    }

    // THIS WILL ONLY SUCCEED IF this._weaponRO IS NOT NULL
    getRenderingProps(db) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.greatsword)); // Spot check for structure

        this._validateWeaponNotNull();

        return {
                weaponRO: {
                        name:                     this._weaponRO.name,
                        attack:                   this._weaponRO.attack,
                        affinity:                 this._weaponRO.affinity,
                        defense:                  this._weaponRO.defense,
                        eleStatType:              this._weaponRO.eleStatType,
                        eleStatValue:             this._weaponRO.eleStatValue,
                        rampSkillSelectionsArray: this._getRampSkillSelectionsArray(db),
                        rampSkillOptionsArray:    this._weaponRO.rampSkills,
                        decosArray: [[2, "Charger Jewel 2"],
                                     [1, "~~NOTREAL~~"]],
                    },
                petalaceRO: {
                        originalPetalaceObj: this._petalaceRO, // I'm lazy
                    },
            };
    }

    _getRampSkillSelectionsArray(db) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.greatsword)); // Spot check for structure

        const ret = [];
        for (const rampSkillObj of this._weaponRampSkillSelections) {
            if (rampSkillObj === null) {
                ret.push(null);
            } else {
                ret.push(rampSkillObj);
            }
        }
        return ret;
    }

}

export {
    Build,
};

