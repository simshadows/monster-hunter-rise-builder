"""
Filename: switchaxe.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Switch Axe data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_SA_SPEC = [
    ("Kamura Tree", [
        ("Kamura Iron Axe I"  , "1a", 1),
        ("Kamura Iron Axe II" , "1b", 1),
        ("Kamura Iron Axe III", "1c", 2),
        ("Kamura Iron Axe IV" , "1d", 3),
        ("Kamura Iron Axe V"  , "1e", 4),
        ("Kamura Ninja Axe"   , "1f", 5),
    ]),
    ("Mizutsune Tree", [
        ("Fond Farewell I", "2a", 3),
        ("Fond Farewell II", "2b", 5),
        ("Parting Slice", "2c", 6),
    ]),
    ("Rathalos Tree", [
        ("Rath Flamesplitter I", "3a", 3),
        ("Rath Flamesplitter II", "3b", 3),
        ("Rath Flamesplitter III", "3c", 5),
        ("Rath Blaze Splitter", "3d", 6),
    ]),
    ("Bishaten Tree", [
        ("Wheel Axe I", "4a", 2),
        ("Wheel Axe II", "4b", 5),
        ("Axe of Wisdom", "4c", 6),
    ]),
    ("Delex Tree", [
        ("Delex Sail I", "5a", 2),
        ("Delex Sail II", "5b", 3),
        ("Delex Cleaver", "5c", 5),
    ]),
    ("Khezy Tree", [
        ("Khezu Axe I", "6a", 2),
        ("Khezu Axe II", "6b", 2),
        ("Khezu Cleaver", "6c", 4),
    ]),
    ("Arzuros Tree", [
        ("Arzuros Axe I", "7a", 1),
        ("Arzuros Axe II", "7b", 2),
        ("Arzuros Revelax", "7c", 4),
    ]),
    ("Barioth Tree", [
        ("Amber Slash I", "8a", 2),
        ("Amber Slash II", "8b", 3),
        ("Amber Slash III", "8c", 5),
        ("Amber Hoarfrost", "8d", 6),
    ]),
    ("Ore Tree", [
        ("Proto Iron Axe I", "9a", 1),
        ("Proto Iron Axe II", "9b", 1),
        ("Improved Steel Axe", "9c", 2),
        ("Elite Switch Axe I", "9d", 3),
        ("Elite Switch Axe II", "9e", 4),
        ("Czar Switch Axe", "9f", 5),
    ]),
    ("Jyuratodus Tree", [
        ("Limus Os I", "10a", 5),
        ("Limus Os II", "10b", 5),
        ("Luto Ascia", "10c", 6),
    ]),
    ("Rathian Tree", [
        ("Dragonmaiden Axe I", "11a", 5),
        ("Dragonmaiden Axe II", "11b", 5),
        ("Grior's Landmaker", "11c", 6),
    ]),
    ("Ore Tree 2", [
        ("General's Strongaxe I", "12a", 4),
        ("General's Strongaxe II", "12b", 5),
        ("Conqueress", "12c", 6),
    ]),
    ("Thunder Tree", [
        ("The Shredder I", "13a", 3),
        ("The Shredder II", "13b", 3),
        ("The Power Shredder", "13c", 5),
    ]),
    ("Dragon Tree", [
        ("Ash Drache I", "14a", 4),
        ("Ash Drache II", "14b", 5),
        ("Fall Drache", "14c", 6),
    ]),
    ("Almudron Tree", [
        ("Almudron Axe I", "15a", 3),
        ("Almudron Axe II", "15b", 4),
        ("Doom Bringer Axe", "15c", 6),
    ]),
    ("Aknosom Tree", [
        ("Axenosom I", "16a", 2),
        ("Axenosom II", "16b", 2),
        ("Axenosom III", "16c", 4),
        ("Daybreak Silvaris", "16d", 5),
    ]),
    ("Barroth Tree", [
        ("Assault Axe I", "17a", 2),
        ("Assault Axe II", "17b", 3),
        ("Blitzkrieg", "17c", 5),
    ]),
    ("Baggi Tree", [
        ("Snowfall Axe I", "18a", 1),
        ("Snowfall Axe II", "18b", 2),
        ("Snowfall Axe III", "18c", 4),
        ("Dewdrop Dream", "18d", 5),
    ]),
    ("Bone Tree", [
        ("Bone Axe I", "19a", 1),
        ("Bone Axe II", "19b", 1),
        ("Daidalos Axe", "19c", 2),
        ("Power Gasher I", "19d", 3),
        ("Power Gasher II", "19e", 4),
        ("Maximal Gasher", "19f", 5),
    ]),
    ("Anjanath Tree", [
        ("Flammenbeil I", "20a", 5),
        ("Flammenbeil II", "20b", 6),
        ("Gnashing Flammenbeil", "20c", 6),
    ]),
    ("Tigrex Tree", [
        ("Rex Slasher I", "21a", 3),
        ("Rex Slasher II", "21b", 6),
        ("Rex Gnasher", "21c", 6),
    ]),
    ("Diablos Tree", [
        ("Axe Semper Tyrannis I", "22a", 6),
        ("Axe Semper Tyrannis II", "22b", 6),
        ("Grand Chaos", "22c", 7),
    ]),
    ("Remobra Tree", [
        ("Venom Hatchet I", "23a", 2),
        ("Venom Hatchet II", "23b", 3),
        ("Mortal Serpent", "23c", 4),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Axe I", "24a", 3),
        ("Hidden Axe II", "24b", 5),
        ("Night's Crescent", "24c", 6),
    ]),
    ("Volvidon Tree", [
        ("Binding Roller I", "25a", 2),
        ("Binding Roller II", "25b", 3),
        ("Binding Roller III", "25c", 5),
        ("Vermilingua", "25d", 6),
    ]),
    ("Royal Ludroth Tree", [
        ("Ludroth Axe I", "26a", 2),
        ("Ludroth Axe II", "26b", 2),
        ("Splish Splax", "26c", 5),
    ]),
    ("Zinogre Tree", [
        ("Usurper's Downpour I", "27a", 3),
        ("Usurper's Downpour II", "27b", 5),
        ("Despot's Cloudburst", "27c", 5),
    ]),
    ("Lagombi Tree", [
        ("Longear Axe I", "28a", 1),
        ("Longear Axe II", "28b", 3),
        ("Longear Axe III", "28c", 4),
        ("Longear Weiss", "28d", 5),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Axe I", "29a", 3),
        ("Sinister Axe II", "29b", 3),
        ("Sinister Shadowslice", "29c", 6),
    ]),
    ("Rajang Tree", [
        ("Undying Axe I", "30a", 5),
        ("Undying Axe II", "30b", 6),
        ("Undying Light", "30c", 7),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Axe I", "31a", 5),
        ("Azure Elder Axe II", "31b", 6),
        ("Abyssal Gale Axe", "31c", 7),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Axe I", "32a", 6),
        ("Abyssal Storm Axe", "32b", 7),
    ]),
    ("Bazelgeuse Tree", [
        ("Rookslayer Axe I", "33a", 6),
        ("Rookslayer Axe II", "33b", 6),
        ("Bazelrush Rookslayer", "33c", 7),
    ]),
    ("Kushala Daora Tree", [
        ("Daora's Farasa I", "34a", 6),
        ("Daora's Janah", "34b", 7),
    ]),
    ("Teostra Tree", [
        ("Teostra's Arx I", "35a", 6),
        ("Teostra's Castle", "35b", 7),
    ]),
    ("Chameleos Tree", [
        ("Waxglare Wand I", "36a", 6),
        ("Balor's Mirage", "36b", 7),
    ]),
    ("Valstrax Tree", [
        ("Redwing Switch Axe I", "37a", 6),
        ("Reddnaught Dunat", "37b", 7),
    ]),
    ("Smithy Tree", [
        ("Origami Axe I", "38a", 3),
        ("Origami Axe II", "38b", 4),
        ("Petal Cloud", "38c", 5),
    ]),
    ("Felyne Tree", [
        ("Grim Cat I", "39a", 4),
        ("Grim Cat II", "39b", 5),
        ("Grimmige Katze", "39c", 6),
    ]),
    ("Death Stench Tree", [
        ("Infernal Axe I", "40a", 2),
        ("Infernal Axe II", "40b", 3),
        ("Hellish Edge", "40c", 5),
    ]),
    ("Shell-Studded Tree", [
        ("Sleepy Shellslice I", "41a", 2),
        ("Sleepy Shellslice II", "41b", 3),
        ("Schale Batis", "41c", 5),
    ]),
    ("Rampage Tree", [
        ("Rampage Slicer I"  , "42a", 4),
        ("Rampage Slicer II" , "42b", 5),
        ("Rampage Slicer III", "42c", 5),
        ("Rampage Slicer IV" , "42d", 6),
        ("Rampage Slicer V"  , "42e", 6),
        ("Rampage Slicer S"  , "42f", 7),
    ]),
]

HARDCODED_RAMP_SKILLS_SA = {
        "Rampage Slicer I": [
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
        "Rampage Slicer II": [
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
                "phial_element",
                "phial_poison_1",
                "phial_paralysis_1",
                "phial_dragon_1",
                "phial_exhaust_1"
            ]
        ],
        "Rampage Slicer III": [
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
                "phial_element",
                "phial_poison_1",
                "phial_paralysis_1",
                "phial_dragon_1",
                "phial_exhaust_1"
            ]
        ],
        "Rampage Slicer IV": [
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
                "phial_element",
                "phial_poison_2",
                "phial_paralysis_2",
                "phial_dragon_2",
                "phial_exhaust_2"
            ]
        ],
        "Rampage Slicer V": [
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
                "phial_element",
                "phial_poison_2",
                "phial_paralysis_2",
                "phial_dragon_2",
                "phial_exhaust_2"
            ]
        ],
        "Rampage Slicer S": [
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
                "phial_element",
                "phial_poison_3",
                "phial_paralysis_3",
                "phial_dragon_3",
                "phial_exhaust_3"
            ]
        ],
}

