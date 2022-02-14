/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const ele = React.createElement;

// TODO: Is prop forwarding here a good idea?

type Props = {
    style?:   "solid" | "brands";
    fragment: string;
};// & React.ComponentProps<"svg">;

export function FontAwesomeSprite(props: Props) {
    const {
        style = "solid",
        fragment,
        ...otherProps
    } = props;

    console.assert(style.length > 0);
    console.assert(fragment.length > 0);

    return ele("svg",
        otherProps,
        ele("use", {href: `./images/fontawesome-free-web/sprites/${style}.svg#${fragment}`}),
    );
}

