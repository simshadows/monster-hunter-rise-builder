/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

export function clipsafeSpan(...children) {
    return element("span", {className: "clipsafe"}, ...children);
}

