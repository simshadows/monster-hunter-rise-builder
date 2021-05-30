/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";

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

// Highly recommended to specialize this component
class SelectionTable extends React.Component {

    handleRowClick(e, unprocessedRowData) {
        e.stopPropagation();
        this.props.handleRowClick(unprocessedRowData);
    }

    // Logically static
    _renderRow(unprocessedRowData) {
        const rowContent = this.props.cspecGetRowContent(unprocessedRowData);
        check.isArr(rowContent);

        const cellElements = [];
        for (const cellContent of rowContent) {
            cellElements.push(
                element("th",
                    {
                    className: "selection-table-body-cell",
                    },
                    cellContent,
                ),
            );
        }

        const isHighlighted = this.props.cspecHighlightConditionFn(unprocessedRowData);
        return element("tr",
            {
            className: (isHighlighted) ? "selection-table-body-row-highlighted" : "selection-table-body-row",
            onClick: (e) => {this.handleRowClick(e, unprocessedRowData)},
            },
            ...cellElements,
        );
    }

    render() {
        check.isObj(this.props.dataArray);
        check.isFunction(this.props.handleRowClick);
        check.isArr(this.props.cspecHeadRowFormat);
        check.isFunction(this.props.cspecGetRowContent);
        check.isFunction(this.props.cspecHighlightConditionFn);

        const headRowCells = [];
        for (const [markupClass, content] of this.props.cspecHeadRowFormat) {
            headRowCells.push(element("th", {className: "selection-table-head-cell " + markupClass}, content));
        }

        const bodyRows = [];
        for (const unprocessedRowData of this.props.dataArray) {
            bodyRows.push(this._renderRow(unprocessedRowData));
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
                    element("tr",
                        {
                        className: "selection-table-head-row",
                        },
                        ...headRowCells,
                    ),
                ),
                element("tbody",
                    null,
                    ...bodyRows
                ),
            ),
        );
    }
}

/*** Common Components: Dropdown Menu with Null ***/

class DropdownSelect extends React.Component {

    handleOnChange(e) {
        const selectedItem = e.target.value;
        this.props.handleOnChange(selectedItem)
    }

    _renderOption(item) {
        return element("option",
            {
            value: this.props.cspecGetOptionValue(item),
            },
            this.props.cspecGetOptionName(item),
        );
    }

    render() {
        check.isDefined(this.props.currentlySelected); // This is the currently selected item.
        check.isArr(this.props.optionsArray); // This is an array of all items.
        check.isFunction(this.props.handleOnChange);

        check.isFunction(this.props.cspecGetOptionValue);
        check.isFunction(this.props.cspecGetOptionName);

        const optionsElements = [];
        for (const rampSkillObj of this.props.optionsArray) {
            optionsElements.push(this._renderOption(rampSkillObj));
        }
        
        return element("select",
            {
            value: this.props.cspecGetOptionValue(this.props.currentlySelected),
            onChange: (e) => {this.handleOnChange(e);},
            },
            ...optionsElements,
        );
    }
}

class DropdownSelectWithNull extends React.Component {

    handleOnChange(e) {
        const selectedItem = e.target.value;
        if (selectedItem === "") {
            this.props.handleOnChange(null)
        } else {
            this.props.handleOnChange(selectedItem)
        }
    }

    _renderNullOption() {
        return element("option",
            {
            value: "",
            },
            "---",
        );
    }

    _renderOption(item) {
        return element("option",
            {
            value: this.props.cspecGetOptionValue(item),
            },
            this.props.cspecGetOptionName(item),
        );
    }

    render() {
        check.isDefined(this.props.currentlySelected); // This is the currently selected item.
        check.isArr(this.props.optionsArray); // This is an array of all items.
        check.isFunction(this.props.handleOnChange);

        check.isFunction(this.props.cspecGetOptionValue);
        check.isFunction(this.props.cspecGetOptionName);

        const optionsElements = [this._renderNullOption()];
        for (const rampSkillObj of this.props.optionsArray) {
            optionsElements.push(this._renderOption(rampSkillObj));
        }
        
        return element("select",
            {
            value: (this.props.currentlySelected === null) ? ("") : this.props.cspecGetOptionValue(this.props.currentlySelected),
            onChange: (e) => {this.handleOnChange(e);},
            },
            ...optionsElements,
        );
    }
}

/*** Common Components: Remove or Don't Save Buttons ***/

class SelectionControlClearButton extends React.Component {

    handleOnClick(e) {
        e.stopPropagation();
        this.props.handleOnClick();
    }

    render() {
        return element("div",
            {
            className: "select-view-control-button select-view-control-button-clearfn",
            onClick: (e) => {this.handleOnClick(e)},
            },
            ...React.Children.toArray(this.props.children),
        );
    }
}

function SelectionControlButtonsBox(props) {
    return element("div",
        {
        className: "select-view-control-box",
        },
        ...React.Children.toArray(props.children),
    );
}


export {
    NameFilterTextField,
    TypeFilterButton,
    SelectionTable,
    DropdownSelect,
    DropdownSelectWithNull,
    SelectionControlClearButton,
    SelectionControlButtonsBox,
};

