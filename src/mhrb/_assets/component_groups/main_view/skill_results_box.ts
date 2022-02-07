/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";

import * as check from "../../check";

import {clipsafeSpan} from "../../components/common/clipsafeSpan";

const assert = console.assert;
const element = React.createElement;

function NoSkills() {
    return element("div",
        {
        className: "skill-box",
        },
        clipsafeSpan(element("b", null, "No Skills")),
    );
}

function SkillPips(props) {
    check.isInt(props.skillLevel);
    check.isInt(props.skillLevelMax);

    const elements = [];

    for (let i = 0; i < props.skillLevelMax; ++i) {
        const inner = (i < props.skillLevel) ? element("div", {className: "skill-pip"}, null) : null;
        elements.push(
            element("div",
                {
                className: "skill-pip-outer",
                },
                inner
            ),
        );
    }

    return element("div",
        {
            className: "skill-pips-wrapper",
        },
        ...elements,
    );
}

function SkillResult(props) {
    check.isStr(props.skillName);
    check.isInt(props.skillLevel);
    check.isInt(props.skillLevelMax);
    assert((props.skillLevel <= props.skillLevelMax) && (props.skillLevel > 0));
    check.isBool(props.isOverlevelled);
    check.isStr(props.skillIconImgPath);

    return element("div",
        {
        className: "skill-box",
        },
        element("div",
            {
            className: "skill-icon-box",
            },
            element("img",
                {
                src: props.skillIconImgPath,
                alt: "icon",
                },
                null,
            ),
        ),
        element("div",
            {
            className: "skill-detail-box",
            },
            clipsafeSpan(
                element("span", 
                    {
                    className: "skill-name",
                    },
                    props.skillName,
                )
            ),
            element("div",
                {
                className: "skill-bottom-row-box",
                },
                element(SkillPips,
                    {
                    skillLevel: props.skillLevel,
                    skillLevelMax: props.skillLevelMax,
                    },
                    null,
                ),
                clipsafeSpan(
                    element("span", 
                        {
                        className: "skill-detail" + ((props.isOverlevelled) ? " skill-detail-overlevelled" : ""),
                        },
                        "Level " + parseInt(props.skillLevel), // + " / " + parseInt(props.skillLevelMax),
                    )
                ),
            ),
        ),
    );
}

function SkillsResultsBox(props) {
    check.isObj(props.buildRenderingProps);
    check.isArr(props.buildRenderingProps.calculatedSkills); // Spot check for structure

    const elements = [];
    if (props.buildRenderingProps.calculatedSkills.length == 0) {
        elements.push(
            element(NoSkills,
                null,
                null,
            )
        );
    } else {
        for (const skillProps of props.buildRenderingProps.calculatedSkills) {
            elements.push(
                element(SkillResult,
                    {
                    skillName: skillProps.name,
                    skillLevel: skillProps.level,
                    skillLevelMax: skillProps.maxLevel,
                    isOverlevelled: skillProps.isOverlevelled,
                    skillIconImgPath: skillProps.iconImgPath,
                    },
                    null,
                ),
            );
        }
    }

    return element("div",
        {
        id: "skills-results-box",
        className: "sub-box",
        },
        ...elements,
    );
}

export {SkillsResultsBox};

