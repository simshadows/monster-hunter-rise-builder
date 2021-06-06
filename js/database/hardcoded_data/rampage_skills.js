/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isObj,
    isInt,
    isStr,
    isNonEmptyStr,
    assert,
} from "../../check.js";


function generateEle(name, shortIdPrefix) {
    const idPrefix = name.toLowerCase();
    return [
        [idPrefix + "_boost_1", {
            shortId: shortIdPrefix + "b1",
            name: name + " Boost I",
        }],
        [idPrefix + "_boost_2", {
            shortId: shortIdPrefix + "b2",
            name: name + " Boost II",
        }],
        [idPrefix + "_boost_3", {
            shortId: shortIdPrefix + "b3",
            name: name + " Boost III",
        }],
        [idPrefix + "_boost_4", {
            shortId: shortIdPrefix + "b4",
            name: name + " Boost IV",
        }],

        [idPrefix + "_1", {
            shortId: shortIdPrefix + "x1",
            name: name + " I",
        }],
        [idPrefix + "_2", {
            shortId: shortIdPrefix + "x2",
            name: name + " II",
        }],
        [idPrefix + "_3", {
            shortId: shortIdPrefix + "x3",
            name: name + " III",
        }],
        [idPrefix + "_4", {
            shortId: shortIdPrefix + "x4",
            name: name + " IV",
        }],
    ];
}

function generateStat(name, shortIdPrefix) {
    const idPrefix = name.toLowerCase();
    return [
        [idPrefix + "_boost_1", {
            shortId: shortIdPrefix + "b1",
            name: name + " Boost I",
        }],
        [idPrefix + "_boost_2", {
            shortId: shortIdPrefix + "b2",
            name: name + " Boost II",
        }],
        [idPrefix + "_boost_3", {
            shortId: shortIdPrefix + "b3",
            name: name + " Boost III",
        }],

        [idPrefix + "_1", {
            shortId: shortIdPrefix + "x1",
            name: name + " I",
        }],
        [idPrefix + "_2", {
            shortId: shortIdPrefix + "x2",
            name: name + " II",
        }],
        [idPrefix + "_3", {
            shortId: shortIdPrefix + "x3",
            name: name + " III",
        }],
    ];
}

const hardcodedRampageSkills = [

    ["attack_boost_1", {
        shortId: "10",
        name: "Attack Boost I",
    }],
    ["attack_boost_2", {
        shortId: "20",
        name: "Attack Boost II",
    }],
    ["attack_boost_3", {
        shortId: "30",
        name: "Attack Boost III",
    }],
    ["attack_boost_4", {
        shortId: "40",
        name: "Attack Boost IV",
    }],

    ["affinity_boost_1", {
        shortId: "50",
        name: "Affinity Boost I",
    }],
    ["affinity_boost_2", {
        shortId: "60",
        name: "Affinity Boost II",
    }],
    ["affinity_boost_3", {
        shortId: "70",
        name: "Affinity Boost III",
    }],
    ["affinity_boost_4", {
        shortId: "80",
        name: "Affinity Boost IV",
    }],

    ["elemental_boost_1", {
        shortId: "90",
        name: "Elemental Boost I",
    }],
    ["elemental_boost_2", {
        shortId: "100",
        name: "Elemental Boost II",
    }],
    ["elemental_boost_3", {
        shortId: "110",
        name: "Elemental Boost III",
    }],

    ["defense_boost_1", {
        shortId: "120",
        name: "Defense Boost I",
    }],
    ["defense_boost_2", {
        shortId: "130",
        name: "Defense Boost II",
    }],
    ["defense_boost_3", {
        shortId: "140",
        name: "Defense Boost III",
    }],

    ["sharpness_type_1", {
        shortId: "150",
        name: "Sharpness Type I",
    }],
    ["sharpness_type_2", {
        shortId: "160",
        name: "Sharpness Type II",
    }],
    ["sharpness_type_3", {
        shortId: "170",
        name: "Sharpness Type III",
    }],

    ["defense_grinder_1", {
        shortId: "180",
        name: "Defense Grinder I",
    }],

    ["attack_surge", {
        shortId: "190",
        name: "Attack Surge",
    }],
    ["elemental_surge", {
        shortId: "200",
        name: "Elemental Surge",
    }],
    ["affinity_surge", {
        shortId: "210",
        name: "Affinity Surge",
    }],

    ["anti_aquatic_species", {
        shortId: "220",
        name: "Anti-Aquatic Species",
    }],

    ["fireblight_exploit", {
        shortId: "230",
        name: "Fireblight Exploit",
    }],
    ["waterblight_exploit", {
        shortId: "240",
        name: "Waterblight Exploit",
    }],

    ["teostra_soul", {
        shortId: "250",
        name: "Teostra Soul",
    }],

    ["buddy_rally", {
        shortId: "260",
        name: "Buddy Rally",
    }],
    ["brutal_strike", {
        shortId: "270",
        name: "Brutal Strike",
    }],
    ["dulling_strike", {
        shortId: "280",
        name: "Dulling Strike",
    }],
    ["lasting_arc_shot", {
        shortId: "290",
        name: "Lasting Arc Shot",
    }],
    ["master_rider", {
        shortId: "300",
        name: "Master Rider",
    }],
    ["non_elemental_boost", {
        shortId: "310",
        name: "Non-elemental Boost",
    }],
    ["spiribird_doubled", {
        shortId: "320",
        name: "Spiribird Doubled",
    }],

];

// TODO: Verify no ID collisons?
const tmpArray = [
    ...hardcodedRampageSkills,
    ...generateEle("Fire"      , "fi"),
    ...generateEle("Water"     , "wa"),
    ...generateEle("Thunder"   , "th"),
    ...generateEle("Ice"       , "ic"),
    ...generateEle("Dragon"    , "dr"),
    ...generateStat("Poison"   , "po"),
    ...generateStat("Paralysis", "pa"),
    ...generateStat("Sleep"    , "sl"),
    ...generateStat("Blast"    , "bl"),
];

// Now, we populate these maps.
const rampageSkillsMap = new Map();
const rampageSkillsMapShortIds = new Map();
//const rampageSkillsShortToLongIds = new Map();

// For convenience, we also attach IDs to each object
for (const [rampSkillID, rampSkillObj] of tmpArray) {
    rampSkillObj.id = rampSkillID;

    //
    // Validate
    //

    assert(isNonEmptyStr(rampSkillObj.id),      "Ramp skills must have IDs.");
    assert(isNonEmptyStr(rampSkillObj.shortId), "Ramp skills must have alternative short IDs. Skill ID: " + rampSkillObj.id);
    assert(isNonEmptyStr(rampSkillObj.name),    "Ramp skills must have names. Skill ID: " + rampSkillObj.id);

    // And now, we check for duplicates and add

    assert(!(rampageSkillsMap.has(rampSkillObj.id)), "Duplicate ramp skill ID: " + rampSkillObj.id);
    assert(!(rampageSkillsMapShortIds.has(rampSkillObj.ShortId)), "Duplicate ramp skill short ID: " + rampSkillObj.id);

    rampageSkillsMap.set(rampSkillObj.id, rampSkillObj);
    rampageSkillsMapShortIds.set(rampSkillObj.shortId, rampSkillObj);

    //rampageSkillsShortToLongIds.set(rampSkillObj.shortId, rampSkillObj.id);
}


export {
    rampageSkillsMap,
    rampageSkillsMapShortIds,
    //rampageSkillsShortToLongIds,
};

