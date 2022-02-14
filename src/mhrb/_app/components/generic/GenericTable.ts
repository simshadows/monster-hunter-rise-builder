// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../check";

export class GenericTable extends React.Component<any, any> {

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

