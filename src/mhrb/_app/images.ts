/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    FrozenMap,
} from "./generic/frozen-containers";
import {
    type Rarity,
    type EleStatStr,
    type WeaponCategory,
    type ArmourSlot,
} from "./common/types";

import imgFASolidSprites  from "../_images/fontawesome-free-web/sprites/solid.svg";
import imgFABrandsSprites from "../_images/fontawesome-free-web/sprites/brands.svg";

const imgPathMapEntries: [string, string][] = [];

import imgTalismanR1 from "../_images/talisman_r1.svg";
import imgTalismanR7 from "../_images/talisman_r7_inkscapesourcefile.svg";
imgPathMapEntries.push(
    ["talisman_unequipped", imgTalismanR1],
    ["talisman_equipped"  , imgTalismanR7],
);

import imgPetalaceR1 from "../_images/petalace_r1_inkscapesourcefile.svg";
import imgPetalaceR6 from "../_images/petalace_r6.svg";
import imgPetalaceR7 from "../_images/petalace_r7.svg";
imgPathMapEntries.push(
    ["petalace_r1", imgPetalaceR1],
    ["petalace_r6", imgPetalaceR6],
    ["petalace_r7", imgPetalaceR7],
);

import imgDecoSlot1Empty from "../_images/deco_slot1.svg";
import imgDecoSlot2Empty from "../_images/deco_slot2.svg";
import imgDecoSlot3Empty from "../_images/deco_slot3.svg";
import imgDecoSlot4Empty from "../_images/deco_slot4.svg";
imgPathMapEntries.push(
    ["deco_slot1_empty", imgDecoSlot1Empty],
    ["deco_slot2_empty", imgDecoSlot2Empty],
    ["deco_slot3_empty", imgDecoSlot3Empty],
    ["deco_slot4_empty", imgDecoSlot4Empty],
);

import imgAttackIcon   from "../_images/mhw_attack_icon_inkscapesourcefile.svg";
import imgAffinityIcon from "../_images/mhw_affinity_icon_inkscapesourcefile.svg";
import imgDefenseIcon  from "../_images/derived/mhw_screenshot_defense_icon_v3.png";
imgPathMapEntries.push(
    ["attack_icon"  , imgAttackIcon  ],
    ["affinity_icon", imgAffinityIcon],
    ["defense_icon" , imgDefenseIcon],
);

import imgEleresFireIcon    from "../_images/elementalres_fire_icon_inkscapesourcefile.svg";
import imgEleresWaterIcon   from "../_images/elementalres_water_icon_inkscapesourcefile.svg";
import imgEleresThunderIcon from "../_images/elementalres_thunder_icon_inkscapesourcefile.svg";
import imgEleresIceIcon     from "../_images/elementalres_ice_icon_inkscapesourcefile.svg";
import imgEleresDragonIcon  from "../_images/elementalres_dragon_icon_inkscapesourcefile.svg";
imgPathMapEntries.push(
    ["eleres_fire_icon"   , imgEleresFireIcon   ],
    ["eleres_water_icon"  , imgEleresWaterIcon  ],
    ["eleres_thunder_icon", imgEleresThunderIcon],
    ["eleres_ice_icon"    , imgEleresIceIcon    ],
    ["eleres_dragon_icon" , imgEleresDragonIcon ],
);

import imgStatusPoisonIcon    from "../_images/status_poison_icon_inkscapesourcefile.svg";
import imgStatusParalysisIcon from "../_images/status_paralysis_icon_inkscapesourcefile.svg";
import imgStatusSleepIcon     from "../_images/status_sleep_icon_inkscapesourcefile.svg";
import imgStatusBlastIcon     from "../_images/status_blast_icon_inkscapesourcefile.svg";
imgPathMapEntries.push(
    ["status_poison_icon"    , imgStatusPoisonIcon   ],
    ["status_paralysis_icon" , imgStatusParalysisIcon],
    ["status_sleep_icon"     , imgStatusSleepIcon    ],
    ["status_blast_icon"     , imgStatusBlastIcon    ],
);

import imgSkillIconBlue      from "../_images/skill_icon_blue.svg";
import imgSkillIconBrown     from "../_images/skill_icon_brown.svg";
import imgSkillIconDarkBlue  from "../_images/skill_icon_darkblue.svg";
import imgSkillIconGold      from "../_images/skill_icon_gold.svg";
import imgSkillIconGreen     from "../_images/skill_icon_green.svg";
import imgSkillIconGrey      from "../_images/skill_icon_grey.svg";
import imgSkillIconLightBlue from "../_images/skill_icon_lightblue.svg";
import imgSkillIconOrange    from "../_images/skill_icon_orange.svg";
import imgSkillIconPink      from "../_images/skill_icon_pink.svg";
import imgSkillIconPurple    from "../_images/skill_icon_purple.svg";
import imgSkillIconRed       from "../_images/skill_icon_red.svg";
import imgSkillIconWhite     from "../_images/skill_icon_white.svg";
import imgSkillIconYellow    from "../_images/skill_icon_yellow.svg";
imgPathMapEntries.push(
    ["skill_icon_blue"     , imgSkillIconBlue     ],
    ["skill_icon_brown"    , imgSkillIconBrown    ],
    ["skill_icon_darkblue" , imgSkillIconDarkBlue ],
    ["skill_icon_gold"     , imgSkillIconGold     ],
    ["skill_icon_green"    , imgSkillIconGreen    ],
    ["skill_icon_grey"     , imgSkillIconGrey     ],
    ["skill_icon_lightblue", imgSkillIconLightBlue],
    ["skill_icon_orange"   , imgSkillIconOrange   ],
    ["skill_icon_pink"     , imgSkillIconPink     ],
    ["skill_icon_purple"   , imgSkillIconPurple   ],
    ["skill_icon_red"      , imgSkillIconRed      ],
    ["skill_icon_white"    , imgSkillIconWhite    ],
    ["skill_icon_yellow"   , imgSkillIconYellow   ],
);

import imgItemBoxPowercharm from "../_images/itembox_powercharm_inkscapesourcefile.svg";
import imgItemBoxPowertalon from "../_images/itembox_powertalon_inkscapesourcefile.svg";
import imgItemBoxArmorcharm from "../_images/itembox_armorcharm_inkscapesourcefile.svg";
import imgItemBoxArmortalon from "../_images/itembox_armortalon_inkscapesourcefile.svg";
imgPathMapEntries.push(
    ["itembox_powercharm", imgItemBoxPowercharm],
    ["itembox_powertalon", imgItemBoxPowertalon],
    ["itembox_armorcharm", imgItemBoxArmorcharm],
    ["itembox_armortalon", imgItemBoxArmortalon],
);

import imgItemBoxMightSeed       from "../_images/itembox_mightseed.svg";
import imgItemBoxDemonPowder     from "../_images/itembox_powercharm_inkscapesourcefile.svg";
import imgItemBoxDemondrug       from "../_images/itembox_demondrug.svg";
import imgItemBoxMegaDemondrug   from "../_images/itembox_demondrug_with_star_closer.svg";
import imgItemBoxAdamantSeed     from "../_images/itembox_adamantseed_inkscapesourcefile.svg";
import imgItemBoxHardshellPowder from "../_images/itembox_armorcharm_inkscapesourcefile.svg";
import imgItemBoxArmorskin       from "../_images/itembox_armorskin_inkscapesourcefile.svg";
import imgItemBoxMegaArmorskin   from "../_images/itembox_armorskin_with_star_closer_inkscapesourcefile.svg";
imgPathMapEntries.push(
    ["itembox_mightseed"      , imgItemBoxMightSeed      ],
    ["itembox_demonpowder"    , imgItemBoxDemonPowder    ],
    ["itembox_demondrug"      , imgItemBoxDemondrug      ],
    ["itembox_megademondrug"  , imgItemBoxMegaDemondrug  ],
    ["itembox_adamantseed"    , imgItemBoxAdamantSeed    ],
    ["itembox_hardshellpowder", imgItemBoxHardshellPowder],
    ["itembox_armorskin"      , imgItemBoxArmorskin      ],
    ["itembox_megaarmorskin"  , imgItemBoxMegaArmorskin  ],
);

import imgPetalaceAttack from "../_images/petalace_attack_inkscapesourcefile.svg";
import imgDangoBooster   from "../_images/dango_booster_inkscapesourcefile.svg";
imgPathMapEntries.push(
    ["petalace_attack", imgPetalaceAttack],
    ["dango_booster"  , imgDangoBooster  ],
);

