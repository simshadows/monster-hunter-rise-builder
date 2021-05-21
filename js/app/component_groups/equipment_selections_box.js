/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

import * as check from "../check.js";
import {
    isEleStatStr,
    eleStatStrToEmoji,
} from "../common.js";

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

    return element("div",
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
    )
}

/*** Weapon ***/

function EquipWeaponInfoBox(props) {
    check.isStr(props.eqName);
    assert(props.eqName.length > 0);
    check.isInt(props.wepAttack);
    assert(props.wepAttack > 0);
    check.isInt(props.wepAffinity);
    assert((props.wepAffinity >= -100) && (props.wepAffinity <= 100));
    isEleStatStr(props.wepEleStatType);
    check.isInt(props.wepEleStatValue);
    assert(props.wepEleStatValue >= 0);
    check.isInt(props.wepDefenseBonus);
    check.isArr(props.wepRampageSkills);
    assert(props.wepDefenseBonus >= 0);
    // TODO: Sharpness?

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
            className: "equip-weapon-detail-box",
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

    return element("div",
        {
        className: "equip-box",
        },
        element(EquipIcon,
            {
            iconImg: "./images/placeholders/weapon.png",
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
            },
            null,
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
                className: "equip-deco-box",
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

function ArmourSelection(props) {
    check.isStr(props.slotIconImg);
    check.isStr(props.eqName); // Validate later
    check.isArr(props.skillsArray); // Validate later
    check.isArr(props.decosArray); // Validate later
    check.isObj(props.defenses); // Validate later

    return element("div",
        {
        className: "equip-box",
        },
        element(EquipIcon,
            {
            iconImg: props.slotIconImg,
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
        element(EquipDefensesBox,
            {
            defenses: props.defenses,
            },
            null,
        ),
        element(EquipDecosWrapBox,
            {
                decosArray: props.decosArray,
            },
            null,
        ),
    );
}

/*** Others ***/

function TalismanSelection(props) {
    check.isStr(props.eqName); // Validate later
    check.isArr(props.skillsArray); // Validate later
    check.isArr(props.decosArray); // Validate later

    return element("div",
        {
        className: "equip-box",
        },
        element(EquipIcon,
            {
            iconImg: "./images/placeholders/talisman.png",
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
        element(EquipDecosWrapBox,
            {
                decosArray: props.decosArray,
            },
            null,
        ),
    );
}

function MiscSelection(props) {
    return element("div",
        {
        id: "misc-selections-box",
        className: "equip-box",
        },
        "Misc stuff (like Power Charm and HH buffs) to be implemented here later.",
        element("br", null, null),
        "Or I might move buffs to the top as simple icons.",
        element("br", null, null),
        "Maybe also Petalace, idk.",
    );
}

/*** Box ***/

function EquipmentSelectionsBox() {
    return element("div",
        {
        id: "equipmentselectionsbox",
        className: "sub-box",
        },
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
            },
            null,
        ),
        element(ArmourSelection,
            {
            slotIconImg: "./images/placeholders/head.png",
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
            },
            null,
        ),
        element(ArmourSelection,
            {
            slotIconImg: "./images/placeholders/chest.png",
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
            },
            null,
        ),
        element(ArmourSelection,
            {
            slotIconImg: "./images/placeholders/arms.png",
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
            },
            null,
        ),
        element(ArmourSelection,
            {
            slotIconImg: "./images/placeholders/waist.png",
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
            },
            null,
        ),
        element(ArmourSelection,
            {
            slotIconImg: "./images/placeholders/legs.png",
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
            },
            null,
        ),
        element(TalismanSelection,
            {
            eqName: "Talisman",
            skillsArray: [["Weakness Exploit", 1]],
            decosArray: [[2, "Tenderizer Jewel 2"]],
            },
            null,
        ),
        element(MiscSelection,
            null,
            null,
        ),
    );
}

export default EquipmentSelectionsBox;

