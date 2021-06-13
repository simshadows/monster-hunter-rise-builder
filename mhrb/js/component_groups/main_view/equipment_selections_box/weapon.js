/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../../check.js";
import {
    getSimpleImgElement,
    eleStatStrToImgPath,
    eleStatStrToImgId,
} from "../../../images.js";
import {
    isEleStatStr,
    isArmourSlotStr,
    isDecoEquippableSlotStr,
    clipsafeSpan,
    iterateEleStatMapInLogicalOrder,
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
    const perf = props.buildPerformanceValues;

    check.isObj(props.weaponRORenderingProps);
    check.isObj(props.buildPerformanceValues);
    check.isFunction(props.onClick);

    // Check structure of props.weaponRORenderingProps
    check.isStr(weaponRO.name);
    assert(weaponRO.name.length > 0);
    check.isArr(weaponRO.rampSkillSelectionsArray);
    // TODO: Sharpness?

    check.isInt(perf.weaponAttack);
    assert(perf.weaponAttack > 0);
    check.isInt(perf.weaponAffinity);
    assert((perf.weaponAffinity >= -100) && (perf.weaponAffinity <= 100));
    check.isInt(perf.weaponDefense);
    assert(perf.weaponDefense >= 0);
    assert(check.isMap(perf.weaponEleStat));

    function statBoxEmpty() {
        return element("div",
            {
            className: "equip-weapon-stat-box"
            },
            clipsafeSpan("\u2014"), // Unicode long-dash
        );
    }

    function statBox(iconImgID, value, isWeapon) {
        const c = (isWeapon) ? " equip-weapon-stat-box-attack-stat" : "";
        return element("div",
            {
            className: "equip-weapon-stat-box" + c,
            },
            element("div",
                {
                className: "equip-weapon-stat-icon-wrap-box",
                },
                getSimpleImgElement(iconImgID),
            ),
            element("div",
                {
                className: "equip-weapon-stat-content-wrap-box clipsafe",
                },
                clipsafeSpan(value),
            ),
        );
    }

    const otherStatBoxes = [];

    if (perf.weaponDefense != 0) {
        otherStatBoxes.push(statBox("defense_icon", parseInt(perf.weaponDefense), false));
    }

    if (perf.weaponEleStat.size === 0) {
        otherStatBoxes.push(statBoxEmpty());
    } else {
        for (const [eleStatType, eleStatValue] of iterateEleStatMapInLogicalOrder(perf.weaponEleStat)) {
            assert(isEleStatStr(eleStatType));
            assert((eleStatType !== null) && (eleStatType !== undefined) && (eleStatType !== "none"));
            assert(check.isInt(eleStatValue) && (eleStatValue > 0));
            otherStatBoxes.push(statBox(eleStatStrToImgId(eleStatType), eleStatValue, false));
        }
    }

    // TODO: Consider making more generalized code.
    const rampageSkillBoxes = [[], []]; // A sublist for each row
    for (let rampageSkillObj of weaponRO.rampSkillSelectionsArray) {
        check.isObjOrNull(rampageSkillObj);

        const e = (()=>{
                if (rampageSkillObj === null) {
                    return element("div",
                        {
                        className: "equip-weapon-ramp-box equip-weapon-unused-ramp-box clipsafe",
                        },
                        clipsafeSpan("No Ramp Skill"),
                    );
                } else {
                    return element("div",
                        {
                        className: "equip-weapon-ramp-box clipsafe",
                        },
                        clipsafeSpan(rampageSkillObj.name),
                    );
                }
            })();
        if (rampageSkillBoxes[0].length < 3) {
            rampageSkillBoxes[0].push(e)
        } else {
            rampageSkillBoxes[1].push(e)
        }
    }

    const extraGroupElements = [];
    for (const groupElements of rampageSkillBoxes) {
        if (groupElements.length == 0) continue;
        extraGroupElements.push(
            element("div",
                {
                className: "equip-weapon-ramps-group-box",
                },
                ...groupElements
            ),
        );
    }

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
                statBox("attack_icon", parseInt(perf.weaponAttack), true),
                statBox("affinity_icon", parseInt(perf.weaponAffinity) + "%", true),
                ...otherStatBoxes,
            ),
            ...extraGroupElements,
            //element("div",
            //    {
            //    className: "equip-weapon-special-mech-group-box",
            //    },
            //    null,
            //),
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

    check.isObj(props.buildPerformanceValues);
    check.isInt(props.buildPerformanceValues.weaponAttack); // Spot check for structure

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
                    buildPerformanceValues: props.buildPerformanceValues,
                    onClick: (e) => {props.handleClickWeaponCustomize(e)},
                },
                null,
            ),
        ),
        element(EquipDecosWrapBox,
            {
                decosArray: props.weaponRORenderingProps.decosArray,
                handleClickSelect: (...args) => {props.handleClickDecorationSelect(...args);},
                handleClickRemove: (...args) => {props.handleClickDecorationRemove(...args);},
            },
            null,
        ),
    );
}

export {WeaponSelection};

