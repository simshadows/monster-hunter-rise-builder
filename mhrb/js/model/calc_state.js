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
    purple: "#a340db",
    red:    "#fb4a0c",
    white:  "var(--color-scheme--bright1)",
    yellow: "#fdff74",
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
                    // We may start the list with null for the "inactive" state.
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
            ["Might Seed", {
                initialState: 1,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("itembox_mightseed"),
                    },
                ],
            }],
            ["Demon Powder", {
                initialState: 1,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("itembox_demonpowder"),
                    },
                ],
            }],
            ["Demondrug", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("itembox_demondrug"),
                    },
                ],
            }],
            ["Mega Demondrug", {
                initialState: 1,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("itembox_megademondrug"),
                    },
                ],
            }],
            ["Adamant Seed", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("itembox_adamantseed"),
                    },
                ],
            }],
            ["Hardshell Powder", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("itembox_hardshellpowder"),
                    },
                ],
            }],
            ["Armorskin", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("itembox_armorskin"),
                    },
                ],
            }],
            ["Mega Armorskin", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("itembox_megaarmorskin"),
                    },
                ],
            }],
        ])],
        ["Misc.", new Map([
            ["Dango Booster", {
                initialState: 1,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "icon",
                        iconImgPath: getImgPath("dango_booster"),
                    },
                ],
            }],
        ])],
        ["Skill States", new Map([
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
            ["Counterstrike (CS)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "CS",
                        color:       COLOUR.red,
                        borderColor: COLOUR.red,
                    },
                ],
            }],
            ["Critical Draw (CD)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "CD",
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
            ["Fortify (FRT)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "1 Stack",
                        type: "abbreviation",
                        abbreviation: "FRT1",
                        color:       COLOUR.orange,
                        borderColor: COLOUR.orange,
                    },
                    {
                        name: "2 Stacks",
                        type: "abbreviation",
                        abbreviation: "FRT2",
                        color:       COLOUR.orange,
                        borderColor: COLOUR.orange,
                    },
                ],
            }],
            ["Heroics (HER)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "HER",
                        color:       COLOUR.red,
                        borderColor: COLOUR.red,
                    },
                ],
            }],
            ["Latent Power (LP)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "LP",
                        color:       COLOUR.pink,
                        borderColor: COLOUR.pink,
                    },
                ],
            }],
            ["Maximum Might (MM)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "MM",
                        color:       COLOUR.pink,
                        borderColor: COLOUR.pink,
                    },
                ],
            }],
            ["Mind's Eye (ME)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "ME",
                        color:       COLOUR.white,
                        borderColor: COLOUR.white,
                    },
                ],
            }],
            ["Offensive Guard (OFG)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "OFG",
                        color:       COLOUR.purple,
                        borderColor: COLOUR.purple,
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
            ["Punishing Draw (PD)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "PD",
                        color:       COLOUR.yellow,
                        borderColor: COLOUR.yellow,
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
        ["Rampage Skill States", new Map([
            ["Wyvern Exploit (WYX)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "WYX",
                        color:       "#5f8700",
                        borderColor: "#5f8700",
                    },
                ],
            }],
            ["Anti-Aerial Species (AA)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "AA",
                        color:       "#5f8700",
                        borderColor: "#5f8700",
                    },
                ],
            }],
            ["Anti-Aquatic Species (AAQ)", {
                initialState: 0,
                presentations: [
                    null,
                    {
                        name: "Active",
                        type: "abbreviation",
                        abbreviation: "AAQ",
                        color:       "#5f8700",
                        borderColor: "#5f8700",
                    },
                ],
            }],
            //["Element Exploit (ELX)", {
            //    initialState: 0,
            //    presentations: [
            //        null,
            //        {
            //            name: "Active",
            //            type: "abbreviation",
            //            abbreviation: "ELX",
            //            color:       "#5f8700",
            //            borderColor: "#5f8700",
            //        },
            //    ],
            //}],
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

    //_getIndividualSpec(groupName, stateName) {
    //    const subMap = this.constructor._statesSpecification.get(groupName);
    //    if (subMap === undefined) return undefined:
    //    return subMap.get(stateName);
    //}
    //_getIndividualState(groupName, stateName) {
    //    const subMap = this._state.get(groupName);
    //    if (subMap === undefined) return undefined:
    //    return subMap.get(stateName);
    //}

    // Usefully returns self for use in React state transitions.
    setState(groupName, stateName, newValue) {
        const subMap = this._state.get(groupName);
        assert(subMap !== undefined);

        // Handle mutually exclusive states
        if ((groupName === "Item Box") && (newValue === 1)) {
            switch (stateName) {
                case "Demondrug":      subMap.set("Mega Demondrug", 0); break;
                case "Mega Demondrug": subMap.set("Demondrug"     , 0); break;
                case "Armorskin":      subMap.set("Mega Armorskin", 0); break;
                case "Mega Armorskin": subMap.set("Armorskin"     , 0); break;
                default:
                    /* Fallthrough */
            }
        } else if (groupName === "Skill States") {
            switch (stateName) {
                // Critical Draw and Punishing Draw must happen together, or not happen at all
                case "Critical Draw (CD)":  subMap.set("Punishing Draw (PD)", newValue); break;
                case "Punishing Draw (PD)": subMap.set("Critical Draw (CD)" , newValue); break;
                default:
                    /* Fallthrough */
            }
        }

        subMap.set(stateName, newValue);

        this._validateState();
        return this;
    }

}

export {CalcState};

