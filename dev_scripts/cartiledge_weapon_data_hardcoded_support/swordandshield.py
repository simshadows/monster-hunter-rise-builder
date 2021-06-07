"""
Filename: swordandshield.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Sword and Shield data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_SNS_SPEC = [
    ("Kamura Tree", [
        ("Kamura Sword I"    , "1a", 1),
        ("Kamura Sword II"   , "1b", 1),
        ("Kamura Sword III"  , "1c", 2),
        ("Kamura Sword IV"   , "1d", 3),
        ("Kamura Sword V"    , "1e", 4),
        ("Kamura Ninja Sword", "1f", 5),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Edge I", "2a", 4),
        ("Hidden Edge II", "2b", 5),
        ("Flash in the Night", "2c", 6),
    ]),
    ("Mizutsune Tree", [
        ("Hana no Nagoriwo I", "3a", 3),
        ("Hana no Nagoriwo II", "3b", 5),
        ("Kurenawi Ougi", "3c", 6),
    ]),
    ("Bishaten Tree", [
        ("Exorcising Sword I", "4a", 2),
        ("Exorcising Sword II", "4b", 5),
        ("Shaucha Pureblade", "4c", 6),
    ]),
    ("Zinogre Tree", [
        ("Usurper's Firebolt I", "5a", 3),
        ("Usurper's Firebolt II", "5b", 5),
        ("Despot's Crookbolt", "5c", 6),
    ]),
    ("Wroggi Tree", [
        ("Dirty Baron I", "6a", 2),
        ("Dirty Baron II", "6b", 3),
        ("Dirty Marquis", "6c", 4),
    ]),
    ("Royal Ludroth Tree", [
        ("Royal Claw I", "7a", 2),
        ("Royal Claw II", "7b", 2),
        ("Royal Ludroth Claw", "7c", 5),
    ]),
    ("Tigrex Tree", [
        ("Rex Talon I", "8a", 3),
        ("Rex Talon II", "8b", 6),
        ("Tigrex Sword", "8c", 6),
    ]),
    ("Ice Tree", [
        ("Frost Edge I", "9a", 1),
        ("Frost Edge II", "9b", 2),
        ("Hi Frost Edge", "9c", 5),
    ]),
    ("Ore Tree", [
        ("Hunter's Knife I", "10a", 1),
        ("Hunter's Knife II", "10b", 1),
        ("Fighter Sword", "10c", 2),
        ("Iron Beater I", "10d", 3),
        ("Iron Beater II", "10e", 4),
        ("Smithy's Pride", "10f", 5),
    ]),
    ("Jaggi & Jaggia Tree", [
        ("Soldier's Dagger I", "11a", 5),
        ("Soldier's Dagger II", "11b", 5),
        ("Commander's Dagger", "11c", 6),
    ]),
    ("Water Tree", [
        ("Odyssey Blade I", "12a", 4),
        ("Odyssey Blade II", "12b", 5),
        ("Master Odyssey", "12c", 6),
    ]),
    ("Pukei-Pukei Tree", [
        ("Pukei Sword I", "13a", 2),
        ("Pukei Sword II", "13b", 5),
        ("Venomedge", "13c", 6),
    ]),
    ("Rathalos Tree", [
        ("Djinn I", "14a", 3),
        ("Djinn II", "14b", 5),
        ("Blazing Falchion", "14c", 6),
    ]),
    ("Barioth Tree", [
        ("Icicle Spike I", "15a", 2),
        ("Icicle Spike II", "15b", 3),
        ("Nardebosche", "15c", 5),
    ]),
    ("Tetranadon Tree", [
        ("Cunning Riposte I", "16a", 2),
        ("Cunning Riposte II", "16b", 3),
        ("Guard Breaker", "16c", 4),
    ]),
    ("Khezu Tree", [
        ("Khezu Razor I", "17a", 2),
        ("Khezu Razor II", "17b", 2),
        ("Painful Razor", "17c", 4),
    ]),
    ("Baggi Tree", [
        ("Hypnos Knife I", "18a", 1),
        ("Hypnos Knife II", "18b", 2),
        ("Morpheus Knife", "18c", 4),
    ]),
    ("Bone Tree", [
        ("Bone Kukri I", "19a", 1),
        ("Bone Kukri II", "19b", 1),
        ("Chief Kukri", "19c", 2),
        ("Bone Barong I", "19d", 3),
        ("Bone Barong II", "19e", 4),
        ("Grand Barong", "19f", 5),
    ]),
    ("Rathian Tree", [
        ("Princess Rapier I", "20a", 5),
        ("Princess Rapier II", "20b", 6),
        ("Queen Rapier", "20c", 6),
    ]),
    ("Bone Tree 2", [
        ("Bone Tabar I", "21a", 3),
        ("Bone Tabar II", "21b", 4),
        ("Ragdos Tabar", "21c", 6),
    ]),
    ("Barroth Tree", [
        ("Carapace Mace I", "22a", 2),
        ("Carapace Mace II", "22b", 3),
        ("Barroth Club", "22c", 5),
    ]),
    ("Diablos Tree", [
        ("Studded Club I", "23a", 3),
        ("Studded Club II", "23b", 6),
        ("Spiked Bat", "23c", 6),
    ]),
    ("Bullfango Tree", [
        ("Brash Buddies I", "24a", 2),
        ("Brash Buddies II", "24b", 3),
        ("Cocky Comrades", "24c", 5),
    ]),
    ("Anjanath Tree", [
        ("Flammensucher I", "25a", 5),
        ("Flammensucher II", "25b", 6),
        ("Gnashing Flammensucher", "25c", 6),
    ]),
    ("Goss Harag Tree", [
        ("Mincing Blade I", "26a", 3),
        ("Mincing Blade II", "26b", 6),
        ("Chef's Knife", "26c", 6),
    ]),
    ("Izuchi Tree", [
        ("Izuchi Sickle I", "27a", 1),
        ("Izuchi Sickle II", "27b", 1),
        ("Snapper Sickle", "27c", 4),
    ]),
    ("Uroktor Tree", [
        ("Lava Pick I", "28a", 2),
        ("Lava Pick II", "28b", 3),
        ("Burly Beak", "28c", 5),
    ]),
    ("Bnahabra Tree", [
        ("Secta Nulo I", "29a", 1),
        ("Secta Unu", "29b", 2),
        ("Secta Nulo White I", "29c", 3),
        ("Secta Unu White", "29d", 4),
    ]),
    ("Bnahabra (Dragon)", [
        ("Secta Nulo Black I", "30a", 4),
        ("Secta Nulo Black II", "30b", 5),
        ("Secta Unu Black", "30c", 6),
    ]),
    ("Bnahabra (Paralysis)", [
        ("Secta Nulo Green I", "31a", 2),
        ("Secta Unu Green", "31b", 5),
    ]),
    ("Bnahabra (Thunder)", [
        ("Secta Nulo Yellow I", "32a", 2),
        ("Secta Unu Yellow", "32b", 5),
    ]),
    ("Bnahabra (Fire)", [
        ("Secta Nulo Red I", "33a", 1),
        ("Secta Nulo Red II", "33b", 2),
        ("Secta Unu Red", "33c", 4),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Sword I", "34a", 3),
        ("Sinister Sword II", "34b", 3),
        ("Sinister Shadekeeper", "34c", 6),
    ]),
    ("Rajang Tree", [
        ("Rajang Club I", "35a", 5),
        ("Rajang Club II", "35b", 6),
        ("Banned Rajang Club", "35c", 7),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Sword I", "36a", 5),
        ("Azure Elder Sword II", "36b", 6),
        ("Abyssal Gale Shredder", "36c", 7),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Sword I", "37a", 6),
        ("Abyssal Storm Shredder", "37b", 7),
    ]),
    ("Kushala Daora Tree", [
        ("Icesteel Dagger I", "38a", 6),
        ("Daora's Razor", "38b", 7),
    ]),
    ("Teostra Tree", [
        ("Teostra's Spada I", "39a", 6),
        ("Teostra's Emblem", "39b", 7),
    ]),
    ("Valstrax Tree", [
        ("Redwing Swiftblade I", "40a", 6),
        ("Vermilion Orgul", "40b", 7),
    ]),
    ("Shell-Studded Tree", [
        ("Sleepy Shellsword I", "41a", 2),
        ("Sleepy Shellsword II", "41b", 3),
        ("Waking Nightmare", "41c", 5),
    ]),
    ("Felyne Tree", [
        ("Catspaw I", "42a", 1),
        ("Catspaw II", "42b", 3),
        ("Catburglar", "42c", 4),
    ]),
    ("Guild Tree", [
        ("Ninja Sword I", "43a", 6),
        ("Hi Ninja Sword", "43b", 7),
    ]),
    ("Rampage Tree", [
        ("Rampage Sword I"  , "44a", 4),
        ("Rampage Sword II" , "44b", 5),
        ("Rampage Sword III", "44c", 5),
        ("Rampage Sword IV" , "44d", 6),
        ("Rampage Sword V"  , "44e", 6),
        ("Rampage Sword S"  , "44f", 7),
    ]),
]

HARDCODED_RAMP_SKILLS_SNS = {
    "Rampage Sword I": [
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
    "Rampage Sword II": [
        [
            "attack_boost_1",
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
    "Rampage Sword III": [
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
    "Rampage Sword IV": [
        [
            "attack_boost_2",
            "elemental_boost_1",
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
    "Rampage Sword V": [
        [
            "attack_boost_3",
            "elemental_boost_1",
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
    "Rampage Sword S": [
        [
            "attack_boost_4",
            "elemental_boost_1",
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

