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
import {
    strHasOnlyLowerUnder,
    strHasOnlyLowerNumeral,
    toNameFilterString,
} from "../../common.js";

const skillMap = new Map([

    // TODO: Prune skills that don't actually exist in-game. I sorta just pulled this from the wiki.

    // For convenience, I'm bringing common elemental/status stuff to the top first.

    //
    // COMMON ELEMENTAL/STATUS SKILLS
    // (X Attack and X Resistance)
    //

    ["fire_attack", {
        shortId: "1",
        name: "fira",
        maxLevels: 5,
    }],
    ["water_attack", {
        shortId: "2",
        name: "Water Attack",
        maxLevels: 5,
    }],
    ["thunder_attack", {
        shortId: "3",
        name: "Thunder Attack",
        maxLevels: 5,
    }],
    ["ice_attack", {
        shortId: "4",
        name: "Ice Attack",
        maxLevels: 5,
    }],
    ["dragon_attack", {
        shortId: "5",
        name: "Dragon Attack",
        maxLevels: 5,
    }],
    ["poison_attack", {
        shortId: "6",
        name: "Poison Attack",
        maxLevels: 3,
    }],
    ["paralysis_attack", {
        shortId: "7",
        name: "Paralysis Attack",
        maxLevels: 3,
    }],
    ["sleep_attack", {
        shortId: "8",
        name: "Sleep Attack",
        maxLevels: 3,
    }],
    ["blast_attack", {
        shortId: "9",
        name: "Blast Attack",
        maxLevels: 3,
    }],
    ["fire_resistance", {
        shortId: "10",
        name: "Fire Resistance",
        maxLevels: 3,
    }],
    ["water_resistance", {
        shortId: "11",
        name: "Water Resistance",
        maxLevels: 3,
    }],
    ["thunder_resistance", {
        shortId: "12",
        name: "Thunder Resistance",
        maxLevels: 3,
    }],
    ["ice_resistance", {
        shortId: "13",
        name: "Ice Resistance",
        maxLevels: 3,
    }],
    ["dragon_resistance", {
        shortId: "14",
        name: "Dragon Resistance",
        maxLevels: 3,
    }],
    ["poison_resistance", {
        shortId: "15",
        name: "Poison Resistance",
        maxLevels: 3,
    }],
    ["paralysis_resistance", {
        shortId: "16",
        name: "Paralysis Resistance",
        maxLevels: 3,
    }],
    ["sleep_resistance", {
        shortId: "17",
        name: "Sleep Resistance",
        maxLevels: 3,
    }],
    ["blast_resistance", {
        shortId: "18",
        name: "Blast Resistance",
        maxLevels: 3,
    }],

    //
    // EVERYTHING ELSE
    //

    ["affinity_sliding", {
        shortId: "19",
        name: "Affinity Sliding",
        maxLevels: 1,
    }],
    ["agitator", {
        shortId: "20",
        name: "Agitator",
        maxLevels: 5,
    }],
    ["aim_booster", {
        shortId: "21",
        name: "Aim Booster",
        maxLevels: 3,
    }],
    ["ammo_up", {
        shortId: "22",
        name: "Ammo Up",
        maxLevels: 3,
    }],
    ["artillery", {
        shortId: "23",
        name: "Artillery",
        maxLevels: 3,
    }],
    ["attack_boost", {
        shortId: "24",
        name: "Attack Boost",
        maxLevels: 7,
    }],
    ["ballistics", {
        shortId: "25",
        name: "Ballistics",
        maxLevels: 3,
    }],
    ["blight_resistance", {
        shortId: "26",
        name: "Blight Resistance",
        maxLevels: 3,
    }],
    ["bludgeoner", {
        shortId: "27",
        name: "Bludgeoner",
        maxLevels: 3,
    }],
    ["bombardier", {
        shortId: "28",
        name: "Bombardier",
        maxLevels: 3,
    }],
    ["botanist", {
        shortId: "29",
        name: "Botanist",
        maxLevels: 4,
    }],
    ["bow_charge_plus", {
        shortId: "30",
        name: "Bow Charge Plus",
        maxLevels: 1,
    }],
    ["bubbly_dance", {
        shortId: "31",
        name: "Bubbly Dance",
        maxLevels: 3,
    }],
    ["capture_master", {
        shortId: "32",
        name: "Capture Master",
        maxLevels: 1,
    }],
    ["carving_pro", {
        shortId: "33",
        name: "Carving Pro",
        maxLevels: 1,
    }],
    ["chameleos_blessing", {
        shortId: "34",
        name: "Chameleos Blessing",
        maxLevels: 4,
    }],
    ["constitution", {
        shortId: "35",
        name: "Constitution",
        maxLevels: 5,
    }],
    ["counterstrike", {
        shortId: "36",
        name: "Counterstrike",
        maxLevels: 3,
    }],
    ["critical_boost", {
        shortId: "37",
        name: "Critical Boost",
        maxLevels: 3,
    }],
    ["critical_draw", {
        shortId: "38",
        name: "Critical Draw",
        maxLevels: 3,
    }],
    ["critical_element", {
        shortId: "39",
        name: "Critical Element",
        maxLevels: 3,
    }],
    ["critical_eye", {
        shortId: "40",
        name: "Critical Eye",
        maxLevels: 7,
    }],
    ["defense_boost", {
        shortId: "41",
        name: "Defense Boost",
        maxLevels: 7,
    }],
    ["diversion", {
        shortId: "42",
        name: "Diversion",
        maxLevels: 1,
    }],
    ["divine_blessing", {
        shortId: "43",
        name: "Divine Blessing",
        maxLevels: 3,
    }],
    ["dragonheart", {
        shortId: "44",
        name: "Dragonheart",
        maxLevels: 5,
    }],
    ["earplugs", {
        shortId: "45",
        name: "Earplugs",
        maxLevels: 5,
    }],
    ["evade_extender", {
        shortId: "46",
        name: "Evade Extender",
        maxLevels: 3,
    }],
    ["evade_window", {
        shortId: "47",
        name: "Evade Window",
        maxLevels: 5,
    }],
    ["flinch_free", {
        shortId: "48",
        name: "Flinch Free",
        maxLevels: 3,
    }],
    ["focus", {
        shortId: "49",
        name: "Focus",
        maxLevels: 3,
    }],
    ["fortify", {
        shortId: "50",
        name: "Fortify",
        maxLevels: 1,
    }],
    ["free_meal", {
        shortId: "51",
        name: "Free Meal",
        maxLevels: 3,
    }],
    ["geologist", {
        shortId: "52",
        name: "Geologist",
        maxLevels: 3,
    }],
    ["good_luck", {
        shortId: "53",
        name: "Good Luck",
        maxLevels: 3,
    }],
    ["guard", {
        shortId: "54",
        name: "Guard",
        maxLevels: 5,
    }],
    ["guard_up", {
        shortId: "55",
        name: "Guard Up",
        maxLevels: 3,
    }],
    ["handicraft", {
        shortId: "56",
        name: "Handicraft",
        maxLevels: 5,
    }],
    ["hellfire_cloak", {
        shortId: "57",
        name: "Hellfire Cloak",
        maxLevels: 4,
    }],
    ["heroics", {
        shortId: "58",
        name: "Heroics",
        maxLevels: 5,
    }],
    ["horn_maestro", {
        shortId: "59",
        name: "Horn Maestro",
        maxLevels: 1,
    }],
    ["hunger_resistance", {
        shortId: "60",
        name: "Hunger Resistance",
        maxLevels: 3,
    }],
    ["item_prolonger", {
        shortId: "61",
        name: "Item Prolonger",
        maxLevels: 3,
    }],
    ["jump_master", {
        shortId: "62",
        name: "Jump Master",
        maxLevels: 1,
    }],
    ["kushala_blessing", {
        shortId: "63",
        name: "Kushala Blessing",
        maxLevels: 4,
    }],
    ["latent_power", {
        shortId: "64",
        name: "Latent Power",
        maxLevels: 5,
    }],
    ["leap_of_faith", {
        shortId: "65",
        name: "Leap Of Faith",
        maxLevels: 1,
    }],
    ["load_shells", {
        shortId: "66",
        name: "Load Shells",
        maxLevels: 2,
    }],
    ["marathon_runner", {
        shortId: "67",
        name: "Marathon Runner",
        maxLevels: 3,
    }],
    ["master_mounter", {
        shortId: "68",
        name: "Master Mounter",
        maxLevels: 1,
    }],
    ["masters_touch", {
        shortId: "69",
        name: "Master's Touch",
        maxLevels: 3,
    }],
    ["maximum_might", {
        shortId: "70",
        name: "Maximum Might",
        maxLevels: 3,
    }],
    ["minds_eye", {
        shortId: "71",
        name: "Mind's Eye",
        maxLevels: 3,
    }],
    ["muck_resistance", {
        shortId: "72",
        name: "Muck Resistance",
        maxLevels: 2,
    }],
    ["mushroomancer", {
        shortId: "73",
        name: "Mushroomancer",
        maxLevels: 3,
    }],
    ["normal_rapid_up", {
        shortId: "74",
        name: "Normal/Rapid Up",
        maxLevels: 3,
    }],
    ["offensive_guard", {
        shortId: "75",
        name: "Offensive Guard",
        maxLevels: 3,
    }],
    ["partbreaker", {
        shortId: "76",
        name: "Partbreaker",
        maxLevels: 3,
    }],
    ["peak_performance", {
        shortId: "77",
        name: "Peak Performance",
        maxLevels: 3,
    }],
    ["pierce_up", {
        shortId: "78",
        name: "Pierce Up",
        maxLevels: 3,
    }],
    ["power_prolonger", {
        shortId: "79",
        name: "Power Prolonger",
        maxLevels: 3,
    }],
    ["protective_polish", {
        shortId: "80",
        name: "Protective Polish",
        maxLevels: 3,
    }],
    ["punishing_draw", {
        shortId: "81",
        name: "Punishing Draw",
        maxLevels: 3,
    }],
    ["quick_sheath", {
        shortId: "82",
        name: "Quick Sheath",
        maxLevels: 3,
    }],
    ["rapid_fire_up", {
        shortId: "83",
        name: "Rapid Fire Up",
        maxLevels: 3,
    }],
    ["rapid_morph", {
        shortId: "84",
        name: "Rapid Morph",
        maxLevels: 3,
    }],
    ["razor_sharp", {
        shortId: "85",
        name: "Razor Sharp",
        maxLevels: 3,
    }],
    ["recoil_down", {
        shortId: "86",
        name: "Recoil Down",
        maxLevels: 3,
    }],
    ["recovery_speed", {
        shortId: "87",
        name: "Recovery Speed",
        maxLevels: 3,
    }],
    ["recovery_up", {
        shortId: "88",
        name: "Recovery Up",
        maxLevels: 3,
    }],
    ["reload_speed", {
        shortId: "89",
        name: "Reload Speed",
        maxLevels: 3,
    }],
    ["resentment", {
        shortId: "90",
        name: "Resentment",
        maxLevels: 5,
    }],
    ["resuscitate", {
        shortId: "91",
        name: "Resuscitate",
        maxLevels: 3,
    }],
    ["slugger", {
        shortId: "92",
        name: "Slugger",
        maxLevels: 3,
    }],
    ["spare_shot", {
        shortId: "93",
        name: "Spare Shot",
        maxLevels: 3,
    }],
    ["special_ammo_boost", {
        shortId: "94",
        name: "Special Ammo Boost",
        maxLevels: 2,
    }],
    ["speed_eating", {
        shortId: "95",
        name: "Speed Eating",
        maxLevels: 3,
    }],
    ["speed_sharpening", {
        shortId: "96",
        name: "Speed Sharpening",
        maxLevels: 3,
    }],
    ["spread_up", {
        shortId: "97",
        name: "Spread Up",
        maxLevels: 3,
    }],
    ["stamina_surge", {
        shortId: "98",
        name: "Stamina Surge",
        maxLevels: 3,
    }],
    ["stamina_thief", {
        shortId: "99",
        name: "Stamina Thief",
        maxLevels: 3,
    }],
    ["steadiness", {
        shortId: "100",
        name: "Steadiness",
        maxLevels: 2,
    }],
    ["stun_resistance", {
        shortId: "101",
        name: "Stun Resistance",
        maxLevels: 3,
    }],
    ["teostra_blessing", {
        shortId: "102",
        name: "Teostra Blessing",
        maxLevels: 4,
    }],
    ["thunder_alignment", {
        shortId: "103",
        name: "Thunder Alignment",
        maxLevels: 5,
    }],
    ["tremor_resistance", {
        shortId: "104",
        name: "Tremor Resistance",
        maxLevels: 3,
    }],
    ["wall_runner", {
        shortId: "105",
        name: "Wall Runner",
        maxLevels: 3,
    }],
    ["weakness_exploit", {
        shortId: "106",
        name: "Weakness Exploit",
        maxLevels: 3,
    }],
    ["wide_range", {
        shortId: "107",
        name: "Wide Range",
        maxLevels: 5,
    }],
    ["wind_alignment", {
        shortId: "108",
        name: "Wind Alignment",
        maxLevels: 5,
    }],
    ["windproof", {
        shortId: "109",
        name: "Windproof",
        maxLevels: 3,
    }],
    ["wirebug_whisperer", {
        shortId: "110",
        name: "Wirebug Whisperer",
        maxLevels: 3,
    }],
]);

