/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";

export class TypeFilterButton extends React.Component<any, any> {

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

