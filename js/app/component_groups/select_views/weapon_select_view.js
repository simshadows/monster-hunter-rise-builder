/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    isWeaponCategoryStr,
    weaponCategoryToName,
    eleStatStrToEmoji,
    toNameFilterString,
} from "../../common.js";
import {
    NameFilterTextField,
    TypeFilterButton,
    SelectionTable,
} from "./common.js";

const element = React.createElement;
const assert = console.assert;

class WeaponSelectionTable extends React.Component {

    static _cspecHeadRowFormat = [
            // [Markup Class, Content]
            ["weapon-selection-table-head-cell-category",    "Category"          ],
            ["weapon-selection-table-head-cell-name",        "Name"              ],
            ["weapon-selection-table-head-cell-numeric",     "Attack"            ],
            ["weapon-selection-table-head-cell-numeric",     "Affinity"          ],
            ["weapon-selection-table-head-cell-numeric",     "Defense"           ],
            ["weapon-selection-table-head-cell-numeric",     "Ele/Stat"          ],
            ["weapon-selection-table-head-cell-deco",        "Slots"             ],
            ["weapon-selection-table-head-cell-specialmech", "Special Mechanics" ],
        ];

    // Logically Static
    _cspecGetRowContent(weaponData) {
        const specialMechStr = (weaponData.maxSharpness === undefined)
                               ? ""
                               : "MaxSharpness: " + weaponData.maxSharpness.toString();
        return [
            weaponCategoryToName(weaponData.category),
            weaponData.name,
            parseInt(weaponData.attack),
            parseInt(weaponData.affinity) + "%",
            parseInt(weaponData.defense),
            parseInt(weaponData.eleStatValue) + " " + eleStatStrToEmoji(weaponData.eleStatType),
            weaponData.decoSlots.toString(),
            specialMechStr,
        ];
    }

    _cspecHighlightConditionFn(weaponData) {
        return weaponData == this.props.currentSelectedWeapon;
    }

    handleRowClick(weaponRO) {
        assert(check.isInt(weaponRO.affinity)); // Spot check for structure
        this.props.handleRowClick(weaponRO);
    }

    render() {
        check.isObj(this.props.dataArray);
        check.isObj(this.props.currentSelectedWeapon);
        check.isFunction(this.props.handleRowClick);

        return element(SelectionTable,
            {
            dataArray:                 this.props.dataArray,
            handleRowClick:            (weaponRO) => {this.handleRowClick(weaponRO);},
            cspecHeadRowFormat:        this.constructor._cspecHeadRowFormat,
            cspecGetRowContent:        (weaponData) => {return this._cspecGetRowContent(weaponData);},
            cspecHighlightConditionFn: (weaponData) => {return this._cspecHighlightConditionFn(weaponData);},
            },
            null,
        );
    }

}

class WeaponSelectView extends React.Component {

    static _weaponCategoryToIconMap = new Map([
            ["greatsword"    , "./images/placeholders/weapon_small_greatsword.webp"    ],
            ["longsword"     , "./images/placeholders/weapon_small_longsword.webp"     ],
            ["swordandshield", "./images/placeholders/weapon_small_swordandshield.webp"],
            ["dualblades"    , "./images/placeholders/weapon_small_dualblades.webp"    ],
            ["switchaxe"     , "./images/placeholders/weapon_small_switchaxe.webp"     ],
            ["chargeblade"   , "./images/placeholders/weapon_small_chargeblade.webp"   ],
            ["hammer"        , "./images/placeholders/weapon_small_hammer.webp"        ],
            ["huntinghorn"   , "./images/placeholders/weapon_small_huntinghorn.webp"   ],
            ["lance"         , "./images/placeholders/weapon_small_lance.webp"         ],
            ["gunlance"      , "./images/placeholders/weapon_small_gunlance.webp"      ],
            ["insectglaive"  , "./images/placeholders/weapon_small_insectglaive.webp"  ],
            ["bow"           , "./images/placeholders/weapon_small_bow.webp"           ],
            ["lightbowgun"   , "./images/placeholders/weapon_small_lightbowgun.webp"   ],
            ["heavybowgun"   , "./images/placeholders/weapon_small_heavybowgun.webp"   ],
        ]);

    constructor(props) {
        super(props);
        this.state = {
                allWeapons: null,
                filterByName: "", // Empty string by default
                filterByCategory: "", // Empty string, or a weapon category string
                filterByEndlineTag: "", // Empty string, or a weapon endline tag string
            };
    }

    populateWithData(allWeapons) {
        // Verify incoming data
        check.isArr(allWeapons);
        check.isInt(allWeapons[0].affinity); // Spot check structure

        // State should be empty of data
        assert(this.state.allWeapons === null);

        // Now, we add the data
        this.setState({allWeapons: allWeapons});
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
        return this.state.allWeapons.filter(op);
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
        if (this.state.allWeapons === null) {
            return "Error: You shouldn't be able to see this screen before the data is loaded.";
        }
        check.isStr(this.state.filterByName);
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

