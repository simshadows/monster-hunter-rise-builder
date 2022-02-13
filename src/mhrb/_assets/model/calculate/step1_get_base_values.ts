// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {Build} from "../build";
import {CalcState} from "../calc_state";

import {
    isObj,
    isInt,
    isNonEmptyStr,
    isStrOrNull,
    isArr,
    isMap,
    isSet,
    isFunction,
} from "../../check";
import {
    eleStrs,
    isEleStr,
    getWeaponTags,
} from "../../common";
import {
    deepcopy,
} from "../../utils";

const assert = console.assert;

// TODO: Rewrite? This was lazily written to deepcopy including the database object, then
//       overwrite database references with the original database object.
function copyBowgunStats(obj) {
    const ret = deepcopy(obj);
    for (const [k, v] of Object.entries(obj.ammo)) {
        ret.ammo[k].ammoRO = v.ammoRO;
    }
    return ret;
}

function copyBowStats(obj) {
    const ret = deepcopy(obj);
    ret.chargeLevelLimit = ret.baseChargeLevelLimit;
    return ret;

}

// NOTE: Bowgun stats will be returned unclamped.
//       The caller will need to clamp the values before returning!
function getBaseValues(db, build, calcState) {
    assert(isObj(db));
    assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure

    assert(build instanceof Build);
    assert(calcState instanceof CalcState);

    const weaponRO = build.getWeaponObjRO();
    const tagset   = getWeaponTags(weaponRO.category);

    const allCurrentRampSkills = build.getRampSkills(db);
    assert(isArr(allCurrentRampSkills));

    const weaponSpecialSelection = build.getWeaponSpecialSelectionRO();

    const allCalcStateSpec = calcState.getSpecification();
    const allCalcState = calcState.getCurrState();

    // Defined for code readability. Returns whether a binary state is "on" or "off".
    function rampSkillActive(stateLabel) {
        const presentations = allCalcStateSpec.get("Rampage Skill States").get(stateLabel).presentations;
        const numPossibleStates = presentations.length;
        assert(numPossibleStates === 2);
        const stateValue = allCalcState.get("Rampage Skill States").get(stateLabel);
        assert(isInt(stateValue) && (stateValue >= 0) && (stateValue < 2));
        return (stateValue === 1);
    }
    // Returns the value of a state, not necessarily of a binary state.
    // TODO: This is a copy of the same function in the step 2 file. Deduplicate it!
    function rampSkillState(stateLabel) {
        const presentations = allCalcStateSpec.get("Rampage Skill States").get(stateLabel).presentations;
        const numPossibleStates = presentations.length;
        assert(numPossibleStates >= 2);
        const stateValue = allCalcState.get("Rampage Skill States").get(stateLabel);
        assert(isInt(stateValue) && (stateValue >= 0) && (stateValue < numPossibleStates));
        return stateValue;
    }

    let baseRaw      = weaponRO.attack;
    let baseAffinity = weaponRO.affinity;

    let baseEleStat = new Map(weaponRO.eleStat.entries());

    // TODO: Another weird naming thing. Fix this!
    let minSharpness = (tagset.has("melee")) ? deepcopy(weaponRO.baseSharpness) : null;
    let maxSharpness = (tagset.has("melee")) ? deepcopy(weaponRO.maxSharpness)  : null;

    let baseDefense = weaponRO.defense;

    let baseRawAdd = 0;
    let baseRawMul = 1;
    let rawPostTruncMul = 1;
    
    let affinityAdd = 0;

    let eleStatMul = {
            fire:      1,
            water:     1,
            thunder:   1,
            ice:       1,
            dragon:    1,

            poison:    1,
            paralysis: 1,
            sleep:     1,
            blast:     1,
        };

    let narwaSoulActive = false;

    const isBowgun = (weaponRO.category === "lightbowgun") || (weaponRO.category === "heavybowgun");
    const isRampageWeapon = (weaponRO.id[0] === "r"); // Rampage tree IDs are "ra", "rb", ...

    let gunlanceStats     = (weaponRO.category !== "gunlance"    ) ? null : {...weaponRO.gunlanceStats};
    let huntingHornSongs  = (weaponRO.category !== "huntinghorn" ) ? null : weaponRO.huntinghornSongs;
    let switchaxeStats    = (weaponRO.category !== "switchaxe"   ) ? null : {...weaponRO.switchaxeStats};
    let chargebladeStats  = (weaponRO.category !== "chargeblade" ) ? null : {...weaponRO.chargebladeStats};
    let insectglaiveStats = (weaponRO.category !== "insectglaive") ? null : {...weaponRO.insectglaiveStats};
    let bowStats          = (weaponRO.category !== "bow"         ) ? null : copyBowStats(weaponRO.bowStats);
    let bowgunStats       = (!isBowgun                           ) ? null : copyBowgunStats(weaponRO.bowgunStats);

    /*** ***/

    // Some helpers
    function bowgunAmmoSet(ammoID, capacity) {
        console.assert(weaponRO.category === "lightbowgun" || weaponRO.category === "heavybowgun");
        console.assert(typeof capacity.lbg === "number" && typeof capacity.hbg === "number");
        bowgunStats.ammo[ammoID].available = true;
        if (weaponRO.category === "lightbowgun") {
            bowgunStats.ammo[ammoID].ammoCapacity = capacity.lbg;
        } else if (weaponRO.category === "heavybowgun") {
            bowgunStats.ammo[ammoID].ammoCapacity = capacity.hbg;
        } else {
            console.error("Not a bowgun.");
        }
    }
    function bowgunAmmoInc(ammoID, capacity) {
        console.assert(weaponRO.category === "lightbowgun" || weaponRO.category === "heavybowgun");
        console.assert((typeof capacity.lbg === "number" || capacity.lbg === undefined) && typeof capacity.hbg === "number");
        bowgunStats.ammo[ammoID].available = true;
        if (weaponRO.category === "lightbowgun") {
            bowgunStats.ammo[ammoID].ammoCapacity += capacity.lbg;
        } else if (weaponRO.category === "heavybowgun") {
            bowgunStats.ammo[ammoID].ammoCapacity += capacity.hbg;
        } else {
            console.error("Not a bowgun.");
        }
    }

    /*** ***/

    // Deferred operations go here
    const deferredOps1 = [];
    const deferredOps2 = [];

    // Define what all rampage skills do
    function rampElementalBoost(eleValueToAdd) {
        function op() {
            assert(isInt(eleValueToAdd));
            for (const eleID of eleStrs) {
                const eleValue = baseEleStat.get(eleID);
                if (eleValue === undefined) continue;
                baseEleStat.set(eleID, eleValue + eleValueToAdd);
            }
        }
        deferredOps2.push(op); // Defer to last
    }
    function rampBoostEleStat(eleType, eleValue) {
        const originalValue = baseEleStat.get(eleType)
        assert(originalValue !== undefined);
        baseEleStat.set(eleType, originalValue + eleValue);
    }
    function rampSetEleStat(eleType, eleValue) {
        assert(!baseEleStat.has(eleType));
        baseEleStat.set(eleType, eleValue);
    }
    function rampSecondaryEle(eleType, eleValue, addToPrimaryElement) {
        function op() {
            if (baseEleStat.has(eleType)) return; // We ignore the rampage skill if the weapon already has the element.
            assert(isInt(eleValue));
            assert(isInt(addToPrimaryElement));

            // We first add to the primary element
            assert(baseEleStat.size === 1); // We only expect one element or status, which is the primary
            const tmp = new Map();
            for (const [eleStatType, eleStatValue] of baseEleStat.entries()) {
                if (!isEleStr(eleStatType)) continue; // Ensure it's element
                tmp.set(eleStatType, eleStatValue + addToPrimaryElement);
            }
            baseEleStat = tmp;

            // Now, we add the secondary element
            baseEleStat.set(eleType, eleValue);
            assert(baseEleStat.size === 2);
        }
        deferredOps1.push(op); // Defer
    }
    function rampGunlanceSetShellingType(shellingTypeID, level) {
        gunlanceStats.shellingType = shellingTypeID;
        gunlanceStats.shellingLevel = level;
    }
    function rampMelody(songX, songA, songXA) {
        assert(weaponRO.category === "huntinghorn");
        assert(typeof huntingHornSongs === "object");
        huntingHornSongs = {
            x:  songX,
            a:  songA,
            xa: songXA,
        };
    }
    function rampSwitchAxeSetPhial(phialTypeID, value) {
        assert(weaponRO.category === "switchaxe");
        switchaxeStats.phialType = phialTypeID;
        switchaxeStats.phialValue = value;
    }

    function rampBowSetArcShot(arcShotTypeID) {
        assert(weaponRO.category === "bow");
        bowStats.arcShot = db.readonly.weaponMechanics.bow.arcShotTypesMap.get(arcShotTypeID);
        assert(bowStats.arcShot !== undefined); // Need to make sure we actually got something
    }
    function rampBowSetChargeShot(chargeLevelLimit, spec) {
        assert(weaponRO.category === "bow");
        assert((bowStats.chargeShot.length === 4) && (spec.length === 4)); // We assume this for now
        assert((chargeLevelLimit === 3) || (chargeLevelLimit === 4)); // This assumes 4 charge levels

        bowStats.chargeShot = [];
        for (const [chargeShotTypeID, level] of spec) {
            const chargeShotTypeRO = db.readonly.weaponMechanics.bow.chargeShotTypesMap.get(chargeShotTypeID);
            assert(chargeShotTypeRO !== undefined); // Need to make sure we actually got something
            bowStats.chargeShot.push([chargeShotTypeRO, level]);
        }

        bowStats.chargeLevelLimit = chargeLevelLimit;
    }
    function rampBowSetCoatingCompat(coatingID, state, callback) {
        assert(weaponRO.category === "bow");
        assert(coatingID in bowStats.compatibleCoatings);
        assert((state >= 0) && (state <= 2));
        if (bowStats.compatibleCoatings[coatingID] >= state) {
            return; // No change if it's already higher
        }
        bowStats.compatibleCoatings[coatingID] = state;
        callback(); // Callback only called if the ramp skill is applied
    }
    function rampBowBoostCoatingCompat(coatingID) {
        assert(weaponRO.category === "bow");
        const state = bowStats.compatibleCoatings[coatingID];
        assert(state >= 0);
        if (state === 1) {
            bowStats.compatibleCoatings[coatingID] = 2;
        }
    }

    // No operation
    // (All skills that intentionally do not have any operations attached to them will use this function.)
    function nop() {
        // Do nothing
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

        ["fire_1"   , ()=>{ rampSetEleStat("fire"   , 10);                    }],
        ["fire_2"   , ()=>{ rampSetEleStat("fire"   , 15);                    }],
        ["fire_3"   , ()=>{ rampSetEleStat("fire"   , 20); baseRawAdd += -5;  }],
        ["fire_4"   , ()=>{ rampSetEleStat("fire"   , 30); baseRawAdd += -10; }],
        ["water_1"  , ()=>{ rampSetEleStat("water"  , 10);                    }],
        ["water_2"  , ()=>{ rampSetEleStat("water"  , 15);                    }],
        ["water_3"  , ()=>{ rampSetEleStat("water"  , 20); baseRawAdd += -5;  }],
        ["water_4"  , ()=>{ rampSetEleStat("water"  , 30); baseRawAdd += -10; }],
        ["thunder_1", ()=>{ rampSetEleStat("thunder", 10);                    }],
        ["thunder_2", ()=>{ rampSetEleStat("thunder", 15);                    }],
        ["thunder_3", ()=>{ rampSetEleStat("thunder", 20); baseRawAdd += -5;  }],
        ["thunder_4", ()=>{ rampSetEleStat("thunder", 30); baseRawAdd += -10; }],
        ["ice_1"    , ()=>{ rampSetEleStat("ice"    , 10);                    }],
        ["ice_2"    , ()=>{ rampSetEleStat("ice"    , 15);                    }],
        ["ice_3"    , ()=>{ rampSetEleStat("ice"    , 20); baseRawAdd += -5;  }],
        ["ice_4"    , ()=>{ rampSetEleStat("ice"    , 30); baseRawAdd += -10; }],
        ["dragon_1" , ()=>{ rampSetEleStat("dragon" , 10);                    }],
        ["dragon_2" , ()=>{ rampSetEleStat("dragon" , 15);                    }],
        ["dragon_3" , ()=>{ rampSetEleStat("dragon" , 20); baseRawAdd += -5;  }],
        ["dragon_4" , ()=>{ rampSetEleStat("dragon" , 30); baseRawAdd += -10; }],
        ["poison_1"   , ()=>{ rampSetEleStat("poison"   , 10);                    }],
        ["poison_2"   , ()=>{ rampSetEleStat("poison"   , 20); baseRawAdd += -10; }],
        ["poison_3"   , ()=>{ rampSetEleStat("poison"   , 30); baseRawAdd += -20; }],
        ["paralysis_1", ()=>{ rampSetEleStat("paralysis", 10);                    }],
        ["paralysis_2", ()=>{ rampSetEleStat("paralysis", 15); baseRawAdd += -10; }],
        ["paralysis_3", ()=>{ rampSetEleStat("paralysis", 20); baseRawAdd += -20; }],
        ["sleep_1"    , ()=>{ rampSetEleStat("sleep"    , 10);                    }],
        ["sleep_2"    , ()=>{ rampSetEleStat("sleep"    , 12); baseRawAdd += -10; }],
        ["sleep_3"    , ()=>{ rampSetEleStat("sleep"    , 15); baseRawAdd += -20; }],
        ["blast_1"    , ()=>{ rampSetEleStat("blast"    , 10);                    }],
        ["blast_2"    , ()=>{ rampSetEleStat("blast"    , 15); baseRawAdd += -10; }],
        ["blast_3"    , ()=>{ rampSetEleStat("blast"    , 20); baseRawAdd += -20; }],

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

        ["attack_boost_1", ()=>{ baseRawAdd += 4;  }],
        ["attack_boost_2", ()=>{ baseRawAdd += 6;  }],
        ["attack_boost_3", ()=>{ baseRawAdd += 8;  }],
        ["attack_boost_4", ()=>{ baseRawAdd += 10; }],

        ["affinity_boost_1", ()=>{ baseAffinity += 4;  }],
        ["affinity_boost_2", ()=>{ baseAffinity += 6;  }],
        ["affinity_boost_3", ()=>{ baseAffinity += 8;  }],
        ["affinity_boost_4", ()=>{ baseAffinity += 10; }],

        ["elemental_boost_1", ()=>{ rampElementalBoost(5);  }],
        ["elemental_boost_2", ()=>{ rampElementalBoost(7);  }],
        ["elemental_boost_3", ()=>{ rampElementalBoost(10); }],

        ["defense_boost_1", ()=>{ baseDefense += 10; }],
        ["defense_boost_2", ()=>{ baseDefense += 20; }],
        ["defense_boost_3", ()=>{ baseDefense += 30; }],

        ["attack_surge"   , ()=>{ baseRawAdd += 20;
                                  baseAffinity += -30; }],
        ["elemental_surge", ()=>{ 
            function op() {
                assert(baseEleStat.size <= 1); // We only expect one element or none
                const tmp = new Map();
                for (const [eleStatType, eleStatValue] of baseEleStat.entries()) {
                    if (!isEleStr(eleStatType)) continue;
                    tmp.set(eleStatType, eleStatValue + 10);
                }
                baseEleStat = tmp;

                baseRawAdd += -15;
            }
            deferredOps2.push(op); // Defer to last
        }],
        ["affinity_surge" , ()=>{ baseRawAdd += -10;
                                  baseAffinity += 30; }],

        ["sharpness_type_1", ()=>{
            if (!tagset.has("melee")) {
                console.warn("Attempted to apply Sharpness Type I on a ranged weapon.");
                return;
            }
            // TODO: Check if the sharpness bars are rampage weapon default bars?
            minSharpness = [100,150,50,20,30,0];
            maxSharpness = [100,150,50,20,30,50];
        }],
        ["sharpness_type_2", ()=>{
            if (!tagset.has("melee")) {
                console.warn("Attempted to apply Sharpness Type II on a ranged weapon.");
                return;
            }
            // TODO: Check if the sharpness bars are rampage weapon default bars?
            minSharpness = [20,80,150,100,0,0];
            maxSharpness = [20,80,150,100,40,10];
        }],
        ["sharpness_type_3", ()=>{
            if (!tagset.has("melee")) {
                console.warn("Attempted to apply Sharpness Type III on a ranged weapon.");
                return;
            }
            // TODO: Check if the sharpness bars are rampage weapon default bars?
            minSharpness = [70,70,30,30,100,0];
            maxSharpness = [70,70,30,30,150,0];
        }],
        ["sharpness_type_4", ()=>{
            if (!tagset.has("melee")) {
                console.warn("Attempted to apply Sharpness Type IV on a ranged weapon.");
                return;
            }
            // TODO: Check if the sharpness bars are rampage weapon default bars?
            minSharpness = [50,80,70,160,10,30]; // Full bar
            maxSharpness = [50,80,70,160,10,30];
        }],

        ["anti_aerial_species", ()=>{
            if (!rampSkillActive("Anti-Aerial Species (AA)")) return;
            rawPostTruncMul *= 1.05;
            // TODO: Is there an elemental multiplier?
        }],
        ["anti_aquatic_species", ()=>{
            if (!rampSkillActive("Anti-Aquatic Species (AAQ)")) return;
            rawPostTruncMul *= 1.10;
            // TODO: Is there an elemental multiplier?
        }],
        ["wyvern_exploit", ()=>{
            if (!rampSkillActive("Wyvern Exploit (WYX)")) return;
            rawPostTruncMul *= 1.05;
            // TODO: Is there an elemental multiplier?
        }],

        ["defense_grinder_1", nop],
        ["defense_grinder_2", nop],

        ["chameleos_soul", nop], // This really just gives you spiribirds rather than a unique buff
        ["kushala_daora_soul", ()=>{
            const ksdState = rampSkillState("Kushala Daora Soul (KUS)");
            switch (ksdState) {
                case 0: /* No Operation */ break;
                case 1: affinityAdd += 25; break;
                case 2: affinityAdd += 30; break;
                default:
                    console.error("Invalid state for Kushala Daora Soul.");
            }
        }],
        ["teostra_soul", nop], // TODO: Need to implement this if I calculate blast damage per proc.
        ["ibushi_soul", nop], // TODO: Need to implement this if I calculate defense.
        ["narwa_soul", ()=>{
            narwaSoulActive = true;
        }],
        ["valstrax_soul", ()=>{
            if (!rampSkillActive("Valstrax Soul (VAS)")) return;
            eleStatMul.dragon *= 1.2;
        }],
        
        ["element_exploit"      , ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO
        ["fireblight_exploit"   , ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO
        ["iceblight_exploit"    , ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO
        ["small_monster_exploit", ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO
        ["thunderblight_exploit", ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO
        ["waterblight_exploit"  , ()=>{ console.warn("NOT IMPLEMENTED"); }], // TODO

        ["non_elemental_boost", ()=>{ deferredOps2.push(()=>{ if (baseEleStat.size === 0) baseRawAdd += 10; }); }],

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
            if (weaponRO.category === "switchaxe") {
                switchaxeStats.phialType = "element_phial";
            } else if (weaponRO.category === "chargeblade") {
                chargebladeStats.phialType = db.readonly.weaponMechanics.chargeblade.phialTypesMap.get("element_phial");
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
            function op() {
                assert(weaponRO.category === "insectglaive");
                insectglaiveStats.kinsectLevel += 1;
            }
            deferredOps1.push(op); // Defer
        }],

        ["kinsect_level_boost_1", ()=>{
            assert(weaponRO.category === "insectglaive");
            insectglaiveStats.kinsectLevel = 4;
        }],
        ["kinsect_level_boost_2", ()=>{
            assert(weaponRO.category === "insectglaive");
            insectglaiveStats.kinsectLevel = 5;
        }],
        ["kinsect_level_boost_3", ()=>{
            assert(weaponRO.category === "insectglaive");
            insectglaiveStats.kinsectLevel = 6;
            baseRawAdd += -10;
        }],
        ["kinsect_level_boost_4", ()=>{
            assert(weaponRO.category === "insectglaive");
            insectglaiveStats.kinsectLevel = 7;
            baseRawAdd += -20;
        }],

        //
        // Bow
        //

        ["lasting_arc_shot", nop],

        ["poison_coating_boost"     , ()=>{ rampBowBoostCoatingCompat("poison_coating"); }],
        ["paralysis_coating_boost"  , ()=>{ rampBowBoostCoatingCompat("para_coating"); }],
        ["sleep_coating_boost"      , ()=>{ rampBowBoostCoatingCompat("sleep_coating"); }],
        ["close_range_coating_boost", ()=>{ rampBowBoostCoatingCompat("close_range_coating"); baseRawAdd += -5; }],

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
        ["use_poison_coating_2", ()=>{ rampBowSetCoatingCompat("poison_coating" , 2, () => { baseRawAdd += -5;  }); }],
        ["use_para_coating_1"  , ()=>{ rampBowSetCoatingCompat("para_coating"   , 1, () => {                    }); }],
        ["use_para_coating_2"  , ()=>{ rampBowSetCoatingCompat("para_coating"   , 2, () => { baseRawAdd += -10; }); }],
        ["use_sleep_coating_1" , ()=>{ rampBowSetCoatingCompat("sleep_coating"  , 1, () => {                    }); }],
        ["use_sleep_coating_2" , ()=>{ rampBowSetCoatingCompat("sleep_coating"  , 2, () => { baseRawAdd += -10; }); }],
        ["use_blast_coating"   , ()=>{ rampBowSetCoatingCompat("blast_coating"  , 1, () => {                    }); }],
        ["use_exhaust_coating" , ()=>{ rampBowSetCoatingCompat("exhaust_coating", 1, () => { baseRawAdd += 10;  }); }], // Not a typo
 
        // Rampage Bow, Slot 6
        ["arc_shot_recovery"  , ()=>{ rampBowSetArcShot("recovery"); }],
        ["arc_shot_affinity"  , ()=>{ rampBowSetArcShot("affinity"); }],
        ["arc_shot_anti_shock", ()=>{ rampBowSetArcShot("brace"   ); }],

        // Rampage Bowguns, Slot 1
        ["recoil_down_boost", ()=>{
            console.assert(isRampageWeapon);
            bowgunStats.recoil -= 1;
        }],
        ["reload_speed_boost", ()=>{
            console.assert(isRampageWeapon);
            bowgunStats.reload += 1;
        }],
        ["steadiness_boost", ()=>{
            console.assert(isRampageWeapon);
            bowgunStats.deviation.severity -= 1;
        }],

        // Rampage Bowguns, Slot 2
        ["recoil_down_surge", ()=>{
            console.assert(isRampageWeapon);
            bowgunStats.recoil -= 2;
            bowgunStats.deviation.severity += 1;
        }],
        ["reload_speed_surge", ()=>{
            console.assert(isRampageWeapon);
            bowgunStats.reload += 2;
            bowgunStats.recoil += 1;
        }],
        ["steadiness_surge", ()=>{
            console.assert(isRampageWeapon);
            bowgunStats.deviation.severity -= 2;
            bowgunStats.reload -= 1;
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
    for (const rampSkillRO of allCurrentRampSkills) {
        const op = rampSkillOps.get(rampSkillRO.id);
        if (op !== undefined) op(rampSkillRO);
    }
    // Process deferred operations
    for (const op of deferredOps1) op();
    for (const op of deferredOps2) op();

    // Now, we process weapon special selections
    if (weaponSpecialSelection !== null) {
        if (weaponSpecialSelection.type === "lightbowgunmod" && weaponRO.category === "lightbowgun") {
            if (weaponSpecialSelection.id === 1) { // Silencer
                bowgunStats.recoil = Math.max(0, bowgunStats.recoil - 1);
            } else if (weaponSpecialSelection.id === 2) { // Long Barrel
                baseRawMul *= 1.05;
            }
        } else if (weaponSpecialSelection.type === "heavybowgunmod" && weaponRO.category === "heavybowgun") {
            if (weaponSpecialSelection.id === 4) { // Power Barrel
                baseRawMul *= 1.125;
            }
        } else {
            console.error(`Special selection ${weaponSpecialSelection.name} not possible with ${weaponRO.category}.`);
        }
    }

    const ret = {
        baseRaw,
        baseAffinity,

        baseEleStat,

        minSharpness,
        maxSharpness,

        baseDefense,

        baseRawAdd,
        baseRawMul,
        rawPostTruncMul,

        affinityAdd,

        eleStatMul,

        narwaSoulActive,

        gunlanceStats,
        huntingHornSongs,
        switchaxeStats,
        chargebladeStats,
        insectglaiveStats,
        bowStats,
        bowgunStats,
    };
    return ret;
}

export {getBaseValues};

