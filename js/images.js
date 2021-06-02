/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

const imgPathMap = new Map([
    ["placeholder_buff"    , "./images/placeholders/buff.png"              ],
    ["placeholder_weapon"  , "./images/derived/weapon_greatsword_white.png"],
    ["placeholder_talisman", "./images/placeholders/talisman.png"          ],
    ["placeholder_petalace", "./images/placeholders/talisman.png"          ],

    ["placeholder_deco_size_1", "./images/placeholders/deco_slot_1.png"],
    ["placeholder_deco_size_2", "./images/placeholders/deco_slot_2.png"],
    ["placeholder_deco_size_3", "./images/placeholders/deco_slot_3.png"],
    
    ["head_white" , "./images/derived/armour_head_white.png" ],
    ["chest_white", "./images/derived/armour_chest_white.png"],
    ["arms_white" , "./images/derived/armour_arms_white.png" ],
    ["waist_white", "./images/derived/armour_waist_white.png"],
    ["legs_white" , "./images/derived/armour_legs_white.png" ],

    ["weapon_greatsword_white"    , "./images/derived/weapon_greatsword_white.png"    ],
    ["weapon_longsword_white"     , "./images/derived/weapon_longsword_white.png"     ],
    ["weapon_swordandshield_white", "./images/derived/weapon_swordandshield_white.png"],
    ["weapon_dualblades_white"    , "./images/derived/weapon_dualblades_white.png"    ],
    ["weapon_switchaxe_white"     , "./images/derived/weapon_switchaxe_white.png"     ],
    ["weapon_chargeblade_white"   , "./images/derived/weapon_chargeblade_white.png"   ],
    ["weapon_hammer_white"        , "./images/derived/weapon_hammer_white.png"        ],
    ["weapon_huntinghorn_white"   , "./images/derived/weapon_huntinghorn_white.png"   ],
    ["weapon_lance_white"         , "./images/derived/weapon_lance_white.png"         ],
    ["weapon_gunlance_white"      , "./images/derived/weapon_gunlance_white.png"      ],
    ["weapon_insectglaive_white"  , "./images/derived/weapon_insectglaive_white.png"  ],
    ["weapon_bow_white"           , "./images/derived/weapon_bow_white.png"           ],
    ["weapon_lightbowgun_white"   , "./images/derived/weapon_lightbowgun_white.png"   ],
    ["weapon_heavybowgun_white"   , "./images/derived/weapon_heavybowgun_white.png"   ],

    ["defense_icon"       , "./images/derived/mhw_screenshot_defense_icon_v3.png" ],
    ["eleres_fire_icon"   , "./images/elementalres_fire_icon_inkscapesourcefile.svg" ],
    ["eleres_water_icon"  , "./images/elementalres_water_icon_inkscapesourcefile.svg"],
    ["eleres_thunder_icon", "./images/elementalres_thunder_icon_inkscapesourcefile.svg"],
    ["eleres_ice_icon"    , "./images/elementalres_ice_icon_inkscapesourcefile.svg"],
    ["eleres_dragon_icon" , "./images/elementalres_dragon_icon_inkscapesourcefile.svg"],

    ["skill_icon_blue"     , "./images/skill_icon_blue.svg"     ],
    ["skill_icon_brown"    , "./images/skill_icon_brown.svg"    ],
    ["skill_icon_darkblue" , "./images/skill_icon_darkblue.svg" ],
    ["skill_icon_gold"     , "./images/skill_icon_gold.svg"     ],
    ["skill_icon_green"    , "./images/skill_icon_green.svg"    ],
    ["skill_icon_grey"     , "./images/skill_icon_grey.svg"     ],
    ["skill_icon_lightblue", "./images/skill_icon_lightblue.svg"],
    ["skill_icon_orange"   , "./images/skill_icon_orange.svg"   ],
    ["skill_icon_pink"     , "./images/skill_icon_pink.svg"     ],
    ["skill_icon_purple"   , "./images/skill_icon_purple.svg"   ],
    ["skill_icon_red"      , "./images/skill_icon_red.svg"      ],
    ["skill_icon_white"    , "./images/skill_icon_white.svg"    ],
    ["skill_icon_yellow"   , "./images/skill_icon_yellow.svg"   ],
]);

function getImgPath(id) {
    if (!imgPathMap.has(id)) {
        throw new Error("Invalid image ID: ", id);
    }
    return imgPathMap.get(id);
}

export {getImgPath};

