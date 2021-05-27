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
    br,
} from "../common.js";

const element = React.createElement;
const assert = console.assert;

/*** Common Components: Type Filter Button ***/

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
    render() {
        const rows = [];
        for (let i = 0; i < 100; ++i) {
            rows.push(
                element("tr",
                    {
                    className: "selection-table-row",
                    },
                    element("th", {className: "selection-table-cell"}, "placeholder-content"),
                    element("th", {className: "selection-table-cell"}, parseInt(i)),
                    element("th", {className: "selection-table-cell"}, "placeholder-content"),
                    element("th", {className: "selection-table-cell"}, parseInt(i)),
                )
            );
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
                    element("tr",
                        {
                        className: "selection-table-row",
                        },
                        element("th", {className: "selection-table-cell"}, "head 1"),
                        element("th", {className: "selection-table-cell"}, "head 2"),
                        element("th", {className: "selection-table-cell"}, "head 3"),
                        element("th", {className: "selection-table-cell"}, "head 4"),
                    ),
                ),
                element("tbody",
                    null,
                    ...rows
                ),
            ),
        );
    }
}

/*** View Implementations ***/

class WeaponSelectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                fullRawData: props.rawData,
            };
    }

    render() {
        if (this.state.fullRawData === null) {
            return "Error: You shouldn't be able to see this screen before the data is loaded.";
        }

        check.isObj(this.props.rawData);
        check.isMap(this.props.rawData.weapons.greatsword); // Spot check to see if it has the right structure

        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-weapon-select-view",
            },
            element("div",
                {
                className: "select-view-type-filter-box",
                },
                element(TypeFilterButton,
                    {
                    iconImg: "./images/placeholders/weapon_small_greatsword.webp",
                    onClick: () => {console.log("not yet implemented")}, // TODO
                    },
                    null,
                ),
                element(TypeFilterButton,
                    {
                    iconImg: "./images/placeholders/weapon_small_longsword.webp",
                    onClick: () => {console.log("not yet implemented")}, // TODO
                    },
                    null,
                ),
            ),
            element(SelectionTable,
                null,
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

