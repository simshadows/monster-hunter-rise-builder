/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

const imgPathMap = new Map([
    ["placeholder_buff"    , "./images/placeholders/buff.png"           ],
    ["placeholder_talisman", "./images/placeholders/talisman.png"       ],
    ["placeholder_petalace", "./images/placeholders/talisman.png"       ],

    ["placeholder_deco_size_1", "./images/placeholders/deco_slot_1.png"],
    ["placeholder_deco_size_2", "./images/placeholders/deco_slot_2.png"],
    ["placeholder_deco_size_3", "./images/placeholders/deco_slot_3.png"],
    
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

    ["itembox_powercharm", "./images/itembox_powercharm_inkscapesourcefile.svg"],
    ["itembox_powertalon", "./images/itembox_powertalon_inkscapesourcefile.svg"],
    ["itembox_armorcharm", "./images/itembox_armorcharm_inkscapesourcefile.svg"],
    ["itembox_armortalon", "./images/itembox_armortalon_inkscapesourcefile.svg"],
]);

// Now we add a few procedurally generated IDs.

const weaponCategoryStrs = [ // TODO: Import the one from common.js?
    "greatsword",
    "longsword",
    "swordandshield",
    "dualblades",
    "switchaxe",
    "chargeblade",
    "hammer",
    "huntinghorn",
    "lance",
    "gunlance",
    "insectglaive",
    "bow",
    "lightbowgun",
    "heavybowgun",
];
const armourSlotStrs = [ // TODO: Import the one from common.js?
    "head",
    "chest",
    "arms",
    "waist",
    "legs",
];
for (let rarity = 1; rarity <= 7 ; ++rarity) {
    for (const categoryStr of weaponCategoryStrs) {
        const imgID = "weapon_" + categoryStr + "_r" + parseInt(rarity);
        const imgPath = "./images/derived/weapon_" + categoryStr + "_r" + parseInt(rarity) +".png";
        imgPathMap.set(imgID, imgPath);
    }
    for (const armourSlotStr of armourSlotStrs) {
        const imgID = armourSlotStr + "_r" + parseInt(rarity);
        const imgPath = "./images/derived/armour_" + armourSlotStr + "_r" + parseInt(rarity) +".png";
        imgPathMap.set(imgID, imgPath);
    }
}

/*** ***/

function getImgPath(id) {
    if (!imgPathMap.has(id)) {
        throw new Error("Invalid image ID: ", id);
    }
    return imgPathMap.get(id);
}

function getSimpleImgElement(id) {
    return React.createElement("img",
        {
        src: getImgPath(id),
        alt: id, // TODO: Better alt texts?
        },
        null,
    );
}

function FontAwesomeSprite(props) {
    let {style, fragment, ...otherProps} = props;

    if (typeof style !== "string") {
        style = "solid"; // Default
    }
    console.assert(style.length > 0);

    console.assert((typeof fragment === "string") && (fragment.length > 0));

    return React.createElement("svg",
        otherProps,
        React.createElement("use",
            {
            href: "./images/fontawesome-free-web/sprites/" + style + ".svg#" + fragment,
            },
            null,
        ),
    );
}

export {getImgPath, getSimpleImgElement, FontAwesomeSprite};

