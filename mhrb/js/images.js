/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

const element = React.createElement;
const assert = console.assert;

const imgPathMap = new Map([
    ["placeholder_talisman", "./images/placeholders/talisman.png"],
    ["placeholder_petalace", "./images/placeholders/talisman.png"],

    ["deco_slot1_empty", "./images/deco_slot1.svg"],
    ["deco_slot2_empty", "./images/deco_slot2.svg"],
    ["deco_slot3_empty", "./images/deco_slot3.svg"],
    
    ["attack_icon"  , "./images/mhw_attack_icon_inkscapesourcefile.svg"    ],
    ["affinity_icon", "./images/mhw_affinity_icon_inkscapesourcefile.svg"  ],
    ["defense_icon" , "./images/derived/mhw_screenshot_defense_icon_v3.png"],

    ["eleres_fire_icon"   , "./images/elementalres_fire_icon_inkscapesourcefile.svg" ],
    ["eleres_water_icon"  , "./images/elementalres_water_icon_inkscapesourcefile.svg"],
    ["eleres_thunder_icon", "./images/elementalres_thunder_icon_inkscapesourcefile.svg"],
    ["eleres_ice_icon"    , "./images/elementalres_ice_icon_inkscapesourcefile.svg"],
    ["eleres_dragon_icon" , "./images/elementalres_dragon_icon_inkscapesourcefile.svg"],
    
    ["status_poison_icon"    , "./images/status_poison_icon_inkscapesourcefile.svg"   ],
    ["status_paralysis_icon" , "./images/status_paralysis_icon_inkscapesourcefile.svg"],
    ["status_sleep_icon"     , "./images/status_sleep_icon_inkscapesourcefile.svg"    ],
    ["status_blast_icon"     , "./images/status_blast_icon_inkscapesourcefile.svg"    ],

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

    ["itembox_mightseed"      , "./images/itembox_mightseed.svg"                     ],
    ["itembox_demonpowder"    , "./images/itembox_powercharm_inkscapesourcefile.svg" ],
    ["itembox_demondrug"      , "./images/itembox_demondrug.svg"                     ],
    ["itembox_megademondrug"  , "./images/itembox_demondrug_with_star_closer.svg"    ],
    ["itembox_adamantseed"    , "./images/itembox_adamantseed_inkscapesourcefile.svg"],
    ["itembox_hardshellpowder", "./images/itembox_armorcharm_inkscapesourcefile.svg" ],
    ["itembox_armorskin"      , "./images/itembox_armorskin_inkscapesourcefile.svg"  ],
    ["itembox_megaarmorskin"  , "./images/itembox_armorskin_with_star_closer_inkscapesourcefile.svg"],

    ["dango_booster", "./images/dango_booster_inkscapesourcefile.svg"],
    
    ["palico_powerdrum", "./images/palico_powerdrum_inkscapesourcefile.svg"],
    ["palico_rousingroar", "./images/palico_rousingroar_inkscapesourcefile.svg"],
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

const decoIconColours = [
    "blue",
    "brown",
    "darkblue",
    "gold",
    "green",
    "grey",
    "lightblue",
    "orange",
    "pink",
    "purple",
    "red",
    "white",
    "yellow",
];
for (const decoIconColour of decoIconColours) {
    imgPathMap.set("deco_slot1_size1_" + decoIconColour, "./images/deco_slot1_size1_" + decoIconColour + ".svg");
    imgPathMap.set("deco_slot2_size1_" + decoIconColour, "./images/deco_slot2_size1_" + decoIconColour + ".svg");
    imgPathMap.set("deco_slot2_size2_" + decoIconColour, "./images/deco_slot2_size2_" + decoIconColour + ".svg");
    imgPathMap.set("deco_slot3_size1_" + decoIconColour, "./images/deco_slot3_size1_" + decoIconColour + ".svg");
    imgPathMap.set("deco_slot3_size2_" + decoIconColour, "./images/deco_slot3_size2_" + decoIconColour + ".svg");
    imgPathMap.set("deco_slot3_size3_" + decoIconColour, "./images/deco_slot3_size3_" + decoIconColour + ".svg");
}

/*** General Functions ***/

function getImgPath(id) {
    if (!imgPathMap.has(id)) {
        throw new Error("Invalid image ID: ", id);
    }
    return imgPathMap.get(id);
}

function getSimpleImgElement(id) {
    return element("img",
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

    return element("svg",
        otherProps,
        element("use",
            {
            href: "./images/fontawesome-free-web/sprites/" + style + ".svg#" + fragment,
            },
            null,
        ),
    );
}

/*** Usage-specific Functions ***/

const eleStatStrToImgPathMap = {
    fire:    getImgPath("eleres_fire_icon"   ),
    water:   getImgPath("eleres_water_icon"  ),
    thunder: getImgPath("eleres_thunder_icon"),
    ice:     getImgPath("eleres_ice_icon"    ),
    dragon:  getImgPath("eleres_dragon_icon" ),

    poison:    getImgPath("status_poison_icon"   ),
    paralysis: getImgPath("status_paralysis_icon"),
    sleep:     getImgPath("status_sleep_icon"    ),
    blast:     getImgPath("status_blast_icon"    ),
}
function eleStatStrToImgPath(obj) {
    assert(obj !== null, "Passing null to eleStatStrToImgPath will return undefined. This is probably not desired.");
    assert(obj !== "none", "Passing 'none' to eleStatStrToImgPath will return undefined. This is probably not desired.");
    return eleStatStrToImgPathMap[obj];
}

const eleStatStrToImgIdMap = {
    fire:    "eleres_fire_icon",
    water:   "eleres_water_icon",
    thunder: "eleres_thunder_icon",
    ice:     "eleres_ice_icon",
    dragon:  "eleres_dragon_icon",

    poison:    "status_poison_icon",
    paralysis: "status_paralysis_icon",
    sleep:     "status_sleep_icon",
    blast:     "status_blast_icon",
}
function eleStatStrToImgId(obj) {
    assert(obj !== null, "Passing null to eleStatStrToImgPath will return undefined. This is probably not desired.");
    assert(obj !== "none", "Passing 'none' to eleStatStrToImgPath will return undefined. This is probably not desired.");
    return eleStatStrToImgIdMap[obj];
}

/*** ***/

export {
    getImgPath,
    getSimpleImgElement,
    FontAwesomeSprite,
    eleStatStrToImgPath,
    eleStatStrToImgId,
};

