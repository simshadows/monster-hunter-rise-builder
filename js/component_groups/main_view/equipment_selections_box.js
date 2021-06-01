/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {getImgPath} from "../../images.js";
import {
    isEleStatStr,
    isArmourSlotStr,
    isDecoEquippableSlotStr,
    eleStatStrToEmoji,
    clipsafeSpan,
} from "../../common.js";

const assert = console.assert;
const element = React.createElement;

/*********************************************************************
 * Components ********************************************************
 *********************************************************************/

function EquipIcon(props) {
    check.isNonEmptyStr(props.iconImg);
    check.isFunction(props.onClick);

    return element("div",
        {
        className: "stackouter",
        },
        element("div",
            {
            className: "equip-icon-box",
            },
            element("img",
                {
                src: props.iconImg,
                alt: "icon",
                },
                null,
            ),
        ),
        element("div",
            {
            className: "highlight-equip-main-box stackinner",
            onClick: (e) => {props.onClick(e)},
            },
            null,
        ),
    );
}

function EquipInfoBox(props) {
    check.isStr(props.eqName);
    assert(props.eqName.length > 0);

    return element("div",
        {
        className: "equip-info-box",
        },
        element("div",
            {
            className: "equip-name-box clipsafe",
            },
            clipsafeSpan(element("b", null, props.eqName)),
        ),
        React.Children.toArray(props.children),
    )
}

/*** Buffs and State ***/

function PlaceholderBuffIcon() {
    return element("div",
        {
        className: "equip-buff-icon-box",
        },
        element("img",
            {
            src: getImgPath("placeholder_buff"),
            alt: "icon",
            },
            null,
        ),
    );
}

function BuffsSelection(props) {
    check.isFunction(props.handleClickBuffsSelect);

    return element("div",
        {
        className: "equip-box",
        },
        element("div",
            {
            className: "equip-main-box equip-buffs-main-box stackouter",
            },
            element(PlaceholderBuffIcon,
                null,
                null,
            ),
            element(PlaceholderBuffIcon,
                null,
                null,
            ),
            element(PlaceholderBuffIcon,
                null,
                null,
            ),
            element(PlaceholderBuffIcon,
                null,
                null,
            ),
            element("div",
                {
                className: "highlight-equip-main-box stackinner",
                onClick: () => {props.handleClickBuffsSelect()},
                },
                null,
            ),
        ),
    );
}

/*** Weapon ***/

function EquipWeaponInfoBox(props) {
    // Convenience Alias
    const weaponRO = props.weaponRORenderingProps;

    check.isObj(props.weaponRORenderingProps);
    check.isFunction(props.onClick);

    // Check structure of props.weaponRORenderingProps
    check.isStr(weaponRO.name);
    assert(weaponRO.name.length > 0);
    check.isInt(weaponRO.attack);
    assert(weaponRO.attack > 0);
    check.isInt(weaponRO.affinity);
    assert((weaponRO.affinity >= -100) && (weaponRO.affinity <= 100));
    assert(isEleStatStr(weaponRO.eleStatType));
    check.isInt(weaponRO.eleStatValue);
    assert(weaponRO.eleStatValue >= 0);
    check.isInt(weaponRO.defense);
    assert(weaponRO.defense >= 0);
    check.isArr(weaponRO.rampSkillSelectionsArray);
    // TODO: Sharpness?

    function statBox(text, value) {
        return element("div",
            {className: "equip-weapon-stat-box clipsafe"},
            clipsafeSpan(text + value),
        );
    }

    const rampageSkillBoxes = [];
    for (let rampageSkillObj of weaponRO.rampSkillSelectionsArray) {
        check.isObjOrNull(rampageSkillObj);

        if (rampageSkillObj === null) {
            rampageSkillBoxes.push(
                element("div",
                    {
                    className: "equip-weapon-ramp-box equip-weapon-unused-ramp-box clipsafe",
                    },
                    clipsafeSpan("No Ramp Skill"),
                )
            );
        } else {
            rampageSkillBoxes.push(
                element("div",
                    {
                    className: "equip-weapon-ramp-box clipsafe",
                    },
                    clipsafeSpan(rampageSkillObj.name),
                )
            );
        }
    }

    const eleStatTypeStr = (weaponRO.eleStatType == "none") ? "---" : eleStatStrToEmoji(weaponRO.eleStatType) + " ";
    const eleStatValueStr = (weaponRO.eleStatValue == 0) ? "" : (" " + parseInt(weaponRO.eleStatValue));

    return element("div",
        {
        className: "equip-weapon-info-box",
        },
        element("div",
            {
            className: "equip-name-box clipsafe",
            },
            clipsafeSpan(element("b", null, weaponRO.name)),
        ),
        element("div",
            {
            className: "equip-weapon-detail-box stackouter",
            },
            element("div",
                {
                className: "equip-weapon-stats-group-box",
                },
                statBox("\u2694\ufe0f ", parseInt(weaponRO.attack)),
                statBox("\ud83d\udca2 ", parseInt(weaponRO.affinity) + "%"),
                statBox(eleStatTypeStr, eleStatValueStr),
                statBox("\ud83d\udee1\ufe0f ", parseInt(weaponRO.defense)),
            ),
            element("div",
                {
                className: "equip-weapon-ramps-group-box",
                },
                ...rampageSkillBoxes
            ),
            element("div",
                {
                className: "highlight-equip-main-box stackinner",
                onClick: (e) => {props.onClick(e)},
                },
                null,
            ),
        ),
    )
}

