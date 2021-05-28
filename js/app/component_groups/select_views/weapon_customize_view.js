/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";

const element = React.createElement;
const assert = console.assert;

class SelectRampageSkill extends React.Component {

    handleOnChange(e) {
        const newRampSkillID = e.target.value;
        if (newRampSkillID == "") {
            this.props.handleSelectRampageSkill(null)
        } else {
            this.props.handleSelectRampageSkill(newRampSkillID)
        }
    }

    _renderNullOption() {
        return element("option",
            {
            value: "",
            },
            "---",
        );
    }

    _renderOption(rampSkillObj) {
        check.isObj(rampSkillObj);
        check.isStr(rampSkillObj.id);
        check.isStr(rampSkillObj.name);

        return element("option",
            {
            value: rampSkillObj.id,
            },
            rampSkillObj.name,
        );
    }

    render() {
        check.isObjOrNull(this.props.rampSkillSelection);
        check.isArr(this.props.rampSkillOptionsSubArray);
        check.isFunction(this.props.handleSelectRampageSkill);

        const optionsElements = [this._renderNullOption()];
        for (const rampSkillObj of this.props.rampSkillOptionsSubArray) {
            optionsElements.push(this._renderOption(rampSkillObj));
        }
        
        return element("select",
            {
            value: (this.props.rampSkillSelection == null) ? ("") : (this.props.rampSkillSelection.id),
            onChange: (e) => {this.handleOnChange(e);},
            },
            ...optionsElements,
        );
    }
}

class WeaponCustomizeView extends React.Component {

    handleSelectRampageSkill(positionID, newRampSkillID) {
        this.props.handleSelectRampageSkill(positionID, newRampSkillID);
    }

    _renderRampSelection(positionID, rampSkillSelection, rampSkillOptions) {
        return element(SelectRampageSkill,
            {
            rampSkillSelection: rampSkillSelection,
            rampSkillOptionsSubArray: rampSkillOptions,
            handleSelectRampageSkill: (newRampSkillID) => {this.handleSelectRampageSkill(positionID, newRampSkillID)},
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

