/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

export type Tier = "lr" | "hr";
export type Rarity = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type DecorationSlotSize = 1 | 2 | 3;

export type RawTypeStr = "severing" | "blunt";

export type ElementStr = "fire" | "water" | "thunder" | "ice" | "dragon";
export type StatStr = "poison" | "paralysis" | "sleep" | "blast";
export type EleStatStr = ElementStr | StatStr;

export type EndlineTag = "" | "hr";

/*** Armour Skills ***/

export type SkillIcon = "blue"
                      | "brown"
                      | "darkblue"
                      | "gold"
                      | "green"
                      | "grey"
                      | "lightblue"
                      | "orange"
                      | "pink"
                      | "purple"
                      | "red"
                      | "white"
                      | "yellow";

export type SkillIconImgID = `skill_icon_${SkillIcon}`;

export interface Skill {
    id:        string;
    shortId:   number;
    name:      string;
    maxLevels: number;

    iconImgID: SkillIconImgID;
    filterHelpers: Readonly<{
        nameLower: string;
    }>;
}
export type SkillRO = Readonly<Skill>;

// Common to represent levels of skills as an array of 2-tuples like this.
export type SkillLevels = Readonly<[SkillRO, number]>[];

/*** Rampage Skills ***/

export interface RampageSkill {
    id:      string;
    shortId: string;
    name:    string;
}
export type RampageSkillRO = Readonly<RampageSkill>;

/*** Weapon Special Selections ***/

export type WeaponSpecialSelectionType = "lightbowgunmod" | "heavybowgunmod";

export interface WeaponSpecialSelection {
    id:   number;
    name: string;
    type: WeaponSpecialSelectionType;
}
export type WeaponSpecialSelectionRO = Readonly<WeaponSpecialSelection>;

/*** Weapon Mechanics: Gunlance ***/

export interface GLShellingType {
    id:   string;
    name: string;
}
export type GLShellingTypeRO = Readonly<GLShellingType>;

/*** Weapon Mechanics: Hunting Horn ***/

export interface HHSong {
    id:   string;
    name: string;
}
export type HHSongRO = Readonly<HHSong>;

/*** Weapon Mechanics: Switchaxe ***/

export interface SAPhialType {
    id:   string;
    name: string;
}
export type SAPhialTypeRO = Readonly<SAPhialType>;

/*** Weapon Mechanics: Charge Blade ***/

export interface CBPhialType {
    id:   string;
    name: string;
}
export type CBPhialTypeRO = Readonly<CBPhialType>;

/*** Weapon Mechanics: Insect Glaive ***/

export interface IGKinsectType {
    id:   string;
    name: string;
}
export type IGKinsectTypeRO = Readonly<IGKinsectType>;

export interface IGKinsectBonus {
    id:   string;
    name: string;
}
export type IGKinsectBonusRO = Readonly<IGKinsectBonus>;

export interface IGKinsect {
    id:     number;
    name:   string;
    rarity: Rarity;

    attackType:   RawTypeStr;
    kinsectType:  IGKinsectTypeRO;
    kinsectBonus: IGKinsectBonusRO;
}
export type IGKinsectRO = Readonly<IGKinsect>;

/*** Weapon Mechanics: Bow ***/

export interface BowArcShotType {
    id:   string;
    name: string;
}
export type BowArcShotTypeRO = Readonly<BowArcShotType>;

export interface BowChargeShotType {
    id:   string;
    name: string;
}
export type BowChargeShotTypeRO = Readonly<BowChargeShotType>;

/*** Weapon Mechanics: Light Bowgun and Heavy Bowgun ***/

export interface BowgunAmmoType {
    id:        string;
    name:      string;
    shortName: string;
}
export type BowgunAmmoTypeRO = Readonly<BowgunAmmoType>;

/*** Armour ***/

export type ArmourSlot = "head" | "chest" | "arms" | "waist" | "legs";

// NOT YET USED
//
//export interface ArmourPiece {
//    // These two IDs uniquely identify each individual armour set.
//    setID:  number;
//    slotID: ArmourSlot;
//
//    setName: string;
//    name:    string;
//    rarity:  Rarity;
//    tierID:  Tier;
//    decorationSlots: Readonly<DecorationSlotSize[]>;
//    skills:  Readonly<SkillLevels>;
//    
//    defenseAtLevel1: number;
//
//    fireRes:    number;
//    waterRes:   number;
//    thunderRes: number;
//    iceRes:     number;
//    dragonRes:  number;
//
//    filterHelpers: Readonly<{
//        nameLower:    string;
//        setNameLower: string;
//        hintStrLower: string;
//    }>;
//}
//export type ArmourPieceRO = Readonly<ArmourPiece>;

/*** Petalace ***/

export interface Petalace {
    id:   string;
    name: string;

    endlineTag:  EndlineTag;
    rarity:      Rarity;

    healthUp:    number;
    healthGain:  number;
    staminaUp:   number;
    staminaGain: number;
    attackUp:    number;
    attackGain:  number;
    defenseUp:   number;
    defenseGain: number;

    iconImgPath: string;
    filterHelpers: Readonly<{
        nameLower: string;
    }>;
}
export type PetalaceRO = Readonly<Petalace>;

/*** Decorations ***/

export type DecorationIconType = "blue"
                               | "brown"
                               | "darkblue"
                               | "gold"
                               | "green"
                               | "grey"
                               | "lightblue"
                               | "orange"
                               | "pink"
                               | "purple"
                               | "red"
                               | "white"
                               | "yellow";

export interface Decoration {
    id:   number;
    name: string;

    slotSize: DecorationSlotSize;
    rarity:   Exclude<Rarity, 1 | 2 | 3>; // Decorations aren't observed to have rarities 1-3
    skills:   Readonly<SkillLevels>;

    icon: DecorationIconType;
    filterHelpers: Readonly<{
        nameLower: string;
    }>;
}
export type DecorationRO = Readonly<Decoration>;

