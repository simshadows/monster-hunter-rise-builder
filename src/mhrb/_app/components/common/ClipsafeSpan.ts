/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

interface Props {
    children: React.ReactNode;
}

export function ClipsafeSpan({children}: Props) {
    return element("span", {className: "clipsafe"}, children);
}

