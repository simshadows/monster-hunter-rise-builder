/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    clipsafeSpan,
} from "../../common.js";

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

function SkillResult(props) {
    check.isStr(props.skillName);
    check.isInt(props.skillLevel);
    check.isInt(props.skillLevelMax);
    assert((props.skillLevel <= props.skillLevelMax) && (props.skillLevel > 0));
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
            clipsafeSpan(
                element("span", 
                    {
                    className: "skill-detail",
                    },
                    "Level " + parseInt(props.skillLevel) + " / " + parseInt(props.skillLevelMax),
                )
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

export default SkillsResultsBox;

