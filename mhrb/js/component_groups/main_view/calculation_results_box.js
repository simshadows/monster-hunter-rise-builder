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
    bowgunDeviationSpecToName,
    bowgunRecoilIntToName,
    bowgunAmmoRecoilIntToName,
    bowgunReloadIntToName,
    bowgunAmmoReloadIntToName,
    iterateEleStatMapInLogicalOrder,
} from "../../common.js";
import {
    GenericTable,
} from "../generic_components.js";
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
        assert(isArr(this.props.maxSharpness));
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
                        maxSharpness: this.props.maxSharpness,
                        renderMaxAsPips: true,
                        },
                        null,
                    ),
                ),
            ),
        );
    }
}

class CalculationAmmoStatsBox extends React.Component {

    render(props) {

        assert(isObj(this.props.ammoData));

        const dataArray = [];
        for (const [k, v] of Object.entries(this.props.ammoData)) {
            if (!v.available) continue;
            dataArray.push({
                ammoRO: v.ammoRO,
                available: v.available,
                capacity: v.ammoCapacity,
                recoil: v.recoil,
                reload: v.reload,
            });
        }
        assert(dataArray.length > 0); // Should always be at least one row

        const cspecBodyRowFormat = [
            "calculation-ammo-box-table",
            "calculation-ammo-box-table",
            "calculation-ammo-box-table",
            "calculation-ammo-box-table",
        ];
        const cspecHeadRowFormat = [
            ["", "Ammo"],
            ["", "Capacity"],
            ["", "Recoil"],
            ["", "Reload"],
        ];

        const cspecGetRowContent = (dataObj) => {
            return [
                dataObj.ammoRO.shortName,
                String(dataObj.capacity),
                bowgunAmmoRecoilIntToName(dataObj.recoil),
                bowgunAmmoReloadIntToName(dataObj.reload),
            ];
        };

        const implementationClassNames = {
            wrapDiv: "calculation-ammo-box-table",
            table: "calculation-ammo-box-table",

            thead: "calculation-ammo-box-table",
            trHeadRow: "calculation-ammo-box-table",
            thHeadCell: "calculation-ammo-box-table",

            tbody: "calculation-ammo-box-table",
            trBodyRow: "calculation-ammo-box-table",
            trBodyRowHighlighted: "tmp",
            thBodyCell: "calculation-ammo-box-table",
        };

        return element("div",
            {
            className: "calculation-stat-box",
            },
            element("div",
                {
                className: "calculation-ammo-box-inner",
                },
                element(GenericTable,
                    {
                    renderHeadRow: true,
                    dataArray: dataArray,
                    handleRowClick: () => {},

                    cspecHeadRowFormat: cspecHeadRowFormat,
                    cspecBodyRowFormat: cspecBodyRowFormat,
                    cspecGetRowContent: cspecGetRowContent,
                    cspecHighlightConditionFn: () => false,

                    implementationClassNames: implementationClassNames,
                    },
                    null
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

    _renderGreyed(...elements) {
        return element("span",
            {
            className: "calculation-stat-value-box-greyed",
            },
            ...elements,
        );
    }

    _renderStatInner(iconImgID, label, ...values) {
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
            className: "calculation-stat-box-inner",
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

    _renderStat(...args) {
        return element("div",
            {
            className: "calculation-stat-box",
            },
            this._renderStatInner(...args),
        );
    }

    _renderHuntingHornSong(iconImgID, songName) {
        return element("div",
            {
            className: "calculation-stat-box calculation-song-box",
            },
            element("div",
                {
                className: "calculation-stat-box-inner",
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
            ),
        );
    }

    _renderChargeShotBox(chargeShotArr, chargeLevelLimit) {
        const elems = [];
        for (const [i, [chargeShotTypeRO, level]] of chargeShotArr.entries()) {
            const label = "Charge Shot " + String(i + 1);
            const value = String(chargeShotTypeRO.name) + " Level " + String(level);

            const applyStyle = (e) => {return (i < chargeLevelLimit) ? e : this._renderGreyed(e);};

            elems.push(
                element("div",
                    {
                    className: "calculation-stat-box-inner",
                    },
                    element("div",
                        {
                        className: "calculation-stat-content-box calculation-stat-label-box",
                        },
                        applyStyle(label),
                    ),
                    element("div",
                        {
                        className: "calculation-stat-content-box calculation-stat-value-box",
                        },
                        applyStyle(value),
                    ),
                ),
            );
        }

        return element("div",
            {
            className: "calculation-stat-box",
            },
            ...elems,
        );
    }

    _renderCompatibleCoatings(compatibleCoatings) {
        const op = (label, value) => {
                return this._renderStatInner(null, label, String(value));
            };
        return element("div",
            {
            className: "calculation-stat-box",
            },
            op("Close-range Coating", compatibleCoatings.close_range_coating),
            op("Power Coating"      , compatibleCoatings.power_coating      ),
            op("Poison Coating"     , compatibleCoatings.poison_coating     ),
            op("Para Coating"       , compatibleCoatings.para_coating       ),
            op("Sleep Coating"      , compatibleCoatings.sleep_coating      ),
            op("Blast Coating"      , compatibleCoatings.blast_coating      ),
            op("Exhaust Coating"    , compatibleCoatings.exhaust_coating    ),
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
                    realSharpness:  perf.realSharpnessBar,
                    maxSharpness:   perf.maxSharpnessBar,
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

        if (perf.gunlanceStats !== null) {
            const text = String(perf.gunlanceStats.shellingType.name) + " " + String(perf.gunlanceStats.shellingLevel);
            specialMechanicRenderings.push(
                element(CalculationResultsGroupBox,
                    null,
                    this._renderStat(null, "Shelling Type", text),
                ),
            );
        }

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

        if (perf.switchAxeStats !== null) {
            const statBoxes = [
                    this._renderStat(null, "Phial Type", String(perf.switchAxeStats.phialType.name)),
                ];
            
            if (perf.switchAxeStats.phialValue !== null) {
                statBoxes.push(
                    this._renderStat(null, "Phial Value", String(perf.switchAxeStats.phialValue)),
                );
            }

            specialMechanicRenderings.push(
                element(CalculationResultsGroupBox,
                    null,
                    ...statBoxes,
                ),
            );
        }

        if (perf.chargeBladeStats !== null) {
            specialMechanicRenderings.push(
                element(CalculationResultsGroupBox,
                    null,
                    this._renderStat(null, "Phial Type", String(perf.chargeBladeStats.phialType.name)),
                ),
            );
        }

        if (perf.insectGlaiveStats !== null) {
            specialMechanicRenderings.push(
                element(CalculationResultsGroupBox,
                    null,
                    this._renderStat(null, "Kinsect Level", String(perf.insectGlaiveStats.kinsectLevel)),
                ),
            );
        }

        if (perf.bowStats !== null) {
            specialMechanicRenderings.push(
                element(CalculationResultsGroupBox,
                    null,
                    this._renderStat(null, "Arc Shot", String(perf.bowStats.arcShot.name)),
                    this._renderChargeShotBox(perf.bowStats.chargeShot, perf.bowStats.chargeLevelLimit),
                    this._renderCompatibleCoatings(perf.bowStats.compatibleCoatings),
                ),
            );
        }

        if (perf.bowgunStats !== null) {
            const so = perf.bowgunStats;

            const deviationStr = bowgunDeviationSpecToName(so.deviation.severity, so.deviation.left, so.deviation.right);
            const recoilStr = bowgunRecoilIntToName(so.recoil);
            const reloadStr = bowgunReloadIntToName(so.reload);

            specialMechanicRenderings.push(
                element(CalculationResultsGroupBox,
                    null,
                    this._renderStat(null, "Deviation", deviationStr),
                    this._renderStat(null, "Recoil", recoilStr),
                    this._renderStat(null, "Reload", reloadStr),
                    //element(CalculationAmmoStatsBox,
                    //    {
                    //    ammoData: so.ammo,
                    //    },
                    //    null,
                    //),
                ),
            );
            specialMechanicRenderings.push(
                element(CalculationResultsGroupBox,
                    null,
                    element(CalculationAmmoStatsBox,
                        {
                        ammoData: so.ammo,
                        },
                        null,
                    ),
                ),
            );
        }

        const critStatBox = (()=>{
            if (perf.bowgunStats === null) {
                return element(CalculationResultsGroupBox,
                    null,
                    this._renderStat(null, "Raw Crit Damage", perf.rawCritDmgMultiplier.toFixed(2) + "x"),
                    this._renderStat(null, "Elem. Crit Damage", perf.elementalCritDmgMultiplier.toFixed(2) + "x"),
                    this._renderStat(null, "Raw Crit Modifier", perf.rawCritModifier.toFixed(4) + "x"),
                    this._renderStat(null, "Elem. Crit Modifier", perf.elementalCritModifier.toFixed(4) + "x"),
                );
            } else {
                // We hide the crit stats because there's no space for it, and it's not terribly relevant information anyway,
                return null;
            }
        })();

        const spacerBox = (()=>{
            // TODO: Oh my god why did I decide to do this. This makes me wanna vomit lmao
            const showSpacer = (()=>{
                if (perf.bowgunStats === null) return true;
                let countAmmoRows = 0;
                for (const [k, v] of Object.entries(perf.bowgunStats.ammo)) {
                    if (v.available) ++countAmmoRows;
                }
                return countAmmoRows <= 28;
            })();
            if (showSpacer) {
                return element(CalculationResultsSpacerBox,
                    null,
                    null,
                );
            } else {
                return null;
            }
        })();

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
            critStatBox,
            spacerBox,
        );
    }
}

export {CalculationResultsBox};
                    
