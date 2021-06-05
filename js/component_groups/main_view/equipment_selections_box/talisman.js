/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../../check.js";
import {getImgPath} from "../../../images.js";

import {
    EquipIcon,
    EquipDecosWrapBox,
    EquipArmourInfoBox,
    EquipDefensesBoxEmpty,
} from "./common.js";

const element = React.createElement;

function TalismanSelection(props) {
    check.isObj(props.talismanRORenderingProps);
    check.isArr(props.talismanRORenderingProps.skills); // Spot check for structure
    check.isArr(props.talismanRORenderingProps.decosArray); // Spot check for structure

    check.isFunction(props.handleClickTalismanSelect);
    check.isFunction(props.handleClickDecorationSelect);
    check.isFunction(props.handleClickRemovePiece);

    const talismanRO = props.talismanRORenderingProps;

    return element("div",
        {
        className: "equip-box",
        },
        element(EquipIcon,
            {
            iconImg: getImgPath("placeholder_talisman"),
            showRemoveButton: ((talismanRO.skills.length !== 0) || (talismanRO.decosArray.length !== 0)),
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
            element(EquipDefensesBoxEmpty,
                null,
                null,
            ),
        ),
        element(EquipDecosWrapBox,
            {
                decosArray: talismanRO.decosArray,
                handleClickSelect: (...args) => {props.handleClickDecorationSelect(...args);},
            },
            null,
        ),
    );
}

export {TalismanSelection};

