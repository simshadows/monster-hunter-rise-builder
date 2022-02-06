/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import React from "react";

import * as check from "../../../check.js";
import {getImgPath} from "../../../images.js";

import {
    EquipIcon,
    EquipInfoBox,
} from "./common.js";

const element = React.createElement;

function PetalaceSelection(props) {
    check.isObj(props.petalaceRORenderingProps);
    if (props.petalaceRORenderingProps.originalPetalaceObj != null) { // Allowed to be null
        check.isStr(props.petalaceRORenderingProps.originalPetalaceObj.name); // Spot check for structure
    }
    check.isFunction(props.handleClickPetalaceSelect);
    check.isFunction(props.handleClickRemovePiece);

    const petalaceRO = props.petalaceRORenderingProps.originalPetalaceObj;

    function renderInfo(content) {
        return element("div",
            {
            className: "equip-info-petalace-stat-cell-box",
            },
            content,
        );
    }

    const infoBox = (()=>{
            if (petalaceRO == null) {
                return element(EquipInfoBox,
                    {
                    eqName: "None",
                    },
                    element("div",
                        {
                        className: "equip-info-content-box equip-info-petalace-box",
                        },
                        null,
                    ),
                );
            } else {
                return element(EquipInfoBox,
                    {
                    eqName: petalaceRO.name,
                    },
                    element("div",
                        {
                        className: "equip-info-content-box equip-info-petalace-box",
                        },
                        element("div",
                            {
                            className: "equip-info-petalace-stat-row-box",
                            },
                            renderInfo("Health Up: " + parseInt(petalaceRO.healthUp)),
                            renderInfo("Stamina Up: " + parseInt(petalaceRO.staminaUp)),
                            renderInfo("Attack Up: " + parseInt(petalaceRO.attackUp)),
                            renderInfo("Defense Up: " + parseInt(petalaceRO.defenseUp)),
                        ),
                        element("div",
                            {
                            className: "equip-info-petalace-stat-row-box",
                            },
                            renderInfo("Health Gain: " + parseInt(petalaceRO.healthGain)),
                            renderInfo("Stamina Gain: " + parseInt(petalaceRO.staminaGain)),
                            renderInfo("Attack Gain: " + parseInt(petalaceRO.attackGain)),
                            renderInfo("Defense Gain: " + parseInt(petalaceRO.defenseGain)),
                        ),
                    ),
                );
            }
        })();

    return element("div",
        {
        className: "equip-box",
        },
        element(EquipIcon,
            {
            iconImg: (petalaceRO !== null) ? petalaceRO.iconImgPath : getImgPath("petalace_r1"),
            showRemoveButton: (petalaceRO !== null),
            handleSelectButton: () => {props.handleClickPetalaceSelect()},
            handleRemoveButton: () => {props.handleClickRemovePiece();},
            },
            null,
        ),
        element("div",
            {
            className: "equip-main-box",
            },
            infoBox,
        ),
    );
}

export {PetalaceSelection};

