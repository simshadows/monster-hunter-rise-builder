// @ts-nocheck
// PARTLY REFACTORED
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type ArmourSlot,
    type DecoEquippableSlot,
    type DecorationSlotSize,
    type DecoSlotsArray,
    type Weapon,
    type ArmourPiece,
    type HeadPiece,
    type ChestPiece,
    type ArmsPiece,
    type WaistPiece,
    type LegsPiece,
    type Petalace,
    type Skill,
    type RampageSkill,
    type WeaponSpecialSelection,
    type Decoration,
} from "../common/types";

import {
    type MHRDatabase,
} from "../database";

import {
    isObj,
    isInt,
    isArr,
    isMap,
} from "../check";
import {
    isDecoEquippableSlotStr,
} from "../common";

type RampSkillPosition = 0 | 1 | 2 | 3 | 4 | 5; // TODO: Verify this
type TalismanSkillIndex = 0 | 1; // TODO: Verify this
type DecoSlotIndex = 0 | 1 | 2; // TODO: Verify this

type TalismanDecoSlotSize = 0 | DecorationSlotSize;
type TalismanDecoSlotsArray = [TalismanDecoSlotSize, TalismanDecoSlotSize, TalismanDecoSlotSize];
interface TalismanSkill {
    skillRO:    null | Skill;
    skillLevel: null | number;
};

interface DecoSetting {
    slotSize: DecorationSlotSize;
    decoRO:   null | Decoration;
};

const assert = console.assert;

class Build {
    private _weaponRO: Weapon; // Cannot be null!
    private _weaponRampSkillSelections: Array<null | RampageSkill>;

    private _weaponSpecialSelectionOptions: Array<WeaponSpecialSelection>;
    private _weaponSpecialSelectionRO: null | WeaponSpecialSelection;

    private _armourRO: {
        head:  null | HeadPiece;
        chest: null | ChestPiece;
        arms:  null | ArmsPiece;
        waist: null | WaistPiece;
        legs:  null | LegsPiece;
    };

    private _talisman: {
        // Only two skills for now
        skills: [TalismanSkill, TalismanSkill];
        decoSlots: TalismanDecoSlotsArray;
    };

    private _petalaceRO: null | Petalace;

    private _decorationsRO: {
        [K in keyof DecoEquippableSlot]: Array<DecoSetting>;
    };