import imgPalicoPowerDrum          from "../_images/palico_powerdrum_inkscapesourcefile.svg";
import imgPalicoRousingRoar        from "../_images/palico_rousingroar_inkscapesourcefile.svg";
import imgSongInfernalMelody       from "../_images/song_white.svg";
import imgSongAttackUp             from "../_images/song_red.svg";
import imgSongAffinityUp           from "../_images/song_pink.svg";
import imgSongElementalAttackBoost from "../_images/song_yellow.svg";
import imgSongDefenseUp            from "../_images/song_gold_inkscapesourcefile.svg";
imgPathMapEntries.push(
    ["palico_powerdrum"         , imgPalicoPowerDrum         ],
    ["palico_rousingroar"       , imgPalicoRousingRoar       ],
    ["song_infernalmelody"      , imgSongInfernalMelody      ],
    ["song_attackup"            , imgSongAttackUp            ],
    ["song_affinityup"          , imgSongAffinityUp          ],
    ["song_elementalattackboost", imgSongElementalAttackBoost],
    ["song_defenseup"           , imgSongDefenseUp           ],
);

import imgHuntingHornSongX  from "../_images/huntinghorn_song_x_inkscapesourcefile.svg";
import imgHuntingHornSongA  from "../_images/huntinghorn_song_a_inkscapesourcefile.svg";
import imgHuntingHornSongXA from "../_images/huntinghorn_song_xa_inkscapesourcefile.svg";
imgPathMapEntries.push(
    ["huntinghorn_song_x" , imgHuntingHornSongX ],
    ["huntinghorn_song_a" , imgHuntingHornSongA ],
    ["huntinghorn_song_xa", imgHuntingHornSongXA],
);

import imgSharpnessReduction1 from "../_images/originals/sharpness_reduction_1.svg";
import imgSharpnessReduction2 from "../_images/originals/sharpness_reduction_2.svg";
import imgSharpnessReduction3 from "../_images/originals/sharpness_reduction_3.svg";
import imgSharpnessReduction4 from "../_images/originals/sharpness_reduction_4.svg";
import imgSharpnessReduction5 from "../_images/originals/sharpness_reduction_5.svg";
imgPathMapEntries.push(
    ["sharpness_reduction_1", imgSharpnessReduction1],
    ["sharpness_reduction_2", imgSharpnessReduction2],
    ["sharpness_reduction_3", imgSharpnessReduction3],
    ["sharpness_reduction_4", imgSharpnessReduction4],
    ["sharpness_reduction_5", imgSharpnessReduction5],
);

import imgWeaponGreatSwordR1  from "../_images/derived/weapon_greatsword_r1.png";
import imgWeaponGreatSwordR2  from "../_images/derived/weapon_greatsword_r2.png";
import imgWeaponGreatSwordR3  from "../_images/derived/weapon_greatsword_r3.png";
import imgWeaponGreatSwordR4  from "../_images/derived/weapon_greatsword_r4.png";
import imgWeaponGreatSwordR5  from "../_images/derived/weapon_greatsword_r5.png";
import imgWeaponGreatSwordR6  from "../_images/derived/weapon_greatsword_r6.png";
import imgWeaponGreatSwordR7  from "../_images/derived/weapon_greatsword_r7.png";
import imgWeaponGreatSwordR8  from "../_images/derived/weapon_greatsword_r8.png";
import imgWeaponGreatSwordR9  from "../_images/derived/weapon_greatsword_r9.png";
import imgWeaponGreatSwordR10 from "../_images/derived/weapon_greatsword_r10.png";
imgPathMapEntries.push(
    ["weapon_greatsword_r1" , imgWeaponGreatSwordR1 ],
    ["weapon_greatsword_r2" , imgWeaponGreatSwordR2 ],
    ["weapon_greatsword_r3" , imgWeaponGreatSwordR3 ],
    ["weapon_greatsword_r4" , imgWeaponGreatSwordR4 ],
    ["weapon_greatsword_r5" , imgWeaponGreatSwordR5 ],
    ["weapon_greatsword_r6" , imgWeaponGreatSwordR6 ],
    ["weapon_greatsword_r7" , imgWeaponGreatSwordR7 ],
    ["weapon_greatsword_r8" , imgWeaponGreatSwordR8 ],
    ["weapon_greatsword_r9" , imgWeaponGreatSwordR9 ],
    ["weapon_greatsword_r10", imgWeaponGreatSwordR10],
);

import imgWeaponLongSwordR1  from "../_images/derived/weapon_longsword_r1.png";
import imgWeaponLongSwordR2  from "../_images/derived/weapon_longsword_r2.png";
import imgWeaponLongSwordR3  from "../_images/derived/weapon_longsword_r3.png";
import imgWeaponLongSwordR4  from "../_images/derived/weapon_longsword_r4.png";
import imgWeaponLongSwordR5  from "../_images/derived/weapon_longsword_r5.png";
import imgWeaponLongSwordR6  from "../_images/derived/weapon_longsword_r6.png";
import imgWeaponLongSwordR7  from "../_images/derived/weapon_longsword_r7.png";
import imgWeaponLongSwordR8  from "../_images/derived/weapon_longsword_r8.png";
import imgWeaponLongSwordR9  from "../_images/derived/weapon_longsword_r9.png";
import imgWeaponLongSwordR10 from "../_images/derived/weapon_longsword_r10.png";
imgPathMapEntries.push(
    ["weapon_longsword_r1" , imgWeaponLongSwordR1 ],
    ["weapon_longsword_r2" , imgWeaponLongSwordR2 ],
    ["weapon_longsword_r3" , imgWeaponLongSwordR3 ],
    ["weapon_longsword_r4" , imgWeaponLongSwordR4 ],
    ["weapon_longsword_r5" , imgWeaponLongSwordR5 ],
    ["weapon_longsword_r6" , imgWeaponLongSwordR6 ],
    ["weapon_longsword_r7" , imgWeaponLongSwordR7 ],
    ["weapon_longsword_r8" , imgWeaponLongSwordR8 ],
    ["weapon_longsword_r9" , imgWeaponLongSwordR9 ],
    ["weapon_longsword_r10", imgWeaponLongSwordR10],
);

import imgWeaponSwordAndShieldR1  from "../_images/derived/weapon_swordandshield_r1.png";
import imgWeaponSwordAndShieldR2  from "../_images/derived/weapon_swordandshield_r2.png";
import imgWeaponSwordAndShieldR3  from "../_images/derived/weapon_swordandshield_r3.png";
import imgWeaponSwordAndShieldR4  from "../_images/derived/weapon_swordandshield_r4.png";
import imgWeaponSwordAndShieldR5  from "../_images/derived/weapon_swordandshield_r5.png";
import imgWeaponSwordAndShieldR6  from "../_images/derived/weapon_swordandshield_r6.png";
import imgWeaponSwordAndShieldR7  from "../_images/derived/weapon_swordandshield_r7.png";
import imgWeaponSwordAndShieldR8  from "../_images/derived/weapon_swordandshield_r8.png";
import imgWeaponSwordAndShieldR9  from "../_images/derived/weapon_swordandshield_r9.png";
import imgWeaponSwordAndShieldR10 from "../_images/derived/weapon_swordandshield_r10.png";
imgPathMapEntries.push(
    ["weapon_swordandshield_r1" , imgWeaponSwordAndShieldR1 ],
    ["weapon_swordandshield_r2" , imgWeaponSwordAndShieldR2 ],
    ["weapon_swordandshield_r3" , imgWeaponSwordAndShieldR3 ],
    ["weapon_swordandshield_r4" , imgWeaponSwordAndShieldR4 ],
    ["weapon_swordandshield_r5" , imgWeaponSwordAndShieldR5 ],
    ["weapon_swordandshield_r6" , imgWeaponSwordAndShieldR6 ],
    ["weapon_swordandshield_r7" , imgWeaponSwordAndShieldR7 ],
    ["weapon_swordandshield_r8" , imgWeaponSwordAndShieldR8 ],
    ["weapon_swordandshield_r9" , imgWeaponSwordAndShieldR9 ],
    ["weapon_swordandshield_r10", imgWeaponSwordAndShieldR10],
);

