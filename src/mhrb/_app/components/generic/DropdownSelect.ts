// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../check";

export class DropdownSelect extends React.Component<any, any> {

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