function WeaponSelection(props) {
    check.isObj(props.weaponRORenderingProps);
    check.isArr(props.weaponRORenderingProps.rampSkillSelectionsArray); // Spot check for structure

    check.isFunction(props.handleClickWeaponSelect);
    check.isFunction(props.handleClickWeaponCustomize);
    check.isFunction(props.handleClickDecorationSelect);

    return element("div",
        {
        className: "equip-box",
        },
        element("div",
            {
            className: "equip-main-box",
            },
            element(EquipIcon,
                {
                iconImg: getImgPath("placeholder_weapon"),
                onClick: () => {props.handleClickWeaponSelect()},
                },
                null,
            ),
            element(EquipWeaponInfoBox,
                {
                    weaponRORenderingProps: props.weaponRORenderingProps,
                    onClick: (e) => {props.handleClickWeaponCustomize(e)},
                },
                null,
            ),
        ),
        element(EquipDecosWrapBox,
            {
                decosArray: props.weaponRORenderingProps.decosArray,
                handleClickSelect: (...args) => {props.handleClickDecorationSelect(...args);},
            },
            null,
        ),
    );
}

/*** Armour ***/

function EquipArmourInfoBox(props) {
    check.isStr(props.eqName);
    assert(props.eqName.length > 0);
    check.isArr(props.skillsArray);
    assert(props.skillsArray.length <= 4);

    const skillBoxes = [];
    for (let [skillName, skillLevel] of props.skillsArray) {
        check.isStr(skillName);
        check.isInt(skillLevel);

        skillBoxes.push(
            element("div",
                {
                className: "equip-skills-box clipsafe",
                },
                clipsafeSpan(skillName + " +" + parseInt(skillLevel)),
            )
        );
    }

    return element(EquipInfoBox,
        {
        eqName: props.eqName,
        },
        element("div",
            {
            className: "equip-info-content-box equip-skills-wrap-box",
            },
            ...skillBoxes
        ),
    )
}

function EquipDefensesBoxEmpty() {
    return element("div",
        {
        className: "equip-defenses-box",
        },
        null,
    );
}

class EquipDefensesBox extends React.Component {
    _renderCell(imgPath, value) {
        return element("div",
            {
            className: "equip-defenses-cell-box",
            },
            element("div",
                {
                className: "equip-defenses-icon-box-wrap",
                },
                element("div",
                    {
                    className: "equip-defenses-icon-box",
                    },
                    element("img",
                        {
                        src: imgPath,
                        alt: "icon",
                        },
                        null,
                    ),
                ),
            ),
            element("div",
                {
                className: "equip-defenses-content-box",
                },
                value,
            ),
        );
    }

    _renderRow(leftImgPath, leftValue, rightImgPath, rightValue) {
        return element("div",
            {
            className: "equip-defenses-row-box",
            },
            this._renderCell(leftImgPath, leftValue),
            this._renderCell(rightImgPath, rightValue),
        );
    }

