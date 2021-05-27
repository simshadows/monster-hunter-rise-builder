/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../check.js";
import {
    isArmourSlotStr,
    isDecoEquippableSlotStr,
    weaponCategoryToName,
    eleStatStrToEmoji,
    br,
    toNameFilterString,
} from "../common.js";

const element = React.createElement;
const assert = console.assert;

/*** Common Components: Name Filter Text Field ***/

class NameFilterTextField extends React.Component {

    handleChange(e) {
        const newInput = e.target.value;
        check.isStr(newInput);
        this.props.onChange(newInput);
    }

    render() {
        check.isFunction(this.props.onChange);

        return element("div",
            {
            className: "select-view-name-filter-box",
            },
            element("input",
                {
                type: "text",
                className: "select-view-name-filter-field",
                onChange: (e) => {this.handleChange(e);},
                },
                null,
            ),
        );
    }
}

/*** Common Components: Type Filter Button ***/

class TypeFilterButton extends React.Component {

    handleOnClick(e) {
        e.stopPropagation();
        this.props.onClick(e);
    }

    render() {
        check.isNonEmptyStr(this.props.iconImg);
        check.isFunction(this.props.onClick);

        return element("div",
            {
            className: "select-view-type-filter-icon-box stackouter",
            },
            element("img",
                {
                src: this.props.iconImg,
                alt: "icon",
                },
                null,
            ),
            element("div",
                {
                className: "highlight-select-view-type-filter-icon-box stackinner",
                onClick: (e) => {this.handleOnClick(e)},
                },
                null,
            ),
        );
    }
}

/*** Common Components: Selection Table ***/

class SelectionTable extends React.Component {

    /* CURRENTLY UNUSED
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
    */

    handleRowClick(e, weaponData) {
        e.stopPropagation();
        console.log(weaponData.name);
        console.log(weaponData);
    }

    // Logically static
    _renderCell(extraClasses, ...content) {
        check.isStr(extraClasses);

        const classNameAppend = (extraClasses.length > 0) ? (" " + extraClasses) : "";
        return element("th",
            {
            className: "selection-table-body-cell" + classNameAppend,
            },
            ...content
        );
    }

    // Logically static
    _renderRow(weaponData) {
        const specialMechStr = (weaponData.maxSharpness === undefined) ? "" : "Sharpness: " + weaponData.maxSharpness.toString();

        return element("tr",
            {
            className: "selection-table-body-row",
            onClick: (e) => {this.handleRowClick(e, weaponData)},
            },
            this._renderCell(
                "selection-table-body-cell-category",
                weaponCategoryToName(weaponData.category)
            ),
            this._renderCell(
                "selection-table-body-cell-name",
                weaponData.name
            ),
            this._renderCell(
                "selection-table-body-cell-numeric",
                parseInt(weaponData.attack)
            ),
            this._renderCell(
                "selection-table-body-cell-numeric",
                parseInt(weaponData.affinity) + "%"
            ),
            this._renderCell(
                "selection-table-body-cell-numeric",
                parseInt(weaponData.defense)
            ),
            this._renderCell(
                "selection-table-body-cell-numeric",
                parseInt(weaponData.eleStatValue) + " " + eleStatStrToEmoji(weaponData.eleStatType)
            ),
            this._renderCell(
                "selection-table-body-cell-deco",
                weaponData.decoSlots.toString()
            ),
            this._renderCell(
                "selection-table-body-cell-specialmech",
                specialMechStr
            ),
        );
    }

    render() {
        check.isObj(this.props.dataArray);

        const headerRow = element("tr",
                {
                className: "selection-table-head-row",
                },
                element("th", {className: "selection-table-head-cell"}, "Category"),
                element("th", {className: "selection-table-head-cell"}, "Name"),
                element("th", {className: "selection-table-head-cell"}, "\u2694\ufe0f"),
                element("th", {className: "selection-table-head-cell"}, "\ud83d\udca2"),
                element("th", {className: "selection-table-head-cell"}, "\ud83d\udee1\ufe0f"),
                element("th", {className: "selection-table-head-cell"}, "Ele/Stat"),
                element("th", {className: "selection-table-head-cell"}, "Slots"),
                element("th", {className: "selection-table-head-cell"}, "Special Mechanics"),
            );

        const bodyRows = [];
        for (const weaponData of this.props.dataArray) {
            // TODO: Verify data structure?
            bodyRows.push(this._renderRow(weaponData));
        }

        return element("div",
            {
            className: "selection-table-wrap-box",
            },
            element("table",
                {
                className: "selection-table",
                },
                element("thead",
                    {
                    className: "selection-table-head",
                    },
                    headerRow,
                ),
                element("tbody",
                    null,
                    ...bodyRows
                ),
            ),
        );
    }
}

