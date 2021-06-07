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

        ["secondary_" + idPrefix + "_1", {
            shortId: shortIdPrefix + "s1",
            name: "Secondary " + name + " I",
        }],
        ["secondary_" + idPrefix + "_2", {
            shortId: shortIdPrefix + "s2",
            name: "Secondary " + name + " II",
        }],
        ["secondary_" + idPrefix + "_3", {
            shortId: shortIdPrefix + "s3",
            name: "Secondary " + name + " III",
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
        shortId: "atb1",
        name: "Attack Boost I",
    }],
    ["attack_boost_2", {
        shortId: "atb2",
        name: "Attack Boost II",
    }],
    ["attack_boost_3", {
        shortId: "atb3",
        name: "Attack Boost III",
    }],
    ["attack_boost_4", {
        shortId: "atb4",
        name: "Attack Boost IV",
    }],

    ["affinity_boost_1", {
        shortId: "afb1",
        name: "Affinity Boost I",
    }],
    ["affinity_boost_2", {
        shortId: "afb2",
        name: "Affinity Boost II",
    }],
    ["affinity_boost_3", {
        shortId: "afb3",
        name: "Affinity Boost III",
    }],
    ["affinity_boost_4", {
        shortId: "afb4",
        name: "Affinity Boost IV",
    }],

    ["elemental_boost_1", {
        shortId: "elb1",
        name: "Elemental Boost I",
    }],
    ["elemental_boost_2", {
        shortId: "elb2",
        name: "Elemental Boost II",
    }],
    ["elemental_boost_3", {
        shortId: "elb3",
        name: "Elemental Boost III",
    }],

    ["defense_boost_1", {
        shortId: "deb1",
        name: "Defense Boost I",
    }],
    ["defense_boost_2", {
        shortId: "deb2",
        name: "Defense Boost II",
    }],
    ["defense_boost_3", {
        shortId: "deb3",
        name: "Defense Boost III",
    }],

    ["sharpness_type_1", {
        shortId: "sht1",
        name: "Sharpness Type I",
    }],
    ["sharpness_type_2", {
        shortId: "sht2",
        name: "Sharpness Type II",
    }],
    ["sharpness_type_3", {
        shortId: "sht3",
        name: "Sharpness Type III",
    }],
    ["sharpness_type_4", {
        shortId: "sht4",
        name: "Sharpness Type IV",
    }],

    ["defense_grinder_1", {
        shortId: "deg1",
        name: "Defense Grinder I",
    }],
    ["defense_grinder_2", {
        shortId: "deg2",
        name: "Defense Grinder II",
    }],

    ["attack_surge", {
        shortId: "atsu",
        name: "Attack Surge",
    }],
    ["elemental_surge", {
        shortId: "elsu",
        name: "Elemental Surge",
    }],
    ["affinity_surge", {
        shortId: "afsu",
        name: "Affinity Surge",
    }],

    ["anti_aerial_species", {
        shortId: "anae",
        name: "Anti-Aerial Species",
    }],
    ["anti_aquatic_species", {
        shortId: "anaq",
        name: "Anti-Aquatic Species",
    }],

    ["element_exploit", {
        shortId: "xele",
        name: "Element Exploit",
    }],
    ["fireblight_exploit", {
        shortId: "xfib",
        name: "Fireblight Exploit",
    }],
    ["iceblight_exploit", {
        shortId: "xicb",
        name: "Iceblight Exploit",
    }],
    ["small_monster_exploit", {
        shortId: "xsm",
        name: "Small Monster Exploit",
    }],
    ["thunderblight_exploit", {
        shortId: "xthb",
        name: "Thunderblight Exploit",
    }],
    ["waterblight_exploit", {
        shortId: "xwab",
        name: "Waterblight Exploit",
    }],
    ["wyvern_exploit", {
        shortId: "xwyv",
        name: "Wyvern Exploit",
    }],

    ["chameleos_soul", {
        shortId: "chas",
        name: "Chameleos Soul",
    }],
    ["ibushi_soul", {
        shortId: "ibus",
        name: "Magnamalo Soul",
    }],
    ["kushala_daora_soul", {
        shortId: "kuss",
        name: "Kushala Daora Soul",
    }],
    ["magnamalo_soul", {
        shortId: "mags",
        name: "Magnamalo Soul",
    }],
    ["narwa_soul", {
        shortId: "nars",
        name: "Narwa Soul",
    }],
    ["teostra_soul", {
        shortId: "teos",
        name: "Teostra Soul",
    }],
    ["valstrax_soul", {
        shortId: "vals",
        name: "Valstrax Soul",
    }],

    ["buddy_rally", {
        shortId: "10",
        name: "Buddy Rally",
    }],
    ["brutal_strike", {
        shortId: "20",
        name: "Brutal Strike",
    }],
    ["dulling_strike", {
        shortId: "30",
        name: "Dulling Strike",
    }],
    ["hellion_mode", {
        shortId: "40",
        name: "Hellion Mode",
    }],
    ["lasting_arc_shot", {
        shortId: "50",
        name: "Lasting Arc Shot",
    }],
    ["master_rider", {
        shortId: "60",
        name: "Master Rider",
    }],
    ["non_elemental_boost", {
        shortId: "70",
        name: "Non-elemental Boost",
    }],
    ["silkbind_boost", {
        shortId: "80",
        name: "Silkbind Boost",
    }],
    ["spiribird_doubled", {
        shortId: "90",
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