const skillMapShortIds = new Map();

for (const [skillID, skillObj] of skillMap.entries()) {
    // For convenience, we also attach IDs and filter helpers to each object
    skillObj.id = skillID;
    skillObj.filterHelpers = {};
    skillObj.filterHelpers.nameLower = toNameFilterString(skillObj.name);

    //
    // Validate
    //

    assert(isNonEmptyStr(skillObj.id),      "Skills must have IDs.");
    assert(isNonEmptyStr(skillObj.shortId), "Skills must have alternative short IDs. Skill ID: " + skillObj.id);
    assert(isNonEmptyStr(skillObj.name),    "Skills must have names. Skill ID: " + skillObj.id);
    assert(isInt(skillObj.maxLevels),       "Skills must have a max level. Skill ID: " + skillObj.id);

    assert(strHasOnlyLowerUnder(skillObj.id), "Wrong skill ID format. Skill ID: " + skillObj.id);
    assert(strHasOnlyLowerNumeral(skillObj.shortId), "Wrong skill short ID format. Skill short ID: " + skillObj.shortId);
    // Name can have any format.
    assert(skillObj.maxLevels > 0, "Skill must have a positive non-zero maximum level. Skill ID: " + skillObj.id);
    assert(skillObj.maxLevels < 8, "Skill must have a maximum level below 8. Skill ID: " + skillObj.id); // Change if needed
    
    // Check for duplicates then add
    assert(!(skillMapShortIds.has(skillObj.shortId)), "Duplicate skill short ID: " + skillObj.shortId);
    skillMapShortIds.set(skillObj.shortId, skillObj);
}

export {skillMap, skillMapShortIds};

