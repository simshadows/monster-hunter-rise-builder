/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type MHRDatabase,
} from "../../database";
import {
    type ElementStr,
    isStatStr,
    isEleStatStr,
    type Skill,
} from "../../common/types";

import {Build} from "../build";
import {CalcState} from "../calc_state";

import {
    type EleStatObj,
    type SkillContributions
} from "./_common";


const assert = console.assert;

type RO4TupleNumbers = Readonly<[number, number, number, number]>;
type SkillLevelsMap = Map<string, [Skill, number]>;


const RAW_BLUNDER_DAMAGE_MULTIPLIER = 0.75;
const ELEMENTAL_BLUNDER_DAMAGE_MULTIPLIER = 1; // Nothing happens

const CRITICAL_BOOST_DAMAGE_MULTIPLIERS: RO4TupleNumbers = [
    1.25, // Level 0
    1.30, // Level 1
    1.35, // Level 2
    1.40, // Level 3
];

const CRITICAL_ELEMENT_DAMAGE_MULTIPLIERS: RO4TupleNumbers = [
    1.00, // Level 0
    1.05, // Level 1
    1.10, // Level 2
    1.15, // Level 3
];


function getInitialSkillContributions(): SkillContributions {
    return {
        rawAdd:          0,
        rawMul:          1,
        rawPostTruncMul: 1,
        
        affinityAdd: 0,

        eleStatAdd: {
            fire:      0,
            water:     0,
            thunder:   0,
            ice:       0,
            dragon:    0,

            poison:    0,
            paralysis: 0,
            sleep:     0,
            blast:     0,
        },
        eleStatMul: {
            fire:      1,
            water:     1,
            thunder:   1,
            ice:       1,
            dragon:    1,

            poison:    1,
            paralysis: 1,
            sleep:     1,
            blast:     1,
        },

        rawBlunderDamage:        RAW_BLUNDER_DAMAGE_MULTIPLIER,
        rawCriticalDamage:       CRITICAL_BOOST_DAMAGE_MULTIPLIERS[0],
        elementalBlunderDamage:  ELEMENTAL_BLUNDER_DAMAGE_MULTIPLIER,
        elementalCriticalDamage: CRITICAL_ELEMENT_DAMAGE_MULTIPLIERS[0],

        ammoUpLevel:        0,
        bludgeonerLevel:    0,
        bowChargePlusLevel: 0,
        handicraftLevel:    0,
        mastersTouchLevel:  0,
        razorSharpLevel:    0,
        recoilDownLevel:    0,
        reloadSpeedLevel:   0,
        steadinessLevel:    0,

        defenseAdd: 0,
        defenseMul: 1,
        eleResAdd: {
            fire:    0,
            water:   0,
            thunder: 0,
            ice:     0,
            dragon:  0,
        },
    };
}


// Clips skill levels to the maximum
function getClippedSkillsMap(build: Build): SkillLevelsMap {
    const unclippedSkills = build.getCurrentSkills();
    const clippedSkills = new Map();
    for (const [skillLongID, [skillRO, skillLevel]] of unclippedSkills.entries()) {
        const newLevel = Math.min(skillRO.maxLevels, skillLevel);
        clippedSkills.set(skillLongID, [skillRO, newLevel]);
    }
    return clippedSkills;
}


// No operation
// (All skills that intentionally do not have any operations attached to them will
// use this function.)
function nop(skillLevel: number, skillID: string): void {
    skillID;
    console.assert((skillLevel % 1 === 0) && (skillLevel > 0));
    // Do nothing
}


