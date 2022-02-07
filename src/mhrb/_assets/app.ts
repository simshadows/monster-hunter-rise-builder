/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";

import * as check from "./check";
import {
    getBuildFromQueryString,
    writeBuildToQueryString,
} from "./query_strings";

import {GameData} from "./database/database";
import {
    isArmourSlotStr,
    isDecoEquippableSlotStr,
    br,
} from "./common";
import {
    callTtlDecr,
} from "./utils";
import {Build} from "./model/build";
import {CalcState} from "./model/calc_state";
import {calculateBuildPerformance} from "./model/calculate/index";

import {Modal} from "./component_groups/modal";

import {MainView} from "./component_groups/main_view/index";

import {WeaponSelectView} from "./component_groups/select_views/weapon_select_view";
import {ArmourSelectView} from "./component_groups/select_views/armour_select_view";
import {TalismanSelectView} from "./component_groups/select_views/talisman_select_view";
import {BuffsSelectView} from "./component_groups/select_views/buffs_select_view";
import {PetalaceSelectView} from "./component_groups/select_views/petalace_select_view";
import {DecorationSelectView} from "./component_groups/select_views/decoration_select_view";

const element = React.createElement;
const assert = console.assert;


class MHRBuilderAppInner extends React.Component<any, any> {
    myRefs: any;

    constructor(props) {
        super(props);

        this.state = {
                build: getBuildFromQueryString(this.props.rawDataRO),
                calcState: new CalcState(),
            };

        this.myRefs = {
                mainView:             React.createRef(),

                buffsSelectModal:     React.createRef(),
                weaponSelectModal:    React.createRef(),
                armourSelectModal:    React.createRef(),
                talismanSelectModal:  React.createRef(),
                petalaceSelectModal:  React.createRef(),
                decoSelectModal:      React.createRef(),

                buffsSelectView:      React.createRef(),
                weaponSelectView:     React.createRef(),
                armourSelectView:     React.createRef(),
                talismanSelectView:   React.createRef(),
                petalaceSelectView:   React.createRef(),
                decoSelectView:       React.createRef(),
            };

        // TODO: Ugh, the fact that we don't do this consistently is weird. Change it later?
        this.handlePopState = this.handlePopState.bind(this);

        //writeBuildToQueryString(this.state.build); // We don't do this on instantiation to preserve the first URL
    }

    ttlDecr(v) {
        callTtlDecr(this.myRefs, v);
    }

    // i.e. when the user presses the back-button on the browser
    handlePopState(e) {
        console.log("handlePopState() called. Updating build.");
        this.setState({
                view: "main", // Reset to main view
                build: getBuildFromQueryString(this.props.rawDataRO),
            });
    }

    handleSwitchToBuffsSelect() {
        this.myRefs.buffsSelectModal.current.makeVisible();
    }
    handleSwitchToWeaponSelect() {
        this.myRefs.weaponSelectModal.current.makeVisible();
    }
    handleSwitchToArmourSelect(slotID) {
        assert(isArmourSlotStr(slotID));
        this.myRefs.armourSelectView.current.reinitialize(slotID);
        this.myRefs.armourSelectModal.current.makeVisible();
    }
    handleSwitchToTalismanSelect() {
        this.myRefs.talismanSelectModal.current.makeVisible();
    }
    handleSwitchToPetalaceSelect() {
        this.myRefs.petalaceSelectModal.current.makeVisible();
    }
    handleSwitchToDecorationSelect(slotID, decoSlotID, maxDecoSlotSize) {
        assert(isDecoEquippableSlotStr(slotID));
        check.isInt(decoSlotID);
        assert((decoSlotID >= 0) && (decoSlotID < 3));
        check.isInt(maxDecoSlotSize);
        this.myRefs.decoSelectView.current.reinitialize(slotID, decoSlotID, maxDecoSlotSize);
        this.myRefs.decoSelectModal.current.makeVisible();
    }

