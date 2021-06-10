/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {Build} from "../build.js";
import {CalcState} from "../calc_state.js";

import {
    isObj,
    isInt,
    isNonEmptyStr,
    isStrOrNull,
    isArr,
    isMap,
    isSet,
    isFunction,
} from "../../check.js";
import {
    getWeaponTags,
} from "../../common.js";

const assert = console.assert;


function getBaseValues(db, build, calcState) {
    assert(isObj(db));
    assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure

    assert(build instanceof Build);
    assert(calcState instanceof CalcState);

    const weaponRO = build.getWeaponObjRO();
    const tagset   = getWeaponTags(weaponRO.category);

    const allCurrentRampSkills = build.getRampSkills(db);
    assert(isArr(allCurrentRampSkills));

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

    let baseRaw      = weaponRO.attack;
    let baseAffinity = weaponRO.affinity;

    let baseEleStat = new Map(weaponRO.eleStat);

    let minSharpness = (tagset.has("melee")) ? weaponRO.baseSharpness : null; // TODO: Another weird naming thing. Fix this!
    let maxSharpness = (tagset.has("melee")) ? weaponRO.maxSharpness  : null;

    let baseDefense = weaponRO.defense;

    let rawPostTruncMul = 1;

    // Deferred operations go here
    const rDeferArr = [];

    // Define what all rampage skills do
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

            // We first add to the primary element
            assert(baseEleStat.size === 1);
            const tmp = new Map();
            for (const [primaryEleType, primaryEleValue] of baseEleStat.entries()) {
                tmp.set(primaryEleType, primaryEleValue + addToPrimaryElement);
            }
            baseEleStat = tmp;

            // Now, we add the secondary element
            baseEleStat.set(eleType, eleValue);
            assert(baseEleStat.size === 2);
        }
        rDeferArr.push(op); // Defer to last
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

        ["fire_1"   , ()=>{ rampSetEleStat("fire"   , 10);                 }],
        ["fire_2"   , ()=>{ rampSetEleStat("fire"   , 15);                 }],
        ["fire_3"   , ()=>{ rampSetEleStat("fire"   , 20); baseRaw += -5;  }],
        ["fire_4"   , ()=>{ rampSetEleStat("fire"   , 30); baseRaw += -10; }],
        ["water_1"  , ()=>{ rampSetEleStat("water"  , 10);                 }],
        ["water_2"  , ()=>{ rampSetEleStat("water"  , 15);                 }],
        ["water_3"  , ()=>{ rampSetEleStat("water"  , 20); baseRaw += -5;  }],
        ["water_4"  , ()=>{ rampSetEleStat("water"  , 30); baseRaw += -10; }],
        ["thunder_1", ()=>{ rampSetEleStat("thunder", 10);                 }],
        ["thunder_2", ()=>{ rampSetEleStat("thunder", 15);                 }],
        ["thunder_3", ()=>{ rampSetEleStat("thunder", 20); baseRaw += -5;  }],
        ["thunder_4", ()=>{ rampSetEleStat("thunder", 30); baseRaw += -10; }],
        ["ice_1"    , ()=>{ rampSetEleStat("ice"    , 10);                 }],
        ["ice_2"    , ()=>{ rampSetEleStat("ice"    , 15);                 }],
        ["ice_3"    , ()=>{ rampSetEleStat("ice"    , 20); baseRaw += -5;  }],
        ["ice_4"    , ()=>{ rampSetEleStat("ice"    , 30); baseRaw += -10; }],
        ["dragon_1" , ()=>{ rampSetEleStat("dragon" , 10);                 }],
        ["dragon_2" , ()=>{ rampSetEleStat("dragon" , 15);                 }],
        ["dragon_3" , ()=>{ rampSetEleStat("dragon" , 20); baseRaw += -5;  }],
        ["dragon_4" , ()=>{ rampSetEleStat("dragon" , 30); baseRaw += -10; }],
        ["poison_1"   , ()=>{ rampSetEleStat("poison"   , 10);                 }],
        ["poison_2"   , ()=>{ rampSetEleStat("poison"   , 20); baseRaw += -10; }],
        ["poison_3"   , ()=>{ rampSetEleStat("poison"   , 30); baseRaw += -20; }],
        ["paralysis_1", ()=>{ rampSetEleStat("paralysis", 10);                 }],
        ["paralysis_2", ()=>{ rampSetEleStat("paralysis", 15); baseRaw += -10; }],
        ["paralysis_3", ()=>{ rampSetEleStat("paralysis", 20); baseRaw += -20; }],
        ["sleep_1"    , ()=>{ rampSetEleStat("sleep"    , 10);                 }],
        ["sleep_2"    , ()=>{ rampSetEleStat("sleep"    , 12); baseRaw += -10; }],
        ["sleep_3"    , ()=>{ rampSetEleStat("sleep"    , 15); baseRaw += -20; }],
        ["blast_1"    , ()=>{ rampSetEleStat("blast"    , 10);                 }],
        ["blast_2"    , ()=>{ rampSetEleStat("blast"    , 15); baseRaw += -10; }],
        ["blast_3"    , ()=>{ rampSetEleStat("blast"    , 20); baseRaw += -20; }],

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

        ["attack_boost_1", ()=>{ baseRaw += 4;  }],
        ["attack_boost_2", ()=>{ baseRaw += 6;  }],
        ["attack_boost_3", ()=>{ baseRaw += 8;  }],
        ["attack_boost_4", ()=>{ baseRaw += 10; }],

        ["affinity_boost_1", ()=>{ baseAffinity += 4;  }],
        ["affinity_boost_2", ()=>{ baseAffinity += 6;  }],
        ["affinity_boost_3", ()=>{ baseAffinity += 8;  }],
        ["affinity_boost_4", ()=>{ baseAffinity += 10; }],

        ["elemental_boost_1", ()=>{ console.warn("NOT IMPLEMENTED"); }], /* I don't know exactly how this works. */
        ["elemental_boost_2", ()=>{ console.warn("NOT IMPLEMENTED"); }], /* Will it increase all elements? */
        ["elemental_boost_3", ()=>{ console.warn("NOT IMPLEMENTED"); }],

        ["defense_boost_1", ()=>{ baseDefense += 10; }],
        ["defense_boost_2", ()=>{ baseDefense += 20; }],
        ["defense_boost_3", ()=>{ baseDefense += 30; }],

        ["attack_surge"   , ()=>{ baseRaw += 20;
                                  baseAffinity += -30; }],
        ["elemental_surge", ()=>{ console.warn("NOT IMPLEMENTED"); }],
        ["affinity_surge" , ()=>{ baseRaw += -10;
                                  baseAffinity += 30; }],

        ["sharpness_type_1", ()=>{ console.warn("NOT IMPLEMENTED"); }],
        ["sharpness_type_2", ()=>{ console.warn("NOT IMPLEMENTED"); }],
        ["sharpness_type_3", ()=>{ console.warn("NOT IMPLEMENTED"); }],
        ["sharpness_type_4", ()=>{ console.warn("NOT IMPLEMENTED"); }],

        ["anti_aerial_species", ()=>{
            if (!rampSkillActive("Anti-Aerial Species (AAE)")) return;
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

        ["element_exploit"      , ()=>{ console.warn("NOT IMPLEMENTED"); }],
        ["fireblight_exploit"   , ()=>{ console.warn("NOT IMPLEMENTED"); }],
        ["iceblight_exploit"    , ()=>{ console.warn("NOT IMPLEMENTED"); }],
        ["small_monster_exploit", ()=>{ console.warn("NOT IMPLEMENTED"); }],
        ["thunderblight_exploit", ()=>{ console.warn("NOT IMPLEMENTED"); }],
        ["waterblight_exploit"  , ()=>{ console.warn("NOT IMPLEMENTED"); }],

        ["non_elemental_boost", ()=>{ rDeferArr.push(()=>{ if (baseEleStat.size === 0) baseRaw += 10; }); }],

        // MANY OTHER RAMPAGE SKILLS NOT YET IMPLEMENTED
    ]);

    // Warn if any rampage skill IDs are incorrect
    for (const rampSkillID of rampSkillOps.keys()) {
        if (!db.readonly.weaponRampSkills.longIdsMap.has(rampSkillID)) {
            console.warn("Rampage skill ID " + rampSkillID + " not present in the database.");
        }
    }

    // Process all rampage skills in the build
    for (const rampSkillRO of allCurrentRampSkills) {
        const op = rampSkillOps.get(rampSkillRO.id);
        if (op !== undefined) {
            op();
        }
    }
    // Process deferred operations
    for (const op of rDeferArr) {
        op();
    }

    const ret = {
        baseRaw,
        baseAffinity,

        baseEleStat,

        minSharpness,
        maxSharpness,

        baseDefense,

        rawPostTruncMul,
    };
    return ret;
}


export {getBaseValues};

