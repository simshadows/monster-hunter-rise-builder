/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

const imgPathMap = new Map([
    ["placeholder_buff"    , "./images/placeholders/buff.png"],
    ["placeholder_weapon"  , "./images/placeholders/weapon.png"],
    ["placeholder_talisman", "./images/placeholders/talisman.png"],
    ["placeholder_petalace", "./images/placeholders/talisman.png"],

    ["placeholder_deco_size_1", "./images/placeholders/deco_slot_1.png"],
    ["placeholder_deco_size_2", "./images/placeholders/deco_slot_2.png"],
    ["placeholder_deco_size_3", "./images/placeholders/deco_slot_3.png"],
    
    ["head_white" , "./images/derived/armour_head_white.png" ],
    ["chest_white", "./images/derived/armour_chest_white.png"],
    ["arms_white" , "./images/derived/armour_arms_white.png" ],
    ["waist_white", "./images/derived/armour_waist_white.png"],
    ["legs_white" , "./images/derived/armour_legs_white.png" ],

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

