/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const el = React.createElement;

import {neverUndefined} from "../../generic/type_assertions";

import {Sharpness} from "../../common/types";

const MAX_TOTAL_SHARPNESS = 400;
const SHARPNESS_LEVELS: [string, string][] = [
    ["red"   , "var(--color-sharpness--red)"   ],
    ["orange", "var(--color-sharpness--orange)"],
    ["yellow", "var(--color-sharpness--yellow)"],
    ["green" , "var(--color-sharpness--green)" ],
    ["blue"  , "var(--color-sharpness--blue)"  ],
    ["white" , "var(--color-sharpness--white)" ],
]

function renderSection(values: Sharpness, height: string, circles: string[]) {
    const elements: React.ReactNode[] = [];
    for (const [i, [_, backgroundColour]] of SHARPNESS_LEVELS.entries()) {
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

/****************************************************************************/

interface Props {
    baseSharpness:   Sharpness;
    maxSharpness:    Sharpness;
    renderMaxAsPips: boolean;
}

export function SharpnessBar(props: Props) {
    console.assert(props.baseSharpness.length === props.maxSharpness.length);
    if (props.renderMaxAsPips) {

        const maxMinusBase: number[] = [];
        for (const [i, baseVal] of props.baseSharpness.entries()) {
            const maxVal = props.maxSharpness[i];
            neverUndefined(maxVal);
            maxMinusBase.push(maxVal - baseVal);
        }

        const circles: string[] = [];
        for (const [i, [_, backgroundColour]] of SHARPNESS_LEVELS.entries()) {
            const m = maxMinusBase[i];
            neverUndefined(m);
            console.assert(m % 10 === 0);
            const numCircles = m / 10;
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

