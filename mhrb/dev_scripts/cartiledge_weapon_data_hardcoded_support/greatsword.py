"""
Filename: greatsword.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Greatsword data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_GS_SPEC = [
    ("Kamura Tree", [
        ("Kamura Cleaver I"    , "1a", 1),
        ("Kamura Cleaver II"   , "1b", 1),
        ("Kamura Cleaver III"  , "1c", 2),
        ("Kamura Cleaver IV"   , "1d", 3),
        ("Kamura Cleaver V"    , "1e", 4),
        ("Kamura Ninja Cleaver", "1f", 5),
    ]),
    ("Goss Harag Tree", [
        ("Gossblade I", "2a", 3),
        ("Gossblade II", "2b", 5),
        ("Abominable Great Sword", "2c", 6),
    ]),
    ("Mizutsune Tree", [
        ("Hanayako Yohino I", "3a", 3),
        ("Hanayako Yohino II", "3b", 5),
        ("Akanesasu", "3c", 6),
    ]),
    ("Great Sword Tree", [
        ("Axeblade I", "4a", 2),
        ("Axeblade II", "4b", 3),
        ("Colossal Axeblade", "4c", 4),
    ]),
    ("Barroth Tree", [
        ("Carapace Sword I", "5a", 2),
        ("Carapace Sword II", "5b", 2),
        ("Carapace Blade", "5c", 5),
    ]),
    ("Tigrex Tree", [
        ("Tiger Jawblade I", "6a", 3),
        ("Tiger Jawblade II", "6b", 6),
        ("Tigrex Great Sword", "6c", 6),
    ]),
    ("Khezu Tree", [
        ("Khezu Shock Sword I", "7a", 2),
        ("Khezu Shock Sword II", "7b", 3),
        ("Khezu Shock Blade", "7c", 4),
    ]),
    ("Izuchi Tree", [
        ("Izuchi Blade I", "8a", 1),
        ("Izuchi Blade II", "8b", 1),
        ("Snapper Blade", "8c", 4),
    ]),
    ("Remobra Tree", [
        ("Deadly Serpentblade I", "9a", 2),
        ("Deadly Serpentblade II", "9b", 3),
        ("Poison Serpentblade", "9c", 5),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Blade I", "10a", 3),
        ("Hidden Blade II", "10b", 5),
        ("Dark of Night", "10c", 6),
    ]),
    ("Somnacanth Tree", [
        ("Frilled Blade I", "11a", 2),
        ("Frilled Blade II", "11b", 4),
        ("Illusory Frilled Blade", "11c", 5),
    ]),
    ("Ore Tree", [
        ("Iron Sword I", "12a", 1),
        ("Steel Sword", "12b", 1),
        ("Buster Sword I", "12c", 2),
        ("Buster Blade", "12d", 3),
        ("Chrome Razor I", "12e", 4),
        ("Chrome Quietus", "12f", 5),
    ]),
    ("Fire Tree", [
        ("Barbaroi Blade I", "13a", 2),
        ("Barbaroi Blade II", "13b", 3),
        ("Crimson Goat", "13c", 5),
    ]),
    ("Pukei-Pukei Tree", [
        ("Pukei Edge I", "14a", 2),
        ("Pukei Edge II", "14b", 3),
        ("Datura Cleaver", "14c", 5),
    ]),
    ("Barioth Tree", [
        ("Icicle Fang I", "15a", 2),
        ("Icicle Fang II", "15b", 3),
        ("Paladire", "15c", 5),
    ]),
    ("Aknosom Tree", [
        ("Aknosom Blade I", "16a", 2),
        ("Aknosom Blade II", "16b", 3),
        ("Daybreak Cleaver", "16c", 4),
    ]),
    ("Tetranadon Tree", [
        ("Tetranadon Edge I", "17a", 2),
        ("Tetranadon Edge II", "17b", 3),
        ("Tetranadon Cutter", "17c", 4),
    ]),
    ("Bone Tree", [
        ("Bone Blade I", "18a", 1),
        ("Bone Slasher", "18b", 1),
        ("Jawblade I", "18c", 2),
        ("Giant Jawblade", "18d", 2),
        ("Wyvern Fang I", "18e", 3),
        ("Great Wyvern Fang", "18f", 5),
    ]),
    ("Bone Tree 2", [
        ("Golem Blade I", "19a", 4),
        ("Blade of Talos", "19b", 5),
    ]),
    ("Rathian Tree", [
        ("Valkyrie Blade I", "20a", 5),
        ("Valkyrie Blade II", "20b", 5),
        ("Sieglinde", "20c", 6),
    ]),
    ("Jyuratodus Tree", [
        ("Jyura Mudblade I", "21a", 5),
        ("Jyura Mudblade II", "21b", 5),
        ("Terracutter", "21c", 6),
    ]),
    ("Rathalos Tree", [
        ("Red Wing I", "22a", 5),
        ("Red Wing II", "22b", 6),
        ("Rathalos Firesword", "22c", 6),
    ]),
    ("Diablos Tree", [
        ("Quarrel Hornsword I", "23a", 3),
        ("Quarrel Hornsword II", "23b", 6),
        ("Feud Hornsword", "23c", 6),
    ]),
    ("Jaggi & Jaggia Tree", [
        ("Hack Blade I", "24a", 2),
        ("Hack Blade II", "24b", 2),
        ("Jaggi Greatblade", "24c", 5),
    ]),
    ("Anjanath Tree", [
        ("Flammenzahn I", "25a", 3),
        ("Flammenzahn II", "25b", 5),
        ("Gnashing Flammenzahn", "25c", 6),
    ]),
    ("Zinogre Tree", [
        ("Usurper's Storm I", "26a", 3),
        ("Usurper's Storm II", "26b", 5),
        ("Despot's Blackstorm", "26c", 6),
    ]),
    ("Royal Ludroth Tree", [
        ("Cataclysm Sword I", "27a", 2),
        ("Cataclysm Sword II", "27b", 2),
        ("Cataclysm Blade", "27c", 5),
    ]),
    ("Lagombi Tree", [
        ("Snowclad I", "28a", 1),
        ("Snowclad II", "28b", 2),
        ("Lagombi Charlotte", "28c", 4),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Blade I", "29a", 3),
        ("Sinister Blade II", "29b", 3),
        ("Sinister Shadowblade", "29c", 6),
    ]),
    ("Rajang Tree", [
        ("Demon Rod I", "30a", 5),
        ("Demon Rod II", "30b", 6),
        ("Great Demon Rod", "30c", 7),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Great Sword I", "31a", 5),
        ("Azure Elder Great Sword II", "31b", 6),
        ("Abyssal Galeblade", "31c", 7),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Great Sword I", "32a", 6),
        ("Abyssal Storm Cleaver", "32b", 7),
    ]),
    ("Kushala Daora Tree", [
        ("Icesteel Edge I", "33a", 6),
        ("Daora's Decimator", "33b", 7),
    ]),
    ("Teostra Tree", [
        ("Teostra Blade I", "34a", 6),
        ("King Teostra Blade", "34b", 7),
    ]),
    ("Chameleos Tree", [
        ("Grand Shamshir I", "35a", 6),
        ("Foreboding Shamshir", "35b", 7),
    ]),
    ("Valstrax Tree", [
        ("Redwing Claymore I", "36a", 6),
        ("Reddnaught Claymore", "36b", 7),
    ]),
    ("Chaos Tree", [
        ("Wyvern's Perch I", "37a", 2),
        ("Wyvern's Perch II", "37b", 4),
        ("Roguish Deathcap", "37c", 5),
    ]),
    ("Shell-Studded Tree", [
        ("Sleepy Shellblade I", "38a", 2),
        ("Sleepy Shellblade II", "38b", 3),
        ("Soporific Shellblade", "38c", 5),
    ]),
    ("Speartuna Tree", [
        ("Frozen Speartuna I", "39a", 4),
        ("Frozen Speartuna II", "39b", 5),
        ("Freezer Speartuna", "39c", 6),
    ]),
    ("Smithy Tree", [
        ("Ninja Parasol I", "40a", 3),
        ("Ninja Parasol II", "40b", 4),
        ("Dragonslayer Parasol", "40c", 5),
    ]),
    ("Felyne Tree", [
        ("Cat's Soul I", "41a", 4),
        ("Cat's Soul II", "41b", 5),
        ("Cat's Curse", "41c", 6),
    ]),
    ("Rampage Tree", [
        ("Rampage Cleaver I"  , "42a", 4),
        ("Rampage Cleaver II" , "42b", 5),
        ("Rampage Cleaver III", "42c", 5),
        ("Rampage Cleaver IV" , "42d", 6),
        ("Rampage Cleaver V"  , "42e", 6),
        ("Rampage Cleaver S"  , "42f", 7),
    ]),
]

HARDCODED_RAMP_SKILLS_GS = {
    "Rampage Cleaver I": [
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
    "Rampage Cleaver II": [
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
    "Rampage Cleaver III": [
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
            "affinity_surge"
        ]
    ],
    "Rampage Cleaver IV": [
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
            "affinity_surge"
        ]
    ],
    "Rampage Cleaver V": [
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
                "affinity_surge"
            ]
    ],
    "Rampage Cleaver S": [
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
                "affinity_surge"
            ]
    ],
}

