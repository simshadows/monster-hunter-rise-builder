/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    isArmourSlotStr,
    br,
} from "../../common.js";
import {
    NameFilterTextField,
    TypeFilterButton,
    SelectionTable,
    SelectionControlClearButton,
    SelectionControlButtonsBox,
} from "./common.js";

const element = React.createElement;
const assert = console.assert;

class ArmourSelectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                allArmour: null,
                filterByName: "", // Empty string by default
                filterBySlotID: "", // Empty string, or an armour slot
            };
    }

    populateWithData(allArmour) {
        // Verify incoming data
        check.isObj(allArmour);
        check.isInt(allArmour.waist[0].dragonRes); // Spot check structure

        // State should be empty of data
        assert(this.state.allArmour === null);

        // Now, we add the data
        this.setState({allArmour: allArmour});
    }

    reinitialize(slotID) {
        assert(isArmourSlotStr(slotID));
        this.setState({filterBySlotID: slotID});
    }

    handleNameFilterTextChange(newText) {
        check.isStr(newText);
        this.setState({filterByName: toNameFilterString(newText)});
    }

    render() {
        if (this.state.allArmour === null) {
            return "Error: You shouldn't be able to see this screen before the data is loaded.";
        }
        console.log(this.state);

        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-armour-select-view",
            },
            element(NameFilterTextField,
                {
                onChange: (newText) => {this.handleNameFilterTextChange(newText)},
                },
                null,
            ),
            element(SelectionControlButtonsBox,
                null,
                element(SelectionControlClearButton,
                    {
                    handleOnClick: () => {console.log("not yet implemented");}, // TODO
                    },
                    "Remove Current Selection",
                ),
            ),
        );
    }
}

export {ArmourSelectView};

