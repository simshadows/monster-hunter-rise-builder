/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isObj,
    isInt,
    isNonEmptyStr,
    isStrOrNull,
    isArr,
    isMap,
} from "../check.js";
import {
    isDecoEquippableSlotStr,
    isWeaponCategoryStr,
    isEleStatStr,
    isArmourSlotStr,
    toNameFilterString,
} from "../common.js";
import {getImgPath} from "../images.js";

const assert = console.assert;

const COLOUR = {
    orange: "#fa7317",
    pink:   "#eb73b5",
    red:    "#fb4a0c",
}

class CalcState {

    static _statesSpecification = new Map([
        // Groups --> {Togglable Stuff}
        ["Item Box", new Map([
            // Name of togglable thing --> {specifications}
            ["Powercharm", {
                // The initial state value.
                initialState: 1,

                // presentations = [A list of presentations, one for each state.]
                // For a binary state, we expect two elements.
                presentations: [
                    // We always start the list with null.
                    // (This is for a possible implementation of binary states that aren't just on-off.)
                    null,

                    // Remaining elements must be non-null.
                    // if (type == "icon") then:
                    //      name: <-- Name of the state
                    //      iconImgPath <-- the icon to show
                    // if (type == "abbreviation") then:
                    //      name: <-- Name of the state
                    //      abbreviation <-- the text that will be displayed in an icon
                    //      colour <-- the colour of the icon to be displayed
                    //
                    // Do note that for binary states, the name doesn't actually matter.
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("itembox_powercharm"),
                    },
                ],
            }],
            ["Powertalon", {
                initialState: 1,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("itembox_powertalon"),
                    },
                ],
            }],
            ["Armorcharm", {
                initialState: 1,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath:getImgPath("itembox_armorcharm"), 
                    },
                ],
            }],
            ["Armortalon", {
                initialState: 1,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("itembox_armortalon"),
                    },
                ],
            }],
        ])],
        ["Skill Trigger Conditions", new Map([
            ["Affinity Sliding (AFS)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "AFS",
                        color:       COLOUR.pink,
                        borderColor: COLOUR.pink,
                    },
                ],
            }],
            ["Agitator (AGI)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "AGI",
                        color:       COLOUR.red,
                        borderColor: COLOUR.red,
                    },
                ],
            }],
            ["Critical Draw (CDR)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "CDR",
                        color:       COLOUR.pink,
                        borderColor: COLOUR.pink,
                    },
                ],
            }],
            ["Dragonheart (DH)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "DH",
                        color:       COLOUR.orange,
                        borderColor: COLOUR.orange,
                    },
                ],
            }],
            ["Peak Performance (PP)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "PP",
                        color:       COLOUR.red,
                        borderColor: COLOUR.red,
                    },
                ],
            }],
            ["Resentment (RES)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "RES",
                        color:       COLOUR.orange,
                        borderColor: COLOUR.orange,
                    },
                ],
            }],
            ["Resuscitate (RSC)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "RSC",
                        color:       COLOUR.orange,
                        borderColor: COLOUR.orange,
                    },
                ],
            }],
            ["Weakness Exploit (WEX)", {
                initialState: 1,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "WEX",
                        color:       COLOUR.pink,
                        borderColor: COLOUR.pink,
                    },
                ],
            }],
        ])],
    ]);

    _validateState() {
        const currState = this._state;
        const spec = this.constructor._statesSpecification;

        assert(isMap(currState));
        assert(isMap(spec));
        assert(currState.size === spec.size);
        for (const [groupName, groupStates] of this.constructor._statesSpecification.entries()) {
            const subMap = currState.get(groupName);
            assert(isMap(subMap));
            assert(isMap(groupStates));

            assert(isNonEmptyStr(groupName));
            assert(groupStates.size === subMap.size);

            for (const [stateName, stateSpecification] of groupStates.entries()) {
                const thisStateValue = subMap.get(stateName);

                const initialState = stateSpecification.initialState;
                const numStates = stateSpecification.presentations.length;

                assert(isNonEmptyStr(stateName));
                assert(isInt(initialState) && (initialState >= 0) && (initialState < numStates));
                assert(isInt(thisStateValue) && (thisStateValue >= 0) && (thisStateValue < numStates));
                assert(numStates > 0);
            }
        }
    }

    constructor() {
        // This will be a double-layered map similar to the specification, except the values will be
        // state values, not state specifications
        // {Group name: {State name: state value as an integer, ...}, ...}
        this._state = new Map();

        for (const [groupName, groupStates] of this.constructor._statesSpecification.entries()) {
            const tmpMap = new Map();
            this._state.set(groupName, tmpMap);
            for (const [stateName, stateSpecification] of groupStates.entries()) {
                tmpMap.set(stateName, stateSpecification.initialState);
            }
        }
        this._validateState();
    }

    // The returned object must never be written to!
    getSpecification() {
        return this.constructor._statesSpecification;
    }

    // The returned object must never be written to!
    getCurrState() {
        return this._state
    }

    // Usefully returns self for use in React state transitions.
    setState(groupName, stateName, newValue) {
        const subMap = this._state.get(groupName);
        subMap.set(stateName, newValue);

        this._validateState();
        return this;
    }

}

export {CalcState};

