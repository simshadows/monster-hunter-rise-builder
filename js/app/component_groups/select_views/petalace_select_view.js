/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    NameFilterTextField,
    SelectionTable,
    SelectionControlClearButton,
    SelectionControlButtonsBox,
} from "./common.js";
import {
    toNameFilterString,
} from "../../common.js";

const element = React.createElement;
const assert = console.assert;

class PetalaceSelectionTable extends React.Component {

    static _cspecHeadRowFormat = [
            // [Markup Class, Content]
            ["petalace-selection-table-head-cell-name", "Name"],
            ["petalace-selection-table-head-cell-numeric", "Health Up"],
            ["petalace-selection-table-head-cell-numeric", "Health Gain"],
            ["petalace-selection-table-head-cell-numeric", "Stamina Up"],
            ["petalace-selection-table-head-cell-numeric", "Stamina Gain"],
            ["petalace-selection-table-head-cell-numeric", "Attack Up"],
            ["petalace-selection-table-head-cell-numeric", "Attack Gain"],
            ["petalace-selection-table-head-cell-numeric", "Defense Up"],
            ["petalace-selection-table-head-cell-numeric", "Defense Gain"],
        ];

    // Logically Static
    _cspecGetRowContent(petalaceRO) {
        return [
            petalaceRO.name,
            parseInt(petalaceRO.healthUp),
            parseInt(petalaceRO.healthGain),
            parseInt(petalaceRO.staminaUp),
            parseInt(petalaceRO.staminaGain),
            parseInt(petalaceRO.attackUp),
            parseInt(petalaceRO.attackGain),
            parseInt(petalaceRO.defenseUp),
            parseInt(petalaceRO.defenseGain),
        ];
    }

    _cspecHighlightConditionFn(petalaceRO) {
        return petalaceRO == this.props.currentSelectedPetalace;
    }

    handleRowClick(petalaceRO) {
        check.isInt(petalaceRO.healthGain); // Spot check structure
        check.isInt(petalaceRO.staminaUp); // Spot check structure
        this.props.handleRowClick(petalaceRO);
    }

    render() {
        check.isArr(this.props.dataArray);
        //check.isObj(this.props.currentSelectedPetalace);
        check.isFunction(this.props.handleRowClick);

        return element(SelectionTable,
            {
            dataArray:                 this.props.dataArray,
            handleRowClick:            (petalaceRO) => {this.handleRowClick(petalaceRO);},
            cspecHeadRowFormat:        this.constructor._cspecHeadRowFormat,
            cspecGetRowContent:        (petalaceRO) => {return this._cspecGetRowContent(petalaceRO);},
            cspecHighlightConditionFn: (petalaceRO) => {return this._cspecHighlightConditionFn(petalaceRO);},
            },
            null,
        );
    }

}

class PetalaceSelectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                allPetalaces: null,
                filterByName: "", // Empty string by default
            };
    }

    populateWithData(allPetalaces) {
        // Verify incoming data
        check.isArr(allPetalaces);
        check.isInt(allPetalaces[0].healthGain); // Spot check structure
        check.isInt(allPetalaces[0].staminaUp); // Spot check structure

        // State should be empty of data
        assert(this.state.allPetalaces === null);

        // Now, we add the data
        this.setState({allPetalaces: allPetalaces});
    }

    handleNameFilterTextChange(newText) {
        check.isStr(newText);
        this.setState({filterByName: toNameFilterString(newText)});
    }

    handleSelectPetalace(petalaceRO) {
        this.props.handleSelectPetalace(petalaceRO);
    }

    _getFilteredPetalacesArray() {
        const op = (element) => {
                return element.filterHelpers.nameLower.includes(this.state.filterByName);
            };
        return this.state.allPetalaces.filter(op);
    }

    render() {
        if (this.state.allPetalaces === null) {
            return "Error: You shouldn't be able to see this screen before the data is loaded.";
        }
        check.isObj(this.props.currentSelectedPetalace);
        if (this.props.currentSelectedPetalace != null) { // Allowed to be null
            check.isInt(this.props.currentSelectedPetalace.healthGain); // Spot check structure
            check.isInt(this.props.currentSelectedPetalace.staminaUp); // Spot check structure
        }
        check.isFunction(this.props.handleSelectPetalace);

        const filteredPetalacesArray = this._getFilteredPetalacesArray();

        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-petalace-select-view",
            },
            element(NameFilterTextField,
                {
                onChange: (newText) => {this.handleNameFilterTextChange(newText)},
                },
                null,
            ),
            element(PetalaceSelectionTable,
                {
                dataArray: filteredPetalacesArray,
                currentSelectedPetalace: this.props.currentSelectedPetalace,
                handleRowClick: (petalaceRO) => {this.handleSelectPetalace(petalaceRO)},
                },
                null,
            ),
            element(SelectionControlButtonsBox,
                null,
                element(SelectionControlClearButton,
                    {
                    handleOnClick: () => {this.handleSelectPetalace(null);},
                    },
                    "Remove Current Selection",
                ),
            ),
        );
    }
}

export {PetalaceSelectView};

