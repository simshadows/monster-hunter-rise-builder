/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

const element = React.createElement;
const assert = console.assert;

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
        element("b", null, props.skillName),
        //element("br", null, null),
        "Level " + parseInt(props.skillLevel) + " / " + parseInt(props.skillLevelMax),
    );
}

/*********************************************************************
 * Components (Rendering): Equipment Selections **********************
 *********************************************************************/

function EquipInfoBox(props) {
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
                className: "equip-skills-box",
                },
                skillName + " +" + parseInt(skillLevel),
            )
        );
    }

    return element("div",
        {
        className: "equip-info-box",
        },
        element("div",
            {
            className: "equip-name-box",
            },
            element("b", null, props.eqName),
        ),
        element("div",
            {
            className: "equip-skills-wrap-box",
            },
            ...skillBoxes
        ),
    )
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
                    element("th", null, "\u26A1"),
                    element("th", null, parseInt(props.defenses.thunderRes)),
                ),
                element("tr",
                    null,
                    element("th", null, "\uD83D\uDD25"),
                    element("th", null, parseInt(props.defenses.fireRes)),
                    element("th", null, "\u2744\uFE0F"),
                    element("th", null, parseInt(props.defenses.iceRes)),
                ),
                element("tr",
                    null,
                    element("th", null, "\uD83D\uDCA7"),
                    element("th", null, parseInt(props.defenses.waterRes)),
                    element("th", null, "\uD83D\uDC32"),
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

        decoBoxes.push(
            element("div",
                {
                className: "equip-deco-box",
                },
                element("div",
                    {
                    className: "equip-deco-icon-box",
                    },
                    parseInt(slotSize),
                ),
                element("div",
                    {
                    className: "equip-deco-name-box",
                    },
                    ((slotText === null) ? "None" : slotText),
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
    checkStr(props.eqName); // Validate later
    checkArr(props.skillsArray); // Validate later
    checkArr(props.decosArray); // Validate later
    checkObj(props.defenses); // Validate later

    return element("div",
        {
        className: "equip-box",
        },
        element("div",
            {
            className: "equip-icon-box",
            },
            "icon",
        ),
        element(EquipInfoBox,
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
        element(ArmourSelection,
            {
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
            eqName: "Kaiser Vambraces",
            skillsArray: [["Teostra Blessing", 1],
                          ["Critical Eye"    , 1],
                          ["Critical Boost"  , 1],
                          ["NotARealSkill"   , 9]],
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
            eqName: "Ingot Greaves S",
            skillsArray: [["Attack Boost" , 2],
                          ["Critical Eye" , 2],
                          ["NotARealSkill", 3]],
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
        );
    }
}

ReactDOM.render(
    element(MHRBuilderAppContainer, null),
    document.getElementById("mhr-builder-app-container")
);

