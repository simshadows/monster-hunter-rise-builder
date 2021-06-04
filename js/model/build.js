/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isObj,
    isInt,
    isNonEmptyStr,
    isStrOrNull,
    isArr,
    isMap,
} from "../check.js";
import {
    isDecoEquippableSlotStr,
    isWeaponCategoryStr,
    isEleStatStr,
    isArmourSlotStr,
    toNameFilterString,
} from "../common.js";

const assert = console.assert;

class Build {

    _validateState() {
        assert(isObj(this._weaponRO)); // Weapon cannot be null!!!
        assert(isInt(this._weaponRO.affinity)); // Spot check for structure

        for (const [slotID, armourPieceRO] of Object.entries(this._armourRO)) {
            if (armourPieceRO != null) { // armourPieceRO allowed to be null
                assert(isInt(armourPieceRO.dragonRes)); // Spot check for structure
            }
        }

        if (this._petalaceRO !== null) {
            assert(isObj(this._petalaceRO));
            // TODO: Spot check for structure?
        }

        if (this._weaponRO !== null) {
            this._validateDecorations();
        }
    }

    _validateDecorations() {
        const getArmourDecoSlots = (slotID) => {
                const armourPieceRO = this._armourRO[slotID];
                return (armourPieceRO === null) ? [] : armourPieceRO.decorationSlots;
            };

        const allDecoSlots = {
                weapon:   this._weaponRO.decoSlots,
                head:     getArmourDecoSlots("head"),
                chest:    getArmourDecoSlots("chest"),
                arms:     getArmourDecoSlots("arms"),
                waist:    getArmourDecoSlots("waist"),
                legs:     getArmourDecoSlots("legs"),
                talisman: this._getAdjustedTalismanDecoSlots(),
            }

        for (const [slotID, decoSlots] of Object.entries(allDecoSlots)) {
            const equippedDecos = this._decorationsRO[slotID];
            assert(isArr(equippedDecos));
            assert(equippedDecos.length == decoSlots.length);
            for (const [i, obj] of equippedDecos.entries()) {
                assert(isObj(obj));
                assert(decoSlots[i] === obj.slotSize);
                if (obj.decoRO !== null) {
                    assert(obj.decoRO.slotSize <= obj.slotSize);
                }
            }
        }
    }

    _initWeaponRampSkillSelections() {
        const numSlots = this._weaponRO.rampSkills.length;
        return new Array(numSlots).fill(null); // Array of nulls
    }

    constructor(db, weaponRO) {
        // Equipment Selections
        this._weaponRO = null;
        this._weaponRampSkillSelections = null;

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

        // TODO: Come up with a better name for RO data objects. This is confusing since _decorationsRO
        //       is actually a "map" of arrays of the actual RO data objects.
        this._decorationsRO = {
                // The structure of all of these arrays is:
                // [{slotSize: some integer, decoRO: some deco object from the database}, ...]
                weapon:   this._generateEmptyDecoObj([]),
                head:     this._generateEmptyDecoObj([]),
                chest:    this._generateEmptyDecoObj([]),
                arms:     this._generateEmptyDecoObj([]),
                waist:    this._generateEmptyDecoObj([]),
                legs:     this._generateEmptyDecoObj([]),
                talisman: this._generateEmptyDecoObj([]),
            };

        this._setWeaponNoCheck(db, weaponRO);
        this._validateState();
    }

    // Usefully returns self for use in React state transitions.
    _setWeaponNoCheck(db, weaponObj) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure
        // weaponObj validity will be checked by verifying overall state

