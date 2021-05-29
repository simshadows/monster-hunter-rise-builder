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
    strHasOnlyLowercaseUnderscore,
    strHasOnlyLowercaseNumeral,
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
        shortId: "a",
        name: "Fire Resistance",
        maxLevels: 3,
    }],
    ["water_resistance", {
        shortId: "b",
        name: "Water Resistance",
        maxLevels: 3,
    }],
    ["thunder_resistance", {
        shortId: "c",
        name: "Thunder Resistance",
        maxLevels: 3,
    }],
    ["ice_resistance", {
        shortId: "d",
        name: "Ice Resistance",
        maxLevels: 3,
    }],
    ["dragon_resistance", {
        shortId: "e",
        name: "Dragon Resistance",
        maxLevels: 3,
    }],
    ["poison_resistance", {
        shortId: "f",
        name: "Poison Resistance",
        maxLevels: 3,
    }],
    ["paralysis_resistance", {
        shortId: "g",
        name: "Paralysis Resistance",
        maxLevels: 3,
    }],
    ["sleep_resistance", {
        shortId: "h",
        name: "Sleep Resistance",
        maxLevels: 3,
    }],
    ["blast_resistance", {
        shortId: "i",
        name: "Blast Resistance",
        maxLevels: 3,
    }],

    //
    // EVERYTHING ELSE
    //

    ["affinity_sliding", {
        shortId: "j",
        name: "Affinity Sliding",
        maxLevels: 1,
    }],
    ["agitator", {
        shortId: "k",
        name: "Agitator",
        maxLevels: 5,
    }],
    ["aim_booster", {
        shortId: "l",
        name: "Aim Booster",
        maxLevels: 3,
    }],
    ["ammo_up", {
        shortId: "m",
        name: "Ammo Up",
        maxLevels: 3,
    }],
    ["artillery", {
        shortId: "n",
        name: "Artillery",
        maxLevels: 3,
    }],
    ["attack_boost", {
        shortId: "o",
        name: "Attack Boost",
        maxLevels: 7,
    }],
    ["blight_resistance", {
        shortId: "p",
        name: "Blight Resistance",
        maxLevels: 3,
    }],
    ["bludgeoner", {
        shortId: "q",
        name: "Bludgeoner",
        maxLevels: 3,
    }],
    ["bombardier", {
        shortId: "r",
        name: "Bombardier",
        maxLevels: 3,
    }],
    ["botanist", {
        shortId: "s",
        name: "Botanist",
        maxLevels: 4,
    }],
    ["bow_charge_plus", {
        shortId: "t",
        name: "Bow Charge Plus",
        maxLevels: 1,
    }],
    ["bubbly_dance", {
        shortId: "u",
        name: "Bubbly Dance",
        maxLevels: 3,
    }],
    ["capture_master", {
        shortId: "v",
        name: "Capture Master",
        maxLevels: 1,
    }],
    ["carving_pro", {
        shortId: "w",
        name: "Carving Pro",
        maxLevels: 1,
    }],
    ["chameleos_blessing", {
        shortId: "x",
        name: "Chameleos Blessing",
        maxLevels: 4,
    }],
    ["constitution", {
        shortId: "y",
        name: "Constitution",
        maxLevels: 5,
    }],
    ["counterstrike", {
        shortId: "z",
        name: "Counterstrike",
        maxLevels: 3,
    }],
    ["critical_boost", {
        shortId: "10",
        name: "Critical Boost",
        maxLevels: 3,
    }],
    ["critical_draw", {
        shortId: "11",
        name: "Critical Draw",
        maxLevels: 3,
    }],
    ["critical_element", {
        shortId: "12",
        name: "Critical Element",
        maxLevels: 3,
    }],
    ["critical_eye", {
        shortId: "13",
        name: "Critical Eye",
        maxLevels: 7,
    }],
    ["defense_boost", {
        shortId: "14",
        name: "Defense Boost",
        maxLevels: 7,
    }],
    ["diversion", {
        shortId: "15",
        name: "Diversion",
        maxLevels: 1,
    }],
    ["divine_blessing", {
        shortId: "16",
        name: "Divine Blessing",
        maxLevels: 3,
    }],
    ["earplugs", {
        shortId: "17",
        name: "Earplugs",
        maxLevels: 5,
    }],
    ["evade_extender", {
        shortId: "18",
        name: "Evade Extender",
        maxLevels: 3,
    }],
    ["evade_window", {
        shortId: "19",
        name: "Evade Window",
        maxLevels: 5,
    }],
    ["flinch_free", {
        shortId: "1a",
        name: "Flinch Free",
        maxLevels: 3,
    }],
    ["focus", {
        shortId: "1b",
        name: "Focus",
        maxLevels: 3,
    }],
    ["fortify", {
        shortId: "1c",
        name: "Fortify",
        maxLevels: 1,
    }],
    ["free_meal", {
        shortId: "1d",
        name: "Free Meal",
        maxLevels: 3,
    }],
    ["geologist", {
        shortId: "1e",
        name: "Geologist",
        maxLevels: 3,
    }],
    ["good_luck", {
        shortId: "1f",
        name: "Good Luck",
        maxLevels: 3,
    }],
    ["guard", {
        shortId: "1g",
        name: "Guard",
        maxLevels: 5,
    }],
    ["guard_up", {
        shortId: "1h",
        name: "Guard Up",
        maxLevels: 3,
    }],
    ["handicraft", {
        shortId: "1i",
        name: "Handicraft",
        maxLevels: 5,
    }],
    ["hellfire_cloak", {
        shortId: "1j",
        name: "Hellfire Cloak",
        maxLevels: 4,
    }],
    ["heroics", {
        shortId: "1k",
        name: "Heroics",
        maxLevels: 5,
    }],
    ["horn_maestro", {
        shortId: "1l",
        name: "Horn Maestro",
        maxLevels: 1,
    }],
    ["hunger_resistance", {
        shortId: "1m",
        name: "Hunger Resistance",
        maxLevels: 3,
    }],
    ["item_prolonger", {
        shortId: "1n",
        name: "Item Prolonger",
        maxLevels: 3,
    }],
    ["jump_master", {
        shortId: "1o",
        name: "Jump Master",
        maxLevels: 1,
    }],
    ["kushala_blessing", {
        shortId: "1p",
        name: "Kushala Blessing",
        maxLevels: 4,
    }],
    ["latent_power", {
        shortId: "1q",
        name: "Latent Power",
        maxLevels: 5,
    }],
    ["leap_of_faith", {
        shortId: "1r",
        name: "Leap Of Faith",
        maxLevels: 1,
    }],
    ["load_shells", {
        shortId: "1s",
        name: "Load Shells",
        maxLevels: 2,
    }],
    ["marathon_runner", {
        shortId: "1t",
        name: "Marathon Runner",
        maxLevels: 3,
    }],
    ["master_mounter", {
        shortId: "1u",
        name: "Master Mounter",
        maxLevels: 1,
    }],
    ["masters_touch", {
        shortId: "1v",
        name: "Master's Touch",
        maxLevels: 3,
    }],
    ["maximum_might", {
        shortId: "1w",
        name: "Maximum Might",
        maxLevels: 3,
    }],
    ["minds_eye", {
        shortId: "1x",
        name: "Mind's Eye",
        maxLevels: 3,
    }],
    ["much_resistance", {
        shortId: "1y",
        name: "Muck Resistance",
        maxLevels: 2,
    }],
    ["mushroomancer", {
        shortId: "1z",
        name: "Mushroomancer",
        maxLevels: 3,
    }],
    ["normal_rapid_up", {
        shortId: "20",
        name: "Normal/Rapid Up",
        maxLevels: 3,
    }],
    ["offensive_guard", {
        shortId: "21",
        name: "Offensive Guard",
        maxLevels: 3,
    }],
    ["partbreaker", {
        shortId: "22",
        name: "Partbreaker",
        maxLevels: 3,
    }],
    ["peak_performance", {
        shortId: "23",
        name: "Peak Performance",
        maxLevels: 3,
    }],
    ["pierce_up", {
        shortId: "24",
        name: "Pierce Up",
        maxLevels: 3,
    }],
    ["power_prolonger", {
        shortId: "25",
        name: "Power Prolonger",
        maxLevels: 3,
    }],
    ["protective_polish", {
        shortId: "26",
        name: "Protective Polish",
        maxLevels: 3,
    }],
    ["punishing_draw", {
        shortId: "27",
        name: "Punishing Draw",
        maxLevels: 3,
    }],
    ["quick_sheath", {
        shortId: "28",
        name: "Quick Sheath",
        maxLevels: 3,
    }],
    ["rapid_fire_up", {
        shortId: "29",
        name: "Rapid Fire Up",
        maxLevels: 3,
    }],
    ["rapid_morph", {
        shortId: "2a",
        name: "Rapid Morph",
        maxLevels: 3,
    }],
    ["razor_sharp", {
        shortId: "2b",
        name: "Razor Sharp",
        maxLevels: 3,
    }],
    ["recoil_down", {
        shortId: "2c",
        name: "Recoil Down",
        maxLevels: 3,
    }],
    ["recovery_speed", {
        shortId: "2d",
        name: "Recovery Speed",
        maxLevels: 3,
    }],
    ["recovery_up", {
        shortId: "2e",
        name: "Recovery Up",
        maxLevels: 3,
    }],
    ["reload_speed", {
        shortId: "2f",
        name: "Reload Speed",
        maxLevels: 3,
    }],
    ["resentment", {
        shortId: "2g",
        name: "Resentment",
        maxLevels: 5,
    }],
    ["resuscitate", {
        shortId: "2h",
        name: "Resuscitate",
        maxLevels: 3,
    }],
    ["slugger", {
        shortId: "2i",
        name: "Slugger",
        maxLevels: 3,
    }],
    ["spare_shot", {
        shortId: "2j",
        name: "Spare Shot",
        maxLevels: 3,
    }],
    ["special_ammo_boost", {
        shortId: "2k",
        name: "Special Ammo Boost",
        maxLevels: 2,
    }],
    ["speed_eating", {
        shortId: "2l",
        name: "Speed Eating",
        maxLevels: 3,
    }],
    ["speed_sharpening", {
        shortId: "2m",
        name: "Speed Sharpening",
        maxLevels: 3,
    }],
    ["spread_up", {
        shortId: "2n",
        name: "Spread Up",
        maxLevels: 3,
    }],
    ["stamina_surge", {
        shortId: "2o",
        name: "Stamina Surge",
        maxLevels: 3,
    }],
    ["stamina_thief", {
        shortId: "2p",
        name: "Stamina Thief",
        maxLevels: 3,
    }],
    ["steadiness", {
        shortId: "2q",
        name: "Steadiness",
        maxLevels: 2,
    }],
    ["stun_resistance", {
        shortId: "2r",
        name: "Stun Resistance",
        maxLevels: 3,
    }],
    ["teostra_blessing", {
        shortId: "2s",
        name: "Teostra Blessing",
        maxLevels: 4,
    }],
    ["thunder_alignment", {
        shortId: "2t",
        name: "Thunder Alignment",
        maxLevels: 5,
    }],
    ["tremor_resistance", {
        shortId: "2u",
        name: "Tremor Resistance",
        maxLevels: 3,
    }],
    ["wall_runner", {
        shortId: "2v",
        name: "Wall Runner",
        maxLevels: 3,
    }],
    ["weakness_exploit", {
        shortId: "2w",
        name: "Weakness Exploit",
        maxLevels: 3,
    }],
    ["wide_range", {
        shortId: "2x",
        name: "Wide Range",
        maxLevels: 5,
    }],
    ["wind_alignment", {
        shortId: "2y",
        name: "Wind Alignment",
        maxLevels: 5,
    }],
    ["windproof", {
        shortId: "2z",
        name: "Windproof",
        maxLevels: 3,
    }],
    ["wirebug_whisperer", {
        shortId: "30",
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

    assert(strHasOnlyLowercaseUnderscore(skillObj.id), "Wrong skill ID format. Skill ID: " + skillObj.id);
    assert(strHasOnlyLowercaseNumeral(skillObj.shortId), "Wrong skill short ID format. Skill short ID: " + skillObj.shortId);
    // Name can have any format.
    assert(skillObj.maxLevels > 0, "Skill must have a positive non-zero maximum level. Skill ID: " + skillObj.id);
    assert(skillObj.maxLevels < 8, "Skill must have a maximum level below 8. Skill ID: " + skillObj.id); // Change if needed
    
    // Check for duplicates then add
    assert(!(skillMapShortIds.has(skillObj.shortId)), "Duplicate skill short ID: " + skillObj.shortId);
    skillMapShortIds.set(skillObj.shortId, skillObj);
}

export {skillMap, skillMapShortIds};

