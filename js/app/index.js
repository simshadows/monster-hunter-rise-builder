/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "./check.js";

import Modal from "./component_groups/modal.js";

import SkillsResultsBox from "./component_groups/main_view/skill_results_box.js";
import EquipmentSelectionsBox from "./component_groups/main_view/equipment_selections_box.js";
import CalculationResultsBox from "./component_groups/main_view/calculation_results_box.js";
import UtilBox from "./component_groups/main_view/util_box.js";

const element = React.createElement;
const assert = console.assert;

function Footer(props) {
    return element("footer",
        {
        id: "footer",
        },
        element("p",
            null,
            element("b", null, "This project is currently in very early development."),
            " Full source code available ",
            element("a",
                {
                href: "https://github.com/simshadows/monster-hunter-rise-builder",
                target: "_blank",
                },
                "here"
            ),
            "."
        )
    );
}

class MHRBuilderAppMainView extends React.Component {

    constructor(props) {
        super(props);
        check.isFunction(props.handleClickArmourSelect);
    }

    render() {
        return element("div",
            {
            className: "body-outer-box",
            },
            element("div",
                {
                id: "app-inner-box",
                className: "body-inner-box",
                },
                element(UtilBox,
                    null,
                    null,
                ),
                element("div",
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
                ),
            ),
            element(Footer,
                null,
                null,
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
            "This is the armour select view! It's not implemented yet.",
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
                //view: "armour_select_view",
            };
    }

    // Handlers

    handleClickArmourSelect() {
        assert(this.state.view == "main");
        this.setState({view: "armour_select_view"});
    }

    handleCloseArmourSelect() {
        assert(this.state.view == "armour_select_view");
        this.setState({view: "main"});
    }

    // Render

    render() {
        const armourSelectIsVisible = (()=>{
                if (this.state.view == "main") {
                    return false;
                } else if (this.state.view == "armour_select_view") {
                    return true;
                } else {
                    throw "invalid view";
                }
            })();

        return element("div",
            {
            id: "app",
            className: "stackouter",
            },
            element(MHRBuilderAppMainView,
                {
                handleClickArmourSelect: () => {this.handleClickArmourSelect();},
                },
                null,
            ),
            element(Modal,
                {
                visible: armourSelectIsVisible,
                title: "Select Armor",
                handleCloseModal: () => {this.handleCloseArmourSelect();},
                },
                element(MHRBuilderAppArmourSelectView,
                    null,
                    null,
                ),
            ),
        );
    }
}

ReactDOM.render(
    element(MHRBuilderAppContainer, null),
    document.getElementById("app-container")
);

