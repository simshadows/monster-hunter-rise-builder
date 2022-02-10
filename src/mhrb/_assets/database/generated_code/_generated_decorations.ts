/*
 *      SSSSSSSSSSSSSSS TTTTTTTTTTTTTTTTTTTTTTT     OOOOOOOOO     PPPPPPPPPPPPPPPPP   
 *    SS:::::::::::::::ST:::::::::::::::::::::T   OO:::::::::OO   P::::::::::::::::P  
 *   S:::::SSSSSS::::::ST:::::::::::::::::::::T OO:::::::::::::OO P::::::PPPPPP:::::P 
 *   S:::::S     SSSSSSST:::::TT:::::::TT:::::TO:::::::OOO:::::::OPP:::::P     P:::::P
 *   S:::::S            TTTTTT  T:::::T  TTTTTTO::::::O   O::::::O  P::::P     P:::::P
 *   S:::::S                    T:::::T        O:::::O     O:::::O  P::::P     P:::::P
 *    S::::SSSS                 T:::::T        O:::::O     O:::::O  P::::PPPPPP:::::P 
 *     SS::::::SSSSS            T:::::T        O:::::O     O:::::O  P:::::::::::::PP  
 *       SSS::::::::SS          T:::::T        O:::::O     O:::::O  P::::PPPPPPPPP    
 *          SSSSSS::::S         T:::::T        O:::::O     O:::::O  P::::P            
 *               S:::::S        T:::::T        O:::::O     O:::::O  P::::P            
 *               S:::::S        T:::::T        O::::::O   O::::::O  P::::P            
 *   SSSSSSS     S:::::S      TT:::::::TT      O:::::::OOO:::::::OPP::::::PP          
 *   S::::::SSSSSS:::::S      T:::::::::T       OO:::::::::::::OO P::::::::P          
 *   S:::::::::::::::SS       T:::::::::T         OO:::::::::OO   P::::::::P          
 *    SSSSSSSSSSSSSSS         TTTTTTTTTTT           OOOOOOOOO     PPPPPPPPPP
 *
 *
 * This is a generated source code file.
 *
 * Do NOT edit this file directly!
 *
 * Instead, you must edit the corresponding code generator files located in /dev_scripts at
 * the root of this repository, then run the code generators with the following command:
 *      $ yarn run-code-generators
 *
 * (ASCII art generated using <https://patorjk.com/software/taag/#p=display&h=0&f=Doh&t=STOP>)
 */

/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    __generated_skill__critical_draw,
    __generated_skill__offensive_guard,
    __generated_skill__handicraft,
    __generated_skill__leap_of_faith,
    __generated_skill__paralysis_attack,
    __generated_skill__horn_maestro,
    __generated_skill__punishing_draw,
    __generated_skill__carving_pro,
    __generated_skill__spread_up,
    __generated_skill__jump_master,
    __generated_skill__blight_resistance,
    __generated_skill__weakness_exploit,
    __generated_skill__poison_resistance,
    __generated_skill__flinch_free,
    __generated_skill__sleep_resistance,
    __generated_skill__special_ammo_boost,
    __generated_skill__counterstrike,
    __generated_skill__good_luck,
    __generated_skill__poison_attack,
    __generated_skill__partbreaker,
    __generated_skill__master_mounter,
    __generated_skill__geologist,
    __generated_skill__stamina_thief,
    __generated_skill__recovery_speed,
    __generated_skill__stamina_surge,
    __generated_skill__protective_polish,
    __generated_skill__thunder_resistance,
    __generated_skill__affinity_sliding,
    __generated_skill__evade_extender,
    __generated_skill__ballistics,
    __generated_skill__power_prolonger,
    __generated_skill__recovery_up,
    __generated_skill__wall_runner,
    __generated_skill__blast_resistance,
    __generated_skill__hunger_resistance,
    __generated_skill__artillery,
    __generated_skill__reload_speed,
    __generated_skill__ice_attack,
    __generated_skill__heroics,
    __generated_skill__resentment,
    __generated_skill__diversion,
    __generated_skill__blast_attack,
    __generated_skill__attack_boost,
    __generated_skill__slugger,
    __generated_skill__masters_touch,
    __generated_skill__normal_rapid_up,
    __generated_skill__rapid_fire_up,
    __generated_skill__quick_sheath,
    __generated_skill__wirebug_whisperer,
    __generated_skill__ice_resistance,
    __generated_skill__marathon_runner,
    __generated_skill__mushroomancer,
    __generated_skill__botanist,
    __generated_skill__focus,
    __generated_skill__peak_performance,
    __generated_skill__defense_boost,
    __generated_skill__item_prolonger,
    __generated_skill__wide_range,
    __generated_skill__speed_sharpening,
    __generated_skill__spare_shot,
    __generated_skill__rapid_morph,
    __generated_skill__hellfire_cloak,
    __generated_skill__agitator,
    __generated_skill__earplugs,
    __generated_skill__recoil_down,
    __generated_skill__constitution,
    __generated_skill__dragon_resistance,
    __generated_skill__free_meal,
    __generated_skill__bubbly_dance,
    __generated_skill__latent_power,
    __generated_skill__dragon_attack,
    __generated_skill__razor_sharp,
    __generated_skill__load_shells,
    __generated_skill__critical_eye,
    __generated_skill__guard,
    __generated_skill__steadiness,
    __generated_skill__sleep_attack,
    __generated_skill__fire_attack,
    __generated_skill__windproof,
    __generated_skill__critical_element,
    __generated_skill__water_resistance,
    __generated_skill__guard_up,
    __generated_skill__fortify,
    __generated_skill__paralysis_resistance,
    __generated_skill__divine_blessing,
    __generated_skill__water_attack,
    __generated_skill__minds_eye,
    __generated_skill__ammo_up,
    __generated_skill__bludgeoner,
    __generated_skill__maximum_might,
    __generated_skill__resuscitate,
    __generated_skill__fire_resistance,
    __generated_skill__stun_resistance,
    __generated_skill__evade_window,
    __generated_skill__thunder_attack,
    __generated_skill__muck_resistance,
    __generated_skill__tremor_resistance,
    __generated_skill__critical_boost,
    __generated_skill__speed_eating,
    __generated_skill__bombardier,
    __generated_skill__pierce_up,
} from "./_generated_skills";