        this._weaponRO = weaponObj;
        this._weaponRampSkillSelections = this._initWeaponRampSkillSelections();
        this._decorationsRO.weapon = this._generateEmptyDecoObj(weaponObj.decoSlots);
    }
    setWeapon(...args) {
        this._setWeaponNoCheck(...args);
        this._validateState();
        return this;
    }
    // Usefully returns self for use in React state transitions.
    setRampageSkill(db, position, rampageSkillID) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure
        assert(isInt(position));
        assert(isStrOrNull(rampageSkillID));

        assert((position >= 0) && (position < this._weaponRampSkillSelections.length));
        // TODO: Verify if the rampage skill ID is valid?

        assert(db.readonly.weaponRampSkills.map.has(rampageSkillID));
        this._weaponRampSkillSelections[position] = db.readonly.weaponRampSkills.map.get(rampageSkillID);

        this._validateState();
        return this;
    }

    // Usefully returns self for use in React state transitions.
    setArmourPiece(db, slotID, armourPieceObj) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure
        assert(isArmourSlotStr(slotID));
        // armourPieceObj validity will be checked by verifying overall state
        if (armourPieceObj !== null) {
            assert(slotID === armourPieceObj.slotID);
        }

        this._armourRO[slotID] = armourPieceObj;
        if (armourPieceObj === null) {
            this._decorationsRO[slotID] = this._generateEmptyDecoObj([]);
        } else {
            this._decorationsRO[slotID] = this._generateEmptyDecoObj(armourPieceObj.decorationSlots);
        }

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
        this._decorationsRO.talisman = this._generateEmptyDecoObj(this._getAdjustedTalismanDecoSlots());

        this._validateState();
        return this;
    }

    resetTalisman() {
        this._talisman.decoSlots = [0,0,0];
        this._talisman.skills = [
                {skillRO: null, skillLevel: null}, // TODO: Reset this more cleanly than rewriting the whole data structure
                {skillRO: null, skillLevel: null},
            ];
        this._decorationsRO.talisman = this._generateEmptyDecoObj([]);

        this._validateState();
        return this;
    }

    // Usefully returns self for use in React state transitions.
    setPetalace(db, petalaceObj) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure
        // petalaceObj validity will be checked by verifying overall state

        this._petalaceRO = petalaceObj;

        this._validateState();
        return this;
    }

    // Usefully returns self for use in React state transitions.
    setDecoration(db, decoRO, slotID, position) {
        if (decoRO === null) {
            check.isObj(decoRO);
            check.isInt(decoRO.slotSize); // Spot check for structure
        }
        isNonEmptyStr(slotID);
        assert(isDecoEquippableSlotStr(slotID));
        isInt(position);
        assert((position >= 0) && (position <= 2));

        this._decorationsRO[slotID][position].decoRO = decoRO;
        // TODO: We don't actually need the database here... get rid of the parameter?

        this._validateState();
        return this;
    }

    getWeaponObjRO() {
        return this._weaponRO;
    }
    getRampSkill(rampSkillIndex) {
        assert(isInt(rampSkillIndex));
        const rampSkillRO = this._weaponRampSkillSelections[rampSkillIndex];
        if ((rampSkillRO === undefined) || (rampSkillRO === null)) {
            return null;
        } else {
            assert(isObj(rampSkillRO));
            return rampSkillRO;
        }
    }
    getRampSkills(db) {
        return this._getRampSkillSelectionsArray(db).filter((element) => {return (element !== null)});
    }

    getArmourROs() {
        return this._armourRO;
    }

    getTalismanSkills() {
        return this._talisman.skills;
    }
    getTalismanDecoSlots() {
        //return this._talisman.decoSlots.filter((slotSize) => {return slotSize != 0});
        return this._talisman.decoSlots;
    }

    getPetalaceObjRO() {
        return this._petalaceRO;
    }

    getDecoSlotSize(slotID, position) {
        const arr = this._decorationsRO[slotID];
        if (arr === undefined) return 0;

        const obj = arr[position];
        if (obj === undefined) return 0;

        assert(isInt(obj.slotSize) && (obj.slotSize > 0) && (obj.slotSize <= 3));
        return obj.slotSize;
    }
    getDeco(slotID, position) {
        const arr = this._decorationsRO[slotID];
        if (arr === undefined) return null;

        const obj = arr[position];
        if (obj === undefined) return null;

        if (obj.decoRO !== null) {
            assert(isInt(obj.decoRO.slotSize)); // Spot check for structure
        }
        return obj.decoRO;
    }

    _getAllDecosAsFlatArray() {
        const ret = [];
        for (const [slotID, subArray] of Object.entries(this._decorationsRO)) {
            for (const obj of subArray) {
                if (obj.decoRO !== null) {
                    ret.push(obj.decoRO);
                }
            }
        }
        return ret;
    }

    getCurrentSkills() {
        const ret = new Map(); // Map of arrays: {skill long ID : [skill object, skill level]}
        // First add armour skills
        for (const [slotID, armourPieceRO] of Object.entries(this._armourRO)) {
            if (armourPieceRO === null) continue;
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
        // And finally, we add decoration skills
        for (const decoRO of this._getAllDecosAsFlatArray()) {
            for (const [skillRO, skillLevel] of decoRO.skills) {
                if (ret.has(skillRO.id)) {
                    ret.get(skillRO.id)[1] += skillLevel;
                } else {
                    ret.set(skillRO.id, [skillRO, skillLevel]);
                }
            }
        }
        return ret;
    }

    getRenderingProps(db) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure

        // TODO: This is called again for calculating the build. Maybe avoid that?
        const calculatedTotalSkills = this.getCurrentSkills();

        const calculatedTotalSkillsRenderingProps = [];
        for (const [skillLongID, [skillRO, skillLevel]] of calculatedTotalSkills.entries()) {
            calculatedTotalSkillsRenderingProps.push({
                    name: skillRO.name,
                    level: (skillLevel > skillRO.maxLevels) ? skillRO.maxLevels : skillLevel,
                    maxLevel: skillRO.maxLevels,

                    iconImgPath: skillRO.iconImgPath,
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
                    decosArray: this._getDecoArrayRenderingProp(slotID),

                    defense:    armourPieceRO.defenseAtLevel1, // Placeholder for now

                    fireRes:    armourPieceRO.fireRes,
                    waterRes:   armourPieceRO.waterRes,
                    thunderRes: armourPieceRO.thunderRes,
                    iceRes:     armourPieceRO.iceRes,
                    dragonRes:  armourPieceRO.dragonRes,

                    iconImgPath: armourPieceRO.iconImgPath,
                };
            };

        const talismanSkillNamesArray = [];
        for (const obj of this._talisman.skills) {
            if (obj.skillRO !== null) {
                talismanSkillNamesArray.push([obj.skillRO.name, obj.skillLevel]);
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
                        decosArray:               this._getDecoArrayRenderingProp("weapon"),

                        iconImgPath: this._weaponRO.iconImgPath,
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
                        skills: talismanSkillNamesArray,
                        decosArray: this._getDecoArrayRenderingProp("talisman"),
                    },
                petalaceRO: {
                        originalPetalaceObj: this._petalaceRO, // I'm lazy
                    },
                calculatedSkills: calculatedTotalSkillsRenderingProps,
            };
    }

    _getDecoArrayRenderingProp(slotID) {
        assert(isDecoEquippableSlotStr(slotID));
        const ret = [];
        for (const obj of this._decorationsRO[slotID]) {
            ret.push({
                slotSize: obj.slotSize,
                deco: (obj.decoRO === null) ? null : {
                    name: obj.decoRO.name,
                    slotSize: obj.decoRO.slotSize,
                },
            });
        }
        return ret;
    }

    _getAdjustedTalismanDecoSlots() {
        const ret = this._talisman.decoSlots.filter((_slotSize) => {return (_slotSize !== 0)});
        ret.sort((a, b) => {return (a < b) ? 1 : -1;});
        return ret;
    }

    _getRampSkillSelectionsArray(db) {
        assert(isObj(db));
        assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure

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

    // Logically static
    _generateEmptyDecoObj(decoSlotsArray) {
        assert(isArr(decoSlotsArray));
        const ret = [];
        for (const slotSize of decoSlotsArray) {
            ret.push({slotSize: slotSize, decoRO: null});
        }
        return ret;
    }

}

export {Build};

