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
import {
    doTtlDecr,
    callTtlDecr,
    setTtl,
} from "../../../utils.js";

const assert = console.assert;
const element = React.createElement;

class RampageSkillSelection extends React.Component {
    constructor(props) {
        super(props);
        this._ttl = 0;
        this.state = {
                ttl: this._ttl,
            };
    }

    ttlDecr(v) {
        doTtlDecr(this, v);
    }
    makeVisible() {
        setTtl(this, 2);
    }

    _renderRampSelection() {
        // TODO: Populate with data and onClick listeners.

        return element("div",
            {
            className: "equip-weapon-ramp-selection-box",
            //onClick: (e) => {this.makeVisible();}, // Not needed because onClick is already listened by parent
            },
            null,
        );
    }

    render() {
        check.isObjOrNull(this.props.selectedRampSkillRO);
        assert(check.isArr(this.props.rampageSkillOptions) && (this.props.rampageSkillOptions.length > 0));
        
        //console.log(this.props.selectedRampSkillRO);
        //console.log(this.props.rampageSkillOptions);

        const text = (this.props.selectedRampSkillRO === null) ? "" : this.props.selectedRampSkillRO.name;

        if (this.state.ttl > 0) {
            return element("div",
                {
                className: "equip-weapon-ramp-box equip-weapon-ramp-box-selected",
                onClick: (e) => {this.makeVisible();},
                },
                clipsafeSpan(text),
                this._renderRampSelection(),
            );
        } else {
            const c = (this.props.selectedRampSkillRO === null) ? " equip-weapon-unused-ramp-box" : "";
            return element("div",
                {
                className: "equip-weapon-ramp-box equip-weapon-ramp-box-unselected clipsafe" + c,
                onClick: (e) => {this.makeVisible();},
                },
                clipsafeSpan(text),
            );
        }
    }
}

class EquipWeaponInfoBox extends React.Component {
    constructor(props) {
        super(props);
        this.myRefs = {}; // Keys will be added during rendering
    }

    ttlDecr(v) {
        callTtlDecr(this.myRefs, v);
    }

    _renderStatBoxEmpty() {
        return null; // We used to render something, but now we just don't.
        //return element("div",
        //    {
        //    className: "equip-weapon-stat-box"
        //    },
        //    clipsafeSpan("\u2014"), // Unicode long-dash
        //);
    }

    _renderStatBox(iconImgID, value, isWeapon) {
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

    render() {
        this.myRefs = {}; // Reset refs

        // Convenience Alias
        const weaponRO = this.props.weaponRORenderingProps;
        const perf = this.props.buildPerformanceValues;

        check.isObj(this.props.weaponRORenderingProps);
        check.isObj(this.props.buildPerformanceValues);

        // Check structure of props.weaponRORenderingProps
        check.isStr(weaponRO.name);
        assert(weaponRO.name.length > 0);
        check.isArr(weaponRO.rampSkillSelectionsArray);
        check.isArr(weaponRO.rampSkillOptionsArray);
        // TODO: Sharpness?

        check.isInt(perf.weaponAttack);
        assert(perf.weaponAttack > 0);
        check.isInt(perf.weaponAffinity);
        assert((perf.weaponAffinity >= -100) && (perf.weaponAffinity <= 100));
        check.isInt(perf.weaponDefense);
        assert(perf.weaponDefense >= 0);
        assert(check.isMap(perf.weaponEleStat));

        const otherStatBoxes = [];

        if (perf.weaponDefense != 0) {
            otherStatBoxes.push(this._renderStatBox("defense_icon", parseInt(perf.weaponDefense), false));
        }

        if (perf.weaponEleStat.size === 0) {
            otherStatBoxes.push(this._renderStatBoxEmpty());
        } else {
            for (const [eleStatType, eleStatValue] of iterateEleStatMapInLogicalOrder(perf.weaponEleStat)) {
                assert(isEleStatStr(eleStatType));
                assert((eleStatType !== null) && (eleStatType !== undefined) && (eleStatType !== "none"));
                assert(check.isInt(eleStatValue) && (eleStatValue > 0));
                otherStatBoxes.push(this._renderStatBox(eleStatStrToImgId(eleStatType), eleStatValue, false));
            }
        }

        // TODO: Consider making more generalized code.
        const rampageSkillBoxes = [[], []]; // A sublist for each row
        for (let [i, rampageSkillObj] of weaponRO.rampSkillSelectionsArray.entries()) {
            const ref = React.createRef();

            const e = element(RampageSkillSelection,
                    {
                    ref: ref,
                    selectedRampSkillRO: rampageSkillObj,
                    rampageSkillOptions: weaponRO.rampSkillOptionsArray[i],
                    },
                    null,
                );

            if (rampageSkillBoxes[0].length < 3) {
                rampageSkillBoxes[0].push(e)
            } else {
                rampageSkillBoxes[1].push(e)
            }

            this.myRefs["ramp" + String(i)] = ref;
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
                    this._renderStatBox("attack_icon", parseInt(perf.weaponAttack), true),
                    this._renderStatBox("affinity_icon", parseInt(perf.weaponAffinity) + "%", true),
                    ...otherStatBoxes,
                ),
                ...extraGroupElements,
                //element("div",
                //    {
                //    className: "equip-weapon-special-mech-group-box",
                //    },
                //    null,
                //),
            ),
        )
    }
}

class WeaponSelection extends React.Component {
    constructor(props) {
        super(props);
        this.myRefs = {
                weaponInfoBox: React.createRef(),
            };
    }

    ttlDecr(v) {
        this.myRefs.weaponInfoBox.current.ttlDecr(v);
    }

    render() {
        check.isObj(this.props.weaponRORenderingProps);
        check.isArr(this.props.weaponRORenderingProps.rampSkillSelectionsArray); // Spot check for structure
        check.isNonEmptyStr(this.props.weaponRORenderingProps.iconImgPath);

        check.isObj(this.props.buildPerformanceValues);
        check.isInt(this.props.buildPerformanceValues.weaponAttack); // Spot check for structure

        check.isFunction(this.props.handleClickWeaponSelect);
        check.isFunction(this.props.handleClickDecorationSelect);

        return element("div",
            {
            className: "equip-box",
            },
            element(EquipIcon,
                {
                iconImg: this.props.weaponRORenderingProps.iconImgPath,
                showRemoveButton: false,
                handleSelectButton: () => {this.props.handleClickWeaponSelect()},
                },
                null,
            ),
            element("div",
                {
                className: "equip-main-box",
                },
                element(EquipWeaponInfoBox,
                    {
                        ref: this.myRefs.weaponInfoBox,
                        weaponRORenderingProps: this.props.weaponRORenderingProps,
                        buildPerformanceValues: this.props.buildPerformanceValues,
                    },
                    null,
                ),
            ),
            element(EquipDecosWrapBox,
                {
                    decosArray: this.props.weaponRORenderingProps.decosArray,
                    handleClickSelect: (...args) => {this.props.handleClickDecorationSelect(...args);},
                    handleClickRemove: (...args) => {this.props.handleClickDecorationRemove(...args);},
                },
                null,
            ),
        );
    }
}

export {WeaponSelection};

