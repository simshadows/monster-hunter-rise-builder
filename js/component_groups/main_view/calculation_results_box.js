/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import {
    isObj,
} from "../../check.js";

const element = React.createElement;
const assert = console.assert;

class CalculationResultsBox extends React.Component {

    _renderStat(label, value) {
        return element("div",
            {
            className: "calculation-stat-box",
            },
            element("div",
                {
                className: "calculation-stat-content-box calculation-stat-label-box",
                },
                label,
            ),
            element("div",
                {
                className: "calculation-stat-content-box calculation-stat-value-box",
                },
                value,
            ),
        );
    }

    render() {
        // This is the only prop
        const perf = this.props.buildPerformanceValues;

        assert(isObj(this.props.buildPerformanceValues));

        return element("div",
            {
            id: "calculation-results-box",
            className: "sub-box",
            },
            this._renderStat("Effective Raw (EFR)", perf.efr.toFixed(3)),
            this._renderStat("Affinity", String(perf.affinity) + "%"),
        );
    }
}

export default CalculationResultsBox;

