// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";

import {ClipsafeSpan} from "../../../common/ClipsafeSpan";

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
            element(ClipsafeSpan, null, props.eqName),
        ),
        React.Children.toArray(props.children),
    )
}

