/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    FrozenMap,
} from "../generic/frozen-containers";

export type Tier = "lr" | "hr";
export type Rarity = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type DecorationSlotSize = 1 | 2 | 3;

export type RawTypeStr = "severing" | "blunt";

export type ElementStr = "fire" | "water" | "thunder" | "ice" | "dragon";
export type StatStr = "poison" | "paralysis" | "sleep" | "blast";
export type EleStatStr = ElementStr | StatStr;

export type EndlineTag = "" | "hr";

export type ArmourSlot = "head" | "chest" | "arms" | "waist" | "legs";

export type WeaponCategory = "greatsword"
                           | "longsword"
                           | "swordandshield"
                           | "dualblades"
                           | "lance"
                           | "gunlance"
                           | "hammer"
                           | "huntinghorn"
                           | "switchaxe"
                           | "chargeblade"
                           | "insectglaive"
                           | "lightbowgun"
                           | "heavybowgun"
                           | "bow";
export type MeleeWeaponCategory = Exclude<WeaponCategory, "lightbowgun" | "heavybowgun" | "bow">;

export function isMeleeCategory(s: WeaponCategory): s is MeleeWeaponCategory { // DANGER: Returns type predicate.
    return (s !== "lightbowgun") && (s !== "heavybowgun") && (s !== "bow");
}

/*** Utility Types ***/

export type Sharpness = [
    number, // red
    number, // orange
    number, // yellow
    number, // green
    number, // blue
    number, // white
]

export type EleStatMap = FrozenMap<EleStatStr, number>;
// TODO: Migrate to this?
//export type EleStatMap = {
//    [key in EleStatStr]?: number;
//};

export type DecoSlotsArray = []
                           | [DecorationSlotSize]
                           | [DecorationSlotSize, DecorationSlotSize]
                           | [DecorationSlotSize, DecorationSlotSize, DecorationSlotSize];

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
    shortID: string;
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

// TODO: Continue working on this!
//export type BowChargeShotLevel = 1 | 2 | 3 | 4 | 5;
//
//export interface BowStats {
//    arcShot: BowArcShotType;
//    baseChargeLevelLimit: 3 | 4;
//    chargeShot: Readonly<Readonly<[BowChargeShotTypeRO, BowChargeShotLevel]>[]>;
//    compatibleCoatings: Readonly<{
//        close_range_coating: 0 | 1 | 2;
//        power_coating:       0 | 1 | 2;
//        poison_coating:      0 | 1 | 2;
//        para_coating:        0 | 1 | 2;
//        sleep_coating:       0 | 1 | 2;
//        blast_coating:       0 | 1;
//        exhaust_coating:     0 | 1 | 2;
//    }>;
//}

/*** Weapon Mechanics: Light Bowgun and Heavy Bowgun ***/

export interface BowgunAmmoType {
    id:        string;
    name:      string;
    shortName: string;
}
export type BowgunAmmoTypeRO = Readonly<BowgunAmmoType>;

/*** Weapons ***/

export interface Weapon {
    // These two IDs uniquely identify each individual weapon.
    category: WeaponCategory;
    id:       string;

    name:       string;
    treeName:   string;
    rarity:     Rarity;
    endlineTag: EndlineTag;

    attack:    number;
    affinity:  number;
    defense:   number;
    decoSlots: Readonly<DecoSlotsArray>; // TODO: Why is this a different name than the one for armour pieces?
    eleStat:   Readonly<EleStatMap>;

    rampSkills: Readonly<
        Readonly<
            Readonly<[RampageSkillRO, WeaponRO | null]>[]
        >[]
    >;

    baseSharpness?: Sharpness;
    maxSharpness?:  Sharpness;

    gunlanceStats?:    GLStats;
    huntinghornSongs?: HHSongs;
    //bowStats?: BowStats;

    filterHelpers: Readonly<{
        nameLower:     string;
        treeNameLower: string;
    }>;
}
export type WeaponRO = Readonly<Weapon>;

export interface MeleeWeapon extends Weapon {
    category:      MeleeWeaponCategory;
    baseSharpness: Sharpness;
    maxSharpness:  Sharpness;
}
export type MeleeWeaponRO = Readonly<MeleeWeapon>;

export function isMeleeRO(obj: WeaponRO): obj is MeleeWeaponRO { // DANGER: RETURNS TYPE PREDICATE
    return isMeleeCategory(obj.category);
}

export interface Greatsword     extends MeleeWeapon {category: "greatsword";    }
export interface Longsword      extends MeleeWeapon {category: "longsword";     }
export interface SwordAndShield extends MeleeWeapon {category: "swordandshield";}
export interface DualBlades     extends MeleeWeapon {category: "dualblades";    }
export interface Lance          extends MeleeWeapon {category: "lance";         }
export interface Gunlance       extends MeleeWeapon {category: "gunlance"; gunlanceStats: GLStats;}
export interface Hammer         extends MeleeWeapon {category: "hammer";        }
export interface HuntingHorn    extends MeleeWeapon {category: "huntinghorn"; huntinghornSongs: HHSongs;}
export type GreatswordRO     = Readonly<Greatsword    >;
export type LongswordRO      = Readonly<Longsword     >;
export type SwordAndShieldRO = Readonly<SwordAndShield>;
export type DualBladesRO     = Readonly<DualBlades    >;
export type LanceRO          = Readonly<Lance         >;
export type GunlanceRO       = Readonly<Gunlance      >;
export type HammerRO         = Readonly<Hammer        >;
export type HuntingHornRO    = Readonly<HuntingHorn   >;

/*** Armour ***/

export interface ArmourPiece {
    // These two IDs uniquely identify each individual armour set.
    setID:  number;
    slotID: ArmourSlot;

    setName: string;
    name:    string;
    rarity:  Rarity;
    tierID:  Tier;
    decorationSlots: Readonly<DecoSlotsArray>;
    skills:  Readonly<SkillLevels>;
    
    defenseAtLevel1: number;

    fireRes:    number;
    waterRes:   number;
    thunderRes: number;
    iceRes:     number;
    dragonRes:  number;

    filterHelpers: Readonly<{
        nameLower:    string;
        setNameLower: string;
        hintStrLower: string;
    }>;
}
export type ArmourPieceRO = Readonly<ArmourPiece>;

export interface ArmourSet {
    id:    number;
    name:  string;
    head:  ArmourPieceRO | undefined;
    chest: ArmourPieceRO | undefined;
    arms:  ArmourPieceRO | undefined;
    waist: ArmourPieceRO | undefined;
    legs:  ArmourPieceRO | undefined;
}
export type ArmourSetRO = Readonly<ArmourSet>;

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

/*** Other Database Utility Types ***/

type WeaponMapInner<W> = FrozenMap<string, W>;

export type WeaponMap = {
    greatsword:     WeaponMapInner<GreatswordRO    >;
    longsword:      WeaponMapInner<LongswordRO     >;
    swordandshield: WeaponMapInner<SwordAndShieldRO>;
    dualblades:     WeaponMapInner<DualBladesRO    >;
    lance:          WeaponMapInner<LanceRO         >;
    gunlance:       WeaponMapInner<GunlanceRO      >;
    hammer:         WeaponMapInner<HammerRO        >;
    huntinghorn:    WeaponMapInner<HuntingHornRO   >;
};

