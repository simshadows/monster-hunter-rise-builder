/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "./check.js";
import {removeElementByID} from "./utils.js";
import {
    br,
} from "./common.js";

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
        removeElementByID("loading-spinner");
    }

    // Nice idea, but not useful yet.
    //_renderLoadingMessageLine(message, isDone) {
    //    const tailMsg = " Done!";
    //    const tailElement = (isDone) ? tailMsg : element("span", {style: {visibility: "hidden"}}, tailMsg);
    //    return element("div",
    //        null,
    //        message,
    //        tailElement,
    //    );
    //}

    render() {
        if (this.state.rawData === null) {
            // Don't render actual app until all data is loaded.
            return element("div",
                {
                id: "loading-messages-wrap-box",
                },
                element("div", null, "Loading app... Done!"),
                element("div", null, "Loading data..."),
            );
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
    document.getElementById("app-mount")
);

