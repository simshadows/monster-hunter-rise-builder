/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";

import {clipsafeSpan} from "../../../common/clipsafeSpan";

const assert = console.assert;

export function EquipInfoBox(props) {
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

