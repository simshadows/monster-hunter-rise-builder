"""
Filename: huntinghorn.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Hunting Horn data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_HH_SPEC = [
    ("Kamura Tree", [
        ("Kamura Chorus I"  , "1a", 1),
        ("Kamura Chorus II" , "1b", 1),
        ("Kamura Chorus III", "1c", 2),
        ("Kamura Chorus IV" , "1d", 3),
        ("Kamura Chorus V"  , "1e", 4),
        ("Kamura Ninja Horn", "1f", 5),
    ]),
    ("Mizutsune Tree", [
        ("Poetic Bell I", "2a", 3),
        ("Poetic Bell II", "2b", 5),
        ("Summoning Bell", "2c", 6),
    ]),
    ("Rakna-Kadaki Tree", [
        ("Sublime Bell I", "3a", 6),
        ("Sublime Bell II", "3b", 6),
        ("Araknahorn", "3c", 7),
    ]),
    ("Basarios Tree", [
        ("Basarios Rock I", "4a", 2),
        ("Basarios Rock Mk.II", "4b", 3),
        ("Gigant Rock", "4c", 5),
    ]),
    ("Zinogre Tree", [
        ("Usurper's Growl I", "5a", 3),
        ("Usurper's Growl II", "5b", 5),
        ("Despot's Thunderclap", "5c", 6),
    ]),
    ("Arzuros Tree", [
        ("Zurogong Primo I", "6a", 1),
        ("Zurogong Primo II", "6b", 2),
        ("Zurogong Secundo", "6c", 4),
    ]),
    ("Tigrex Tree", [
        ("Striped Dragonga I", "7a", 3),
        ("Striped Dragonga II", "7b", 6),
        ("Tigrex Horn", "7c", 6),
    ]),
    ("Barioth Tree", [
        ("Bariguiro I", "8a", 2),
        ("Bariguiro II", "8b", 5),
        ("Algiguiro", "8c", 6),
    ]),
    ("Somnacanth Tree", [
        ("Frilled Flute I", "9a", 2),
        ("Frilled Flute II", "9b", 3),
        ("Illusory Flute", "9c", 5),
    ]),
    ("Ore Tree", [
        ("Iron Horn I", "10a", 1),
        ("Wind Horn", "10b", 1),
        ("Metal Bagpipe I", "10c", 2),
        ("Great Bagpipe", "10d", 3),
        ("Heavy Bagpipe I", "10e", 4),
        ("Fortissimo", "10f", 4),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Harmonic I", "11a", 5),
        ("Hidden Harmonic II", "11b", 6),
        ("Cry in the Night", "11c", 6),
    ]),
    ("Pukei-Pukei Tree", [
        ("Pukei Bagpipe I", "12a", 2),
        ("Pukei Bagpipe II", "12b", 5),
        ("Datura Lurr", "12c", 6),
    ]),
    ("Anjanath Tree", [
        ("Flammenkornett I", "13a", 5),
        ("Flammenkornett II", "13b", 6),
        ("Forte Flammenkornett", "13c", 6),
    ]),
    ("Rathian Tree", [
        ("Valkyrie Chordmaker I", "14a", 2),
        ("Valkyrie Chordmaker II", "14b", 3),
        ("Queen Chordmaker", "14c", 5),
    ]),
    ("Barroth Tree", [
        ("Sandpipe I", "15a", 2),
        ("Sandpipe II", "15b", 3),
        ("Sandcrier", "15c", 5),
    ]),
    ("Tetranadon Tree", [
        ("Frog Flute I", "16a", 2),
        ("Frog Flute II", "16b", 4),
        ("Amphibia Allargando", "16c", 6),
    ]),
    ("Izuchi Tree", [
        ("Wind Thief Horn I", "17a", 1),
        ("Wind Thief Horn II", "17b", 2),
        ("Gale Horn", "17c", 4),
    ]),
    ("Royal Ludroth Tree", [
        ("Droth Drone I", "18a", 2),
        ("Droth Drone II", "18b", 2),
        ("Droth Roar", "18c", 5),
    ]),
    ("Bone Tree", [
        ("Bone Horn I", "19a", 1),
        ("Bone Horn II", "19b", 1),
        ("Hardened Bone Horn", "19c", 3),
        ("Hunter's Horn I", "19d", 4),
        ("Native's Horn", "19e", 5),
    ]),
    ("Diablos Tree", [
        ("Duo Horn I", "20a", 6),
        ("Duo Horn II", "20b", 6),
        ("Duo Risoluto", "20c", 7),
    ]),
    ("Bullfango Tree", [
        ("Bull Grunt I", "21a", 4),
        ("Bull Grunt II", "21b", 5),
        ("Wild Grunt", "21c", 6),
    ]),
    ("Rathalos Tree", [
        ("Flame Feroce I", "22a", 3),
        ("Flame Feroce II", "22b", 5),
        ("Rathalos Feroce", "22c", 6),
    ]),
    ("Kulu-Ya-Ku Tree", [
        ("Kulu Mosso I", "23a", 2),
        ("Kulu Mosso II", "23b", 3),
        ("Kulu Grosso", "23c", 4),
    ]),
    ("Khezu Tree", [
        ("Khezu Horn I", "24a", 2),
        ("Khezu Horn II", "24b", 2),
        ("Khezu Flute", "24c", 4),
    ]),
    ("Bnahabra Tree", [
        ("Vicello Nulo I", "25a", 1),
        ("Vicello Nulo II", "25b", 1),
        ("Vicello Unu", "25c", 3),
        ("Vicello Nulo Black I", "25d", 4),
        ("Vicello Nulo Black II", "25e", 5),
        ("Vicello Uno Black", "25f", 6),
    ]),
    ("Bnahabra (Paralysis)", [
        ("Vicello Nulo Green I", "26a", 2),
        ("Vicello Nulo Green II", "26b", 5),
        ("Vicello Unu Green", "26c", 6),
    ]),
    ("Bnahabra (Paralysis)", [
        ("Vicello Nulo White I", "27a", 1),
        ("Vicello Nulo White II", "27b", 3),
        ("Vicello Unu White", "27c", 5),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Strum I", "28a", 3),
        ("Sinister Strum II", "28b", 3),
        ("Sinister Shadestrum", "28c", 6),
    ]),
    ("Rajang Tree", [
        ("Denden Daiko I", "29a", 5),
        ("Denden Daiko II", "29b", 6),
        ("Denden Doomsounder", "29c", 7),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Horn I", "30a", 5),
        ("Azure Elder Horn II", "30b", 6),
        ("Abyssal Gale Horn", "30c", 7),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Horn I", "31a", 6),
        ("Abyssal Storm Horn", "31b", 7),
    ]),
    ("Bazelgeuse Tree", [
        ("Rookslayer Drum I", "32a", 6),
        ("Rookslayer Drum II", "32b", 6),
        ("Bazelreid Rookslayer", "32c", 7),
    ]),
    ("Kushala Daora Tree", [
        ("Daora's Taus I", "33a", 6),
        ("Daora's Baphophone", "33b", 7),
    ]),
    ("Teostra Tree", [
        ("Teostra's Tiple I", "34a", 6),
        ("Teostra's Orphee", "34b", 7), # Will need to be fixed to include the accent
    ]),
    ("Chameleos Tree", [
        ("Blessed Ocarina I", "35a", 6),
        ("Cursed Ocarina", "35b", 7),
    ]),
    ("Valstrax Tree", [
        ("Redwing Flute I", "36a", 6),
        ("Reddnaught Ritmico", "36b", 7),
    ]),
    ("Chaos Tree", [
        ("Poison Fungasax I", "37a", 2),
        ("Poison Fungasax II", "37b", 3),
        ("Toxic Fungasax", "37c", 4),
    ]),
    ("Magia Tree", [
        ("Magia Charm I", "38a", 2),
        ("Magia Charm II", "38b", 3),
        ("Magia Charm III", "38c", 4),
        ("Magia Charmbell", "38d", 6),
    ]),
    ("Spio Tree", [
        ("Cornupion I", "39a", 3),
        ("Cornupion II", "39b", 3),
        ("Webbed Cornupion", "39c", 5),
    ]),
    ("Bombadgy Tree", [
        ("Grass Flute I", "40a", 3),
        ("Grass Flute II", "40b", 4),
        ("Bombadgy's Cry", "40c", 5),
    ]),
    ("Rampage Tree", [
        ("Rampage Agitato I"  , "41a", 4),
        ("Rampage Agitato II" , "41b", 5),
        ("Rampage Agitato III", "41c", 5),
        ("Rampage Agitato IV" , "41d", 6),
        ("Rampage Agitato V"  , "41e", 6),
        ("Rampage Agitato S"  , "41f", 7),
    ]),
]

HARDCODED_RAMP_SKILLS_HH = {
    "Rampage Agitato I": [
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
    "Rampage Agitato II": [
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
            "attack_melody_1",
            "defensive_melody_1",
            "healing_melody_1",
            "resilient_melody_1"
        ]
    ],
    "Rampage Agitato III": [
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
            "attack_melody_1",
            "defensive_melody_1",
            "healing_melody_1",
            "resilient_melody_1"
        ]
    ],
    "Rampage Agitato IV": [
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
            "attack_melody_2",
            "defensive_melody_2",
            "healing_melody_2",
            "resilient_melody_2"
        ]
    ],
    "Rampage Agitato V": [
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
            "attack_melody_2",
            "defensive_melody_2",
            "healing_melody_2",
            "resilient_melody_2"
        ]
    ],
    "Rampage Agitato S": [
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
            "attack_melody_2",
            "defensive_melody_2",
            "healing_melody_2",
            "resilient_melody_2"
        ]
    ],
}

