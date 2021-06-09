/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../../check.js";
import {getImgPath} from "../../../images.js";
import {
    isArmourSlotStr,
} from "../../../common.js";

import {
    EquipIcon,
    EquipDecosWrapBox,
    EquipArmourInfoBox,
    EquipDefensesBoxEmpty,
    EquipDefensesBox,
} from "./common.js";

const assert = console.assert;
const element = React.createElement;

class ArmourSelection extends React.Component {

    static _slotNameToIconImgPath = new Map([
            ["head" , getImgPath("head_r1" )],
            ["chest", getImgPath("chest_r1")],
            ["arms" , getImgPath("arms_r1" )],
            ["waist", getImgPath("waist_r1")],
            ["legs" , getImgPath("legs_r1" )],
        ]);

    handleClickArmourSelect() {
        this.props.handleClickArmourSelect(this.props.slotID);
    }

    handleClickDecorationSelect(decoSlotID, maxDecoSize) {
        this.props.handleClickDecorationSelect(decoSlotID, maxDecoSize);
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

        return element("div",
            {
            className: "equip-box",
            },
            element(EquipIcon,
                {
                iconImg: (armourPieceRO !== null) ? armourPieceRO.iconImgPath : this.constructor._slotNameToIconImgPath.get(this.props.slotID),
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
                    handleClickSelect: (...args) => {this.handleClickDecorationSelect(...args);},
                },
                null,
            ),
        );
    }
}

export {ArmourSelection};
