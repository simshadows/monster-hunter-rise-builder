"""
Filename: hammer.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Hammer data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_H_SPEC = [
    ("Kamura Tree", [
        ("Kamura Hammer I"    , "1a", 1),
        ("Kamura Hammer II"   , "1b", 1),
        ("Kamura Hammer III"  , "1c", 2),
        ("Kamura Hammer IV"   , "1d", 3),
        ("Kamura Hammer V"    , "1e", 4),
        ("Kamura Ninja Hammer", "1f", 5),
    ]),
    ("Mizutsune Tree", [
        ("Purity Hammer I", "2a", 3),
        ("Purity Hammer II", "2b", 5),
        ("Sinter Hammer", "2c", 6),
    ]),
    ("Volvidon Tree", [
        ("Binding Bludgeon I", "3a", 2),
        ("Binding Bludgeon II", "3b", 5),
        ("Armored Gogue", "3c", 5),
    ]),
    ("Almudron Tree", [
        ("Almudron Hammer I", "4a", 3),
        ("Almudron Hammer II", "4b", 4),
        ("Doom Bringer Hammer", "4c", 6),
    ]),
    ("Bishaten Tree", [
        ("Five-Pronged Hammer I", "5a", 2),
        ("Five-Pronged Hammer II", "5b", 5),
        ("Great Pronged Hammer", "5c", 6),
    ]),
    ("Wroggi Tree", [
        ("Wroggi Hammer I", "6a", 2),
        ("Wroggi Hammer II", "6b", 3),
        ("Dirty Hammer", "6c", 4),
    ]),
    ("Fire Tree", [
        ("Gun Hammer I", "7a", 2),
        ("Gun Hammer II", "7b", 4),
        ("Deadeye Revolver", "7c", 5),
    ]),
    ("Ore Tree", [
        ("Iron Hammer I", "8a", 1),
        ("Iron Devil", "8b", 1),
        ("War Hammer I", "8c", 2),
        ("War Mace", "8d", 3),
        ("War Stamp I", "8e", 4),
        ("War Basher", "8f", 5),
    ]),
    ("Thunder Tree", [
        ("Great Nova I", "9a", 5),
        ("Great Nova II", "9b", 5),
        ("Super Nova", "9c", 6),
    ]),
    ("Tigrex Tree", [
        ("Striped Striker I", "10a", 3),
        ("Striped Striker II", "10b", 6),
        ("Tigrex Hammer", "10c", 6),
    ]),
    ("Anjanath Tree", [
        ("Flaming Fury I", "11a", 3),
        ("Flaming Fury II", "11b", 5),
        ("Phoenix Fury", "11c", 6),
    ]),
    ("Barioth Tree", [
        ("Glacial Bash I", "12a", 2),
        ("Glacial Bash II", "12b", 3),
        ("Glacial Crunch", "12c", 5),
    ]),
    ("Kulu-Ya-Ku Tree", [
        ("Kulu Bludgeon I", "13a", 2),
        ("Kulu Bludgeon II", "13b", 2),
        ("Kulu Crusher", "13c", 4),
    ]),
    ("Paralysis Tree", [
        ("Devil Masher I", "14a", 4),
        ("Devil Masher II", "14b", 5),
        ("Iron Devil's Soul", "14c", 6),
    ]),
    ("Arzuros Tree", [
        ("Unbearable Hammer I", "15a", 1),
        ("Unbearable Hammer II", "15b", 2),
        ("Barbearic Hammer", "15c", 4),
    ]),
    ("Somnacanth Tree", [
        ("Frilled Blow I", "16a", 2),
        ("Frilled Blow II", "16b", 3),
        ("Illusory Frilled Blow", "16c", 5),
    ]),
    ("Khezu Tree", [
        ("Bag o' Horrors I", "17a", 2),
        ("Bag o' Horrors II", "17b", 2),
        ("Bag o' Thunder", "17c", 4),
    ]),
    ("Ice Tree", [
        ("Frozen Core I", "18a", 1),
        ("Frozen Core II", "18b", 2),
        ("Cocytus", "18c", 4),
    ]),
    ("Bone Tree", [
        ("Bone Hammer I", "19a", 1),
        ("Bone Hammer II", "19b", 1),
        ("Hard Bone Hammer", "19c", 2),
        ("Bone Bludgeon I", "19d", 3),
        ("Bone Bludgeon II", "19e", 4),
        ("Heavy Bone Bludgeon", "19f", 5),
    ]),
    ("Diablos Tree", [
        ("Diablos Hammer I", "20a", 6),
        ("Diablos Hammer II", "20b", 6),
        ("Diablos Tail", "20c", 7),
    ]),
    ("Bone Tree 2", [
        ("Cyclo-Hammer I", "21a", 3),
        ("Cyclo-Hammer II", "21b", 5),
        ("Atlas Hammer", "21c", 6),
    ]),
    ("Pukei-Pukei Tree", [
        ("Pukei Hammer I", "22a", 5),
        ("Pukei Hammer II", "22b", 5),
        ("Datura Club", "22c", 6),
    ]),
    ("Basarios Tree", [
        ("Basarios Blow I", "23a", 2),
        ("Basarios Blow II", "23b", 3),
        ("Basarios Bash", "23c", 5),
    ]),
    ("Rathalos Tree", [
        ("Red Bludgeon I", "24a", 5),
        ("Red Bludgeon II", "24b", 6),
        ("Huracan Hammer", "24c", 6),
    ]),
    ("Goss Harag Tree", [
        ("Yeti Hammer I", "25a", 3),
        ("Yeti Hammer II", "25b", 5),
        ("Yeti Hammer III", "25c", 6),
        ("Abominable Hammer", "25d", 6),
    ]),
    ("Zinogre Tree", [
        ("Usurper's Thunder I", "26a", 3),
        ("Usurper's Thunder II", "26b", 5),
        ("Despot's Crackle", "26c", 6),
    ]),
    ("Remobra Tree", [
        ("Calamitous Portent I", "27a", 2),
        ("Calamitous Portent II", "27b", 3),
        ("Catastrophic Portent", "27c", 4),
    ]),
    ("Royal Ludroth Tree", [
        ("Droth Splashhammer I", "28a", 2),
        ("Droth Splashhammer II", "28b", 2),
        ("Ludroth Dousehammer", "28c", 5),
    ]),
    ("Izuchi Tree", [
        ("Izuchi Hammer I", "29a", 1),
        ("Izuchi Hammer II", "29b", 1),
        ("Snapper Hammer", "29c", 4),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Breaker I", "30a", 3),
        ("Hidden Breaker II", "30b", 5),
        ("Night Eternal", "30c", 6),
    ]),
    ("Barroth Tree", [
        ("Carapace Hammer I", "31a", 2),
        ("Carapace Hammer II", "31b", 3),
        ("Barroth Hammer", "31c", 5),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Hammer I", "32a", 3),
        ("Sinister Hammer II", "32b", 3),
        ("Sinister Shade Hammer", "32c", 6),
    ]),
    ("Gargwa Tree", [
        ("Egg Hammer I", "33a", 4),
        ("Egg Hammer II", "33b", 5),
        ("Gargwa Hammer", "33c", 6),
    ]),
    ("Rajang Tree", [
        ("Mane Malice I", "34a", 5),
        ("Mane Malice II", "34b", 6),
        ("Mane Malice Rajang", "34c", 7),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Hammer I", "35a", 5),
        ("Azure Elder Hammer II", "35b", 6),
        ("Abyssal Gale Mauler", "35c", 7),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Hammer I", "36a", 6),
        ("Abyssal Storm Mauler", "36b", 7),
    ]),
    ("Kushala Daora Tree", [
        ("Icesteel Hammer I", "37a", 6),
        ("Daora's Colossus", "37b", 7),
    ]),
    ("Teostra Tree", [
        ("Teostra Cratermaker I", "38a", 6),
        ("Teostra Cratergouger", "38b", 7),
    ]),
    ("Chameleos Tree", [
        ("Genie's Expanse I", "39a", 6),
        ("Diamalto's Dream", "39b", 7),
    ]),
    ("Valstrax Tree", [
        ("Redwing Drill I", "40a", 6),
        ("Reddnaught Hammer", "40b", 7),
    ]),
    ("Guild Tree", [
        ("Teddybear I", "41a", 3),
        ("Teddybear II", "41b", 4),
        ("Sleepy Bear", "41c", 5),
    ]),
    ("Death Stench Tree", [
        ("Graceful Death I", "42a", 2),
        ("Graceful Death II", "42b", 3),
        ("Graceful Death III", "42c", 5),
        ("Yadora Morte", "42d", 6),
    ]),
    ("Mosgharl Tree", [
        ("Pumpking I", "43a", 2),
        ("Pumpking II", "43b", 3),
        ("Jack-'o-lantern King", "43c", 5),
    ]),
    ("Rampage Tree", [
        ("Rampage Hammer I"  , "44a", 4),
        ("Rampage Hammer II" , "44b", 5),
        ("Rampage Hammer III", "44c", 5),
        ("Rampage Hammer IV" , "44d", 6),
        ("Rampage Hammer V"  , "44e", 6),
        ("Rampage Hammer S"  , "44f", 7),
    ]),
]

HARDCODED_RAMP_SKILLS_H = {
    "Rampage Hammer I": [
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
    "Rampage Hammer II": [
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
    "Rampage Hammer III": [
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
    "Rampage Hammer IV": [
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
    "Rampage Hammer V": [
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
    "Rampage Hammer S": [
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

