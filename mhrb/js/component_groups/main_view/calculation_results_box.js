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
    iterateEleStatMapInLogicalOrder,
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
        const v = Math.trunc(value);
        const s = (v > 999) ? "999+" : String(v);
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
        assert(this.props.hitsMultiplier >= 1);

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
                this._renderStat("var(--color-sharpness--red)"   , this.props.realSharpness[0] * this.props.hitsMultiplier),
                this._renderStat("var(--color-sharpness--orange)", this.props.realSharpness[1] * this.props.hitsMultiplier),
                this._renderStat("var(--color-sharpness--yellow)", this.props.realSharpness[2] * this.props.hitsMultiplier),
                this._renderStat("var(--color-sharpness--green)" , this.props.realSharpness[3] * this.props.hitsMultiplier),
                this._renderStat("var(--color-sharpness--blue)"  , this.props.realSharpness[4] * this.props.hitsMultiplier),
                this._renderStat("var(--color-sharpness--white)" , this.props.realSharpness[5] * this.props.hitsMultiplier),
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


function CalculationResultsGroupBox(props) {
    return element("div",
        {
        className: "calculation-results-group-box",
        },
        ...React.Children.toArray(props.children),
    );
}

function CalculationResultsSpacerBox(props) {
    return element("div",
        {
        className: "calculation-results-group-box calculation-results-spacer-box",
        },
        null,
    );
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

    _renderHuntingHornSong(iconImgID, songName) {
        return element("div",
            {
            className: "calculation-stat-box calculation-song-box",
            },
            element("div",
                {
                className: "calculation-song-icon-box",
                },
                getSimpleImgElement(iconImgID),
            ),
            element("div",
                {
                className: "calculation-stat-content-box calculation-stat-label-box",
                },
                songName,
            ),
        );
    }

    render() {
        // This is the only prop
        const perf = this.props.buildPerformanceValues;

        assert(isObj(this.props.buildPerformanceValues));

        const effectiveEleStatRendering = (()=>{
                const v = [];
                for (const [eleStatType, effectiveEleStatValue] of iterateEleStatMapInLogicalOrder(perf.effectiveEleStat)) {
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

        let sharpnessRendering = null;
        if (perf.realSharpnessBar !== null) {
            sharpnessRendering = element(CalculationResultsGroupBox,
                null,
                element(CalculationSharpnessBarBox,
                    {
                    realSharpness: perf.realSharpnessBar,
                    hitsMultiplier: perf.hitsMultiplier,
                    },
                    null
                ),
                this._renderStat(null, "Hits Multiplier", perf.hitsMultiplier.toFixed(1) + "x"),
                this._renderStat(null, "Raw Sharpness Modifier", perf.rawSharpnessModifier.toFixed(4) + "x"),
                this._renderStat(null, "Elem. Sharpness Modifier", perf.elementalSharpnessModifier.toFixed(4) + "x"),
            );
        }

        const specialMechanicRenderings = [];

        if (perf.huntingHornSongs !== null) {
            specialMechanicRenderings.push(
                element(CalculationResultsGroupBox,
                    null,
                    this._renderHuntingHornSong("huntinghorn_song_x", perf.huntingHornSongs.get("x").name),
                    this._renderHuntingHornSong("huntinghorn_song_a", perf.huntingHornSongs.get("a").name),
                    this._renderHuntingHornSong("huntinghorn_song_xa", perf.huntingHornSongs.get("xa").name),
                ),
            );
        }

        return element("div",
            {
            id: "calculation-results-box",
            className: "sub-box",
            },
            element(CalculationResultsGroupBox,
                null,
                this._renderStat("attack_icon", "Effective Raw", perf.effectiveRaw.toFixed(2)),
                ...effectiveEleStatRendering,
                affinityRendering,
            ),
            ...specialMechanicRenderings,
            sharpnessRendering,
            element(CalculationResultsGroupBox,
                null,
                this._renderStat(null, "Raw Crit Damage", perf.rawCritDmgMultiplier.toFixed(2) + "x"),
                this._renderStat(null, "Elem. Crit Damage", perf.elementalCritDmgMultiplier.toFixed(2) + "x"),
                this._renderStat(null, "Raw Crit Modifier", perf.rawCritModifier.toFixed(4) + "x"),
                this._renderStat(null, "Elem. Crit Modifier", perf.elementalCritModifier.toFixed(4) + "x"),
            ),
            element(CalculationResultsSpacerBox,
                null,
                null,
            ),
        );
    }
}

export {CalculationResultsBox};

