/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

const element = React.createElement;

function checkInt(obj) {
    console.assert((typeof obj === "number") && (obj % 1 === 0), "Expected an integer Number. Instead got:", obj);
}

function checkStr(obj) {
    console.assert((typeof obj === "string"), "Expected a String type. Instead got:", obj);
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
    checkStr(props.skillName)
    checkInt(props.skillLevel)
    checkInt(props.skillLevelMax)

    return element("div",
        {
        className: "skill-box",
        },
        props.skillName,
        element("br", null, null),
        "Level " + parseInt(props.skillLevel) + " / " + parseInt(props.skillLevelMax),
    )
}

/*********************************************************************
 * Components (Rendering): Root **************************************
 *********************************************************************/

function UtilBox() {
    return element("div",
        {
        id: "util-box",
        className: "tmpboxes",
        },
        element("div",
            {
            id: "settings-button",
            className: "tmpboxes",
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
        "EquipmentSelectionsBox",
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
            className: "tmpboxes mhr-builder-app",
            },
            element(UtilBox,
                null,
                null,
            ),
            element("div",
                {
                className: "tmpboxes main-box",
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