    _validateState() {
        assert((this._weaponSpecialSelectionRO === null)
               || this._weaponSpecialSelectionOptions.includes(this._weaponSpecialSelectionRO));

        this._validateDecorations();
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

    constructor(db: MHRDatabase, weaponRO: Weapon) {
        // Equipment Selections
        this._weaponRO = null;
        this._weaponRampSkillSelections = null;

        this._weaponSpecialSelectionOptions = [];
        this._weaponSpecialSelectionRO = null; // A single object, or null. Currently only used for bowgun mods.

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
    _setWeaponNoCheck(db: MHRDatabase, weaponObj: Weapon) {
        assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure
        // weaponObj validity will be checked by verifying overall state

        this._weaponRO = weaponObj;
        this._weaponRampSkillSelections = this._initWeaponRampSkillSelections();

        this._weaponSpecialSelectionOptions = (()=>{
            const arr = db.readonly.weaponSpecialSelections.array;
            if (weaponObj.category === "lightbowgun") {
                return arr.filter((x) => (x.type === "lightbowgunmod"));
            } else if (weaponObj.category === "heavybowgun") {
                return arr.filter((x) => (x.type === "heavybowgunmod"));
            } else {
                return [];
            }
        })();
        this._weaponSpecialSelectionRO = null;

        this._decorationsRO.weapon = this._generateEmptyDecoObj(weaponObj.decoSlots);
    }
    setWeapon(db, weaponObj) {
        this._setWeaponNoCheck(db, weaponObj);
        this._validateState();
        return this;
    }
    // Usefully returns self for use in React state transitions.
    setRampageSkill(db: MHRDatabase, position: RampSkillPosition, rampageSkillID: null | string) {
        assert(position % 1 === 0);

        assert((position >= 0) && (position < this._weaponRampSkillSelections.length));

        if (rampageSkillID === null) {
            this._weaponRampSkillSelections[position] = null;
        } else {
            this._weaponRampSkillSelections[position] = db.readonly.weaponRampSkills.longIdsMap.get(rampageSkillID);
            assert(this._weaponRampSkillSelections[position] !== undefined);
        }

        this._validateState();
        return this;
    }
    setWeaponSpecialSelection(db: MHRDatabase, specialSelectionID: null | number) {
        assert(specialSelectionID % 1 === 0);

        if (specialSelectionID === null) {
            this._weaponSpecialSelectionRO = null;
        } else {
            this._weaponSpecialSelectionRO = db.readonly.weaponSpecialSelections.map.get(specialSelectionID);
            assert(this._weaponSpecialSelectionRO !== undefined);
        }

        this._validateState();
        return this;
    }

    // Usefully returns self for use in React state transitions.
    setArmourPiece(db: MHRDatabase, slotID: ArmourSlot, armourPiece: ArmourPiece) {
        // armourPiece validity will be checked by verifying overall state
        assert((armourPiece === null) || (slotID === armourPiece.slotID));

        this._armourRO[slotID] = armourPiece;
        if (armourPiece === null) {
            this._decorationsRO[slotID] = this._generateEmptyDecoObj([]);
        } else {
            this._decorationsRO[slotID] = this._generateEmptyDecoObj(armourPiece.decorationSlots);
        }

        this._validateState();
        return this;
    }

    // Usefully returns self for use in React state transitions.
    setTalismanSkill(db: MHRDatabase, skillIndex: TalismanSkillIndex, skill: Skill, skillLevel: number) {
        assert(skillLevel % 1 === 0);
        assert((skillLevel > 0) && (skillLevel <= 10)); // Unlikely to be huge. TODO: Is it always > 0?
        if (skill === null) {
            this._talisman.skills[skillIndex].skillRO = null;
            this._talisman.skills[skillIndex].skillLevel = null;
        } else {
            this._talisman.skills[skillIndex].skillRO = skill;
            this._talisman.skills[skillIndex].skillLevel = skillLevel;
        }

        this._validateState();
        return this;
    }
    // Usefully returns self for use in React state transitions.
    setTalismanDecoSlot(db: MHRDatabase, decoSlotIndex: DecoSlotIndex, decoSlotSize: 0 | DecorationSlotSize) {
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
    setPetalace(db: MHRDatabase, petalace: null | Petalace) {
        this._petalaceRO = petalace;

        this._validateState();
        return this;
    }

    // Usefully returns self for use in React state transitions.
    setDecoration(db: MHRDatabase, deco: null | Decoration, slotID: DecoEquippableSlot, position: DecoSlotIndex) {
        db; // TODO: We shouldn't need this. Remove the parameter?
        this._decorationsRO[slotID][position].decoRO = deco;

        this._validateState();
        return this;
    }

    getWeaponObjRO() {
        return this._weaponRO;
    }
    getRampSkill(rampSkillIndex: RampSkillPosition) {
        const rampSkillRO = this._weaponRampSkillSelections[rampSkillIndex];
        if ((rampSkillRO === undefined) || (rampSkillRO === null)) {
            return null;
        } else {
            assert(isObj(rampSkillRO));
            return rampSkillRO;
        }
    }
    getRampSkills(db: MHRDatabase) {
        db; // TODO: Remove the db parameter?
        return this._getRampSkillSelectionsArray(db).filter((element) => {return (element !== null)});
    }
    getWeaponSpecialSelectionRO() {
        return this._weaponSpecialSelectionRO;
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

    getDecoSlotSize(slotID: DecorationSlotSize, position: DecoSlotIndex) {
        const arr = this._decorationsRO[slotID];
        if (arr === undefined) return 0;

        const obj = arr[position];
        if (obj === undefined) return 0;

        assert(isInt(obj.slotSize) && (obj.slotSize > 0) && (obj.slotSize <= 3));
        return obj.slotSize;
    }
    getDeco(slotID: DecorationSlotSize, position: DecoSlotIndex) {
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

    getRenderingProps(db: DecorationSlotSize) {
        // TODO: This is called again for calculating the build. Maybe avoid that?
        const calculatedTotalSkills = this.getCurrentSkills();

        const calculatedTotalSkillsRenderingProps = [];
        for (const [skillLongID, [skillRO, skillLevel]] of calculatedTotalSkills.entries()) {
            calculatedTotalSkillsRenderingProps.push({
                    name: skillRO.name,
                    level: (skillLevel > skillRO.maxLevels) ? skillRO.maxLevels : skillLevel,
                    maxLevel: skillRO.maxLevels,
                    isOverlevelled: (skillLevel > skillRO.maxLevels),

                    iconImgID: skillRO.iconImgID,
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
                    rarity: armourPieceRO.rarity,
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
                        rampSkillSelectionsArray: this._getRampSkillSelectionsArray(db),
                        rampSkillOptionsArray:    this._weaponRO.rampSkills,
                        decosArray:               this._getDecoArrayRenderingProp("weapon"),

                        specialSelection:             this._weaponSpecialSelectionRO,
                        specialSelectionOptionsArray: this._weaponSpecialSelectionOptions,

                        category: this._weaponRO.category,
                        rarity: this._weaponRO.rarity,
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

    _getDecoArrayRenderingProp(slotID: DecoEquippableSlot) {
        assert(isDecoEquippableSlotStr(slotID));
        const ret = [];
        for (const obj of this._decorationsRO[slotID]) {
            ret.push({
                slotSize: obj.slotSize,
                deco: (obj.decoRO === null) ? null : {
                    name: obj.decoRO.name,
                    slotSize: obj.decoRO.slotSize,
                    icon: obj.decoRO.icon,
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

    _getRampSkillSelectionsArray(db: DecorationSlotSize) {
        db; // TODO: Remove the db parameter?
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
    _generateEmptyDecoObj(decoSlotsArray: DecoSlotsArray) {
        assert(isArr(decoSlotsArray));
        const ret = [];
        for (const slotSize of decoSlotsArray) {
            ret.push({slotSize: slotSize, decoRO: null});
        }
        return ret;
    }

}

export {Build};

