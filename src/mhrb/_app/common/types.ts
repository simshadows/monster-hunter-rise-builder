/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * TODO: Consider splitting this file.
 */

import {
    FrozenMap,
} from "../generic/frozen-containers";

export type Tier = "lr" | "hr";
export type Rarity = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type RawTypeStr = "severing" | "blunt";

export type ElementStr = "fire" | "water" | "thunder" | "ice" | "dragon";
export type StatStr = "poison" | "paralysis" | "sleep" | "blast";
export type EleStatStr = ElementStr | StatStr;

export function isElementStr(s: string): s is ElementStr { // DANGER: Returns type predicate.
    // TODO: Make this faster?
    return ["fire", "water", "thunder", "ice", "dragon"].includes(s);
}

export type EndlineTag = "" | "hr";

export type ArmourSlot = "head" | "chest" | "arms" | "waist" | "legs";
export type DecoEquippableSlot = ArmourSlot | "weapon" | "talisman";

export type MeleeWeaponCategory = "greatsword"
                                  | "longsword"
                                  | "swordandshield"
                                  | "dualblades"
                                  | "lance"
                                  | "gunlance"
                                  | "hammer"
                                  | "huntinghorn"
                                  | "switchaxe"
                                  | "chargeblade"
                                  | "insectglaive";
export type BowgunCategory = "lightbowgun" | "heavybowgun";
export type WeaponCategory = MeleeWeaponCategory
                             | BowgunCategory
                             | "bow";

export function isMeleeCategory(s: WeaponCategory): s is MeleeWeaponCategory { // DANGER: Returns type predicate.
    return (s !== "lightbowgun") && (s !== "heavybowgun") && (s !== "bow");
}
export function isBowgunCategory(s: WeaponCategory): s is BowgunCategory { // DANGER: Returns type predicate.
    return (s === "lightbowgun") || (s === "heavybowgun");
}

/*** Utility Types ***/

export type SharpnessMutable = [
    number, // red
    number, // orange
    number, // yellow
    number, // green
    number, // blue
    number, // white
]
export type Sharpness = Readonly<SharpnessMutable>;

export type EleStatMapMutable = Map<EleStatStr, number>;
export type EleStatMap = FrozenMap<EleStatStr, number>;
// TODO: Migrate to this?
//export type EleStatMap = {
//    [key in EleStatStr]?: number;
//};

// If this is refactored into an array, we should add more validation code for the database.
export type DecorationSlotSize = 1 | 2 | 3;
export type DecoSlotsArray = []
                           | [DecorationSlotSize]
                           | [DecorationSlotSize, DecorationSlotSize]
                           | [DecorationSlotSize, DecorationSlotSize, DecorationSlotSize];
export function isDecoSlotsArray(obj: number[]): obj is DecoSlotsArray { // DANGER: Returns type predicate.
    if (obj.length > 3) return false;
    for (const v of obj) {
        if ((v !== 1) && (v !== 2) && (v !== 3)) return false;
    }
    return true;
}

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
    readonly id:        string;
    readonly shortId:   number;
    readonly name:      string;
    readonly maxLevels: number;

    readonly iconImgID: SkillIconImgID;
    readonly filterHelpers: {
        readonly nameLower: string;
    };
}

// Common to represent levels of skills as an array of 2-tuples like this.
export type SkillLevels = Readonly<[Skill, number]>[];


/*** Rampage Skills ***/

export interface RampageSkill {
    readonly id:      string;
    readonly shortID: string;
    readonly name:    string;
}

/*** Weapon Special Selections ***/

export type WeaponSpecialSelectionType = "lightbowgunmod" | "heavybowgunmod";

export interface WeaponSpecialSelection {
    readonly id:   number;
    readonly name: string;
    readonly type: WeaponSpecialSelectionType;
}

/*** Weapon Mechanics: Gunlance ***/

export type GLShellingType = "normal" | "long" | "wide";
export type GLShellingLevel = 1 | 2 | 3 | 4 | 5;

export interface GLStats {
    readonly shellingType:  GLShellingType;
    readonly shellingLevel: GLShellingLevel;
}

/*** Weapon Mechanics: Hunting Horn ***/

export type HHSong = "attack_up"
                   | "affinity_up"
                   | "defense_up"
                   | "attack_and_defense_up"
                   | "attack_and_affinity_up"

                   | "blight_negated"
                   | "divine_protection"
                   | "earplugs_l"
                   | "earplugs_s"
                   | "elemental_attack_boost"
                   | "environment_damage_negated"
                   | "health_recovery_s"
                   | "health_recovery_s_plus_antidote"
                   | "health_recovery_l"
                   | "health_regeneration"
                   | "knockbacks_negated"
                   | "sharpness_loss_reduced"
                   | "sonic_barrier"
                   | "sonic_wave"
                   | "stamina_use_reduced"
                   | "stamina_recovery_up"
                   | "stun_negated"
                   | "tremors_negated"
                   | "wind_pressure_negated";

