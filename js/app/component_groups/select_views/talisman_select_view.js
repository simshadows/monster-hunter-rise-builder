/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    DropdownSelectWithNull,
} from "./common.js";

const element = React.createElement;
const assert = console.assert;

class TalismanSelectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                allSkills: null,
            };
    }

    populateWithData(allSkills) {
        // Verify incoming data
        check.isArr(allSkills);
        check.isInt(allSkills[0].maxLevels); // Spot check structure

        // State should be empty of data
        assert(this.state.allSkills === null);

        // Now, we add the data
        this.setState({allSkills: allSkills});
    }

    handleSelectDecoSlotSize(decoSlotIndex, decoSlotSize) {
        this.props.handleSelectDecoSlotSize(decoSlotIndex, decoSlotSize);
    }

    _renderSkillSelect(heading) {
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
                    currentlySelected: null, // TODO
                    optionsArray: this.state.allSkills,
                    handleOnChange: (skillRO) => {console.log(skillRO);},
                    cspecGetOptionValue: (skillRO) => {return skillRO.id},
                    cspecGetOptionName: (skillRO) => {return skillRO.name},
                    },
                    null,
                ),
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
                    handleOnChange: (newSlotSize) => {this.handleSelectDecoSlotSize(decoSlotIndex, parseInt(newSlotSize))},
                    cspecGetOptionValue: (newSlotSize) => {return newSlotSize},
                    cspecGetOptionName: (newSlotSize) => {return parseInt(newSlotSize)},
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
        check.isArr(this.props.currentDecoSlots);
        assert(this.props.currentDecoSlots.length <= 3);
        check.isFunction(this.props.handleSelectDecoSlotSize);

        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-talisman-select-view",
            },
            this._renderSkillSelect("Skill 1"),
            this._renderSkillSelect("Skill 2"),
            this._renderDecoSlotSelect("Decoration Slot 1", 0),
            this._renderDecoSlotSelect("Decoration Slot 2", 1),
            this._renderDecoSlotSelect("Decoration Slot 3", 2),
        );
    }
}

export {TalismanSelectView};

