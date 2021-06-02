/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "./check.js";
import {downloadRawData} from "./database/database.js";
import {MHRBuilderAppInner} from "./app.js";

const element = React.createElement;
const assert = console.assert;

class MHRBuilderApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                // Two states: Either it's null, or it's a fully-constructed raw data object. Don't modify it once it's built.
                rawData: null,
            };
    }

    async componentDidMount() {
        const rawData = await downloadRawData();
        this.setState({rawData: rawData});
    }

    render() {
        if (this.state.rawData === null) {
            // Don't load UI until all data is loaded.
            // TODO: Consider making a proper loading screen.
            return "Loading app... Loading data...";
        } else {
            return element(MHRBuilderAppInner,
                {
                rawDataRO: this.state.rawData,
                },
                null,
            );
        }
    }
}

ReactDOM.render(
    element(MHRBuilderApp, null),
    document.getElementById("app-container")
);

