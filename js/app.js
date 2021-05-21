/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

const assert = console.assert;
const element = React.createElement;

function checkObj(obj) {
    assert((typeof obj === "object"), "Expected an Object type. Instead got:", obj);
}

function checkInt(obj) {
    assert((typeof obj === "number") && (obj % 1 === 0), "Expected an integer Number. Instead got:", obj);
}

function checkStr(obj) {
    assert((typeof obj === "string"), "Expected a String type. Instead got:", obj);
}
function checkStrOrNull(obj) {
    assert((typeof obj === "string") || (obj === null), "Expected a String type or null. Instead got:", obj);
}

function checkArr(obj) {
    assert(Array.isArray(obj), "Expected an Array type. Instead got:", obj);
}

function checkMap(obj) {
    assert((obj instanceof Map), "Expected a Map type. Instead got:", obj);
}


const _eleStatStrs = new Set(["none", "fire", "water", "thunder", "ice", "dragon", "paralysis", "sleep", "blast"]);
function isEleStatStr(obj) {
    return _eleStatStrs.has(obj);
}

const _eleStatStrToEmojiMap = {
    none: "-",

    fire: "\ud83d\udd25",
    water: "\ud83d\udca7",
    thunder: "\u26a1",
    ice: "\u2744\ufe0f",
    dragon: "\ud83d\udc32",

    paralysis: "\ud83e\udda0",
    sleep: "\ud83d\udca4",
    blast: "\ud83d\udca5",
}
function eleStatStrToEmoji(obj) {
    return _eleStatStrToEmojiMap[obj];
}

/*********************************************************************
 * Common React Elements *********************************************
 *********************************************************************/

function clipsafeP(...children) {
    return element("p", {className: "clipsafe"}, ...children);
}

/*********************************************************************
 * Model *************************************************************
 *********************************************************************/

//class Build {
//
//    constructor() {
//        // TODO
//    }
//
//    getText() {
//        return "Hello, world!";
//    }
//
//}

/*********************************************************************
 * Components (Rendering): Skills Results ****************************
 *********************************************************************/

function SkillResult(props) {
    checkStr(props.skillName);
    checkInt(props.skillLevel);
    checkInt(props.skillLevelMax);
    assert((props.skillLevel <= props.skillLevelMax) && (props.skillLevel > 0));

    return element("div",
        {
        className: "skill-box",
        },
        element("div",
            {
            className: "skill-icon-box",
            },
            element("img",
                {
                src: "./images/placeholders/skill.png",
                alt: "icon",
                },
                null,
            ),
        ),
        element("div",
            {
            className: "skill-detail-box",
            },
            element("b", null, props.skillName),
            //element("br", null, null),
            "Level " + parseInt(props.skillLevel) + " / " + parseInt(props.skillLevelMax),
        ),
    );
}

/*********************************************************************
 * Components (Rendering): Equipment Selections **********************
 *********************************************************************/

function EquipIcon(props) {
    checkStr(props.iconImg);

    return element("div",
        {
        className: "equip-icon-box",
        },
        element("img",
            {
            src: props.iconImg,
            alt: "icon",
            },
            null,
        ),
    )
}

/*** Weapon ***/

function EquipWeaponInfoBox(props) {
    checkStr(props.eqName);
    assert(props.eqName.length > 0);
    checkInt(props.wepAttack);
    assert(props.wepAttack > 0);
    checkInt(props.wepAffinity);
    assert((props.wepAffinity >= -100) && (props.wepAffinity <= 100));
    isEleStatStr(props.wepEleStatType);
    checkInt(props.wepEleStatValue);
    assert(props.wepEleStatValue >= 0);
    checkInt(props.wepDefenseBonus);
    checkArr(props.wepRampageSkills);
    assert(props.wepDefenseBonus >= 0);
    // TODO: Sharpness?

    function statBox(text, value) {
        return element("div",
            {className: "equip-weapon-stat-box clipsafe"},
            clipsafeP(text + parseInt(value)),
        );
    }

    const rampageSkillBoxes = [];
    for (let rampageSkillName of props.wepRampageSkills) {
        checkStr(rampageSkillName);

        rampageSkillBoxes.push(
            element("div",
                {
                className: "equip-weapon-ramp-box clipsafe",
                },
                clipsafeP(rampageSkillName),
            )
        );
    }

    return element("div",
        {
        className: "equip-weapon-info-box",
        },
        element("div",
            {
            className: "equip-name-box clipsafe",
            },
            clipsafeP(element("b", null, props.eqName)),
        ),
        element("div",
            {
            className: "equip-weapon-detail-box",
            },
            element("div",
                {
                className: "equip-weapon-stats-group-box",
                },
                statBox("\u2694\ufe0f ", props.wepAttack),
                statBox("\ud83d\udca2 ", props.wepAffinity),
                statBox(eleStatStrToEmoji(props.wepEleStatType) + " ", props.wepEleStatValue),
                statBox("\ud83d\udee1\ufe0f ", props.wepDefenseBonus),
            ),
            element("div",
                {
                className: "equip-weapon-ramps-group-box",
                },
                ...rampageSkillBoxes
            ),
        ),
    )
}