import imgWeaponDualBladesR1  from "../_images/derived/weapon_dualblades_r1.png";
import imgWeaponDualBladesR2  from "../_images/derived/weapon_dualblades_r2.png";
import imgWeaponDualBladesR3  from "../_images/derived/weapon_dualblades_r3.png";
import imgWeaponDualBladesR4  from "../_images/derived/weapon_dualblades_r4.png";
import imgWeaponDualBladesR5  from "../_images/derived/weapon_dualblades_r5.png";
import imgWeaponDualBladesR6  from "../_images/derived/weapon_dualblades_r6.png";
import imgWeaponDualBladesR7  from "../_images/derived/weapon_dualblades_r7.png";
import imgWeaponDualBladesR8  from "../_images/derived/weapon_dualblades_r8.png";
import imgWeaponDualBladesR9  from "../_images/derived/weapon_dualblades_r9.png";
import imgWeaponDualBladesR10 from "../_images/derived/weapon_dualblades_r10.png";
imgPathMapEntries.push(
    ["weapon_dualblades_r1" , imgWeaponDualBladesR1 ],
    ["weapon_dualblades_r2" , imgWeaponDualBladesR2 ],
    ["weapon_dualblades_r3" , imgWeaponDualBladesR3 ],
    ["weapon_dualblades_r4" , imgWeaponDualBladesR4 ],
    ["weapon_dualblades_r5" , imgWeaponDualBladesR5 ],
    ["weapon_dualblades_r6" , imgWeaponDualBladesR6 ],
    ["weapon_dualblades_r7" , imgWeaponDualBladesR7 ],
    ["weapon_dualblades_r8" , imgWeaponDualBladesR8 ],
    ["weapon_dualblades_r9" , imgWeaponDualBladesR9 ],
    ["weapon_dualblades_r10", imgWeaponDualBladesR10],
);

import imgWeaponSwitchAxeR1  from "../_images/derived/weapon_switchaxe_r1.png";
import imgWeaponSwitchAxeR2  from "../_images/derived/weapon_switchaxe_r2.png";
import imgWeaponSwitchAxeR3  from "../_images/derived/weapon_switchaxe_r3.png";
import imgWeaponSwitchAxeR4  from "../_images/derived/weapon_switchaxe_r4.png";
import imgWeaponSwitchAxeR5  from "../_images/derived/weapon_switchaxe_r5.png";
import imgWeaponSwitchAxeR6  from "../_images/derived/weapon_switchaxe_r6.png";
import imgWeaponSwitchAxeR7  from "../_images/derived/weapon_switchaxe_r7.png";
import imgWeaponSwitchAxeR8  from "../_images/derived/weapon_switchaxe_r8.png";
import imgWeaponSwitchAxeR9  from "../_images/derived/weapon_switchaxe_r9.png";
import imgWeaponSwitchAxeR10 from "../_images/derived/weapon_switchaxe_r10.png";
imgPathMapEntries.push(
    ["weapon_switchaxe_r1" , imgWeaponSwitchAxeR1 ],
    ["weapon_switchaxe_r2" , imgWeaponSwitchAxeR2 ],
    ["weapon_switchaxe_r3" , imgWeaponSwitchAxeR3 ],
    ["weapon_switchaxe_r4" , imgWeaponSwitchAxeR4 ],
    ["weapon_switchaxe_r5" , imgWeaponSwitchAxeR5 ],
    ["weapon_switchaxe_r6" , imgWeaponSwitchAxeR6 ],
    ["weapon_switchaxe_r7" , imgWeaponSwitchAxeR7 ],
    ["weapon_switchaxe_r8" , imgWeaponSwitchAxeR8 ],
    ["weapon_switchaxe_r9" , imgWeaponSwitchAxeR9 ],
    ["weapon_switchaxe_r10", imgWeaponSwitchAxeR10],
);

import imgWeaponChargeBladeR1  from "../_images/derived/weapon_chargeblade_r1.png";
import imgWeaponChargeBladeR2  from "../_images/derived/weapon_chargeblade_r2.png";
import imgWeaponChargeBladeR3  from "../_images/derived/weapon_chargeblade_r3.png";
import imgWeaponChargeBladeR4  from "../_images/derived/weapon_chargeblade_r4.png";
import imgWeaponChargeBladeR5  from "../_images/derived/weapon_chargeblade_r5.png";
import imgWeaponChargeBladeR6  from "../_images/derived/weapon_chargeblade_r6.png";
import imgWeaponChargeBladeR7  from "../_images/derived/weapon_chargeblade_r7.png";
import imgWeaponChargeBladeR8  from "../_images/derived/weapon_chargeblade_r8.png";
import imgWeaponChargeBladeR9  from "../_images/derived/weapon_chargeblade_r9.png";
import imgWeaponChargeBladeR10 from "../_images/derived/weapon_chargeblade_r10.png";
imgPathMapEntries.push(
    ["weapon_chargeblade_r1" , imgWeaponChargeBladeR1 ],
    ["weapon_chargeblade_r2" , imgWeaponChargeBladeR2 ],
    ["weapon_chargeblade_r3" , imgWeaponChargeBladeR3 ],
    ["weapon_chargeblade_r4" , imgWeaponChargeBladeR4 ],
    ["weapon_chargeblade_r5" , imgWeaponChargeBladeR5 ],
    ["weapon_chargeblade_r6" , imgWeaponChargeBladeR6 ],
    ["weapon_chargeblade_r7" , imgWeaponChargeBladeR7 ],
    ["weapon_chargeblade_r8" , imgWeaponChargeBladeR8 ],
    ["weapon_chargeblade_r9" , imgWeaponChargeBladeR9 ],
    ["weapon_chargeblade_r10", imgWeaponChargeBladeR10],
);

import imgWeaponHammerR1  from "../_images/derived/weapon_hammer_r1.png";
import imgWeaponHammerR2  from "../_images/derived/weapon_hammer_r2.png";
import imgWeaponHammerR3  from "../_images/derived/weapon_hammer_r3.png";
import imgWeaponHammerR4  from "../_images/derived/weapon_hammer_r4.png";
import imgWeaponHammerR5  from "../_images/derived/weapon_hammer_r5.png";
import imgWeaponHammerR6  from "../_images/derived/weapon_hammer_r6.png";
import imgWeaponHammerR7  from "../_images/derived/weapon_hammer_r7.png";
import imgWeaponHammerR8  from "../_images/derived/weapon_hammer_r8.png";
import imgWeaponHammerR9  from "../_images/derived/weapon_hammer_r9.png";
import imgWeaponHammerR10 from "../_images/derived/weapon_hammer_r10.png";
imgPathMapEntries.push(
    ["weapon_hammer_r1" , imgWeaponHammerR1 ],
    ["weapon_hammer_r2" , imgWeaponHammerR2 ],
    ["weapon_hammer_r3" , imgWeaponHammerR3 ],
    ["weapon_hammer_r4" , imgWeaponHammerR4 ],
    ["weapon_hammer_r5" , imgWeaponHammerR5 ],
    ["weapon_hammer_r6" , imgWeaponHammerR6 ],
    ["weapon_hammer_r7" , imgWeaponHammerR7 ],
    ["weapon_hammer_r8" , imgWeaponHammerR8 ],
    ["weapon_hammer_r9" , imgWeaponHammerR9 ],
    ["weapon_hammer_r10", imgWeaponHammerR10],
);

import imgWeaponHuntingHornR1  from "../_images/derived/weapon_huntinghorn_r1.png";
import imgWeaponHuntingHornR2  from "../_images/derived/weapon_huntinghorn_r2.png";
import imgWeaponHuntingHornR3  from "../_images/derived/weapon_huntinghorn_r3.png";
import imgWeaponHuntingHornR4  from "../_images/derived/weapon_huntinghorn_r4.png";
import imgWeaponHuntingHornR5  from "../_images/derived/weapon_huntinghorn_r5.png";
import imgWeaponHuntingHornR6  from "../_images/derived/weapon_huntinghorn_r6.png";
import imgWeaponHuntingHornR7  from "../_images/derived/weapon_huntinghorn_r7.png";
import imgWeaponHuntingHornR8  from "../_images/derived/weapon_huntinghorn_r8.png";
import imgWeaponHuntingHornR9  from "../_images/derived/weapon_huntinghorn_r9.png";
import imgWeaponHuntingHornR10 from "../_images/derived/weapon_huntinghorn_r10.png";
imgPathMapEntries.push(
    ["weapon_huntinghorn_r1" , imgWeaponHuntingHornR1 ],
    ["weapon_huntinghorn_r2" , imgWeaponHuntingHornR2 ],
    ["weapon_huntinghorn_r3" , imgWeaponHuntingHornR3 ],
    ["weapon_huntinghorn_r4" , imgWeaponHuntingHornR4 ],
    ["weapon_huntinghorn_r5" , imgWeaponHuntingHornR5 ],
    ["weapon_huntinghorn_r6" , imgWeaponHuntingHornR6 ],
    ["weapon_huntinghorn_r7" , imgWeaponHuntingHornR7 ],
    ["weapon_huntinghorn_r8" , imgWeaponHuntingHornR8 ],
    ["weapon_huntinghorn_r9" , imgWeaponHuntingHornR9 ],
    ["weapon_huntinghorn_r10", imgWeaponHuntingHornR10],
);

