"""
Filename: longsword.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Longsword data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_LS_SPEC = [
    ("Kamura Tree", [
        ("Kamura Blade I"    , "1a", 1),
        ("Kamura Blade II"   , "1b", 1),
        ("Kamura Blade III"  , "1c", 2),
        ("Kamura Blade IV"   , "1d", 3),
        ("Kamura Blade V"    , "1e", 4),
        ("Kamura Ninja Blade", "1f", 5),
    ]),
    ("Zinogre Tree", [
        ("Usurper Boltslicer I", "2a", 3),
        ("Usurper Boltslicer II", "2b", 5),
        ("Despot Boltbreaker", "2c", 6),
    ]),
    ("Aknosom Tree", [
        ("Aknosom Sabre I", "3a", 2),
        ("Aknosom Sabre II", "3b", 4),
        ("Daybreak Blade", "3c", 5),
    ]),
    ("Lagombi Tree", [
        ("Ivory Rabbit I", "4a", 1),
        ("Ivory Rabbit II", "4b", 2),
        ("Iced Rabbit", "4c", 4),
    ]),
    ("Long Sword Tree", [
        ("Guardian Sword I", "5a", 1),
        ("Guardian Sword II", "5b", 2),
        ("Imperial Sword", "5c", 4),
    ]),
    ("Barroth Tree", [
        ("Castello Saif I", "6a", 2),
        ("Castello Saif II", "6b", 3),
        ("Castellum Long Sword", "6c", 5),
    ]),
    ("Basarios Tree", [
        ("Gigant Makra I", "7a", 2),
        ("Gigant Makra II", "7b", 3),
        ("Titanic Makra", "7c", 5),
    ]),
    ("Almudron Tree", [
        ("Almudron Blade I", "8a", 3),
        ("Almudron Blade II", "8b", 6),
        ("Doom Bringer Blade", "8c", 6),
    ]),
    ("Ore Tree", [
        ("Iron Katana I", "9a", 1),
        ("Iron Katana II", "9b", 1),
        ("Iron Gospel", "9c", 2),
        ("Keen Edge I", "9d", 3),
        ("Keen Edge II", "9e", 4),
        ("Julienne Blade", "9f", 5),
    ]),
    ("Tigrex Tree", [
        ("Tigrine Edge I", "10a", 3),
        ("Tigrine Edge II", "10b", 6),
        ("Tigrine Need", "10c", 6),
    ]),
    ("Mizutsune Tree", [
        ("Kakaru Kumo Naki I", "11a", 3),
        ("Kakaru Kumo Naki II", "11b", 5),
        ("Tamonowo", "11c", 6),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Saber I", "12a", 3),
        ("Hidden Saber II", "12b", 5),
        ("Deepest Night", "12c", 6),
    ]),
    ("Thunder Tree", [
        ("Eager Cleaver I", "13a", 2),
        ("Eager Cleaver II", "13b", 4),
        ("Devil Slicer", "13c", 5),
    ]),
    ("Kulu-Ya-Ku Tree", [
        ("Kulu Katana I", "14a", 2),
        ("Kulu Katana II", "14b", 3),
        ("Kulu Slicer", "14c", 4),
    ]),
    ("Ice Tree", [
        ("Chillblade I", "15a", 4),
        ("Chillblade II", "15b", 5),
        ("Rimeblossom", "15c", 6),
    ]),
    ("Rathian Tree", [
        ("Wyvern Blade Verde I", "16a", 2),
        ("Wyvern Blade Verde II", "16b", 5),
        ("Wyvern Blade Holly", "16c", 5),
    ]),
    ("Rathalos Tree", [
        ("Wyvern Blade Blood I", "17a", 5),
        ("Wyvern Blade Blood II", "17b", 6),
        ("Wyvern Blade Maple", "17c", 6),
    ]),
    ("Bone Tree", [
        ("Serrated Jaw I", "18a", 1),
        ("Serrated Jaw II", "18b", 1),
        ("Serrated Maw", "18c", 2),
        ("Canine Katana I", "18d", 4),
        ("Canine Katana II", "18e", 5),
        ("Gnash Katana", "18f", 6),
    ]),
    ("Anjanath Tree", [
        ("Flammenschwert I", "19a", 3),
        ("Flammenschwert II", "19b", 5),
        ("Fervid Flammenschwert", "19c", 6),
    ]),
    ("Barioth Tree", [
        ("Bastine Edge I", "20a", 2),
        ("Bastine Edge II", "20b", 3),
        ("Bastizan Edge", "20c", 5),
    ]),
    ("Wroggi Tree", [
        ("Wroggi Sword I", "21a", 2),
        ("Wroggi Sword II", "21b", 3),
        ("Poison Barb", "21c", 4),
    ]),
    ("Baggi Tree", [
        ("Ananta Blade I", "22a", 1),
        ("Ananta Blade II", "22b", 2),
        ("Shadow Slasher", "22c", 4),
    ]),
    ("Bone Scythe Tree", [
        ("Bone Scythe I", "23a", 1),
        ("Bone Scythe II", "23b", 1),
        ("Bone Reaper", "23c", 2),
        ("Spark Slicer I", "23d", 2),
        ("Spark Slicer II", "23e", 3),
        ("Shocking Slicer", "23f", 5),
    ]),
    ("Jyuratodus Tree", [
        ("Jyura Saber I", "24a", 5),
        ("Jyura Saber II", "24b", 5),
        ("Jyura Reaver", "24c", 6),
    ]),
    ("Anteka Tree", [
        ("Anteka Blade I", "25a", 4),
        ("Anteka Blade II", "25b", 5),
        ("Anteka Rack", "25c", 6),
    ]),
    ("Somnacanth Tree", [
        ("Frilled Slash I", "26a", 2),
        ("Frilled Slash II", "26b", 3),
        ("Illusory Frilled Slash", "26c", 5),
    ]),
    ("Royal Ludroth Tree", [
        ("Drowning Shaft I", "27a", 2),
        ("Drowning Shaft II", "27b", 2),
        ("Douser Bardiche", "27c", 5),
    ]),
    ("Arzuros Tree", [
        ("Arzuros Naginata I", "28a", 1),
        ("Arzuros Naginata II", "28b", 2),
        ("Arzuros Strikequill", "28c", 4),
    ]),
    ("Izuchi Tree", [
        ("Wind Thief Scimitar I", "29a", 1),
        ("Wind Thief Scimitar II", "29b", 2),
        ("Gale Scimitar", "29c", 4),
    ]),
    ("Bone Scythe Tree 2", [
        ("Dark Scythe I", "30a", 4),
        ("Tormentor", "30b", 5),
    ]),
    ("Poison Tree", [
        ("Scythe of Menace I", "31a", 5),
        ("Scythe of Menace II", "31b", 5),
        ("Big Menacing Scythe", "31c", 6),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Long Sword I", "32a", 3),
        ("Sinister Long Sword II", "32b", 3),
        ("Sinister Shade Sword", "32c", 6),
    ]),
    ("Rajang Tree", [
        ("Demon Halberd I", "33a", 5),
        ("Demon Halberd II", "33b", 6),
        ("Great Demon Halberd", "33c", 7),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Long Sword I", "34a", 5),
        ("Azure Elder Long Sword II", "34b", 6),
        ("Abyssal Gale Sword", "34c", 7),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Long Sword I", "35a", 6),
        ("Abyssal Storm Sword", "35b", 7),
    ]),
    ("Bazelgeuse Tree", [
        ("Rookslayer Saber I", "36a", 6),
        ("Rookslayer Saber II", "36b", 6),
        ("Bazel Varga Rookslayer", "36c", 7),
    ]),
    ("Kushala Daora Tree", [
        ("Icesteel Blade I", "37a", 6),
        ("Daora's Raid", "37b", 7),
    ]),
    ("Teostra Tree", [
        ("Imperial Saber I", "38a", 6),
        ("Imperial Shimmer", "38b", 7),
    ]),
    ("Chameleos Tree", [
        ("Mirage Finsword I", "39a", 6),
        ("Phantom Mirage", "39b", 7),
    ]),
    ("Valstrax Tree", [
        ("Redwing Long Sword I", "40a", 6),
        ("Reddnaught Blade", "40b", 7),
    ]),
    ("Death Stench Tree", [
        ("Cawscythe I", "41a", 2),
        ("Cawscythe II", "41b", 3),
        ("Cawscythe III", "41c", 5),
        ("Squawkscythe", "41d", 6),
    ]),
    ("Hand-Me-Down Tree", [
        ("Hand-Me-Down Sword I", "42a", 3),
        ("Hand-Me-Down Sword II", "42b", 5),
        ("Kamura's Inheritance", "42c", 7),
    ]),
    ("Rampage Tree", [
        ("Rampage Blade I"  , "43a", 4),
        ("Rampage Blade II" , "43b", 5),
        ("Rampage Blade III", "43c", 5),
        ("Rampage Blade IV" , "43d", 6),
        ("Rampage Blade V"  , "43e", 6),
        ("Rampage Blade S"  , "43f", 7),
    ]),
]

HARDCODED_RAMP_SKILLS_LS = {
    "Rampage Blade I": [
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
    "Rampage Blade II": [
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
    "Rampage Blade III": [
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
    "Rampage Blade IV": [
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
    "Rampage Blade V": [
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
    "Rampage Blade S": [
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