function WeaponSelection(props) {
    checkStr(props.eqName); // Validate later
    checkInt(props.wepAttack); // Validate later
    checkInt(props.wepAffinity); // Validate later
    checkStr(props.wepEleStatType); // Validate later
    checkInt(props.wepEleStatValue); // Validate later
    checkInt(props.wepDefenseBonus); // Validate later
    checkArr(props.wepRampageSkills); // Validate later
    checkArr(props.decosArray); // Validate later

    return element("div",
        {
        className: "equip-box",
        },
        element(EquipIcon,
            {
            iconImg: "./images/placeholders/weapon.png",
            },
            null,
        ),
        element(EquipWeaponInfoBox,
            {
                eqName: props.eqName,
                wepAttack: props.wepAttack,
                wepAffinity: props.wepAffinity,
                wepEleStatType: props.wepEleStatType,
                wepEleStatValue: props.wepEleStatValue,
                wepDefenseBonus: props.wepDefenseBonus,
                wepRampageSkills: props.wepRampageSkills,
            },
            null,
        ),
        element(EquipDecosWrapBox,
            {
                decosArray: props.decosArray,
            },
            null,
        ),
    );
}

/*** Armour ***/

function EquipArmourInfoBox(props) {
    checkStr(props.eqName);
    assert(props.eqName.length > 0);
    checkArr(props.skillsArray);
    assert(props.skillsArray.length <= 4);

    const skillBoxes = [];
    for (let [skillName, skillLevel] of props.skillsArray) {
        checkStr(skillName);
        checkInt(skillLevel);

        skillBoxes.push(
            element("div",
                {
                className: "equip-skills-box clipsafe",
                },
                clipsafeP(skillName + " +" + parseInt(skillLevel)),
            )
        );
    }

    return element("div",
        {
        className: "equip-info-box",
        },
        element("div",
            {
            className: "equip-name-box clipsafe",
            },
            clipsafeP(element("b", null, props.eqName)),
        ),
        element("div",
            {
            className: "equip-skills-wrap-box",
            },
            ...skillBoxes
        ),
    )
}

function EquipDefensesBoxEmpty() {
    return element("div",
        {
        className: "equip-defenses-wrap-box",
        },
        null,
    );
}
function EquipDefensesBox(props) {
    checkObj(props.defenses);
    for (let [stat, value] of Object.entries(props.defenses)) {
        checkInt(value);
    }
    assert(Object.keys(props.defenses).length === 6);

    return element("div",
        {
        className: "equip-defenses-wrap-box",
        },
        element("table",
            {
            className: "equip-defenses-table",
            },
            element("tbody",
                null,
                element("tr",
                    null,
                    element("th", null, "\uD83D\uDEE1\uFE0F"),
                    element("th", null, parseInt(props.defenses.defense)),
                    element("th", null, eleStatStrToEmoji("thunder")),
                    element("th", null, parseInt(props.defenses.thunderRes)),
                ),
                element("tr",
                    null,
                    element("th", null, eleStatStrToEmoji("fire")),
                    element("th", null, parseInt(props.defenses.fireRes)),
                    element("th", null, eleStatStrToEmoji("ice")),
                    element("th", null, parseInt(props.defenses.iceRes)),
                ),
                element("tr",
                    null,
                    element("th", null, eleStatStrToEmoji("water")),
                    element("th", null, parseInt(props.defenses.waterRes)),
                    element("th", null, eleStatStrToEmoji("dragon")),
                    element("th", null, parseInt(props.defenses.dragonRes)),
                ),
            ),
        ),
    );
}

