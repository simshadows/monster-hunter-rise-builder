/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "./check.js";
import {downloadRawData} from "./database/database.js";
import {
    isArmourSlotStr,
    isDecoEquippableSlotStr,
    br,
} from "./common.js";
import {Build} from "./model/build.js";

import Modal from "./component_groups/modal.js";

import {MainView} from "./component_groups/main_view/index.js";

import {WeaponSelectView} from "./component_groups/select_views/weapon_select_view.js";
import {WeaponCustomizeView} from "./component_groups/select_views/weapon_customize_view.js";
import {ArmourSelectView} from "./component_groups/select_views/armour_select_view.js";
import {TalismanSelectView} from "./component_groups/select_views/talisman_select_view.js";
import {BuffsSelectView} from "./component_groups/select_views/buffs_select_view.js";
import {PetalaceSelectView} from "./component_groups/select_views/petalace_select_view.js";
import {DecorationSelectView} from "./component_groups/select_views/decoration_select_view.js";

const element = React.createElement;
const assert = console.assert;

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

                build: new Build(null),
            };

        this.myRefs = {
                weaponSelectView:   React.createRef(),
                armourSelectView:   React.createRef(),
                petalaceSelectView: React.createRef(),
                decoSelectView:     React.createRef(),
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

    handleSelectWeapon(weaponRO) {
        check.isInt(weaponRO.affinity); // Spot check for structure
        this.setState({
                view: "main", // Return back to main view
                build: this.state.build.setWeapon(this.state.rawData, weaponRO)
            });
    }
    handleSelectRampSkill(position, rampSkillID) {
        check.isInt(position);
        check.isStrOrNull(rampSkillID);

        this.setState({
                build: this.state.build.setRampageSkill(this.state.rawData, position, rampSkillID),
            });
    }

    handleSelectPetalace(petalaceRO) {
        if (petalaceRO != null) { // petalaceRO allowed to be null
            check.isInt(petalaceRO.healthGain); // Spot check for structure
            check.isInt(petalaceRO.staminaUp); // Spot check for structure
        }
        this.setState({
                view: "main", // Return back to main view
                build: this.state.build.setPetalace(this.state.rawData, petalaceRO)
            });
    }

    /* Inherited Methods */

    async componentDidMount() {
        document.addEventListener("keydown", this.handleKeypress);

        const rawData = await downloadRawData();

        this.setState({
                rawData: rawData,
                build: this.state.build.setWeapon(rawData, rawData.getDefaultWeapon()),
            });
        this.myRefs.weaponSelectView.current.populateWithData(rawData.getWeaponsArray());
        this.myRefs.armourSelectView.current.populateWithData(rawData.getArmourArrays());
        this.myRefs.petalaceSelectView.current.populateWithData(rawData.getPetalacesArray());
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
        console.log(this.state);

        const selectionViewIsVisible = {
                buffs:       (this.state.view == "buffs_select_view" ),
                weapon:      (this.state.view == "weapon_select_view"),
                weapon_cust: (this.state.view == "weapon_customize_view"),
                armour:      (this.state.view == "armour_select_view"),
                talisman:    (this.state.view == "talisman_select_view"),
                petalace:    (this.state.view == "petalace_select_view"),
                decos:       (this.state.view == "decoration_select_view"),
            };


        const buildRenderingProps = this.state.build.getRenderingProps(this.state.rawData);

        return element("div",
            {
            id: "app",
            className: "stackouter",
            },
            element(MainView,
                {
                buildRenderingProps:         buildRenderingProps,
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
                    ref: this.myRefs.weaponSelectView,
                    currentSelectedWeapon: this.state.build.getWeaponObjRO(),
                    handleSelectWeapon: (weaponRO) => {this.handleSelectWeapon(weaponRO)},
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
                    {
                    buildRenderingProps: buildRenderingProps,
                    handleSelectRampageSkill: (position, rampSkillID) => {this.handleSelectRampSkill(position, rampSkillID)},
                    },
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
                    {
                    ref: this.myRefs.petalaceSelectView,
                    currentSelectedPetalace: this.state.build.getPetalaceObjRO(),
                    handleSelectPetalace: (petalaceRO) => {this.handleSelectPetalace(petalaceRO)},
                    },
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

