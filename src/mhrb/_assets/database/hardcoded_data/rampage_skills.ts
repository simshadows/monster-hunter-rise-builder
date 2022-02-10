/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    FrozenMap,
} from "../../generic/frozen-containers";

import {
    type RampageSkillRO,
} from "../../common/types";

function generateEle(name: string, shortIdPrefix: string): RampageSkillRO[] {
    console.assert(name !== "");
    console.assert(shortIdPrefix !== "");

    const idPrefix = name.toLowerCase();
    return [
        {
            id: idPrefix + "_boost_1",
            shortId: shortIdPrefix + "b1",
            name: name + " Boost I",
        },
        {
            id: idPrefix + "_boost_2",
            shortId: shortIdPrefix + "b2",
            name: name + " Boost II",
        },
        {
            id: idPrefix + "_boost_3",
            shortId: shortIdPrefix + "b3",
            name: name + " Boost III",
        },
        {
            id: idPrefix + "_boost_4",
            shortId: shortIdPrefix + "b4",
            name: name + " Boost IV",
        },
        {
            id: idPrefix + "_1",
            shortId: shortIdPrefix + "x1",
            name: name + " I",
        },
        {
            id: idPrefix + "_2",
            shortId: shortIdPrefix + "x2",
            name: name + " II",
        },
        {
            id: idPrefix + "_3",
            shortId: shortIdPrefix + "x3",
            name: name + " III",
        },
        {
            id: idPrefix + "_4",
            shortId: shortIdPrefix + "x4",
            name: name + " IV",
        },

        {
            id: "secondary_" + idPrefix + "_1",
            shortId: shortIdPrefix + "s1",
            name: "Secondary " + name + " I",
        },
        {
            id: "secondary_" + idPrefix + "_2",
            shortId: shortIdPrefix + "s2",
            name: "Secondary " + name + " II",
        },
        {
            id: "secondary_" + idPrefix + "_3",
            shortId: shortIdPrefix + "s3",
            name: "Secondary " + name + " III",
        },

        {
            id: idPrefix + "_effect_1",
            shortId: shortIdPrefix + "e1",
            name: name + " Effect I",
        },
        {
            id: idPrefix + "_effect_2",
            shortId: shortIdPrefix + "e2",
            name: name + " Effect II",
        },
        {
            id: "rapid_fire_" + idPrefix,
            shortId: shortIdPrefix + "r1",
            name: `Rapid Fire (${name})`,
        },
    ];
}

function generateStat(name: string, shortIdPrefix: string, generateEffect: boolean): RampageSkillRO[] {
    console.assert(name !== "");
    console.assert(shortIdPrefix !== "");

    const idPrefix = name.toLowerCase();
    const ret = [
        {
            id: idPrefix + "_boost_1",
            shortId: shortIdPrefix + "b1",
            name: name + " Boost I",
        },
        {
            id: idPrefix + "_boost_2",
            shortId: shortIdPrefix + "b2",
            name: name + " Boost II",
        },
        {
            id: idPrefix + "_boost_3",
            shortId: shortIdPrefix + "b3",
            name: name + " Boost III",
        },

        {
            id: idPrefix + "_1",
            shortId: shortIdPrefix + "x1",
            name: name + " I",
        },
        {
            id: idPrefix + "_2",
            shortId: shortIdPrefix + "x2",
            name: name + " II",
        },
        {
            id: idPrefix + "_3",
            shortId: shortIdPrefix + "x3",
            name: name + " III",
        },

    ];
    if (generateEffect) {
        ret.push({
            id: idPrefix + "_effect_1",
            shortId: shortIdPrefix + "e1",
            name: name + " Effect I",
        });
        ret.push({
            id: idPrefix + "_effect_2",
            shortId: shortIdPrefix + "e2",
            name: name + " Effect II",
        });
    }
    return ret;
}