function EquipDecosWrapBox(props) {
    checkArr(props.decosArray);
    assert(props.decosArray.length <= 3);

    const decoBoxes = [];
    for (let [slotSize, slotText] of props.decosArray) {
        checkInt(slotSize);
        assert((slotSize > 0) && (slotSize <= 3));
        assert(slotText != "None"); // Should be set to null if no deco in slot
        checkStrOrNull(slotText);

        const iconImg = "./images/placeholders/" + (()=>{
            if (slotSize == 1) return "deco_slot_1.png";
            if (slotSize == 2) return "deco_slot_2.png";
            if (slotSize == 3) return "deco_slot_3.png";
        })();

        decoBoxes.push(
            element("div",
                {
                className: "equip-deco-box",
                },
                element("div",
                    {
                    className: "equip-deco-icon-box",
                    },
                    element("img",
                        {
                        src: iconImg,
                        alt: "icon",
                        },
                        null,
                    ),
                ),
                element("div",
                    {
                    className: "equip-deco-name-box clipsafe",
                    },
                    clipsafeP(((slotText === null) ? "None" : slotText)),
                ),
            )
        );
    }

    return element("div",
        {
        className: "equip-decos-wrap-box",
        },
        ...decoBoxes
    );
}

function ArmourSelection(props) {
    checkStr(props.slotIconImg);
    checkStr(props.eqName); // Validate later
    checkArr(props.skillsArray); // Validate later
    checkArr(props.decosArray); // Validate later
    checkObj(props.defenses); // Validate later

    return element("div",
        {
        className: "equip-box",
        },
        element(EquipIcon,
            {
            iconImg: props.slotIconImg,
            },
            null,
        ),
        element(EquipArmourInfoBox,
            {
                eqName: props.eqName,
                skillsArray: props.skillsArray,
            },
            null,
        ),
        element(EquipDefensesBox,
            {
            defenses: props.defenses,
            },
            null,
        ),
        element(EquipDecosWrapBox,
            {
                decosArray: props.decosArray,
            },
            null,
        ),
    );
}

/*** Others ***/

function TalismanSelection(props) {
    checkStr(props.eqName); // Validate later
    checkArr(props.skillsArray); // Validate later
    checkArr(props.decosArray); // Validate later

    return element("div",
        {
        className: "equip-box",
        },
        element(EquipIcon,
            {
            iconImg: "./images/placeholders/talisman.png",
            },
            null,
        ),
        element(EquipArmourInfoBox,
            {
                eqName: props.eqName,
                skillsArray: props.skillsArray,
            },
            null,
        ),
        element(EquipDefensesBoxEmpty,
            null,
            null,
        ),
        element(EquipDecosWrapBox,
            {
                decosArray: props.decosArray,
            },
            null,
        ),
    );
}

function MiscSelection(props) {
    return element("div",
        {
        id: "misc-selections-box",
        className: "equip-box",
        },
        "Misc stuff (like Power Charm and HH buffs) to be implemented here later.",
        element("br", null, null),
        "Or I might move buffs to the top as simple icons.",
        element("br", null, null),
        "Maybe also Petalace, idk.",
    );
}

/*********************************************************************
 * Components (Rendering): Root **************************************
 *********************************************************************/

function UtilBox() {
    return element("div",
        {
        id: "util-box",
        },
        element("div",
            {
            id: "settings-button",
            },
            "\u2699" // TODO: Replace with a proper icon
        ),
    );
}

function SkillsResultsBox() {
    return element("div",
        {
        id: "skillsresultsbox",
        className: "sub-box",
        },
        element(SkillResult,
            {
            skillName: "Attack Boost",
            skillLevel: 7,
            skillLevelMax: 7,
            },
            null,
        ),
        element(SkillResult,
            {
            skillName: "Weakness Exploit",
            skillLevel: 2,
            skillLevelMax: 3,
            },
            null,
        ),
    );
}

