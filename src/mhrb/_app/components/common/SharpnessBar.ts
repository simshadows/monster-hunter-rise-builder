/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const el = React.createElement;

import {neverUndefined} from "../../generic/type_assertions";

import {Sharpness} from "../../common/types";

const MAX_TOTAL_SHARPNESS = 400;
const SHARPNESS_COLOURS = [
    "var(--color-sharpness--red)",
    "var(--color-sharpness--orange)",
    "var(--color-sharpness--yellow)",
    "var(--color-sharpness--green)",
    "var(--color-sharpness--blue)",
    "var(--color-sharpness--white)",
] as const;

function renderSection(values: Sharpness, height: string, circles: string[]) {
    const elements: React.ReactNode[] = [];
    for (const [i, backgroundColour] of SHARPNESS_COLOURS.entries()) {
        const value = values[i];
        neverUndefined(value);
        const width = ((value / MAX_TOTAL_SHARPNESS) * 100).toFixed(4) + "%";
        elements.push(
            el("div", { className: "sharpness-bar-level",
                        style: {
                            background: backgroundColour,
                            width: width
                        }},
            ),
        );
    }
    for (const backgroundColour of circles) {
        const width = ((10 / MAX_TOTAL_SHARPNESS) * 100).toFixed(4) + "%";
        elements.push(
            el("div", { className: "sharpness-bar-level",
                        style:     {width: width} },
                el("div", { className: "sharpness-bar-level-pip",
                            style:     {background: backgroundColour} },
                ),
            ),
        );
    }
    return el("div", { className: "sharpness-bar-section",
                       style: {height: height} },
        ...elements,
    );
}

/******************************************************************************/

interface Props {
    baseSharpness:   Sharpness;
    maxSharpness:    Sharpness;
    renderMaxAsPips: boolean;
}

export function SharpnessBar(props: Props) {
    console.assert(props.baseSharpness.length === SHARPNESS_COLOURS.length);
    console.assert(props.baseSharpness.length === props.maxSharpness.length);
    if (props.renderMaxAsPips) {
        const circles: string[] = [];
        for (const [i, backgroundColour] of SHARPNESS_COLOURS.entries()) {
            const baseVal = props.baseSharpness[i];
            const maxVal = props.maxSharpness[i];
            neverUndefined(baseVal);
            neverUndefined(maxVal);
            console.assert((maxVal - baseVal) % 10 === 0);
            const numCircles = (maxVal - baseVal) / 10;
            for (let j = 0; j < numCircles; ++j) {
                circles.push(backgroundColour);
            }
        }
        
        return el("div", {className: "sharpness-bar"},
            renderSection(props.baseSharpness, "68%", []),
            renderSection(props.baseSharpness, "32%", circles),
        );
    } else {
        return el("div", {className: "sharpness-bar"},
            renderSection(props.baseSharpness, "", []),
            renderSection(props.maxSharpness, "", []),
        );
    }
}