/*** View Implementations ***/

class BuffsSelectView extends React.Component {
    render() {
        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-buffs-select-view",
            },
            "This is the buffs/states select view! It's not implemented yet.",
        );
    }
}

class WeaponSelectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                allWeapons: null,
                filterByName: "",
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

    handleNameFilterTextChange(newText) {
        check.isStr(newText);
        this.setState({filterByName: toNameFilterString(newText)});
    }

    _getFilteredWeaponsArray() {
        const op = (element) => {
                return element.filterHelpers.nameLower.includes(this.state.filterByName);
            };
        return this.state.allWeapons.filter(op);
    }

    _renderCategoryFilterButton(weaponCategory, iconImg) {
        return element(TypeFilterButton,
            {
            iconImg: iconImg,
            onClick: () => {console.log("not yet implemented")}, // TODO
            },
            null,
        );
    }

    render() {
        if (this.state.allWeapons === null) {
            return "Error: You shouldn't be able to see this screen before the data is loaded.";
        }

        check.isStr(this.state.filterByName);

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
                this._renderCategoryFilterButton("greatsword", "./images/placeholders/weapon_small_greatsword.webp"),
                this._renderCategoryFilterButton("longsword", "./images/placeholders/weapon_small_longsword.webp"),
                this._renderCategoryFilterButton("swordandshield", "./images/placeholders/weapon_small_swordandshield.webp"),
                this._renderCategoryFilterButton("dualblades", "./images/placeholders/weapon_small_dualblades.webp"),
                this._renderCategoryFilterButton("lance", "./images/placeholders/weapon_small_lance.webp"),
                this._renderCategoryFilterButton("gunlance", "./images/placeholders/weapon_small_gunlance.webp"),
                this._renderCategoryFilterButton("hammer", "./images/placeholders/weapon_small_hammer.webp"),
                this._renderCategoryFilterButton("huntinghorn", "./images/placeholders/weapon_small_huntinghorn.webp"),
                this._renderCategoryFilterButton("switchaxe", "./images/placeholders/weapon_small_switchaxe.webp"),
                this._renderCategoryFilterButton("chargeblade", "./images/placeholders/weapon_small_chargeblade.webp"),
                this._renderCategoryFilterButton("insectglaive", "./images/placeholders/weapon_small_insectglaive.webp"),
                this._renderCategoryFilterButton("lightbowgun", "./images/placeholders/weapon_small_lightbowgun.webp"),
                this._renderCategoryFilterButton("heavybowgun", "./images/placeholders/weapon_small_heavybowgun.webp"),
                this._renderCategoryFilterButton("bow", "./images/placeholders/weapon_small_bow.webp"),
            ),
            element(SelectionTable,
                {
                dataArray: filteredWeaponsArray,
                },
                null,
            ),
        );
    }
}

class WeaponCustomizeView extends React.Component {
    render() {
        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-weapon-customize-view",
            },
            "This is the weapon customize view! It's not implemented yet.",
        );
    }
}

class ArmourSelectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                querySlotID: "head",
            };
    }

    reinitialize(slotID) {
        assert(isArmourSlotStr(slotID));
        this.setState({querySlotID: slotID});
    }

    render() {
        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-armour-select-view",
            },
            "This is the armour select view! It's not implemented yet.",
            br(),
            "Initialized to search for: " + this.state.querySlotID,
        );
    }
}

class TalismanSelectView extends React.Component {
    render() {
        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-talisman-select-view",
            },
            "This is the talisman select view! It's not implemented yet.",
        );
    }
}

class PetalaceSelectView extends React.Component {
    render() {
        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-petalace-select-view",
            },
            "This is the petalace select view! It's not implemented yet.",
        );
    }
}

class DecorationSelectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                querySlotID: "head",
                queryDecoSlotID: 0,
            };
    }

    reinitialize(slotID, decoSlotID) {
        this.setState({
                querySlotID: slotID,
                queryDecoSlotID: decoSlotID,
            });
    }

    render() {
        assert(isDecoEquippableSlotStr(this.state.querySlotID));
        check.isInt(this.state.queryDecoSlotID);
        assert((this.state.queryDecoSlotID >= 0) && (this.state.queryDecoSlotID < 3));

        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-decorations-select-view",
            },
            "This is the decorations select view! It's not implemented yet.",
            br(),
            "Initialized to search for: " + this.state.querySlotID + ", slot " + parseInt(this.state.queryDecoSlotID),
        );
    }
}

/****/

export {
    BuffsSelectView,
    WeaponSelectView,
    WeaponCustomizeView,
    ArmourSelectView,
    TalismanSelectView,
    PetalaceSelectView,
    DecorationSelectView,
}

