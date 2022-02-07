// @ts-nocheck
/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";

import * as check from "../../check";
import {
    getImgPath,
    eleStatStrToImgPath,
} from "../../images";
import {
    isWeaponCategoryStr,
    weaponCategoryToName,
    toNameFilterString,
    iterateEleStatMapInLogicalOrder,
} from "../../common";
import {
    NameFilterTextField,
    TypeFilterButton,
    SelectionTable,
} from "./common";

const element = React.createElement;
const assert = console.assert;

class WeaponSelectionTable extends React.Component<any, any> {

    static _cspecHeadRowFormat = [
            // [Markup Class, Content]
            ["weapon-selection-table-head-cell-category",    ""                  ],
            ["weapon-selection-table-head-cell-name",        "Name"              ],
            ["weapon-selection-table-head-cell-numeric",     "Attack"            ],
            ["weapon-selection-table-head-cell-numeric",     "Affinity"          ],
            ["weapon-selection-table-head-cell-numeric",     "Defense"           ],
            ["weapon-selection-table-head-cell-elestat",     "Element/Status"    ],
            ["weapon-selection-table-head-cell-deco",        "Slots"             ],
            ["weapon-selection-table-head-cell-specialmech", "Special Mechanics" ],
        ];
    static _cspecBodyRowFormat = [
            // Markup Class
            "",
            "selection-table-cell-justify-right",
            "",
            "",
            "",
            "",
            "",
            "",
        ];


    // Logically Static
    _cspecGetRowContent(weaponRO) {
        const specialMechStr = (weaponRO.maxSharpness === undefined)
                               ? ""
                               : "MaxSharpness: " + weaponRO.maxSharpness.toString();
        return [
            this._renderPieceIcon(weaponRO.iconImgPath),
            weaponRO.name,
            parseInt(weaponRO.attack),
            parseInt(weaponRO.affinity) + "%",
            parseInt(weaponRO.defense),
            this._renderEleStatContents(weaponRO.eleStat),
            weaponRO.decoSlots.toString(),
            specialMechStr,
        ];
    }

    _cspecHighlightConditionFn(weaponRO) {
        return weaponRO == this.props.currentSelectedWeapon;
    }

    handleRowClick(weaponRO) {
        check.isInt(weaponRO.affinity); // Spot check for structure
        this.props.handleRowClick(weaponRO);
    }

    _renderPieceIcon(iconImgPath) {
        return element("div",
            {
            className: "selection-table-icon-box",
            },
            element("img",
                {
                src: iconImgPath,
                alt: "icon",
                },
                null,
            ),
        );
    }

    _renderEleStatContents(eleStatData) {
        check.isMap(eleStatData);
        if (eleStatData.size === 0) {
            return "none";
        } else {
            const elements = [];
            // Sorting it is really slow
            //for (const [eleStatType, eleStatValue] of iterateEleStatMapInLogicalOrder(eleStatData)) {

            for (const [eleStatType, eleStatValue] of eleStatData.entries()) {
                const iconImgPath = eleStatStrToImgPath(eleStatType);
                assert(iconImgPath !== undefined); // Not relying on undefined values

                elements.push(
                    element("div",
                        {
                        className: "weapon-selection-table-elestat-inner",
                        },
                        this._renderPieceIcon(iconImgPath),
                        element("div",
                            {
                            className: "weapon-selection-table-elestat-text",
                            },
                            String(eleStatValue),
                        ),
                    ),
                );
            }
            return element("div",
                {
                className: "weapon-selection-table-elestat-contents",
                },
                ...elements,
            );
        }
    }

    render() {
        check.isArr(this.props.dataArray);
        check.isObj(this.props.currentSelectedWeapon);
        check.isFunction(this.props.handleRowClick);

        return element(SelectionTable,
            {
            dataArray:                 this.props.dataArray,
            handleRowClick:            (weaponRO) => {this.handleRowClick(weaponRO);},
            cspecHeadRowFormat:        this.constructor._cspecHeadRowFormat,
            cspecBodyRowFormat:        this.constructor._cspecBodyRowFormat,
            cspecGetRowContent:        (weaponData) => {return this._cspecGetRowContent(weaponData);},
            cspecHighlightConditionFn: (weaponData) => {return this._cspecHighlightConditionFn(weaponData);},
            },
            null,
        );
    }

}

class WeaponSelectView extends React.Component {

    static _weaponCategoryToIconMap = new Map([
            ["greatsword"    , getImgPath("weapon_greatsword_r1"    )],
            ["longsword"     , getImgPath("weapon_longsword_r1"     )],
            ["swordandshield", getImgPath("weapon_swordandshield_r1")],
            ["dualblades"    , getImgPath("weapon_dualblades_r1"    )],
            ["switchaxe"     , getImgPath("weapon_switchaxe_r1"     )],
            ["chargeblade"   , getImgPath("weapon_chargeblade_r1"   )],
            ["hammer"        , getImgPath("weapon_hammer_r1"        )],
            ["huntinghorn"   , getImgPath("weapon_huntinghorn_r1"   )],
            ["lance"         , getImgPath("weapon_lance_r1"         )],
            ["gunlance"      , getImgPath("weapon_gunlance_r1"      )],
            ["insectglaive"  , getImgPath("weapon_insectglaive_r1"  )],
            ["bow"           , getImgPath("weapon_bow_r1"           )],
            ["lightbowgun"   , getImgPath("weapon_lightbowgun_r1"   )],
            ["heavybowgun"   , getImgPath("weapon_heavybowgun_r1"   )],
        ]);

