/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";

import * as check from "../check";

const element = React.createElement;
const assert = console.assert;

export class GenericTable extends React.Component {

    handleRowClick(e, unprocessedRowData) {
        e.stopPropagation();
        this.props.handleRowClick(unprocessedRowData);
    }

    // Logically static
    _renderRow(unprocessedRowData) {
        const classNames = this.props.implementationClassNames;

        const rowContent = this.props.cspecGetRowContent(unprocessedRowData);
        check.isArr(rowContent);

        const cellElements = [];
        for (const [i, cellContent] of rowContent.entries()) {
            const c = (this.props.cspecBodyRowFormat[i].length > 0) ? " " + this.props.cspecBodyRowFormat[i] : "";
            cellElements.push(
                element("th",
                    {
                    className: classNames.thBodyCell + c,
                    },
                    cellContent,
                ),
            );
        }

        const isHighlighted = this.props.cspecHighlightConditionFn(unprocessedRowData);
        return element("tr",
            {
            className: (isHighlighted) ? classNames.trBodyRowHighlighted : classNames.trBodyRow,
            onClick: (e) => {this.handleRowClick(e, unprocessedRowData)},
            },
            ...cellElements,
        );
    }

    render() {
        check.isBool(this.props.renderHeadRow);

        check.isObj(this.props.dataArray);
        check.isFunction(this.props.handleRowClick);
        if (this.props.renderHeadRow) check.isArr(this.props.cspecHeadRowFormat); // Required only if head is rendered
        check.isArr(this.props.cspecBodyRowFormat);
        check.isFunction(this.props.cspecGetRowContent);
        check.isFunction(this.props.cspecHighlightConditionFn);

        check.isObj(this.props.implementationClassNames);

        ////////////////////////////////
        // Implementation class names //
        ////////////////////////////////

        const classNames = this.props.implementationClassNames;

        check.isNonEmptyStr(classNames.wrapDiv);
        check.isNonEmptyStr(classNames.table  );

        if (this.props.renderHeadRow) {
            check.isNonEmptyStr(classNames.thead     );
            check.isNonEmptyStr(classNames.trHeadRow );
            check.isNonEmptyStr(classNames.thHeadCell);
        }

        check.isNonEmptyStr(classNames.tbody               );
        check.isNonEmptyStr(classNames.trBodyRow           );
        check.isNonEmptyStr(classNames.trBodyRowHighlighted);
        check.isNonEmptyStr(classNames.thBodyCell          );

        ////////////////////////////////

        const headRow = (()=>{
                if (!this.props.renderHeadRow) return null; // Don't render

                const headRowCells = [];
                for (const [markupClass, content] of this.props.cspecHeadRowFormat) {
                    headRowCells.push(element("th", {className: classNames.thHeadCell + " " + markupClass}, content));
                }

                return element("thead",
                    {
                    className: classNames.thead,
                    },
                    element("tr",
                        {
                        className: classNames.trHeadRow,
                        },
                        ...headRowCells,
                    ),
                );
            })();

        const bodyRows = [];
        for (const unprocessedRowData of this.props.dataArray) {
            bodyRows.push(this._renderRow(unprocessedRowData));
        }

        return element("div",
            {
            className: classNames.wrapDiv,
            },
            element("table",
                {
                className: classNames.table,
                },
                headRow,
                element("tbody",
                    {
                    className: classNames.tbody,
                    },
                    ...bodyRows
                ),
            ),
        );
    }
}

export class DropdownSelect extends React.Component {

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

        check.isObj(this.props.implementationClassNames);

        ////////////////////////////////
        // Implementation class names //
        ////////////////////////////////

        const classNames = this.props.implementationClassNames;

        check.isNonEmptyStr(classNames.select);

        ////////////////////////////////

        const optionsElements = [];
        for (const rampSkillObj of this.props.optionsArray) {
            optionsElements.push(this._renderOption(rampSkillObj));
        }
        
        return element("select",
            {
            className: classNames.select,
            value: this.props.cspecGetOptionValue(this.props.currentlySelected),
            onChange: (e) => {this.handleOnChange(e);},
            },
            ...optionsElements,
        );
    }
}

export class DropdownSelectWithNull extends React.Component {

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

        check.isObj(this.props.implementationClassNames);

        ////////////////////////////////
        // Implementation class names //
        ////////////////////////////////

        const classNames = this.props.implementationClassNames;

        check.isNonEmptyStr(classNames.select);

        ////////////////////////////////

        const optionsElements = [this._renderNullOption()];
        for (const rampSkillObj of this.props.optionsArray) {
            optionsElements.push(this._renderOption(rampSkillObj));
        }
        
        return element("select",
            {
            className: classNames.select,
            value: (this.props.currentlySelected === null) ? ("") : this.props.cspecGetOptionValue(this.props.currentlySelected),
            onChange: (e) => {this.handleOnChange(e);},
            },
            ...optionsElements,
        );
    }
}

