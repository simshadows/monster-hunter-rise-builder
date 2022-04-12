/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type ArmourSlot,
    type DecoEquippableSlot,
    type DecorationSlotSize,
    type DecoSlotsArray,
    isDecoSlotsArray,
    type Weapon,
    type ArmourPiece,
    type Petalace,
    type Skill,
    type RampageSkill,
    type WeaponSpecialSelection,
    type Decoration,
} from "../common/types";

import {
    type MHRDatabase,
} from "../database";

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

interface ArmourEquips {
    head:  ArmourPiece | null;
    chest: ArmourPiece | null;
    arms:  ArmourPiece | null;
    waist: ArmourPiece | null;
    legs:  ArmourPiece | null;
};

interface DecoRenderingProp {
    slotSize: DecorationSlotSize;
    deco: null | {
        name:     string;
        slotSize: DecorationSlotSize;
        icon:     string;
    };
};

class Build {
    private _weaponRO: Weapon; // Cannot be null!
    private _weaponRampSkillSelections: (null | RampageSkill)[];

    private _weaponSpecialSelectionOptions: WeaponSpecialSelection[];
    private _weaponSpecialSelectionRO: null | WeaponSpecialSelection;

    private _armourRO: ArmourEquips;

    private _talisman: {
        // Only two skills for now
        skills: [TalismanSkill, TalismanSkill];
        decoSlots: TalismanDecoSlotsArray;
    };

    private _petalaceRO: null | Petalace;

    private _decorationsRO: {
        [K in DecoEquippableSlot]: DecoSetting[];
    };

    _validateState(): void {
        console.assert((this._weaponSpecialSelectionRO === null)
                       || this._weaponSpecialSelectionOptions.includes(this._weaponSpecialSelectionRO));
        this._validateDecorations();
    }
    _validateDecorations(): void {
        const getArmourDecoSlots = (slotID: ArmourSlot): Readonly<DecoSlotsArray> => {
            const armourPieceRO = this._armourRO[slotID];
            return (armourPieceRO === null) ? [] : armourPieceRO.decorationSlots;
        };

        const allDecoSlots: Map<DecoEquippableSlot, Readonly<DecoSlotsArray>> = new Map([
            ["weapon"  , this._weaponRO.decoSlots            ],
            ["head"    , getArmourDecoSlots("head")          ],
            ["chest"   , getArmourDecoSlots("chest")         ],
            ["arms"    , getArmourDecoSlots("arms")          ],
            ["waist"   , getArmourDecoSlots("waist")         ],
            ["legs"    , getArmourDecoSlots("legs")          ],
            ["talisman", this._getAdjustedTalismanDecoSlots()],
        ]);

        for (const [slotID, decoSlots] of allDecoSlots.entries()) {
            const equippedDecos = this._decorationsRO[slotID];
            console.assert(equippedDecos.length === decoSlots.length);
            for (const [i, obj] of equippedDecos.entries()) {
                console.assert(decoSlots[i] === obj.slotSize);
                console.assert((obj.decoRO === null) || (obj.decoRO.slotSize <= obj.slotSize));
            }
        }
    }

    _initWeaponRampSkillSelections(): (null | RampageSkill)[] {
        const numSlots = this._weaponRO.rampSkills.length;
        return new Array(numSlots).fill(null); // Array of nulls
    }

    constructor(db: {"readonly": MHRDatabase}, weapon: Weapon) {
        // Equipment Selections
        this._weaponRO = weapon; // Dummy value, will be replaced later
        this._weaponRampSkillSelections = []; // Dummy value, will be replaced later

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

        this._setWeaponNoCheck(db, weapon);
        this._validateState();
    }

    _setWeaponNoCheck(db: {"readonly": MHRDatabase}, weapon: Weapon): void {
        // weapon validity will be checked by verifying overall state
        this._weaponRO = weapon;
        this._weaponRampSkillSelections = this._initWeaponRampSkillSelections();

        this._weaponSpecialSelectionOptions = (()=>{
            const arr = db.readonly.weaponSpecialSelections.array;
            if (weapon.category === "lightbowgun") {
                return arr.filter((x) => (x.type === "lightbowgunmod"));
            } else if (weapon.category === "heavybowgun") {
                return arr.filter((x) => (x.type === "heavybowgunmod"));
            } else {
                return [];
            }
        })();
        this._weaponSpecialSelectionRO = null;

        this._decorationsRO.weapon = this._generateEmptyDecoObj(weapon.decoSlots);
    }
    setWeapon(db: {"readonly": MHRDatabase}, weapon: Weapon): Build {
        this._setWeaponNoCheck(db, weapon);
        this._validateState();
        return this;
    }

