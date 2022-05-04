/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {getImgPath} from "../images";

interface StatePresentation {
    readonly type: "icon" | "abbreviation";
    readonly name: string; // Name of the state
    // Note that for binary states, the name doesn't actually matter.
}
interface IconPresentation extends StatePresentation {
    readonly type:        "icon"; 
    readonly iconImgPath: string; // the icon to show
}
interface AbbreviationPresentation extends StatePresentation {
    readonly type:         "abbreviation"; 
    readonly abbreviation: string; // the text that will be displayed in an icon
    readonly color:        string; // the colour of the icon to be displayed
    readonly borderColor:  string;
}

interface StateInnerSpec {
    readonly initialState: number;

    // presentations = [A list of presentations, one for each state.]
    // For a binary state, we expect two elements.
    readonly presentations: (null | IconPresentation | AbbreviationPresentation)[];
}

const COLOUR = {
    orange: "#fa7317",
    pink:   "#eb73b5",
    purple: "#a340db",
    red:    "#fb4a0c",
    white:  "var(--color-scheme--bright1)",
    yellow: "#fdff74",
};

// Group Name --> State Name --> StatInnerSpec
type StatesSpecificationType = ReadonlyMap<string, ReadonlyMap<string, StateInnerSpec>>;
const statesSpecification: StatesSpecificationType = new Map([
    ["Item Box", new Map([
        ["Powercharm", {
            initialState: 1,

            presentations: [
                // We may start the list with null for the "inactive" state.
                null,
                // Remaining elements must be non-null.

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
        ["Petalace Attack (Max)", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "Active",
                    type: "icon",
                    iconImgPath: getImgPath("petalace_attack"),
                },
            ],
        }],
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
        ["Song: Infernal Melody", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "Active",
                    type: "icon",
                    iconImgPath: getImgPath("song_infernalmelody"),
                },
            ],
        }],
        ["Song: Attack Up", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "Active",
                    type: "icon",
                    iconImgPath: getImgPath("song_attackup"),
                },
            ],
        }],
        ["Song: Affinity Up", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "Active",
                    type: "icon",
                    iconImgPath: getImgPath("song_affinityup"),
                },
            ],
        }],
        ["Song: Elem. Attack Boost", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "Active",
                    type: "icon",
                    iconImgPath: getImgPath("song_elementalattackboost"),
                },
            ],
        }],
        ["Palico: Rousing Roar", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "Active",
                    type: "icon",
                    iconImgPath: getImgPath("palico_rousingroar"),
                },
            ],
        }],
        ["Palico: Power Drum", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "Active",
                    type: "icon",
                    iconImgPath: getImgPath("palico_powerdrum"),
                },
            ],
        }],
        ["LBG Switch Skill: Elemental Reload", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "Active",
                    type: "abbreviation",
                    abbreviation: "ER",
                    color:       "#b1d7d1",
                    borderColor: "#b1d7d1",
                },
            ],
        }],
        ["Reduce Sharpness Level", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "-1",
                    type: "icon",
                    iconImgPath: getImgPath("sharpness_reduction_1"),
                },
                {
                    name: "-2",
                    type: "icon",
                    iconImgPath: getImgPath("sharpness_reduction_2"),
                },
                {
                    name: "-3",
                    type: "icon",
                    iconImgPath: getImgPath("sharpness_reduction_3"),
                },
                {
                    name: "-4",
                    type: "icon",
                    iconImgPath: getImgPath("sharpness_reduction_4"),
                },
                {
                    name: "-5",
                    type: "icon",
                    iconImgPath: getImgPath("sharpness_reduction_5"),
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
        ["Fortify (FOR)", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "One Stack",
                    type: "abbreviation",
                    abbreviation: "FOR1",
                    color:       COLOUR.orange,
                    borderColor: COLOUR.orange,
                },
                {
                    name: "Two Stacks",
                    type: "abbreviation",
                    abbreviation: "FOR2",
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
        ["Offensive Guard (OG)", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "Active",
                    type: "abbreviation",
                    abbreviation: "OG",
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
        ["Kushala Daora Soul (KUS)", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "After One Hit",
                    type: "abbreviation",
                    abbreviation: "KUS1",
                    color:       "#5f8700",
                    borderColor: "#5f8700",
                },
                {
                    name: "After Five Hits",
                    type: "abbreviation",
                    abbreviation: "KUS2",
                    color:       "#5f8700",
                    borderColor: "#5f8700",
                },
            ],
        }],
        ["Valstrax Soul (VAS)", {
            initialState: 0,
            presentations: [
                null,
                {
                    name: "Active",
                    type: "abbreviation",
                    abbreviation: "VAS",
                    color:       "#5f8700",
                    borderColor: "#5f8700",
                },
            ],
        }],
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
    ])],
]);

class CalcState {

    // This will be a double-layered map similar to the specification, except the values will be
    // state values, not state specifications
    // Group Name --> State Name --> Current State Value
    private _state: ReadonlyMap<string, Map<string, number>>;

