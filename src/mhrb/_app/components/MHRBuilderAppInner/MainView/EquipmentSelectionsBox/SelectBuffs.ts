// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../../check";
import {getImgPath} from "../../../../images";

const assert = console.assert;

function BuffImgIcon(props) {
    check.isNonEmptyStr(props.iconImgPath);

    return element("div",
        {
        className: "equip-buff-img-icon-box",
        },
        element("img",
            {
            src: props.iconImgPath,
            alt: "icon",
            },
            null,
        ),
    );
}

function BuffAbbreviationIcon(props) {
    check.isNonEmptyStr(props.content);
    check.isNonEmptyStr(props.color);
    check.isNonEmptyStr(props.borderColor);

    return element("div",
        {
        className: "equip-buff-abbrev-icon-box",
        style: {color: props.color, borderColor: props.borderColor},
        },
        props.content,
    );
}

export class SelectBuffs extends React.Component<any, any> {

    render() {
        check.isMap(this.props.calcStateSpecification);
        check.isMap(this.props.calcStateCurrValues);

        check.isFunction(this.props.handleClickBuffsSelect);

        const elements = [];
        for (const [groupName, groupStatesSpec] of this.props.calcStateSpecification.entries()) {
            const groupCurrentStates = this.props.calcStateCurrValues.get(groupName);
            for (const [stateName, stateSpecification] of groupStatesSpec.entries()) {
                const currStateValue = groupCurrentStates.get(stateName);
                const presentation = stateSpecification.presentations[currStateValue];
                if (presentation === null) {
                    continue; // We show nothing
                } else if (presentation.type === "icon") {
                    elements.push(element(BuffImgIcon, {iconImgPath: presentation.iconImgPath}, null));
                } else if (presentation.type === "abbreviation") {
                    elements.push(
                        element(BuffAbbreviationIcon,
                            {
                            content: presentation.abbreviation,
                            color: presentation.color,
                            borderColor: presentation.borderColor,
                            },
                            null
                        )
                    );
                } else {
                    console.warn("Unexpected presentation type.");
                }
            }
        }

        return element("div",
            {
            className: "equip-box",
            },
            element("div",
                {
                className: "equip-buffs-main-box",
                onClick: () => {this.props.handleClickBuffsSelect()},
                },
                ...elements,
            ),
        );
    }
}