export interface HHSongs {
    readonly x:  HHSong;
    readonly a:  HHSong;
    readonly xa: HHSong;
}

/*** Weapon Mechanics: Switchaxe ***/

export type SAPhialType = "power_phial"
                        | "element_phial"
                        | "poison_phial"
                        | "paralysis_phial"
                        | "dragon_phial"
                        | "exhaust_phial";

export interface SAStats {
    readonly phialType: SAPhialType;
    readonly phialValue: number | null; // Null if the value isn't used
}

/*** Weapon Mechanics: Charge Blade ***/

export type CBPhialType = "impact_phial" | "element_phial";

export interface CBStats {
    readonly phialType: CBPhialType;
}

/*** Weapon Mechanics: Insect Glaive ***/

export type KinsectLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export function isKinsectLevel(v: number): v is KinsectLevel { // DANGER: Returns type predicate.
    return (v % 1 === 0) && (v >= 1) && (v <= 8);
}

export interface IGStats {
    readonly kinsectLevel: KinsectLevel;
}

// Currently unused
//export interface IGKinsectType {
//    readonly id:   string;
//    readonly name: string;
//}
//
//export interface IGKinsectBonus {
//    readonly id:   string;
//    readonly name: string;
//}
//
//export interface IGKinsect {
//    readonly id:     number;
//    readonly name:   string;
//    readonly rarity: Rarity;
//
//    readonly attackType:   RawTypeStr;
//    readonly kinsectType:  IGKinsectTypeRO;
//    readonly kinsectBonus: IGKinsectBonusRO;
//}

/*** Weapon Mechanics: Bow ***/

export type BowArcShotType = "recovery" | "affinity" | "brace";
export type BowChargeShotType = "pierce" | "rapid" | "spread";
export type BowChargeShotLevel = 1 | 2 | 3 | 4 | 5;
export type BowChargeLevelLimit = 2 | 3 | 4;
// TODO: Make BowCoating reference the BowStatsMutable.compatibleCoatings keys?
export type BowCoating = "close_range_coating"
                       | "power_coating"
                       | "poison_coating"
                       | "para_coating"
                       | "sleep_coating"
                       | "blast_coating"
                       | "exhaust_coating";

// TODO: This mutable definition should be further deduplicated.
export interface BowStatsMutable {
    arcShot: BowArcShotType;
    baseChargeLevelLimit: BowChargeLevelLimit;
    chargeShot: [BowChargeShotType, BowChargeShotLevel][];
    compatibleCoatings: {
        close_range_coating: 0 | 1 | 2;
        power_coating:       0 | 1 | 2;
        poison_coating:      0 | 1 | 2;
        para_coating:        0 | 1 | 2;
        sleep_coating:       0 | 1 | 2;
        blast_coating:       0 | 1;
        exhaust_coating:     0 | 1 | 2;
    };
}
export interface BowStats {
    readonly arcShot: BowArcShotType;
    readonly baseChargeLevelLimit: BowChargeLevelLimit;
    readonly chargeShot: Readonly<Readonly<[BowChargeShotType, BowChargeShotLevel]>[]>;
    readonly compatibleCoatings: Readonly<BowStatsMutable["compatibleCoatings"]>;
}

/*** Weapon Mechanics: Light Bowgun and Heavy Bowgun ***/

export type BowgunRecoil = 0 | 1 | 2 | 3 | 4 | 5;
export type BowgunReload = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export function isBowgunRecoil(v: number): v is BowgunRecoil { // DANGER: Returns type predicate.
    return (v % 1 === 0) && (v >= 0) && (v <= 5);
}

export type BowgunAmmoType = `${"normal" | "pierce" | "spread" | "shrapnel" | "sticky" | "cluster"}_${1 | 2 | 3}`
                           | `${"" | "piercing_"}${"fire" | "water" | "thunder" | "ice" | "dragon"}`
                           | `${"poison" | "paralysis" | "sleep" | "exhaust" | "recover"}_${1 | 2}`
                           | "demon" | "armor" | "slicing" | "wyvern" | "tranq";

// TODO: Deduplicate this code somehow.
export type BowgunAmmoMapMutable = {
    [K in BowgunAmmoType]: {
        available:    boolean;
        ammoCapacity: number;
    };
}
export type BowgunAmmoMap = {
    readonly [K in BowgunAmmoType]: {
        readonly available:    boolean;
        readonly ammoCapacity: number;
    };
}

