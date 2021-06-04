/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {FontAwesomeSprite} from "../../images.js";

import SkillsResultsBox from "./skill_results_box.js";
import EquipmentSelectionsBox from "./equipment_selections_box/index.js";
import CalculationResultsBox from "./calculation_results_box.js";

const element = React.createElement;
const assert = console.assert;

function UtilityButtonExternalLink(props) {
    check.isNonEmptyStr(props.linkURL);
    check.isNonEmptyStr(props.faStyle);
    check.isNonEmptyStr(props.faFragment);

    return element("div",
        {
        className: "utility-button stackouter",
        },
        element(FontAwesomeSprite,
            {
            style: props.faStyle,
            fragment: props.faFragment,
            },
            null,
        ),
        element("a",
            {
            className: "stackinner",
            href: props.linkURL,
            target: "_blank",
            },
            null,
        ),
    );
}

class UtilityBar extends React.Component {

    handleMakeBuildCard(e) {
        console.log();
        const options = {
                backgroundColor: "#191a1d",
                scale: 4,
            };
        html2canvas(document.getElementById("main-view"), options).then(function(canvas) {
            canvas.toBlob(function(blob) {
                window.saveAs(blob, "build_card.png");
            });
        });
    }

    render() {
        return element("div",
            {
            id: "utility-bar-box-wrap",
            },
            element("div",
                {
                id: "utility-bar-box",
                },
                element("div",
                    {
                    className: "utility-button",
                    onClick: (e) => {this.handleMakeBuildCard(e);},
                    },
                    element(FontAwesomeSprite,
                        {
                        fragment: "camera",
                        },
                        null,
                    ),
                ),
                element("div",
                    {
                    id: "utility-bar-spacer-box",
                    },
                    "This project is currently very early in development. The math is incomplete. Build URLs are subject to change.",
                ),
                element(UtilityButtonExternalLink,
                    {
                    linkURL: "https://github.com/simshadows/monster-hunter-rise-builder",
                    faStyle: "brands",
                    faFragment: "github",
                    },
                    null,
                ),
            ),
        );
    }
}

class MainView extends React.Component {

    render() {
        check.isObj(this.props.buildRenderingProps);
        check.isArr(this.props.buildRenderingProps.weaponRO.rampSkillSelectionsArray); // Spot check for structure

        check.isMap(this.props.calcStateSpecification);
        check.isMap(this.props.calcStateCurrValues);
        check.isObj(this.props.buildPerformanceValues);

        check.isFunction(this.props.handleClickBuffsSelect);
        check.isFunction(this.props.handleClickWeaponSelect);
        check.isFunction(this.props.handleClickWeaponCustomize);
        check.isFunction(this.props.handleClickArmourSelect);
        check.isFunction(this.props.handleClickTalismanSelect);
        check.isFunction(this.props.handleClickPetalaceSelect);
        check.isFunction(this.props.handleClickDecorationSelect);

        check.isFunction(this.props.handleRemovePiece);

        return element("div",
            {
            id: "body-outer-box",
            },
            element("div",
                {
                id: "app-inner-box",
                className: "body-inner-box",
                },
                element(UtilityBar,
                    null,
                    null,
                ),
                element("div",
                    {
                    id: "main-view",
                    },
                    element("div",
                        {
                        id: "main-view-inner-box",
                        },
                        element(SkillsResultsBox,
                            {
                            buildRenderingProps: this.props.buildRenderingProps,
                            },
                            null,
                        ),
                        element(EquipmentSelectionsBox,
                            {
                            buildRenderingProps:    this.props.buildRenderingProps,
                            calcStateSpecification: this.props.calcStateSpecification,
                            calcStateCurrValues:    this.props.calcStateCurrValues,

                            handleClickBuffsSelect:      ()       => {this.props.handleClickBuffsSelect();},
                            handleClickWeaponSelect:     ()       => {this.props.handleClickWeaponSelect();},
                            handleClickWeaponCustomize:  ()       => {this.props.handleClickWeaponCustomize();},
                            handleClickArmourSelect:     (slotID) => {this.props.handleClickArmourSelect(slotID);},
                            handleClickTalismanSelect:   ()       => {this.props.handleClickTalismanSelect();},
                            handleClickPetalaceSelect:   ()       => {this.props.handleClickPetalaceSelect();},
                            handleClickDecorationSelect: (...args) => {this.props.handleClickDecorationSelect(...args)},

                            handleRemovePiece: (slotID) => {this.props.handleRemovePiece(slotID);},
                            },
                            null,
                        ),
                        element(CalculationResultsBox,
                            {
                            buildPerformanceValues: this.props.buildPerformanceValues,
                            },
                            null,
                        ),
                    ),
                ),
                //element("div",
                //    {
                //    id: "footer-spacing-box",
                //    },
                //    null,
                //),
            ),
        );

    }
}

export {MainView};

