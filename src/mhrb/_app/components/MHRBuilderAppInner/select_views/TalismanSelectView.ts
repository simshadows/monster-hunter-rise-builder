// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../check";

import {DropdownSelect} from "../../../components/generic/DropdownSelect";

const assert = console.assert;

export class TalismanSelectView extends React.Component<any, any> {

    handleSelectSkill(skillIndex, skillID, skillLevel) {
        const skillRO = (skillID === null) ? null : this.props.allSkillsMapLongIds.get(skillID);
        this.props.handleSelectSkill(skillIndex, skillRO, skillLevel);
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
                for (let i = 1; i <= skillRO.maxLevels; ++i) {
                    skillLevelOptions.push(i);
                }
                return element(DropdownSelect,
                    {
                    currentlySelected: skillLevel,
                    optionsArray: skillLevelOptions,
                    onChange: (_skillLevel) => {this.handleSelectSkill(skillIndex, skillRO.id, parseInt(_skillLevel))},
                    addNull: false,
                    cspecGetOptionValue: (_skillLevel) => {return parseInt(_skillLevel)},
                    cspecGetOptionName: (_skillLevel) => {return parseInt(_skillLevel)},

                    implementationClassNames: {select: "select-view-dropdown"},
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
                element(DropdownSelect,
                    {
                    currentlySelected: (skillRO === null) ? "" : skillRO,
                    optionsArray: this.props.allSkillsArray,
                    onChange: (_skillID) => { const v = (_skillID === "") ? null : _skillID;
                                              return this.handleSelectSkill(skillIndex, v, 1); },
                    addNull: true,
                    cspecGetOptionValue: (_skillRO) => {return _skillRO.id},
                    cspecGetOptionName: (_skillRO) => {return _skillRO.name},

                    implementationClassNames: {select: "select-view-dropdown"},
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
                element(DropdownSelect,
                    {
                    currentlySelected: (decoSlotSize == 0) ? "" : decoSlotSize,
                    optionsArray: [1,2,3],
                    // TODO: the parseInt in onChange... we should check all usage of parseInt throughout the codebase.
                    onChange: (_slotSizeWrongType) => { const v = (_slotSizeWrongType === "") ? null : _slotSizeWrongType;
                                                        return this.handleSelectDecoSlotSize(decoSlotIndex, v); },
                    addNull: true,
                    cspecGetOptionValue: (_slotSize) => {return _slotSize},
                    cspecGetOptionName: (_slotSize) => {return parseInt(_slotSize)},

                    implementationClassNames: {select: "select-view-dropdown"},
                    },
                    null,
                ),
            ),
        );
    }

    render() {
        check.isObj(this.props.allSkillsArray);
        check.isObj(this.props.allSkillsMapLongIds);

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