    setRampageSkill(
        db:             {"readonly": MHRDatabase},
        position:       RampSkillPosition,
        rampageSkillID: null | string,
    ): Build {
        console.assert(position % 1 === 0);
        console.assert((position >= 0) && (position < this._weaponRampSkillSelections.length));

        if (rampageSkillID === null) {
            this._weaponRampSkillSelections[position] = null;
        } else {
            const result = db.readonly.weaponRampSkills.longIdsMap.get(rampageSkillID);
            if (result === undefined) throw "Expected a result.";
            this._weaponRampSkillSelections[position] = result;
        }

        this._validateState();
        return this;
    }
    setWeaponSpecialSelection(db: {"readonly": MHRDatabase}, specialSelectionID: null | number): Build {
        console.assert((specialSelectionID === null) || (specialSelectionID % 1 === 0));

        if (specialSelectionID === null) {
            this._weaponSpecialSelectionRO = null;
        } else {
            const result = db.readonly.weaponSpecialSelections.map.get(specialSelectionID);
            if (result === undefined) throw "Expected a result.";
            this._weaponSpecialSelectionRO = result;
        }

        this._validateState();
        return this;
    }

    setArmourPiece(db: {"readonly": MHRDatabase}, slotID: ArmourSlot, armourPiece: null | ArmourPiece): Build {
        db; // TODO: Remove the db parameter?

        // armourPiece validity will be checked by verifying overall state
        console.assert((armourPiece === null) || (slotID === armourPiece.slotID));

        const decoSlots: Readonly<DecoSlotsArray> = (armourPiece === null) ? [] : armourPiece.decorationSlots;
        this._armourRO[slotID] = armourPiece;
        this._decorationsRO[slotID] = this._generateEmptyDecoObj(decoSlots);

        this._validateState();
        return this;
    }

