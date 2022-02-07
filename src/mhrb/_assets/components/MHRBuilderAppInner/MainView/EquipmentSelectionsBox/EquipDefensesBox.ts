/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";
import {
    getImgPath,
} from "../../../../images";

const assert = console.assert;

export class EquipDefensesBox extends React.Component<any, any> {
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