    handleChangeCalcState(groupName, stateName, newValue) {
        check.isNonEmptyStr(groupName);
        check.isNonEmptyStr(stateName);
        check.isInt(newValue);

        this.setState({
                calcState: this.state.calcState.setState(groupName, stateName, newValue),
            });
        writeBuildToQueryString(this.state.build);
    }

    handleSelectWeapon(weaponRO) {
        check.isInt(weaponRO.affinity); // Spot check for structure
        this.setState({
                build: this.state.build.setWeapon(this.props.rawDataRO, weaponRO)
            });
        writeBuildToQueryString(this.state.build);
        this.ttlDecr(2); // Close all modals
    }
    handleSelectRampSkill(position, rampSkillID) {
        check.isInt(position);
        check.isStrOrNull(rampSkillID);

        this.setState({
                build: this.state.build.setRampageSkill(this.props.rawDataRO, position, rampSkillID),
            });
        writeBuildToQueryString(this.state.build);
    }
    handleSelectWeaponSpecialSelection(specialSelectionID) {
        check.isIntOrNull(specialSelectionID);

        this.setState({
                build: this.state.build.setWeaponSpecialSelection(this.props.rawDataRO, specialSelectionID),
            });
        writeBuildToQueryString(this.state.build);
    }

    handleSelectArmourPiece(armourPieceRO) {
        if (armourPieceRO != null) { // armourPieceRO allowed to be null
            check.isInt(armourPieceRO.dragonRes); // Spot check for structure
        }
        this.setState({
                build: this.state.build.setArmourPiece(this.props.rawDataRO, armourPieceRO.slotID, armourPieceRO)
            });
        writeBuildToQueryString(this.state.build);
        this.ttlDecr(2); // Close all modals
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
        writeBuildToQueryString(this.state.build);
    }
    handleSelectTalismanDecoSlotSize(decoSlotIndex, decoSlotSize) {
        check.isInt(decoSlotIndex);
        assert((decoSlotIndex >= 0) && (decoSlotIndex <= 2));
        check.isInt(decoSlotSize);
        assert((decoSlotSize >= 0) && (decoSlotSize <= 3));

        this.setState({
                build: this.state.build.setTalismanDecoSlot(this.props.rawDataRO, decoSlotIndex, decoSlotSize),
            });
        writeBuildToQueryString(this.state.build);
    }

