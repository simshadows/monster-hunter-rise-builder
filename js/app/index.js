/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "./check.js";
import {
    downloadRawData,
} from "./database.js";
import {
    isArmourSlotStr,
    isDecoEquippableSlotStr,
    br,
} from "./common.js";

import Modal from "./component_groups/modal.js";

import SkillsResultsBox from "./component_groups/main_view/skill_results_box.js";
import EquipmentSelectionsBox from "./component_groups/main_view/equipment_selections_box.js";
import CalculationResultsBox from "./component_groups/main_view/calculation_results_box.js";
import UtilBox from "./component_groups/main_view/util_box.js";

import {
    BuffsSelectView,
    WeaponSelectView,
    WeaponCustomizeView,
    ArmourSelectView,
    TalismanSelectView,
    PetalaceSelectView,
    DecorationSelectView,
} from "./component_groups/select_views.js";

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
        check.isFunction(this.props.handleClickWeaponCustomize);
        check.isFunction(this.props.handleClickArmourSelect);
        check.isFunction(this.props.handleClickTalismanSelect);
        check.isFunction(this.props.handleClickPetalaceSelect);
        check.isFunction(this.props.handleClickDecorationSelect);

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
                            handleClickBuffsSelect:     ()       => {this.props.handleClickBuffsSelect();},
                            handleClickWeaponSelect:    ()       => {this.props.handleClickWeaponSelect();},
                            handleClickWeaponCustomize: ()       => {this.props.handleClickWeaponCustomize();},
                            handleClickArmourSelect:    (slotID) => {this.props.handleClickArmourSelect(slotID);},
                            handleClickTalismanSelect:  ()       => {this.props.handleClickTalismanSelect();},
                            handleClickPetalaceSelect:  ()       => {this.props.handleClickPetalaceSelect();},
                            handleClickDecorationSelect: (slotID, decoSlotID) => {this.props.handleClickDecorationSelect(slotID, decoSlotID)},
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

class MHRBuilderAppContainer extends React.Component {

    static _viewEnumValues = new Set([
            "main",
            "buffs_select_view",
            "armour_select_view",
            "weapon_select_view",
            "weapon_customize_view",
            "talisman_select_view",
            "petalace_select_view",
            "decoration_select_view",
        ]);

