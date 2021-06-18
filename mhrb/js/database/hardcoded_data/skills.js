/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {getImgPath} from "../../images.js";

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

const iconsToImageID = new Map([
    ["blue"     , "skill_icon_blue"     ],
    ["brown"    , "skill_icon_brown"    ],
    ["darkblue" , "skill_icon_darkblue" ],
    ["gold"     , "skill_icon_gold"     ],
    ["green"    , "skill_icon_green"    ],
    ["grey"     , "skill_icon_grey"     ],
    ["lightblue", "skill_icon_lightblue"],
    ["orange"   , "skill_icon_orange"   ],
    ["pink"     , "skill_icon_pink"     ],
    ["purple"   , "skill_icon_purple"   ],
    ["red"      , "skill_icon_red"      ],
    ["white"    , "skill_icon_white"    ],
    ["yellow"   , "skill_icon_yellow"   ],
]);

const hardcodedSkills = [

    // TODO: Prune skills that don't actually exist in-game. I sorta just pulled this from the wiki.

    // For convenience, I'm bringing common elemental/status stuff to the top first.

    //
    // COMMON ELEMENTAL/STATUS SKILLS
    // (X Attack and X Resistance)
    //

    ["fire_attack", {
        shortId: "1",
        name: "Fire Attack",
        maxLevels: 5,

        icon: "red",
    }],
    ["water_attack", {
        shortId: "2",
        name: "Water Attack",
        maxLevels: 5,

        icon: "blue",
    }],
    ["thunder_attack", {
        shortId: "3",
        name: "Thunder Attack",
        maxLevels: 5,

        icon: "yellow",
    }],
    ["ice_attack", {
        shortId: "4",
        name: "Ice Attack",
        maxLevels: 5,

        icon: "lightblue",
    }],
    ["dragon_attack", {
        shortId: "5",
        name: "Dragon Attack",
        maxLevels: 5,

        icon: "orange",
    }],
    ["poison_attack", {
        shortId: "6",
        name: "Poison Attack",
        maxLevels: 3,

        icon: "purple",
    }],
    ["paralysis_attack", {
        shortId: "7",
        name: "Paralysis Attack",
        maxLevels: 3,

        icon: "gold",
    }],
    ["sleep_attack", {
        shortId: "8",
        name: "Sleep Attack",
        maxLevels: 3,

        icon: "lightblue",
    }],
    ["blast_attack", {
        shortId: "9",
        name: "Blast Attack",
        maxLevels: 3,

        icon: "orange",
    }],
    ["fire_resistance", {
        shortId: "10",
        name: "Fire Resistance",
        maxLevels: 3,

        icon: "red",
    }],
    ["water_resistance", {
        shortId: "11",
        name: "Water Resistance",
        maxLevels: 3,

        icon: "blue",
    }],
    ["thunder_resistance", {
        shortId: "12",
        name: "Thunder Resistance",
        maxLevels: 3,

        icon: "yellow",
    }],
    ["ice_resistance", {
        shortId: "13",
        name: "Ice Resistance",
        maxLevels: 3,

        icon: "lightblue",
    }],
    ["dragon_resistance", {
        shortId: "14",
        name: "Dragon Resistance",
        maxLevels: 3,

        icon: "orange",
    }],
    ["poison_resistance", {
        shortId: "15",
        name: "Poison Resistance",
        maxLevels: 3,

        icon: "purple",
    }],
    ["paralysis_resistance", {
        shortId: "16",
        name: "Paralysis Resistance",
        maxLevels: 3,

        icon: "gold",
    }],
    ["sleep_resistance", {
        shortId: "17",
        name: "Sleep Resistance",
        maxLevels: 3,

        icon: "lightblue",
    }],
    ["blast_resistance", {
        shortId: "18",
        name: "Blast Resistance",
        maxLevels: 3,

        icon: "orange",
    }],

    //
    // EVERYTHING ELSE
    //

    ["affinity_sliding", {
        shortId: "19",
        name: "Affinity Sliding",
        maxLevels: 1,

        icon: "pink",
    }],
    ["agitator", {
        shortId: "20",
        name: "Agitator",
        maxLevels: 5,

        icon: "red",
    }],
    ["ammo_up", {
        shortId: "21",
        name: "Ammo Up",
        maxLevels: 3,

        icon: "green",
    }],
    ["artillery", {
        shortId: "22",
        name: "Artillery",
        maxLevels: 3,

        icon: "grey",
    }],
    ["attack_boost", {
        shortId: "23",
        name: "Attack Boost",
        maxLevels: 7,

        icon: "red",
    }],
    ["ballistics", {
        shortId: "24",
        name: "Ballistics",
        maxLevels: 3,

        icon: "white",
    }],
    ["blight_resistance", {
        shortId: "25",
        name: "Blight Resistance",
        maxLevels: 3,

        icon: "blue",
    }],
    ["bludgeoner", {
        shortId: "26",
        name: "Bludgeoner",
        maxLevels: 3,

        icon: "grey",
    }],
    ["bombardier", {
        shortId: "27",
        name: "Bombardier",
        maxLevels: 3,

        icon: "orange",
    }],
    ["botanist", {
        shortId: "28",
        name: "Botanist",
        maxLevels: 4,

        icon: "green",
    }],
    ["bow_charge_plus", {
        shortId: "29",
        name: "Bow Charge Plus",
        maxLevels: 1,

        icon: "green",
    }],
    ["bubbly_dance", {
        shortId: "30",
        name: "Bubbly Dance",
        maxLevels: 3,

        icon: "white",
    }],
    ["capture_master", {
        shortId: "31",
        name: "Capture Master",
        maxLevels: 1,

        icon: "pink",
    }],
    ["carving_master", {
        shortId: "32",
        name: "Carving Master",
        maxLevels: 1,

        icon: "green",
    }],
    ["carving_pro", {
        shortId: "33",
        name: "Carving Pro",
        maxLevels: 1,

        icon: "grey",
    }],
    ["chameleos_blessing", {
        shortId: "34",
        name: "Chameleos Blessing",
        maxLevels: 4,

        icon: "purple",
    }],
    ["constitution", {
        shortId: "35",
        name: "Constitution",
        maxLevels: 5,

        icon: "gold",
    }],
    ["counterstrike", {
        shortId: "36",
        name: "Counterstrike",
        maxLevels: 3,

        icon: "red",
    }],
    ["critical_boost", {
        shortId: "37",
        name: "Critical Boost",
        maxLevels: 3,

        icon: "pink",
    }],
    ["critical_draw", {
        shortId: "38",
        name: "Critical Draw",
        maxLevels: 3,

        icon: "pink",
    }],
    ["critical_element", {
        shortId: "39",
        name: "Critical Element",
        maxLevels: 3,

        icon: "darkblue",
    }],
    ["critical_eye", {
        shortId: "40",
        name: "Critical Eye",
        maxLevels: 7,

        icon: "pink",
    }],
    ["defense_boost", {
        shortId: "41",
        name: "Defense Boost",
        maxLevels: 7,

        icon: "gold",
    }],
    ["diversion", {
        shortId: "42",
        name: "Diversion",
        maxLevels: 1,

        icon: "purple",
    }],
    ["divine_blessing", {
        shortId: "43",
        name: "Divine Blessing",
        maxLevels: 3,

        icon: "white",
    }],
    ["dragonheart", {
        shortId: "44",
        name: "Dragonheart",
        maxLevels: 5,

        icon: "orange",
    }],
    ["earplugs", {
        shortId: "45",
        name: "Earplugs",
        maxLevels: 5,

        icon: "white",
    }],
    ["evade_extender", {
        shortId: "46",
        name: "Evade Extender",
        maxLevels: 3,

        icon: "lightblue",
    }],
    ["evade_window", {
        shortId: "47",
        name: "Evade Window",
        maxLevels: 5,

        icon: "lightblue",
    }],
    ["flinch_free", {
        shortId: "48",
        name: "Flinch Free",
        maxLevels: 3,

        icon: "grey",
    }],
    ["focus", {
        shortId: "49",
        name: "Focus",
        maxLevels: 3,

        icon: "white",
    }],
    ["fortify", {
        shortId: "50",
        name: "Fortify",
        maxLevels: 1,

        icon: "orange",
    }],
    ["free_meal", {
        shortId: "51",
        name: "Free Meal",
        maxLevels: 3,

        icon: "brown",
    }],
    ["geologist", {
        shortId: "52",
        name: "Geologist",
        maxLevels: 3,

        icon: "brown",
    }],
    ["good_luck", {
        shortId: "53",
        name: "Good Luck",
        maxLevels: 3,

        icon: "yellow",
    }],
    ["guard", {
        shortId: "54",
        name: "Guard",
        maxLevels: 5,

        icon: "grey",
    }],
    ["guard_up", {
        shortId: "55",
        name: "Guard Up",
        maxLevels: 3,

        icon: "white",
    }],
    ["handicraft", {
        shortId: "56",
        name: "Handicraft",
        maxLevels: 5,

        icon: "darkblue",
    }],
    ["hellfire_cloak", {
        shortId: "57",
        name: "Hellfire Cloak",
        maxLevels: 4,

        icon: "purple",
    }],
    ["heroics", {
        shortId: "58",
        name: "Heroics",
        maxLevels: 5,

        icon: "red",
    }],
    ["horn_maestro", {
        shortId: "59",
        name: "Horn Maestro",
        maxLevels: 1,

        icon: "green",
    }],
    ["hunger_resistance", {
        shortId: "60",
        name: "Hunger Resistance",
        maxLevels: 3,

        icon: "gold",
    }],
    ["item_prolonger", {
        shortId: "61",
        name: "Item Prolonger",
        maxLevels: 3,

        icon: "brown",
    }],
    ["jump_master", {
        shortId: "62",
        name: "Jump Master",
        maxLevels: 1,

        icon: "blue",
    }],
    ["kushala_blessing", {
        shortId: "63",
        name: "Kushala Blessing",
        maxLevels: 4,

        icon: "grey",
    }],
    ["latent_power", {
        shortId: "64",
        name: "Latent Power",
        maxLevels: 5,

        icon: "pink",
    }],
    ["leap_of_faith", {
        shortId: "65",
        name: "Leap Of Faith",
        maxLevels: 1,

        icon: "lightblue",
    }],
    ["load_shells", {
        shortId: "66",
        name: "Load Shells",
        maxLevels: 2,

        icon: "grey",
    }],
    ["marathon_runner", {
        shortId: "67",
        name: "Marathon Runner",
        maxLevels: 3,

        icon: "gold",
    }],
    ["master_mounter", {
        shortId: "68",
        name: "Master Mounter",
        maxLevels: 1,

        icon: "blue",
    }],
    ["masters_touch", {
        shortId: "69",
        name: "Master's Touch",
        maxLevels: 3,

        icon: "white",
    }],
    ["maximum_might", {
        shortId: "70",
        name: "Maximum Might",
        maxLevels: 3,

        icon: "pink",
    }],
    ["minds_eye", {
        shortId: "71",
        name: "Mind's Eye",
        maxLevels: 3,

        icon: "white",
    }],
    ["muck_resistance", {
        shortId: "72",
        name: "Muck Resistance",
        maxLevels: 2,

        icon: "grey",
    }],
    ["mushroomancer", {
        shortId: "73",
        name: "Mushroomancer",
        maxLevels: 3,

        icon: "purple",
    }],
    ["normal_rapid_up", {
        shortId: "74",
        name: "Normal/Rapid Up",
        maxLevels: 3,

        icon: "white",
    }],
    ["offensive_guard", {
        shortId: "75",
        name: "Offensive Guard",
        maxLevels: 3,

        icon: "purple",
    }],
    ["partbreaker", {
        shortId: "76",
        name: "Partbreaker",
        maxLevels: 3,

        icon: "grey",
    }],
    ["peak_performance", {
        shortId: "77",
        name: "Peak Performance",
        maxLevels: 3,

        icon: "red",
    }],
    ["pierce_up", {
        shortId: "78",
        name: "Pierce Up",
        maxLevels: 3,

        icon: "blue",
    }],
    ["power_prolonger", {
        shortId: "79",
        name: "Power Prolonger",
        maxLevels: 3,

        icon: "brown",
    }],
    ["protective_polish", {
        shortId: "80",
        name: "Protective Polish",
        maxLevels: 3,

        icon: "yellow",
    }],
    ["punishing_draw", {
        shortId: "81",
        name: "Punishing Draw",
        maxLevels: 3,

        icon: "yellow",
    }],
    ["quick_sheath", {
        shortId: "82",
        name: "Quick Sheath",
        maxLevels: 3,

        icon: "brown",
    }],
    ["rapid_fire_up", {
        shortId: "83",
        name: "Rapid Fire Up",
        maxLevels: 3,

        icon: "white",
    }],
    ["rapid_morph", {
        shortId: "84",
        name: "Rapid Morph",
        maxLevels: 3,

        icon: "blue",
    }],
    ["razor_sharp", {
        shortId: "85",
        name: "Razor Sharp",
        maxLevels: 3,

        icon: "yellow",
    }],
    ["recoil_down", {
        shortId: "86",
        name: "Recoil Down",
        maxLevels: 3,

        icon: "brown",
    }],
    ["recovery_speed", {
        shortId: "87",
        name: "Recovery Speed",
        maxLevels: 3,

        icon: "green",
    }],
    ["recovery_up", {
        shortId: "88",
        name: "Recovery Up",
        maxLevels: 3,

        icon: "green",
    }],
    ["reload_speed", {
        shortId: "89",
        name: "Reload Speed",
        maxLevels: 3,

        icon: "white",
    }],
    ["resentment", {
        shortId: "90",
        name: "Resentment",
        maxLevels: 5,

        icon: "orange",
    }],
    ["resuscitate", {
        shortId: "91",
        name: "Resuscitate",
        maxLevels: 3,

        icon: "orange",
    }],
    ["slugger", {
        shortId: "92",
        name: "Slugger",
        maxLevels: 3,

        icon: "yellow",
    }],
    ["spare_shot", {
        shortId: "93",
        name: "Spare Shot",
        maxLevels: 3,

        icon: "yellow",
    }],
    ["special_ammo_boost", {
        shortId: "94",
        name: "Special Ammo Boost",
        maxLevels: 2,

        icon: "grey",
    }],
    ["speed_eating", {
        shortId: "95",
        name: "Speed Eating",
        maxLevels: 3,

        icon: "gold",
    }],
    ["speed_sharpening", {
        shortId: "96",
        name: "Speed Sharpening",
        maxLevels: 3,

        icon: "yellow",
    }],
    ["spread_up", {
        shortId: "97",
        name: "Spread Up",
        maxLevels: 3,

        icon: "grey",
    }],
    ["stamina_surge", {
        shortId: "98",
        name: "Stamina Surge",
        maxLevels: 3,

        icon: "gold",
    }],
    ["stamina_thief", {
        shortId: "99",
        name: "Stamina Thief",
        maxLevels: 3,

        icon: "darkblue",
    }],
    ["steadiness", {
        shortId: "100",
        name: "Steadiness",
        maxLevels: 2,

        icon: "grey",
    }],
    ["stun_resistance", {
        shortId: "101",
        name: "Stun Resistance",
        maxLevels: 3,

        icon: "yellow",
    }],
    ["teostra_blessing", {
        shortId: "102",
        name: "Teostra Blessing",
        maxLevels: 4,

        icon: "red",
    }],
    ["thunder_alignment", {
        shortId: "103",
        name: "Thunder Alignment",
        maxLevels: 5,

        icon: "yellow",
    }],
    ["tremor_resistance", {
        shortId: "104",
        name: "Tremor Resistance",
        maxLevels: 3,

        icon: "grey",
    }],
    ["wall_runner", {
        shortId: "105",
        name: "Wall Runner",
        maxLevels: 3,

        icon: "green",
    }],
    ["weakness_exploit", {
        shortId: "106",
        name: "Weakness Exploit",
        maxLevels: 3,

        icon: "pink",
    }],
    ["wide_range", {
        shortId: "107",
        name: "Wide Range",
        maxLevels: 5,

        icon: "white",
    }],
    ["wind_alignment", {
        shortId: "108",
        name: "Wind Alignment",
        maxLevels: 5,

        icon: "lightblue",
    }],
    ["windproof", {
        shortId: "109",
        name: "Windproof",
        maxLevels: 3,

        icon: "white",
    }],
    ["wirebug_whisperer", {
        shortId: "110",
        name: "Wirebug Whisperer",
        maxLevels: 3,

        icon: "lightblue",
    }],
];

const skillMap = new Map();
const skillMapShortIds = new Map();

for (const [skillID, skillObj] of hardcodedSkills) {
    // For convenience, we also attach IDs and filter helpers to each object
    skillObj.id = skillID;
    skillObj.filterHelpers = {};
    skillObj.filterHelpers.nameLower = toNameFilterString(skillObj.name);

    // We will also convert the icon string to an icon image path.
    // This will also implicitly check for the icon validity
    skillObj.iconImgPath = getImgPath(iconsToImageID.get(skillObj.icon));

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
    
    // And now, we check for duplicates and add

    assert(!(skillMap.has(skillObj.id)), "Duplicate skill ID: " + skillObj.id);
    assert(!(skillMapShortIds.has(skillObj.shortId)), "Duplicate skill short ID: " + skillObj.shortId);

    skillMap.set(skillObj.id, skillObj);
    skillMapShortIds.set(skillObj.shortId, skillObj);
}

export {skillMap, skillMapShortIds};