export interface BowgunStatsMutable {
    deviation: {
        severity: 0 | 1 | 2;
        left:     boolean;
        right:    boolean;
    };
    recoil: BowgunRecoil;
    reload: BowgunReload;
    ammo:   BowgunAmmoMapMutable;
}
export interface BowgunStats {
    readonly deviation: Readonly<BowgunStatsMutable["deviation"]>;
    readonly recoil: BowgunRecoil;
    readonly reload: BowgunReload;
    readonly ammo:   BowgunAmmoMap;
}

// Used when querying bowgun ammo
export interface BowgunAmmoInfo {
    readonly id:        string;
    readonly name:      string;
    readonly shortName: string;
}

/*** Weapons ***/

export interface Weapon {
    // These two IDs uniquely identify each individual weapon.
    readonly category: WeaponCategory;
    readonly id:       string;

    readonly name:       string;
    readonly treeName:   string;
    readonly rarity:     Rarity;
    readonly endlineTag: EndlineTag;

    readonly attack:    number;
    readonly affinity:  number;
    readonly defense:   number;
    readonly decoSlots: Readonly<DecoSlotsArray>; // TODO: Why is this a different name than the one for armour pieces?
    readonly eleStat:   Readonly<EleStatMap>;

    readonly rampSkills: Readonly<
        Readonly<
            Readonly<[RampageSkill, Weapon | null]>[]
        >[]
    >;

    readonly baseSharpness?: Sharpness;
    readonly maxSharpness?:  Sharpness;

    readonly gunlanceStats?:     GLStats;
    readonly huntinghornSongs?:  HHSongs;
    readonly switchaxeStats?:    SAStats;
    readonly chargebladeStats?:  CBStats;
    readonly insectglaiveStats?: IGStats;
    readonly bowgunStats?:       BowgunStats;
    readonly bowStats?:          BowStats;

    readonly filterHelpers: {
        readonly nameLower:     string;
        readonly treeNameLower: string;
    };
}

export interface MeleeWeapon extends Weapon {
    readonly category:      MeleeWeaponCategory;
    readonly baseSharpness: Sharpness;
    readonly maxSharpness:  Sharpness;
}

export interface Bowgun extends Weapon {
    readonly category:    "lightbowgun" | "heavybowgun";
    readonly bowgunStats: BowgunStats;
}

export interface Greatsword     extends MeleeWeapon {readonly category: "greatsword";                                        }
export interface Longsword      extends MeleeWeapon {readonly category: "longsword";                                         }
export interface SwordAndShield extends MeleeWeapon {readonly category: "swordandshield";                                    }
export interface DualBlades     extends MeleeWeapon {readonly category: "dualblades";                                        }
export interface Lance          extends MeleeWeapon {readonly category: "lance";                                             }
export interface Gunlance       extends MeleeWeapon {readonly category: "gunlance";     readonly gunlanceStats:     GLStats; }
export interface Hammer         extends MeleeWeapon {readonly category: "hammer";                                            }
export interface HuntingHorn    extends MeleeWeapon {readonly category: "huntinghorn";  readonly huntinghornSongs:  HHSongs; }
export interface SwitchAxe      extends MeleeWeapon {readonly category: "switchaxe";    readonly switchaxeStats:    SAStats; }
export interface ChargeBlade    extends MeleeWeapon {readonly category: "chargeblade";  readonly chargebladeStats:  CBStats; }
export interface InsectGlaive   extends MeleeWeapon {readonly category: "insectglaive"; readonly insectglaiveStats: IGStats; }
export interface LightBowgun    extends Bowgun      {readonly category: "lightbowgun";                                       }
export interface HeavyBowgun    extends Bowgun      {readonly category: "heavybowgun";                                       }
export interface Bow            extends Weapon      {readonly category: "bow";          readonly bowStats:          BowStats;}

export function isMelee(obj: Weapon): obj is MeleeWeapon { // DANGER: RETURNS TYPE PREDICATE
    return isMeleeCategory(obj.category);
}
export function isBowgun(obj: Weapon): obj is Bowgun { // DANGER: RETURNS TYPE PREDICATE
    return isBowgunCategory(obj.category) && (obj.bowgunStats !== undefined);
}

export function isGL(obj: Weapon): obj is Gunlance { // DANGER: RETURNS TYPE PREDICATE
    return (obj.category === "gunlance") && (obj.gunlanceStats !== undefined);
}
export function isHH(obj: Weapon): obj is HuntingHorn { // DANGER: RETURNS TYPE PREDICATE
    return (obj.category === "huntinghorn") && (obj.huntinghornSongs !== undefined);
}
export function isSA(obj: Weapon): obj is SwitchAxe { // DANGER: RETURNS TYPE PREDICATE
    return (obj.category === "switchaxe") && (obj.switchaxeStats !== undefined);
}
export function isCB(obj: Weapon): obj is ChargeBlade { // DANGER: RETURNS TYPE PREDICATE
    return (obj.category === "chargeblade") && (obj.chargebladeStats !== undefined);
}
export function isIG(obj: Weapon): obj is InsectGlaive { // DANGER: RETURNS TYPE PREDICATE
    return (obj.category === "insectglaive") && (obj.insectglaiveStats !== undefined);
}

