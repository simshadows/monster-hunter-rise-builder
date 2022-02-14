// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";

import {ClipsafeSpan} from "../../../common/ClipsafeSpan";

import {EquipInfoBox} from "./EquipInfoBox";

const assert = console.assert;

// TODO: Maybe rename this component
export function EquipArmourInfoBox(props) {
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
                element(ClipsafeSpan, null, `${skillName} +${skillLevel}`),
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

