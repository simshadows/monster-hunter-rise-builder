/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import {
    isObj,
    isArr,
} from "../../check.js";
import {
    SharpnessBar,
} from "../../common.js";

const element = React.createElement;
const assert = console.assert;


class CalculationSharpnessBarBox extends React.Component {
    _renderStat(colour, value) {
        return element("div",
            {
            className: "calculation-sharpness-bar-stat",
            style: {
                    color: colour,
                },
            },
            String(value),
        );
    }

    render(props) {
        assert(isArr(this.props.realSharpness));

        return element("div",
            {
            id: "calculation-sharpness-bar-box",
            },
            //element("div",
            //    {
            //    id: "calculation-sharpness-bar-title-row",
            //    className: "calculation-sharpness-bar-row",
            //    },
            //    "Sharpness",
            //),
            element("div",
                {
                id: "calculation-sharpness-bar-stat-row",
                className: "calculation-sharpness-bar-row",
                },
                this._renderStat("var(--color-sharpness--red)"   , this.props.realSharpness[0]),
                this._renderStat("var(--color-sharpness--orange)", this.props.realSharpness[1]),
                this._renderStat("var(--color-sharpness--yellow)", this.props.realSharpness[2]),
                this._renderStat("var(--color-sharpness--green)" , this.props.realSharpness[3]),
                this._renderStat("var(--color-sharpness--blue)"  , this.props.realSharpness[4]),
                this._renderStat("var(--color-sharpness--white)" , this.props.realSharpness[5]),
            ),
            element("div",
                {
                id: "calculation-sharpness-bar-visual-row",
                className: "calculation-sharpness-bar-row",
                },
                element("div",
                    {
                    id: "calculation-sharpness-bar-wrap",
                    },
                    element(SharpnessBar,
                        {
                        baseSharpness: this.props.realSharpness,
                        maxSharpness: this.props.realSharpness,
                        },
                        null,
                    ),
                ),
            ),
        );
    }
}


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

        const sharpnessRenderingTop = (()=>{
                if (perf.realSharpnessBar === null) return null;
                return element(CalculationSharpnessBarBox,
                    {
                    realSharpness: perf.realSharpnessBar,
                    },
                    null
                );
            })();

        let sharpnessRenderingBottom = []
        if (perf.realSharpnessBar !== null) {
            sharpnessRenderingBottom = [
                    this._renderSpace(),
                    this._renderStat("Raw Sharpness Modifier", perf.rawSharpnessModifier.toFixed(4) + "x"),
                    this._renderStat("Elem. Sharpness Modifier", perf.elementalSharpnessModifier.toFixed(4) + "x"),
                ];
        }

        return element("div",
            {
            id: "calculation-results-box",
            className: "sub-box",
            },
            this._renderStat("Effective Raw (EFR)", perf.effectiveRaw.toFixed(2)),
            this._renderStat("Affinity", String(perf.affinity) + "%"),
            sharpnessRenderingTop,
            this._renderSpace(),
            this._renderStat("Raw Crit Damage Multiplier", perf.rawCritDmgMultiplier.toFixed(2) + "x"),
            this._renderStat("Raw Crit Modifier", perf.rawCritModifier.toFixed(4) + "x"),
            ...sharpnessRenderingBottom,
        );
    }
}

export {CalculationResultsBox};

