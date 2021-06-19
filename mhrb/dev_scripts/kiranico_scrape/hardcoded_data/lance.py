"""
Filename: lance.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Lance data
"""

# Specification to build the data
# {category: [(tree name, parent_weapon_id, [(name, id, rarity), ...]), ...]}
HARDCODED_L_SPEC = [
    ("Kamura Tree", None, [
        ("Kamura Spear I"    , "1a"),
        ("Kamura Spear II"   , "1b"),
        ("Kamura Spear III"  , "1c"),
        ("Kamura Spear IV"   , "1d"),
        ("Kamura Spear V"    , "1e"),
        ("Kamura Ninja Spear", "1f"),
    ]),
    ("Goss Harag Tree", "1c", [
        ("Goss Lance I", "2a"),
        ("Goss Lance II", "2b"),
        ("Abominable Lance", "2c"),
    ]),
    ("Mizutsune Tree", "1c", [
        ("Hana Mo Hana Nare I", "3a"),
        ("Hana Mo Hana Nare II", "3b"),
        ("Kimi Ga Kiru", "3c"),
    ]),
    ("Remobra Tree", "1c", [
        ("Naag Serpentblade I", "4a"),
        ("Naag Serpentblade II", "4b"),
        ("Devta Serpentblade", "4c"),
    ]),
    ("Tetranadon Tree", "1b", [
        ("Distension I", "5a"),
        ("Distension II", "5b"),
        ("Croaker", "5c"),
    ]),
    ("Izuchi Tree", "1b", [
        ("Wind Thief Lance I", "6a"),
        ("Wind Thief Lance II", "6b"),
        ("Gale Lance", "6c"),
    ]),
    ("Zamite Tree", "1b", [
        ("Sharktooth Spear I", "7a"),
        ("Sharktooth Spear II", "7b"),
        ("Razortooth Spear", "7c"),
    ]),
    ("Ore Tree", None, [
        ("Iron Lance I", "8a"),
        ("Iron Lance II", "8b"),
        ("Millennial Lance", "8c"),
        ("Paladin Lance I", "8d"),
        ("Paladin Lance II", "8e"),
        ("Rampart", "8f"),
    ]),
    ("Ore Tree 2", "8d", [
        ("Babel Spear I", "9a"),
        ("Babel Spear II", "9b"),
        ("Elder Babel Spear", "9c"),
    ]),
    ("Basarios Tree", "9a", [
        ("Venom Lance I", "10a"),
        ("Venom Lance II", "10b"),
        ("Basarios Venom Spear", "10c"),
    ]),
    ("Nargacuga Tree", "8c", [
        ("Hidden Stinger I", "11a"),
        ("Hidden Stinger II", "11b"),
        ("Night Rains Black", "11c"),
    ]),
    ("Dragon Tree", "8c", [
        ("Growling Wyvern I", "12a"),
        ("Growling Wyvern II", "12b"),
        ("Roaring Wyvern", "12c"),
    ]),
    ("Tobi-Kadachi Tree", "8b", [
        ("Kadachi Lance I", "13a"),
        ("Kadachi Lance II", "13b"),
        ("Shockspear", "13c"),
    ]),
    ("Aknosom Tree", "8b", [
        ("Aknosom Lance I", "14a"),
        ("Aknosom Lance II", "14b"),
        ("Aknosom Lance III", "14c"),
        ("Dawnbreaker Lance", "14d"),
    ]),
    ("Barroth Tree", "8b", [
        ("Rugged Lance I", "15a"),
        ("Rugged Lance II", "15b"),
        ("Barroth Carver", "15c"),
    ]),
    ("Thunder Tree", "15b", [
        ("Drill Lance I", "16a"),
        ("Drill Lance II", "16b"),
        ("Gigadrill Lance", "16c"),
    ]),
    ("Volvidon Tree", "15a", [
        ("Volvi Stroke I", "17a"),
        ("Volvi Stroke II", "17b"),
        ("Volvi Sweep", "17c"),
    ]),
    ("Fire Tree", "8a", [
        ("Heat Lance I", "18a"),
        ("Heat Lance II", "18b"),
        ("Heatstinger", "18c"),
    ]),
    ("Bone Tree", None, [
        ("Bone Lance I", "19a"),
        ("Hard Bone Lance", "19b"),
        ("Longhorn Spear I", "19c"),
        ("Longtusk Spear", "19d"),
        ("Barbarian Tusk I", "19e"),
        ("Barbarian Fang", "19f"),
    ]),
    ("Tigrex Tree", "19f", [
        ("Tiger Stinger I", "20a"),
        ("Tiger Stinger II", "20b"),
        ("Tigrex Lance", "20c"),
    ]),
    ("Barioth Tree", "19c", [
        ("Tusk Lance I", "21a"),
        ("Tusk Lance II", "21b"),
        ("Sabertooth", "21c"),
    ]),
    ("Pukei-Pukei Tree", "19c", [
        ("Pukei Spear I", "22a"),
        ("Pukei Spear II", "22b"),
        ("Datura Spear", "22c"),
    ]),
    ("Rathalos Tree", "22a", [
        ("Red Tail I", "23a"),
        ("Red Tail II", "23b"),
        ("Spear of Prominence", "23c"),
    ]),
    ("Royal Ludroth Tree", "19b", [
        ("Spiral Lance I", "24a"),
        ("Spiral Lance II", "24b"),
        ("Spiral Splash", "24c"),
    ]),
    ("Rhenoplos Tree", "19b", [
        ("Ploshasta I", "25a"),
        ("Ploshasta II", "25b"),
        ("Rhenohasta", "25c"),
    ]),
    ("Diablos Tree", "25a", [
        ("Diablos Lance I", "26a"),
        ("Diablos Lance II", "26b"),
        ("Diablos Spear", "26c"),
    ]),
    ("Kulu-Ya-Ku Tree", "19b", [
        ("Kulu Spear I", "27a"),
        ("Kulu Spear II", "27b"),
        ("Kulu Skewer", "27c"),
    ]),
    ("Zinogre Tree", "27b", [
        ("Usurper's Coming I", "28a"),
        ("Usurper's Coming II", "28b"),
        ("Despot's Cacophony", "28c"),
    ]),
    ("Baggi Tree", "19a", [
        ("Azure Crest I", "29a"),
        ("Azure Crest II", "29b"),
        ("Azure Crest III", "29c"),
        ("Great Azure", "29d"),
    ]),
    ("Magnamalo Tree", None, [
        ("Sinister Spear I", "30a"),
        ("Sinister Spear II", "30b"),
        ("Sinister Shadespear", "30c"),
    ]),
    ("Rajang Tree", None, [
        ("Demon Lance I", "31a"),
        ("Demon Lance II", "31b"),
        ("Great Demon Lance", "31c"),
    ]),
    ("Ibushi Tree", None, [
        ("Azure Elder Spear I", "32a"),
        ("Azure Elder Spear II", "32b"),
        ("Abyssal Gale Lance", "32c"),
    ]),
    ("Narwa Tree", None, [
        ("Thunderbolt Spear I", "33a"),
        ("Abyssal Storm Lance", "33b"),
    ]),
    ("Bazelgeuse Tree", None, [
        ("Rookslayer Lance I", "34a"),
        ("Rookslayer Lance II", "34b"),
        ("Bazel Myniad Lance", "34c"),
    ]),
    ("Kushala Daora Tree", None, [
        ("Icesteel Spear I", "35a"),
        ("Daora's Fang", "35b"),
    ]),
    ("Teostra Tree", None, [
        ("Teostra's Howl I", "36a"),
        ("Teostra's Roar", "36b"),
    ]),
    ("Valstrax Tree", None, [
        ("Redwing Spear I", "37a"),
        ("Reddnaught Spear", "37b"),
    ]),
    ("Chaos Tree", None, [
        ("Plegis Needle I", "38a"),
        ("Plegis Needle II", "38b"),
        ("Mighty Plegis", "38c"),
    ]),
    ("Spio Tree", None, [
        ("Alacrantze I", "39a"),
        ("Alacrantze II", "39b"),
        ("Alacrantze III", "39c"),
        ("Scorpion Lance", "39d"),
    ]),
    ("Melahoa Tree", None, [
        ("Fragrance I", "40a"),
        ("Fragrance II", "40b"),
        ("Classy Fragrance", "40c"),
    ]),
    ("Rampage Tree", None, [
        ("Rampage Spear I"  , "41a"),
        ("Rampage Spear II" , "41b"),
        ("Rampage Spear III", "41c"),
        ("Rampage Spear IV" , "41d"),
        ("Rampage Spear V"  , "41e"),
        ("Rampage Spear S"  , "41f"),
    ]),
]