function getSkillContributions(
    db:        {"readonly": MHRDatabase},
    build:     Build,
    calcState: CalcState,
): SkillContributions {
    const v: SkillContributions = getInitialSkillContributions();
    const allCurrentSkills: SkillLevelsMap = getClippedSkillsMap(build);

    // TODO: Verify skill state labels?

    function addToAllEleRes(x: number): void {
        // TODO: Refactor this to either use optional keys or a constructor function.
        const newEleResAdd: EleStatObj = {
            fire:    0,
            water:   0,
            thunder: 0,
            ice:     0,
            dragon:  0,
            
            poison:    0,
            paralysis: 0,
            sleep:     0,
            blast:     0,
        };
        for (const [eleType, eleResValue] of Object.entries(v.eleResAdd)) {
            // TODO: Refactor this so we no longer need the type predicate.
            if (!isEleStatStr(eleType)) {
                console.error("Expected an element/status type string.");
                continue;
            }
            newEleResAdd[eleType] = eleResValue + x;
        }
        v.eleResAdd = newEleResAdd;
    }

    function generateElementalOps(): [string, (lvl: number, lid: string) => void][] { // TODO: why does return type need arg names?
        const genOps: [string, (lvl: number, lid: string) => void][] = [];
        const eleIDs: ElementStr[] = ["fire", "water", "thunder", "ice", "dragon"];
        // TODO: Make this version work?
        //for (const eleID of ["fire", "water", "thunder", "ice", "dragon"]) {
        for (const eleID of eleIDs) {
            genOps.push(
                [eleID + "_attack", (lvl: number, lid: string)=>{
                    switch (lvl) {
                        case 1: v.eleStatAdd[eleID] += 2; break;
                        case 2: v.eleStatAdd[eleID] += 3; break;
                        case 3: v.eleStatAdd[eleID] += 4; v.eleStatMul[eleID] *= 1.05; break;
                        case 4: v.eleStatAdd[eleID] += 4; v.eleStatMul[eleID] *= 1.10; break;
                        case 5: v.eleStatAdd[eleID] += 4; v.eleStatMul[eleID] *= 1.20; break;
                        default:
                            invalidLevel(lid);
                    }
                }],
            );
            genOps.push(
                [eleID + "_resistance", (lvl: number, lid: string)=>{
                    switch (lvl) {
                        case 1: v.eleResAdd[eleID] += 6; break;
                        case 2: v.eleResAdd[eleID] += 12; break;
                        case 3: v.eleResAdd[eleID] += 20; v.defenseAdd += 10; break;
                        default:
                            invalidLevel(lid);
                    }
                }],
            );
        }
        return genOps;
    }
    function generateStatusOps(): [string, (lvl: number, lid: string) => void][] { // TODO: why does return type need arg names?
        const genOps: [string, (lvl: number, lid: string) => void][] = [];
        for (const statID of ["poison", "paralysis", "sleep", "blast"]) {
            // TODO: Remove the type predicate.
            if (!isStatStr(statID)) throw new Error("statID must be a status ID string.");
            genOps.push(
                [statID + "_attack", (lvl: number, lid: string)=>{
                    switch (lvl) {
                        case 1: v.eleStatAdd[statID] += 1; v.eleStatMul[statID] *= 1.05; break;
                        case 2: v.eleStatAdd[statID] += 2; v.eleStatMul[statID] *= 1.10; break;
                        case 3: v.eleStatAdd[statID] += 5; v.eleStatMul[statID] *= 1.20; break;
                        default:
                            invalidLevel(lid);
                    }
                }],
            );
            genOps.push(
                [statID + "_resistance", nop],
            );
        }
        return genOps;
    }

    const skillOps: Map<string, (lvl: number, lid: string) => void> = new Map([ // TODO: Why do we need arg names?
    //const skillOps = new Map([

        //
        // COMMON ELEMENTAL/STATUS SKILLS
        // (X Attack and X Resistance)
        //
        
        ...generateElementalOps(),
        ...generateStatusOps(),

        //
        // EVERYTHING ELSE
        //

        ["affinity_sliding", (lvl, lid)=>{
            if (!calcState.skillIsActive("Affinity Sliding (AFS)")) return;
            switch (lvl) {
                case 1: v.affinityAdd += 30; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["agitator", (lvl, lid)=>{
            if (!calcState.skillIsActive("Agitator (AGI)")) return;
            switch (lvl) {
                case 1: v.rawAdd +=  4; v.affinityAdd +=  3; break;
                case 2: v.rawAdd +=  8; v.affinityAdd +=  5; break;
                case 3: v.rawAdd += 12; v.affinityAdd +=  7; break;
                case 4: v.rawAdd += 16; v.affinityAdd += 10; break;
                case 5: v.rawAdd += 20; v.affinityAdd += 15; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["ammo_up", (lvl)=>{
            v.ammoUpLevel = lvl;
        }],

        ["attack_boost", (lvl, lid)=>{
            switch (lvl) {
                case 1: v.rawAdd +=  3; break;
                case 2: v.rawAdd +=  6; break;
                case 3: v.rawAdd +=  9; break;
                case 4: v.rawAdd +=  7; v.rawMul *= 1.05; break;
                case 5: v.rawAdd +=  8; v.rawMul *= 1.06; break;
                case 6: v.rawAdd +=  9; v.rawMul *= 1.08; break;
                case 7: v.rawAdd += 10; v.rawMul *= 1.10; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["blight_resistance", nop],

        ["bludgeoner", (lvl)=>{
            v.bludgeonerLevel = lvl;
        }],

        ["botanist", nop],

        ["bow_charge_plus", (lvl)=>{
            assert(v.bowChargePlusLevel === 0);
            assert(lvl === 1);
            v.bowChargePlusLevel = 1;
        }],

        ["bubbly_dance", nop],
        ["capture_master", nop],
        ["carving_master", nop],
        ["carving_pro", nop],
        ["constitution", nop],
        
        ["counterstrike", (lvl, lid)=>{
            if (!calcState.skillIsActive("Counterstrike (CS)")) return;
            switch (lvl) {
                case 1: v.rawAdd += 10; break;
                case 2: v.rawAdd += 15; break;
                case 3: v.rawAdd += 25; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["critical_boost", (lvl, lid)=>{
            switch (lvl) {
                case 1: /* Fallthrough */
                case 2: /* Fallthrough */
                case 3: v.rawCriticalDamage = CRITICAL_BOOST_DAMAGE_MULTIPLIERS[lvl]; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["critical_draw", (lvl, lid)=>{
            if (!calcState.skillIsActive("Critical Draw (CD)")) return;
            switch (lvl) {
                case 1: v.affinityAdd += 10; break;
                case 2: v.affinityAdd += 20; break;
                case 3: v.affinityAdd += 40; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["critical_element", (lvl, lid)=>{
            switch (lvl) {
                case 1: /* Fallthrough */
                case 2: /* Fallthrough */
                case 3: v.elementalCriticalDamage = CRITICAL_ELEMENT_DAMAGE_MULTIPLIERS[lvl]; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["critical_eye", (lvl, lid)=>{
            switch (lvl) {
                case 1: v.affinityAdd +=  5; break;
                case 2: v.affinityAdd += 10; break;
                case 3: v.affinityAdd += 15; break;
                case 4: v.affinityAdd += 20; break;
                case 5: v.affinityAdd += 25; break;
                case 6: v.affinityAdd += 30; break;
                case 7: v.affinityAdd += 40; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["defense_boost", (lvl, lid)=>{
            switch (lvl) {
                case 1: v.defenseAdd +=  5; break;
                case 2: v.defenseAdd += 10; break;
                case 3: v.defenseAdd += 10; v.defenseMul += 1.05; break;
                case 4: v.defenseAdd += 20; v.defenseMul += 1.05; addToAllEleRes(3); break;
                case 5: v.defenseAdd += 20; v.defenseMul += 1.08; addToAllEleRes(3); break;
                case 6: v.defenseAdd += 35; v.defenseMul += 1.08; addToAllEleRes(5); break;
                case 7: v.defenseAdd += 35; v.defenseMul += 1.10; addToAllEleRes(5); break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["diversion", nop],

        ["dragonheart", (lvl, lid)=>{
            if (!calcState.skillIsActive("Dragonheart (DH)")) return;
            switch (lvl) {
                case 1: /* No Operation */ break;
                case 2: /* No Operation */ break;
                case 3: /* No Operation */ break;
                case 4: v.rawMul *= 1.05;    break; // TODO: Verify that this is what Dragonheart does
                case 5: v.rawMul *= 1.10;    break;
                default:
                    invalidLevel(lid);
            }
            // TODO: Implement elemental resistances.
            // TODO: Should Resuscitate also be active?
        }],

        ["earplugs", nop],
        ["evade_extender", nop],
        ["evade_window", nop],
        ["flinch_free", nop],
        ["focus", nop],
        ["free_meal", nop],

        ["fortify", (lvl)=>{
            assert(lvl === 1); // Binary skill
            const fortifyState = calcState.getSkillState("Fortify (FOR)");
            assert(fortifyState >= 0); // Non-binary state
            switch (fortifyState) {
                case 0: /* No Operation */ break;
                case 1: v.rawMul *= 1.10; v.defenseMul *= 1.15; break;
                case 2: v.rawMul *= 1.20; v.defenseMul *= 1.30; break;
                default:
                    invalidState("Fortify (FOR)");
            }
        }],

        ["geologist", nop],
        ["good_luck", nop],
        ["guard", nop],
        ["guard_up", nop],

        ["handicraft", (lvl)=>{
            v.handicraftLevel = lvl;
        }],

        ["heroics", (lvl, lid)=>{
            if (!calcState.skillIsActive("Heroics (HER)")) return;
            switch (lvl) {
                case 1: v.defenseAdd +=  50;                 break;
                case 2: v.defenseAdd +=  50; v.rawMul *= 1.05; break;
                case 3: v.defenseAdd += 100; v.rawMul *= 1.05; break;
                case 4: v.defenseAdd += 100; v.rawMul *= 1.10; break;
                case 5: v.rawMul *= 1.30; break; // TODO: "defense-increasing effects are negated." I'll need to implement this.
                default:
                    invalidLevel(lid);
            }
        }],

        ["hunger_resistance", nop],
        ["item_prolonger", nop],
        ["jump_master", nop],
        ["leap_of_faith", nop],

        ["kushala_blessing", (lvl, lid)=>{
            switch (lvl) {
                case 1: v.eleStatMul["water"] *= 1.05; v.eleStatMul["ice"] *= 1.05; break;
                case 2: /* Fallthrough */
                case 3: /* Fallthrough */
                case 4: v.eleStatMul["water"] *= 1.10; v.eleStatMul["ice"] *= 1.10; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["latent_power", (lvl, lid)=>{
            if (!calcState.skillIsActive("Latent Power (LP)")) return;
            switch (lvl) {
                case 1: v.affinityAdd += 10; break;
                case 2: v.affinityAdd += 20; break;
                case 3: v.affinityAdd += 30; break;
                case 4: v.affinityAdd += 40; break;
                case 5: v.affinityAdd += 50; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["load_shells", nop],
        ["marathon_runner", nop],
        ["master_mounter", nop],

        ["masters_touch", (lvl)=>{
            v.mastersTouchLevel = lvl;
        }],

        ["maximum_might", (lvl, lid)=>{
            if (!calcState.skillIsActive("Maximum Might (MM)")) return;
            switch (lvl) {
                case 1: v.affinityAdd += 10; break;
                case 2: v.affinityAdd += 20; break;
                case 3: v.affinityAdd += 30; break;
                default:
                    invalidLevel(lid);
            }
        }],
        
        ["minds_eye", (lvl, lid)=>{
            if (!calcState.skillIsActive("Mind's Eye (ME)")) return;
            switch (lvl) {
                case 1: v.rawPostTruncMul *= 1.10; break;
                case 2: v.rawPostTruncMul *= 1.15; break;
                case 3: v.rawPostTruncMul *= 1.30; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["muck_resistance", nop],
        ["mushroomancer", nop],

        ["offensive_guard", (lvl, lid)=>{
            if (!calcState.skillIsActive("Offensive Guard (OG)")) return;
            switch (lvl) {
                case 1: v.rawMul *= 1.05; break;
                case 2: v.rawMul *= 1.10; break;
                case 3: v.rawMul *= 1.15; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["partbreaker", nop],

        ["peak_performance", (lvl, lid)=>{
            if (!calcState.skillIsActive("Peak Performance (PP)")) return;
            switch (lvl) {
                case 1: v.rawAdd +=  5; break;
                case 2: v.rawAdd += 10; break;
                case 3: v.rawAdd += 20; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["protective_polish", nop],

        ["punishing_draw", (lvl, lid)=>{
            if (!calcState.skillIsActive("Punishing Draw (PD)")) return;
            switch (lvl) {
                case 1: v.rawAdd += 2; break; // TODO: Also factor in extra stun damage?
                case 2: v.rawAdd += 5; break;
                case 3: v.rawAdd += 7; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["quick_sheath", nop],

        ["razor_sharp", (lvl)=>{
            v.razorSharpLevel = lvl;
        }],

        ["recoil_down", (lvl)=>{
            v.recoilDownLevel = lvl;
        }],

        ["recovery_speed", nop],
        ["recovery_up", nop],

        ["reload_speed", (lvl)=>{
            v.reloadSpeedLevel = lvl;
        }],

        ["resentment", (lvl, lid)=>{
            if (!calcState.skillIsActive("Resentment (RES)")) return;
            switch (lvl) {
                case 1: v.rawAdd +=  5; break;
                case 2: v.rawAdd += 10; break;
                case 3: v.rawAdd += 15; break;
                case 3: v.rawAdd += 20; break;
                case 3: v.rawAdd += 25; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["resuscitate", (lvl, lid)=>{
            if (!calcState.skillIsActive("Resuscitate (RSC)")) return;
            switch (lvl) {
                case 1: v.rawAdd +=  5; break;
                case 2: v.rawAdd += 10; break;
                case 3: v.rawAdd += 20; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["speed_eating", nop],
        ["speed_sharpening", nop],
        ["stamina_surge", nop],

        ["steadiness", (lvl)=>{
            v.steadinessLevel = lvl;
        }],

        ["stun_resistance", nop],

        ["teostra_blessing", (lvl, lid)=>{
            switch (lvl) {
                case 1: v.eleStatMul["fire"] *= 1.05; v.eleStatMul["blast"] *= 1.05; break;
                case 2: /* Fallthrough */
                case 3: /* Fallthrough */
                case 4: v.eleStatMul["fire"] *= 1.10; v.eleStatMul["blast"] *= 1.10; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["tremor_resistance", nop],
        ["wall_runner", nop],

        ["weakness_exploit", (lvl, lid)=>{
            if (!calcState.skillIsActive("Weakness Exploit (WEX)")) return;
            switch (lvl) {
                case 1: v.affinityAdd += 15; break;
                case 2: v.affinityAdd += 30; break;
                case 3: v.affinityAdd += 50; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["wide_range", nop],
        ["windproof", nop],
        ["wirebug_whisperer", nop],
    ]);

    // Warn if any skill IDs are incorrect
    for (const skillLongID of skillOps.keys()) {
        if (!db.readonly.skills.longIdsMap.has(skillLongID)) {
            console.warn("Skill ID " + skillLongID + " not present in the database.");
        }
    }
    // Warn if any skill IDs are not implemented.
    // (Uncomment when you need to check what skills aren't implemented. Recomment where possible because it's noisy.)
    //for (const skillLongID of db.readonly.skills.longIdsMap.keys()) {
    //    if (!skillOps.has(skillLongID)) {
    //        console.warn("Skill ID " + skillLongID + " not implemented in calculation.");
    //    }
    //}

    // Process all rampage skills in the build
    for (const [skillLongID, [_, skillLevel]] of allCurrentSkills.entries()) {
        const op = skillOps.get(skillLongID);
        if (op !== undefined) {
            op(skillLevel, skillLongID);
        }
    }

    return v;
}


function invalidLevel(skillID: string): void {
    console.warn("Invalid level for " + skillID);
}
function invalidState(stateName: string): void {
    console.warn("Invalid state for " + stateName);
}


export {getSkillContributions};

