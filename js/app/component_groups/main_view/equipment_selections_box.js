/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../../check.js";
import {
    isEleStatStr,
    isArmourSlotStr,
    eleStatStrToEmoji,
} from "../../common.js";

const assert = console.assert;
const element = React.createElement;

/*********************************************************************
 * Utility ***********************************************************
 *********************************************************************/

function clipsafeP(...children) {
    return element("p", {className: "clipsafe"}, ...children);
}

/*********************************************************************
 * Components ********************************************************
 *********************************************************************/

function EquipIcon(props) {
    check.isStr(props.iconImg);
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

/*** Buffs and State ***/

function PlaceholderBuffIcon() {
    return element("div",
        {
        className: "equip-buff-icon-box",
        },
        element("img",
            {
            src: "./images/placeholders/buff.png",
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
    check.isStr(props.eqName);
    assert(props.eqName.length > 0);
    check.isInt(props.wepAttack);
    assert(props.wepAttack > 0);
    check.isInt(props.wepAffinity);
    assert((props.wepAffinity >= -100) && (props.wepAffinity <= 100));
    assert(isEleStatStr(props.wepEleStatType));
    check.isInt(props.wepEleStatValue);
    assert(props.wepEleStatValue >= 0);
    check.isInt(props.wepDefenseBonus);
    check.isArr(props.wepRampageSkills);
    assert(props.wepDefenseBonus >= 0);
    // TODO: Sharpness?
    check.isFunction(props.onClick);

    function statBox(text, value) {
        return element("div",
            {className: "equip-weapon-stat-box clipsafe"},
            clipsafeP(text + parseInt(value)),
        );
    }

    const rampageSkillBoxes = [];
    for (let rampageSkillName of props.wepRampageSkills) {
        check.isStr(rampageSkillName);

        rampageSkillBoxes.push(
            element("div",
                {
                className: "equip-weapon-ramp-box clipsafe",
                },
                clipsafeP(rampageSkillName),
            )
        );
    }

    return element("div",
        {
        className: "equip-weapon-info-box",
        },
        element("div",
            {
            className: "equip-name-box clipsafe",
            },
            clipsafeP(element("b", null, props.eqName)),
        ),
        element("div",
            {
            className: "equip-weapon-detail-box stackouter",
            },
            element("div",
                {
                className: "equip-weapon-stats-group-box",
                },
                statBox("\u2694\ufe0f ", props.wepAttack),
                statBox("\ud83d\udca2 ", props.wepAffinity),
                statBox(eleStatStrToEmoji(props.wepEleStatType) + " ", props.wepEleStatValue),
                statBox("\ud83d\udee1\ufe0f ", props.wepDefenseBonus),
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
    check.isStr(props.eqName); // Validate later
    check.isInt(props.wepAttack); // Validate later
    check.isInt(props.wepAffinity); // Validate later
    check.isStr(props.wepEleStatType); // Validate later
    check.isInt(props.wepEleStatValue); // Validate later
    check.isInt(props.wepDefenseBonus); // Validate later
    check.isArr(props.wepRampageSkills); // Validate later
    check.isArr(props.decosArray); // Validate later

    check.isFunction(props.handleClickWeaponSelect);
    check.isFunction(props.handleClickWeaponCustomize);

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
                iconImg: "./images/placeholders/weapon.png",
                onClick: () => {props.handleClickWeaponSelect()},
                },
                null,
            ),
            element(EquipWeaponInfoBox,
                {
                    eqName: props.eqName,
                    wepAttack: props.wepAttack,
                    wepAffinity: props.wepAffinity,
                    wepEleStatType: props.wepEleStatType,
                    wepEleStatValue: props.wepEleStatValue,
                    wepDefenseBonus: props.wepDefenseBonus,
                    wepRampageSkills: props.wepRampageSkills,
                    onClick: (e) => {props.handleClickWeaponCustomize(e)},
                },
                null,
            ),
        ),
        element(EquipDecosWrapBox,
            {
                decosArray: props.decosArray,
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
                clipsafeP(skillName + " +" + parseInt(skillLevel)),
            )
        );
    }

    return element("div",
        {
        className: "equip-info-box",
        },
        element("div",
            {
            className: "equip-name-box clipsafe",
            },
            clipsafeP(element("b", null, props.eqName)),
        ),
        element("div",
            {
            className: "equip-skills-wrap-box",
            },
            ...skillBoxes
        ),
    )
}

function EquipDefensesBoxEmpty() {
    return element("div",
        {
        className: "equip-defenses-wrap-box",
        },
        null,
    );
}
function EquipDefensesBox(props) {
    check.isObj(props.defenses);
    for (let [stat, value] of Object.entries(props.defenses)) {
        check.isInt(value);
    }
    assert(Object.keys(props.defenses).length === 6);

    return element("div",
        {
        className: "equip-defenses-wrap-box",
        },
        element("table",
            {
            className: "equip-defenses-table",
            },
            element("tbody",
                null,
                element("tr",
                    null,
                    element("th", null, "\uD83D\uDEE1\uFE0F"),
                    element("th", null, parseInt(props.defenses.defense)),
                    element("th", null, eleStatStrToEmoji("thunder")),
                    element("th", null, parseInt(props.defenses.thunderRes)),
                ),
                element("tr",
                    null,
                    element("th", null, eleStatStrToEmoji("fire")),
                    element("th", null, parseInt(props.defenses.fireRes)),
                    element("th", null, eleStatStrToEmoji("ice")),
                    element("th", null, parseInt(props.defenses.iceRes)),
                ),
                element("tr",
                    null,
                    element("th", null, eleStatStrToEmoji("water")),
                    element("th", null, parseInt(props.defenses.waterRes)),
                    element("th", null, eleStatStrToEmoji("dragon")),
                    element("th", null, parseInt(props.defenses.dragonRes)),
                ),
            ),
        ),
    );
}

function EquipDecosWrapBox(props) {
    check.isArr(props.decosArray);
    assert(props.decosArray.length <= 3);

    const decoBoxes = [];
    for (let [slotSize, slotText] of props.decosArray) {
        check.isInt(slotSize);
        assert((slotSize > 0) && (slotSize <= 3));
        assert(slotText != "None"); // Should be set to null if no deco in slot
        check.isStrOrNull(slotText);

        const iconImg = "./images/placeholders/" + (()=>{
            if (slotSize == 1) return "deco_slot_1.png";
            if (slotSize == 2) return "deco_slot_2.png";
            if (slotSize == 3) return "deco_slot_3.png";
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
                    clipsafeP(((slotText === null) ? "None" : slotText)),
                ),
                element("div",
                    {
                    className: "highlight-equip-deco-box stackinner",
                    onClick: () => {console.log("clicked on deco!");},
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

class ArmourSelection extends React.Component {

    static _slotNameToIconImgPath = new Map([
            ["head" , "./images/placeholders/head.png" ],
            ["chest", "./images/placeholders/chest.png"],
            ["arms" , "./images/placeholders/arms.png" ],
            ["waist", "./images/placeholders/waist.png"],
            ["legs" , "./images/placeholders/legs.png" ],
        ]);

    handleClickArmourSelect() {
        this.props.handleClickArmourSelect(this.props.slotID);
    }

    render() {
        assert(isArmourSlotStr(this.props.slotID));
        check.isStr(this.props.eqName); // Validate later
        check.isArr(this.props.skillsArray); // Validate later
        check.isArr(this.props.decosArray); // Validate later
        check.isObj(this.props.defenses); // Validate later

        check.isFunction(this.props.handleClickArmourSelect);

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
                        eqName: this.props.eqName,
                        skillsArray: this.props.skillsArray,
                    },
                    null,
                ),
                element(EquipDefensesBox,
                    {
                    defenses: this.props.defenses,
                    },
                    null,
                ),
            ),
            element(EquipDecosWrapBox,
                {
                    decosArray: this.props.decosArray,
                },
                null,
            ),
        );
    }
}

/*** Others ***/

function TalismanSelection(props) {
    check.isStr(props.eqName); // Validate later
    check.isArr(props.skillsArray); // Validate later
    check.isArr(props.decosArray); // Validate later

    check.isFunction(props.handleClickTalismanSelect);

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
                iconImg: "./images/placeholders/talisman.png",
                onClick: () => {props.handleClickTalismanSelect()},
                },
                null,
            ),
            element(EquipArmourInfoBox,
                {
                    eqName: props.eqName,
                    skillsArray: props.skillsArray,
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
                decosArray: props.decosArray,
            },
            null,
        ),
    );
}

function PetalaceSelection(props) {
    check.isStr(props.eqName); // Validate later
    check.isFunction(props.handleClickPetalaceSelect);

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
                iconImg: "./images/placeholders/talisman.png",
                onClick: () => {props.handleClickPetalaceSelect()},
                },
                null,
            ),
            element(EquipArmourInfoBox,
                {
                    eqName: props.eqName,
                    skillsArray: [],
                },
                null,
            ),
            element(EquipDefensesBoxEmpty,
                null,
                null,
            ),
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

    render() {
        check.isFunction(this.props.handleClickBuffsSelect);
        check.isFunction(this.props.handleClickWeaponSelect);
        check.isFunction(this.props.handleClickWeaponCustomize);
        check.isFunction(this.props.handleClickArmourSelect);
        check.isFunction(this.props.handleClickTalismanSelect);
        check.isFunction(this.props.handleClickPetalaceSelect);

        return element("div",
            {
            id: "equipmentselectionsbox",
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
                eqName: "Abominable Great Sword",
                wepAttack: 230,
                wepAffinity: -15,
                wepEleStatType: "ice",
                wepEleStatValue: 20,
                wepDefenseBonus: 0,
                wepRampageSkills: ["Affinity Boost I",
                                   "~~NOTREAL~~",
                                   "~~NOTREAL~~"],
                decosArray: [[2, "Charger Jewel 2"],
                             [1, "~~NOTREAL~~"]],
                handleClickWeaponSelect: () => {this.handleClickWeaponSelect();},
                handleClickWeaponCustomize: () => {this.handleClickWeaponCustomize();},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "head",
                eqName: "Kaiser Crown",
                skillsArray: [["Critical Eye"  , 3],
                              ["Critical Boost", 1]],
                decosArray: [[1, null]],
                defenses: {defense: 74,
                           fireRes: 4,
                           waterRes: -4,
                           thunderRes: 1,
                           iceRes: -1,
                           dragonRes: -3},
                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "chest",
                eqName: "Tobi-Kadachi Mail S",
                skillsArray: [["Mind's Eye"  , 1],
                              ["Critical Eye", 1]],
                decosArray: [[3, "Charger Jewel 2"]],
                defenses: {defense: 58,
                           fireRes: 0,
                           waterRes: -3,
                           thunderRes: 3,
                           iceRes: 0,
                           dragonRes: 0},
                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "arms",
                eqName: "Kaiser Vambraces",
                skillsArray: [["Teostra Blessing" , 1],
                              ["Critical Eye"     , 1],
                              ["Critical Boost"   , 1],
                              ["~~NOTREAL~~", 9]],
                decosArray: [[2, "Tenderizer Jewel 2"]],
                defenses: {defense: 74,
                           fireRes: 4,
                           waterRes: -4,
                           thunderRes: 1,
                           iceRes: -1,
                           dragonRes: -3},
                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "waist",
                eqName: "Anjanath Coil S",
                skillsArray: [["Attack Boost", 2]],
                decosArray: [[2, "Charger Jewel 2"],
                             [1, "Steadfast Jewel 1"],
                             [1, "Steadfast Jewel 1"]],
                defenses: {defense: 60,
                           fireRes: 3,
                           waterRes: -3,
                           thunderRes: -1,
                           iceRes: -1,
                           dragonRes: 0},
                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                },
                null,
            ),
            element(ArmourSelection,
                {
                slotID: "legs",
                eqName: "Ingot Greaves S",
                skillsArray: [["Attack Boost"     , 2],
                              ["Critical Eye"     , 2],
                              ["~~NOTREAL~~", 3]],
                decosArray: [[1, "Steadfast Jewel 1"]],
                defenses: {defense: 40,
                           fireRes: -1,
                           waterRes: -1,
                           thunderRes: 1,
                           iceRes: 0,
                           dragonRes: 0},
                handleClickArmourSelect: (slotID) => {this.handleClickArmourSelect(slotID);},
                },
                null,
            ),
            element(TalismanSelection,
                {
                eqName: "Talisman",
                skillsArray: [["Weakness Exploit", 1]],
                decosArray: [[2, "Tenderizer Jewel 2"]],
                handleClickTalismanSelect: () => {this.handleClickTalismanSelect();},
                },
                null,
            ),
            element(PetalaceSelection,
                {
                eqName: "Demon Petalace III",
                handleClickPetalaceSelect: () => {this.handleClickPetalaceSelect();},
                },
                null,
            ),
        );
    }
}

export default EquipmentSelectionsBox;

