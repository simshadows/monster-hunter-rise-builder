/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../check";

const assert = console.assert;

const MAX_TOTAL_SHARPNESS = 400;
const SHARPNESS_LEVELS = [
    ["red"   , "var(--color-sharpness--red)"   ],
    ["orange", "var(--color-sharpness--orange)"],
    ["yellow", "var(--color-sharpness--yellow)"],
    ["green" , "var(--color-sharpness--green)" ],
    ["blue"  , "var(--color-sharpness--blue)"  ],
    ["white" , "var(--color-sharpness--white)" ],
]
export function SharpnessBar(props) {
    assert(check.isArr(props.baseSharpness) && (props.baseSharpness.length === 6));
    assert(check.isArr(props.maxSharpness) && (props.maxSharpness.length === 6));
    assert(check.isBool(props.renderMaxAsPips));

    function renderSection(_values, _height, _circles) {
        const elements = [];
        for (const [i, [levelName, backgroundColour]] of SHARPNESS_LEVELS.entries()) {
            // levelName not used yet
            const width = ((_values[i] / MAX_TOTAL_SHARPNESS) * 100).toFixed(4) + "%";
            elements.push(
                element("div",
                    {
                    className: "sharpness-bar-level",
                    style: {
                            background: backgroundColour,
                            width: width,
                        },
                    },
                )
            );
        }
        for (const backgroundColour of _circles) {
            const width = ((10 / MAX_TOTAL_SHARPNESS) * 100).toFixed(4) + "%"
            elements.push(
                element("div",
                    {
                    className: "sharpness-bar-level",
                    style: {width: width},
                    },
                    element("div",
                        {
                        className: "sharpness-bar-level-pip",
                        style: {background: backgroundColour},
                        },
                    ),
                )
            );
        }
        return element("div",
            {
            className: "sharpness-bar-section",
            style: {height: _height},
            },
            ...elements,
        );
    }

    if (props.renderMaxAsPips) {

        const maxMinusBase = [];
        for (const [i, baseVal] of props.baseSharpness.entries()) {
            const maxVal = props.maxSharpness[i];
            assert(baseVal <= maxVal);
            maxMinusBase.push(maxVal - baseVal);
        }

        const circles = [];
        for (const [i, [levelName, backgroundColour]] of SHARPNESS_LEVELS.entries()) {
            assert(maxMinusBase[i] % 10 === 0);
            const numCircles = maxMinusBase[i] / 10;
            for (let j = 0; j < numCircles; ++j) {
                circles.push(backgroundColour);
            }
        }

        return element("div",
            {
            className: "sharpness-bar",
            },
            renderSection(props.baseSharpness, "68%", []),
            renderSection(props.baseSharpness, "32%", circles),
        );
    
    } else {
        return element("div",
            {
            className: "sharpness-bar",
            },
            renderSection(props.baseSharpness, [], []),
            renderSection(props.maxSharpness, [], []),
        );
    }
}

