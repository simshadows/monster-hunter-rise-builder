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

class ErrorMessage extends React.Component {

    render() {
        if (this.props.error === null) {
            return "Critical error!";
        } else {
            const extraMessage = "Please report this to the developer. Include this error as a screenshot.";
            const errorMessage = String(this.props.error);
            const errorStackMessage = String(this.props.errorInfo.componentStack);

            return element("div",
                {
                id: "loading-messages-wrap-box",
                },
                element("div", null, element("h1", null, "Critical Error!")),
                element("div",
                    null,
                    element("div", null, element("b", null, errorMessage)),
                    element("div", {style: {whiteSpace: "pre-line"}}, errorStackMessage),
                    element("br", null, null),
                    element("div", null, element("b", null, extraMessage)),
                ),
                element("div", null, element("h1", null, "Refresh your browser to recover your build.")),
            );
        }
    }
}

class MHRBuilderApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                hasError: false,
                error: null,
                errorInfo: null,

                // Two states: Either it's null, or it's a fully-constructed raw data object. Don't modify it once it's built.
                rawData: null,
            };

        this.myRefs = {
                appInner: React.createRef(),
            };

        this.handleKeypress = this.handleKeypress.bind(this);
    }

    ttlDecr(v) {
        //console.log("Root ttlDecr called (v = " + String(v) + ").");
        this.myRefs.appInner.current.ttlDecr(v);
    }

    /*** Error Boundary Methods ***/

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true, error: error, errorInfo: errorInfo});
    }

    /*** Other Methods ***/

    async componentDidMount() {
        const rawData = await downloadRawData();
        this.setState({rawData: rawData});
        removeElementByID("loading-spinner");

        document.addEventListener("keydown", this.handleKeypress);
    }
    componentWillUnmount() {
        // TODO: Verify event removal matching?
        document.removeEventListener("keydown", this.handleKeypress);
    }

    handleOnClick(e) {
        this.ttlDecr(1);
    }

    handleKeypress(e) {
        if (e.code === "Escape") {
            this.ttlDecr(1);
        }
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
        if (this.state.hasError) {
            return element(ErrorMessage,
                {
                error: this.state.error,
                errorInfo: this.state.errorInfo,
                },
                null,
            );
        } else {
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
                console.log(this.state);
                return element("div",
                    {
                    id: "app-outer",
                    onClick: (e) => {this.handleOnClick(e)},
                    },
                    element(MHRBuilderAppInner,
                        {
                        ref: this.myRefs.appInner,
                        rawDataRO: this.state.rawData,
                        },
                        null,
                    ),
                );
            }
        }
    }
}

ReactDOM.render(
    element(MHRBuilderApp, null),
    document.getElementById("app-mount")
);