    handleSelectPetalace(petalaceRO) {
        if (petalaceRO != null) { // petalaceRO allowed to be null
            check.isInt(petalaceRO.healthGain); // Spot check for structure
            check.isInt(petalaceRO.staminaUp); // Spot check for structure
        }
        this.setState({
                build: this.state.build.setPetalace(this.props.rawDataRO, petalaceRO)
            });
        writeBuildToQueryString(this.state.build);
        this.ttlDecr(2); // Close all modals
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
                build: this.state.build.setDecoration(this.props.rawDataRO, decoRO, slotID, decoSlotID),
            });
        writeBuildToQueryString(this.state.build);
        this.ttlDecr(2); // Close all modals
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
        writeBuildToQueryString(this.state.build);
    }
    
    handleRemoveDeco(slotID, decoSlotID) {
        check.isNonEmptyStr(slotID);
        check.isInt(decoSlotID);
        assert((decoSlotID >= 0) && (decoSlotID <= 2));

        this.setState({
                build: this.state.build.setDecoration(this.props.rawDataRO, null, slotID, decoSlotID),
            });
        writeBuildToQueryString(this.state.build);
    }

    /* Inherited Methods */

    async componentDidMount() {
        window.addEventListener("popstate", this.handlePopState);
    }
    componentWillUnmount() {
        // TODO: Verify event removal matching?
        window.removeEventListener("popstate", this.handlePopState);
    }

    render() {
        assert(this.props.rawDataRO instanceof GameData);

        console.log(this.state);

        const rawData = this.props.rawDataRO;

        const buildRenderingProps = this.state.build.getRenderingProps(this.props.rawDataRO);
        const calcStateSpecification = this.state.calcState.getSpecification();
        const calcStateCurrValues = this.state.calcState.getCurrState();

        const buildPerformanceValues = calculateBuildPerformance(rawData, this.state.build, this.state.calcState);

        return element("div",
            {
            id: "app",
            className: "stackouter",
            },
            element(MainView,
                {
                ref: this.myRefs.mainView,

                buildRenderingProps:    buildRenderingProps,
                calcStateSpecification: calcStateSpecification,
                calcStateCurrValues:    calcStateCurrValues,
                buildPerformanceValues: buildPerformanceValues,

                handleClickBuffsSelect:      ()              => {this.handleSwitchToBuffsSelect();},
                handleClickWeaponSelect:     ()              => {this.handleSwitchToWeaponSelect();},
                handleClickArmourSelect:     (slotID)        => {this.handleSwitchToArmourSelect(slotID);},
                handleClickTalismanSelect:   ()              => {this.handleSwitchToTalismanSelect();},
                handleClickPetalaceSelect:   ()              => {this.handleSwitchToPetalaceSelect();},
                handleClickDecorationSelect: (__a, __b, __c) => {this.handleSwitchToDecorationSelect(__a, __b, __c);},

                handleSelectRampSkill: (__a, __b) => {this.handleSelectRampSkill(__a, __b);},
                handleSelectWeaponSpecialSelection: (__a) => {this.handleSelectWeaponSpecialSelection(__a);},

                handleRemovePiece: (slotID) => {this.handleRemovePiece(slotID);},
                handleRemoveDeco: (slotID, decoSlotID) => {this.handleRemoveDeco(slotID, decoSlotID);},
                },
                null,
            ),
            element(Modal,
                {
                ref: this.myRefs.buffsSelectModal,
                title: "Select Buffs and States",
                },
                element(BuffsSelectView,
                    {
                    ref: this.myRefs.buffsSelectView,
                    calcStateSpecification: calcStateSpecification,
                    calcStateCurrValues:    calcStateCurrValues,
                    handleChangeCalcState: (__a, __b, __c) => {this.handleChangeCalcState(__a, __b, __c)},
                    },
                    null,
                ),
            ),
            element(Modal,
                {
                ref: this.myRefs.weaponSelectModal,
                title: "Select Weapon",
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
                ref: this.myRefs.armourSelectModal,
                title: "Select Armor",
                },
                element(ArmourSelectView,
                    {
                    ref: this.myRefs.armourSelectView,
                    allArmourArrays: rawData.readonly.armour.arrays,
                    currentSelectedArmour: this.state.build.getArmourROs(),
                    handleSelectArmourPiece: (armourPieceRO) => {this.handleSelectArmourPiece(armourPieceRO)},
                    },
                    null,
                ),
            ),
            element(Modal,
                {
                ref: this.myRefs.talismanSelectModal,
                title: "Set Talisman",
                },
                element(TalismanSelectView,
                    {
                    ref: this.myRefs.talismanSelectView,
                    allSkillsArray: rawData.readonly.skills.array,
                    allSkillsMapLongIds: rawData.readonly.skills.longIdsMap,
                    currentSkills: this.state.build.getTalismanSkills(),
                    currentDecoSlots: this.state.build.getTalismanDecoSlots(),
                    handleSelectSkill: (__a, __b, __c) => {this.handleSelectTalismanSkill(__a, __b, __c)},
                    handleSelectDecoSlotSize: (__a, __b) => {this.handleSelectTalismanDecoSlotSize(__a, __b)},
                    },
                    null,
                ),
            ),
            element(Modal,
                {
                ref: this.myRefs.petalaceSelectModal,
                title: "Select Petalace",
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
                ref: this.myRefs.decoSelectModal,
                title: "Select Decoration",
                },
                element(DecorationSelectView,
                    {
                    ref: this.myRefs.decoSelectView,
                    allDecosArray: rawData.readonly.decorations.array,
                    handleSelectDecoration: (__a, __b, __c) => {this.handleSelectDecoration(__a, __b, __c)},
                    },
                    null,
                ),
            ),
        );
    }
}

export {MHRBuilderAppInner};

