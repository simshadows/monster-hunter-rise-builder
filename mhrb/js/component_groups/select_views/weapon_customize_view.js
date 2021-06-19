/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    DropdownSelectWithNull,
} from "../../common.js";

const element = React.createElement;
const assert = console.assert;

class WeaponCustomizeView extends React.Component {

    handleSelectRampageSkill(positionID, newRampSkillID) {
        this.props.handleSelectRampageSkill(positionID, newRampSkillID);
    }

    _renderRampSelection(positionID, rampSkillSelection, rampSkillOptions) {
        const cspecGetOptionValue = (_arr) => {
                const [rampSkillRO, inheritedFromWeaponRO] = _arr;
                return rampSkillRO.id;
            };

        return element(DropdownSelectWithNull,
            {
            currentlySelected: (rampSkillSelection === null) ? null : [rampSkillSelection, null], // We fake the structure
            optionsArray: rampSkillOptions,
            handleOnChange: (newRampSkillID) => {this.handleSelectRampageSkill(positionID, newRampSkillID)},
            cspecGetOptionValue: cspecGetOptionValue,
            cspecGetOptionName: (_arr) => {const [rampSkillRO, inheritedFromWeaponRO] = _arr; return rampSkillRO.name},
            },
            null,
        );
    }

    render() {
        check.isObj(this.props.buildRenderingProps);
        check.isFunction(this.props.handleSelectRampageSkill);

        const rampSkillSelectionsArray = this.props.buildRenderingProps.weaponRO.rampSkillSelectionsArray;
        const rampSkillOptionsArray = this.props.buildRenderingProps.weaponRO.rampSkillOptionsArray;
        check.isArr(rampSkillSelectionsArray);
        check.isArr(rampSkillOptionsArray);
        assert(rampSkillSelectionsArray.length == rampSkillOptionsArray.length);

        const slotElements = [];
        for (const [i, rampSkillSelection] of rampSkillSelectionsArray.entries()) {
            const rampSkillOptions = rampSkillOptionsArray[i];
            slotElements.push(this._renderRampSelection(i, rampSkillSelection, rampSkillOptions));
        }

        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-weapon-customize-view",
            },
            element("div",
                {
                className: "weapon-customize-view-select-box",
                id: "weapon-customize-view-ramp-select-box",
                },
                element("div",
                    {
                    className: "weapon-customize-view-select-heading-box",
                    },
                    "Rampage Skills"
                ),
                element("div",
                    {
                    className: "weapon-customize-view-select-content-box",
                    },
                    ...slotElements,
                ),
            ),
        );
    }
}

export {WeaponCustomizeView}

