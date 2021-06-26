/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";

import {GenericTable} from "../generic_components.js";

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
        check.isStr(this.props.placeholderText);
        check.isFunction(this.props.onChange);

        return element("div",
            {
            className: "select-view-name-filter-box",
            },
            element("input",
                {
                type: "text",
                className: "select-view-name-filter-field",
                placeholder: this.props.placeholderText,
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
                return element("div",
                        {
                        className: "highlight-select-view-type-filter-icon-box stackinner",
                        onClick: (e) => {this.handleOnClick(e)},
                        },
                        null,
                    );
            })();

        const c = (this.props.isSelected) ? " selected-select-view-type-filter-icon-box" : "";
        return element("div",
            {
            className: "select-view-type-filter-icon-box stackouter" + c,
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
    render() {
        assert(this.props.implementationClassNames === undefined);
        return element(GenericTable,
            {
            ...this.props,
            implementationClassNames: {
                    wrapDiv: "selection-table-wrap-box",
                    table:   "selection-table",

                    thead:      "selection-table-head",
                    trHeadRow:  "selection-table-head-row",
                    thHeadCell: "selection-table-head-cell",

                    tbody:                "selection-table-body",
                    trBodyRow:            "selection-table-body-row",
                    trBodyRowHighlighted: "selection-table-body-row-highlighted",
                    thBodyCell:           "selection-table-body-cell",
                },
            },
            null,
        );
    }
}

export {
    NameFilterTextField,
    TypeFilterButton,
    SelectionTable,
};

