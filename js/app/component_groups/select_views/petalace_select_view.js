/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";

const element = React.createElement;
const assert = console.assert;

class PetalaceSelectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                allPetalaces: null,
            };
    }

    populateWithData(allPetalaces) {
        // Verify incoming data
        check.isArr(allPetalaces);
        check.isInt(allPetalaces[0].healthGain); // Spot check structure
        check.isInt(allPetalaces[0].staminaUp); // Spot check structure

        // State should be empty of data
        assert(this.state.allPetalaces === null);

        // Now, we add the data
        this.setState({allPetalaces: allPetalaces});
        console.log(this.state);
    }

    render() {
        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-petalace-select-view",
            },
            "This is the petalace select view! It's not implemented yet.",
        );
    }
}

export {PetalaceSelectView};

