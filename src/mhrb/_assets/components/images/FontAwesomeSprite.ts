/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

const assert = console.assert;

export function FontAwesomeSprite(props) {
    let {style, fragment, ...otherProps} = props;

    if (typeof style !== "string") {
        style = "solid"; // Default
    }
    console.assert(style.length > 0);

    console.assert((typeof fragment === "string") && (fragment.length > 0));

    return element("svg",
        otherProps,
        element("use",
            {
            href: "./images/fontawesome-free-web/sprites/" + style + ".svg#" + fragment,
            },
            null,
        ),
    );
}

