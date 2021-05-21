/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "./check.js";
import SkillsResultsBox from "./component_groups/skill_results_box.js";
import EquipmentSelectionsBox from "./component_groups/equipment_selections_box.js";
import CalculationResultsBox from "./component_groups/calculation_results_box.js";
import UtilBox from "./component_groups/util_box.js";

const element = React.createElement;

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

