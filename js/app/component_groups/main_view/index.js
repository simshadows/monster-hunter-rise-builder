/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";

import SkillsResultsBox from "./skill_results_box.js";
import EquipmentSelectionsBox from "./equipment_selections_box.js";
import CalculationResultsBox from "./calculation_results_box.js";
import UtilBox from "./util_box.js";

const element = React.createElement;
const assert = console.assert;

function Footer(props) {
    return element("footer",
        {
        id: "footer",
        },
        element("p",
            null,
            element("b", null, "This project is currently in very early development."),
            " Full source code available ",
            element("a",
                {
                href: "https://github.com/simshadows/monster-hunter-rise-builder",
                target: "_blank",
                },
                "here"
            ),
            "."
        )
    );
}

class MainView extends React.Component {

    render() {
        check.isObj(this.props.buildRenderingProps);
        check.isArr(this.props.buildRenderingProps.weaponRO.rampSkillSelectionsArray); // Spot check for structure

        check.isFunction(this.props.handleClickBuffsSelect);
        check.isFunction(this.props.handleClickWeaponSelect);
        check.isFunction(this.props.handleClickWeaponCustomize);
        check.isFunction(this.props.handleClickArmourSelect);
        check.isFunction(this.props.handleClickTalismanSelect);
        check.isFunction(this.props.handleClickPetalaceSelect);
        check.isFunction(this.props.handleClickDecorationSelect);

        return element("div",
            {
            className: "body-outer-box",
            },
            element("div",
                {
                id: "app-inner-box",
                className: "body-inner-box",
                },
                element(UtilBox,
                    null,
                    null,
                ),
                element("div",
                    {
                    id: "mhr-builder-app-main-view",
                    },
                    element("div",
                        {
                        className: "main-view-inner-box",
                        },
                        element(SkillsResultsBox,
                            null,
                            null,
                        ),
                        element(EquipmentSelectionsBox,
                            {
                            buildRenderingProps:        this.props.buildRenderingProps,
                            handleClickBuffsSelect:     ()       => {this.props.handleClickBuffsSelect();},
                            handleClickWeaponSelect:    ()       => {this.props.handleClickWeaponSelect();},
                            handleClickWeaponCustomize: ()       => {this.props.handleClickWeaponCustomize();},
                            handleClickArmourSelect:    (slotID) => {this.props.handleClickArmourSelect(slotID);},
                            handleClickTalismanSelect:  ()       => {this.props.handleClickTalismanSelect();},
                            handleClickPetalaceSelect:  ()       => {this.props.handleClickPetalaceSelect();},
                            handleClickDecorationSelect: (slotID, decoSlotID) => {this.props.handleClickDecorationSelect(slotID, decoSlotID)},
                            },
                            null,
                        ),
                        element(CalculationResultsBox,
                            null,
                            null,
                        ),
                    ),
                ),
            ),
            element(Footer,
                null,
                null,
            ),
        );

    }
}

export {MainView};

