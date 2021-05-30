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
        // TODO: What if _weaponRO is null?

        for (const [slotID, armourPieceRO] of Object.entries(this._armourRO)) {
            if (armourPieceRO != null) { // armourPieceRO allowed to be null
                assert(isInt(armourPieceRO.dragonRes)); // Spot check for structure
            }
        }

        if (this._petalaceRO !== null) {
            assert(isObj(this._petalaceRO));
            // TODO: Spot check for structure?
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

        // TODO: Come up with a better name for RO data objects. This is confusing since _armourRO
        //       is actually a "map" of the actual RO data objects.
        this._armourRO = {
                head:  null,
                chest: null,
                arms:  null,
                waist: null,
                legs:  null,
            };

        this._talisman = {
                skills: [ // Only two skills for now
                    {skillRO: null, skillLevel: null},
                    {skillRO: null, skillLevel: null},
                ],
                decoSlots: [0,0,0],
            };

        this._petalaceRO = null;

        this._validateState();
    }

    // Usefully returns self for use in React state transitions.
    setWeapon(db, weaponObj) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.greatsword)); // Spot check for structure
        // weaponObj validity will be checked by verifying overall state

        this._weaponRO = weaponObj;
        this._validateWeaponNotNull();
        this._weaponRampSkillSelections = this._initWeaponRampSkillSelections();

        this._validateState();
        return this;
    }

    // Usefully returns self for use in React state transitions.
    setArmourPiece(db, armourPieceObj) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.greatsword)); // Spot check for structure
        // armourPieceObj validity will be checked by verifying overall state

        // TODO: We don't handle null yet.
        if (armourPieceObj === null) console.log("Not yet implemented armour removal.");

        this._validateWeaponNotNull();
        this._armourRO[armourPieceObj.slotID] = armourPieceObj;

        this._validateState();
        return this;
    }

    // Usefully returns self for use in React state transitions.
    setTalismanSkill(db, skillIndex, skillRO, skillLevel) {
        assert(isObj(db));
        assert(isInt(skillIndex) && (skillIndex >= 0) && (skillIndex <= 1));
        if (skillRO === null) {
            //assert(isIntOrNull(skillLevel)); // Basically allowed to be anything
        } else {
            assert(isObj(skillRO));
            assert(isInt(skillRO.maxLevels)); // Spot check for structure
            assert(isInt(skillLevel) && (skillLevel > 0) && (skillLevel <= 10)); // Unlikely to be a huge number
        }

        if (skillRO === null) {
            this._talisman.skills[skillIndex].skillRO = null;
            this._talisman.skills[skillIndex].skillLevel = null;
        } else {
            this._talisman.skills[skillIndex].skillRO = skillRO;
            this._talisman.skills[skillIndex].skillLevel = skillLevel;
        }

        this._validateState();
        return this;
    }
    // Usefully returns self for use in React state transitions.
    setTalismanDecoSlot(db, decoSlotIndex, decoSlotSize) {
        assert(isObj(db));
        assert(isInt(decoSlotIndex) && (decoSlotIndex >= 0) && (decoSlotIndex <= 2));
        assert(isInt(decoSlotSize) && (decoSlotSize >= 0) && (decoSlotSize <= 3));

        this._talisman.decoSlots[decoSlotIndex] = decoSlotSize

        this._validateState();
        return this;
    }

    // Usefully returns self for use in React state transitions.
    setPetalace(db, petalaceObj) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.greatsword)); // Spot check for structure
        // petalaceObj validity will be checked by verifying overall state

        this._validateWeaponNotNull();
        this._petalaceRO = petalaceObj;

        this._validateState();
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

        this._validateState();
        return this;
    }

    // THIS WILL ONLY SUCCEED IF this._weaponRO IS NOT NULL
    getWeaponObjRO() {
        this._validateWeaponNotNull();
        return this._weaponRO;
    }

    // THIS WILL ONLY SUCCEED IF this._weaponRO IS NOT NULL
    getArmourObjsRO() {
        this._validateWeaponNotNull();
        return this._armourRO;
    }

    // THIS WILL ONLY SUCCEED IF this._weaponRO IS NOT NULL
    getTalismanSkills() {
        this._validateWeaponNotNull();
        return this._talisman.skills;
    }
    // THIS WILL ONLY SUCCEED IF this._weaponRO IS NOT NULL
    getTalismanDecoSlots() {
        this._validateWeaponNotNull();
        //return this._talisman.decoSlots.filter((slotSize) => {return slotSize != 0});
        return this._talisman.decoSlots;
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

        const calculatedTotalSkills = this._getCurrentSkills();
        const calculatedTotalSkillsRenderingProps = [];
        for (const [skillLongID, [skillRO, skillLevel]] of calculatedTotalSkills.entries()) {
            calculatedTotalSkillsRenderingProps.push({
                    name: skillRO.name,
                    level: (skillLevel > skillRO.maxLevels) ? skillRO.maxLevels : skillLevel,
                    maxLevel: skillRO.maxLevels,
                });
        }
        calculatedTotalSkillsRenderingProps.sort((a, b) => {
            if (a.level == b.level) {
                return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1;
            } else {
                return (a.level < b.level) ? 1 : -1;
            }
        });

        const makeArmourRenderingProps = (slotID) => {
                const armourPieceRO = this._armourRO[slotID];
                if (armourPieceRO === null) {
                    return null;
                }

                const skillNamesArray = [];
                for (const [skillRO, skillLevel] of armourPieceRO.skills) {
                    skillNamesArray.push([skillRO.name, skillLevel]);
                }
                
                //// TODO
                //const decos = [];
                //for (const slotSize of armourPieceRO.decorationSlots) {

                //}

                return {
                    name: armourPieceRO.name,
                    skills: skillNamesArray,
                    decosArray: [[2, "Charger Jewel 2"],
                                 [1, "~~NOTREAL~~"    ],
                                 [1, null             ]], // Placeholder for now

                    defense:    armourPieceRO.defenseAtLevel1, // Placeholder for now

                    fireRes:    armourPieceRO.fireRes,
                    waterRes:   armourPieceRO.waterRes,
                    thunderRes: armourPieceRO.thunderRes,
                    iceRes:     armourPieceRO.iceRes,
                    dragonRes:  armourPieceRO.dragonRes,
                };
            };

        const decoSkillNamesArray = [];
        for (const obj of this._talisman.skills) {
            if (obj.skillRO !== null) {
                decoSkillNamesArray.push([obj.skillRO.name, obj.skillLevel]);
            }
        }
        const renderNoneTalisman = (
                (this._talisman.skills[0].skillRO === null)
                && (this._talisman.skills[1].skillRO === null)
                && (this._talisman.decoSlots[0] === 0)
                && (this._talisman.decoSlots[1] === 0)
                && (this._talisman.decoSlots[2] === 0)
            );

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
                armourRO: {
                        head:  makeArmourRenderingProps("head"),
                        chest: makeArmourRenderingProps("chest"),
                        arms:  makeArmourRenderingProps("arms"),
                        waist: makeArmourRenderingProps("waist"),
                        legs:  makeArmourRenderingProps("legs"),
                    },
                talismanRO: {
                        name: (renderNoneTalisman) ? "None" : "Talisman",
                        skills: decoSkillNamesArray,
                        decosArray: (renderNoneTalisman) ? [] : [[2, "Charger Jewel 2"],
                                                                 [1, "~~NOTREAL~~"]],
                    },
                petalaceRO: {
                        originalPetalaceObj: this._petalaceRO, // I'm lazy
                    },
                calculatedSkills: calculatedTotalSkillsRenderingProps,
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

    _getCurrentSkills() {
        const ret = new Map(); // Map of arrays: {skill long ID : [skill object, skill level]}
        // First add armour skills
        for (const [slotID, armourPieceRO] of Object.entries(this._armourRO)) {
            if (armourPieceRO == null) continue;
            for (const [skillRO, skillLevel] of armourPieceRO.skills) {
                if (ret.has(skillRO.id)) {
                    ret.get(skillRO.id)[1] += skillLevel;
                } else {
                    ret.set(skillRO.id, [skillRO, skillLevel]);
                }
            }
        }
        // Then now we add talisman skills
        for (const obj of this._talisman.skills) {
            const skillRO = obj.skillRO;
            const skillLevel = obj.skillLevel;
            if (skillRO !== null) {
                if (ret.has(skillRO.id)) {
                    ret.get(skillRO.id)[1] += skillLevel;
                } else {
                    ret.set(skillRO.id, [skillRO, skillLevel]);
                }
            }
        }
        return ret;
    }

}

export {
    Build,
};

