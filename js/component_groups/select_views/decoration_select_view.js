/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    isDecoEquippableSlotStr,
    br,
    toNameFilterString,
} from "../../common.js";
import {
    NameFilterTextField,
    //TypeFilterButton,
    SelectionTable,
    //SelectionControlClearButton,
    //SelectionControlButtonsBox,
} from "./common.js";


const element = React.createElement;
const assert = console.assert;

class DecorationSelectionTable extends React.Component {

    static _cspecHeadRowFormat = [
            // [Markup Class, Content]
            ["deco-selection-table-head-cell-name",    "Name"     ],
            ["deco-selection-table-head-cell-numeric", "Slot Size"],
            ["deco-selection-table-head-cell-skills",  "Skills"   ],
        ];

    // Logically Static
    _cspecGetRowContent(decoRO) {
        const skillsStrs = [];
        for (const [skillRO, skillLevel] of decoRO.skills) {
            skillsStrs.push(skillRO.name + " +" + parseInt(skillLevel));
        }

        return [
            decoRO.name,
            parseInt(decoRO.slotSize),
            skillsStrs.join(", "),
        ];
    }

    _cspecHighlightConditionFn(armourPieceRO) {
        return false;
    }

    handleRowClick(decoRO) {
        check.isInt(decoRO.slotSize); // Spot check structure
        this.props.handleRowClick(decoRO);
    }

    render() {
        check.isArr(this.props.dataArray);
        check.isObjOrNull(this.props.currentSelectedDecos);
        check.isFunction(this.props.handleRowClick);

        return element(SelectionTable,
            {
            dataArray:                 this.props.dataArray,
            handleRowClick:            (_decoRO) => {this.handleRowClick(_decoRO);},
            cspecHeadRowFormat:        this.constructor._cspecHeadRowFormat,
            cspecGetRowContent:        (_decoRO) => {return this._cspecGetRowContent(_decoRO);},
            cspecHighlightConditionFn: (_decoRO) => {return this._cspecHighlightConditionFn(_decoRO);},
            },
            null,
        );
    }

}

class DecorationSelectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                querySlotID: "head",
                queryDecoSlotID: 0,
                queryMaxDecoSlotSize: 0,

                filterByName: "", // Empty string by default
            };
    }

    reinitialize(slotID, decoSlotID, maxDecoSlotSize) {
        this.setState({
                querySlotID: slotID,
                queryDecoSlotID: decoSlotID,
                queryMaxDecoSlotSize: maxDecoSlotSize,
            });
    }

    handleNameFilterTextChange(newText) {
        check.isStr(newText);
        this.setState({filterByName: toNameFilterString(newText)});
    }

    handleSelectDecoration(decoRO) {
        check.isObjOrNull(decoRO);
        this.props.handleSelectDecoration(decoRO, this.state.querySlotID, this.state.queryDecoSlotID);
    }

    _getFilteredDecosArray() {
        const op = (element) => {
                return (
                    element.filterHelpers.nameLower.includes(this.state.filterByName)
                    && (element.slotSize <= this.state.queryMaxDecoSlotSize)
                );
            };
        return this.props.allDecosArray.filter(op);
    }

    render() {
        assert(isDecoEquippableSlotStr(this.state.querySlotID));
        check.isInt(this.state.queryDecoSlotID);
        assert((this.state.queryDecoSlotID >= 0) && (this.state.queryDecoSlotID < 3));
        check.isObj(this.props.allDecosArray);
        check.isFunction(this.props.handleSelectDecoration);

        const filteredDecosArray = this._getFilteredDecosArray();

        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-decorations-select-view",
            },
            "Selecting for: " + this.state.querySlotID + ", slot " + parseInt(this.state.queryDecoSlotID + 1) + ", size " + parseInt(this.state.queryMaxDecoSlotSize),
            element(NameFilterTextField,
                {
                onChange: (newText) => {this.handleNameFilterTextChange(newText)},
                },
                null,
            ),
            element(DecorationSelectionTable,
                {
                dataArray: filteredDecosArray,
                currentSelectedDecos: null,
                handleRowClick: (decoRO) => {this.handleSelectDecoration(decoRO);},
                },
                null,
            ),
        );
    }
}

export {DecorationSelectView};

