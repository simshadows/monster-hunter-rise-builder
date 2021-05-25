/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../check.js";

const element = React.createElement;
const assert = console.assert;

class Modal extends React.Component {

    handleXButton(e) {
        e.stopPropagation();
        this.props.handleCloseModal();
    }

    handleClickBackground(e) {
        e.stopPropagation();
        this.props.handleCloseModal();
    }

    render() {
        check.isBool(this.props.visible);

        check.isStr(this.props.title);
        assert(this.props.title.length > 0);

        check.isFunction(this.props.handleCloseModal);

        const bgStyle = (this.props.visible ? {} : {display: "none"});

        return element("div",
            {
            className: "modal-background body-outer-box stackinner",
            style: bgStyle,
            onClick: (e) => {this.handleClickBackground(e);},
            },
            element("div",
                {
                className: "body-inner-box",
                },
                element("div",
                    {
                    className: "modal-foreground",
                    onClick: (e) => {e.stopPropagation();},
                    },
                    element("div",
                        {
                        className: "modal-utility-bar",
                        },
                        element("div",
                            {
                            className: "modal-utility-bar-title",
                            },
                            this.props.title,
                        ),
                        element("div",
                            {
                            className: "modal-utility-bar-close-button",
                            onClick: (e) => {this.handleXButton(e);},
                            },
                            "\u00d7",
                        ),
                    ),
                    element("div",
                        {
                        className: "modal-content",
                        },
                        ...React.Children.toArray(this.props.children)
                    ),
                ),
            ),
        );
    }

}

export default Modal;

