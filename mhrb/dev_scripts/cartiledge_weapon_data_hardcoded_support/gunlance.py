"""
Filename: gunlance.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Gunlance data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_GL_SPEC = [
    ("Kamura Tree", [
        ("Kamura Gunlance I"    , "1a", 1),
        ("Kamura Gunlance II"   , "1b", 1),
        ("Kamura Gunlance III"  , "1c", 2),
        ("Kamura Gunlance IV"   , "1d", 3),
        ("Kamura Gunlance V"    , "1e", 4),
        ("Kamura Ninja Gunlance", "1f", 5),
    ]),
    ("Mizutsune Tree", [
        ("Ukiyo no Yamiwo I", "2a", 3),
        ("Ukiyo no Yamiwo II", "2b", 5),
        ("Mizumori", "2c", 6),
    ]),
    ("Rathian Tree", [
        ("Princess Panoply I", "3a", 2),
        ("Princess Panoply II", "3b", 5),
        ("Ortlinde", "3c", 6),
    ]),
    ("Rathalos Tree", [
        ("Red Rook I", "4a", 5),
        ("Red Rook II", "4b", 6),
        ("Crimson Rook", "4c", 6),
    ]),
    ("Delex Tree", [
        ("Delex Harpoon I", "5a", 2),
        ("Delex Harpoon II", "5b", 2),
        ("Sand Blaster Gunlance", "5c", 5),
    ]),
    ("Zinogre Tree", [
        ("Usurper's Roar I", "6a", 3),
        ("Usurper's Roar II", "6b", 5),
        ("Despot's Phlogiston", "6c", 6),
    ]),
    ("Barioth Tree", [
        ("Twinfang I", "7a", 2),
        ("Twinfang II", "7b", 5),
        ("Ambermarch", "7c", 6),
    ]),
    ("Ore Tree", [
        ("Iron Gunlance I", "8a", 1),
        ("Iron Gunlance II", "8b", 1),
        ("Eizenlitter", "8c", 2),
        ("Striker's Gunlance I", "8d", 3),
        ("Striker's Gunlance II", "8e", 4),
        ("Imperial Guardlance", "8f", 4),
    ]),
    ("Ore Tree 2", [
        ("General's Arbalance I", "9a", 4),
        ("General's Arbalance II", "9b", 5),
        ("Admiral's Arbalance", "9c", 6),
    ]),
    ("Pukei-Pukei Tree", [
        ("Pukei Gunlance I", "10a", 5),
        ("Pukei Gunlance II", "10b", 5),
        ("Datura Gunlance", "10c", 6),
    ]),
    ("Diablos Tree", [
        ("Diablos Gunlance I", "11a", 3),
        ("Diablos Gunlance II", "11b", 6),
        ("Diablos Cannon", "11c", 6),
    ]),
    ("Aknosom Tree", [
        ("Aknosom Gunlance I", "12a", 2),
        ("Aknosom Gunlance II", "12b", 2),
        ("Aknosom Gunlance III", "12c", 4),
        ("Dawnbreaker Gunlance", "12d", 5),
    ]),
    ("Almudron Tree", [
        ("Almudron Gunlance I", "13a", 3),
        ("Almudron Gunlance II", "13b", 6),
        ("Doombringer Gunlance", "13c", 6),
    ]),
    ("Khezu Tree", [
        ("Full Voltage I", "14a", 2),
        ("Full Voltage II", "14b", 3),
        ("High Volt Gunlance", "14c", 4),
    ]),
    ("Volvidon Tree", [
        ("Shattershot I", "15a", 2),
        ("Shattershot II", "15b", 5),
        ("Shatter God", "15c", 6),
    ]),
    ("Baggi Tree", [
        ("Baggi Gunlance I", "16a", 1),
        ("Baggi Gunlance II", "16b", 2),
        ("Baggi Gunlance III", "16c", 4),
        ("Lullabyte Sleeplance", "16d", 5),
    ]),
    ("Tobi-Kadachi Tree", [
        ("Kadachi Striker I", "17a", 2),
        ("Kadachi Striker II", "17b", 5),
        ("Mythic Kadachi Striker", "17c", 6),
    ]),
    ("Bone Tree", [
        ("Bone Gunlance I", "18a", 1),
        ("Bone Gunlance II", "18b", 1),
        ("Wyvern Bone Gunlance", "18c", 2),
        ("Golem Gunlance I", "18d", 3),
        ("Golem Gunlance II", "18e", 4),
        ("Behemoth Gunlance", "18f", 5),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Gunlance I", "19a", 5),
        ("Hidden Gunlance II", "19b", 6),
        ("Fading Night", "19c", 6),
    ]),
    ("Anjanath Tree", [
        ("Flaming Gunlance I", "20a", 3),
        ("Flaming Gunlance II", "20b", 3),
        ("Flaming Gunlance III", "20c", 5),
        ("Barbarous Firelance", "20d", 6),
    ]),
    ("Barroth Tree", [
        ("Barroth Loader I", "21a", 2),
        ("Barroth Loader II", "21b", 2),
        ("Rugged Loader", "21c", 5),
    ]),
    ("Tigrex Tree", [
        ("Tiger Blast I", "22a", 3),
        ("Tiger Blast II", "22b", 6),
        ("Tigrex Gunlance", "22c", 6),
    ]),
    ("Lagombi Tree", [
        ("Lagomberator I", "23a", 1),
        ("Lagomberator II", "23b", 3),
        ("Lagomberator III", "23c", 4),
        ("Lagomberatrix", "23d", 6),
    ]),
    ("Royal Ludroth Tree", [
        ("Ludroth Harpoon I", "24a", 2),
        ("Ludroth Harpoon II", "24b", 4),
        ("Ludroth Harpoon III", "24c", 5),
        ("Ludroth Shellbreaker", "24d", 6),
    ]),
    ("Bnahabra Tree", [
        ("Fiore Nulo I", "25a", 1),
        ("Fiore Nulo II", "25b", 2),
        ("Fiore Unu", "25c", 4),
    ]),
    ("Rakna-Kadaki Tree", [
        ("Rakna Gunlance I", "26a", 6),
        ("Rakna Gunlance II", "26b", 6),
        ("Araknalance", "26c", 7),
    ]),
    ("Bnahabra (Dragon)", [
        ("Fiore Nulo Black I", "27a", 4),
        ("Fiore Nulo Black II", "27b", 5),
        ("Fiore Unu Black", "27c", 6),
    ]),
    ("Bnahabra (Ice)", [
        ("Fiore Nulo White I", "28a", 2),
        ("Fiore Nulo White II", "28b", 3),
        ("Fiore Unu White", "28c", 5),
    ]),
    ("Bnahabra (Paralysis)", [
        ("Fiore Nulo Green I", "29a", 1),
        ("Fiore Nulo Green II", "29b", 3),
        ("Fiore Unu Green", "29c", 4),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Gunlance I", "30a", 3),
        ("Sinister Gunlance II", "30b", 3),
        ("Sinister Shadowshot", "30c", 6),
    ]),
    ("Rajang Tree", [
        ("Demon Gunlance I", "31a", 5),
        ("Demon Gunlance II", "31b", 6),
        ("Great Demon Gunlance", "31c", 7),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Gunlance I", "32a", 5),
        ("Azure Elder Gunlance II", "32b", 6),
        ("Abyssal Gale Gunlance", "32c", 7),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Gunlance I", "33a", 6),
        ("Abyssal Storm Gunlance", "33b", 7),
    ]),
    ("Bazelgeuse Tree", [
        ("Bazel Buster I", "34a", 6),
        ("Bazel Buster II", "34b", 6),
        ("Bazel Destroyer", "34c", 7),
    ]),
    ("Kushala Daora Tree", [
        ("Icesteel Gunlance I", "35a", 6),
        ("Daora's Brigia", "35b", 7),
    ]),
    ("Chameleos Tree", [
        ("Venomous Cologne I", "36a", 6),
        ("Venomous Attar", "36b", 7),
    ]),
    ("Valstrax Tree", [
        ("Redwing Gunlance I", "37a", 6),
        ("Reddnaught Gunlance", "37b", 7),
    ]),
    ("Canyne Tree", [
        ("Canyne Cannon I", "38a", 3),
        ("Canyne Cannon II", "38b", 3),
        ("Howlitzer", "38c", 5),
    ]),
    ("Guild Tree", [
        ("Cornpopper I", "39a", 5),
        ("Cornpopper II", "39b", 5),
        ("Mighty Cornpopper", "39c", 6),
    ]),
    ("Shell-Studded Tree", [
        ("Sleepy Shellgun I", "40a", 2),
        ("Sleepy Shellgun II", "40b", 3),
        ("Soporific Shellgun", "40c", 5),
    ]),
    ("Rampage Tree", [
        ("Rampage Gunlance I"  , "41a", 4),
        ("Rampage Gunlance II" , "41b", 5),
        ("Rampage Gunlance III", "41c", 5),
        ("Rampage Gunlance IV" , "41d", 6),
        ("Rampage Gunlance V"  , "41e", 6),
        ("Rampage Gunlance S"  , "41f", 7),
    ]),
]

HARDCODED_RAMP_SKILLS_GL = {
    "Rampage Gunlance I": [
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
    "Rampage Gunlance II": [
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
            "shelling_normal_1",
            "shelling_long_1",
            "shelling_wide_1"
        ]
    ],
    "Rampage Gunlance III": [
        [
            "attack_boost_2",
            "elemental_boost_1",
            "affinity_boost_2",
            "defense_boost_2",
            "sharpness_type_1"
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
            "shelling_normal_1",
            "shelling_long_1",
            "shelling_wide_1"
        ]
    ],
    "Rampage Gunlance IV": [
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
            "poison_2",
            "paralysis_2",
            "sleep_2",
            "blast_2"
        ],
        [
            "attack_surge",
            "affinity_surge",
            "shelling_normal_2",
            "shelling_long_2",
            "shelling_wide_2"
        ]
    ],
    "Rampage Gunlance V": [
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
            "poison_2",
            "paralysis_2",
            "sleep_2",
            "blast_2"
        ],
        [
            "attack_surge",
            "elemental_surge",
            "affinity_surge",
            "shelling_normal_2",
            "shelling_long_2",
            "shelling_wide_2"
        ]
    ],
    "Rampage Gunlance S": [
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
            "fire_4",
            "water_4",
            "thunder_4",
            "ice_4",
            "dragon_4",
            "poison_3",
            "paralysis_3",
            "sleep_3",
            "blast_3"
        ],
        [
            "attack_surge",
            "elemental_surge",
            "affinity_surge",
            "shelling_normal_3",
            "shelling_long_3",
            "shelling_wide_3"
        ]
    ],
}