import imgWeaponLanceR1  from "../_images/derived/weapon_lance_r1.png";
import imgWeaponLanceR2  from "../_images/derived/weapon_lance_r2.png";
import imgWeaponLanceR3  from "../_images/derived/weapon_lance_r3.png";
import imgWeaponLanceR4  from "../_images/derived/weapon_lance_r4.png";
import imgWeaponLanceR5  from "../_images/derived/weapon_lance_r5.png";
import imgWeaponLanceR6  from "../_images/derived/weapon_lance_r6.png";
import imgWeaponLanceR7  from "../_images/derived/weapon_lance_r7.png";
import imgWeaponLanceR8  from "../_images/derived/weapon_lance_r8.png";
import imgWeaponLanceR9  from "../_images/derived/weapon_lance_r9.png";
import imgWeaponLanceR10 from "../_images/derived/weapon_lance_r10.png";
imgPathMapEntries.push(
    ["weapon_lance_r1" , imgWeaponLanceR1 ],
    ["weapon_lance_r2" , imgWeaponLanceR2 ],
    ["weapon_lance_r3" , imgWeaponLanceR3 ],
    ["weapon_lance_r4" , imgWeaponLanceR4 ],
    ["weapon_lance_r5" , imgWeaponLanceR5 ],
    ["weapon_lance_r6" , imgWeaponLanceR6 ],
    ["weapon_lance_r7" , imgWeaponLanceR7 ],
    ["weapon_lance_r8" , imgWeaponLanceR8 ],
    ["weapon_lance_r9" , imgWeaponLanceR9 ],
    ["weapon_lance_r10", imgWeaponLanceR10],
);

import imgWeaponGunlanceR1  from "../_images/derived/weapon_gunlance_r1.png";
import imgWeaponGunlanceR2  from "../_images/derived/weapon_gunlance_r2.png";
import imgWeaponGunlanceR3  from "../_images/derived/weapon_gunlance_r3.png";
import imgWeaponGunlanceR4  from "../_images/derived/weapon_gunlance_r4.png";
import imgWeaponGunlanceR5  from "../_images/derived/weapon_gunlance_r5.png";
import imgWeaponGunlanceR6  from "../_images/derived/weapon_gunlance_r6.png";
import imgWeaponGunlanceR7  from "../_images/derived/weapon_gunlance_r7.png";
import imgWeaponGunlanceR8  from "../_images/derived/weapon_gunlance_r8.png";
import imgWeaponGunlanceR9  from "../_images/derived/weapon_gunlance_r9.png";
import imgWeaponGunlanceR10 from "../_images/derived/weapon_gunlance_r10.png";
imgPathMapEntries.push(
    ["weapon_gunlance_r1" , imgWeaponGunlanceR1 ],
    ["weapon_gunlance_r2" , imgWeaponGunlanceR2 ],
    ["weapon_gunlance_r3" , imgWeaponGunlanceR3 ],
    ["weapon_gunlance_r4" , imgWeaponGunlanceR4 ],
    ["weapon_gunlance_r5" , imgWeaponGunlanceR5 ],
    ["weapon_gunlance_r6" , imgWeaponGunlanceR6 ],
    ["weapon_gunlance_r7" , imgWeaponGunlanceR7 ],
    ["weapon_gunlance_r8" , imgWeaponGunlanceR8 ],
    ["weapon_gunlance_r9" , imgWeaponGunlanceR9 ],
    ["weapon_gunlance_r10", imgWeaponGunlanceR10],
);

import imgWeaponInsectGlaiveR1  from "../_images/derived/weapon_insectglaive_r1.png";
import imgWeaponInsectGlaiveR2  from "../_images/derived/weapon_insectglaive_r2.png";
import imgWeaponInsectGlaiveR3  from "../_images/derived/weapon_insectglaive_r3.png";
import imgWeaponInsectGlaiveR4  from "../_images/derived/weapon_insectglaive_r4.png";
import imgWeaponInsectGlaiveR5  from "../_images/derived/weapon_insectglaive_r5.png";
import imgWeaponInsectGlaiveR6  from "../_images/derived/weapon_insectglaive_r6.png";
import imgWeaponInsectGlaiveR7  from "../_images/derived/weapon_insectglaive_r7.png";
import imgWeaponInsectGlaiveR8  from "../_images/derived/weapon_insectglaive_r8.png";
import imgWeaponInsectGlaiveR9  from "../_images/derived/weapon_insectglaive_r9.png";
import imgWeaponInsectGlaiveR10 from "../_images/derived/weapon_insectglaive_r10.png";
imgPathMapEntries.push(
    ["weapon_insectglaive_r1" , imgWeaponInsectGlaiveR1 ],
    ["weapon_insectglaive_r2" , imgWeaponInsectGlaiveR2 ],
    ["weapon_insectglaive_r3" , imgWeaponInsectGlaiveR3 ],
    ["weapon_insectglaive_r4" , imgWeaponInsectGlaiveR4 ],
    ["weapon_insectglaive_r5" , imgWeaponInsectGlaiveR5 ],
    ["weapon_insectglaive_r6" , imgWeaponInsectGlaiveR6 ],
    ["weapon_insectglaive_r7" , imgWeaponInsectGlaiveR7 ],
    ["weapon_insectglaive_r8" , imgWeaponInsectGlaiveR8 ],
    ["weapon_insectglaive_r9" , imgWeaponInsectGlaiveR9 ],
    ["weapon_insectglaive_r10", imgWeaponInsectGlaiveR10],
);

import imgWeaponBowR1  from "../_images/derived/weapon_bow_r1.png";
import imgWeaponBowR2  from "../_images/derived/weapon_bow_r2.png";
import imgWeaponBowR3  from "../_images/derived/weapon_bow_r3.png";
import imgWeaponBowR4  from "../_images/derived/weapon_bow_r4.png";
import imgWeaponBowR5  from "../_images/derived/weapon_bow_r5.png";
import imgWeaponBowR6  from "../_images/derived/weapon_bow_r6.png";
import imgWeaponBowR7  from "../_images/derived/weapon_bow_r7.png";
import imgWeaponBowR8  from "../_images/derived/weapon_bow_r8.png";
import imgWeaponBowR9  from "../_images/derived/weapon_bow_r9.png";
import imgWeaponBowR10 from "../_images/derived/weapon_bow_r10.png";
imgPathMapEntries.push(
    ["weapon_bow_r1" , imgWeaponBowR1 ],
    ["weapon_bow_r2" , imgWeaponBowR2 ],
    ["weapon_bow_r3" , imgWeaponBowR3 ],
    ["weapon_bow_r4" , imgWeaponBowR4 ],
    ["weapon_bow_r5" , imgWeaponBowR5 ],
    ["weapon_bow_r6" , imgWeaponBowR6 ],
    ["weapon_bow_r7" , imgWeaponBowR7 ],
    ["weapon_bow_r8" , imgWeaponBowR8 ],
    ["weapon_bow_r9" , imgWeaponBowR9 ],
    ["weapon_bow_r10", imgWeaponBowR10],
);

import imgWeaponLightBowgunR1  from "../_images/derived/weapon_lightbowgun_r1.png";
import imgWeaponLightBowgunR2  from "../_images/derived/weapon_lightbowgun_r2.png";
import imgWeaponLightBowgunR3  from "../_images/derived/weapon_lightbowgun_r3.png";
import imgWeaponLightBowgunR4  from "../_images/derived/weapon_lightbowgun_r4.png";
import imgWeaponLightBowgunR5  from "../_images/derived/weapon_lightbowgun_r5.png";
import imgWeaponLightBowgunR6  from "../_images/derived/weapon_lightbowgun_r6.png";
import imgWeaponLightBowgunR7  from "../_images/derived/weapon_lightbowgun_r7.png";
import imgWeaponLightBowgunR8  from "../_images/derived/weapon_lightbowgun_r8.png";
import imgWeaponLightBowgunR9  from "../_images/derived/weapon_lightbowgun_r9.png";
import imgWeaponLightBowgunR10 from "../_images/derived/weapon_lightbowgun_r10.png";
imgPathMapEntries.push(
    ["weapon_lightbowgun_r1" , imgWeaponLightBowgunR1 ],
    ["weapon_lightbowgun_r2" , imgWeaponLightBowgunR2 ],
    ["weapon_lightbowgun_r3" , imgWeaponLightBowgunR3 ],
    ["weapon_lightbowgun_r4" , imgWeaponLightBowgunR4 ],
    ["weapon_lightbowgun_r5" , imgWeaponLightBowgunR5 ],
    ["weapon_lightbowgun_r6" , imgWeaponLightBowgunR6 ],
    ["weapon_lightbowgun_r7" , imgWeaponLightBowgunR7 ],
    ["weapon_lightbowgun_r8" , imgWeaponLightBowgunR8 ],
    ["weapon_lightbowgun_r9" , imgWeaponLightBowgunR9 ],
    ["weapon_lightbowgun_r10", imgWeaponLightBowgunR10],
);