export function isLBG(obj: Weapon): obj is LightBowgun { // DANGER: RETURNS TYPE PREDICATE
    return (obj.category === "lightbowgun") && (obj.bowgunStats !== undefined);
}
export function isHBG(obj: Weapon): obj is HeavyBowgun { // DANGER: RETURNS TYPE PREDICATE
    return (obj.category === "heavybowgun") && (obj.bowgunStats !== undefined);
}
export function isBow(obj: Weapon): obj is Bow { // DANGER: RETURNS TYPE PREDICATE
    return (obj.category === "bow") && (obj.bowStats !== undefined);
}

/*** Armour ***/

export interface ArmourPiece {
    // These two IDs uniquely identify each individual armour set.
    readonly setID:  number;
    readonly slotID: ArmourSlot;

    readonly setName: string;
    readonly name:    string;
    readonly rarity:  Rarity;
    readonly tierID:  Tier;
    readonly decorationSlots: Readonly<DecoSlotsArray>;
    readonly skills:  Readonly<SkillLevels>;
    
    readonly defenseAtLevel1: number;

    readonly fireRes:    number;
    readonly waterRes:   number;
    readonly thunderRes: number;
    readonly iceRes:     number;
    readonly dragonRes:  number;

    readonly filterHelpers: {
        readonly nameLower:    string;
        readonly setNameLower: string;
        readonly hintStrLower: string;
    };
}

// TODO: Use this?
//export interface HeadPiece  extends ArmourPiece {readonly slotID: "head" ;}
//export interface ChestPiece extends ArmourPiece {readonly slotID: "chest";}
//export interface ArmsPiece  extends ArmourPiece {readonly slotID: "arms" ;}
//export interface WaistPiece extends ArmourPiece {readonly slotID: "waist";}
//export interface LegsPiece  extends ArmourPiece {readonly slotID: "legs" ;}

export interface ArmourSet {
    readonly id:    number;
    readonly name:  string;
    readonly head:  ArmourPiece | undefined;
    readonly chest: ArmourPiece | undefined;
    readonly arms:  ArmourPiece | undefined;
    readonly waist: ArmourPiece | undefined;
    readonly legs:  ArmourPiece | undefined;
}

/*** Petalace ***/

export interface Petalace {
    readonly id:   string;
    readonly name: string;

    readonly endlineTag:  EndlineTag;
    readonly rarity:      Rarity;

    readonly healthUp:    number;
    readonly healthGain:  number;
    readonly staminaUp:   number;
    readonly staminaGain: number;
    readonly attackUp:    number;
    readonly attackGain:  number;
    readonly defenseUp:   number;
    readonly defenseGain: number;

    readonly iconImgPath: string;
    readonly filterHelpers: {
        readonly nameLower: string;
    };
}

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
    readonly id:   number;
    readonly name: string;

    readonly slotSize: DecorationSlotSize;
    readonly rarity:   Exclude<Rarity, 1 | 2 | 3>; // Decorations aren't observed to have rarities 1-3
    readonly skills:   Readonly<SkillLevels>;

    readonly icon: DecorationIconType;
    readonly filterHelpers: {
        readonly nameLower: string;
    };
}

/*** Database Utility Types ***/

type WeaponMapInner<W> = FrozenMap<string, W>;

export interface WeaponMap {
    readonly greatsword:     WeaponMapInner<Greatsword    >;
    readonly longsword:      WeaponMapInner<Longsword     >;
    readonly swordandshield: WeaponMapInner<SwordAndShield>;
    readonly dualblades:     WeaponMapInner<DualBlades    >;
    readonly lance:          WeaponMapInner<Lance         >;
    readonly gunlance:       WeaponMapInner<Gunlance      >;
    readonly hammer:         WeaponMapInner<Hammer        >;
    readonly huntinghorn:    WeaponMapInner<HuntingHorn   >;
    readonly switchaxe:      WeaponMapInner<SwitchAxe     >;
    readonly chargeblade:    WeaponMapInner<ChargeBlade   >;
    readonly insectglaive:   WeaponMapInner<InsectGlaive  >;
    readonly lightbowgun:    WeaponMapInner<LightBowgun   >;
    readonly heavybowgun:    WeaponMapInner<HeavyBowgun   >;
    readonly bow:            WeaponMapInner<Bow           >;
};

