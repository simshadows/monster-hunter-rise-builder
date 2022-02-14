// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";

export class NameFilterTextField extends React.Component<any, any> {

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

