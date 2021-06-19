"""
Filename: longsword.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Longsword data
"""

# Specification to build the data
# {category: [(tree name, parent_weapon_id, [(name, id, rarity), ...]), ...]}
HARDCODED_LS_SPEC = [
    ("Kamura Tree", None, [
        ("Kamura Blade I"    , "1a"),
        ("Kamura Blade II"   , "1b"),
        ("Kamura Blade III"  , "1c"),
        ("Kamura Blade IV"   , "1d"),
        ("Kamura Blade V"    , "1e"),
        ("Kamura Ninja Blade", "1f"),
    ]),
    ("Zinogre Tree", "1c", [
        ("Usurper Boltslicer I", "2a"),
        ("Usurper Boltslicer II", "2b"),
        ("Despot Boltbreaker", "2c"),
    ]),
    ("Aknosom Tree", "1b", [
        ("Aknosom Sabre I", "3a"),
        ("Aknosom Sabre II", "3b"),
        ("Daybreak Blade", "3c"),
    ]),
    ("Lagombi Tree", "1b", [
        ("Ivory Rabbit I", "4a"),
        ("Ivory Rabbit II", "4b"),
        ("Iced Rabbit", "4c"),
    ]),
    ("Long Sword Tree", "1b", [
        ("Guardian Sword I", "5a"),
        ("Guardian Sword II", "5b"),
        ("Imperial Sword", "5c"),
    ]),
    ("Barroth Tree", "5a", [
        ("Castello Saif I", "6a"),
        ("Castello Saif II", "6b"),
        ("Castellum Long Sword", "6c"),
    ]),
    ("Basarios Tree", "6a", [
        ("Gigant Makra I", "7a"),
        ("Gigant Makra II", "7b"),
        ("Titanic Makra", "7c"),
    ]),
    ("Almudron Tree", "7a", [
        ("Almudron Blade I", "8a"),
        ("Almudron Blade II", "8b"),
        ("Doom Bringer Blade", "8c"),
    ]),
    ("Ore Tree", None, [
        ("Iron Katana I", "9a"),
        ("Iron Katana II", "9b"),
        ("Iron Gospel", "9c"),
        ("Keen Edge I", "9d"),
        ("Keen Edge II", "9e"),
        ("Julienne Blade", "9f"),
    ]),
    ("Tigrex Tree", "9d", [
        ("Tigrine Edge I", "10a"),
        ("Tigrine Edge II", "10b"),
        ("Tigrine Need", "10c"),
    ]),
    ("Mizutsune Tree", "9c", [
        ("Kakaru Kumo Naki I", "11a"),
        ("Kakaru Kumo Naki II", "11b"),
        ("Tamonowo", "11c"),
    ]),
    ("Nargacuga Tree", "9c", [
        ("Hidden Saber I", "12a"),
        ("Hidden Saber II", "12b"),
        ("Deepest Night", "12c"),
    ]),
    ("Thunder Tree", "9b", [
        ("Eager Cleaver I", "13a"),
        ("Eager Cleaver II", "13b"),
        ("Devil Slicer", "13c"),
    ]),
    ("Kulu-Ya-Ku Tree", "9b", [
        ("Kulu Katana I", "14a"),
        ("Kulu Katana II", "14b"),
        ("Kulu Slicer", "14c"),
    ]),
    ("Ice Tree", "14b", [
        ("Chillblade I", "15a"),
        ("Chillblade II", "15b"),
        ("Rimeblossom", "15c"),
    ]),
    ("Rathian Tree", "14a", [
        ("Wyvern Blade Verde I", "16a"),
        ("Wyvern Blade Verde II", "16b"),
        ("Wyvern Blade Holly", "16c"),
    ]),
    ("Rathalos Tree", "16b", [
        ("Wyvern Blade Blood I", "17a"),
        ("Wyvern Blade Blood II", "17b"),
        ("Wyvern Blade Maple", "17c"),
    ]),
    ("Bone Tree", None, [
        ("Serrated Jaw I", "18a"),
        ("Serrated Jaw II", "18b"),
        ("Serrated Maw", "18c"),
        ("Canine Katana I", "18d"),
        ("Canine Katana II", "18e"),
        ("Gnash Katana", "18f"),
    ]),
    ("Anjanath Tree", "18c", [
        ("Flammenschwert I", "19a"),
        ("Flammenschwert II", "19b"),
        ("Fervid Flammenschwert", "19c"),
    ]),
    ("Barioth Tree", "18b", [
        ("Bastine Edge I", "20a"),
        ("Bastine Edge II", "20b"),
        ("Bastizan Edge", "20c"),
    ]),
    ("Wroggi Tree", "18b", [
        ("Wroggi Sword I", "21a"),
        ("Wroggi Sword II", "21b"),
        ("Poison Barb", "21c"),
    ]),
    ("Baggi Tree", "18a", [
        ("Ananta Blade I", "22a"),
        ("Ananta Blade II", "22b"),
        ("Shadow Slasher", "22c"),
    ]),
    ("Bone Scythe Tree", None, [
        ("Bone Scythe I", "23a"),
        ("Bone Scythe II", "23b"),
        ("Bone Reaper", "23c"),
        ("Spark Slicer I", "23d"),
        ("Spark Slicer II", "23e"),
        ("Shocking Slicer", "23f"),
    ]),
    ("Jyuratodus Tree", "23e", [
        ("Jyura Saber I", "24a"),
        ("Jyura Saber II", "24b"),
        ("Jyura Reaver", "24c"),
    ]),
    ("Anteka Tree", "23e", [
        ("Anteka Blade I", "25a"),
        ("Anteka Blade II", "25b"),
        ("Anteka Rack", "25c"),
    ]),
    ("Somnacanth Tree", "23c", [
        ("Frilled Slash I", "26a"),
        ("Frilled Slash II", "26b"),
        ("Illusory Frilled Slash", "26c"),
    ]),
    ("Royal Ludroth Tree", "23c", [
        ("Drowning Shaft I", "27a"),
        ("Drowning Shaft II", "27b"),
        ("Douser Bardiche", "27c"),
    ]),
    ("Arzuros Tree", "23a", [
        ("Arzuros Naginata I", "28a"),
        ("Arzuros Naginata II", "28b"),
        ("Arzuros Strikequill", "28c"),
    ]),
    ("Izuchi Tree", "23a", [
        ("Wind Thief Scimitar I", "29a"),
        ("Wind Thief Scimitar II", "29b"),
        ("Gale Scimitar", "29c"),
    ]),
    ("Bone Scythe Tree 2", "29b", [
        ("Dark Scythe I", "30a"),
        ("Tormentor", "30b"),
    ]),
    ("Poison Tree", "30a", [
        ("Scythe of Menace I", "31a"),
        ("Scythe of Menace II", "31b"),
        ("Big Menacing Scythe", "31c"),
    ]),
    ("Magnamalo Tree", None, [
        ("Sinister Long Sword I", "32a"),
        ("Sinister Long Sword II", "32b"),
        ("Sinister Shade Sword", "32c"),
    ]),
    ("Rajang Tree", None, [
        ("Demon Halberd I", "33a"),
        ("Demon Halberd II", "33b"),
        ("Great Demon Halberd", "33c"),
    ]),
    ("Ibushi Tree", None, [
        ("Azure Elder Long Sword I", "34a"),
        ("Azure Elder Long Sword II", "34b"),
        ("Abyssal Gale Sword", "34c"),
    ]),
    ("Narwa Tree", None, [
        ("Thunderbolt Long Sword I", "35a"),
        ("Abyssal Storm Sword", "35b"),
    ]),
    ("Bazelgeuse Tree", None, [
        ("Rookslayer Saber I", "36a"),
        ("Rookslayer Saber II", "36b"),
        ("Bazel Varga Rookslayer", "36c"),
    ]),
    ("Kushala Daora Tree", None, [
        ("Icesteel Blade I", "37a"),
        ("Daora's Raid", "37b"),
    ]),
    ("Teostra Tree", None, [
        ("Imperial Saber I", "38a"),
        ("Imperial Shimmer", "38b"),
    ]),
    ("Chameleos Tree", None, [
        ("Mirage Finsword I", "39a"),
        ("Phantom Mirage", "39b"),
    ]),
    ("Valstrax Tree", None, [
        ("Redwing Long Sword I", "40a"),
        ("Reddnaught Blade", "40b"),
    ]),
    ("Death Stench Tree", None, [
        ("Cawscythe I", "41a"),
        ("Cawscythe II", "41b"),
        ("Cawscythe III", "41c"),
        ("Squawkscythe", "41d"),
    ]),
    ("Hand-Me-Down Tree", None, [
        ("Hand-Me-Down Sword I", "42a"),
        ("Hand-Me-Down Sword II", "42b"),
        ("Kamura's Inheritance", "42c"),
    ]),
    ("Rampage Tree", None, [
        ("Rampage Blade I"  , "43a"),
        ("Rampage Blade II" , "43b"),
        ("Rampage Blade III", "43c"),
        ("Rampage Blade IV" , "43d"),
        ("Rampage Blade V"  , "43e"),
        ("Rampage Blade S"  , "43f"),
    ]),
]

