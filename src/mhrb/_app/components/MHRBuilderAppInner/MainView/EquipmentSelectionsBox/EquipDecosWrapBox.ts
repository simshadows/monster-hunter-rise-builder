// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";

import {ClipsafeSpan} from "../../../common/ClipsafeSpan";
import {SimpleImg} from "../../../images/SimpleImg";
import {FontAwesomeSprite} from "../../../images/FontAwesomeSprite";

const assert = console.assert;

class EquipDecoBox extends React.Component<any, any> {

    // Logically static
    _iconsToImageID(icon, decoSize, slotSize) {
        assert(check.isNonEmptyStr(icon));
        assert(check.isInt(decoSize) && (decoSize > 0) && (decoSize <= 3));
        assert(check.isInt(slotSize) && (slotSize > 0) && (slotSize <= 3));
        return "deco_slot" + slotSize + "_size" + decoSize + "_" + icon;
    }

    constructor(props) {
        super(props);
        this.state = {
                visibleRemoveButton: false,
            };
    }

    handleClickSelect() {
        this.props.handleClickSelect(this.props.decoSlotID, this.props.slotSize);
    }
    handleClickRemove(e) {
        e.stopPropagation();
        this.props.handleClickRemove(this.props.decoSlotID);
    }

    handleMouseEnter() {
        this.setState({visibleRemoveButton: true});
    }
    handleMouseLeave() {
        this.setState({visibleRemoveButton: false});
    }

    _renderRemoveButton() {
        const decoPropsRO = this.props.decoPropsRO;

        if ((decoPropsRO.deco !== null) && this.state.visibleRemoveButton) {
            return element("div",
                {
                className: "deco-box-remove-button button-common hide-from-buildcard",
                onClick: (e) => {this.handleClickRemove(e)},
                },
                element(FontAwesomeSprite,
                    {
                    style: "solid",
                    fragment: "times",
                    },
                    null,
                ),
            );
        } else {
            return null;
        }
    }

    render() {
        assert((this.props.decoSlotID >= 0) && (this.props.decoSlotID < 3));

        // TODO: It's confusing having two slot sizes: one for the slot, another for the deco size itself. Fix this.
        assert((this.props.slotSize > 0) && (this.props.slotSize <= 3));

        assert(this.props.decoPropsRO !== undefined);
        assert(check.isFunction(this.props.handleClickSelect));

        const decoPropsRO = this.props.decoPropsRO;

        const iconImgID = (()=>{
            if (decoPropsRO.deco === null) {
                if (this.props.slotSize == 1) return "deco_slot1_empty";
                else if (this.props.slotSize == 2) return "deco_slot2_empty";
                else if (this.props.slotSize == 3) return "deco_slot3_empty";
                else if (this.props.slotSize == 4) return "deco_slot4_empty";
                throw new Error("Unexpected slot size.");
            } else {
                return this._iconsToImageID(decoPropsRO.deco.icon, decoPropsRO.deco.slotSize, this.props.slotSize);
            }
        })();

        return element("div",
            {
            className: "equip-deco-box stackouter",
            onClick: () => {this.handleClickSelect();},
            },
            element("div",
                {
                className: "equip-deco-icon-box",
                },
                element(SimpleImg, {src: iconImgID}, null),
            ),
            element("div",
                {
                className: "equip-deco-name-box clipsafe",
                },
                element(ClipsafeSpan, null, (decoPropsRO.deco === null) ? "None" : decoPropsRO.deco.name),
            ),
            element("div",
                {
                className: "highlight-equip-deco-box stackinner",
                onMouseEnter: () => {this.handleMouseEnter();},
                onMouseLeave: () => {this.handleMouseLeave();},
                },
                this._renderRemoveButton(),
            ),
        );
    }
}

export class EquipDecosWrapBox extends React.Component<any, any> {

    handleClickSelect(decoSlotID, maxDecoSize) {
        this.props.handleClickSelect(decoSlotID, maxDecoSize);
    }
    handleClickRemove(decoSlotID) {
        this.props.handleClickRemove(decoSlotID);
    }

    render() {
        check.isArr(this.props.decosArray);
        assert(this.props.decosArray.length <= 3);

        check.isFunction(this.props.handleClickSelect);
        check.isFunction(this.props.handleClickRemove);

        const decoBoxes = [];
        for (let [decoSlotID, decoPropsRO] of this.props.decosArray.entries()) {
            check.isInt(decoPropsRO.slotSize);
            assert((decoPropsRO.slotSize > 0) && (decoPropsRO.slotSize <= 3));
            if (decoPropsRO.deco !== null) {
                check.isStr(decoPropsRO.deco.name);
                check.isInt(decoPropsRO.deco.slotSize);
                assert((decoPropsRO.deco.slotSize > 0) && (decoPropsRO.deco.slotSize <= decoPropsRO.slotSize));
            }

            decoBoxes.push(
                element(EquipDecoBox,
                    {
                    decoSlotID: decoSlotID,
                    slotSize: decoPropsRO.slotSize,
                    decoPropsRO: decoPropsRO,
                    handleClickSelect: (__a, __b) => {this.handleClickSelect(__a, __b);},
                    handleClickRemove: (decoSlotID) => {this.handleClickRemove(decoSlotID);},
                    },
                    null,
                )
            );
        }
        // We'll need to add missing space
        const numMissingBoxes = 3 - decoBoxes.length;
        for (let i = 0; i < numMissingBoxes; ++i) {
            decoBoxes.push(
                element("div",
                    {
                    className: "equip-deco-box",
                    style: {visibility: "hidden"},
                    },
                    null,
                )
            );
        }

        return element("div",
            {
            className: "equip-decos-wrap-box",
            },
            ...decoBoxes
        );
    }
}

