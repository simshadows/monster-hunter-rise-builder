// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../check";
import {
    toNameFilterString,
} from "../../../common";

import {SelectionTable} from "./internals/SelectionTable";

const assert = console.assert;

class PetalaceSelectionTable extends React.Component<any, any> {

    static _cspecHeadRowFormat = [
            // [Markup Class, Content]
            ["petalace-selection-table-head-cell-category", ""],
            ["petalace-selection-table-head-cell-name"    , "Name"],
            ["petalace-selection-table-head-cell-numeric" , "Health Up"],
            ["petalace-selection-table-head-cell-numeric" , "Health Gain"],
            ["petalace-selection-table-head-cell-numeric" , "Stamina Up"],
            ["petalace-selection-table-head-cell-numeric" , "Stamina Gain"],
            ["petalace-selection-table-head-cell-numeric" , "Attack Up"],
            ["petalace-selection-table-head-cell-numeric" , "Attack Gain"],
            ["petalace-selection-table-head-cell-numeric" , "Defense Up"],
            ["petalace-selection-table-head-cell-numeric" , "Defense Gain"],
        ];
    static _cspecBodyRowFormat = [
            // Markup Class
            "",
            "selection-table-cell-justify-right",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
        ];


    // Logically Static
    _cspecGetRowContent(petalaceRO) {
        return [
            this._renderPieceIcon(petalaceRO.iconImgPath),
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

    _renderPieceIcon(iconImgPath) {
        return element("div",
            {
            className: "selection-table-icon-box",
            },
            element("img",
                {
                src: iconImgPath,
                alt: "icon",
                },
                null,
            ),
        );
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
            cspecBodyRowFormat:        this.constructor._cspecBodyRowFormat,
            cspecGetRowContent:        (petalaceRO) => {return this._cspecGetRowContent(petalaceRO);},
            cspecHighlightConditionFn: (petalaceRO) => {return this._cspecHighlightConditionFn(petalaceRO);},
            },
            null,
        );
    }

}

export class PetalaceSelectView extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
                //filterByName: "", // Empty string by default
            };
    }

    //handleNameFilterTextChange(newText) {
    //    check.isStr(newText);
    //    this.setState({filterByName: toNameFilterString(newText)});
    //}

    handleSelectPetalace(petalaceRO) {
        this.props.handleSelectPetalace(petalaceRO);
    }

    _getFilteredPetalacesArray() {
        //const op = (element) => {
        //        return element.filterHelpers.nameLower.includes(this.state.filterByName);
        //    };
        //return this.props.allPetalacesArray.filter(op);
        return this.props.allPetalacesArray;
    }

    render() {
        check.isObj(this.props.allPetalacesArray);
        check.isObjOrNull(this.props.currentSelectedPetalace);
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
            //element(NameFilterTextField,
            //    {
            //    onChange: (newText) => {this.handleNameFilterTextChange(newText)},
            //    },
            //    null,
            //),
            element(PetalaceSelectionTable,
                {
                dataArray: filteredPetalacesArray,
                currentSelectedPetalace: this.props.currentSelectedPetalace,
                handleRowClick: (petalaceRO) => {this.handleSelectPetalace(petalaceRO)},
                },
                null,
            ),
        );
    }
}

