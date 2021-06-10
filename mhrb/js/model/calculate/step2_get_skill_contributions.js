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

const assert = console.assert;


/****************************************************************************************/
/*  Data  *******************************************************************************/
/****************************************************************************************/


const RAW_BLUNDER_DAMAGE_MULTIPLIER = 0.75;
const ELEMENTAL_BLUNDER_DAMAGE_MULTIPLIER = 1; // Nothing happens

const CRITICAL_BOOST_DAMAGE_MULTIPLIERS = [
    1.25, // Level 0
    1.30, // Level 1
    1.35, // Level 2
    1.40, // Level 3
];

const CRITICAL_ELEMENT_DAMAGE_MULTIPLIERS = [
    1.00, // Level 0
    1.05, // Level 0
    1.10, // Level 0
    1.15, // Level 0
];


/****************************************************************************************/
/****************************************************************************************/
/****************************************************************************************/

function getSkillContributions(db, build, calcState) {
    assert(isObj(db));
    assert(isMap(db.readonly.weapons.map.greatsword)); // Spot check for structure

    assert(build instanceof Build);
    assert(calcState instanceof CalcState);

    const allCurrentSkills = (()=>{
            // We'll need to clip skill levels to the maximum
            const unclippedCurrentSkills = build.getCurrentSkills();
            const clippedCurrentSkills = new Map();
            for (const [skillLongID, [skillRO, skillLevel]] of unclippedCurrentSkills.entries()) {
                const newLevel = Math.min(skillRO.maxLevels, skillLevel);
                clippedCurrentSkills.set(skillLongID, [skillRO, newLevel]);
            }
            return clippedCurrentSkills;
        })();
    assert(isMap(allCurrentSkills));

    const allCalcStateSpec = calcState.getSpecification();
    const allCalcState = calcState.getCurrState();

    // Defined for code readability. Returns whether a binary state is "on" or "off".
    function skillActive(stateLabel) {
        const presentations = allCalcStateSpec.get("Skill States").get(stateLabel).presentations;
        const numPossibleStates = presentations.length;
        assert(numPossibleStates === 2);
        const stateValue = allCalcState.get("Skill States").get(stateLabel);
        assert(isInt(stateValue) && (stateValue >= 0) && (stateValue < 2));
        return (stateValue === 1);
    }

    // Define variables we want to find

    let rawAdd = 0;
    let rawMul = 1;

    let affinityAdd = 0;

    let rawBlunderDamage  = RAW_BLUNDER_DAMAGE_MULTIPLIER;
    let rawCriticalDamage = CRITICAL_BOOST_DAMAGE_MULTIPLIERS[0];
    let elementalBlunderDamage  = ELEMENTAL_BLUNDER_DAMAGE_MULTIPLIER;
    let elementalCriticalDamage = CRITICAL_ELEMENT_DAMAGE_MULTIPLIERS[0];

    let handicraftLevel = 0;

    // Define what all skills do

    // TODO: Verify skill state labels?

    const skillOps = new Map([

        ["affinity_sliding", (lid, lvl)=>{
            if (!skillActive("Affinity Sliding (AFS)")) return;
            switch (lvl) {
                case 1: affinityAdd += 30; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["agitator", (lid, lvl)=>{
            if (!skillActive("Agitator (AGI)")) return;
            switch (lvl) {
                case 1: rawAdd +=  4; affinityAdd +=  3; break;
                case 2: rawAdd +=  8; affinityAdd +=  5; break;
                case 3: rawAdd += 12; affinityAdd +=  7; break;
                case 4: rawAdd += 16; affinityAdd += 10; break;
                case 5: rawAdd += 20; affinityAdd += 15; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["attack_boost", (lid, lvl)=>{
            switch (lid, lvl) {
                case 1: rawAdd +=  3; break;
                case 2: rawAdd +=  6; break;
                case 3: rawAdd +=  9; break;
                case 4: rawAdd +=  7; rawMul *= 1.05; break;
                case 5: rawAdd +=  8; rawMul *= 1.06; break;
                case 6: rawAdd +=  9; rawMul *= 1.08; break;
                case 7: rawAdd += 10; rawMul *= 1.10; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["critical_boost", (lid, lvl)=>{
            switch (lvl) {
                case 1: /* Fallthrough */
                case 2: /* Fallthrough */
                case 3: rawCriticalDamage = CRITICAL_BOOST_DAMAGE_MULTIPLIERS[lvl]; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["critical_draw", (lid, lvl)=>{
            if (!skillActive("Critical Draw (CDR)")) return;
            switch (lvl) {
                case 1: affinityAdd += 10; break;
                case 2: affinityAdd += 20; break;
                case 3: affinityAdd += 40; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["critical_element", (lid, lvl)=>{
            switch (lvl) {
                case 1: /* Fallthrough */
                case 2: /* Fallthrough */
                case 3: elementalCriticalDamage = CRITICAL_ELEMENT_DAMAGE_MULTIPLIERS[lvl]; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["critical_eye", (lid, lvl)=>{
            switch (lvl) {
                case 1: affinityAdd +=  5; break;
                case 2: affinityAdd += 10; break;
                case 3: affinityAdd += 15; break;
                case 4: affinityAdd += 20; break;
                case 5: affinityAdd += 25; break;
                case 6: affinityAdd += 30; break;
                case 7: affinityAdd += 40; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["dragonheart", (lid, lvl)=>{
            if (!skillActive("Dragonheart (DH)")) return;
            switch (lvl) {
                case 1: /* No Operation */ break;
                case 2: /* No Operation */ break;
                case 3: /* No Operation */ break;
                case 4: rawMul *= 1.05;    break; // TODO: Verify that this is what Dragonheart does
                case 5: rawMul *= 1.10;    break;
                default:
                    invalidLevel(lid);
            }
            // TODO: Implement elemental resistances.
            // TODO: Should Resuscitate also be active?
        }],

        ["handicraft", (lid, lvl)=>{
            handicraftLevel = lvl;
        }],

        ["peak_performance", (lid, lvl)=>{
            if (!skillActive("Peak Performance (PP)")) return;
            switch (lvl) {
                case 1: rawAdd +=  5; break;
                case 2: rawAdd += 10; break;
                case 3: rawAdd += 20; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["resentment", (lid, lvl)=>{
            if (!skillActive("Resentment (RES)")) return;
            switch (lvl) {
                case 1: rawAdd +=  5; break;
                case 2: rawAdd += 10; break;
                case 3: rawAdd += 15; break;
                case 3: rawAdd += 20; break;
                case 3: rawAdd += 25; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["resuscitate", (lid, lvl)=>{
            if (!skillActive("Resuscitate (RSC)")) return;
            switch (lvl) {
                case 1: rawAdd +=  5; break;
                case 2: rawAdd += 10; break;
                case 3: rawAdd += 20; break;
                default:
                    invalidLevel(lid);
            }
        }],

        ["weakness_exploit", (lid, lvl)=>{
            if (!skillActive("Weakness Exploit (WEX)")) return;
            switch (lvl) {
                case 1: affinityAdd += 15; break;
                case 2: affinityAdd += 30; break;
                case 3: affinityAdd += 50; break;
                default:
                    invalidLevel(lid);
            }
        }],

    ]);

    // Warn if any skill IDs are incorrect
    for (const skillLongID of skillOps.keys()) {
        if (!db.readonly.skills.longIdsMap.has(skillLongID)) {
            console.warn("Skill ID " + skillLongID + " not present in the database.");
        }
    }

    // Process all rampage skills in the build
    for (const [skillLongID, [skillRO, skillLevel]] of allCurrentSkills.entries()) {
        const op = skillOps.get(skillLongID);
        if (op !== undefined) {
            op(skillLongID, skillLevel);
        }
    }

    const ret = {
        rawAdd,
        rawMul,
        
        affinityAdd,

        rawBlunderDamage,
        rawCriticalDamage,
        elementalBlunderDamage,
        elementalCriticalDamage,

        handicraftLevel,
    };
    return ret;
}


function invalidLevel(skillID) {
    console.log("Invalid level for " + skillID);
}


export {getSkillContributions};

