/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import {
    isObj,
    isArr,
    isInt,
    isNumber,
} from "../../check.js";
import {
    SharpnessBar,
    isEleStatStr,
    eleStatIdToName,
} from "../../common.js";
import {
    getSimpleImgElement,
    eleStatStrToImgId,
} from "../../images.js";

const element = React.createElement;
const assert = console.assert;


class CalculationSharpnessBarBox extends React.Component {
    
    _renderStat(colour, value) {
        assert(value >= 0);
        const s = (value > 999) ? "999+" : String(value);
        return element("div",
            {
            className: "calculation-sharpness-bar-stat",
            style: {
                    color: colour,
                },
            },
            s,
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

    _renderStat(iconImgID, label, ...values) {
        const iconElement = (()=>{
                    if (iconImgID === null) {
                        return null;
                    } else {
                        return element("div",
                            {
                            className: "calculation-stat-icon-box",
                            },
                            getSimpleImgElement(iconImgID),
                        );
                    }
            })();

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
                ...values,
                iconElement,
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

        const effectiveEleStatRendering = (()=>{
                const v = [];
                for (const [eleStatType, effectiveEleStatValue] of perf.effectiveEleStat.entries()) {
                    assert(isEleStatStr(eleStatType));
                    assert(effectiveEleStatValue > 0);
                    const eleStatName = eleStatIdToName(eleStatType);

                    const iconImgID = eleStatStrToImgId(eleStatType);
                    v.push(this._renderStat(iconImgID, "Effective " + eleStatName, effectiveEleStatValue.toFixed(2)));
                }
                return v;
            })();

        const affinityRendering = (()=>{
                let v = null;
                if (perf.affinity > 100) {
                    v = ["100% (" + String(perf.affinity) + "%)"];
                } else if (perf.affinity < -100) {
                    //const striked = element("s", null, String(perf.affinity) + "%");
                    //return this._renderStat("Affinity", striked, " -100%");
                    v = ["-100% (" + String(perf.affinity) + "%)"];
                } else {
                    v = [String(perf.affinity) + "%"];
                }
                return this._renderStat("affinity_icon", "Affinity", ...v);
            })();

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
                    this._renderStat(null, "Raw Sharpness Modifier", perf.rawSharpnessModifier.toFixed(4) + "x"),
                    this._renderStat(null, "Elem. Sharpness Modifier", perf.elementalSharpnessModifier.toFixed(4) + "x"),
                ];
        }

        return element("div",
            {
            id: "calculation-results-box",
            className: "sub-box",
            },
            this._renderStat("attack_icon", "Effective Raw", perf.effectiveRaw.toFixed(2)),
            ...effectiveEleStatRendering,
            affinityRendering,
            sharpnessRenderingTop,
            this._renderSpace(),
            this._renderStat(null, "Raw Crit Damage Multiplier", perf.rawCritDmgMultiplier.toFixed(2) + "x"),
            this._renderStat(null, "Elem. Crit Damage Multiplier", perf.elementalCritDmgMultiplier.toFixed(2) + "x"),
            this._renderStat(null, "Raw Crit Modifier", perf.rawCritModifier.toFixed(4) + "x"),
            this._renderStat(null, "Elem. Crit Modifier", perf.elementalCritModifier.toFixed(4) + "x"),
            ...sharpnessRenderingBottom,
        );
    }
}

export {CalculationResultsBox};

