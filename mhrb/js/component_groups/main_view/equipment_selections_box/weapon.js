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
import {
    GenericTable,
} from "../../generic_components.js";

const assert = console.assert;
const element = React.createElement;

class RampageSkillSelectionTable extends React.Component {

    constructor(props) {
        super(props);
        this._renderInheritanceColumn = null; // We define later
    }

    static _cspecBodyRowFormat = [
            // Markup Class
            "",
            "",
        ];
    static _cspecBodyRowFormatNoInheritanceCol = [
            // Markup Class
            "",
        ];

    // Logically Static
    _cspecGetRowContent(rampSkillTuple) {
        const [rampSkillRO, inheritedFromWeaponRO] = rampSkillTuple;

        const inheritanceCell = (()=>{
                if (this._renderInheritanceColumn) {
                    return [
                        element("div",
                            {
                            className: "ramp-skill-selection-table-body-cell-inheritance",
                            },
                            (inheritedFromWeaponRO === null) ? "" : "From " + String(inheritedFromWeaponRO.name),
                        ),
                    ];
                } else {
                    return [];
                }
            })();

        return [
            element("div",
                {
                className: "ramp-skill-selection-table-body-cell-name",
                },
                (rampSkillRO === null) ? "---" : rampSkillRO.name,
            ),
            ...inheritanceCell,
        ];
    }

    _cspecHighlightConditionFn(rampSkillTuple) {
        const [rampSkillRO, inheritedFromWeaponRO] = rampSkillTuple;
        if ((rampSkillRO === null) || (this.props.currentSelectedRampSkillRO === null)) {
            // return this.props.currentSelectedRampSkillRO === rampSkillRO; // Only true if both are null
            return false; // We don't highlight the empty row ever.
        } else {
            return rampSkillRO.id === this.props.currentSelectedRampSkillRO.id;
        }
    }

    handleRowClick(rampSkillTuple) {
        const [rampSkillRO, inheritedFromWeaponRO] = rampSkillTuple;
        const rampSkillID = (rampSkillRO === null) ? null : rampSkillRO.id;
        this.props.handleRowClick(rampSkillID);
    }

