/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "./check.js";
import {GameData} from "./database/database.js";
import {
    isArmourSlotStr,
    isDecoEquippableSlotStr,
    br,
} from "./common.js";
import {Build} from "./model/build.js";
import {CalcState} from "./model/calc_state.js";
import {calculateBuildPerformance} from "./model/calculate.js";

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

class MHRBuilderAppInner extends React.Component {

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
                //view: "talisman_select_view", // Useful for debugging

                build: new Build(this.props.rawDataRO, this.props.rawDataRO.getDefaultWeapon()),
                calcState: new CalcState(),
            };

        this.myRefs = {
                weaponSelectView:   React.createRef(),
                armourSelectView:   React.createRef(),
                talismanSelectView: React.createRef(),
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
    handleSwitchToDecorationSelect(slotID, decoSlotID, maxDecoSlotSize) {
        assert(isDecoEquippableSlotStr(slotID));
        check.isInt(decoSlotID);
        assert((decoSlotID >= 0) && (decoSlotID < 3));
        check.isInt(maxDecoSlotSize);
        assert(this.state.view == "main");
        this.myRefs.decoSelectView.current.reinitialize(slotID, decoSlotID, maxDecoSlotSize);
        this.setState({view: "decoration_select_view"});
    }

    handleReturnToMainView() {
        assert(this.state.view != "main");
        this.setState({view: "main"});
    }

    handleChangeCalcState(groupName, stateName, newValue) {
        check.isNonEmptyStr(groupName);
        check.isNonEmptyStr(stateName);
        check.isInt(newValue);

        this.setState({
                calcState: this.state.calcState.setState(groupName, stateName, newValue),
            });
    }

    handleSelectWeapon(weaponRO) {
        check.isInt(weaponRO.affinity); // Spot check for structure
        this.setState({
                view: "main", // Return back to main view
                build: this.state.build.setWeapon(this.props.rawDataRO, weaponRO)
            });
    }
    handleSelectRampSkill(position, rampSkillID) {
        check.isInt(position);
        check.isStrOrNull(rampSkillID);

        this.setState({
                build: this.state.build.setRampageSkill(this.props.rawDataRO, position, rampSkillID),
            });
    }

    handleSelectArmourPiece(armourPieceRO) {
        if (armourPieceRO != null) { // armourPieceRO allowed to be null
            check.isInt(armourPieceRO.dragonRes); // Spot check for structure
        }
        this.setState({
                view: "main", // Return back to main view
                build: this.state.build.setArmourPiece(this.props.rawDataRO, armourPieceRO.slotID, armourPieceRO)
            });
    }

    handleSelectTalismanSkill(skillIndex, skillRO, skillLevel) {
        // We check the arguments in more detail in the Build method call
        check.isInt(skillIndex);
        assert((skillIndex >= 0) && (skillIndex <= 1));
        check.isObjOrNull(skillRO);
        //check.isIntOrNull(skillLevel);

        this.setState({
                build: this.state.build.setTalismanSkill(this.props.rawDataRO, skillIndex, skillRO, skillLevel),
            });
    }
    handleSelectTalismanDecoSlotSize(decoSlotIndex, decoSlotSize) {
        check.isInt(decoSlotIndex);
        assert((decoSlotIndex >= 0) && (decoSlotIndex <= 2));
        check.isInt(decoSlotSize);
        assert((decoSlotSize >= 0) && (decoSlotSize <= 3));

        this.setState({
                build: this.state.build.setTalismanDecoSlot(this.props.rawDataRO, decoSlotIndex, decoSlotSize),
            });
    }

    handleSelectPetalace(petalaceRO) {
        if (petalaceRO != null) { // petalaceRO allowed to be null
            check.isInt(petalaceRO.healthGain); // Spot check for structure
            check.isInt(petalaceRO.staminaUp); // Spot check for structure
        }
        this.setState({
                view: "main", // Return back to main view
                build: this.state.build.setPetalace(this.props.rawDataRO, petalaceRO)
            });
    }
    
    handleSelectDecoration(decoRO, slotID, decoSlotID) {
        if (decoRO === null) {
            check.isObj(decoRO);
            check.isInt(decoRO.slotSize); // Spot check for structure
        }
        check.isNonEmptyStr(slotID);
        check.isInt(decoSlotID);
        assert((decoSlotID >= 0) && (decoSlotID <= 2));

        this.setState({
                view: "main", // Return back to main view
                build: this.state.build.setDecoration(this.props.rawDataRO, decoRO, slotID, decoSlotID),
            });
    }

    // TODO: Merge with handleSelectArmourPiece().
    handleRemovePiece(slotID) {
        if (slotID === "talisman") {
            this.setState({
                    build: this.state.build.resetTalisman(),
                });
        } else if (slotID === "petalace") {
            this.setState({
                build: this.state.build.setPetalace(this.props.rawDataRO, null)
                });
        } else {
            assert(isArmourSlotStr(slotID));
            this.setState({
                    build: this.state.build.setArmourPiece(this.props.rawDataRO, slotID, null)
                });
        }
    }

    /* Inherited Methods */

    async componentDidMount() {
        document.addEventListener("keydown", this.handleKeypress);
    }
    componentWillUnmount() {
        // TODO: Verify event removal matching?
        document.removeEventListener("keydown", this.handleKeypress);
    }

    render() {
        assert(this.props.rawDataRO instanceof GameData);
        assert(this.constructor._viewEnumValues.has(this.state.view));

        console.log(this.state);

        const rawData = this.props.rawDataRO;

        const selectionViewIsVisible = {
                buffs:       (this.state.view == "buffs_select_view" ),
                weapon:      (this.state.view == "weapon_select_view"),
                weapon_cust: (this.state.view == "weapon_customize_view"),
                armour:      (this.state.view == "armour_select_view"),
                talisman:    (this.state.view == "talisman_select_view"),
                petalace:    (this.state.view == "petalace_select_view"),
                decos:       (this.state.view == "decoration_select_view"),
            };


        const buildRenderingProps = this.state.build.getRenderingProps(this.props.rawDataRO);
        const calcStateSpecification = this.state.calcState.getSpecification();
        const calcStateCurrValues = this.state.calcState.getCurrState();

        const buildPerformanceValues = calculateBuildPerformance(this.state.build, this.state.calcState);

        return element("div",
            {
            id: "app",
            className: "stackouter",
            },
            element(MainView,
                {
                buildRenderingProps:    buildRenderingProps,
                calcStateSpecification: calcStateSpecification,
                calcStateCurrValues:    calcStateCurrValues,
                buildPerformanceValues: buildPerformanceValues,

                handleClickBuffsSelect:      ()        => {this.handleSwitchToBuffsSelect();},
                handleClickWeaponSelect:     ()        => {this.handleSwitchToWeaponSelect();},
                handleClickWeaponCustomize:  ()        => {this.handleSwitchToWeaponCustomize();},
                handleClickArmourSelect:     (...args) => {this.handleSwitchToArmourSelect(...args);},
                handleClickTalismanSelect:   ()        => {this.handleSwitchToTalismanSelect();},
                handleClickPetalaceSelect:   ()        => {this.handleSwitchToPetalaceSelect();},
                handleClickDecorationSelect: (...args) => {this.handleSwitchToDecorationSelect(...args);},

                handleRemovePiece: (slotID) => {this.handleRemovePiece(slotID);},
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
                    {
                    calcStateSpecification: calcStateSpecification,
                    calcStateCurrValues:    calcStateCurrValues,
                    handleChangeCalcState: (...args) => {this.handleChangeCalcState(...args)},
                    },
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
                    allWeaponsArray: rawData.readonly.weapons.array,
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
                    allArmourArrays: rawData.readonly.armour.arrays,
                    currentSelectedArmour: this.state.build.getArmourObjsRO(),
                    handleSelectArmourPiece: (armourPieceRO) => {this.handleSelectArmourPiece(armourPieceRO)},
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
                    {
                    ref: this.myRefs.talismanSelectView,
                    allSkillsArray: rawData.readonly.skills.array,
                    allSkillsMapLongIds: rawData.readonly.skills.longIdsMap,
                    currentSkills: this.state.build.getTalismanSkills(),
                    currentDecoSlots: this.state.build.getTalismanDecoSlots(),
                    handleSelectSkill: (...args) => {this.handleSelectTalismanSkill(...args)},
                    handleSelectDecoSlotSize: (...args) => {this.handleSelectTalismanDecoSlotSize(...args)},
                    },
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
                    allPetalacesArray: rawData.readonly.petalaces.array,
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
                    allDecosArray: rawData.readonly.decorations.array,
                    handleSelectDecoration: (...args) => {this.handleSelectDecoration(...args)},
                    },
                    null,
                ),
            ),
        );
    }
}

export {MHRBuilderAppInner};