    render() {
        check.isObj(this.props.defenses);
        for (let [stat, value] of Object.entries(this.props.defenses)) {
            check.isInt(value);
        }
        assert(Object.keys(this.props.defenses).length === 6);

        return element("div",
            {
            className: "equip-defenses-box",
            },
            this._renderRow(
                getImgPath("defense_icon"),
                parseInt(this.props.defenses.defense),
                getImgPath("eleres_fire_icon"),
                parseInt(this.props.defenses.fireRes),
            ),
            this._renderRow(
                getImgPath("eleres_water_icon"),
                parseInt(this.props.defenses.waterRes),
                getImgPath("eleres_thunder_icon"),
                parseInt(this.props.defenses.thunderRes),
            ),
            this._renderRow(
                getImgPath("eleres_ice_icon"),
                parseInt(this.props.defenses.iceRes),
                getImgPath("eleres_dragon_icon"),
                parseInt(this.props.defenses.dragonRes),
            ),
            //element("table",
            //    {
            //    className: "equip-defenses-table",
            //    },
            //    element("tbody",
            //        null,
            //        element("tr",
            //            null,
            //            element("th", null, "\uD83D\uDEE1\uFE0F"),
            //            element("th", null, parseInt(props.defenses.defense)),
            //            element("th", null, eleStatStrToEmoji("thunder")),
            //            element("th", null, parseInt(props.defenses.thunderRes)),
            //        ),
            //        element("tr",
            //            null,
            //            element("th", null, eleStatStrToEmoji("fire")),
            //            element("th", null, parseInt(props.defenses.fireRes)),
            //            element("th", null, eleStatStrToEmoji("ice")),
            //            element("th", null, parseInt(props.defenses.iceRes)),
            //        ),
            //        element("tr",
            //            null,
            //            element("th", null, eleStatStrToEmoji("water")),
            //            element("th", null, parseInt(props.defenses.waterRes)),
            //            element("th", null, eleStatStrToEmoji("dragon")),
            //            element("th", null, parseInt(props.defenses.dragonRes)),
            //        ),
            //    ),
            //),
        );
    }
}

class EquipDecosWrapBox extends React.Component {

    handleClickSelect(decoSlotID, maxDecoSize) {
        this.props.handleClickSelect(decoSlotID, maxDecoSize);
    }

    render() {
        check.isArr(this.props.decosArray);
        assert(this.props.decosArray.length <= 3);

        check.isFunction(this.props.handleClickSelect);

        const decoBoxes = [];
        for (let [decoSlotID, decoPropsRO] of this.props.decosArray.entries()) {
            check.isInt(decoPropsRO.slotSize);
            assert((decoPropsRO.slotSize > 0) && (decoPropsRO.slotSize <= 3));
            if (decoPropsRO.deco !== null) {
                check.isStr(decoPropsRO.deco.name);
                check.isInt(decoPropsRO.deco.slotSize);
                assert((decoPropsRO.deco.slotSize > 0) && (decoPropsRO.deco.slotSize <= decoPropsRO.slotSize));
            }

            // Needed for closure
            const slotSize = decoPropsRO.slotSize;
            // TODO: It's confusing having two slot sizes: one for the slot, another for the deco size itself. Fix this.

            const iconImg = (()=>{
                if (slotSize == 1) return getImgPath("placeholder_deco_size_1");
                else if (slotSize == 2) return getImgPath("placeholder_deco_size_2");
                else if (slotSize == 3) return getImgPath("placeholder_deco_size_3");
                throw new Error("Unexpected slot size.");
            })();

            decoBoxes.push(
                element("div",
                    {
                    className: "equip-deco-box stackouter",
                    },
                    element("div",
                        {
                        className: "equip-deco-icon-box",
                        },
                        element("img",
                            {
                            src: iconImg,
                            alt: "icon",
                            },
                            null,
                        ),
                    ),
                    element("div",
                        {
                        className: "equip-deco-name-box clipsafe",
                        },
                        clipsafeSpan(((decoPropsRO.deco === null) ? "None" : decoPropsRO.deco.name)),
                    ),
                    element("div",
                        {
                        className: "highlight-equip-deco-box stackinner",
                        onClick: () => {this.props.handleClickSelect(decoSlotID, slotSize);},
                        },
                        null,
                    ),
                )
            );
        }

        return element("div",
            {
            className: "equip-decos-wrap-box",
            },
            ...decoBoxes
        );
    }
}

class ArmourSelection extends React.Component {

    static _slotNameToIconImgPath = new Map([
            ["head" , getImgPath("head_white")],
            ["chest", getImgPath("chest_white")],
            ["arms" , getImgPath("arms_white")],
            ["waist", getImgPath("waist_white")],
            ["legs" , getImgPath("legs_white")],
        ]);

    handleClickArmourSelect() {
        this.props.handleClickArmourSelect(this.props.slotID);
    }

