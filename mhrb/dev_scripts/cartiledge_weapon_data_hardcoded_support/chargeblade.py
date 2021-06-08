"""
Filename: chargeblade.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Charge Blade data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_CB_SPEC = [
    ("Kamura Tree", [
        ("Kamura C. Blade I"    , "1a", 1),
        ("Kamura C. Blade II"   , "1b", 1),
        ("Kamura C. Blade III"  , "1c", 2),
        ("Kamura C. Blade IV"   , "1d", 3),
        ("Kamura C. Blade V"    , "1e", 4),
        ("Kamura Ninja C. Blade", "1f", 5),
    ]),
    ("Rathian Tree", [
        ("Dear Lutemis I", "2a", 2),
        ("Dear Lutemis II", "2b", 4),
        ("Dear Lutemia", "2c", 5),
    ]),
    ("Barioth Tree", [
        ("Weissritter I", "3a", 2),
        ("Weissritter II", "3b", 3),
        ("Weissritter III", "3c", 4),
        ("Paladire", "3d", 5),
    ]),
    ("Zinogre Tree", [
        ("Usurper's Lightning I", "4a", 3),
        ("Usurper's Lightning II", "4b", 5),
        ("Despot's Thundergale", "4c", 6),
    ]),
    ("Tetranadon Tree", [
        ("Shovedown Blade I", "5a", 2),
        ("Shovedown Blade II", "5b", 4),
        ("Spinning Takedown", "5c", 5),
    ]),
    ("Basarios Tree", [
        ("Giga Grips I", "6a", 2),
        ("Giga Grips II", "6b", 3),
        ("Giga Grips III", "6c", 5),
        ("Titan's Vise", "6d", 6),
    ]),
    ("Goss Harag Tree", [
        ("Surprise Axe I", "7a", 3),
        ("Surprise Axe II", "7b", 5),
        ("Stunning Axe", "7c", 6),
    ]),
    ("Ore Tree", [
        ("Hyperguard I", "8a", 1),
        ("Hyperguard II", "8b", 1),
        ("Regas Hyper", "8c", 2),
        ("Elite Blade I", "8d", 3),
        ("Elite Blade II", "8e", 4),
        ("Kaiser Blade", "8f", 5),
    ]),
    ("Thunder Tree", [
        ("K. Captain's Blade I", "9a", 4),
        ("K. Captain's Blade II", "9b", 5),
        ("Die Walkure", "9c", 6),
    ]),
    ("Rakna-Kadaki Tree", [
        ("Biting Edge I", "10a", 6),
        ("Biting Edge II", "10b", 6),
        ("Araknablade", "10c", 7),
    ]),
    ("Tigrex Tree", [
        ("Tigrex Divide I", "11a", 3),
        ("Tigrex Divide II", "11b", 6),
        ("Tigrex Blade", "11c", 6),
    ]),
    ("Mizutsune Tree", [
        ("Mizuniya Drill I", "12a", 3),
        ("Mizuniya Drill II", "12b", 5),
        ("Final Fieldblade", "12c", 6),
    ]),
    ("Tobi-Kadachi Tree", [
        ("Kadachi Slasher I", "13a", 2),
        ("Kadachi Slasher II", "13b", 3),
        ("Kadachi Otenta", "13c", 5),
    ]),
    ("Izuchi Tree", [
        ("Wind Thief Sickle I", "14a", 1),
        ("Wind Thief Sickle II", "14b", 2),
        ("Gale Sickle", "14c", 4),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Arsenal I", "15a", 3),
        ("Hidden Arsenal II", "15b", 5),
        ("Scream in the Night", "15c", 6),
    ]),
    ("Bone Tree", [
        ("Bone Strongarm I", "16a", 1),
        ("Bone Strongarm II", "16b", 1),
        ("Hard Bone Strongarm", "16c", 2),
        ("Bone Blade I", "16d", 3),
        ("Bone Blade II", "16e", 4),
        ("Bonesilt Veil", "16f", 5),
    ]),
    ("Jyuratodus Tree", [
        ("Jyura Silt I", "17a", 5),
        ("Jyura Silt II", "17b", 6),
        ("Clutch of the Deep", "17c", 6),
    ]),
    ("Rathalos Tree", [
        ("Axelion Blade I", "18a", 3),
        ("Axelion Blade II", "18b", 5),
        ("Bardichion Blade", "18c", 6),
    ]),
    ("Somnacanth Tree", [
        ("Bellowing Blow I", "19a", 2),
        ("Bellowing Blow II", "19b", 3),
        ("Illusory Frilled Wail", "19c", 5),
    ]),
    ("Poison Tree", [
        ("Poisonous Veil I", "20a", 2),
        ("Poisonous Veil II", "20b", 4),
        ("Infected Veil", "20c", 5),
    ]),
    ("Dragon Tree", [
        ("Dragon Veil I", "21a", 4),
        ("Dragon Veil II", "21b", 5),
        ("Dragonsong", "21c", 6),
    ]),
    ("Barroth Tree", [
        ("Barroth Anchor I", "22a", 2),
        ("Barroth Anchor II", "22b", 3),
        ("Rugged Anchor", "22c", 5),
    ]),
    ("Diablos Tree", [
        ("Diablos Strongarm I", "23a", 6),
        ("Diablos Strongarm II", "23b", 6),
        ("Cera Strongarm", "23c", 7),
    ]),
    ("Volvidon Tree", [
        ("Rough Roller I", "24a", 2),
        ("Rough Roller II", "24b", 5),
        ("Rotaxion", "24c", 6),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Slasher I", "25a", 3),
        ("Sinister Slasher II", "25b", 3),
        ("Sinister Shade Axe", "25c", 6),
    ]),
    ("Rajang Tree", [
        ("Undying Blade I", "26a", 5),
        ("Undying Blade II", "26b", 6),
        ("Ikaji Immortal", "26c", 7),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Blade I", "27a", 5),
        ("Azure Elder Blade II", "27b", 6),
        ("Abyssal Gale Ward", "27c", 7),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Sawtooth I", "28a", 6),
        ("Abyssal Storm Ward", "28b", 7),
    ]),
    ("Kushala Daora Tree", [
        ("Daora's Casca I", "29a", 6),
        ("Daora's Thwartoise", "29b", 7),
    ]),
    ("Teostra Tree", [
        ("Teostra's Striker I", "30a", 6),
        ("Teostra's Nova", "30b", 7),
    ]),
    ("Chameleos Tree", [
        ("Arcane Draw I", "31a", 6),
        ("Etherward", "31b", 7),
    ]),
    ("Valstrax Tree", [
        ("Redwing Edge I", "32a", 6),
        ("Skaltecore", "32b", 7),
    ]),
    ("Smithy Tree", [
        ("Ricebane I", "33a", 3),
        ("Ricebane II", "33b", 4),
        ("Pounder of Rice", "33c", 5),
    ]),
    ("Felyne Tree", [
        ("Cuddly Cat I", "34a", 1),
        ("Cuddly Cat II", "34b", 3),
        ("Felyne Fancy", "34c", 4),
    ]),
    ("Aelucanth Tree", [
        ("Mandible Blade I", "35a", 3),
        ("Mandible Blade II", "35b", 3),
        ("Maxilla Edge", "35c", 5),
    ]),
    ("Vaik Tree", [
        ("Vaik Veil I", "36a", 2),
        ("Vaik Veil II", "36b", 3),
        ("Shieldraad", "36c", 4),
    ]),
    ("Rampage Tree", [
        ("Rampage C. Blade I"  , "37a", 4),
        ("Rampage C. Blade II" , "37b", 5),
        ("Rampage C. Blade III", "37c", 5),
        ("Rampage C. Blade IV" , "37d", 6),
        ("Rampage C. Blade V"  , "37e", 6),
        ("Rampage C. Blade S"  , "37f", 7),
    ]),
]

HARDCODED_RAMP_SKILLS_CB = {
    "Rampage C. Blade I": [
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
            "attack_surge",
            "phial_element"
        ]
    ],
    "Rampage C. Blade II": [
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
            "attack_surge",
            "phial_element"
        ]
    ],
    "Rampage C. Blade III": [
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
            "affinity_surge",
            "phial_element"
        ]
    ],
    "Rampage C. Blade IV": [
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
            "affinity_surge",
            "phial_element"
        ]
    ],
    "Rampage C. Blade V": [
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
            "affinity_surge",
            "phial_element"
        ]
    ],
    "Rampage C. Blade S": [
        [
            "attack_boost_4",
            "elemental_boost_2",
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
            "affinity_surge",
            "phial_element"
        ]
    ],
}