import imgWeaponHeavyBowgunR1  from "../_images/derived/weapon_heavybowgun_r1.png";
import imgWeaponHeavyBowgunR2  from "../_images/derived/weapon_heavybowgun_r2.png";
import imgWeaponHeavyBowgunR3  from "../_images/derived/weapon_heavybowgun_r3.png";
import imgWeaponHeavyBowgunR4  from "../_images/derived/weapon_heavybowgun_r4.png";
import imgWeaponHeavyBowgunR5  from "../_images/derived/weapon_heavybowgun_r5.png";
import imgWeaponHeavyBowgunR6  from "../_images/derived/weapon_heavybowgun_r6.png";
import imgWeaponHeavyBowgunR7  from "../_images/derived/weapon_heavybowgun_r7.png";
import imgWeaponHeavyBowgunR8  from "../_images/derived/weapon_heavybowgun_r8.png";
import imgWeaponHeavyBowgunR9  from "../_images/derived/weapon_heavybowgun_r9.png";
import imgWeaponHeavyBowgunR10 from "../_images/derived/weapon_heavybowgun_r10.png";
imgPathMapEntries.push(
    ["weapon_heavybowgun_r1" , imgWeaponHeavyBowgunR1 ],
    ["weapon_heavybowgun_r2" , imgWeaponHeavyBowgunR2 ],
    ["weapon_heavybowgun_r3" , imgWeaponHeavyBowgunR3 ],
    ["weapon_heavybowgun_r4" , imgWeaponHeavyBowgunR4 ],
    ["weapon_heavybowgun_r5" , imgWeaponHeavyBowgunR5 ],
    ["weapon_heavybowgun_r6" , imgWeaponHeavyBowgunR6 ],
    ["weapon_heavybowgun_r7" , imgWeaponHeavyBowgunR7 ],
    ["weapon_heavybowgun_r8" , imgWeaponHeavyBowgunR8 ],
    ["weapon_heavybowgun_r9" , imgWeaponHeavyBowgunR9 ],
    ["weapon_heavybowgun_r10", imgWeaponHeavyBowgunR10],
);

import imgHeadR1  from "../_images/derived/armour_head_r1.png";
import imgHeadR2  from "../_images/derived/armour_head_r2.png";
import imgHeadR3  from "../_images/derived/armour_head_r3.png";
import imgHeadR4  from "../_images/derived/armour_head_r4.png";
import imgHeadR5  from "../_images/derived/armour_head_r5.png";
import imgHeadR6  from "../_images/derived/armour_head_r6.png";
import imgHeadR7  from "../_images/derived/armour_head_r7.png";
import imgHeadR8  from "../_images/derived/armour_head_r8.png";
import imgHeadR9  from "../_images/derived/armour_head_r9.png";
import imgHeadR10 from "../_images/derived/armour_head_r10.png";
imgPathMapEntries.push(
    ["head_r1" , imgHeadR1 ],
    ["head_r2" , imgHeadR2 ],
    ["head_r3" , imgHeadR3 ],
    ["head_r4" , imgHeadR4 ],
    ["head_r5" , imgHeadR5 ],
    ["head_r6" , imgHeadR6 ],
    ["head_r7" , imgHeadR7 ],
    ["head_r8" , imgHeadR8 ],
    ["head_r9" , imgHeadR9 ],
    ["head_r10", imgHeadR10],
);

import imgChestR1  from "../_images/derived/armour_chest_r1.png";
import imgChestR2  from "../_images/derived/armour_chest_r2.png";
import imgChestR3  from "../_images/derived/armour_chest_r3.png";
import imgChestR4  from "../_images/derived/armour_chest_r4.png";
import imgChestR5  from "../_images/derived/armour_chest_r5.png";
import imgChestR6  from "../_images/derived/armour_chest_r6.png";
import imgChestR7  from "../_images/derived/armour_chest_r7.png";
import imgChestR8  from "../_images/derived/armour_chest_r8.png";
import imgChestR9  from "../_images/derived/armour_chest_r9.png";
import imgChestR10 from "../_images/derived/armour_chest_r10.png";
imgPathMapEntries.push(
    ["chest_r1" , imgChestR1 ],
    ["chest_r2" , imgChestR2 ],
    ["chest_r3" , imgChestR3 ],
    ["chest_r4" , imgChestR4 ],
    ["chest_r5" , imgChestR5 ],
    ["chest_r6" , imgChestR6 ],
    ["chest_r7" , imgChestR7 ],
    ["chest_r8" , imgChestR8 ],
    ["chest_r9" , imgChestR9 ],
    ["chest_r10", imgChestR10],
);

import imgArmsR1  from "../_images/derived/armour_arms_r1.png";
import imgArmsR2  from "../_images/derived/armour_arms_r2.png";
import imgArmsR3  from "../_images/derived/armour_arms_r3.png";
import imgArmsR4  from "../_images/derived/armour_arms_r4.png";
import imgArmsR5  from "../_images/derived/armour_arms_r5.png";
import imgArmsR6  from "../_images/derived/armour_arms_r6.png";
import imgArmsR7  from "../_images/derived/armour_arms_r7.png";
import imgArmsR8  from "../_images/derived/armour_arms_r8.png";
import imgArmsR9  from "../_images/derived/armour_arms_r9.png";
import imgArmsR10 from "../_images/derived/armour_arms_r10.png";
imgPathMapEntries.push(
    ["arms_r1" , imgArmsR1 ],
    ["arms_r2" , imgArmsR2 ],
    ["arms_r3" , imgArmsR3 ],
    ["arms_r4" , imgArmsR4 ],
    ["arms_r5" , imgArmsR5 ],
    ["arms_r6" , imgArmsR6 ],
    ["arms_r7" , imgArmsR7 ],
    ["arms_r8" , imgArmsR8 ],
    ["arms_r9" , imgArmsR9 ],
    ["arms_r10", imgArmsR10],
);

import imgWaistR1  from "../_images/derived/armour_waist_r1.png";
import imgWaistR2  from "../_images/derived/armour_waist_r2.png";
import imgWaistR3  from "../_images/derived/armour_waist_r3.png";
import imgWaistR4  from "../_images/derived/armour_waist_r4.png";
import imgWaistR5  from "../_images/derived/armour_waist_r5.png";
import imgWaistR6  from "../_images/derived/armour_waist_r6.png";
import imgWaistR7  from "../_images/derived/armour_waist_r7.png";
import imgWaistR8  from "../_images/derived/armour_waist_r8.png";
import imgWaistR9  from "../_images/derived/armour_waist_r9.png";
import imgWaistR10 from "../_images/derived/armour_waist_r10.png";
imgPathMapEntries.push(
    ["waist_r1" , imgWaistR1 ],
    ["waist_r2" , imgWaistR2 ],
    ["waist_r3" , imgWaistR3 ],
    ["waist_r4" , imgWaistR4 ],
    ["waist_r5" , imgWaistR5 ],
    ["waist_r6" , imgWaistR6 ],
    ["waist_r7" , imgWaistR7 ],
    ["waist_r8" , imgWaistR8 ],
    ["waist_r9" , imgWaistR9 ],
    ["waist_r10", imgWaistR10],
);

