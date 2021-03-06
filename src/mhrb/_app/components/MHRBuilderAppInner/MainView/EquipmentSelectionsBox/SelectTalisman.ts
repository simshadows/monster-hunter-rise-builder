// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";
import {getImgPath} from "../../../../images";

import {EquipArmourInfoBox} from "./EquipArmourInfoBox";
import {EquipDefensesBoxEmpty} from "./EquipDefensesBoxEmpty";
import {EquipDecosWrapBox} from "./EquipDecosWrapBox";
import {EquipIcon} from "./EquipIcon";

export function SelectTalisman(props) {
    check.isObj(props.talismanRORenderingProps);
    check.isArr(props.talismanRORenderingProps.skills); // Spot check for structure
    check.isArr(props.talismanRORenderingProps.decosArray); // Spot check for structure

    check.isFunction(props.handleClickTalismanSelect);
    check.isFunction(props.handleClickDecorationSelect);
    check.isFunction(props.handleClickRemovePiece);

    const talismanRO = props.talismanRORenderingProps;
    const talismanIsEquipped = (talismanRO.skills.length !== 0) || (talismanRO.decosArray.length !== 0);

    return element("div",
        {
        className: "equip-box",
        },
        element(EquipIcon,
            {
            iconImg: getImgPath((talismanIsEquipped) ? "talisman_equipped" : "talisman_unequipped"),
            showRemoveButton: talismanIsEquipped,
            handleSelectButton: () => {props.handleClickTalismanSelect()},
            handleRemoveButton: () => {props.handleClickRemovePiece();},
            },
            null,
        ),
        element("div",
            {
            className: "equip-main-box",
            },
            element(EquipArmourInfoBox,
                {
                    eqName: talismanRO.name,
                    skillsArray: talismanRO.skills,
                },
                null,
            ),
        ),
        element(EquipDefensesBoxEmpty,
            null,
            null,
        ),
        element(EquipDecosWrapBox,
            {
                decosArray: talismanRO.decosArray,
                handleClickSelect: (...args) => {props.handleClickDecorationSelect(...args);},
                handleClickRemove: (...args) => {props.handleClickDecorationRemove(...args);},
            },
            null,
        ),
    );
}

