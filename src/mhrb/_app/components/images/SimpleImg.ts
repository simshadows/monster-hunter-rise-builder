/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import {getImgPath} from "../../images";

interface Props {
    readonly src: string;
}

export function SimpleImg(props: Props) {
    return element("img", {
        src: getImgPath(props.src),
        alt: props.src,
    }); // TODO: Better alt texts?
}

