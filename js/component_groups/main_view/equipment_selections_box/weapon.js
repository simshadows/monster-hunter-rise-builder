/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../../check.js";
import {getImgPath} from "../../../images.js";
import {
    isEleStatStr,
    isArmourSlotStr,
    isDecoEquippableSlotStr,
    eleStatStrToEmoji,
    clipsafeSpan,
} from "../../../common.js";

import {
    EquipIcon,
    EquipDecosWrapBox,
} from "./common.js";

const assert = console.assert;
const element = React.createElement;

function EquipWeaponInfoBox(props) {
    // Convenience Alias
    const weaponRO = props.weaponRORenderingProps;

    check.isObj(props.weaponRORenderingProps);
    check.isFunction(props.onClick);

    // Check structure of props.weaponRORenderingProps
    check.isStr(weaponRO.name);
    assert(weaponRO.name.length > 0);
    check.isInt(weaponRO.attack);
    assert(weaponRO.attack > 0);
    check.isInt(weaponRO.affinity);
    assert((weaponRO.affinity >= -100) && (weaponRO.affinity <= 100));
    assert(isEleStatStr(weaponRO.eleStatType));
    check.isInt(weaponRO.eleStatValue);
    assert(weaponRO.eleStatValue >= 0);
    check.isInt(weaponRO.defense);
    assert(weaponRO.defense >= 0);
    check.isArr(weaponRO.rampSkillSelectionsArray);
    // TODO: Sharpness?

    function statBox(text, value) {
        return element("div",
            {className: "equip-weapon-stat-box clipsafe"},
            clipsafeSpan(text + value),
        );
    }

    const rampageSkillBoxes = [];
    for (let rampageSkillObj of weaponRO.rampSkillSelectionsArray) {
        check.isObjOrNull(rampageSkillObj);

        if (rampageSkillObj === null) {
            rampageSkillBoxes.push(
                element("div",
                    {
                    className: "equip-weapon-ramp-box equip-weapon-unused-ramp-box clipsafe",
                    },
                    clipsafeSpan("No Ramp Skill"),
                )
            );
        } else {
            rampageSkillBoxes.push(
                element("div",
                    {
                    className: "equip-weapon-ramp-box clipsafe",
                    },
                    clipsafeSpan(rampageSkillObj.name),
                )
            );
        }
    }

    const eleStatTypeStr = (weaponRO.eleStatType == "none") ? "---" : eleStatStrToEmoji(weaponRO.eleStatType) + " ";
    const eleStatValueStr = (weaponRO.eleStatValue == 0) ? "" : (" " + parseInt(weaponRO.eleStatValue));

    return element("div",
        {
        className: "equip-weapon-info-box",
        },
        element("div",
            {
            className: "equip-name-box clipsafe",
            },
            clipsafeSpan(weaponRO.name),
        ),
        element("div",
            {
            className: "equip-weapon-detail-box stackouter",
            },
            element("div",
                {
                className: "equip-weapon-stats-group-box",
                },
                statBox("\u2694\ufe0f ", parseInt(weaponRO.attack)),
                statBox("\ud83d\udca2 ", parseInt(weaponRO.affinity) + "%"),
                statBox(eleStatTypeStr, eleStatValueStr),
                statBox("\ud83d\udee1\ufe0f ", parseInt(weaponRO.defense)),
            ),
            element("div",
                {
                className: "equip-weapon-ramps-group-box",
                },
                ...rampageSkillBoxes
            ),
            element("div",
                {
                className: "highlight-equip-main-box stackinner",
                onClick: (e) => {props.onClick(e)},
                },
                null,
            ),
        ),
    )
}

function WeaponSelection(props) {
    check.isObj(props.weaponRORenderingProps);
    check.isArr(props.weaponRORenderingProps.rampSkillSelectionsArray); // Spot check for structure
    check.isNonEmptyStr(props.weaponRORenderingProps.iconImgPath);

    check.isFunction(props.handleClickWeaponSelect);
    check.isFunction(props.handleClickWeaponCustomize);
    check.isFunction(props.handleClickDecorationSelect);

    return element("div",
        {
        className: "equip-box",
        },
        element(EquipIcon,
            {
            iconImg: props.weaponRORenderingProps.iconImgPath,
            showRemoveButton: false,
            handleSelectButton: () => {props.handleClickWeaponSelect()},
            },
            null,
        ),
        element("div",
            {
            className: "equip-main-box",
            },
            element(EquipWeaponInfoBox,
                {
                    weaponRORenderingProps: props.weaponRORenderingProps,
                    onClick: (e) => {props.handleClickWeaponCustomize(e)},
                },
                null,
            ),
        ),
        element(EquipDecosWrapBox,
            {
                decosArray: props.weaponRORenderingProps.decosArray,
                handleClickSelect: (...args) => {props.handleClickDecorationSelect(...args);},
            },
            null,
        ),
    );
}

export {WeaponSelection};

