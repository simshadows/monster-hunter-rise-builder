/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";

import * as check from "../../../check";
import {
    getImgPath,
    getSimpleImgElement,
    FontAwesomeSprite,
} from "../../../images";
import {
    clipsafeSpan,
} from "../../../common";

const assert = console.assert;
const element = React.createElement;

class EquipIcon extends React.Component {

    handleSelectButton(e) {
        this.props.handleSelectButton();
    }

    handleRemoveButton(e) {
        this.props.handleRemoveButton(); // Allowed to be undefined. If so, it throws an error.
    }

    _renderRemoveButton() {
        const buttonElement = (()=>{
                if (this.props.showRemoveButton) {
                    return element("div",
                        {
                        className: "equip-remove-button button-common hide-from-buildcard",
                        onClick: (e) => {this.handleRemoveButton(e)},
                        },
                        "remove",
                    );
                } else {
                    return null;
                }
            })();

        return element("div",
            {
            className: "equip-remove-button-wrap",
            },
            buttonElement,
        );
    }

    render() {
        check.isNonEmptyStr(this.props.iconImg);
        check.isBool(this.props.showRemoveButton);
        check.isFunction(this.props.handleSelectButton);
        check.isFunctionOrUndef(this.props.handleRemoveButton);

        return element("div",
            {
            className: "equip-icon-wrap-box",
            },
            element("div",
                {
                onClick: (e) => {this.handleSelectButton(e)},
                },
                element("div",
                    {
                    className: "equip-icon-box",
                    },
                    element("img",
                        {
                        src: this.props.iconImg,
                        alt: "icon",
                        },
                        null,
                    ),
                ),
            ),
            this._renderRemoveButton(),
        );
    }
}

function EquipInfoBox(props) {
    check.isStr(props.eqName);
    assert(props.eqName.length > 0);

    return element("div",
        {
        className: "equip-info-box",
        },
        element("div",
            {
            className: "equip-name-box clipsafe",
            },
            clipsafeSpan(props.eqName),
        ),
        React.Children.toArray(props.children),
    )
}

class EquipDecoBox extends React.Component {

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
                getSimpleImgElement(iconImgID),
            ),
            element("div",
                {
                className: "equip-deco-name-box clipsafe",
                },
                clipsafeSpan(((decoPropsRO.deco === null) ? "None" : decoPropsRO.deco.name)),
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

class EquipDecosWrapBox extends React.Component {

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
                    handleClickSelect: (..._args) => {this.handleClickSelect(..._args);},
                    handleClickRemove: (..._args) => {this.handleClickRemove(..._args);},
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

// TODO: Maybe rename this
function EquipArmourInfoBox(props) {
    check.isStr(props.eqName);
    assert(props.eqName.length > 0);
    check.isArr(props.skillsArray);
    assert(props.skillsArray.length <= 4);

    const skillBoxes = [];
    for (let [skillName, skillLevel] of props.skillsArray) {
        check.isStr(skillName);
        check.isInt(skillLevel);

        skillBoxes.push(
            element("div",
                {
                className: "equip-skills-box clipsafe",
                },
                clipsafeSpan(skillName + " +" + parseInt(skillLevel)),
            )
        );
    }

    return element(EquipInfoBox,
        {
        eqName: props.eqName,
        },
        element("div",
            {
            className: "equip-info-content-box equip-skills-wrap-box",
            },
            ...skillBoxes
        ),
    )
}

function EquipDefensesBoxEmpty() {
    return element("div",
        {
        className: "equip-defenses-box",
        },
        null,
    );
}

class EquipDefensesBox extends React.Component {
    _renderCell(imgPath, value) {
        return element("div",
            {
            className: "equip-defenses-cell-box",
            },
            element("div",
                {
                className: "equip-defenses-icon-box-wrap",
                },
                element("div",
                    {
                    className: "equip-defenses-icon-box",
                    },
                    element("img",
                        {
                        src: imgPath,
                        alt: "icon",
                        },
                        null,
                    ),
                ),
            ),
            element("div",
                {
                className: "equip-defenses-content-box",
                },
                value,
            ),
        );
    }

    _renderRow(leftImgPath, leftValue, rightImgPath, rightValue) {
        return element("div",
            {
            className: "equip-defenses-row-box",
            },
            this._renderCell(leftImgPath, leftValue),
            this._renderCell(rightImgPath, rightValue),
        );
    }

    render() {
        check.isObj(this.props.defenses);
        for (let [stat, value] of Object.entries(this.props.defenses)) {
            check.isInt(value);
        }
        assert(Object.keys(this.props.defenses).length === 6);

        return element("div",
            {
            className: "equip-defenses-box",
            },
            this._renderRow(
                getImgPath("defense_icon"),
                parseInt(this.props.defenses.defense),
                getImgPath("eleres_fire_icon"),
                parseInt(this.props.defenses.fireRes),
            ),
            this._renderRow(
                getImgPath("eleres_water_icon"),
                parseInt(this.props.defenses.waterRes),
                getImgPath("eleres_thunder_icon"),
                parseInt(this.props.defenses.thunderRes),
            ),
            this._renderRow(
                getImgPath("eleres_ice_icon"),
                parseInt(this.props.defenses.iceRes),
                getImgPath("eleres_dragon_icon"),
                parseInt(this.props.defenses.dragonRes),
            ),
            //element("table",
            //    {
            //    className: "equip-defenses-table",
            //    },
            //    element("tbody",
            //        null,
            //        element("tr",
            //            null,
            //            element("th", null, "\uD83D\uDEE1\uFE0F"),
            //            element("th", null, parseInt(props.defenses.defense)),
            //            element("th", null, eleStatStrToEmoji("thunder")),
            //            element("th", null, parseInt(props.defenses.thunderRes)),
            //        ),
            //        element("tr",
            //            null,
            //            element("th", null, eleStatStrToEmoji("fire")),
            //            element("th", null, parseInt(props.defenses.fireRes)),
            //            element("th", null, eleStatStrToEmoji("ice")),
            //            element("th", null, parseInt(props.defenses.iceRes)),
            //        ),
            //        element("tr",
            //            null,
            //            element("th", null, eleStatStrToEmoji("water")),
            //            element("th", null, parseInt(props.defenses.waterRes)),
            //            element("th", null, eleStatStrToEmoji("dragon")),
            //            element("th", null, parseInt(props.defenses.dragonRes)),
            //        ),
            //    ),
            //),
        );
    }
}

export {
    EquipIcon,
    EquipInfoBox,
    EquipDecosWrapBox,
    EquipArmourInfoBox,
    EquipDefensesBoxEmpty,
    EquipDefensesBox,
};

