/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type MHRDatabase,
} from "../../database";
import {
    type ElementStr,
    type EleStatStr,
    isElementStr,
    type WeaponSpecialSelection,
    type GLShellingType,
    type GLShellingLevel,
    type HHSong,
    type SAPhialType,
    isKinsectLevel,
    type BowArcShotType,
    type BowChargeShotType,
    type BowChargeShotLevel,
    type BowChargeLevelLimit,
    type BowCoating,
    isBowgunRecoil,
    type BowgunAmmoType,
    type Weapon,
    isMelee,
    isBowgun,
    isHH,
    isSA,
    isCB,
    isIG,
    isLBG,
    isHBG,
    isBow,
} from "../../common/types";

import {Build} from "../build";
import {CalcState} from "../calc_state";

import {BaseStatistics} from "./_common";


// No operation
// (All skills that intentionally do not have any operations attached to them will use this function.)
function nop() {
    // Do nothing
}


function getBaseValues(
    db:        {"readonly": MHRDatabase},
    build:     Build,
    calcState: CalcState,
): BaseStatistics {
    const weapon: Weapon = build.getWeaponObjRO();
    const v = new BaseStatistics(weapon);

    // Rampage tree IDs are "ra", "rb", ...
    const isRampageWeapon = (weapon.id[0] === "r");

    /*** ***/

    // Some helpers
    function bowgunAmmoSet(
        ammoID: BowgunAmmoType,
        capacity: {lbg: number | undefined; hbg: number},
    ): void {
        if (!isBowgun(weapon)) throw "Expected bowgun"; // TODO: Redundant?
        if (v.bowgunStats === null) throw "Null value";

        v.bowgunStats.ammo[ammoID].available = true;
        if (isLBG(weapon)) {
            if (capacity.lbg === undefined) throw "LBG doesn't support this ammo type";
            v.bowgunStats.ammo[ammoID].ammoCapacity = capacity.lbg;
        } else if (isHBG(weapon)) {
            v.bowgunStats.ammo[ammoID].ammoCapacity = capacity.hbg;
        } else {
            throw "Not a bowgun"; // TODO: Redundant?
        }
    }
    // (Intentionally optional lbg value)
    function bowgunAmmoInc(
        ammoID: BowgunAmmoType,
        capacity: {lbg: number | undefined; hbg: number},
    ) {
        if (!isBowgun(weapon)) throw "Expected bowgun"; // TODO: Redundant?
        if (v.bowgunStats === null) throw "Null value";

        v.bowgunStats.ammo[ammoID].available = true;
        if (isLBG(weapon)) {
            if (capacity.lbg === undefined) throw "LBG doesn't support this ammo type";
            v.bowgunStats.ammo[ammoID].ammoCapacity += capacity.lbg;
        } else if (isHBG(weapon)) {
            v.bowgunStats.ammo[ammoID].ammoCapacity += capacity.hbg;
        } else {
            throw "Not a bowgun"; // TODO: Redundant?
        }
    }

    /*** ***/

    // Deferred operations go here
    const deferredOps1: (() => void)[] = [];
    const deferredOps2: (() => void)[] = [];

    // Define what all rampage skills do
    function rampElementalBoost(eleValueToAdd: number): void {
        console.assert(eleValueToAdd % 1 === 0);
        deferredOps2.push(() => {
            for (const [eleStatStr, value] of [...v.baseEleStat.entries()]) {
                if (isElementStr(eleStatStr)) {
                    v.baseEleStat.set(eleStatStr, value + eleValueToAdd);
                }
            }
        });
    }
    function rampBoostEleStat(eleStatStr: EleStatStr, valueToAdd: number): void {
        console.assert(valueToAdd % 1 === 0);
        const value = v.baseEleStat.get(eleStatStr)
        if (value === undefined) throw "Undefined value";
        v.baseEleStat.set(eleStatStr, value + valueToAdd);
    }
    function rampSetEleStat(eleStatStr: EleStatStr, value: number): void {
        console.assert(value % 1 === 0);
        v.baseEleStat.set(eleStatStr, value);
    }
    function rampSecondaryEle(
        eleType: ElementStr,
        eleValue: number,
        addToPrimaryElement: number,
    ): void {
        deferredOps1.push(() => {
            // We ignore the rampage skill if the weapon already has the element.
            if (v.baseEleStat.has(eleType)) return;
            console.assert(eleValue % 1 === 0);
            console.assert(addToPrimaryElement % 1 === 0);

            // We only expect one element or status, which is the primary
            console.assert(v.baseEleStat.size === 1);

            //const [primaryType, primaryValue] = [...v.baseEleStat.entries()][0];
            //v.baseEleStat.set(primaryType, primaryValue + addToPrimaryElement);
            // We're doing this just to appease the type system.
            for (const [primaryType, primaryValue] of [...v.baseEleStat.entries()]) {
                console.assert(primaryType !== eleType);
                v.baseEleStat.set(primaryType, primaryValue + addToPrimaryElement);
            }

            v.baseEleStat.set(eleType, eleValue);
            console.assert(v.baseEleStat.size === 2);
        });
    }
    function rampGunlanceSetShellingType(
        shellingTypeID: GLShellingType,
        level: GLShellingLevel,
    ): void {
        v.glStats = {
            shellingType:  shellingTypeID,
            shellingLevel: level,
        }
    }
    function rampMelody(songX: HHSong, songA: HHSong, songXA: HHSong): void {
        console.assert(isHH(weapon));
        v.hhStats = {
            x:  songX,
            a:  songA,
            xa: songXA,
        };
    }
    function rampSwitchAxeSetPhial(phialTypeID: SAPhialType, value: number | null): void {
        console.assert(isSA(weapon));
        v.saStats = {
            phialType:  phialTypeID,
            phialValue: value,
        };
    }

    function rampBowSetArcShot(arcShotType: BowArcShotType): void {
        console.assert(isBow(weapon));
        if (v.bowStats === null) throw "Null value";
        v.bowStats.arcShot = arcShotType;
    }
    function rampBowSetChargeShot(
        chargeLevelLimit: BowChargeLevelLimit,
        spec: [BowChargeShotType, BowChargeShotLevel][],
    ): void {
        console.assert(isBow(weapon));
        if (v.bowStats === null) throw "Null value";

        // We assume this for now
        console.assert((v.bowStats.chargeShot.length === 4) && (spec.length === 4));

        // This assumes 4 charge levels
        console.assert((chargeLevelLimit === 3) || (chargeLevelLimit === 4));

        v.bowStats.chargeShot = [];
        for (const [chargeShotType, level] of spec) {
            v.bowStats.chargeShot.push([chargeShotType, level]);
        }

        v.bowStats.chargeLevelLimit = chargeLevelLimit;
    }
    function rampBowSetCoatingCompat(
        coatingID: BowCoating,
        state: 1 | 2, // No 0?
        callback: () => void,
    ): void {
        console.assert(isBow(weapon));
        if (v.bowStats === null) throw "Null value";

        console.assert(coatingID in v.bowStats.compatibleCoatings);

        //if ((coatingID === "blast_coating") && (state === 2)) {
        //    throw "Blast coating cannot be enhanced";
        //}
        //v.bowStats.compatibleCoatings[coatingID] = state;
        // Doing it this way to appease the type system
        if (coatingID === "blast_coating") {
            if (state === 2) throw "Blast coating cannot be enhanced";
            v.bowStats.compatibleCoatings[coatingID] = state;
        } else {
            v.bowStats.compatibleCoatings[coatingID] = state;
        }

        callback(); // Callback only called if the ramp skill is applied
    }
    function rampBowBoostCoatingCompat(coatingID: BowCoating): void {
        console.assert(isBow(weapon));
        if (v.bowStats === null) throw "Null value";

        const state = v.bowStats.compatibleCoatings[coatingID];
        console.assert(state >= 0);
        if (state === 1) {
            if (coatingID === "blast_coating") throw "Blast coating cannot be enhanced";
            v.bowStats.compatibleCoatings[coatingID] = 2;
        }
    }

    const rampSkillOps = new Map([

        //
        // Elemental Rampage Skills
        //

        ["fire_boost_1"   , ()=>{ rampBoostEleStat("fire"   , 4 ); }],
        ["fire_boost_2"   , ()=>{ rampBoostEleStat("fire"   , 6 ); }],
        ["fire_boost_3"   , ()=>{ rampBoostEleStat("fire"   , 8 ); }],
        ["fire_boost_4"   , ()=>{ rampBoostEleStat("fire"   , 10); }],
        ["water_boost_1"  , ()=>{ rampBoostEleStat("water"  , 4 ); }],
        ["water_boost_2"  , ()=>{ rampBoostEleStat("water"  , 6 ); }],
        ["water_boost_3"  , ()=>{ rampBoostEleStat("water"  , 8 ); }],
        ["water_boost_4"  , ()=>{ rampBoostEleStat("water"  , 10); }],
        ["thunder_boost_1", ()=>{ rampBoostEleStat("thunder", 4 ); }],
        ["thunder_boost_2", ()=>{ rampBoostEleStat("thunder", 6 ); }],
        ["thunder_boost_3", ()=>{ rampBoostEleStat("thunder", 8 ); }],
        ["thunder_boost_4", ()=>{ rampBoostEleStat("thunder", 10); }],
        ["ice_boost_1"    , ()=>{ rampBoostEleStat("ice"    , 4 ); }],
        ["ice_boost_2"    , ()=>{ rampBoostEleStat("ice"    , 6 ); }],
        ["ice_boost_3"    , ()=>{ rampBoostEleStat("ice"    , 8 ); }],
        ["ice_boost_4"    , ()=>{ rampBoostEleStat("ice"    , 10); }],
        ["dragon_boost_1" , ()=>{ rampBoostEleStat("dragon" , 4 ); }],
        ["dragon_boost_2" , ()=>{ rampBoostEleStat("dragon" , 6 ); }],
        ["dragon_boost_3" , ()=>{ rampBoostEleStat("dragon" , 8 ); }],
        ["dragon_boost_4" , ()=>{ rampBoostEleStat("dragon" , 10); }],
        ["poison_boost_1"   , ()=>{ rampBoostEleStat("poison"   , 3); }],
        ["poison_boost_2"   , ()=>{ rampBoostEleStat("poison"   , 5); }],
        ["poison_boost_3"   , ()=>{ rampBoostEleStat("poison"   , 7); }],
        ["paralysis_boost_1", ()=>{ rampBoostEleStat("paralysis", 2); }],
        ["paralysis_boost_2", ()=>{ rampBoostEleStat("paralysis", 4); }],
        ["paralysis_boost_3", ()=>{ rampBoostEleStat("paralysis", 6); }],
        ["sleep_boost_1"    , ()=>{ rampBoostEleStat("sleep"    , 2); }],
        ["sleep_boost_2"    , ()=>{ rampBoostEleStat("sleep"    , 4); }],
        ["sleep_boost_3"    , ()=>{ rampBoostEleStat("sleep"    , 6); }],
        ["blast_boost_1"    , ()=>{ rampBoostEleStat("blast"    , 3); }],
        ["blast_boost_2"    , ()=>{ rampBoostEleStat("blast"    , 5); }],
        ["blast_boost_3"    , ()=>{ rampBoostEleStat("blast"    , 7); }],

        ["fire_1"   , ()=>{ rampSetEleStat("fire"   , 10);                      }],
        ["fire_2"   , ()=>{ rampSetEleStat("fire"   , 15);                      }],
        ["fire_3"   , ()=>{ rampSetEleStat("fire"   , 20); v.baseRawAdd += -5;  }],
        ["fire_4"   , ()=>{ rampSetEleStat("fire"   , 30); v.baseRawAdd += -10; }],
        ["water_1"  , ()=>{ rampSetEleStat("water"  , 10);                      }],
        ["water_2"  , ()=>{ rampSetEleStat("water"  , 15);                      }],
        ["water_3"  , ()=>{ rampSetEleStat("water"  , 20); v.baseRawAdd += -5;  }],
        ["water_4"  , ()=>{ rampSetEleStat("water"  , 30); v.baseRawAdd += -10; }],
        ["thunder_1", ()=>{ rampSetEleStat("thunder", 10);                      }],
        ["thunder_2", ()=>{ rampSetEleStat("thunder", 15);                      }],
        ["thunder_3", ()=>{ rampSetEleStat("thunder", 20); v.baseRawAdd += -5;  }],
        ["thunder_4", ()=>{ rampSetEleStat("thunder", 30); v.baseRawAdd += -10; }],
        ["ice_1"    , ()=>{ rampSetEleStat("ice"    , 10);                      }],
        ["ice_2"    , ()=>{ rampSetEleStat("ice"    , 15);                      }],
        ["ice_3"    , ()=>{ rampSetEleStat("ice"    , 20); v.baseRawAdd += -5;  }],
        ["ice_4"    , ()=>{ rampSetEleStat("ice"    , 30); v.baseRawAdd += -10; }],
        ["dragon_1" , ()=>{ rampSetEleStat("dragon" , 10);                      }],
        ["dragon_2" , ()=>{ rampSetEleStat("dragon" , 15);                      }],
        ["dragon_3" , ()=>{ rampSetEleStat("dragon" , 20); v.baseRawAdd += -5;  }],
        ["dragon_4" , ()=>{ rampSetEleStat("dragon" , 30); v.baseRawAdd += -10; }],
        ["poison_1"   , ()=>{ rampSetEleStat("poison"   , 10);                      }],
        ["poison_2"   , ()=>{ rampSetEleStat("poison"   , 20); v.baseRawAdd += -10; }],
        ["poison_3"   , ()=>{ rampSetEleStat("poison"   , 30); v.baseRawAdd += -20; }],
        ["paralysis_1", ()=>{ rampSetEleStat("paralysis", 10);                      }],
        ["paralysis_2", ()=>{ rampSetEleStat("paralysis", 15); v.baseRawAdd += -10; }],
        ["paralysis_3", ()=>{ rampSetEleStat("paralysis", 20); v.baseRawAdd += -20; }],
        ["sleep_1"    , ()=>{ rampSetEleStat("sleep"    , 10);                      }],
        ["sleep_2"    , ()=>{ rampSetEleStat("sleep"    , 12); v.baseRawAdd += -10; }],
        ["sleep_3"    , ()=>{ rampSetEleStat("sleep"    , 15); v.baseRawAdd += -20; }],
        ["blast_1"    , ()=>{ rampSetEleStat("blast"    , 10);                      }],
        ["blast_2"    , ()=>{ rampSetEleStat("blast"    , 15); v.baseRawAdd += -10; }],
        ["blast_3"    , ()=>{ rampSetEleStat("blast"    , 20); v.baseRawAdd += -20; }],

        ["secondary_fire_1"   , ()=>{ rampSecondaryEle("fire"   , 10, 0 ); }],
        ["secondary_fire_2"   , ()=>{ rampSecondaryEle("fire"   , 20, 5 ); }],
        ["secondary_fire_3"   , ()=>{ rampSecondaryEle("fire"   , 30, 10); }],
        ["secondary_water_1"  , ()=>{ rampSecondaryEle("water"  , 10, 0 ); }],
        ["secondary_water_2"  , ()=>{ rampSecondaryEle("water"  , 20, 5 ); }],
        ["secondary_water_3"  , ()=>{ rampSecondaryEle("water"  , 30, 10); }],
        ["secondary_thunder_1", ()=>{ rampSecondaryEle("thunder", 10, 0 ); }],
        ["secondary_thunder_2", ()=>{ rampSecondaryEle("thunder", 20, 5 ); }],
        ["secondary_thunder_3", ()=>{ rampSecondaryEle("thunder", 30, 10); }],
        ["secondary_ice_1"    , ()=>{ rampSecondaryEle("ice"    , 10, 0 ); }],
        ["secondary_ice_2"    , ()=>{ rampSecondaryEle("ice"    , 20, 5 ); }],
        ["secondary_ice_3"    , ()=>{ rampSecondaryEle("ice"    , 30, 10); }],
        ["secondary_dragon_1" , ()=>{ rampSecondaryEle("dragon" , 10, 0 ); }],
        ["secondary_dragon_2" , ()=>{ rampSecondaryEle("dragon" , 20, 5 ); }],
        ["secondary_dragon_3" , ()=>{ rampSecondaryEle("dragon" , 30, 10); }],

        //
        // Everything Else
        //

        ["attack_boost_1", ()=>{ v.baseRawAdd += 4;  }],
        ["attack_boost_2", ()=>{ v.baseRawAdd += 6;  }],
        ["attack_boost_3", ()=>{ v.baseRawAdd += 8;  }],
        ["attack_boost_4", ()=>{ v.baseRawAdd += 10; }],

        ["affinity_boost_1", ()=>{ v.baseAffinity += 4;  }],
        ["affinity_boost_2", ()=>{ v.baseAffinity += 6;  }],
        ["affinity_boost_3", ()=>{ v.baseAffinity += 8;  }],
        ["affinity_boost_4", ()=>{ v.baseAffinity += 10; }],

        ["elemental_boost_1", ()=>{ rampElementalBoost(5);  }],
        ["elemental_boost_2", ()=>{ rampElementalBoost(7);  }],
        ["elemental_boost_3", ()=>{ rampElementalBoost(10); }],

        ["defense_boost_1", ()=>{ v.baseDefense += 10; }],
        ["defense_boost_2", ()=>{ v.baseDefense += 20; }],
        ["defense_boost_3", ()=>{ v.baseDefense += 30; }],

        ["attack_surge"   , ()=>{ v.baseRawAdd += 20;
                                  v.baseAffinity += -30; }],
        ["elemental_surge", ()=>{ 
            deferredOps2.push(() => {
                console.assert(v.baseEleStat.size <= 1); // We only expect one element or none
                const tmp = new Map();
                for (const [eleStatType, eleStatValue] of v.baseEleStat.entries()) {
                    if (!isElementStr(eleStatType)) continue;
                    tmp.set(eleStatType, eleStatValue + 10);
                }
                v.baseEleStat = tmp;

                v.baseRawAdd += -15;
            });
        }],
        ["affinity_surge" , ()=>{ v.baseRawAdd += -10;
                                  v.baseAffinity += 20; }],

        ["sharpness_type_1", ()=>{
            if (!isMelee(weapon)) {
                console.warn("Attempted to apply Sharpness Type I on a ranged weapon.");
                return;
            }
            if (v.meleeStats === null) throw "Null value";
            // TODO: Check if the sharpness bars are rampage weapon default bars?
            v.meleeStats.minSharpness = [100,150,50,20,30,0,0];
            v.meleeStats.maxSharpness = [100,150,50,20,30,50,0];
        }],
        ["sharpness_type_2", ()=>{
            if (!isMelee(weapon)) {
                console.warn("Attempted to apply Sharpness Type II on a ranged weapon.");
                return;
            }
            if (v.meleeStats === null) throw "Null value";
            // TODO: Check if the sharpness bars are rampage weapon default bars?
            v.meleeStats.minSharpness = [20,80,150,100,0,0,0];
            v.meleeStats.maxSharpness = [20,80,150,100,40,10,0];
        }],
        ["sharpness_type_3", ()=>{
            if (!isMelee(weapon)) {
                console.warn("Attempted to apply Sharpness Type III on a ranged weapon.");
                return;
            }
            if (v.meleeStats === null) throw "Null value";
            // TODO: Check if the sharpness bars are rampage weapon default bars?
            v.meleeStats.minSharpness = [70,70,30,30,100,0,0];
            v.meleeStats.maxSharpness = [70,70,30,30,150,0,0];

            v.baseRawAdd += -10;
        }],
        ["sharpness_type_4", ()=>{
            if (!isMelee(weapon)) {
                console.warn("Attempted to apply Sharpness Type IV on a ranged weapon.");
                return;
            }
            if (v.meleeStats === null) throw "Null value";
            // TODO: Check if the sharpness bars are rampage weapon default bars?
            v.meleeStats.minSharpness = [50,80,70,160,10,30,0]; // Full bar
            v.meleeStats.maxSharpness = [50,80,70,160,10,30,0];

            v.baseRawAdd += -20;
        }],

        ["anti_aerial_species", ()=>{
            if (!calcState.rampIsActive("Anti-Aerial Species (AA)")) return;
            v.rawPostTruncMul *= 1.05;
            // TODO: Is there an elemental multiplier?
        }],
        ["anti_aquatic_species", ()=>{
            if (!calcState.rampIsActive("Anti-Aquatic Species (AAQ)")) return;
            v.rawPostTruncMul *= 1.10;
            // TODO: Is there an elemental multiplier?
        }],
        ["wyvern_exploit", ()=>{
            if (!calcState.rampIsActive("Wyvern Exploit (WYX)")) return;
            v.rawPostTruncMul *= 1.05;
            // TODO: Is there an elemental multiplier?
        }],

        ["defense_grinder_1", nop],
        ["defense_grinder_2", nop],

        ["chameleos_soul", nop], // This really just gives you spiribirds rather than a unique buff
        ["kushala_daora_soul", ()=>{
            const ksdState = calcState.getRampState("Kushala Daora Soul (KUS)");
            switch (ksdState) {
                case 0: /* No Operation */ break;
                case 1: v.affinityAdd += 25; break;
                case 2: v.affinityAdd += 30; break;
                default:
                    console.error("Invalid state for Kushala Daora Soul.");
            }
        }],
        ["teostra_soul", nop], // TODO: Need to implement this if I calculate blast damage per proc.
        ["ibushi_soul", nop], // TODO: Need to implement this if I calculate defense.
        ["narwa_soul", ()=>{
            v.narwaSoulActive = true;
        }],
        ["valstrax_soul", ()=>{
            if (!calcState.rampIsActive("Valstrax Soul (VAS)")) return;
            v.eleStatMul.dragon *= 1.2;
        }],
        
        ["element_exploit"      , ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO
        ["fireblight_exploit"   , ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO
        ["iceblight_exploit"    , ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO
        ["small_monster_exploit", ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO
        ["thunderblight_exploit", ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO
        ["waterblight_exploit"  , ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO

        ["non_elemental_boost", ()=>{
            deferredOps2.push(() => {
                if (v.baseEleStat.size === 0) v.baseRawAdd += 10;
            });
        }],

        //
        // Gunlance
        //

        ["shelling_normal_1", ()=>{ rampGunlanceSetShellingType("normal", 3); }],
        ["shelling_normal_2", ()=>{ rampGunlanceSetShellingType("normal", 4); }],
        ["shelling_normal_3", ()=>{ rampGunlanceSetShellingType("normal", 5); }],

        ["shelling_long_1", ()=>{ rampGunlanceSetShellingType("long", 3); }],
        ["shelling_long_2", ()=>{ rampGunlanceSetShellingType("long", 4); }],
        ["shelling_long_3", ()=>{ rampGunlanceSetShellingType("long", 5); }],

        ["shelling_wide_1", ()=>{ rampGunlanceSetShellingType("wide", 3); }],
        ["shelling_wide_2", ()=>{ rampGunlanceSetShellingType("wide", 4); }],
        ["shelling_wide_3", ()=>{ rampGunlanceSetShellingType("wide", 5); }],

        //
        // Hunting Horn
        //

        ["attack_melody_1", ()=>{
            rampMelody(
                "attack_up",
                "elemental_attack_boost",
                "affinity_up",
            );
        }],
        ["attack_melody_2", ()=>{
            rampMelody(
                "attack_and_affinity_up",
                "tremors_negated",
                "sonic_wave",
            );
        }],
        ["defensive_melody_1", ()=>{
            rampMelody(
                "defense_up",
                "divine_protection",
                "wind_pressure_negated",
            );
        }],
        ["defensive_melody_2", ()=>{
            rampMelody(
                "attack_and_defense_up",
                "stamina_use_reduced",
                "knockbacks_negated",
            );
        }],
        ["healing_melody_1", ()=>{
            rampMelody(
                "health_recovery_s",
                "health_recovery_s_plus_antidote",
                "earplugs_s",
            );
        }],
        ["healing_melody_2", ()=>{
            rampMelody(
                "health_recovery_l",
                "health_regeneration",
                "earplugs_l",
            );
        }],
        ["resilient_melody_1", ()=>{
            rampMelody(
                "environment_damage_negated",
                "sharpness_loss_reduced",
                "blight_negated",
            );
        }],
        ["resilient_melody_2", ()=>{
            rampMelody(
                "stamina_recovery_up",
                "sonic_barrier",
                "stun_negated",
            );
        }],

        //
        // Switch Axe and Charge Blade
        //

        ["phial_element", ()=>{
            if (isSA(weapon)) {
                rampSwitchAxeSetPhial("element_phial", null);
            } else if (isCB(weapon)) {
                v.cbStats = {phialType: "element_phial"};
            } else {
                console.warn("Unexpected weapon category.");
            }
        }],

        ["phial_poison_1", ()=>{ rampSwitchAxeSetPhial("poison_phial", 20); }],
        ["phial_poison_2", ()=>{ rampSwitchAxeSetPhial("poison_phial", 25); }],
        ["phial_poison_3", ()=>{ rampSwitchAxeSetPhial("poison_phial", 30); }],

        ["phial_paralysis_1", ()=>{ rampSwitchAxeSetPhial("paralysis_phial", 15); }],
        ["phial_paralysis_2", ()=>{ rampSwitchAxeSetPhial("paralysis_phial", 20); }],
        ["phial_paralysis_3", ()=>{ rampSwitchAxeSetPhial("paralysis_phial", 25); }],

        ["phial_dragon_1", ()=>{ rampSwitchAxeSetPhial("dragon_phial", 20); }],
        ["phial_dragon_2", ()=>{ rampSwitchAxeSetPhial("dragon_phial", 25); }],
        ["phial_dragon_3", ()=>{ rampSwitchAxeSetPhial("dragon_phial", 30); }],

        ["phial_exhaust_1", ()=>{ rampSwitchAxeSetPhial("exhaust_phial", 20); }],
        ["phial_exhaust_2", ()=>{ rampSwitchAxeSetPhial("exhaust_phial", 30); }],
        ["phial_exhaust_3", ()=>{ rampSwitchAxeSetPhial("exhaust_phial", 40); }],

        //
        // Insect Glaive
        //

        ["kinsect_level_boost", ()=>{
            deferredOps1.push(() => {
                console.assert(isIG(weapon));
                if (v.igStats === null) throw "Null value";

                const newKinsectLevel = v.igStats.kinsectLevel + 1;
                if (!isKinsectLevel(newKinsectLevel)) throw "Invalid value";
                v.igStats = {kinsectLevel: newKinsectLevel};
            });
        }],

        ["kinsect_level_boost_1", ()=>{
            console.assert(isIG(weapon));
            v.igStats = {kinsectLevel: 4};
        }],
        ["kinsect_level_boost_2", ()=>{
            console.assert(isIG(weapon));
            v.igStats = {kinsectLevel: 5};
        }],
        ["kinsect_level_boost_3", ()=>{
            console.assert(isIG(weapon));
            v.igStats = {kinsectLevel: 6};
            v.baseRawAdd += -10;
        }],
        ["kinsect_level_boost_4", ()=>{
            console.assert(isIG(weapon));
            v.igStats = {kinsectLevel: 7};
            v.baseRawAdd += -20;
        }],

        //
        // Bow
        //

        ["lasting_arc_shot", nop],

        ["poison_coating_boost"     , ()=>{ rampBowBoostCoatingCompat("poison_coating"); }],
        ["paralysis_coating_boost"  , ()=>{ rampBowBoostCoatingCompat("para_coating"); }],
        ["sleep_coating_boost"      , ()=>{ rampBowBoostCoatingCompat("sleep_coating"); }],
        ["close_range_coating_boost", ()=>{ rampBowBoostCoatingCompat("close_range_coating"); v.baseRawAdd += -5; }],

        // Rampage Bow, Slot 3
        ["firing_rapid", ()=>{
            rampBowSetChargeShot(3, [
                ["rapid" , 2],
                ["rapid" , 3],
                ["rapid" , 4],
                ["rapid" , 5],
            ]);
        }],
        ["firing_pierce", ()=>{
            rampBowSetChargeShot(3, [
                ["pierce" , 2],
                ["pierce" , 3],
                ["pierce" , 4],
                ["pierce" , 5],
            ]);
        }],
        ["firing_spread", ()=>{
            rampBowSetChargeShot(3, [
                ["spread" , 1],
                ["spread" , 2],
                ["spread" , 3],
                ["spread" , 4],
            ]);
        }],
        ["firing_charge", ()=>{
            rampBowSetChargeShot(4, [
                ["rapid"  , 2],
                ["pierce" , 3],
                ["spread" , 5],
                ["pierce" , 4],
            ]);
        }],
        ["firing_swift", ()=>{
            rampBowSetChargeShot(4, [
                ["pierce", 5],
                ["rapid" , 4],
                ["spread", 2],
                ["rapid" , 5],
            ]);
        }],

        // Rampage Bow, Slot 4-5
        ["use_power_coating"   , ()=>{ rampBowSetCoatingCompat("power_coating"  , 1, () => {                    }); }],
        ["use_poison_coating_1", ()=>{ rampBowSetCoatingCompat("poison_coating" , 1, () => {                    }); }],
        ["use_poison_coating_2", ()=>{ rampBowSetCoatingCompat("poison_coating" , 2, () => { v.baseRawAdd += -5;  }); }],
        ["use_para_coating_1"  , ()=>{ rampBowSetCoatingCompat("para_coating"   , 1, () => {                    }); }],
        ["use_para_coating_2"  , ()=>{ rampBowSetCoatingCompat("para_coating"   , 2, () => { v.baseRawAdd += -10; }); }],
        ["use_sleep_coating_1" , ()=>{ rampBowSetCoatingCompat("sleep_coating"  , 1, () => {                    }); }],
        ["use_sleep_coating_2" , ()=>{ rampBowSetCoatingCompat("sleep_coating"  , 2, () => { v.baseRawAdd += -10; }); }],
        ["use_blast_coating"   , ()=>{ rampBowSetCoatingCompat("blast_coating"  , 1, () => {                    }); }],
        ["use_exhaust_coating" , ()=>{ rampBowSetCoatingCompat("exhaust_coating", 1, () => { v.baseRawAdd += 10;  }); }], // Not a typo
 
        // Rampage Bow, Slot 6
        ["arc_shot_recovery"  , ()=>{ rampBowSetArcShot("recovery"); }],
        ["arc_shot_affinity"  , ()=>{ rampBowSetArcShot("affinity"); }],
        ["arc_shot_anti_shock", ()=>{ rampBowSetArcShot("brace"   ); }],

        // Rampage Bowguns, Slot 1
        ["recoil_down_boost", ()=>{
            console.assert(isRampageWeapon);
            if (v.bowgunStats === null) throw "Null value";
            v.bowgunStats.recoil -= 1;
        }],
        ["reload_speed_boost", ()=>{
            console.assert(isRampageWeapon);
            if (v.bowgunStats === null) throw "Null value";
            v.bowgunStats.reload += 1;
        }],
        ["steadiness_boost", ()=>{
            console.assert(isRampageWeapon);
            if (v.bowgunStats === null) throw "Null value";
            v.bowgunStats.deviation.severity -= 1;
        }],

        // Rampage Bowguns, Slot 2
        ["recoil_down_surge", ()=>{
            console.assert(isRampageWeapon);
            if (v.bowgunStats === null) throw "Null value";
            v.bowgunStats.recoil -= 2;
            v.bowgunStats.deviation.severity += 1;
        }],
        ["reload_speed_surge", ()=>{
            console.assert(isRampageWeapon);
            if (v.bowgunStats === null) throw "Null value";
            v.bowgunStats.reload += 2;
            v.bowgunStats.recoil += 1;
        }],
        ["steadiness_surge", ()=>{
            console.assert(isRampageWeapon);
            if (v.bowgunStats === null) throw "Null value";
            v.bowgunStats.deviation.severity -= 2;
            v.bowgunStats.reload -= 1;
        }],

        ["add_normal_ammo_1", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("normal_1", {lbg: 6, hbg: 7});
            bowgunAmmoSet("normal_2", {lbg: 5, hbg: 6});
            bowgunAmmoSet("normal_3", {lbg: 1, hbg: 2});
        }],
        ["add_normal_ammo_2", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("normal_1", {lbg: 4, hbg: 5});
            bowgunAmmoSet("normal_2", {lbg: 4, hbg: 5});
            bowgunAmmoSet("normal_3", {lbg: 6, hbg: 7});
        }],
        ["normal_effect_1", ()=>{
            console.assert(!isRampageWeapon);
            // TODO: Verify HBG numbers. I'm extrapolating from Pierce Effect 1.
            bowgunAmmoInc("normal_1", {lbg: 2, hbg: 2});
            bowgunAmmoInc("normal_2", {lbg: 2, hbg: 2});
        }],
        ["normal_effect_2", ()=>{
            console.assert(!isRampageWeapon);
            // TODO: Verify HBG numbers. I'm extrapolating from Pierce Effect 2.
            bowgunAmmoInc("normal_1", {lbg: 3, hbg: 3});
            bowgunAmmoInc("normal_2", {lbg: 3, hbg: 3});
            bowgunAmmoInc("normal_3", {lbg: 3, hbg: 3});
        }],
        ["pierce_effect_1", ()=>{
            if (isRampageWeapon) {
                bowgunAmmoSet("pierce_1", {lbg: 7, hbg: 8});
                bowgunAmmoSet("pierce_2", {lbg: 5, hbg: 6});
                bowgunAmmoSet("pierce_3", {lbg: 2, hbg: 3});
            } else {
                bowgunAmmoInc("pierce_1", {lbg: 2, hbg: 2});
                bowgunAmmoInc("pierce_2", {lbg: 2, hbg: 2});
            }
        }],
        ["pierce_effect_2", ()=>{
            if (isRampageWeapon) {
                bowgunAmmoSet("pierce_1", {lbg: 4, hbg: 5});
                bowgunAmmoSet("pierce_2", {lbg: 3, hbg: 4});
                bowgunAmmoSet("pierce_3", {lbg: 4, hbg: 5});
            } else {
                bowgunAmmoInc("pierce_1", {lbg: 3, hbg: 3});
                bowgunAmmoInc("pierce_2", {lbg: 3, hbg: 3});
                bowgunAmmoInc("pierce_3", {lbg: 3, hbg: 3});
            }
        }],
        ["spread_effect_1", ()=>{
            if (isRampageWeapon) {
                bowgunAmmoSet("spread_1", {lbg: 7, hbg: 8});
                bowgunAmmoSet("spread_2", {lbg: 5, hbg: 6});
                bowgunAmmoSet("spread_3", {lbg: 2, hbg: 3});
            } else {
                // TODO: Verify LBG numbers. I'm extrapolating from Pierce Effect 1.
                bowgunAmmoInc("spread_1", {lbg: 2, hbg: 2});
                bowgunAmmoInc("spread_2", {lbg: 2, hbg: 2});
            }
        }],
        ["spread_effect_2", ()=>{
            if (isRampageWeapon) {
                bowgunAmmoSet("spread_1", {lbg: 4, hbg: 5});
                bowgunAmmoSet("spread_2", {lbg: 3, hbg: 4});
                bowgunAmmoSet("spread_3", {lbg: 4, hbg: 5});
            } else {
                // TODO: Needs verification (both LBG and HBG). I'm extrapolating from Pierce Effect 2.
                bowgunAmmoInc("spread_1", {lbg: 3, hbg: 3});
                bowgunAmmoInc("spread_2", {lbg: 3, hbg: 3});
                bowgunAmmoInc("spread_3", {lbg: 3, hbg: 3});
            }
        }],
        ["shrapnel_effect_1", ()=>{
            if (isRampageWeapon) {
                bowgunAmmoSet("shrapnel_1", {lbg: 7, hbg: 8});
                bowgunAmmoSet("shrapnel_2", {lbg: 5, hbg: 6});
                bowgunAmmoSet("shrapnel_3", {lbg: 2, hbg: 3});
            } else {
                // TODO: Verify LBG numbers. I'm extrapolating from Pierce Effect 1.
                bowgunAmmoInc("shrapnel_1", {lbg: 2, hbg: 2});
                bowgunAmmoInc("shrapnel_2", {lbg: 2, hbg: 2});
            }
        }],
        ["shrapnel_effect_2", ()=>{
            if (isRampageWeapon) {
                bowgunAmmoSet("shrapnel_1", {lbg: 4, hbg: 5});
                bowgunAmmoSet("shrapnel_2", {lbg: 3, hbg: 4});
                bowgunAmmoSet("shrapnel_3", {lbg: 4, hbg: 5});
            } else {
                // TODO: Needs verification (both LBG and HBG). I'm extrapolating from Pierce Effect 2.
                bowgunAmmoInc("shrapnel_1", {lbg: 3, hbg: 3});
                bowgunAmmoInc("shrapnel_2", {lbg: 3, hbg: 3});
                bowgunAmmoInc("shrapnel_3", {lbg: 3, hbg: 3});
            }
        }],
        ["sticky_effect_1", ()=>{
            console.assert(!isRampageWeapon);
            // TODO: I'm taking a guess for LBG since LBG and HBG matching has been consistent
            //       with the other Effect ramp skills so far. That should be verified.
            bowgunAmmoInc("sticky_1" , {lbg: 1, hbg: 1});
            bowgunAmmoInc("sticky_2" , {lbg: 1, hbg: 1});
        }],
        ["sticky_effect_2", ()=>{
            console.assert(!isRampageWeapon);
            // LBG doesn't have this.
            bowgunAmmoInc("sticky_1" , {lbg: undefined, hbg: 2});
            bowgunAmmoInc("sticky_2" , {lbg: undefined, hbg: 2});
            bowgunAmmoInc("sticky_3" , {lbg: undefined, hbg: 2});
        }],
        ["cluster_effect_1", ()=>{
            console.assert(!isRampageWeapon);
            // TODO: I'm taking a guess for LBG since LBG and HBG matching has been consistent
            //       with the other Effect ramp skills so far. That should be verified.
            bowgunAmmoInc("cluster_1" , {lbg: 1, hbg: 1});
            bowgunAmmoInc("cluster_2" , {lbg: 1, hbg: 1});
        }],
        ["cluster_effect_2", ()=>{
            console.assert(!isRampageWeapon);
            // LBG doesn't have this.
            bowgunAmmoInc("cluster_1" , {lbg: undefined, hbg: 2});
            bowgunAmmoInc("cluster_2" , {lbg: undefined, hbg: 2});
            bowgunAmmoInc("cluster_3" , {lbg: undefined, hbg: 2});
        }],
        ["stickycluster_effect_1", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("sticky_1" , {lbg: 5, hbg: 5});
            bowgunAmmoSet("sticky_2" , {lbg: 2, hbg: 2});
            bowgunAmmoSet("cluster_1", {lbg: 3, hbg: 3});
            bowgunAmmoSet("cluster_2", {lbg: 2, hbg: 2});
        }],
        ["stickycluster_effect_2", ()=>{
            console.assert(isRampageWeapon);
            // LBG doesn't have this.
            bowgunAmmoSet("sticky_1" , {lbg: undefined, hbg: 3});
            bowgunAmmoSet("sticky_2" , {lbg: undefined, hbg: 2});
            bowgunAmmoSet("sticky_3" , {lbg: undefined, hbg: 4});
            bowgunAmmoSet("cluster_1", {lbg: undefined, hbg: 2});
            bowgunAmmoSet("cluster_2", {lbg: undefined, hbg: 2});
            bowgunAmmoSet("cluster_3", {lbg: undefined, hbg: 3});
        }],
        ["fire_effect_1", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("fire", {lbg: 4, hbg: 5});
        }],
        ["fire_effect_2", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("fire"         , {lbg: 2, hbg: 3});
            bowgunAmmoSet("piercing_fire", {lbg: 3, hbg: 4});
        }],
        ["water_effect_1", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("water", {lbg: 4, hbg: 5});
        }],
        ["water_effect_2", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("water"         , {lbg: 2, hbg: 3});
            bowgunAmmoSet("piercing_water", {lbg: 3, hbg: 4});
        }],
        ["thunder_effect_1", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("thunder", {lbg: 4, hbg: 5});
        }],
        ["thunder_effect_2", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("thunder"         , {lbg: 2, hbg: 3});
            bowgunAmmoSet("piercing_thunder", {lbg: 3, hbg: 4});
        }],
        ["ice_effect_1", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("ice", {lbg: 4, hbg: 5});
        }],
        ["ice_effect_2", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("ice"         , {lbg: 2, hbg: 3});
            bowgunAmmoSet("piercing_ice", {lbg: 3, hbg: 4});
        }],
        ["dragon_effect_1", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("dragon", {lbg: 3, hbg: 3});
        }],
        ["dragon_effect_2", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("dragon"         , {lbg: 2, hbg: 2});
            bowgunAmmoSet("piercing_dragon", {lbg: 2, hbg: 3});
        }],
        ["poison_effect_1", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("poison_1" , {lbg: 2, hbg: 3});
            bowgunAmmoSet("poison_2" , {lbg: 1, hbg: 2});
            bowgunAmmoSet("recover_1", {lbg: 2, hbg: 2});
            bowgunAmmoSet("recover_2", {lbg: 1, hbg: 1});
            bowgunAmmoSet("demon"    , {lbg: 1, hbg: 1});
            bowgunAmmoSet("armor"    , {lbg: 1, hbg: 1});
        }],
        ["poison_effect_2", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("poison_1" , {lbg: 1, hbg: 2});
            bowgunAmmoSet("poison_2" , {lbg: 2, hbg: 3});
            bowgunAmmoSet("recover_1", {lbg: 3, hbg: 3});
            bowgunAmmoSet("recover_2", {lbg: 2, hbg: 2});
            bowgunAmmoSet("demon"    , {lbg: 2, hbg: 2});
            bowgunAmmoSet("armor"    , {lbg: 2, hbg: 2});
        }],
        ["paralysis_effect_1", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("paralysis_1", {lbg: 2, hbg: 3});
            bowgunAmmoSet("paralysis_2", {lbg: 1, hbg: 2});
        }],
        ["paralysis_effect_2", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("paralysis_1", {lbg: 1, hbg: 2});
            bowgunAmmoSet("paralysis_2", {lbg: 2, hbg: 3});
        }],
        ["sleep_effect_1", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("sleep_1", {lbg: 2, hbg: 3});
            bowgunAmmoSet("sleep_2", {lbg: 1, hbg: 2});
        }],
        ["sleep_effect_2", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("sleep_1", {lbg: 1, hbg: 2});
            bowgunAmmoSet("sleep_2", {lbg: 2, hbg: 3});
        }],
        ["exhaust_effect_1", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("exhaust_1", {lbg: 2, hbg: 3});
            bowgunAmmoSet("exhaust_2", {lbg: 1, hbg: 2});
            bowgunAmmoSet("recover_1", {lbg: 2, hbg: 2});
            bowgunAmmoSet("recover_2", {lbg: 1, hbg: 1});
            bowgunAmmoSet("demon"    , {lbg: 1, hbg: 1});
            bowgunAmmoSet("armor"    , {lbg: 1, hbg: 1});
        }],
        ["exhaust_effect_2", ()=>{
            console.assert(isRampageWeapon);
            bowgunAmmoSet("exhaust_1", {lbg: 1, hbg: 2});
            bowgunAmmoSet("exhaust_2", {lbg: 2, hbg: 3});
            bowgunAmmoSet("recover_1", {lbg: 3, hbg: 3});
            bowgunAmmoSet("recover_2", {lbg: 2, hbg: 2});
            bowgunAmmoSet("demon"    , {lbg: 2, hbg: 2});
            bowgunAmmoSet("armor"    , {lbg: 2, hbg: 2});
        }],

        //["rapid_fire_normal", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],
        //["rapid_fire_piercing", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],
        //["rapid_fire_spread", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],
        //["rapid_fire_shrapnel", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],
        //["rapid_fire_sticky", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],
        //["rapid_fire_fire", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],
        //["rapid_fire_water", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],
        //["rapid_fire_thunder", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],
        //["rapid_fire_ice", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],
        //["rapid_fire_dragon", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],
        
        //["special_wyvernheart", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],
        //["special_wyvernsnipe", ()=>{
        //    console.assert(isRampageWeapon);
        //    // TODO: NOT IMPLEMENTED
        //}],

        // MANY OTHER RAMPAGE SKILLS NOT YET IMPLEMENTED
    ]);

    // Warn if any rampage skill IDs are incorrect
    for (const rampSkillID of rampSkillOps.keys()) {
        if (!db.readonly.weaponRampSkills.longIdsMap.has(rampSkillID)) {
            console.warn("Rampage skill ID " + rampSkillID + " not present in the database.");
        }
    }
    // Warn if any rampage skill IDs are not implemented.
    // (Uncomment when you need to check what skills aren't implemented. Recomment where possible because it's noisy.)
    //for (const rampSkillID of db.readonly.weaponRampSkills.longIdsMap.keys()) {
    //    if (!rampSkillOps.has(rampSkillID)) {
    //        console.warn("Rampage skill ID " + rampSkillID + " not implemented in calculation.");
    //    }
    //}

    // Process all rampage skills in the build
    for (const rampSkillRO of build.getRampSkills(db)) {
        const op = rampSkillOps.get(rampSkillRO.id);
        if (op !== undefined) op();
    }
    // Process deferred operations
    for (const op of deferredOps1) op();
    for (const op of deferredOps2) op();

    // Now, we process weapon special selections
    const specialSelection: null | WeaponSpecialSelection = build.getWeaponSpecialSelectionRO();
    if (specialSelection !== null) {
        if (specialSelection.type === "lightbowgunmod" && isLBG(weapon)) {
            if (specialSelection.id === 1) { // Silencer
                if (v.bowgunStats === null) throw "Null value";
                const newRecoil = Math.max(0, v.bowgunStats.recoil - 1);
                if (!isBowgunRecoil(newRecoil)) throw "Invalid recoil value";
                v.bowgunStats.recoil = newRecoil;
            } else if (specialSelection.id === 2) { // Long Barrel
                v.baseRawMul *= 1.05;
            }
        } else if (specialSelection.type === "heavybowgunmod" && isHBG(weapon)) {
            if (specialSelection.id === 4) { // Power Barrel
                v.baseRawMul *= 1.125;
            }
        } else {
            throw `Special selection ${specialSelection.name} not possible with ${weapon.category}.`;
        }
    }

    return v;
}

export {getBaseValues};

