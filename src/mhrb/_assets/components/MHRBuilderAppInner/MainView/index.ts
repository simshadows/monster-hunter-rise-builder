// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";

import * as check from "../../../check";

import {EquipmentSelectionsBox} from "../../../component_groups/main_view/equipment_selections_box/index";

import {FontAwesomeSprite} from "../../images/FontAwesomeSprite";

import {SkillsResultsBox} from "./SkillsResultsBox";
import {CalculationResultsBox} from "./CalculationResultsBox";

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

class UtilityBar extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
                doError: false,
            };
    }

    handleMakeBuildCard(e) {
        const options = {
                backgroundColor: "#191a1d",
                scale: 4,
                // TODO: This ignoreElements function may not be entirely robust, though it doesn't matter if it works
                ignoreElements: (element) => String(element.className).split(" ").includes("hide-from-buildcard"),
            };
        html2canvas(document.getElementById("main-view"), options).then(function(canvas) {
            canvas.toBlob(function(blob) {
                window.saveAs(blob, "build_card.png");
            });
        });
    }

    render() {
        if (this.state.doError) {
            throw Error("Intentional error.");
        }

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
                //element("div",
                //    {
                //    className: "utility-button",
                //    onClick: (e) => {this.setState({doError: true})},
                //    },
                //    element(FontAwesomeSprite,
                //        {
                //        fragment: "bomb",
                //        },
                //        null,
                //    ),
                //),
                element("div",
                    {
                    className: "phantom-utility-button",
                    },
                    null
                ),
                element("div",
                    {
                    className: "phantom-utility-button",
                    },
                    null
                ),
                element("div",
                    {
                    id: "utility-bar-spacer-box",
                    },
                    "Monster Hunter Rise Builder v2.0.0-dev, updated for Ver.3.8.0. If you notice anything missing or broken, let us know on Discord!",
                ),
                element(UtilityButtonExternalLink,
                    {
                    linkURL: "https://www.patreon.com/simshadows",
                    faStyle: "brands",
                    faFragment: "patreon",
                    },
                    null,
                ),
                element(UtilityButtonExternalLink,
                    {
                    linkURL: "https://discord.gg/xwV6UN4",
                    faStyle: "brands",
                    faFragment: "discord",
                    },
                    null,
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

export class MainView extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.myRefs = {
                equipmentSelectionsBox: React.createRef(),
            };
    }

    ttlDecr(v) {
        this.myRefs.equipmentSelectionsBox.current.ttlDecr(v);
    }

    handleSelectRampSkill(position, rampSkillID) {
        this.props.handleSelectRampSkill(position, rampSkillID);
    }
    handleSelectWeaponSpecialSelection(specialSelectionID) {
        this.props.handleSelectWeaponSpecialSelection(specialSelectionID);
    }

    render() {
        check.isObj(this.props.buildRenderingProps);
        check.isArr(this.props.buildRenderingProps.weaponRO.rampSkillSelectionsArray); // Spot check for structure

        check.isMap(this.props.calcStateSpecification);
        check.isMap(this.props.calcStateCurrValues);
        check.isObj(this.props.buildPerformanceValues);

        check.isFunction(this.props.handleClickBuffsSelect);
        check.isFunction(this.props.handleClickWeaponSelect);
        check.isFunction(this.props.handleClickArmourSelect);
        check.isFunction(this.props.handleClickTalismanSelect);
        check.isFunction(this.props.handleClickPetalaceSelect);
        check.isFunction(this.props.handleClickDecorationSelect);

        check.isFunction(this.props.handleSelectRampSkill);
        check.isFunction(this.props.handleSelectWeaponSpecialSelection);

        check.isFunction(this.props.handleRemovePiece);
        check.isFunction(this.props.handleRemoveDeco);

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
                            ref: this.myRefs.equipmentSelectionsBox,

                            buildRenderingProps:    this.props.buildRenderingProps,
                            calcStateSpecification: this.props.calcStateSpecification,
                            calcStateCurrValues:    this.props.calcStateCurrValues,
                            buildPerformanceValues: this.props.buildPerformanceValues,

                            handleClickBuffsSelect:      ()              => {this.props.handleClickBuffsSelect();},
                            handleClickWeaponSelect:     ()              => {this.props.handleClickWeaponSelect();},
                            handleClickArmourSelect:     (slotID)        => {this.props.handleClickArmourSelect(slotID);},
                            handleClickTalismanSelect:   ()              => {this.props.handleClickTalismanSelect();},
                            handleClickPetalaceSelect:   ()              => {this.props.handleClickPetalaceSelect();},
                            handleClickDecorationSelect: (__a, __b, __c) => {this.props.handleClickDecorationSelect(__a, __b, __c)},

                            handleSelectRampSkill: (__a, __b) => {this.handleSelectRampSkill(__a, __b);},
                            handleSelectWeaponSpecialSelection: (__a) => {this.handleSelectWeaponSpecialSelection(__a);},

                            handleRemovePiece: (slotID) => {this.props.handleRemovePiece(slotID);},
                            handleRemoveDeco: (slotID, decoSlotID) => {this.props.handleRemoveDeco(slotID, decoSlotID);},
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
            ),
        );

    }
}

