/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../../check.js";
import {getImgPath} from "../../../images.js";
import {
    clipsafeSpan,
} from "../../../common.js";

const assert = console.assert;
const element = React.createElement;

class EquipIcon extends React.Component {

    handleSelectButton(e) {
        this.props.handleSelectButton();
    }

    handleRemoveButton(e) {
        this.props.handleRemoveButton(); // Allowed to be undefined. If so, it throws an error.
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
                className: "stackouter",
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
                element("div",
                    {
                    className: "highlight-equip-main-box stackinner",
                    onClick: (e) => {this.handleSelectButton(e)},
                    },
                    null,
                ),
            ),
            element("div",
                {
                className: "equip-remove-button button-common",
                style: {visibility: (this.props.showRemoveButton) ? "visible" : "hidden"},
                onClick: (e) => {this.handleRemoveButton(e)},
                },
                "remove",
            ),
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

class EquipDecosWrapBox extends React.Component {

    handleClickSelect(decoSlotID, maxDecoSize) {
        this.props.handleClickSelect(decoSlotID, maxDecoSize);
    }

    render() {
        check.isArr(this.props.decosArray);
        assert(this.props.decosArray.length <= 3);

        check.isFunction(this.props.handleClickSelect);

        const decoBoxes = [];
        for (let [decoSlotID, decoPropsRO] of this.props.decosArray.entries()) {
            check.isInt(decoPropsRO.slotSize);
            assert((decoPropsRO.slotSize > 0) && (decoPropsRO.slotSize <= 3));
            if (decoPropsRO.deco !== null) {
                check.isStr(decoPropsRO.deco.name);
                check.isInt(decoPropsRO.deco.slotSize);
                assert((decoPropsRO.deco.slotSize > 0) && (decoPropsRO.deco.slotSize <= decoPropsRO.slotSize));
            }

            // Needed for closure
            const slotSize = decoPropsRO.slotSize;
            // TODO: It's confusing having two slot sizes: one for the slot, another for the deco size itself. Fix this.

            const iconImg = (()=>{
                if (slotSize == 1) return getImgPath("placeholder_deco_size_1");
                else if (slotSize == 2) return getImgPath("placeholder_deco_size_2");
                else if (slotSize == 3) return getImgPath("placeholder_deco_size_3");
                throw new Error("Unexpected slot size.");
            })();

            decoBoxes.push(
                element("div",
                    {
                    className: "equip-deco-box stackouter",
                    },
                    element("div",
                        {
                        className: "equip-deco-icon-box",
                        },
                        element("img",
                            {
                            src: iconImg,
                            alt: "icon",
                            },
                            null,
                        ),
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
                        onClick: () => {this.props.handleClickSelect(decoSlotID, slotSize);},
                        },
                        null,
                    ),
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
