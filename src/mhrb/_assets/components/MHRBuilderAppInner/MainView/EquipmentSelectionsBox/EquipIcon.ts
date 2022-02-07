/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";

export class EquipIcon extends React.Component<any, any> {

    handleSelectButton(e) {
        this.props.handleSelectButton();
    }

    handleRemoveButton(e) {
        this.props.handleRemoveButton(); // Allowed to be undefined. If so, it throws an error.
    }

    _renderRemoveButton() {
        const buttonElement = (()=>{
                if (this.props.showRemoveButton) {
                    return element("div",
                        {
                        className: "equip-remove-button button-common hide-from-buildcard",
                        onClick: (e) => {this.handleRemoveButton(e)},
                        },
                        "remove",
                    );
                } else {
                    return null;
                }
            })();

        return element("div",
            {
            className: "equip-remove-button-wrap",
            },
            buttonElement,
        );
    }

    render() {
        check.isNonEmptyStr(this.props.iconImg);
        check.isBool(this.props.showRemoveButton);
        check.isFunction(this.props.handleSelectButton);
        check.isFunctionOrUndef(this.props.handleRemoveButton);

        return element("div",
            {
            className: "equip-icon-wrap-box",
            },
            element("div",
                {
                onClick: (e) => {this.handleSelectButton(e)},
                },
                element("div",
                    {
                    className: "equip-icon-box",
                    },
                    element("img",
                        {
                        src: this.props.iconImg,
                        alt: "icon",
                        },
                        null,
                    ),
                ),
            ),
            this._renderRemoveButton(),
        );
    }
}