const hardcodedRampageSkills = [

    {
        id: "attack_boost_1",
        shortId: "atb1",
        name: "Attack Boost I",
    },
    {
        id: "attack_boost_2",
        shortId: "atb2",
        name: "Attack Boost II",
    },
    {
        id: "attack_boost_3",
        shortId: "atb3",
        name: "Attack Boost III",
    },
    {
        id: "attack_boost_4",
        shortId: "atb4",
        name: "Attack Boost IV",
    },

    {
        id: "affinity_boost_1",
        shortId: "afb1",
        name: "Affinity Boost I",
    },
    {
        id: "affinity_boost_2",
        shortId: "afb2",
        name: "Affinity Boost II",
    },
    {
        id: "affinity_boost_3",
        shortId: "afb3",
        name: "Affinity Boost III",
    },
    {
        id: "affinity_boost_4",
        shortId: "afb4",
        name: "Affinity Boost IV",
    },

    {
        id: "elemental_boost_1",
        shortId: "elb1",
        name: "Elemental Boost I",
    },
    {
        id: "elemental_boost_2",
        shortId: "elb2",
        name: "Elemental Boost II",
    },
    {
        id: "elemental_boost_3",
        shortId: "elb3",
        name: "Elemental Boost III",
    },

    {
        id: "defense_boost_1",
        shortId: "deb1",
        name: "Defense Boost I",
    },
    {
        id: "defense_boost_2",
        shortId: "deb2",
        name: "Defense Boost II",
    },
    {
        id: "defense_boost_3",
        shortId: "deb3",
        name: "Defense Boost III",
    },

    {
        id: "attack_surge",
        shortId: "atsu",
        name: "Attack Surge",
    },
    {
        id: "elemental_surge",
        shortId: "elsu",
        name: "Elemental Surge",
    },
    {
        id: "affinity_surge",
        shortId: "afsu",
        name: "Affinity Surge",
    },

    {
        id: "sharpness_type_1",
        shortId: "sht1",
        name: "Sharpness Type I",
    },
    {
        id: "sharpness_type_2",
        shortId: "sht2",
        name: "Sharpness Type II",
    },
    {
        id: "sharpness_type_3",
        shortId: "sht3",
        name: "Sharpness Type III",
    },
    {
        id: "sharpness_type_4",
        shortId: "sht4",
        name: "Sharpness Type IV",
    },

    {
        id: "defense_grinder_1",
        shortId: "deg1",
        name: "Defense Grinder I",
    },
    {
        id: "defense_grinder_2",
        shortId: "deg2",
        name: "Defense Grinder II",
    },

    {
        id: "shelling_normal_1",
        shortId: "shn1",
        name: "Shelling: Normal I",
    },
    {
        id: "shelling_normal_2",
        shortId: "shn2",
        name: "Shelling: Normal II",
    },
    {
        id: "shelling_normal_3",
        shortId: "shn3",
        name: "Shelling: Normal III",
    },
    {
        id: "shelling_long_1",
        shortId: "shl1",
        name: "Shelling: Long I",
    },
    {
        id: "shelling_long_2",
        shortId: "shl2",
        name: "Shelling: Long II",
    },
    {
        id: "shelling_long_3",
        shortId: "shl3",
        name: "Shelling: Long III",
    },
    {
        id: "shelling_wide_1",
        shortId: "shw1",
        name: "Shelling: Wide I",
    },
    {
        id: "shelling_wide_2",
        shortId: "shw2",
        name: "Shelling: Wide II",
    },
    {
        id: "shelling_wide_3",
        shortId: "shw3",
        name: "Shelling: Wide III",
    },

    {
        id: "attack_melody_1",
        shortId: "mea1",
        name: "Attack Melody I",
    },
    {
        id: "attack_melody_2",
        shortId: "mea2",
        name: "Attack Melody II",
    },
    {
        id: "defensive_melody_1",
        shortId: "med1",
        name: "Defensive Melody I",
    },
    {
        id: "defensive_melody_2",
        shortId: "med2",
        name: "Defensive Melody II",
    },
    {
        id: "healing_melody_1",
        shortId: "meh1",
        name: "Healing Melody I",
    },
    {
        id: "healing_melody_2",
        shortId: "meh2",
        name: "Healing Melody II",
    },
    {
        id: "resilient_melody_1",
        shortId: "mer1",
        name: "Resilient Melody I",
    },
    {
        id: "resilient_melody_2",
        shortId: "mer2",
        name: "Resilient Melody II",
    },

    //{
    //    id: "phial_power",
    //    shortId: "phpow",
    //    name: "Phial: Power",
    //},
    {
        id: "phial_element",
        shortId: "phele",
        name: "Phial: Element",
    },
    {
        id: "phial_poison_1",
        shortId: "phpo1",
        name: "Phial: Poison I",
    },
    {
        id: "phial_poison_2",
        shortId: "phpo2",
        name: "Phial: Poison II",
    },
    {
        id: "phial_poison_3",
        shortId: "phpo3",
        name: "Phial: Poison III",
    },
    {
        id: "phial_paralysis_1",
        shortId: "phpa1",
        name: "Phial: Paralysis I",
    },
    {
        id: "phial_paralysis_2",
        shortId: "phpa2",
        name: "Phial: Paralysis II",
    },
    {
        id: "phial_paralysis_3",
        shortId: "phpa3",
        name: "Phial: Paralysis III",
    },
    {
        id: "phial_dragon_1",
        shortId: "phdr1",
        name: "Phial: Dragon I",
    },
    {
        id: "phial_dragon_2",
        shortId: "phdr2",
        name: "Phial: Dragon II",
    },
    {
        id: "phial_dragon_3",
        shortId: "phdr3",
        name: "Phial: Dragon III",
    },
    {
        id: "phial_exhaust_1",
        shortId: "phex1",
        name: "Phial: Exhaust I",
    },
    {
        id: "phial_exhaust_2",
        shortId: "phex2",
        name: "Phial: Exhaust II",
    },
    {
        id: "phial_exhaust_3",
        shortId: "phex3",
        name: "Phial: Exhaust III",
    },

    {
        id: "kinsect_level_boost",
        shortId: "klb",
        name: "Kinsect Level Boost",
    },
    {
        id: "kinsect_level_boost_1",
        shortId: "klb1",
        name: "Kinsect Level Boost I",
    },
    {
        id: "kinsect_level_boost_2",
        shortId: "klb2",
        name: "Kinsect Level Boost II",
    },
    {
        id: "kinsect_level_boost_3",
        shortId: "klb3",
        name: "Kinsect Level Boost III",
    },
    {
        id: "kinsect_level_boost_4",
        shortId: "klb4",
        name: "Kinsect Level Boost IV",
    },

    {
        id: "spread_effect_1",
        shortId: "spe1",
        name: "Spread Effect I",
    },
    {
        id: "spread_effect_2",
        shortId: "spe2",
        name: "Spread Effect II",
    },
    {
        id: "shrapnel_effect_1",
        shortId: "she1",
        name: "Shrapnel Effect I",
    },
    {
        id: "shrapnel_effect_2",
        shortId: "she2",
        name: "Shrapnel Effect II",
    },
    {
        id: "pierce_effect_1",
        shortId: "pie1",
        name: "Pierce Effect I",
    },
    {
        id: "pierce_effect_2",
        shortId: "pie2",
        name: "Pierce Effect II",
    },
    {
        id: "normal_effect_1",
        shortId: "noe1",
        name: "Normal Effect I",
    },
    {
        id: "normal_effect_2",
        shortId: "noe2",
        name: "Normal Effect II",
    },
    {
        id: "sticky_effect_1",
        shortId: "ste1",
        name: "Sticky Effect I",
    },
    {
        id: "sticky_effect_2",
        shortId: "ste2",
        name: "Sticky Effect II",
    },
    {
        id: "cluster_effect_1",
        shortId: "cle1",
        name: "Cluster Effect I",
    },
    {
        id: "cluster_effect_2",
        shortId: "cle2",
        name: "Cluster Effect II",
    },
    {
        id: "stickycluster_effect_1",
        shortId: "sce1",
        name: "Sticky/Cluster Effect I",
    },
    {
        id: "stickycluster_effect_2",
        shortId: "sce2",
        name: "Sticky/Cluster Effect II",
    },
    {
        id: "exhaust_effect_1",
        shortId: "exe1",
        name: "Exhaust Effect I",
    },
    {
        id: "exhaust_effect_2",
        shortId: "exe2",
        name: "Exhaust Effect II",
    },
    {
        id: "add_normal_ammo_1",
        shortId: "anoa1",
        name: "Add: Normal Ammo I",
    },
    {
        id: "add_normal_ammo_2",
        shortId: "anoa2",
        name: "Add: Normal Ammo II",
    },
    {
        id: "rapid_fire_normal",
        shortId: "rfno",
        name: "Rapid Fire (Normal)",
    },
    {
        id: "rapid_fire_piercing",
        shortId: "rfpi",
        name: "Rapid Fire (Piercing)",
    },
    {
        id: "rapid_fire_spread",
        shortId: "rfsp",
        name: "Rapid Fire (Spread)",
    },
    {
        id: "rapid_fire_shrapnel",
        shortId: "rfsh",
        name: "Rapid Fire (Shrapnel)",
    },
    {
        id: "rapid_fire_sticky",
        shortId: "rfst",
        name: "Rapid Fire (Sticky)",
    },
    {
        id: "recoil_down_boost",
        shortId: "rdb",
        name: "Recoil Down Boost",
    },
    {
        id: "recoil_down_surge",
        shortId: "rds",
        name: "Recoil Down Surge",
    },
    {
        id: "reload_speed_boost",
        shortId: "rsb",
        name: "Reload Speed Boost",
    },
    {
        id: "reload_speed_surge",
        shortId: "rss",
        name: "Reload Speed Surge",
    },
    {
        id: "steadiness_boost",
        shortId: "steb",
        name: "Steadiness Boost",
    },
    {
        id: "steadiness_surge",
        shortId: "stes",
        name: "Steadiness Surge",
    },
    {
        id: "special_wyvernheart",
        shortId: "spwh",
        name: "Special: Wyvernheart",
    },
    {
        id: "special_wyvernsnipe",
        shortId: "spws",
        name: "Special: Wyvernsnipe",
    },

    {
        id: "poison_coating_boost",
        shortId: "cbpo",
        name: "Poison Coating Boost",
    },
    {
        id: "paralysis_coating_boost",
        shortId: "cbpa",
        name: "Paralysis Coating Boost",
    },
    {
        id: "sleep_coating_boost",
        shortId: "cbsl",
        name: "Sleep Coating Boost",
    },
    {
        id: "close_range_coating_boost",
        shortId: "clcb",
        name: "Close-range Coating Boost",
    },
    {
        id: "use_power_coating",
        shortId: "upc",
        name: "Use Power Coating",
    },
    {
        id: "use_poison_coating_1",
        shortId: "upoc1",
        name: "Use Poison Coating I",
    },
    {
        id: "use_poison_coating_2",
        shortId: "upoc2",
        name: "Use Poison Coating II",
    },
    {
        id: "use_para_coating_1",
        shortId: "upac1",
        name: "Use Para Coating I",
    },
    {
        id: "use_para_coating_2",
        shortId: "upac2",
        name: "Use Para Coating II",
    },
    {
        id: "use_sleep_coating_1",
        shortId: "uslc1",
        name: "Use Sleep Coating I",
    },
    {
        id: "use_sleep_coating_2",
        shortId: "uslc2",
        name: "Use Sleep Coating II",
    },
    {
        id: "use_blast_coating",
        shortId: "ublc",
        name: "Use Blast Coating",
    },
    {
        id: "use_exhaust_coating",
        shortId: "uexc",
        name: "Use Exhaust Coating",
    },
    {
        id: "lasting_arc_shot",
        shortId: "arla",
        name: "Lasting Arc Shot",
    },
    {
        id: "arc_shot_recovery",
        shortId: "arre",
        name: "Arc Shot: Recovery",
    },
    {
        id: "arc_shot_affinity",
        shortId: "araf",
        name: "Arc Shot: Affinity",
    },
    {
        id: "arc_shot_anti_shock",
        shortId: "aras",
        name: "Arc Shot: Anti-shock",
    },
    {
        id: "firing_rapid",
        shortId: "frap",
        name: "Firing: Rapid",
    },
    {
        id: "firing_pierce",
        shortId: "fpie",
        name: "Firing: Pierce",
    },
    {
        id: "firing_spread",
        shortId: "fspr",
        name: "Firing: Spread",
    },
    {
        id: "firing_charge",
        shortId: "fcha",
        name: "Firing: Charge",
    },
    {
        id: "firing_swift",
        shortId: "fswi",
        name: "Firing: Swift",
    },

    {
        id: "anti_aerial_species",
        shortId: "anae",
        name: "Anti-Aerial Species",
    },
    {
        id: "anti_aquatic_species",
        shortId: "anaq",
        name: "Anti-Aquatic Species",
    },

    {
        id: "element_exploit",
        shortId: "xele",
        name: "Element Exploit",
    },
    {
        id: "fireblight_exploit",
        shortId: "xfib",
        name: "Fireblight Exploit",
    },
    {
        id: "iceblight_exploit",
        shortId: "xicb",
        name: "Iceblight Exploit",
    },
    {
        id: "small_monster_exploit",
        shortId: "xsm",
        name: "Small Monster Exploit",
    },
    {
        id: "thunderblight_exploit",
        shortId: "xthb",
        name: "Thunderblight Exploit",
    },
    {
        id: "waterblight_exploit",
        shortId: "xwab",
        name: "Waterblight Exploit",
    },
    {
        id: "wyvern_exploit",
        shortId: "xwyv",
        name: "Wyvern Exploit",
    },

    {
        id: "chameleos_soul",
        shortId: "chas",
        name: "Chameleos Soul",
    },
    {
        id: "ibushi_soul",
        shortId: "ibus",
        name: "Magnamalo Soul",
    },
    {
        id: "kushala_daora_soul",
        shortId: "kuss",
        name: "Kushala Daora Soul",
    },
    {
        id: "magnamalo_soul",
        shortId: "mags",
        name: "Magnamalo Soul",
    },
    {
        id: "narwa_soul",
        shortId: "nars",
        name: "Narwa Soul",
    },
    {
        id: "teostra_soul",
        shortId: "teos",
        name: "Teostra Soul",
    },
    {
        id: "valstrax_soul",
        shortId: "vals",
        name: "Valstrax Soul",
    },

    {
        id: "boost_equipped_coating",
        shortId: "10",
        name: "Boost Equipped Coating",
    },
    {
        id: "brutal_strike",
        shortId: "20",
        name: "Brutal Strike",
    },
    {
        id: "buddy_rally",
        shortId: "30",
        name: "Buddy Rally",
    },
    {
        id: "coating_switch_boost",
        shortId: "40",
        name: "Coating Switch Boost",
    },
    {
        id: "dulling_strike",
        shortId: "50",
        name: "Dulling Strike",
    },
    {
        id: "hellion_mode",
        shortId: "60",
        name: "Hellion Mode",
    },
    {
        id: "master_rider",
        shortId: "80",
        name: "Master Rider",
    },
    {
        id: "maximum_volume",
        shortId: "90",
        name: "Maximum Volume",
    },
    {
        id: "non_elemental_boost",
        shortId: "100",
        name: "Non-elemental Boost",
    },
    {
        id: "silkbind_boost",
        shortId: "110",
        name: "Silkbind Boost",
    },
    {
        id: "spiribird_doubled",
        shortId: "120",
        name: "Spiribird Doubled",
    },
    {
        id: "wyrmstake_boost",
        shortId: "130",
        name: "Wyrmstake Boost",
    },

];

