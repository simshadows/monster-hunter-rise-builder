/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";

import * as check from "../../check";
import {getImgPath} from "../../images";
import {
    isArmourSlotStr,
    tierIDToAbbrev,
    equipmentSlotToName,
    br,
    toNameFilterString,
} from "../../common";
import {
    NameFilterTextField,
    TypeFilterButton,
    SelectionTable,
    //SelectionControlClearButton,
    //SelectionControlButtonsBox,
} from "./common";

const element = React.createElement;
const assert = console.assert;

function headRowIconElement(iconImgID) {
    return element("div",
        {
        className: "selection-table-icon-box",
        },
        element("img",
            {
            src: getImgPath(iconImgID),
            alt: "icon",
            },
            null,
        ),
    );
}

class ArmourSelectionTable extends React.Component<any, any> {

    static _cspecHeadRowFormat = [
            // [Markup Class, Content]
            ["armour-selection-table-head-cell-category", ""                                       ],
            ["armour-selection-table-head-cell-name",     "Name"                                   ],
            ["armour-selection-table-head-cell-numeric",  headRowIconElement("defense_icon")       ],
            ["armour-selection-table-head-cell-numeric",  headRowIconElement("eleres_fire_icon")   ],
            ["armour-selection-table-head-cell-numeric",  headRowIconElement("eleres_water_icon")  ],
            ["armour-selection-table-head-cell-numeric",  headRowIconElement("eleres_thunder_icon")],
            ["armour-selection-table-head-cell-numeric",  headRowIconElement("eleres_ice_icon")    ],
            ["armour-selection-table-head-cell-numeric",  headRowIconElement("eleres_dragon_icon") ],
            ["armour-selection-table-head-cell-deco",     "Slots"                                  ],
            ["armour-selection-table-head-cell-skills",   "Skills"                                 ],
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
            "",
            "",
        ];

    // Logically Static
    _cspecGetRowContent(armourPieceRO) {
        const skillsStrs = [];
        for (const [skillRO, skillLevel] of armourPieceRO.skills) {
            skillsStrs.push(skillRO.name + " +" + parseInt(skillLevel));
        }

        return [
            this._renderPieceIcon(armourPieceRO.iconImgPath),
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

    render() {
        check.isArr(this.props.dataArray);
        check.isObj(this.props.currentSelectedPieces);
        check.isFunction(this.props.handleRowClick);

        return element(SelectionTable,
            {
            dataArray:                 this.props.dataArray,
            handleRowClick:            (armourPieceRO) => {this.handleRowClick(armourPieceRO);},
            cspecHeadRowFormat:        this.constructor._cspecHeadRowFormat,
            cspecBodyRowFormat:        this.constructor._cspecBodyRowFormat,
            cspecGetRowContent:        (armourPieceRO) => {return this._cspecGetRowContent(armourPieceRO);},
            cspecHighlightConditionFn: (armourPieceRO) => {return this._cspecHighlightConditionFn(armourPieceRO);},
            },
            null,
        );
    }

}

class ArmourSelectView extends React.Component<any, any> {

    static _armourSlotIDToIconMap = new Map([
            ["head" , getImgPath("head_r1") ],
            ["chest", getImgPath("chest_r1")],
            ["arms" , getImgPath("arms_r1") ],
            ["waist", getImgPath("waist_r1")],
            ["legs" , getImgPath("legs_r1") ],
        ]);

    constructor(props) {
        super(props);
        this.state = {
                filterByName: "", // Empty string by default
                filterBySlotID: "head", // Empty string, or an armour slot
                filterByTier: "hr", // Empty string, or a Tier tag
            };
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

    handleTierFilterCheckboxChange(e) {
        if (this.state.filterByTier == "hr") {
            this.setState({filterByTier: ""});
        } else {
            this.setState({filterByTier: "hr"});
        }
    }

    _getFilteredArmourArray() {
        const filterFn = (element) => {
                let matchesASkillName = false;
                for (const [skillRO, skillLevel] of element.skills) {
                    if (skillRO.filterHelpers.nameLower.includes(this.state.filterByName)) {
                        matchesASkillName = true;
                        break;
                    }
                }

                return (
                    (
                        element.filterHelpers.nameLower.includes(this.state.filterByName)
                        || element.filterHelpers.setNameLower.includes(this.state.filterByName)
                        || element.filterHelpers.hintStrLower.includes(this.state.filterByName)
                        || matchesASkillName
                    )
                    && ((this.state.filterByTier == "") || (element.tierID == this.state.filterByTier))
                );
            };

        const arrays = [];
        for (const [armourSlotID, armourPieceData] of Object.entries(this.props.allArmourArrays)) {
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

    _renderTierFilterBox() {
        return element("div",
            {
            className: "select-view-endline-filter-box",
            },
            element("label",
                null,
                element("input",
                    {
                    type: "checkbox",
                    checked: (this.state.filterByTier == "hr"),
                    onChange: (e) => {this.handleTierFilterCheckboxChange(e)},
                    },
                    null,
                ),
                "HR Only",
            ),
        );
    }
    _renderEmptyTierFilterBox() {
        return element("div",
            {
            className: "select-view-endline-filter-box",
            },
            null,
        );
    }

    render() {
        check.isStr(this.state.filterByName);
        check.isObj(this.props.allArmourArrays);
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
                placeholderText: "Filter by piece, set, monster, or skill name",
                onChange: (newText) => {this.handleNameFilterTextChange(newText)},
                },
                null,
            ),
            element("div",
                {
                className: "select-view-type-filter-box",
                },
                this._renderTierFilterBox(),
                this._renderCategoryFilterButton("head"),
                this._renderCategoryFilterButton("chest"),
                this._renderCategoryFilterButton("arms"),
                this._renderCategoryFilterButton("waist"),
                this._renderCategoryFilterButton("legs"),
                this._renderEmptyTierFilterBox(),
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