function EquipmentSelectionsBox() {
    return element("div",
        {
        id: "equipmentselectionsbox",
        className: "sub-box",
        },
        element(WeaponSelection,
            {
            eqName: "Abominable Great Sword",
            wepAttack: 230,
            wepAffinity: -15,
            wepEleStatType: "ice",
            wepEleStatValue: 20,
            wepDefenseBonus: 0,
            wepRampageSkills: ["Affinity Boost I",
                               "~~NOTREAL~~",
                               "~~NOTREAL~~"],
            decosArray: [[2, "Charger Jewel 2"],
                         [1, "~~NOTREAL~~"]],
            },
            null,
        ),
        element(ArmourSelection,
            {
            slotIconImg: "./images/placeholders/head.png",
            eqName: "Kaiser Crown",
            skillsArray: [["Critical Eye"  , 3],
                          ["Critical Boost", 1]],
            decosArray: [[1, null]],
            defenses: {defense: 74,
                       fireRes: 4,
                       waterRes: -4,
                       thunderRes: 1,
                       iceRes: -1,
                       dragonRes: -3},
            },
            null,
        ),
        element(ArmourSelection,
            {
            slotIconImg: "./images/placeholders/chest.png",
            eqName: "Tobi-Kadachi Mail S",
            skillsArray: [["Mind's Eye"  , 1],
                          ["Critical Eye", 1]],
            decosArray: [[3, "Charger Jewel 2"]],
            defenses: {defense: 58,
                       fireRes: 0,
                       waterRes: -3,
                       thunderRes: 3,
                       iceRes: 0,
                       dragonRes: 0},
            },
            null,
        ),
        element(ArmourSelection,
            {
            slotIconImg: "./images/placeholders/arms.png",
            eqName: "Kaiser Vambraces",
            skillsArray: [["Teostra Blessing" , 1],
                          ["Critical Eye"     , 1],
                          ["Critical Boost"   , 1],
                          ["~~NOTREAL~~", 9]],
            decosArray: [[2, "Tenderizer Jewel 2"]],
            defenses: {defense: 74,
                       fireRes: 4,
                       waterRes: -4,
                       thunderRes: 1,
                       iceRes: -1,
                       dragonRes: -3},
            },
            null,
        ),
        element(ArmourSelection,
            {
            slotIconImg: "./images/placeholders/waist.png",
            eqName: "Anjanath Coil S",
            skillsArray: [["Attack Boost", 2]],
            decosArray: [[2, "Charger Jewel 2"],
                         [1, "Steadfast Jewel 1"],
                         [1, "Steadfast Jewel 1"]],
            defenses: {defense: 60,
                       fireRes: 3,
                       waterRes: -3,
                       thunderRes: -1,
                       iceRes: -1,
                       dragonRes: 0},
            },
            null,
        ),
        element(ArmourSelection,
            {
            slotIconImg: "./images/placeholders/legs.png",
            eqName: "Ingot Greaves S",
            skillsArray: [["Attack Boost"     , 2],
                          ["Critical Eye"     , 2],
                          ["~~NOTREAL~~", 3]],
            decosArray: [[1, "Steadfast Jewel 1"]],
            defenses: {defense: 40,
                       fireRes: -1,
                       waterRes: -1,
                       thunderRes: 1,
                       iceRes: 0,
                       dragonRes: 0},
            },
            null,
        ),
        element(TalismanSelection,
            {
            eqName: "Talisman",
            skillsArray: [["Weakness Exploit", 1]],
            decosArray: [[2, "Tenderizer Jewel 2"]],
            },
            null,
        ),
        element(MiscSelection,
            null,
            null,
        ),
    );
}

function CalculationResultsBox() {
    return element("div",
        {
        id: "calculationresultsbox",
        className: "sub-box",
        },
        "CalculationResultsBox",
    );
}

class MHRBuilderAppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {message: "kek"};
    }

    render() {
        return element("div",
            {
            className: "mhr-builder-app",
            },
            element("div",
                {
                className: "mhr-builder-app-inner-box",
                },
                element(UtilBox,
                    null,
                    null,
                ),
                element("div",
                    {
                    className: "main-box",
                    },
                    element(SkillsResultsBox,
                        null,
                        null,
                    ),
                    element(EquipmentSelectionsBox,
                        null,
                        null,
                    ),
                    element(CalculationResultsBox,
                        null,
                        null,
                    ),
                ),
            ),
        );
    }
}

ReactDOM.render(
    element(MHRBuilderAppContainer, null),
    document.getElementById("mhr-builder-app-container")
);

