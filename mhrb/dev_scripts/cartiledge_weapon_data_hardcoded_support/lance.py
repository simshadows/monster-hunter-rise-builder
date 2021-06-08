"""
Filename: lance.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Lance data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_L_SPEC = [
    ("Kamura Tree", [
        ("Kamura Spear I"    , "1a", 1),
        ("Kamura Spear II"   , "1b", 1),
        ("Kamura Spear III"  , "1c", 2),
        ("Kamura Spear IV"   , "1d", 3),
        ("Kamura Spear V"    , "1e", 4),
        ("Kamura Ninja Spear", "1f", 5),
    ]),
    ("Goss Harag Tree", [
        ("Goss Lance I", "2a", 3),
        ("Goss Lance II", "2b", 5),
        ("Abominable Lance", "2c", 6),
    ]),
    ("Mizutsune Tree", [
        ("Hana Mo Hana Nare I", "3a", 3),
        ("Hana Mo Hana Nare II", "3b", 5),
        ("Kimi Ga Kiru", "3c", 6),
    ]),
    ("Remobra Tree", [
        ("Naag Serpentblade I", "4a", 2),
        ("Naag Serpentblade II", "4b", 3),
        ("Devta Serpentblade", "4c", 4),
    ]),
    ("Tetranadon Tree", [
        ("Distension I", "5a", 2),
        ("Distension II", "5b", 4),
        ("Croaker", "5c", 5),
    ]),
    ("Izuchi Tree", [
        ("Wind Thief Lance I", "6a", 1),
        ("Wind Thief Lance II", "6b", 2),
        ("Gale Lance", "6c", 4),
    ]),
    ("Zamite Tree", [
        ("Sharktooth Spear I", "7a", 1),
        ("Sharktooth Spear II", "7b", 3),
        ("Razortooth Spear", "7c", 4),
    ]),
    ("Ore Tree", [
        ("Iron Lance I", "8a", 1),
        ("Iron Lance II", "8b", 1),
        ("Millennial Lance", "8c", 2),
        ("Paladin Lance I", "8d", 3),
        ("Paladin Lance II", "8e", 4),
        ("Rampart", "8f", 5),
    ]),
    ("Ore Tree 2", [
        ("Babel Spear I", "9a", 4),
        ("Babel Spear II", "9b", 5),
        ("Elder Babel Spear", "9c", 6),
    ]),
    ("Basarios Tree", [
        ("Venom Lance I", "10a", 5),
        ("Venom Lance II", "10b", 6),
        ("Basarios Venom Spear", "10c", 6),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Stinger I", "11a", 3),
        ("Hidden Stinger II", "11b", 5),
        ("Night Rains Black", "11c", 6),
    ]),
    ("Dragon Tree", [
        ("Growling Wyvern I", "12a", 3),
        ("Growling Wyvern II", "12b", 5),
        ("Roaring Wyvern", "12c", 6),
    ]),
    ("Tobi-Kadachi Tree", [
        ("Kadachi Lance I", "13a", 2),
        ("Kadachi Lance II", "13b", 5),
        ("Shockspear", "13c", 6),
    ]),
    ("Aknosom Tree", [
        ("Aknosom Lance I", "14a", 2),
        ("Aknosom Lance II", "14b", 2),
        ("Aknosom Lance III", "14c", 4),
        ("Dawnbreaker Lance", "14d", 6),
    ]),
    ("Barroth Tree", [
        ("Rugged Lance I", "15a", 2),
        ("Rugged Lance II", "15b", 3),
        ("Barroth Carver", "15c", 5),
    ]),
    ("Thunder Tree", [
        ("Drill Lance I", "16a", 4),
        ("Drill Lance II", "16b", 5),
        ("Gigadrill Lance", "16c", 6),
    ]),
    ("Volvidon Tree", [
        ("Volvi Stroke I", "17a", 2),
        ("Volvi Stroke II", "17b", 4),
        ("Volvi Sweep", "17c", 5),
    ]),
    ("Fire Tree", [
        ("Heat Lance I", "18a", 1),
        ("Heat Lance II", "18b", 3),
        ("Heatstinger", "18c", 5),
    ]),
    ("Bone Tree", [
        ("Bone Lance I", "19a", 1),
        ("Hard Bone Lance", "19b", 1),
        ("Longhorn Spear I", "19c", 2),
        ("Longtusk Spear", "19d", 3),
        ("Barbarian Tusk I", "19e", 4),
        ("Barbarian Fang", "19f", 5),
    ]),
    ("Tigrex Tree", [
        ("Tiger Stinger I", "20a", 6),
        ("Tiger Stinger II", "20b", 6),
        ("Tigrex Lance", "20c", 7),
    ]),
    ("Barioth Tree", [
        ("Tusk Lance I", "21a", 2),
        ("Tusk Lance II", "21b", 5),
        ("Sabertooth", "21c", 6),
    ]),
    ("Pukei-Pukei Tree", [
        ("Pukei Spear I", "22a", 2),
        ("Pukei Spear II", "22b", 5),
        ("Datura Spear", "22c", 6),
    ]),
    ("Rathalos Tree", [
        ("Red Tail I", "23a", 3),
        ("Red Tail II", "23b", 5),
        ("Spear of Prominence", "23c", 6),
    ]),
    ("Royal Ludroth Tree", [
        ("Spiral Lance I", "24a", 2),
        ("Spiral Lance II", "24b", 3),
        ("Spiral Splash", "24c", 5),
    ]),
    ("Rhenoplos Tree", [
        ("Ploshasta I", "25a", 2),
        ("Ploshasta II", "25b", 4),
        ("Rhenohasta", "25c", 5),
    ]),
    ("Diablos Tree", [
        ("Diablos Lance I", "26a", 3),
        ("Diablos Lance II", "26b", 6),
        ("Diablos Spear", "26c", 6),
    ]),
    ("Kulu-Ya-Ku Tree", [
        ("Kulu Spear I", "27a", 2),
        ("Kulu Spear II", "27b", 2),
        ("Kulu Skewer", "27c", 5),
    ]),
    ("Zinogre Tree", [
        ("Usurper's Coming I", "28a", 3),
        ("Usurper's Coming II", "28b", 5),
        ("Despot's Cacophony", "28c", 6),
    ]),
    ("Baggi Tree", [
        ("Azure Crest I", "29a", 1),
        ("Azure Crest II", "29b", 3),
        ("Azure Crest III", "29c", 4),
        ("Great Azure", "29d", 5),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Spear I", "30a", 3),
        ("Sinister Spear II", "30b", 3),
        ("Sinister Shadespear", "30c", 6),
    ]),
    ("Rajang Tree", [
        ("Demon Lance I", "31a", 5),
        ("Demon Lance II", "31b", 6),
        ("Great Demon Lance", "31c", 7),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Spear I", "32a", 5),
        ("Azure Elder Spear II", "32b", 6),
        ("Abyssal Gale Lance", "32c", 7),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Spear I", "33a", 6),
        ("Abyssal Storm Lance", "33b", 7),
    ]),
    ("Bazelgeuse Tree", [
        ("Rookslayer Lance I", "34a", 6),
        ("Rookslayer Lance II", "34b", 6),
        ("Bazel Myniad Lance", "34c", 7),
    ]),
    ("Kushala Daora Tree", [
        ("Icesteel Spear I", "35a", 6),
        ("Daora's Fang", "35b", 7),
    ]),
    ("Teostra Tree", [
        ("Teostra's Howl I", "36a", 6),
        ("Teostra's Roar", "36b", 7),
    ]),
    ("Valstrax Tree", [
        ("Redwing Spear I", "37a", 6),
        ("Reddnaught Spear", "37b", 7),
    ]),
    ("Chaos Tree", [
        ("Plegis Needle I", "38a", 2),
        ("Plegis Needle II", "38b", 3),
        ("Mighty Plegis", "38c", 5),
    ]),
    ("Spio Tree", [
        ("Alacrantze I", "39a", 2),
        ("Alacrantze II", "39b", 3),
        ("Alacrantze III", "39c", 4),
        ("Scorpion Lance", "39d", 5),
    ]),
    ("Melahoa Tree", [
        ("Fragrance I", "40a", 2),
        ("Fragrance II", "40b", 3),
        ("Classy Fragrance", "40c", 5),
    ]),
    ("Rampage Tree", [
        ("Rampage Spear I"  , "41a", 4),
        ("Rampage Spear II" , "41b", 5),
        ("Rampage Spear III", "41c", 5),
        ("Rampage Spear IV" , "41d", 6),
        ("Rampage Spear V"  , "41e", 6),
        ("Rampage Spear S"  , "41f", 7),
    ]),
]

HARDCODED_RAMP_SKILLS_L = {
    "Rampage Spear I": [
        [
            "attack_boost_1",
            "affinity_boost_1",
            "defense_boost_1"
        ],
        [
            "fire_1",
            "water_1",
            "thunder_1",
            "ice_1"
        ],
        [
            "attack_surge"
        ]
    ],
    "Rampage Spear II": [
        [
            "attack_boost_1",
            "elemental_boost_1",
            "affinity_boost_1",
            "defense_boost_1"
        ],
        [
            "non_elemental_boost",
            "fire_1",
            "water_1",
            "thunder_1",
            "ice_1",
            "dragon_1",
            "poison_1"
        ],
        [
            "attack_surge"
        ]
    ],
    "Rampage Spear III": [
        [
            "attack_boost_2",
            "elemental_boost_1",
            "affinity_boost_2",
            "defense_boost_2",
            "sharpness_type_1"
        ],
        [
            "non_elemental_boost",
            "fire_1",
            "water_1",
            "thunder_1",
            "ice_1",
            "dragon_1",
            "poison_1",
            "paralysis_1",
            "sleep_1",
            "blast_1"
        ],
        [
            "attack_surge",
            "affinity_surge"
        ]
    ],
    "Rampage Spear IV": [
        [
            "attack_boost_2",
            "elemental_boost_2",
            "affinity_boost_2",
            "defense_boost_2",
            "sharpness_type_1",
            "sharpness_type_2"
        ],
        [
            "non_elemental_boost",
            "fire_2",
            "water_2",
            "thunder_2",
            "ice_2",
            "dragon_2",
            "poison_1",
            "paralysis_1",
            "sleep_1",
            "blast_1"
        ],
        [
            "attack_surge",
            "affinity_surge"
        ]
    ],
    "Rampage Spear V": [
        [
            "attack_boost_3",
            "elemental_boost_2",
            "affinity_boost_3",
            "defense_boost_3",
            "sharpness_type_1",
            "sharpness_type_2",
            "sharpness_type_3"
        ],
        [
            "non_elemental_boost",
            "fire_3",
            "water_3",
            "thunder_3",
            "ice_3",
            "dragon_3",
            "poison_1",
            "paralysis_1",
            "sleep_1",
            "blast_1"
        ],
        [
            "attack_surge",
            "elemental_surge",
            "affinity_surge"
        ]
    ],
    "Rampage Spear S": [
        [
            "attack_boost_4",
            "elemental_boost_3",
            "affinity_boost_4",
            "defense_boost_3",
            "sharpness_type_1",
            "sharpness_type_2",
            "sharpness_type_3",
            "sharpness_type_4"
        ],
        [
            "non_elemental_boost",
            "fire_3",
            "water_3",
            "thunder_3",
            "ice_3",
            "dragon_3",
            "poison_2",
            "paralysis_2",
            "sleep_2",
            "blast_2"
        ],
        [
            "attack_surge",
            "elemental_surge",
            "affinity_surge"
        ]
    ],
}

