/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

const element = React.createElement;

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
 * Rendering: Components *********************************************
 *********************************************************************/

function SkillsResultsBox() {
    return element("div",
        {
        id: "skillsresultsbox",
        className: "mainbox",
        },
        element("p",
            null,
            "SkillsResultsBox",
        ),
    );
}

function EquipmentSelectionsBox() {
    return element("div",
        {
        id: "equipmentselectionsbox",
        className: "mainbox",
        },
        element("p",
            null,
            "EquipmentSelectionsBox",
        ),
    );
}

function CalculationResultsBox() {
    return element("div",
        {
        id: "calculationresultsbox",
        className: "mainbox",
        },
        element("p",
            null,
            "CalculationResultsBox",
        ),
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
            className: "tmpboxes mhrbuilderappcontainer",
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
        );
    }
}

ReactDOM.render(
    element(MHRBuilderAppContainer, null),
    document.getElementById("mhr-builder-app-container")
);

