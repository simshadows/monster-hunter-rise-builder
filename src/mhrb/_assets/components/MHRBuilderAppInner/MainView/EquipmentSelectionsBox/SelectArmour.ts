// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";
import {
    getImgPath,
    armourSlotAndRarityToIconImgPath,
} from "../../../../images";
import {
    isArmourSlotStr,
} from "../../../../common";

import {EquipDefensesBox} from "./EquipDefensesBox";
import {EquipDefensesBoxEmpty} from "./EquipDefensesBoxEmpty";
import {EquipArmourInfoBox} from "./EquipArmourInfoBox";
import {EquipDecosWrapBox} from "./EquipDecosWrapBox";
import {EquipIcon} from "./EquipIcon";

const assert = console.assert;

export class SelectArmour extends React.Component<any, any> {

    handleClickArmourSelect() {
        this.props.handleClickArmourSelect(this.props.slotID);
    }

    handleClickDecorationSelect(decoSlotID, maxDecoSize) {
        this.props.handleClickDecorationSelect(decoSlotID, maxDecoSize);
    }
    handleClickDecorationRemove(decoSlotID) {
        this.props.handleClickDecorationRemove(decoSlotID);
    }

    handleClickRemovePiece() {
        this.props.handleClickRemovePiece(this.props.slotID);
    }

    _renderDefensesBox() {
        // Convenience Alias
        const armourPieceRO = this.props.armourPieceRORenderingProps;

        if (armourPieceRO === null) {
            return element(EquipDefensesBoxEmpty,
                null,
                null,
            );
        } else {
            return element(EquipDefensesBox,
                {
                defenses: {
                        defense:    armourPieceRO.defense,
                        fireRes:    armourPieceRO.fireRes,
                        waterRes:   armourPieceRO.waterRes,
                        thunderRes: armourPieceRO.thunderRes,
                        iceRes:     armourPieceRO.iceRes,
                        dragonRes:  armourPieceRO.dragonRes
                    },
                },
                null,
            );
        }
    }

    render() {
        // Convenience Alias
        const armourPieceRO = this.props.armourPieceRORenderingProps;

        assert(isArmourSlotStr(this.props.slotID));
        if (armourPieceRO !== null) { // Allowed to be null
            check.isObj(armourPieceRO);
            check.isArr(armourPieceRO.decosArray); // Spot check for structure
        }

        check.isFunction(this.props.handleClickArmourSelect);
        check.isFunction(this.props.handleClickDecorationSelect);
        check.isFunction(this.props.handleClickDecorationRemove);

        const iconImg = (armourPieceRO === null)
                        ? armourSlotAndRarityToIconImgPath(this.props.slotID, 1)
                        : armourSlotAndRarityToIconImgPath(this.props.slotID, armourPieceRO.rarity);

        return element("div",
            {
            className: "equip-box",
            },
            element(EquipIcon,
                {
                iconImg: iconImg,
                showRemoveButton: (armourPieceRO !== null),
                handleSelectButton: () => {this.handleClickArmourSelect();},
                handleRemoveButton: () => {this.handleClickRemovePiece();},
                },
                null,
            ),
            element("div",
                {
                className: "equip-main-box",
                },
                element(EquipArmourInfoBox,
                    {
                        eqName: (armourPieceRO !== null) ? armourPieceRO.name : "None",
                        skillsArray: (armourPieceRO !== null) ? armourPieceRO.skills : [],
                    },
                    null,
                ),
            ),
            this._renderDefensesBox(),
            element(EquipDecosWrapBox,
                {
                    decosArray: (armourPieceRO !== null) ? armourPieceRO.decosArray : [],
                    handleClickSelect: (__a, __b) => {this.handleClickDecorationSelect(__a, __b);},
                    handleClickRemove: (decoSlotID) => {this.handleClickDecorationRemove(decoSlotID);},
                },
                null,
            ),
        );
    }
}

