/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";

import * as check from "../../../check.ts";
import {getImgPath} from "../../../images.ts";
import {
    isEleStatStr,
    isArmourSlotStr,
    isDecoEquippableSlotStr,
    clipsafeSpan,
} from "../../../common.ts";

import {
    EquipIcon,
    EquipInfoBox,
    EquipDecosWrapBox,
    EquipArmourInfoBox,
    EquipDefensesBoxEmpty,
    EquipDefensesBox,
} from "./common.ts";
import {BuffsSelection} from "./buffs.ts";
import {WeaponSelection} from "./weapon.ts";
import {ArmourSelection} from "./armour.ts";
import {TalismanSelection} from "./talisman.ts";
import {PetalaceSelection} from "./petalace.ts";

const assert = console.assert;
const element = React.createElement;

class EquipmentSelectionsBox extends React.Component {
    constructor(props) {
        super(props);

        this.myRefs = {
                weaponSelection: React.createRef(),
            };
    }

    ttlDecr(v) {
        this.myRefs.weaponSelection.current.ttlDecr(v);
    }

    handleClickBuffsSelect(){
        this.props.handleClickBuffsSelect();
    }
    handleClickWeaponSelect() {
        this.props.handleClickWeaponSelect();
    }
    handleClickArmourSelect(slotID) {
        this.props.handleClickArmourSelect(slotID);
    }
    handleClickTalismanSelect() {
        this.props.handleClickTalismanSelect();
    }
    handleClickPetalaceSelect() {
        this.props.handleClickPetalaceSelect();
    }
    handleClickDecorationSelect(slotID, decoSlotID, maxDecoSlotSize) {
        assert(isDecoEquippableSlotStr(slotID));
        check.isInt(decoSlotID);
        assert((decoSlotID >= 0) && (decoSlotID < 3));
        check.isInt(maxDecoSlotSize);

        this.props.handleClickDecorationSelect(slotID, decoSlotID, maxDecoSlotSize);
    }

    handleSelectRampSkill(position, rampSkillID) {
        this.props.handleSelectRampSkill(position, rampSkillID);
    }
    handleSelectWeaponSpecialSelection(specialSelectionID) {
        this.props.handleSelectWeaponSpecialSelection(specialSelectionID);
    }

    handleRemovePiece(slotID) {
        this.props.handleRemovePiece(slotID);
    }

    render() {
        check.isObj(this.props.buildRenderingProps);
        check.isArr(this.props.buildRenderingProps.weaponRO.rampSkillSelectionsArray); // Spot check for structure

        check.isMap(this.props.calcStateSpecification);
        check.isMap(this.props.calcStateCurrValues);

        check.isObj(this.props.buildPerformanceValues);

        check.isFunction(this.props.handleClickBuffsSelect);
        check.isFunction(this.props.handleClickWeaponSelect);
        check.isFunction(this.props.handleClickArmourSelect);
        check.isFunction(this.props.handleClickTalismanSelect);
        check.isFunction(this.props.handleClickPetalaceSelect);
        check.isFunction(this.props.handleClickDecorationSelect);

        check.isFunction(this.props.handleSelectRampSkill);
        check.isFunction(this.props.handleSelectWeaponSpecialSelection);

        check.isFunction(this.props.handleRemovePiece);
        check.isFunction(this.props.handleRemoveDeco);

        return element("div",
            {
            id: "equipment-selections-box",
            className: "sub-box",
            },
            element(BuffsSelection,
                {
                calcStateSpecification: this.props.calcStateSpecification,
                calcStateCurrValues:    this.props.calcStateCurrValues,

                handleClickBuffsSelect: () => {this.handleClickBuffsSelect();},
                },
                null,
                null,
            ),
            element(WeaponSelection,
                {
                ref: this.myRefs.weaponSelection,

                weaponRORenderingProps: this.props.buildRenderingProps.weaponRO,
                buildPerformanceValues: this.props.buildPerformanceValues,
                handleClickWeaponSelect:     () => {this.handleClickWeaponSelect();},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("weapon", decoSlotID, maxDecoSlotSize);},
                handleClickDecorationRemove: (decoSlotID) => {this.props.handleRemoveDeco("weapon", decoSlotID);},
                handleSelectRampSkill: (...args) => {this.handleSelectRampSkill(...args);},
                handleSelectSpecialSelection: (...args) => {this.handleSelectWeaponSpecialSelection(...args);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "head",
                armourPieceRORenderingProps:this.props.buildRenderingProps.armourRO.head,

                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("head", decoSlotID, maxDecoSlotSize);},
                handleClickDecorationRemove: (decoSlotID) => {this.props.handleRemoveDeco("head", decoSlotID);},
                handleClickRemovePiece: (slotID) => {this.handleRemovePiece(slotID);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "chest",
                armourPieceRORenderingProps:this.props.buildRenderingProps.armourRO.chest,

                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("chest", decoSlotID, maxDecoSlotSize);},
                handleClickDecorationRemove: (decoSlotID) => {this.props.handleRemoveDeco("chest", decoSlotID);},
                handleClickRemovePiece: (slotID) => {this.handleRemovePiece(slotID);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "arms",
                armourPieceRORenderingProps:this.props.buildRenderingProps.armourRO.arms,

                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("arms", decoSlotID, maxDecoSlotSize);},
                handleClickDecorationRemove: (decoSlotID) => {this.props.handleRemoveDeco("arms", decoSlotID);},
                handleClickRemovePiece: (slotID) => {this.handleRemovePiece(slotID);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "waist",
                armourPieceRORenderingProps:this.props.buildRenderingProps.armourRO.waist,

                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("waist", decoSlotID, maxDecoSlotSize);},
                handleClickDecorationRemove: (decoSlotID) => {this.props.handleRemoveDeco("waist", decoSlotID);},
                handleClickRemovePiece: (slotID) => {this.handleRemovePiece(slotID);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "legs",
                armourPieceRORenderingProps:this.props.buildRenderingProps.armourRO.legs,

                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("legs", decoSlotID, maxDecoSlotSize);},
                handleClickDecorationRemove: (decoSlotID) => {this.props.handleRemoveDeco("legs", decoSlotID);},
                handleClickRemovePiece: (slotID) => {this.handleRemovePiece(slotID);},
                },
                null,
            ),
            element(TalismanSelection,
                {
                talismanRORenderingProps:this.props.buildRenderingProps.talismanRO,

                handleClickTalismanSelect: () => {this.handleClickTalismanSelect();},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("talisman", decoSlotID, maxDecoSlotSize);},
                handleClickDecorationRemove: (decoSlotID) => {this.props.handleRemoveDeco("talisman", decoSlotID);},
                handleClickRemovePiece: (slotID) => {this.handleRemovePiece("talisman");},
                },
                null,
            ),
            element(PetalaceSelection,
                {
                petalaceRORenderingProps: this.props.buildRenderingProps.petalaceRO,
                handleClickPetalaceSelect: () => {this.handleClickPetalaceSelect();},
                handleClickRemovePiece: (slotID) => {this.handleRemovePiece("petalace");},
                },
                null,
            ),
        );
    }
}

export {EquipmentSelectionsBox};

