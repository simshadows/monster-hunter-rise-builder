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

class MainView extends React.Component {

    render() {
        check.isFunction(this.props.handleClickBuffsSelect);
        check.isFunction(this.props.handleClickWeaponSelect);
        check.isFunction(this.props.handleClickArmourSelect);
        check.isFunction(this.props.handleClickTalismanSelect);
        check.isFunction(this.props.handleClickPetalaceSelect);

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
                            handleClickBuffsSelect:    () => {this.props.handleClickBuffsSelect();},
                            handleClickWeaponSelect:   () => {this.props.handleClickWeaponSelect();},
                            handleClickArmourSelect:   () => {this.props.handleClickArmourSelect();},
                            handleClickTalismanSelect: () => {this.props.handleClickTalismanSelect();},
                            handleClickPetalaceSelect: () => {this.props.handleClickPetalaceSelect();},
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

class BuffsSelectView extends React.Component {
    render() {
        return element("div",
            {
            className: "app-view-box",
            id: "mhr-builder-app-buffs-select-view",
            },
            "This is the buffs/states select view! It's not implemented yet.",
        );
    }
}

class WeaponSelectView extends React.Component {
    render() {
        return element("div",
            {
            className: "app-view-box",
            id: "mhr-builder-app-weapon-select-view",
            },
            "This is the weapon select view! It's not implemented yet.",
        );
    }
}

class ArmourSelectView extends React.Component {
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

class TalismanSelectView extends React.Component {
    render() {
        return element("div",
            {
            className: "app-view-box",
            id: "mhr-builder-app-talisman-select-view",
            },
            "This is the talisman select view! It's not implemented yet.",
        );
    }
}

class PetalaceSelectView extends React.Component {
    render() {
        return element("div",
            {
            className: "app-view-box",
            id: "mhr-builder-app-petalace-select-view",
            },
            "This is the petalace select view! It's not implemented yet.",
        );
    }
}

class DecorationsSelectView extends React.Component {
    render() {
        return element("div",
            {
            className: "app-view-box",
            id: "mhr-builder-app-decorations-select-view",
            },
            "This is the decorations select view! It's not implemented yet.",
        );
    }
}

class MHRBuilderAppContainer extends React.Component {

    static _viewValues = new Set([
            "main",
            "buffs_select_view",
            "armour_select_view",
            "weapon_select_view",
            "talisman_select_view",
            "petalace_select_view",
            "decos_select_view",
        ]);

    constructor(props) {
        super(props);
        this.state = {
                view: "main", // Always start with the main view
            };
    }

    handleClickBuffsSelect() {
        assert(this.state.view == "main");
        this.setState({view: "buffs_select_view"});
    }
    handleClickWeaponSelect() {
        assert(this.state.view == "main");
        this.setState({view: "weapon_select_view"});
    }
    handleClickArmourSelect() {
        assert(this.state.view == "main");
        this.setState({view: "armour_select_view"});
    }
    handleClickTalismanSelect() {
        assert(this.state.view == "main");
        this.setState({view: "talisman_select_view"});
    }
    handleClickPetalaceSelect() {
        assert(this.state.view == "main");
        this.setState({view: "petalace_select_view"});
    }

    handleCloseBuffsSelect() {
        assert(this.state.view == "buffs_select_view");
        this.setState({view: "main"});
    }
    handleCloseWeaponSelect() {
        assert(this.state.view == "weapon_select_view");
        this.setState({view: "main"});
    }
    handleCloseArmourSelect() {
        assert(this.state.view == "armour_select_view");
        this.setState({view: "main"});
    }
    handleCloseTalismanSelect() {
        assert(this.state.view == "talisman_select_view");
        this.setState({view: "main"});
    }
    handleClosePetalaceSelect() {
        assert(this.state.view == "petalace_select_view");
        this.setState({view: "main"});
    }

    // Render

    render() {
        const selectionViewIsVisible = {
                buffs:    (this.state.view == "buffs_select_view" ),
                weapon:   (this.state.view == "weapon_select_view"),
                armour:   (this.state.view == "armour_select_view"),
                talisman: (this.state.view == "talisman_select_view"),
                petalace: (this.state.view == "petalace_select_view"),
                decos:    (this.state.view == "decos_select_view"),
            };

        return element("div",
            {
            id: "app",
            className: "stackouter",
            },
            element(MainView,
                {
                handleClickBuffsSelect:    () => {this.handleClickBuffsSelect();},
                handleClickWeaponSelect:   () => {this.handleClickWeaponSelect();},
                handleClickArmourSelect:   () => {this.handleClickArmourSelect();},
                handleClickTalismanSelect: () => {this.handleClickTalismanSelect();},
                handleClickPetalaceSelect: () => {this.handleClickPetalaceSelect();},
                },
                null,
            ),
            element(Modal,
                {
                visible: selectionViewIsVisible.buffs,
                title: "Select Buffs and States",
                handleCloseModal: () => {this.handleCloseBuffsSelect();},
                },
                element(BuffsSelectView,
                    null,
                    null,
                ),
            ),
            element(Modal,
                {
                visible: selectionViewIsVisible.weapon,
                title: "Select And Customize Weapon",
                handleCloseModal: () => {this.handleCloseWeaponSelect();},
                },
                element(WeaponSelectView,
                    null,
                    null,
                ),
            ),
            element(Modal,
                {
                visible: selectionViewIsVisible.armour,
                title: "Select Armor",
                handleCloseModal: () => {this.handleCloseArmourSelect();},
                },
                element(ArmourSelectView,
                    null,
                    null,
                ),
            ),
            element(Modal,
                {
                visible: selectionViewIsVisible.talisman,
                title: "Set Talisman",
                handleCloseModal: () => {this.handleCloseTalismanSelect();},
                },
                element(TalismanSelectView,
                    null,
                    null,
                ),
            ),
            element(Modal,
                {
                visible: selectionViewIsVisible.petalace,
                title: "Select Petalace",
                handleCloseModal: () => {this.handleClosePetalaceSelect();},
                },
                element(PetalaceSelectView,
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