    constructor(props) {
        super(props);

        this.state = {
                // All possible states are in _viewEnumValues
                view: "main", // Always start with the main view
                //view: "weapon_select_view", // Useful for debugging

                // Two states: Either it's null, or it's a fully-constructed raw data object. Don't modify it once it's built.
                rawData: null,
            };

        this.myRefs = {
                armourSelectView: React.createRef(),
                decoSelectView: React.createRef(),
            };

        // TODO: Ugh, the fact that we don't do this consistently is weird. Change it later?
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    handleKeypress(e) {
        if (e.code === "Escape") {
            if (this.state.view != "main") {
                this.setState({view: "main"});
            }
        }
    }

    handleSwitchToBuffsSelect() {
        assert(this.state.view == "main");
        this.setState({view: "buffs_select_view"});
    }
    handleSwitchToWeaponSelect() {
        assert(this.state.view == "main");
        this.setState({view: "weapon_select_view"});
    }
    handleSwitchToWeaponCustomize() {
        assert(this.state.view == "main");
        this.setState({view: "weapon_customize_view"});
    }
    handleSwitchToArmourSelect(slotID) {
        assert(isArmourSlotStr(slotID));
        assert(this.state.view == "main");
        this.myRefs.armourSelectView.current.reinitialize(slotID);
        this.setState({view: "armour_select_view"});
    }
    handleSwitchToTalismanSelect() {
        assert(this.state.view == "main");
        this.setState({view: "talisman_select_view"});
    }
    handleSwitchToPetalaceSelect() {
        assert(this.state.view == "main");
        this.setState({view: "petalace_select_view"});
    }
    handleSwitchToDecorationSelect(slotID, decoSlotID) {
        assert(isDecoEquippableSlotStr(slotID));
        check.isInt(decoSlotID);
        assert((decoSlotID >= 0) && (decoSlotID < 3));
        assert(this.state.view == "main");
        this.myRefs.decoSelectView.current.reinitialize(slotID, decoSlotID);
        this.setState({view: "decoration_select_view"});
    }

    handleReturnToMainView() {
        assert(this.state.view != "main");
        this.setState({view: "main"});
    }

    /* Inherited Methods */

    async componentDidMount() {
        document.addEventListener("keydown", this.handleKeypress);

        const rawData = await downloadRawData();
        this.setState({rawData: rawData});
        console.log(rawData);
    }
    componentWillUnmount() {
        // TODO: Verify event removal matching?
        document.removeEventListener("keydown", this.handleKeypress);
    }

    render() {
        assert(this.constructor._viewEnumValues.has(this.state.view));

        // Don't load UI until all data is loaded.
        // TODO: Consider making a proper loading screen.
        if (this.state.rawData === null) {
            return "Loading app... Loading data...";
        }

        const selectionViewIsVisible = {
                buffs:       (this.state.view == "buffs_select_view" ),
                weapon:      (this.state.view == "weapon_select_view"),
                weapon_cust: (this.state.view == "weapon_customize_view"),
                armour:      (this.state.view == "armour_select_view"),
                talisman:    (this.state.view == "talisman_select_view"),
                petalace:    (this.state.view == "petalace_select_view"),
                decos:       (this.state.view == "decoration_select_view"),
            };

        return element("div",
            {
            id: "app",
            className: "stackouter",
            },
            element(MainView,
                {
                handleClickBuffsSelect:      ()       => {this.handleSwitchToBuffsSelect();},
                handleClickWeaponSelect:     ()       => {this.handleSwitchToWeaponSelect();},
                handleClickWeaponCustomize:  ()       => {this.handleSwitchToWeaponCustomize();},
                handleClickArmourSelect:     (slotID) => {this.handleSwitchToArmourSelect(slotID);},
                handleClickTalismanSelect:   ()       => {this.handleSwitchToTalismanSelect();},
                handleClickPetalaceSelect:   ()       => {this.handleSwitchToPetalaceSelect();},
                handleClickDecorationSelect: (slotID, decoSlotID) => {this.handleSwitchToDecorationSelect(slotID, decoSlotID);},
                },
                null,
            ),
            element(Modal,
                {
                visible: selectionViewIsVisible.buffs,
                title: "Select Buffs and States",
                handleCloseModal: () => {this.handleReturnToMainView();},
                },
                element(BuffsSelectView,
                    null,
                    null,
                ),
            ),
            element(Modal,
                {
                visible: selectionViewIsVisible.weapon,
                title: "Select Weapon",
                handleCloseModal: () => {this.handleReturnToMainView();},
                },
                element(WeaponSelectView,
                    {
                    rawData: this.state.rawData,
                    },
                    null,
                ),
            ),
            element(Modal,
                {
                visible: selectionViewIsVisible.weapon_cust,
                title: "Customize Weapon",
                handleCloseModal: () => {this.handleReturnToMainView();},
                },
                element(WeaponCustomizeView,
                    null,
                    null,
                ),
            ),
            element(Modal,
                {
                visible: selectionViewIsVisible.armour,
                title: "Select Armor",
                handleCloseModal: () => {this.handleReturnToMainView();},
                },
                element(ArmourSelectView,
                    {
                    ref: this.myRefs.armourSelectView,
                    },
                    null,
                ),
            ),
            element(Modal,
                {
                visible: selectionViewIsVisible.talisman,
                title: "Set Talisman",
                handleCloseModal: () => {this.handleReturnToMainView();},
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
                handleCloseModal: () => {this.handleReturnToMainView();},
                },
                element(PetalaceSelectView,
                    null,
                    null,
                ),
            ),
            element(Modal,
                {
                visible: selectionViewIsVisible.decos,
                title: "Select Decoration",
                handleCloseModal: () => {this.handleReturnToMainView();},
                },
                element(DecorationSelectView,
                    {
                    ref: this.myRefs.decoSelectView,
                    },
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

