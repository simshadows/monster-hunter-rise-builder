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

    ["shelling_normal_1", {
        shortId: "shn1",
        name: "Shelling: Normal I",
    }],
    ["shelling_normal_2", {
        shortId: "shn2",
        name: "Shelling: Normal II",
    }],
    ["shelling_normal_3", {
        shortId: "shn3",
        name: "Shelling: Normal III",
    }],
    ["shelling_long_1", {
        shortId: "shl1",
        name: "Shelling: Long I",
    }],
    ["shelling_long_2", {
        shortId: "shl2",
        name: "Shelling: Long II",
    }],
    ["shelling_long_3", {
        shortId: "shl3",
        name: "Shelling: Long III",
    }],
    ["shelling_wide_1", {
        shortId: "shw1",
        name: "Shelling: Wide I",
    }],
    ["shelling_wide_2", {
        shortId: "shw2",
        name: "Shelling: Wide II",
    }],
    ["shelling_wide_3", {
        shortId: "shw3",
        name: "Shelling: Wide III",
    }],

    ["attack_melody_1", {
        shortId: "mea1",
        name: "Attack Melody I",
    }],
    ["attack_melody_2", {
        shortId: "mea2",
        name: "Attack Melody II",
    }],
    ["defensive_melody_1", {
        shortId: "med1",
        name: "Defensive Melody I",
    }],
    ["defensive_melody_2", {
        shortId: "med2",
        name: "Defensive Melody II",
    }],
    ["healing_melody_1", {
        shortId: "meh1",
        name: "Healing Melody I",
    }],
    ["healing_melody_2", {
        shortId: "meh2",
        name: "Healing Melody II",
    }],
    ["resilient_melody_1", {
        shortId: "mer1",
        name: "Resilient Melody I",
    }],
    ["resilient_melody_2", {
        shortId: "mer2",
        name: "Resilient Melody II",
    }],

    //["phial_power", {
    //    shortId: "phpow",
    //    name: "Phial: Power",
    //}],
    ["phial_element", {
        shortId: "phele",
        name: "Phial: Element",
    }],
    ["phial_poison_1", {
        shortId: "phpo1",
        name: "Phial: Poison I",
    }],
    ["phial_poison_2", {
        shortId: "phpo2",
        name: "Phial: Poison II",
    }],
    ["phial_poison_3", {
        shortId: "phpo3",
        name: "Phial: Poison III",
    }],
    ["phial_paralysis_1", {
        shortId: "phpa1",
        name: "Phial: Paralysis I",
    }],
    ["phial_paralysis_2", {
        shortId: "phpa2",
        name: "Phial: Paralysis II",
    }],
    ["phial_paralysis_3", {
        shortId: "phpa3",
        name: "Phial: Paralysis III",
    }],
    ["phial_dragon_1", {
        shortId: "phdr1",
        name: "Phial: Dragon I",
    }],
    ["phial_dragon_2", {
        shortId: "phdr2",
        name: "Phial: Dragon II",
    }],
    ["phial_dragon_3", {
        shortId: "phdr3",
        name: "Phial: Dragon III",
    }],
    ["phial_exhaust_1", {
        shortId: "phex1",
        name: "Phial: Exhaust I",
    }],
    ["phial_exhaust_2", {
        shortId: "phex2",
        name: "Phial: Exhaust II",
    }],
    ["phial_exhaust_3", {
        shortId: "phex3",
        name: "Phial: Exhaust III",
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

    ["boost_equipped_coating", {
        shortId: "10",
        name: "Boost Equipped Coating",
    }],
    ["brutal_strike", {
        shortId: "20",
        name: "Brutal Strike",
    }],
    ["buddy_rally", {
        shortId: "30",
        name: "Buddy Rally",
    }],
    ["coating_switch_boost", {
        shortId: "40",
        name: "Coating Switch Boost",
    }],
    ["dulling_strike", {
        shortId: "50",
        name: "Dulling Strike",
    }],
    ["hellion_mode", {
        shortId: "60",
        name: "Hellion Mode",
    }],
    ["lasting_arc_shot", {
        shortId: "70",
        name: "Lasting Arc Shot",
    }],
    ["master_rider", {
        shortId: "80",
        name: "Master Rider",
    }],
    ["maximum_volume", {
        shortId: "90",
        name: "Maximum Volume",
    }],
    ["non_elemental_boost", {
        shortId: "100",
        name: "Non-elemental Boost",
    }],
    ["silkbind_boost", {
        shortId: "110",
        name: "Silkbind Boost",
    }],
    ["spiribird_doubled", {
        shortId: "120",
        name: "Spiribird Doubled",
    }],
    ["wyrmstake_boost", {
        shortId: "130",
        name: "Wyrmstake Boost",
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