    render() {
        check.isArr(this.props.dataArray);
        check.isObjOrNull(this.props.currentSelectedRampSkillRO);
        check.isFunction(this.props.handleRowClick);

        this._renderInheritanceColumn = (()=>{
                for (const [rampSkillRO, inheritedFromWeaponRO] of this.props.dataArray) {
                    if (inheritedFromWeaponRO !== null) return true;
                }
                return false;
            })();

        // We add the remove-rampage-skill row
        const dataArray = [[null, null], ...this.props.dataArray];

        const cspecBodyRowFormat = (this._renderInheritanceColumn)
                                   ? this.constructor._cspecBodyRowFormat
                                   : this.constructor._cspecBodyRowFormatNoInheritanceCol;

        return element(GenericTable,
            {
            renderHeadRow: false,

            dataArray:                 dataArray,
            handleRowClick:            (rampSkillTuple) => {this.handleRowClick(rampSkillTuple);},
            cspecBodyRowFormat:        this.constructor._cspecBodyRowFormat,
            cspecGetRowContent:        (rampSkillTuple) => {return this._cspecGetRowContent(rampSkillTuple);},
            cspecHighlightConditionFn: (rampSkillTuple) => {return this._cspecHighlightConditionFn(rampSkillTuple);},

            implementationClassNames: {
                    wrapDiv: "ramp-skill-selection-table-wrap-box",
                    table:   "ramp-skill-selection-table",

                    tbody:                "ramp-skill-selection-table-body",
                    trBodyRow:            "ramp-skill-selection-table-body-row",
                    trBodyRowHighlighted: "ramp-skill-selection-table-body-row-highlighted",
                    thBodyCell:           "ramp-skill-selection-table-body-cell",
                },
            },
            null,
        );
    }

}

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

    handleSelectRampSkill(rampSkillID) {
        setTtl(this, 0);
        this.props.handleSelectRampSkill(rampSkillID);
    }

    _renderRampSelection() {
        check.isFunction(this.props.handleSelectRampSkill);

        return element("div",
            {
            className: "equip-weapon-ramp-selection-box hide-from-buildcard",
            //onClick: (e) => {this.makeVisible();}, // Not needed because onClick is already listened by parent
            },
            element(RampageSkillSelectionTable,
                {
                    dataArray: this.props.rampageSkillOptions,
                    currentSelectedRampSkillRO: this.props.selectedRampSkillRO,
                    handleRowClick: (...args) => {this.handleSelectRampSkill(...args);},
                },
                null,
            ),
        );
    }

    render() {
        check.isObjOrNull(this.props.selectedRampSkillRO);
        assert(check.isArr(this.props.rampageSkillOptions) && (this.props.rampageSkillOptions.length > 0));

        check.isFunction(this.props.handleSelectRampSkill);

        const text = (this.props.selectedRampSkillRO === null) ? "None" : this.props.selectedRampSkillRO.name;

        if (this.state.ttl > 0) {
            return element("div",
                {
                // TODO: clipsafe doesn't work here. Might have to split clipsafe to clipsafeinner and clipsafeouter?
                className: "equip-weapon-ramp-box equip-weapon-ramp-box-unselected stackouter",
                onClick: (e) => {this.makeVisible();},
                },
                clipsafeSpan(text),
                element("div",
                    {
                    className: "stackinner hide-from-buildcard",
                    },
                    element("div",
                        {
                        className: "equip-weapon-ramp-box equip-weapon-ramp-box-selected",
                        },
                        clipsafeSpan(text),
                    ),
                ),
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

function DummyRampageSkillSelection(props) {
    return element("div",
        {
        className: "equip-weapon-ramp-box",
        style: {visibility: "hidden"},
        },
        null
    );
}

class EquipWeaponInfoBox extends React.Component {
    constructor(props) {
        super(props);
        this.myRefs = {}; // Keys will be added during rendering
    }

    ttlDecr(v) {
        callTtlDecr(this.myRefs, v);
    }

    handleSelectRampSkill(position, rampSkillID) {
        this.props.handleSelectRampSkill(position, rampSkillID);
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

        check.isFunction(this.props.handleSelectRampSkill);

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
                    handleSelectRampSkill: (...args) => {this.handleSelectRampSkill(i, ...args);},
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
            if (groupElements.length === 0) continue;

            assert((groupElements.length > 0) && (groupElements.length <= 3));
            const numDummies = 3 - groupElements.length;
            for (let i = 0; i < numDummies; ++i) {
                groupElements.push(
                    element(DummyRampageSkillSelection,
                        null,
                        null,
                    )
                );
            }

            extraGroupElements.push(
                element("div",
                    {
                    className: "equip-weapon-ramps-group-box",
                    },
                    element("div",
                        {
                        className: "equip-weapon-ramps-group-box-inner",
                        },
                        ...groupElements
                    ),
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

    handleSelectRampSkill(position, rampSkillID) {
        this.props.handleSelectRampSkill(position, rampSkillID);
    }

    render() {
        check.isObj(this.props.weaponRORenderingProps);
        check.isArr(this.props.weaponRORenderingProps.rampSkillSelectionsArray); // Spot check for structure
        check.isNonEmptyStr(this.props.weaponRORenderingProps.iconImgPath);

        check.isObj(this.props.buildPerformanceValues);
        check.isInt(this.props.buildPerformanceValues.weaponAttack); // Spot check for structure

        check.isFunction(this.props.handleClickWeaponSelect);
        check.isFunction(this.props.handleClickDecorationSelect);

        check.isFunction(this.props.handleSelectRampSkill);

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
                        handleSelectRampSkill: (...args) => {this.handleSelectRampSkill(...args);},
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

