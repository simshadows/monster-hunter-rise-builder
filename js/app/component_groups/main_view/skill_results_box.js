/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";

const assert = console.assert;
const element = React.createElement;

function SkillResult(props) {
    check.isStr(props.skillName);
    check.isInt(props.skillLevel);
    check.isInt(props.skillLevelMax);
    assert((props.skillLevel <= props.skillLevelMax) && (props.skillLevel > 0));

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
                src: "./images/placeholders/skill.png",
                alt: "icon",
                },
                null,
            ),
        ),
        element("div",
            {
            className: "skill-detail-box",
            },
            element("b", null, props.skillName),
            //element("br", null, null),
            "Level " + parseInt(props.skillLevel) + " / " + parseInt(props.skillLevelMax),
        ),
    );
}

function SkillsResultsBox() {
    return element("div",
        {
        id: "skillsresultsbox",
        className: "sub-box",
        },
        element(SkillResult,
            {
            skillName: "Attack Boost",
            skillLevel: 7,
            skillLevelMax: 7,
            },
            null,
        ),
        element(SkillResult,
            {
            skillName: "Weakness Exploit",
            skillLevel: 2,
            skillLevelMax: 3,
            },
            null,
        ),
    );
}

export default SkillsResultsBox;

