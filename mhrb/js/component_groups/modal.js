/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../check.js";
import {FontAwesomeSprite} from "../images.js";
import {
    doTtlDecr,
    setTtl,
} from "../utils.js";

const element = React.createElement;
const assert = console.assert;

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this._ttl = 0;
        this.state = {
                ttl: this._ttl,
            };
    }

    ttlDecr(v) {
        doTtlDecr(this, v);
    }
    makeVisible() {
        setTtl(this, 2);
    }

    render() {
        check.isStr(this.props.title);
        assert(this.props.title.length > 0);

        const bgStyle = (this.state.ttl > 0) ? {} : {display: "none"};

        return element("div",
            {
            className: "modal-background body-outer-box stackinner",
            style: bgStyle,
            },
            element("div",
                {
                className: "body-inner-box",
                },
                element("div",
                    {
                    className: "modal-foreground",
                    onClick: (e) => {this.makeVisible();},
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
                            onClick: (e) => {e.stopPropagation(); this.ttlDecr(2);},
                            },
                            element(FontAwesomeSprite,
                                {
                                style: "solid",
                                fragment: "times",
                                },
                                null,
                            ),
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

export {Modal};

