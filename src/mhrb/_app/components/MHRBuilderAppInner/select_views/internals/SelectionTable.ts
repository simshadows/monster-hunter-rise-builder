// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";

import {GenericTable} from "../../../generic/GenericTable";

const assert = console.assert;

// Highly recommended to specialize this component
export class SelectionTable extends React.Component<any, any> {
    render() {
        assert(this.props.renderHeadRow === undefined);
        assert(this.props.implementationClassNames === undefined);
        return element(GenericTable,
            {
            ...this.props,

            renderHeadRow: true,

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

