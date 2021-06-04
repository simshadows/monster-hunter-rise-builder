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

    // Not the most elegant way to do this, but it works for now
    _renderSpace() {
        return element("div",
            {
            className: "calculation-stat-spacer-box",
            },
            null,
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
            this._renderStat("Effective Raw (EFR)", perf.effectiveRaw.toFixed(2)),
            this._renderStat("Affinity", String(perf.affinity) + "%"),
            this._renderSpace(),
            this._renderStat("Crit Damage Multiplier", perf.critDmgMultiplier.toFixed(2) + "x"),
            this._renderStat("Crit Modifier", perf.critModifier.toFixed(4) + "x"),
            this._renderSpace(),
            this._renderStat("Sharpness Bar", String(perf.realSharpnessBar)),
            this._renderStat("Raw Sharpness Modifier", perf.rawSharpnessModifier.toFixed(4) + "x"),
            this._renderStat("Elemental Sharp. Mod.", perf.elementalSharpnessModifier.toFixed(4) + "x"),
        );
    }
}

export default CalculationResultsBox;

