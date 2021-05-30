/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    isArmourSlotStr,
    tierIDToAbbrev,
    equipmentSlotToName,
    eleStatStrToEmoji,
    br,
    toNameFilterString,
} from "../../common.js";
import {
    NameFilterTextField,
    TypeFilterButton,
    SelectionTable,
    //SelectionControlClearButton,
    //SelectionControlButtonsBox,
} from "./common.js";

const element = React.createElement;
const assert = console.assert;

class ArmourSelectionTable extends React.Component {

    static _cspecHeadRowFormat = [
            // [Markup Class, Content]
            ["armour-selection-table-head-cell-category", "Category"                  ],
            ["armour-selection-table-head-cell-name",     "Name"                      ],
            ["armour-selection-table-head-cell-numeric",  "\ud83d\udee1\ufe0f"        ],
            ["armour-selection-table-head-cell-numeric",  eleStatStrToEmoji("fire")   ],
            ["armour-selection-table-head-cell-numeric",  eleStatStrToEmoji("water")  ],
            ["armour-selection-table-head-cell-numeric",  eleStatStrToEmoji("thunder")],
            ["armour-selection-table-head-cell-numeric",  eleStatStrToEmoji("ice")    ],
            ["armour-selection-table-head-cell-numeric",  eleStatStrToEmoji("dragon") ],
            ["armour-selection-table-head-cell-deco",     "Slots"                     ],
            ["armour-selection-table-head-cell-skills",   "Skills"                    ],
        ];

    // Logically Static
    _cspecGetRowContent(armourPieceRO) {
        const skillsStrs = [];
        for (const [skillRO, skillLevel] of armourPieceRO.skills) {
            skillsStrs.push(skillRO.name + " +" + parseInt(skillLevel));
        }

        return [
            tierIDToAbbrev(armourPieceRO.tierID) + " " + equipmentSlotToName(armourPieceRO.slotID),
            armourPieceRO.name,
            parseInt(armourPieceRO.defenseAtLevel1),
            parseInt(armourPieceRO.fireRes),
            parseInt(armourPieceRO.waterRes),
            parseInt(armourPieceRO.thunderRes),
            parseInt(armourPieceRO.iceRes),
            parseInt(armourPieceRO.dragonRes),
            armourPieceRO.decorationSlots.toString(),
            skillsStrs.join(", "),
        ];
    }

    _cspecHighlightConditionFn(armourPieceRO) {
        if (this.props.currentSelectedPieces[armourPieceRO.slotID] === null) {
            return false;
        } else {
            return this.props.currentSelectedPieces[armourPieceRO.slotID] == armourPieceRO;
        }
    }

    handleRowClick(armourPieceRO) {
        check.isInt(armourPieceRO.dragonRes); // Spot check for structure
        this.props.handleRowClick(armourPieceRO);
    }

    render() {
        check.isArr(this.props.dataArray);
        check.isObj(this.props.currentSelectedPieces);
        check.isFunction(this.props.handleRowClick);

        return element(SelectionTable,
            {
            dataArray:                 this.props.dataArray,
            handleRowClick:            (armourPieceRO) => {this.handleRowClick(armourPieceRO);},
            cspecHeadRowFormat:        this.constructor._cspecHeadRowFormat,
            cspecGetRowContent:        (weaponData) => {return this._cspecGetRowContent(weaponData);},
            cspecHighlightConditionFn: (weaponData) => {return this._cspecHighlightConditionFn(weaponData);},
            },
            null,
        );
    }

}

class ArmourSelectView extends React.Component {

    static _armourSlotIDToIconMap = new Map([
            ["head" , "./images/placeholders/head.png" ],
            ["chest", "./images/placeholders/chest.png"],
            ["arms" , "./images/placeholders/arms.png" ],
            ["waist", "./images/placeholders/waist.png"],
            ["legs" , "./images/placeholders/legs.png" ],
        ]);

    constructor(props) {
        super(props);
        this.state = {
                allArmour: null,
                filterByName: "", // Empty string by default
                filterBySlotID: "head", // Empty string, or an armour slot
            };
    }

    populateWithData(allArmour) {
        // Verify incoming data
        check.isObj(allArmour);
        check.isInt(allArmour.waist[0].dragonRes); // Spot check structure

        // State should be empty of data
        assert(this.state.allArmour === null);

        // Now, we add the data
        this.setState({allArmour: allArmour});
    }

    reinitialize(slotID) {
        assert(isArmourSlotStr(slotID));
        this.setState({filterBySlotID: slotID});
    }

    handleSelectArmourPiece(armourPieceRO) {
        this.props.handleSelectArmourPiece(armourPieceRO);
    }

    handleNameFilterTextChange(newText) {
        check.isStr(newText);
        this.setState({filterByName: toNameFilterString(newText)});
    }

    handleArmourSlotFilterButtonClick(armourSlotID) {
        assert(isArmourSlotStr(armourSlotID));
        if (this.state.filterBySlotID != armourSlotID) {
            this.setState({filterBySlotID: armourSlotID});
        } else {
            this.setState({filterBySlotID: ""});
        }
    }

    _getFilteredArmourArray() {
        const filterFn = (element) => {
                return element.filterHelpers.nameLower.includes(this.state.filterByName);
            };

        const arrays = [];
        for (const [armourSlotID, armourPieceData] of Object.entries(this.state.allArmour)) {
            if ((this.state.filterBySlotID == armourSlotID) || (this.state.filterBySlotID == "")) {
                arrays.push(armourPieceData.filter(filterFn));
            }
        }
        return [].concat(...arrays);
    }

    _renderCategoryFilterButton(armourSlotID) {
        return element(TypeFilterButton,
            {
            iconImg: this.constructor._armourSlotIDToIconMap.get(armourSlotID),
            isSelected: (this.state.filterBySlotID == armourSlotID),
            onClick: () => {this.handleArmourSlotFilterButtonClick(armourSlotID)},
            },
            null,
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
        if (this.state.allArmour === null) {
            return "Error: You shouldn't be able to see this screen before the data is loaded.";
        }
        check.isStr(this.state.filterByName);
        check.isObj(this.props.currentSelectedArmour);
        check.isFunction(this.props.handleSelectArmourPiece);

        const filteredArmourArray = this._getFilteredArmourArray();

        return element("div",
            {
            className: "select-view-wrap-box",
            id: "mhr-builder-app-armour-select-view",
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
                //this._renderEndlineFilterBox(),
                this._renderEmptyEndlineFilterBox(),
                this._renderCategoryFilterButton("head"),
                this._renderCategoryFilterButton("chest"),
                this._renderCategoryFilterButton("arms"),
                this._renderCategoryFilterButton("waist"),
                this._renderCategoryFilterButton("legs"),
                this._renderEmptyEndlineFilterBox(),
            ),
            element(ArmourSelectionTable,
                {
                dataArray: filteredArmourArray,
                currentSelectedPieces: this.props.currentSelectedArmour,
                handleRowClick: (armourPieceRO) => {this.handleSelectArmourPiece(armourPieceRO);},
                },
                null,
            ),
        );
    }
}

export {ArmourSelectView};

