/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    DropdownSelect,
    DropdownSelectWithNull,
} from "./common.js";

const element = React.createElement;
const assert = console.assert;

class TalismanSelectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                allSkills: null,
                allSkillsMapLongIds: null,
            };
    }

    populateWithData(allSkillsArray, allSkillsMapLongIds) {
        // Verify incoming data
        check.isArr(allSkillsArray);
        check.isInt(allSkillsArray[0].maxLevels); // Spot check structure
        check.isMap(allSkillsMapLongIds);

        // State should be empty of data
        assert(this.state.allSkills === null);
        assert(this.state.allSkillsMapLongIds === null);

        // Now, we add the data
        this.setState({allSkills: allSkillsArray, allSkillsMapLongIds: allSkillsMapLongIds});
    }

    handleSelectSkill(skillIndex, skillID, skillLevel) {
        this.props.handleSelectSkill(skillIndex, this.state.allSkillsMapLongIds.get(skillID), skillLevel);
    }

    handleSelectDecoSlotSize(decoSlotIndex, slotSizeWrongType) {
        const decoSlotSize = (slotSizeWrongType === null) ? 0 : parseInt(slotSizeWrongType);
        this.props.handleSelectDecoSlotSize(decoSlotIndex, decoSlotSize);
    }

    _renderSkillSelect(heading, skillIndex) {
        const skillRO = this.props.currentSkills[skillIndex].skillRO
        const skillLevel = this.props.currentSkills[skillIndex].skillLevel

        const skillLevelElement = (()=>{
                if (skillRO === null) return null;
                const skillLevelOptions = [];
                for (let i = 1; i < skillRO.maxLevels; ++i) {
                    skillLevelOptions.push(i);
                }
                return element(DropdownSelect,
                    {
                    currentlySelected: skillLevel,
                    optionsArray: skillLevelOptions,
                    handleOnChange: (_skillLevel) => {this.handleSelectSkill(skillIndex, skillRO.id, parseInt(_skillLevel))},
                    cspecGetOptionValue: (_skillLevel) => {return parseInt(_skillLevel)},
                    cspecGetOptionName: (_skillLevel) => {return parseInt(_skillLevel)},
                    },
                    null,
                );
            })();

        return element("div",
            {
            className: "talisman-customize-view-select-box",
            },
            element("div",
                {
                className: "talisman-customize-view-select-heading-box",
                },
                heading,
            ),
            element("div",
                {
                className: "talisman-customize-view-select-content-box",
                },
                element(DropdownSelectWithNull,
                    {
                    currentlySelected: skillRO,
                    optionsArray: this.state.allSkills,
                    handleOnChange: (_skillID) => {this.handleSelectSkill(skillIndex, _skillID, 1)},
                    cspecGetOptionValue: (_skillRO) => {return _skillRO.id},
                    cspecGetOptionName: (_skillRO) => {return _skillRO.name},
                    },
                    null,
                ),
                skillLevelElement,
            ),
        );
    }

    _renderDecoSlotSelect(heading, decoSlotIndex) {
        const decoSlotSize = this.props.currentDecoSlots[decoSlotIndex]
        return element("div",
            {
            className: "talisman-customize-view-select-box",
            },
            element("div",
                {
                className: "talisman-customize-view-select-heading-box",
                },
                heading,
            ),
            element("div",
                {
                className: "talisman-customize-view-select-content-box",
                },
                element(DropdownSelectWithNull,
                    {
                    currentlySelected: (decoSlotSize == 0) ? null : decoSlotSize,
                    optionsArray: [1,2,3],
                    // TODO: the parseInt in handleOnChange... we should check all usage of parseInt throughout the codebase.
                    handleOnChange: (_slotSizeWrongType) => {this.handleSelectDecoSlotSize(decoSlotIndex, _slotSizeWrongType)},
                    cspecGetOptionValue: (_slotSize) => {return _slotSize},
                    cspecGetOptionName: (_slotSize) => {return parseInt(_slotSize)},
                    },
                    null,
                ),
            ),
        );
    }

    render() {
        if (this.state.allSkills === null) {
            return "Error: You shouldn't be able to see this screen before the data is loaded.";
        }
        check.isArr(this.props.currentSkills);
        assert(this.props.currentSkills.length == 2);

        check.isArr(this.props.currentDecoSlots);
        assert(this.props.currentDecoSlots.length == 3);

        check.isFunction(this.props.handleSelectSkill);
        check.isFunction(this.props.handleSelectDecoSlotSize);

        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-talisman-select-view",
            },
            this._renderSkillSelect("Skill 1", 0),
            this._renderSkillSelect("Skill 2", 1),
            this._renderDecoSlotSelect("Decoration Slot 1", 0),
            this._renderDecoSlotSelect("Decoration Slot 2", 1),
            this._renderDecoSlotSelect("Decoration Slot 3", 2),
        );
    }
}

export {TalismanSelectView};