    _validateState(): void {
        console.assert(this._state.size === statesSpecification.size);
        for (const [groupName, groupStates] of statesSpecification.entries()) {
            const stateInner = this._state.get(groupName);
            if (stateInner === undefined) throw "Expected a result";

            console.assert(groupName !== "");
            console.assert(groupStates.size === stateInner.size);

            for (const [stateName, specInner] of groupStates.entries()) {
                const thisStateValue: undefined | number = stateInner.get(stateName);
                if (thisStateValue === undefined) throw "Expected a result";

                const _stateName: string = stateName; // Force type-checking
                const initialState: number = specInner.initialState;
                const numStates: number = specInner.presentations.length;

                console.assert(_stateName !== "");
                console.assert((initialState % 1 === 0) && (initialState >= 0) && (initialState < numStates));
                console.assert((thisStateValue % 1 === 0) && (thisStateValue >= 0) && (thisStateValue < numStates));
                console.assert(numStates > 0);
            }
        }
    }

    constructor() {
        const state: Map<string, Map<string, number>> = new Map();
        for (const [groupName, groupStates] of statesSpecification.entries()) {
            const tmpMap: Map<string, number> = new Map();
            state.set(groupName, tmpMap);
            for (const [stateName, specInner] of groupStates.entries()) {
                tmpMap.set(stateName, specInner.initialState);
            }
        }
        this._state = state;

        this._validateState();
    }

    // The returned object must never be written to!
    getSpecification(): ReadonlyMap<string, ReadonlyMap<string, StateInnerSpec>> {
        return statesSpecification;
    }

    getCurrState(): ReadonlyMap<string, ReadonlyMap<string, number>> {
        return this._state;
    }


    /*** State Accessors ***/
    // These should be the preferred way of reading state since they
    // communicate intention.
    // Use 'get*State' for non-boolean state.
    // Use '*IsActive' for boolean state.

    private _getState(groupLabel: string, stateLabel: string): number {
        const numPossibleStates = statesSpecification
            .get(groupLabel)
            ?.get(stateLabel)
            ?.presentations
            .length;
        if (numPossibleStates === undefined) throw "Undefined value";
        console.assert((numPossibleStates % 1 === 0) && (numPossibleStates >= 2));

        const stateValue = this._state
            .get(groupLabel)
            ?.get(stateLabel);
        if (stateValue === undefined) throw "Undefined value";
        console.assert(
            (stateValue % 1 === 0)
            && (stateValue >= 0)
            && (stateValue < numPossibleStates)
        );
        return stateValue;
    }
    private _stateIsActive(groupLabel: string, stateLabel: string): boolean {
        const numPossibleStates = statesSpecification
            .get(groupLabel)
            ?.get(stateLabel)
            ?.presentations
            .length;
        if (numPossibleStates === undefined) throw "Undefined value";
        console.assert(numPossibleStates === 2);

        const stateValue = this._state
            .get(groupLabel)
            ?.get(stateLabel);
        if (stateValue === undefined) throw "Undefined value";
        console.assert((stateValue === 0) || (stateValue === 1));
        return (stateValue === 1);
    }

    getRampState(stateLabel: string): number {
        return this._getState("Rampage Skill States", stateLabel);
    }
    rampIsActive(stateLabel: string): boolean {
        return this._stateIsActive("Rampage Skill States", stateLabel);
    }

    getSkillState(stateLabel: string): number {
        return this._getState("Skill States", stateLabel);
    }
    skillIsActive(stateLabel: string): boolean {
        return this._stateIsActive("Skill States", stateLabel);
    }

    //_getIndividualSpec(groupName, stateName) {
    //    const subMap = statesSpecification.get(groupName);
    //    if (subMap === undefined) return undefined:
    //    return subMap.get(stateName);
    //}
    //_getIndividualState(groupName, stateName) {
    //    const subMap = this._state.get(groupName);
    //    if (subMap === undefined) return undefined:
    //    return subMap.get(stateName);
    //}


    /*** Setters ***/

    // Usefully returns self for use in React state transitions.
    setState(groupName: string, stateName: string, newValue: number): CalcState {
        const subMap = this._state.get(groupName);
        if (subMap === undefined) throw "Expected result";
        console.assert(subMap.has(stateName));

        // Handle mutually exclusive states
        if ((groupName === "Item Box") && (newValue === 1)) {
            switch (stateName) {
                case "Demondrug":      subMap.set("Mega Demondrug", 0); break;
                case "Mega Demondrug": subMap.set("Demondrug"     , 0); break;
                case "Armorskin":      subMap.set("Mega Armorskin", 0); break;
                case "Mega Armorskin": subMap.set("Armorskin"     , 0); break;
                default:
                    /* No-op Fallthrough */
            }
        } else if (groupName === "Skill States") {
            if ((stateName === "Punishing Draw (PD)") && (newValue === 1)) {
                // We force Crit Draw if enabling Punishing Draw, but not the other way around
                subMap.set("Critical Draw (CD)" , 1);
            } else if ((stateName === "Critical Draw (CD)") && (newValue === 0)) {
                // We disallow Punishing Draw if disabling Crit Draw, but not the other way around
                subMap.set("Punishing Draw (PD)" , 0);
            }
        }

        subMap.set(stateName, newValue);

        this._validateState();
        return this;
    }

}

export {CalcState};

