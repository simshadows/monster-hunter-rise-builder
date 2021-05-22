/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "./check.js";
import SkillsResultsBox from "./component_groups/main_view/skill_results_box.js";
import EquipmentSelectionsBox from "./component_groups/main_view/equipment_selections_box.js";
import CalculationResultsBox from "./component_groups/main_view/calculation_results_box.js";
import UtilBox from "./component_groups/main_view/util_box.js";

const element = React.createElement;

class MHRBuilderAppMainView extends React.Component {

    constructor(props) {
        super(props);
        check.isFunction(props.handleClickArmourSelect);
    }

    render() {
        return element("div",
            {
            className: "app-view-box",
            id: "mhr-builder-app-main-view",
            },
            element("div",
                {
                className: "main-view-inner-box",
                },
                element(SkillsResultsBox,
                    null,
                    null,
                ),
                element(EquipmentSelectionsBox,
                    {
                    handleClickArmourSelect: () => {this.props.handleClickArmourSelect();},
                    },
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

class MHRBuilderAppArmourSelectView extends React.Component {
    render() {
        return element("div",
            {
            className: "app-view-box",
            id: "mhr-builder-app-armour-select-view",
            },
            "This is the armour select view! It's not implemented yet. Also, you're gonna have to refresh the page to go back.",
        );
    }
}

class MHRBuilderAppContainer extends React.Component {

    static _viewValues = new Set([
            "main",
            "armour_select_view",
        ]);

    constructor(props) {
        super(props);
        this.state = {
                view: "main", // Always open with the main view
            };
    }

    handleClickArmourSelect() {
        this.setState({view: "armour_select_view"});
    }

    render() {
        const viewElement = (()=>{
                if (this.state.view == "main") {
                    return element(MHRBuilderAppMainView,
                        {
                        handleClickArmourSelect: () => {this.handleClickArmourSelect();},
                        },
                        null,
                    );
                } else if (this.state.view == "armour_select_view") {
                    return element(MHRBuilderAppArmourSelectView,
                        null,
                        null,
                    );
                } else {
                    throw "invalid view";
                }
            })();

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
                viewElement,
            ),
        );
    }
}

ReactDOM.render(
    element(MHRBuilderAppContainer, null),
    document.getElementById("mhr-builder-app-container")
);