    handleClickDecorationSelect(decoSlotID, maxDecoSize) {
        this.props.handleClickDecorationSelect(decoSlotID, maxDecoSize);
    }

    _renderDefensesBox() {
        // Convenience Alias
        const armourPieceRO = this.props.armourPieceRORenderingProps;

        if (armourPieceRO === null) {
            return element(EquipDefensesBoxEmpty,
                null,
                null,
            );
        } else {
            return element(EquipDefensesBox,
                {
                defenses: {
                        defense:    armourPieceRO.defense,
                        fireRes:    armourPieceRO.fireRes,
                        waterRes:   armourPieceRO.waterRes,
                        thunderRes: armourPieceRO.thunderRes,
                        iceRes:     armourPieceRO.iceRes,
                        dragonRes:  armourPieceRO.dragonRes
                    },
                },
                null,
            );
        }
    }

    render() {
        // Convenience Alias
        const armourPieceRO = this.props.armourPieceRORenderingProps;

        assert(isArmourSlotStr(this.props.slotID));
        if (armourPieceRO !== null) { // Allowed to be null
            check.isObj(armourPieceRO);
            check.isArr(armourPieceRO.decosArray); // Spot check for structure
        }

        check.isFunction(this.props.handleClickArmourSelect);
        check.isFunction(this.props.handleClickDecorationSelect);

        return element("div",
            {
            className: "equip-box",
            },
            element("div",
                {
                className: "equip-main-box",
                },
                element(EquipIcon,
                    {
                    iconImg: this.constructor._slotNameToIconImgPath.get(this.props.slotID),
                    onClick: () => {this.handleClickArmourSelect()},
                    },
                    null,
                ),
                element(EquipArmourInfoBox,
                    {
                        eqName: (armourPieceRO !== null) ? armourPieceRO.name : "None",
                        skillsArray: (armourPieceRO !== null) ? armourPieceRO.skills : [],
                    },
                    null,
                ),
            ),
            this._renderDefensesBox(),
            element(EquipDecosWrapBox,
                {
                    decosArray: (armourPieceRO !== null) ? armourPieceRO.decosArray : [],
                    handleClickSelect: (...args) => {this.handleClickDecorationSelect(...args);},
                },
                null,
            ),
        );
    }
}

/*** Talisman ***/

function TalismanSelection(props) {
    check.isObj(props.talismanRORenderingProps);

    check.isFunction(props.handleClickTalismanSelect);
    check.isFunction(props.handleClickDecorationSelect);

    const talismanRO = props.talismanRORenderingProps;

    return element("div",
        {
        className: "equip-box",
        },
        element("div",
            {
            className: "equip-main-box",
            },
            element(EquipIcon,
                {
                iconImg: getImgPath("placeholder_talisman"),
                onClick: () => {props.handleClickTalismanSelect()},
                },
                null,
            ),
            element(EquipArmourInfoBox,
                {
                    eqName: talismanRO.name,
                    skillsArray: talismanRO.skills,
                },
                null,
            ),
            element(EquipDefensesBoxEmpty,
                null,
                null,
            ),
        ),
        element(EquipDecosWrapBox,
            {
                decosArray: talismanRO.decosArray,
                handleClickSelect: (...args) => {props.handleClickDecorationSelect(...args);},
            },
            null,
        ),
    );
}

/*** Petalace ***/