import imgLegsR1  from "../_images/derived/armour_legs_r1.png";
import imgLegsR2  from "../_images/derived/armour_legs_r2.png";
import imgLegsR3  from "../_images/derived/armour_legs_r3.png";
import imgLegsR4  from "../_images/derived/armour_legs_r4.png";
import imgLegsR5  from "../_images/derived/armour_legs_r5.png";
import imgLegsR6  from "../_images/derived/armour_legs_r6.png";
import imgLegsR7  from "../_images/derived/armour_legs_r7.png";
import imgLegsR8  from "../_images/derived/armour_legs_r8.png";
import imgLegsR9  from "../_images/derived/armour_legs_r9.png";
import imgLegsR10 from "../_images/derived/armour_legs_r10.png";
imgPathMapEntries.push(
    ["legs_r1" , imgLegsR1 ],
    ["legs_r2" , imgLegsR2 ],
    ["legs_r3" , imgLegsR3 ],
    ["legs_r4" , imgLegsR4 ],
    ["legs_r5" , imgLegsR5 ],
    ["legs_r6" , imgLegsR6 ],
    ["legs_r7" , imgLegsR7 ],
    ["legs_r8" , imgLegsR8 ],
    ["legs_r9" , imgLegsR9 ],
    ["legs_r10", imgLegsR10],
);

import imgDecoSlot1Size1Blue from "../_images/deco_slot1_size1_blue.svg";
import imgDecoSlot2Size1Blue from "../_images/deco_slot2_size1_blue.svg";
import imgDecoSlot2Size2Blue from "../_images/deco_slot2_size2_blue.svg";
import imgDecoSlot3Size1Blue from "../_images/deco_slot3_size1_blue.svg";
import imgDecoSlot3Size2Blue from "../_images/deco_slot3_size2_blue.svg";
import imgDecoSlot3Size3Blue from "../_images/deco_slot3_size3_blue.svg";
import imgDecoSlot4Size1Blue from "../_images/deco_slot4_size1_blue.svg";
import imgDecoSlot4Size2Blue from "../_images/deco_slot4_size2_blue.svg";
import imgDecoSlot4Size3Blue from "../_images/deco_slot4_size3_blue.svg";
import imgDecoSlot4Size4Blue from "../_images/deco_slot4_size4_blue.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_blue", imgDecoSlot1Size1Blue],
    ["deco_slot2_size1_blue", imgDecoSlot2Size1Blue],
    ["deco_slot2_size2_blue", imgDecoSlot2Size2Blue],
    ["deco_slot3_size1_blue", imgDecoSlot3Size1Blue],
    ["deco_slot3_size2_blue", imgDecoSlot3Size2Blue],
    ["deco_slot3_size3_blue", imgDecoSlot3Size3Blue],
    ["deco_slot4_size1_blue", imgDecoSlot4Size1Blue],
    ["deco_slot4_size2_blue", imgDecoSlot4Size2Blue],
    ["deco_slot4_size3_blue", imgDecoSlot4Size3Blue],
    ["deco_slot4_size4_blue", imgDecoSlot4Size4Blue],
);

import imgDecoSlot1Size1Brown from "../_images/deco_slot1_size1_brown.svg";
import imgDecoSlot2Size1Brown from "../_images/deco_slot2_size1_brown.svg";
import imgDecoSlot2Size2Brown from "../_images/deco_slot2_size2_brown.svg";
import imgDecoSlot3Size1Brown from "../_images/deco_slot3_size1_brown.svg";
import imgDecoSlot3Size2Brown from "../_images/deco_slot3_size2_brown.svg";
import imgDecoSlot3Size3Brown from "../_images/deco_slot3_size3_brown.svg";
import imgDecoSlot4Size1Brown from "../_images/deco_slot4_size1_brown.svg";
import imgDecoSlot4Size2Brown from "../_images/deco_slot4_size2_brown.svg";
import imgDecoSlot4Size3Brown from "../_images/deco_slot4_size3_brown.svg";
import imgDecoSlot4Size4Brown from "../_images/deco_slot4_size4_brown.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_brown", imgDecoSlot1Size1Brown],
    ["deco_slot2_size1_brown", imgDecoSlot2Size1Brown],
    ["deco_slot2_size2_brown", imgDecoSlot2Size2Brown],
    ["deco_slot3_size1_brown", imgDecoSlot3Size1Brown],
    ["deco_slot3_size2_brown", imgDecoSlot3Size2Brown],
    ["deco_slot3_size3_brown", imgDecoSlot3Size3Brown],
    ["deco_slot4_size1_brown", imgDecoSlot4Size1Brown],
    ["deco_slot4_size2_brown", imgDecoSlot4Size2Brown],
    ["deco_slot4_size3_brown", imgDecoSlot4Size3Brown],
    ["deco_slot4_size4_brown", imgDecoSlot4Size4Brown],
);

import imgDecoSlot1Size1DarkBlue from "../_images/deco_slot1_size1_darkblue.svg";
import imgDecoSlot2Size1DarkBlue from "../_images/deco_slot2_size1_darkblue.svg";
import imgDecoSlot2Size2DarkBlue from "../_images/deco_slot2_size2_darkblue.svg";
import imgDecoSlot3Size1DarkBlue from "../_images/deco_slot3_size1_darkblue.svg";
import imgDecoSlot3Size2DarkBlue from "../_images/deco_slot3_size2_darkblue.svg";
import imgDecoSlot3Size3DarkBlue from "../_images/deco_slot3_size3_darkblue.svg";
import imgDecoSlot4Size1DarkBlue from "../_images/deco_slot4_size1_darkblue.svg";
import imgDecoSlot4Size2DarkBlue from "../_images/deco_slot4_size2_darkblue.svg";
import imgDecoSlot4Size3DarkBlue from "../_images/deco_slot4_size3_darkblue.svg";
import imgDecoSlot4Size4DarkBlue from "../_images/deco_slot4_size4_darkblue.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_darkblue", imgDecoSlot1Size1DarkBlue],
    ["deco_slot2_size1_darkblue", imgDecoSlot2Size1DarkBlue],
    ["deco_slot2_size2_darkblue", imgDecoSlot2Size2DarkBlue],
    ["deco_slot3_size1_darkblue", imgDecoSlot3Size1DarkBlue],
    ["deco_slot3_size2_darkblue", imgDecoSlot3Size2DarkBlue],
    ["deco_slot3_size3_darkblue", imgDecoSlot3Size3DarkBlue],
    ["deco_slot4_size1_darkblue", imgDecoSlot4Size1DarkBlue],
    ["deco_slot4_size2_darkblue", imgDecoSlot4Size2DarkBlue],
    ["deco_slot4_size3_darkblue", imgDecoSlot4Size3DarkBlue],
    ["deco_slot4_size4_darkblue", imgDecoSlot4Size4DarkBlue],
);

import imgDecoSlot1Size1Gold from "../_images/deco_slot1_size1_gold.svg";
import imgDecoSlot2Size1Gold from "../_images/deco_slot2_size1_gold.svg";
import imgDecoSlot2Size2Gold from "../_images/deco_slot2_size2_gold.svg";
import imgDecoSlot3Size1Gold from "../_images/deco_slot3_size1_gold.svg";
import imgDecoSlot3Size2Gold from "../_images/deco_slot3_size2_gold.svg";
import imgDecoSlot3Size3Gold from "../_images/deco_slot3_size3_gold.svg";
import imgDecoSlot4Size1Gold from "../_images/deco_slot4_size1_gold.svg";
import imgDecoSlot4Size2Gold from "../_images/deco_slot4_size2_gold.svg";
import imgDecoSlot4Size3Gold from "../_images/deco_slot4_size3_gold.svg";
import imgDecoSlot4Size4Gold from "../_images/deco_slot4_size4_gold.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_gold", imgDecoSlot1Size1Gold],
    ["deco_slot2_size1_gold", imgDecoSlot2Size1Gold],
    ["deco_slot2_size2_gold", imgDecoSlot2Size2Gold],
    ["deco_slot3_size1_gold", imgDecoSlot3Size1Gold],
    ["deco_slot3_size2_gold", imgDecoSlot3Size2Gold],
    ["deco_slot3_size3_gold", imgDecoSlot3Size3Gold],
    ["deco_slot4_size1_gold", imgDecoSlot4Size1Gold],
    ["deco_slot4_size2_gold", imgDecoSlot4Size2Gold],
    ["deco_slot4_size3_gold", imgDecoSlot4Size3Gold],
    ["deco_slot4_size4_gold", imgDecoSlot4Size4Gold],
);

