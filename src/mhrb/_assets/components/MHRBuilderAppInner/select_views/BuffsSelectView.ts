/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const element = React.createElement;

import * as check from "../../../check";

import {DropdownSelect} from "../../generic/DropdownSelect";

const assert = console.assert;

class BuffBox extends React.Component<any, any> {

    handleChangeCalcState(groupName, stateName, newValue) {
        this.props.handleChangeCalcState(groupName, stateName, newValue);
    }

    render() {
        // These are all the props
        const groupName = this.props.groupName;
        const stateName = this.props.stateName;
        const stateSpecification = this.props.stateSpecification;
        const currStateValue = this.props.currStateValue;
        const handleChangeCalcState = this.props.handleChangeCalcState;

        check.isNonEmptyStr(groupName);
        check.isNonEmptyStr(stateName);
        check.isObj(stateSpecification);
        check.isInt(currStateValue);
        check.isFunction(handleChangeCalcState);

        assert(currStateValue >= 0);
        assert(currStateValue < stateSpecification.presentations.length);

        if ((stateSpecification.presentations.length == 2) && (stateSpecification.presentations[0] === null)) {
            // Simple binary state. We just render a checkbox.
            return element("div",
                null,
                element("label",
                    null,
                    element("input",
                        {
                        type: "checkbox",
                        checked: currStateValue === 1,
                        onChange: (e) => {this.handleChangeCalcState(groupName, stateName, (currStateValue === 1) ? 0 : 1)},
                        },
                        null,
                    ),
                    stateName,
                ),
            );
        } else {
            // State with more than two possible values, or non-null first value
            assert(stateSpecification.presentations.length >= 2); // We never expect less than 2 states

            const optionsArray = [];
            let seenNull = false; // Verify that we only see null once
            for (const [optionStateValue, presentation] of stateSpecification.presentations.entries()) {
                const presentedName = (()=>{
                        if (presentation === null) {
                            assert(!seenNull);
                            seenNull = true;
                            return "---";
                        } else {
                            return presentation.name;
                        }
                    })();
                optionsArray.push({
                    groupName: groupName,
                    stateName: stateName,
                    stateValue: optionStateValue,
                    presentedName: presentedName,
                });
            }

            return element("div",
                null,
                element("label",
                    null,
                    element(DropdownSelect,
                        {
                        currentlySelected: currStateValue,
                        optionsArray: optionsArray,
                        handleOnChange: (_stateValue) => {this.handleChangeCalcState(groupName, stateName, parseInt(_stateValue));},
                        cspecGetOptionValue: (_optionsArrayElement) => {return _optionsArrayElement.stateValue;},
                        cspecGetOptionName: (_optionsArrayElement) => {return _optionsArrayElement.presentedName;},

                        implementationClassNames: {select: "select-view-dropdown"},
                        },
                        null,
                    ),
                    stateName,
                ),
            );
        }
    }
}

class BuffsSelectGroup extends React.Component<any, any> {

    handleChangeCalcState(...args) {
        this.props.handleChangeCalcState(...args);
    }

    render() {
        check.isNonEmptyStr(this.props.groupName);
        check.isMap(this.props.groupStatesSpecs);
        check.isMap(this.props.groupCurrentStates);
        check.isFunction(this.props.handleChangeCalcState);

        const elements = [];
        for (const [stateName, stateSpecification] of this.props.groupStatesSpecs.entries()) {
            const currStateValue = this.props.groupCurrentStates.get(stateName);
            elements.push(
                element(BuffBox,
                    {
                    groupName: this.props.groupName,
                    stateName: stateName,
                    stateSpecification: stateSpecification,
                    currStateValue: currStateValue,
                    handleChangeCalcState: (...args) => {this.handleChangeCalcState(...args)},
                    },
                    null,
                )
            );
        }
        return element("div",
            {
            className: "buff-selection-group-box",
            },
            element("div",
                {
                className: "buff-selection-group-heading-box",
                },
                this.props.groupName,
            ),
            ...elements,
        );
    }
}

export class BuffsSelectView extends React.Component<any, any> {

    handleChangeCalcState(groupName, stateName, newValue) {
        this.props.handleChangeCalcState(groupName, stateName, newValue);
    }

    render() {
        check.isMap(this.props.calcStateSpecification);
        check.isMap(this.props.calcStateCurrValues);
        check.isFunction(this.props.handleChangeCalcState);

        const elements = [];
        for (const [groupName, groupStatesSpecs] of this.props.calcStateSpecification.entries()) {
            const groupCurrentStates = this.props.calcStateCurrValues.get(groupName);
            elements.push(
                element(BuffsSelectGroup,
                    {
                    groupName: groupName,
                    groupStatesSpecs: groupStatesSpecs,
                    groupCurrentStates: groupCurrentStates,
                    handleChangeCalcState: (__a, __b, __c) => {this.handleChangeCalcState(__a, __b, __c)},
                    },
                    null,
                )
            );
        }

        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-buffs-select-view",
            },
            ...elements,
        );
    }
}