function PetalaceSelection(props) {
    check.isObj(props.petalaceRORenderingProps);
    if (props.petalaceRORenderingProps.originalPetalaceObj != null) { // Allowed to be null
        check.isStr(props.petalaceRORenderingProps.originalPetalaceObj.name); // Spot check for structure
    }
    check.isFunction(props.handleClickPetalaceSelect);

    const petalaceRO = props.petalaceRORenderingProps.originalPetalaceObj;

    function renderInfo(content) {
        return element("div",
            {
            className: "equip-info-petalace-stat-cell-box",
            },
            content,
        );
    }

    const infoBox = (()=>{
            if (petalaceRO == null) {
                return element(EquipInfoBox,
                    {
                    eqName: "None",
                    },
                    element("div",
                        {
                        className: "equip-info-content-box equip-info-petalace-box",
                        },
                        null,
                    ),
                );
            } else {
                return element(EquipInfoBox,
                    {
                    eqName: petalaceRO.name,
                    },
                    element("div",
                        {
                        className: "equip-info-content-box equip-info-petalace-box",
                        },
                        element("div",
                            {
                            className: "equip-info-petalace-stat-row-box",
                            },
                            renderInfo("Health Up: " + parseInt(petalaceRO.healthUp)),
                            renderInfo("Stamina Up: " + parseInt(petalaceRO.staminaUp)),
                            renderInfo("Attack Up: " + parseInt(petalaceRO.attackUp)),
                            renderInfo("Defense Up: " + parseInt(petalaceRO.defenseUp)),
                        ),
                        element("div",
                            {
                            className: "equip-info-petalace-stat-row-box",
                            },
                            renderInfo("Health Gain: " + parseInt(petalaceRO.healthGain)),
                            renderInfo("Stamina Gain: " + parseInt(petalaceRO.staminaGain)),
                            renderInfo("Attack Gain: " + parseInt(petalaceRO.attackGain)),
                            renderInfo("Defense Gain: " + parseInt(petalaceRO.defenseGain)),
                        ),
                    ),
                );
            }
        })();

    return element("div",
        {
        className: "equip-box",
        },
        element("div",
            {
            className: "equip-main-box",
            },
            element(EquipIcon,
                {
                iconImg: getImgPath("placeholder_petalace"),
                onClick: () => {props.handleClickPetalaceSelect()},
                },
                null,
            ),
            infoBox,
        ),
    );
}

/*** Box ***/

class EquipmentSelectionsBox extends React.Component {

    handleClickBuffsSelect(){
        this.props.handleClickBuffsSelect();
    }
    handleClickWeaponSelect() {
        this.props.handleClickWeaponSelect();
    }
    handleClickWeaponCustomize() {
        this.props.handleClickWeaponCustomize();
    }
    handleClickArmourSelect(slotID) {
        this.props.handleClickArmourSelect(slotID);
    }
    handleClickTalismanSelect() {
        this.props.handleClickTalismanSelect();
    }
    handleClickPetalaceSelect() {
        this.props.handleClickPetalaceSelect();
    }
    handleClickDecorationSelect(slotID, decoSlotID, maxDecoSlotSize) {
        assert(isDecoEquippableSlotStr(slotID));
        check.isInt(decoSlotID);
        assert((decoSlotID >= 0) && (decoSlotID < 3));
        check.isInt(maxDecoSlotSize);

        this.props.handleClickDecorationSelect(slotID, decoSlotID, maxDecoSlotSize);
    }

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
            id: "equipment-selections-box",
            className: "sub-box",
            },
            element(BuffsSelection,
                {
                handleClickBuffsSelect: () => {this.handleClickBuffsSelect();},
                },
                null,
                null,
            ),
            element(WeaponSelection,
                {
                weaponRORenderingProps: this.props.buildRenderingProps.weaponRO,
                handleClickWeaponSelect:     () => {this.handleClickWeaponSelect();},
                handleClickWeaponCustomize:  () => {this.handleClickWeaponCustomize();},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("weapon", decoSlotID, maxDecoSlotSize);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "head",
                armourPieceRORenderingProps:this.props.buildRenderingProps.armourRO.head,

                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("head", decoSlotID, maxDecoSlotSize);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "chest",
                armourPieceRORenderingProps:this.props.buildRenderingProps.armourRO.chest,

                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("chest", decoSlotID, maxDecoSlotSize);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "arms",
                armourPieceRORenderingProps:this.props.buildRenderingProps.armourRO.arms,

                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("arms", decoSlotID, maxDecoSlotSize);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "waist",
                armourPieceRORenderingProps:this.props.buildRenderingProps.armourRO.waist,

                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("waist", decoSlotID, maxDecoSlotSize);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "legs",
                armourPieceRORenderingProps:this.props.buildRenderingProps.armourRO.legs,

                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("legs", decoSlotID, maxDecoSlotSize);},
                },
                null,
            ),
            element(TalismanSelection,
                {
                talismanRORenderingProps:this.props.buildRenderingProps.talismanRO,

                handleClickTalismanSelect: () => {this.handleClickTalismanSelect();},
                handleClickDecorationSelect: (decoSlotID, maxDecoSlotSize) => {this.handleClickDecorationSelect("talisman", decoSlotID, maxDecoSlotSize);},
                },
                null,
            ),
            element(PetalaceSelection,
                {
                petalaceRORenderingProps: this.props.buildRenderingProps.petalaceRO,
                handleClickPetalaceSelect: () => {this.handleClickPetalaceSelect();},
                },
                null,
            ),
        );
    }
}

export default EquipmentSelectionsBox;