    setTalismanSkill(
        db:         {"readonly": MHRDatabase},
        skillIndex: TalismanSkillIndex,
        skill:      Skill,
        skillLevel: number,
    ): Build {
        db; // TODO: Remove the db parameter?
        console.assert(skillLevel % 1 === 0);
        console.assert((skillLevel > 0) && (skillLevel <= 10)); // Unlikely to be huge. TODO: Is it always > 0?
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

    setTalismanDecoSlot(
        db:            {"readonly": MHRDatabase},
        decoSlotIndex: DecoSlotIndex,
        decoSlotSize:  0 | DecorationSlotSize,
    ): Build {
        db; // TODO: Remove the db parameter?
        this._talisman.decoSlots[decoSlotIndex] = decoSlotSize
        this._decorationsRO.talisman = this._generateEmptyDecoObj(this._getAdjustedTalismanDecoSlots());

        this._validateState();
        return this;
    }

    resetTalisman(): Build {
        this._talisman.decoSlots = [0,0,0];
        this._talisman.skills = [
                {skillRO: null, skillLevel: null}, // TODO: Reset this more cleanly than rewriting the whole data structure
                {skillRO: null, skillLevel: null},
            ];
        this._decorationsRO.talisman = this._generateEmptyDecoObj([]);

        this._validateState();
        return this;
    }

    setPetalace(db: {"readonly": MHRDatabase}, petalace: null | Petalace): Build {
        db; // TODO: Remove the db parameter?
        this._petalaceRO = petalace;

        this._validateState();
        return this;
    }

    setDecoration(
        db:       {"readonly": MHRDatabase},
        deco:     null | Decoration,
        slotID:   DecoEquippableSlot,
        position: DecoSlotIndex,
    ): Build {
        db; // TODO: We shouldn't need this. Remove the parameter?
        const decoSetting = this._decorationsRO[slotID][position];
        if (decoSetting === undefined) throw "Expected a result";
        decoSetting.decoRO = deco;

        this._validateState();
        return this;
    }

    getWeaponObjRO(): Weapon {
        return this._weaponRO;
    }
    getRampSkill(rampSkillIndex: RampSkillPosition): null | RampageSkill {
        const rampSkill = this._weaponRampSkillSelections[rampSkillIndex];
        if ((rampSkill === undefined) || (rampSkill === null)) {
            return null;
        } else {
            return rampSkill;
        }
    }
    getRampSkills(db: {"readonly": MHRDatabase}): RampageSkill[] {
        db; // TODO: Remove the db parameter?
        const ret: RampageSkill[] = [];
        for (const obj of this._getRampSkillSelectionsArray(db)) {
            if (obj !== null) ret.push(obj);
        }
        // TODO: Figure out how to use filter?
        //return this._getRampSkillSelectionsArray(db).filter(x => (x !== null));
        return ret;
    }
    getWeaponSpecialSelectionRO(): null | WeaponSpecialSelection {
        return this._weaponSpecialSelectionRO;
    }

    getArmourROs(): ArmourEquips {
        return this._armourRO;
    }

    getTalismanSkills(): [TalismanSkill, TalismanSkill] {
        return this._talisman.skills;
    }
    getTalismanDecoSlots(): TalismanDecoSlotsArray {
        //return this._talisman.decoSlots.filter((slotSize) => {return slotSize != 0});
        return this._talisman.decoSlots;
    }

    getPetalaceObjRO(): null | Petalace {
        return this._petalaceRO;
    }

    getDecoSlotSize(slotID: DecoEquippableSlot, position: DecoSlotIndex): 0 | DecorationSlotSize {
        const obj = this._decorationsRO[slotID]?.[position];
        if (obj === undefined) return 0;
        return obj.slotSize;
    }
    getDeco(slotID: DecoEquippableSlot, position: DecoSlotIndex): null | Decoration {
        const obj = this._decorationsRO[slotID]?.[position];
        if (obj === undefined) return null;
        return obj.decoRO;
    }

    _getAllDecosAsFlatArray(): Decoration[] {
        const ret: Decoration[] = [];
        for (const [_, subArray] of Object.entries(this._decorationsRO)) {
            for (const obj of subArray) {
                if (obj.decoRO !== null) {
                    ret.push(obj.decoRO);
                }
            }
        }
        return ret;
    }

    getCurrentSkills(): Map<string, [Skill, number]> {
        const ret: Map<string, [Skill, number]> = new Map(); // {skill long ID : [skill object, skill level]}
        const incLevel = (_skill: Skill, _level: number): void => {
            const result = ret.get(_skill.id);
            if (result === undefined) {
                ret.set(_skill.id, [_skill, _level]);
            } else {
                result[1] += _level;
            }
        };

        // First add armour skills
        for (const [_, armourPieceRO] of Object.entries(this._armourRO)) {
            if (armourPieceRO === null) continue;
            for (const [skillRO, skillLevel] of armourPieceRO.skills) {
                incLevel(skillRO, skillLevel);
            }
        }
        // Then now we add talisman skills
        for (const {skillRO, skillLevel} of this._talisman.skills) {
            if (skillRO !== null) {
                if (skillLevel === null) throw "Expected a value";
                incLevel(skillRO, skillLevel);
            }
        }
        // And finally, we add decoration skills
        for (const decoRO of this._getAllDecosAsFlatArray()) {
            for (const [skillRO, skillLevel] of decoRO.skills) {
                incLevel(skillRO, skillLevel);
            }
        }
        return ret;
    }

    // Return value is intentionally inferred
    getRenderingProps(db: {"readonly": MHRDatabase}) {
        // TODO: This is called again for calculating the build. Maybe avoid that?
        const calculatedTotalSkills = this.getCurrentSkills();

        const calculatedTotalSkillsRenderingProps = [];
        for (const [_, [skillRO, skillLevel]] of calculatedTotalSkills.entries()) {
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

        const makeArmourRenderingProps = (slotID: ArmourSlot) => {
                const armourPiece = this._armourRO[slotID];
                if (armourPiece === null) {
                    return null;
                }

                const skillNamesArray = [];
                for (const [skillRO, skillLevel] of armourPiece.skills) {
                    skillNamesArray.push([skillRO.name, skillLevel]);
                }
                
                //// TODO
                //const decos = [];
                //for (const slotSize of armourPiece.decorationSlots) {

                //}

                return {
                    name: armourPiece.name,
                    rarity: armourPiece.rarity,
                    skills: skillNamesArray,
                    decosArray: this._getDecoArrayRenderingProp(slotID),

                    defense:    armourPiece.defenseAtLevel1, // Placeholder for now

                    fireRes:    armourPiece.fireRes,
                    waterRes:   armourPiece.waterRes,
                    thunderRes: armourPiece.thunderRes,
                    iceRes:     armourPiece.iceRes,
                    dragonRes:  armourPiece.dragonRes,
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

    _getDecoArrayRenderingProp(slotID: DecoEquippableSlot): DecoRenderingProp[] {
        const ret: DecoRenderingProp[] = [];
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

    _getAdjustedTalismanDecoSlots(): Readonly<DecoSlotsArray> {
        const ret = this._talisman.decoSlots.filter((_slotSize) => {return (_slotSize !== 0)});
        ret.sort((a, b) => {return (a < b) ? 1 : -1;});
        if (!isDecoSlotsArray(ret)) throw "Must be a decoration slots array";
        return ret;
    }

    _getRampSkillSelectionsArray(db: {"readonly": MHRDatabase}): (null | RampageSkill)[] {
        db; // TODO: Remove the db parameter?
        const ret: (null | RampageSkill)[] = [];
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
    _generateEmptyDecoObj(decoSlotsArray: Readonly<DecoSlotsArray>): DecoSetting[] {
        const ret: DecoSetting[] = [];
        for (const slotSize of decoSlotsArray) {
            ret.push({slotSize: slotSize, decoRO: null});
        }
        return ret;
    }

}

export {Build};