    constructor(props) {
        super(props);
        this.state = {
                filterByName: "", // Empty string by default
                filterByCategory: "", // Empty string, or a weapon category string
                filterByEndlineTag: "hr", // Empty string, or a weapon endline tag string
            };
    }

    handleSelectWeapon(weaponRO) {
        this.props.handleSelectWeapon(weaponRO);
    }

    handleNameFilterTextChange(newText) {
        check.isStr(newText);
        this.setState({filterByName: toNameFilterString(newText)});
    }

    handleCategoryFilterButton(weaponCategory) {
        assert(isWeaponCategoryStr(weaponCategory));
        if (this.state.filterByCategory != weaponCategory) {
            this.setState({filterByCategory: weaponCategory});
        } else {
            this.setState({filterByCategory: ""});
        }
    }

    handleEndlineTagFilterCheckboxChange(e) {
        if (this.state.filterByEndlineTag == "hr") {
            this.setState({filterByEndlineTag: ""});
        } else {
            this.setState({filterByEndlineTag: "hr"});
        }
    }

    _getFilteredWeaponsArray() {
        const op = (element) => {
                return (
                    (
                        element.filterHelpers.nameLower.includes(this.state.filterByName)
                        || element.filterHelpers.treeNameLower.includes(this.state.filterByName)
                    )
                    && ((this.state.filterByEndlineTag == "") || (element.endlineTag == this.state.filterByEndlineTag))
                    && ((this.state.filterByCategory == "") || (element.category == this.state.filterByCategory))
                );
            };
        return this.props.allWeaponsArray.filter(op);
    }

    _renderCategoryFilterButton(weaponCategory) {
        return element(TypeFilterButton,
            {
            iconImg: this.constructor._weaponCategoryToIconMap.get(weaponCategory),
            isSelected: (this.state.filterByCategory == weaponCategory),
            onClick: () => {this.handleCategoryFilterButton(weaponCategory)},
            },
            null,
        );
    }

    _renderEndlineFilterBox() {
        return element("div",
            {
            className: "select-view-endline-filter-box",
            },
            element("label",
                null,
                element("input",
                    {
                    type: "checkbox",
                    checked: (this.state.filterByEndlineTag == "hr"),
                    onChange: (e) => {this.handleEndlineTagFilterCheckboxChange(e)},
                    },
                    null,
                ),
                "HR Endline Only",
            ),
        );
    }
    _renderEmptyEndlineFilterBox() {
        return element("div",
            {
            className: "select-view-endline-filter-box",
            },
            null,
        );
    }

    render() {
        check.isStr(this.state.filterByName);
        check.isObj(this.props.allWeaponsArray);
        check.isObj(this.props.currentSelectedWeapon);
        check.isFunction(this.props.handleSelectWeapon);

        const filteredWeaponsArray = this._getFilteredWeaponsArray();

        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-weapon-select-view",
            },
            element(NameFilterTextField,
                {
                placeholderText: "Filter by weapon or tree name",
                onChange: (newText) => {this.handleNameFilterTextChange(newText)},
                },
                null,
            ),
            element("div",
                {
                className: "select-view-type-filter-box",
                },
                this._renderEndlineFilterBox(),
                this._renderCategoryFilterButton("greatsword"    ),
                this._renderCategoryFilterButton("longsword"     ),
                this._renderCategoryFilterButton("swordandshield"),
                this._renderCategoryFilterButton("dualblades"    ),
                this._renderCategoryFilterButton("lance"         ),
                this._renderCategoryFilterButton("gunlance"      ),
                this._renderCategoryFilterButton("hammer"        ),
                this._renderCategoryFilterButton("huntinghorn"   ),
                this._renderCategoryFilterButton("switchaxe"     ),
                this._renderCategoryFilterButton("chargeblade"   ),
                this._renderCategoryFilterButton("insectglaive"  ),
                this._renderCategoryFilterButton("lightbowgun"   ),
                this._renderCategoryFilterButton("heavybowgun"   ),
                this._renderCategoryFilterButton("bow"           ),
                this._renderEmptyEndlineFilterBox(),
            ),
            element(WeaponSelectionTable,
                {
                dataArray: filteredWeaponsArray,
                currentSelectedWeapon: this.props.currentSelectedWeapon,
                handleRowClick: (weaponRO) => {this.handleSelectWeapon(weaponRO)},
                },
                null,
            ),
        );
    }
}

export {WeaponSelectView};