import {type DecorationRO} from "../../common/types";

export const decosArray: Readonly<DecorationRO[]> = [
    {
        id: 1,
        name: "Mastery Jewel 2",

        slotSize: 2,
        rarity: 7,
        skills: [
            [__generated_skill__masters_touch, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "masteryjewel2",
        }
    },
    {
        id: 2,
        name: "Handicraft Jewel 3",

        slotSize: 3,
        rarity: 7,
        skills: [
            [__generated_skill__handicraft, 1],
        ],

        icon: "darkblue",
        filterHelpers: {
            nameLower: "handicraftjewel3",
        }
    },
    {
        id: 3,
        name: "Fate Jewel 3",

        slotSize: 3,
        rarity: 7,
        skills: [
            [__generated_skill__good_luck, 1],
        ],

        icon: "yellow",
        filterHelpers: {
            nameLower: "fatejewel3",
        }
    },
    {
        id: 4,
        name: "Hellfire Jewel 3",

        slotSize: 3,
        rarity: 6,
        skills: [
            [__generated_skill__hellfire_cloak, 1],
        ],

        icon: "purple",
        filterHelpers: {
            nameLower: "hellfirejewel3",
        }
    },
    {
        id: 5,
        name: "Leap Jewel 3",

        slotSize: 3,
        rarity: 7,
        skills: [
            [__generated_skill__jump_master, 1],
        ],

        icon: "blue",
        filterHelpers: {
            nameLower: "leapjewel3",
        }
    },
    {
        id: 6,
        name: "Salvo Jewel 3",

        slotSize: 3,
        rarity: 7,
        skills: [
            [__generated_skill__rapid_fire_up, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "salvojewel3",
        }
    },
    {
        id: 7,
        name: "Thrift Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__spare_shot, 1],
        ],

        icon: "yellow",
        filterHelpers: {
            nameLower: "thriftjewel2",
        }
    },
    {
        id: 8,
        name: "Razor Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__razor_sharp, 1],
        ],

        icon: "yellow",
        filterHelpers: {
            nameLower: "razorjewel2",
        }
    },
    {
        id: 9,
        name: "Spread Jewel 3",

        slotSize: 3,
        rarity: 7,
        skills: [
            [__generated_skill__spread_up, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "spreadjewel3",
        }
    },
    {
        id: 10,
        name: "Pierce Jewel 3",

        slotSize: 3,
        rarity: 7,
        skills: [
            [__generated_skill__pierce_up, 1],
        ],

        icon: "blue",
        filterHelpers: {
            nameLower: "piercejewel3",
        }
    },
    {
        id: 11,
        name: "Forceshot Jewel 3",

        slotSize: 3,
        rarity: 6,
        skills: [
            [__generated_skill__normal_rapid_up, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "forceshotjewel3",
        }
    },
    {
        id: 12,
        name: "Sharp Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__protective_polish, 1],
        ],

        icon: "yellow",
        filterHelpers: {
            nameLower: "sharpjewel2",
        }
    },
    {
        id: 13,
        name: "Blast Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__blast_attack, 1],
        ],

        icon: "orange",
        filterHelpers: {
            nameLower: "blastjewel2",
        }
    },
    {
        id: 14,
        name: "Sleep Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__sleep_attack, 1],
        ],

        icon: "lightblue",
        filterHelpers: {
            nameLower: "sleepjewel2",
        }
    },
    {
        id: 15,
        name: "Paralyzer Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__paralysis_attack, 1],
        ],

        icon: "gold",
        filterHelpers: {
            nameLower: "paralyzerjewel2",
        }
    },
    {
        id: 16,
        name: "Throttle Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__latent_power, 1],
        ],

        icon: "pink",
        filterHelpers: {
            nameLower: "throttlejewel2",
        }
    },
    {
        id: 17,
        name: "Crisis Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__resuscitate, 1],
        ],

        icon: "orange",
        filterHelpers: {
            nameLower: "crisisjewel2",
        }
    },
    {
        id: 18,
        name: "Furor Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__resentment, 1],
        ],

        icon: "orange",
        filterHelpers: {
            nameLower: "furorjewel2",
        }
    },
    {
        id: 19,
        name: "Flawless Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__peak_performance, 1],
        ],

        icon: "red",
        filterHelpers: {
            nameLower: "flawlessjewel2",
        }
    },
    {
        id: 20,
        name: "Challenger Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__agitator, 1],
        ],

        icon: "red",
        filterHelpers: {
            nameLower: "challengerjewel2",
        }
    },
    {
        id: 21,
        name: "Tenderizer Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__weakness_exploit, 1],
        ],

        icon: "pink",
        filterHelpers: {
            nameLower: "tenderizerjewel2",
        }
    },
    {
        id: 22,
        name: "Critical Jewel 2",

        slotSize: 2,
        rarity: 7,
        skills: [
            [__generated_skill__critical_boost, 1],
        ],

        icon: "pink",
        filterHelpers: {
            nameLower: "criticaljewel2",
        }
    },
    {
        id: 23,
        name: "Capacity Jewel 3",

        slotSize: 3,
        rarity: 7,
        skills: [
            [__generated_skill__ammo_up, 1],
        ],

        icon: "green",
        filterHelpers: {
            nameLower: "capacityjewel3",
        }
    },
    {
        id: 24,
        name: "Guardian Jewel 3",

        slotSize: 3,
        rarity: 7,
        skills: [
            [__generated_skill__offensive_guard, 1],
        ],

        icon: "purple",
        filterHelpers: {
            nameLower: "guardianjewel3",
        }
    },
    {
        id: 25,
        name: "Fungiform Jewel 3",

        slotSize: 3,
        rarity: 7,
        skills: [
            [__generated_skill__mushroomancer, 1],
        ],

        icon: "purple",
        filterHelpers: {
            nameLower: "fungiformjewel3",
        }
    },
    {
        id: 26,
        name: "Draw Jewel 3",

        slotSize: 3,
        rarity: 7,
        skills: [
            [__generated_skill__critical_draw, 1],
        ],

        icon: "pink",
        filterHelpers: {
            nameLower: "drawjewel3",
        }
    },
    {
        id: 27,
        name: "Precise Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__ballistics, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "precisejewel2",
        }
    },
    {
        id: 28,
        name: "Crit Element Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__critical_element, 1],
        ],

        icon: "darkblue",
        filterHelpers: {
            nameLower: "critelementjewel2",
        }
    },
    {
        id: 29,
        name: "Artillery Jewel 2",

        slotSize: 2,
        rarity: 7,
        skills: [
            [__generated_skill__artillery, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "artilleryjewel2",
        }
    },
    {
        id: 30,
        name: "Sprinter Jewel 2",

        slotSize: 2,
        rarity: 7,
        skills: [
            [__generated_skill__marathon_runner, 1],
        ],

        icon: "gold",
        filterHelpers: {
            nameLower: "sprinterjewel2",
        }
    },
    {
        id: 31,
        name: "Charger Jewel 2",

        slotSize: 2,
        rarity: 7,
        skills: [
            [__generated_skill__focus, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "chargerjewel2",
        }
    },
    {
        id: 32,
        name: "Mind's Eye Jewel 2",

        slotSize: 2,
        rarity: 7,
        skills: [
            [__generated_skill__minds_eye, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "mind'seyejewel2",
        }
    },
    {
        id: 33,
        name: "Potential Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__heroics, 1],
        ],

        icon: "red",
        filterHelpers: {
            nameLower: "potentialjewel2",
        }
    },
    {
        id: 34,
        name: "Trueshot Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__special_ammo_boost, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "trueshotjewel2",
        }
    },
    {
        id: 35,
        name: "Magazine Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__load_shells, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "magazinejewel2",
        }
    },
    {
        id: 36,
        name: "Shield Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__guard_up, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "shieldjewel2",
        }
    },
    {
        id: 37,
        name: "Ironwall Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__guard, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "ironwalljewel2",
        }
    },
    {
        id: 38,
        name: "Refresh Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__stamina_surge, 1],
        ],

        icon: "gold",
        filterHelpers: {
            nameLower: "refreshjewel2",
        }
    },
    {
        id: 39,
        name: "Enhancer Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__power_prolonger, 1],
        ],

        icon: "brown",
        filterHelpers: {
            nameLower: "enhancerjewel2",
        }
    },
    {
        id: 40,
        name: "Mighty Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__maximum_might, 1],
        ],

        icon: "pink",
        filterHelpers: {
            nameLower: "mightyjewel2",
        }
    },
    {
        id: 41,
        name: "Attack Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__attack_boost, 1],
        ],

        icon: "red",
        filterHelpers: {
            nameLower: "attackjewel2",
        }
    },
    {
        id: 42,
        name: "Expert Jewel 2",

        slotSize: 2,
        rarity: 6,
        skills: [
            [__generated_skill__critical_eye, 1],
        ],

        icon: "pink",
        filterHelpers: {
            nameLower: "expertjewel2",
        }
    },
    {
        id: 43,
        name: "Quickswitch Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__rapid_morph, 1],
        ],

        icon: "blue",
        filterHelpers: {
            nameLower: "quickswitchjewel2",
        }
    },
    {
        id: 44,
        name: "Absorber Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__recoil_down, 1],
        ],

        icon: "brown",
        filterHelpers: {
            nameLower: "absorberjewel1",
        }
    },
    {
        id: 45,
        name: "Blunt Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__bludgeoner, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "bluntjewel2",
        }
    },
    {
        id: 46,
        name: "Quickload Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__reload_speed, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "quickloadjewel1",
        }
    },
    {
        id: 47,
        name: "Steadfast Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__stun_resistance, 1],
        ],

        icon: "yellow",
        filterHelpers: {
            nameLower: "steadfastjewel1",
        }
    },
    {
        id: 48,
        name: "Footing Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__tremor_resistance, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "footingjewel2",
        }
    },
    {
        id: 49,
        name: "Earplug Jewel 3",

        slotSize: 3,
        rarity: 5,
        skills: [
            [__generated_skill__earplugs, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "earplugjewel3",
        }
    },
    {
        id: 50,
        name: "Counter Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__counterstrike, 1],
        ],

        icon: "red",
        filterHelpers: {
            nameLower: "counterjewel2",
        }
    },
    {
        id: 51,
        name: "Bubble Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__bubbly_dance, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "bubblejewel2",
        }
    },
    {
        id: 52,
        name: "Sniper Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__steadiness, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "sniperjewel1",
        }
    },
    {
        id: 53,
        name: "Gambit Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__punishing_draw, 1],
        ],

        icon: "yellow",
        filterHelpers: {
            nameLower: "gambitjewel2",
        }
    },
    {
        id: 54,
        name: "Jumping Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__evade_extender, 1],
        ],

        icon: "lightblue",
        filterHelpers: {
            nameLower: "jumpingjewel2",
        }
    },
    {
        id: 55,
        name: "Evasion Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__evade_window, 1],
        ],

        icon: "lightblue",
        filterHelpers: {
            nameLower: "evasionjewel2",
        }
    },
    {
        id: 56,
        name: "Brace Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__flinch_free, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "bracejewel1",
        }
    },
    {
        id: 57,
        name: "Sheath Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__quick_sheath, 1],
        ],

        icon: "brown",
        filterHelpers: {
            nameLower: "sheathjewel2",
        }
    },
    {
        id: 58,
        name: "Wind Res Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__windproof, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "windresjewel1",
        }
    },
    {
        id: 59,
        name: "KO Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__slugger, 1],
        ],

        icon: "yellow",
        filterHelpers: {
            nameLower: "kojewel2",
        }
    },
    {
        id: 60,
        name: "Friendship Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__wide_range, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "friendshipjewel2",
        }
    },
    {
        id: 61,
        name: "Destroyer Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__partbreaker, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "destroyerjewel2",
        }
    },
    {
        id: 62,
        name: "Resistor Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__blight_resistance, 1],
        ],

        icon: "blue",
        filterHelpers: {
            nameLower: "resistorjewel2",
        }
    },
    {
        id: 63,
        name: "Gobbler Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__speed_eating, 1],
        ],

        icon: "gold",
        filterHelpers: {
            nameLower: "gobblerjewel2",
        }
    },
    {
        id: 64,
        name: "Protection Jewel 2",

        slotSize: 2,
        rarity: 5,
        skills: [
            [__generated_skill__divine_blessing, 1],
        ],

        icon: "white",
        filterHelpers: {
            nameLower: "protectionjewel2",
        }
    },
    {
        id: 65,
        name: "Wall Run Jewel 2",

        slotSize: 2,
        rarity: 4,
        skills: [
            [__generated_skill__wall_runner, 1],
        ],

        icon: "green",
        filterHelpers: {
            nameLower: "wallrunjewel2",
        }
    },
    {
        id: 66,
        name: "Wirebug Jewel 2",

        slotSize: 2,
        rarity: 4,
        skills: [
            [__generated_skill__wirebug_whisperer, 1],
        ],

        icon: "lightblue",
        filterHelpers: {
            nameLower: "wirebugjewel2",
        }
    },
    {
        id: 67,
        name: "Grinder Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__speed_sharpening, 1],
        ],

        icon: "yellow",
        filterHelpers: {
            nameLower: "grinderjewel1",
        }
    },
    {
        id: 68,
        name: "Enduring Jewel 2",

        slotSize: 2,
        rarity: 4,
        skills: [
            [__generated_skill__item_prolonger, 1],
        ],

        icon: "brown",
        filterHelpers: {
            nameLower: "enduringjewel2",
        }
    },
    {
        id: 69,
        name: "Recovery Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__recovery_speed, 1],
        ],

        icon: "green",
        filterHelpers: {
            nameLower: "recoveryjewel1",
        }
    },
    {
        id: 70,
        name: "Medicine Jewel 2",

        slotSize: 2,
        rarity: 4,
        skills: [
            [__generated_skill__recovery_up, 1],
        ],

        icon: "green",
        filterHelpers: {
            nameLower: "medicinejewel2",
        }
    },
    {
        id: 71,
        name: "Sonorous Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__horn_maestro, 1],
        ],

        icon: "green",
        filterHelpers: {
            nameLower: "sonorousjewel1",
        }
    },
    {
        id: 72,
        name: "Drain Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__stamina_thief, 1],
        ],

        icon: "darkblue",
        filterHelpers: {
            nameLower: "drainjewel1",
        }
    },
    {
        id: 73,
        name: "Physique Jewel 2",

        slotSize: 2,
        rarity: 4,
        skills: [
            [__generated_skill__constitution, 1],
        ],

        icon: "gold",
        filterHelpers: {
            nameLower: "physiquejewel2",
        }
    },
    {
        id: 74,
        name: "Venom Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__poison_attack, 1],
        ],

        icon: "purple",
        filterHelpers: {
            nameLower: "venomjewel1",
        }
    },
    {
        id: 75,
        name: "Slider Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__affinity_sliding, 1],
        ],

        icon: "pink",
        filterHelpers: {
            nameLower: "sliderjewel1",
        }
    },
    {
        id: 76,
        name: "Bomber Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__bombardier, 1],
        ],

        icon: "orange",
        filterHelpers: {
            nameLower: "bomberjewel1",
        }
    },
    {
        id: 77,
        name: "Blaze Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__fire_attack, 1],
        ],

        icon: "red",
        filterHelpers: {
            nameLower: "blazejewel1",
        }
    },
    {
        id: 78,
        name: "Stream Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__water_attack, 1],
        ],

        icon: "blue",
        filterHelpers: {
            nameLower: "streamjewel1",
        }
    },
    {
        id: 79,
        name: "Bolt Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__thunder_attack, 1],
        ],

        icon: "yellow",
        filterHelpers: {
            nameLower: "boltjewel1",
        }
    },
    {
        id: 80,
        name: "Frost Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__ice_attack, 1],
        ],

        icon: "lightblue",
        filterHelpers: {
            nameLower: "frostjewel1",
        }
    },
    {
        id: 81,
        name: "Dragon Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__dragon_attack, 1],
        ],

        icon: "orange",
        filterHelpers: {
            nameLower: "dragonjewel1",
        }
    },
    {
        id: 82,
        name: "Defense Jewel 1",

        slotSize: 1,
        rarity: 5,
        skills: [
            [__generated_skill__defense_boost, 1],
        ],

        icon: "gold",
        filterHelpers: {
            nameLower: "defensejewel1",
        }
    },
    {
        id: 83,
        name: "Carver Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__carving_pro, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "carverjewel1",
        }
    },
    {
        id: 84,
        name: "Rodeo Jewel 2",

        slotSize: 2,
        rarity: 4,
        skills: [
            [__generated_skill__master_mounter, 1],
        ],

        icon: "blue",
        filterHelpers: {
            nameLower: "rodeojewel2",
        }
    },
    {
        id: 85,
        name: "Hungerless Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__hunger_resistance, 1],
        ],

        icon: "gold",
        filterHelpers: {
            nameLower: "hungerlessjewel1",
        }
    },
    {
        id: 86,
        name: "Satiated Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__free_meal, 1],
        ],

        icon: "brown",
        filterHelpers: {
            nameLower: "satiatedjewel1",
        }
    },
    {
        id: 87,
        name: "Muck Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__muck_resistance, 1],
        ],

        icon: "grey",
        filterHelpers: {
            nameLower: "muckjewel1",
        }
    },
    {
        id: 88,
        name: "Diversion Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__diversion, 1],
        ],

        icon: "purple",
        filterHelpers: {
            nameLower: "diversionjewel1",
        }
    },
    {
        id: 89,
        name: "Dive Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__leap_of_faith, 1],
        ],

        icon: "lightblue",
        filterHelpers: {
            nameLower: "divejewel1",
        }
    },
    {
        id: 90,
        name: "Fortitude Jewel 2",

        slotSize: 2,
        rarity: 4,
        skills: [
            [__generated_skill__fortify, 1],
        ],

        icon: "orange",
        filterHelpers: {
            nameLower: "fortitudejewel2",
        }
    },
    {
        id: 91,
        name: "Geology Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__geologist, 1],
        ],

        icon: "brown",
        filterHelpers: {
            nameLower: "geologyjewel1",
        }
    },
    {
        id: 92,
        name: "Botany Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__botanist, 1],
        ],

        icon: "green",
        filterHelpers: {
            nameLower: "botanyjewel1",
        }
    },
    {
        id: 93,
        name: "Antiblast Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__blast_resistance, 1],
        ],

        icon: "orange",
        filterHelpers: {
            nameLower: "antiblastjewel1",
        }
    },
    {
        id: 94,
        name: "Pep Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__sleep_resistance, 1],
        ],

        icon: "lightblue",
        filterHelpers: {
            nameLower: "pepjewel1",
        }
    },
    {
        id: 95,
        name: "Antipara Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__paralysis_resistance, 1],
        ],

        icon: "gold",
        filterHelpers: {
            nameLower: "antiparajewel1",
        }
    },
    {
        id: 96,
        name: "Antidote Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__poison_resistance, 1],
        ],

        icon: "purple",
        filterHelpers: {
            nameLower: "antidotejewel1",
        }
    },
    {
        id: 97,
        name: "Fire Res Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__fire_resistance, 1],
        ],

        icon: "red",
        filterHelpers: {
            nameLower: "fireresjewel1",
        }
    },
    {
        id: 98,
        name: "Water Res Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__water_resistance, 1],
        ],

        icon: "blue",
        filterHelpers: {
            nameLower: "waterresjewel1",
        }
    },
    {
        id: 99,
        name: "Thunder Res Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__thunder_resistance, 1],
        ],

        icon: "yellow",
        filterHelpers: {
            nameLower: "thunderresjewel1",
        }
    },
    {
        id: 100,
        name: "Ice Res Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__ice_resistance, 1],
        ],

        icon: "lightblue",
        filterHelpers: {
            nameLower: "iceresjewel1",
        }
    },
    {
        id: 101,
        name: "Dragon Res Jewel 1",

        slotSize: 1,
        rarity: 4,
        skills: [
            [__generated_skill__dragon_resistance, 1],
        ],

        icon: "orange",
        filterHelpers: {
            nameLower: "dragonresjewel1",
        }
    },
];