import imgDecoSlot1Size1Green from "../_images/deco_slot1_size1_green.svg";
import imgDecoSlot2Size1Green from "../_images/deco_slot2_size1_green.svg";
import imgDecoSlot2Size2Green from "../_images/deco_slot2_size2_green.svg";
import imgDecoSlot3Size1Green from "../_images/deco_slot3_size1_green.svg";
import imgDecoSlot3Size2Green from "../_images/deco_slot3_size2_green.svg";
import imgDecoSlot3Size3Green from "../_images/deco_slot3_size3_green.svg";
import imgDecoSlot4Size1Green from "../_images/deco_slot4_size1_green.svg";
import imgDecoSlot4Size2Green from "../_images/deco_slot4_size2_green.svg";
import imgDecoSlot4Size3Green from "../_images/deco_slot4_size3_green.svg";
import imgDecoSlot4Size4Green from "../_images/deco_slot4_size4_green.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_green", imgDecoSlot1Size1Green],
    ["deco_slot2_size1_green", imgDecoSlot2Size1Green],
    ["deco_slot2_size2_green", imgDecoSlot2Size2Green],
    ["deco_slot3_size1_green", imgDecoSlot3Size1Green],
    ["deco_slot3_size2_green", imgDecoSlot3Size2Green],
    ["deco_slot3_size3_green", imgDecoSlot3Size3Green],
    ["deco_slot4_size1_green", imgDecoSlot4Size1Green],
    ["deco_slot4_size2_green", imgDecoSlot4Size2Green],
    ["deco_slot4_size3_green", imgDecoSlot4Size3Green],
    ["deco_slot4_size4_green", imgDecoSlot4Size4Green],
);

import imgDecoSlot1Size1Grey from "../_images/deco_slot1_size1_grey.svg";
import imgDecoSlot2Size1Grey from "../_images/deco_slot2_size1_grey.svg";
import imgDecoSlot2Size2Grey from "../_images/deco_slot2_size2_grey.svg";
import imgDecoSlot3Size1Grey from "../_images/deco_slot3_size1_grey.svg";
import imgDecoSlot3Size2Grey from "../_images/deco_slot3_size2_grey.svg";
import imgDecoSlot3Size3Grey from "../_images/deco_slot3_size3_grey.svg";
import imgDecoSlot4Size1Grey from "../_images/deco_slot4_size1_grey.svg";
import imgDecoSlot4Size2Grey from "../_images/deco_slot4_size2_grey.svg";
import imgDecoSlot4Size3Grey from "../_images/deco_slot4_size3_grey.svg";
import imgDecoSlot4Size4Grey from "../_images/deco_slot4_size4_grey.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_grey", imgDecoSlot1Size1Grey],
    ["deco_slot2_size1_grey", imgDecoSlot2Size1Grey],
    ["deco_slot2_size2_grey", imgDecoSlot2Size2Grey],
    ["deco_slot3_size1_grey", imgDecoSlot3Size1Grey],
    ["deco_slot3_size2_grey", imgDecoSlot3Size2Grey],
    ["deco_slot3_size3_grey", imgDecoSlot3Size3Grey],
    ["deco_slot4_size1_grey", imgDecoSlot4Size1Grey],
    ["deco_slot4_size2_grey", imgDecoSlot4Size2Grey],
    ["deco_slot4_size3_grey", imgDecoSlot4Size3Grey],
    ["deco_slot4_size4_grey", imgDecoSlot4Size4Grey],
);

import imgDecoSlot1Size1LightBlue from "../_images/deco_slot1_size1_lightblue.svg";
import imgDecoSlot2Size1LightBlue from "../_images/deco_slot2_size1_lightblue.svg";
import imgDecoSlot2Size2LightBlue from "../_images/deco_slot2_size2_lightblue.svg";
import imgDecoSlot3Size1LightBlue from "../_images/deco_slot3_size1_lightblue.svg";
import imgDecoSlot3Size2LightBlue from "../_images/deco_slot3_size2_lightblue.svg";
import imgDecoSlot3Size3LightBlue from "../_images/deco_slot3_size3_lightblue.svg";
import imgDecoSlot4Size1LightBlue from "../_images/deco_slot4_size1_lightblue.svg";
import imgDecoSlot4Size2LightBlue from "../_images/deco_slot4_size2_lightblue.svg";
import imgDecoSlot4Size3LightBlue from "../_images/deco_slot4_size3_lightblue.svg";
import imgDecoSlot4Size4LightBlue from "../_images/deco_slot4_size4_lightblue.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_lightblue", imgDecoSlot1Size1LightBlue],
    ["deco_slot2_size1_lightblue", imgDecoSlot2Size1LightBlue],
    ["deco_slot2_size2_lightblue", imgDecoSlot2Size2LightBlue],
    ["deco_slot3_size1_lightblue", imgDecoSlot3Size1LightBlue],
    ["deco_slot3_size2_lightblue", imgDecoSlot3Size2LightBlue],
    ["deco_slot3_size3_lightblue", imgDecoSlot3Size3LightBlue],
    ["deco_slot4_size1_lightblue", imgDecoSlot4Size1LightBlue],
    ["deco_slot4_size2_lightblue", imgDecoSlot4Size2LightBlue],
    ["deco_slot4_size3_lightblue", imgDecoSlot4Size3LightBlue],
    ["deco_slot4_size4_lightblue", imgDecoSlot4Size4LightBlue],
);

import imgDecoSlot1Size1Orange from "../_images/deco_slot1_size1_orange.svg";
import imgDecoSlot2Size1Orange from "../_images/deco_slot2_size1_orange.svg";
import imgDecoSlot2Size2Orange from "../_images/deco_slot2_size2_orange.svg";
import imgDecoSlot3Size1Orange from "../_images/deco_slot3_size1_orange.svg";
import imgDecoSlot3Size2Orange from "../_images/deco_slot3_size2_orange.svg";
import imgDecoSlot3Size3Orange from "../_images/deco_slot3_size3_orange.svg";
import imgDecoSlot4Size1Orange from "../_images/deco_slot4_size1_orange.svg";
import imgDecoSlot4Size2Orange from "../_images/deco_slot4_size2_orange.svg";
import imgDecoSlot4Size3Orange from "../_images/deco_slot4_size3_orange.svg";
import imgDecoSlot4Size4Orange from "../_images/deco_slot4_size4_orange.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_orange", imgDecoSlot1Size1Orange],
    ["deco_slot2_size1_orange", imgDecoSlot2Size1Orange],
    ["deco_slot2_size2_orange", imgDecoSlot2Size2Orange],
    ["deco_slot3_size1_orange", imgDecoSlot3Size1Orange],
    ["deco_slot3_size2_orange", imgDecoSlot3Size2Orange],
    ["deco_slot3_size3_orange", imgDecoSlot3Size3Orange],
    ["deco_slot4_size1_orange", imgDecoSlot4Size1Orange],
    ["deco_slot4_size2_orange", imgDecoSlot4Size2Orange],
    ["deco_slot4_size3_orange", imgDecoSlot4Size3Orange],
    ["deco_slot4_size4_orange", imgDecoSlot4Size4Orange],
);

import imgDecoSlot1Size1Pink from "../_images/deco_slot1_size1_pink.svg";
import imgDecoSlot2Size1Pink from "../_images/deco_slot2_size1_pink.svg";
import imgDecoSlot2Size2Pink from "../_images/deco_slot2_size2_pink.svg";
import imgDecoSlot3Size1Pink from "../_images/deco_slot3_size1_pink.svg";
import imgDecoSlot3Size2Pink from "../_images/deco_slot3_size2_pink.svg";
import imgDecoSlot3Size3Pink from "../_images/deco_slot3_size3_pink.svg";
import imgDecoSlot4Size1Pink from "../_images/deco_slot4_size1_pink.svg";
import imgDecoSlot4Size2Pink from "../_images/deco_slot4_size2_pink.svg";
import imgDecoSlot4Size3Pink from "../_images/deco_slot4_size3_pink.svg";
import imgDecoSlot4Size4Pink from "../_images/deco_slot4_size4_pink.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_pink", imgDecoSlot1Size1Pink],
    ["deco_slot2_size1_pink", imgDecoSlot2Size1Pink],
    ["deco_slot2_size2_pink", imgDecoSlot2Size2Pink],
    ["deco_slot3_size1_pink", imgDecoSlot3Size1Pink],
    ["deco_slot3_size2_pink", imgDecoSlot3Size2Pink],
    ["deco_slot3_size3_pink", imgDecoSlot3Size3Pink],
    ["deco_slot4_size1_pink", imgDecoSlot4Size1Pink],
    ["deco_slot4_size2_pink", imgDecoSlot4Size2Pink],
    ["deco_slot4_size3_pink", imgDecoSlot4Size3Pink],
    ["deco_slot4_size4_pink", imgDecoSlot4Size4Pink],
);

