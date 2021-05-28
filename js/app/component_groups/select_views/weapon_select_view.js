/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    isWeaponCategoryStr,
    toNameFilterString,
} from "../../common.js";
import {
    NameFilterTextField,
    TypeFilterButton,
    SelectionTable,
} from "./common.js";

const element = React.createElement;
const assert = console.assert;

class WeaponSelectView extends React.Component {

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

    _renderCategoryFilterButton(weaponCategory, iconImg) {
        return element(TypeFilterButton,
            {
            iconImg: iconImg,
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
                this._renderEmptyEndlineFilterBox(),
            ),
            element(SelectionTable,
                {
                dataArray: filteredWeaponsArray,
                handleRowClick: (weaponRO) => {this.handleSelectWeapon(weaponRO)},
                },
                null,
            ),
        );
    }
}

export {WeaponSelectView};