const rampsArray: RampageSkillRO[] = [
    ...hardcodedRampageSkills,
    ...generateEle("Fire"      , "fi"),
    ...generateEle("Water"     , "wa"),
    ...generateEle("Thunder"   , "th"),
    ...generateEle("Ice"       , "ic"),
    ...generateEle("Dragon"    , "dr"),
    ...generateStat("Poison"   , "po", true ),
    ...generateStat("Paralysis", "pa", true ),
    ...generateStat("Sleep"    , "sl", true ),
    ...generateStat("Blast"    , "bl", false),
];

// Now, we populate these maps.
const rampsMap = new Map<string, RampageSkillRO>();
const rampsMapShortIds = new Map<string, RampageSkillRO>();

// For convenience, we also attach IDs to each object
for (const obj of rampsArray) {

    console.assert(/^[_a-z0-9]+$/.test(obj.id));
    console.assert(/^[a-z0-9]+$/.test(obj.shortId));
    console.assert(obj.name !== "");

    console.assert(!rampsMap.has(obj.id), `Duplicate ramp skill ID: ${obj.id}`);
    console.assert(!rampsMapShortIds.has(obj.shortId), `Duplicate ramp skill short ID: ${obj.id}`);

    rampsMap.set(obj.id, obj);
    rampsMapShortIds.set(obj.shortId, obj);

}

const finalRampsMap = new FrozenMap<string, RampageSkillRO>(rampsMap);
const finalRampsMapShortIds = new FrozenMap<string, RampageSkillRO>(rampsMapShortIds);

export {
    finalRampsMap as rampageSkillsMap,
    finalRampsMapShortIds as rampageSkillsMapShortIds,
};

