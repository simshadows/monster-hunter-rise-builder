/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";

const element = React.createElement;
const assert = console.assert;

class BuffBox extends React.Component {

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

        assert(stateSpecification.presentations.length == 2); // We don't implement complex states yet

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
    }
}

class BuffsSelectGroup extends React.Component {

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

class BuffsSelectView extends React.Component {

    handleChangeCalcState(...args) {
        this.props.handleChangeCalcState(...args);
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
                    handleChangeCalcState: (...args) => {this.handleChangeCalcState(...args)},
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

export {BuffsSelectView};