import imgDecoSlot1Size1Purple from "../_images/deco_slot1_size1_purple.svg";
import imgDecoSlot2Size1Purple from "../_images/deco_slot2_size1_purple.svg";
import imgDecoSlot2Size2Purple from "../_images/deco_slot2_size2_purple.svg";
import imgDecoSlot3Size1Purple from "../_images/deco_slot3_size1_purple.svg";
import imgDecoSlot3Size2Purple from "../_images/deco_slot3_size2_purple.svg";
import imgDecoSlot3Size3Purple from "../_images/deco_slot3_size3_purple.svg";
import imgDecoSlot4Size1Purple from "../_images/deco_slot4_size1_purple.svg";
import imgDecoSlot4Size2Purple from "../_images/deco_slot4_size2_purple.svg";
import imgDecoSlot4Size3Purple from "../_images/deco_slot4_size3_purple.svg";
import imgDecoSlot4Size4Purple from "../_images/deco_slot4_size4_purple.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_purple", imgDecoSlot1Size1Purple],
    ["deco_slot2_size1_purple", imgDecoSlot2Size1Purple],
    ["deco_slot2_size2_purple", imgDecoSlot2Size2Purple],
    ["deco_slot3_size1_purple", imgDecoSlot3Size1Purple],
    ["deco_slot3_size2_purple", imgDecoSlot3Size2Purple],
    ["deco_slot3_size3_purple", imgDecoSlot3Size3Purple],
    ["deco_slot4_size1_purple", imgDecoSlot4Size1Purple],
    ["deco_slot4_size2_purple", imgDecoSlot4Size2Purple],
    ["deco_slot4_size3_purple", imgDecoSlot4Size3Purple],
    ["deco_slot4_size4_purple", imgDecoSlot4Size4Purple],
);

import imgDecoSlot1Size1Red from "../_images/deco_slot1_size1_red.svg";
import imgDecoSlot2Size1Red from "../_images/deco_slot2_size1_red.svg";
import imgDecoSlot2Size2Red from "../_images/deco_slot2_size2_red.svg";
import imgDecoSlot3Size1Red from "../_images/deco_slot3_size1_red.svg";
import imgDecoSlot3Size2Red from "../_images/deco_slot3_size2_red.svg";
import imgDecoSlot3Size3Red from "../_images/deco_slot3_size3_red.svg";
import imgDecoSlot4Size1Red from "../_images/deco_slot4_size1_red.svg";
import imgDecoSlot4Size2Red from "../_images/deco_slot4_size2_red.svg";
import imgDecoSlot4Size3Red from "../_images/deco_slot4_size3_red.svg";
import imgDecoSlot4Size4Red from "../_images/deco_slot4_size4_red.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_red", imgDecoSlot1Size1Red],
    ["deco_slot2_size1_red", imgDecoSlot2Size1Red],
    ["deco_slot2_size2_red", imgDecoSlot2Size2Red],
    ["deco_slot3_size1_red", imgDecoSlot3Size1Red],
    ["deco_slot3_size2_red", imgDecoSlot3Size2Red],
    ["deco_slot3_size3_red", imgDecoSlot3Size3Red],
    ["deco_slot4_size1_red", imgDecoSlot4Size1Red],
    ["deco_slot4_size2_red", imgDecoSlot4Size2Red],
    ["deco_slot4_size3_red", imgDecoSlot4Size3Red],
    ["deco_slot4_size4_red", imgDecoSlot4Size4Red],
);

import imgDecoSlot1Size1White from "../_images/deco_slot1_size1_white.svg";
import imgDecoSlot2Size1White from "../_images/deco_slot2_size1_white.svg";
import imgDecoSlot2Size2White from "../_images/deco_slot2_size2_white.svg";
import imgDecoSlot3Size1White from "../_images/deco_slot3_size1_white.svg";
import imgDecoSlot3Size2White from "../_images/deco_slot3_size2_white.svg";
import imgDecoSlot3Size3White from "../_images/deco_slot3_size3_white.svg";
import imgDecoSlot4Size1White from "../_images/deco_slot4_size1_white.svg";
import imgDecoSlot4Size2White from "../_images/deco_slot4_size2_white.svg";
import imgDecoSlot4Size3White from "../_images/deco_slot4_size3_white.svg";
import imgDecoSlot4Size4White from "../_images/deco_slot4_size4_white.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_white", imgDecoSlot1Size1White],
    ["deco_slot2_size1_white", imgDecoSlot2Size1White],
    ["deco_slot2_size2_white", imgDecoSlot2Size2White],
    ["deco_slot3_size1_white", imgDecoSlot3Size1White],
    ["deco_slot3_size2_white", imgDecoSlot3Size2White],
    ["deco_slot3_size3_white", imgDecoSlot3Size3White],
    ["deco_slot4_size1_white", imgDecoSlot4Size1White],
    ["deco_slot4_size2_white", imgDecoSlot4Size2White],
    ["deco_slot4_size3_white", imgDecoSlot4Size3White],
    ["deco_slot4_size4_white", imgDecoSlot4Size4White],
);

import imgDecoSlot1Size1Yellow from "../_images/deco_slot1_size1_yellow.svg";
import imgDecoSlot2Size1Yellow from "../_images/deco_slot2_size1_yellow.svg";
import imgDecoSlot2Size2Yellow from "../_images/deco_slot2_size2_yellow.svg";
import imgDecoSlot3Size1Yellow from "../_images/deco_slot3_size1_yellow.svg";
import imgDecoSlot3Size2Yellow from "../_images/deco_slot3_size2_yellow.svg";
import imgDecoSlot3Size3Yellow from "../_images/deco_slot3_size3_yellow.svg";
import imgDecoSlot4Size1Yellow from "../_images/deco_slot4_size1_yellow.svg";
import imgDecoSlot4Size2Yellow from "../_images/deco_slot4_size2_yellow.svg";
import imgDecoSlot4Size3Yellow from "../_images/deco_slot4_size3_yellow.svg";
import imgDecoSlot4Size4Yellow from "../_images/deco_slot4_size4_yellow.svg";
imgPathMapEntries.push(
    ["deco_slot1_size1_yellow", imgDecoSlot1Size1Yellow],
    ["deco_slot2_size1_yellow", imgDecoSlot2Size1Yellow],
    ["deco_slot2_size2_yellow", imgDecoSlot2Size2Yellow],
    ["deco_slot3_size1_yellow", imgDecoSlot3Size1Yellow],
    ["deco_slot3_size2_yellow", imgDecoSlot3Size2Yellow],
    ["deco_slot3_size3_yellow", imgDecoSlot3Size3Yellow],
    ["deco_slot4_size1_yellow", imgDecoSlot4Size1Yellow],
    ["deco_slot4_size2_yellow", imgDecoSlot4Size2Yellow],
    ["deco_slot4_size3_yellow", imgDecoSlot4Size3Yellow],
    ["deco_slot4_size4_yellow", imgDecoSlot4Size4Yellow],
);

const imgPathMap = new FrozenMap<string, string>(new Map(imgPathMapEntries));

/*** General Functions ***/

function getImgPath(id: string): string {
    const ret = imgPathMap.get(id);
    if (ret === undefined) { // TODO: Make this part of the type system? Or make it fail gracefully?
        throw new Error(`Invalid image ID: ${id}`);
    }
    return ret;
}

/*** Usage-specific Functions ***/

const eleStatStrToImgIdMap: {[key in EleStatStr]: string} = {
    fire:    "eleres_fire_icon",
    water:   "eleres_water_icon",
    thunder: "eleres_thunder_icon",
    ice:     "eleres_ice_icon",
    dragon:  "eleres_dragon_icon",

    poison:    "status_poison_icon",
    paralysis: "status_paralysis_icon",
    sleep:     "status_sleep_icon",
    blast:     "status_blast_icon",
}
function eleStatStrToImgId(obj: EleStatStr): string {
    return eleStatStrToImgIdMap[obj];
}

function eleStatStrToImgPath(obj: EleStatStr): string {
    return getImgPath(eleStatStrToImgIdMap[obj]);
}

function armourSlotAndRarityToIconImgPath(armourSlot: ArmourSlot, rarity: Rarity): string {
    return getImgPath(`${armourSlot}_r${rarity}`);
}

function weaponAndRarityToIconImgPath(weaponType: WeaponCategory, rarity: Rarity): string {
    return getImgPath(`weapon_${weaponType}_r${rarity}`);
}

export {
    getImgPath,
    eleStatStrToImgId,
    eleStatStrToImgPath,
    armourSlotAndRarityToIconImgPath,
    weaponAndRarityToIconImgPath,

    imgFASolidSprites,
    imgFABrandsSprites,
};

