/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    weaponCategoryToName,
    eleStatStrToEmoji,
} from "../../common.js";

const element = React.createElement;
const assert = console.assert;

/*** Common Components: Name Filter Text Field ***/

class NameFilterTextField extends React.Component {

    handleChange(e) {
        const newInput = e.target.value;
        check.isStr(newInput);
        this.props.onChange(newInput);
    }

    render() {
        check.isFunction(this.props.onChange);

        return element("div",
            {
            className: "select-view-name-filter-box",
            },
            element("input",
                {
                type: "text",
                className: "select-view-name-filter-field",
                onChange: (e) => {this.handleChange(e);},
                },
                null,
            ),
        );
    }
}

/*** Common Components: Type Filter Button ***/

class TypeFilterButton extends React.Component {

    handleOnClick(e) {
        e.stopPropagation();
        this.props.onClick(e);
    }

    render() {
        check.isNonEmptyStr(this.props.iconImg);
        check.isBool(this.props.isSelected);
        check.isFunction(this.props.onClick);

        const highlightBox = (()=>{
                const c = (this.props.isSelected) ? " selected-select-view-type-filter-icon-box" : "";
                return element("div",
                        {
                        className: "highlight-select-view-type-filter-icon-box stackinner" + c,
                        onClick: (e) => {this.handleOnClick(e)},
                        },
                        null,
                    );
            })();

        return element("div",
            {
            className: "select-view-type-filter-icon-box stackouter",
            },
            element("img",
                {
                src: this.props.iconImg,
                alt: "icon",
                },
                null,
            ),
            highlightBox,
        );
    }
}

/*** Common Components: Selection Table ***/

class SelectionTable extends React.Component {

    handleRowClick(e, weaponRO) {
        assert(check.isInt(weaponRO.affinity)); // Spot check for structure

        e.stopPropagation();
        this.props.handleRowClick(weaponRO);
    }

    // Logically static
    _renderCell(extraClasses, ...content) {
        check.isStr(extraClasses);

        const classNameAppend = (extraClasses.length > 0) ? (" " + extraClasses) : "";
        return element("th",
            {
            className: "selection-table-body-cell" + classNameAppend,
            },
            ...content
        );
    }

    // Logically static
    _renderRow(weaponData, isHighlighted) {
        const specialMechStr = (weaponData.maxSharpness === undefined) ? "" : "MaxSharpness: " + weaponData.maxSharpness.toString();

        return element("tr",
            {
            className: (isHighlighted) ? "selection-table-body-row-highlighted" : "selection-table-body-row",
            onClick: (e) => {this.handleRowClick(e, weaponData)},
            },
            this._renderCell(
                "selection-table-body-cell-category",
                weaponCategoryToName(weaponData.category)
            ),
            this._renderCell(
                "selection-table-body-cell-name",
                weaponData.name
            ),
            this._renderCell(
                "selection-table-body-cell-numeric",
                parseInt(weaponData.attack)
            ),
            this._renderCell(
                "selection-table-body-cell-numeric",
                parseInt(weaponData.affinity) + "%"
            ),
            this._renderCell(
                "selection-table-body-cell-numeric",
                parseInt(weaponData.defense)
            ),
            this._renderCell(
                "selection-table-body-cell-numeric",
                parseInt(weaponData.eleStatValue) + " " + eleStatStrToEmoji(weaponData.eleStatType)
            ),
            this._renderCell(
                "selection-table-body-cell-deco",
                weaponData.decoSlots.toString()
            ),
            this._renderCell(
                "selection-table-body-cell-specialmech",
                specialMechStr
            ),
        );
    }

    render() {
        check.isObj(this.props.dataArray);
        check.isObj(this.props.currentSelectedWeapon);
        check.isFunction(this.props.handleRowClick);

        const headerRow = element("tr",
                {
                className: "selection-table-head-row",
                },
                element("th", {className: "selection-table-head-cell"}, "Category"),
                element("th", {className: "selection-table-head-cell"}, "Name"),
                element("th", {className: "selection-table-head-cell"}, "\u2694\ufe0f"),
                element("th", {className: "selection-table-head-cell"}, "\ud83d\udca2"),
                element("th", {className: "selection-table-head-cell"}, "\ud83d\udee1\ufe0f"),
                element("th", {className: "selection-table-head-cell"}, "Ele/Stat"),
                element("th", {className: "selection-table-head-cell"}, "Slots"),
                element("th", {className: "selection-table-head-cell"}, "Special Mechanics"),
            );

        const bodyRows = [];
        for (const weaponData of this.props.dataArray) {
            // TODO: Verify data structure?
            bodyRows.push(this._renderRow(weaponData, (this.props.currentSelectedWeapon == weaponData)));
        }

        return element("div",
            {
            className: "selection-table-wrap-box",
            },
            element("table",
                {
                className: "selection-table",
                },
                element("thead",
                    {
                    className: "selection-table-head",
                    },
                    headerRow,
                ),
                element("tbody",
                    null,
                    ...bodyRows
                ),
            ),
        );
    }
}

export {
    NameFilterTextField,
    TypeFilterButton,
    SelectionTable,
};

