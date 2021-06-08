"""
Filename: longsword.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Longsword data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_LS_SPEC = [
    ("Kamura Tree", [
        ("Kamura Blade I"    , "1a"),
        ("Kamura Blade II"   , "1b"),
        ("Kamura Blade III"  , "1c"),
        ("Kamura Blade IV"   , "1d"),
        ("Kamura Blade V"    , "1e"),
        ("Kamura Ninja Blade", "1f"),
    ]),
    ("Zinogre Tree", [
        ("Usurper Boltslicer I", "2a"),
        ("Usurper Boltslicer II", "2b"),
        ("Despot Boltbreaker", "2c"),
    ]),
    ("Aknosom Tree", [
        ("Aknosom Sabre I", "3a"),
        ("Aknosom Sabre II", "3b"),
        ("Daybreak Blade", "3c"),
    ]),
    ("Lagombi Tree", [
        ("Ivory Rabbit I", "4a"),
        ("Ivory Rabbit II", "4b"),
        ("Iced Rabbit", "4c"),
    ]),
    ("Long Sword Tree", [
        ("Guardian Sword I", "5a"),
        ("Guardian Sword II", "5b"),
        ("Imperial Sword", "5c"),
    ]),
    ("Barroth Tree", [
        ("Castello Saif I", "6a"),
        ("Castello Saif II", "6b"),
        ("Castellum Long Sword", "6c"),
    ]),
    ("Basarios Tree", [
        ("Gigant Makra I", "7a"),
        ("Gigant Makra II", "7b"),
        ("Titanic Makra", "7c"),
    ]),
    ("Almudron Tree", [
        ("Almudron Blade I", "8a"),
        ("Almudron Blade II", "8b"),
        ("Doom Bringer Blade", "8c"),
    ]),
    ("Ore Tree", [
        ("Iron Katana I", "9a"),
        ("Iron Katana II", "9b"),
        ("Iron Gospel", "9c"),
        ("Keen Edge I", "9d"),
        ("Keen Edge II", "9e"),
        ("Julienne Blade", "9f"),
    ]),
    ("Tigrex Tree", [
        ("Tigrine Edge I", "10a"),
        ("Tigrine Edge II", "10b"),
        ("Tigrine Need", "10c"),
    ]),
    ("Mizutsune Tree", [
        ("Kakaru Kumo Naki I", "11a"),
        ("Kakaru Kumo Naki II", "11b"),
        ("Tamonowo", "11c"),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Saber I", "12a"),
        ("Hidden Saber II", "12b"),
        ("Deepest Night", "12c"),
    ]),
    ("Thunder Tree", [
        ("Eager Cleaver I", "13a"),
        ("Eager Cleaver II", "13b"),
        ("Devil Slicer", "13c"),
    ]),
    ("Kulu-Ya-Ku Tree", [
        ("Kulu Katana I", "14a"),
        ("Kulu Katana II", "14b"),
        ("Kulu Slicer", "14c"),
    ]),
    ("Ice Tree", [
        ("Chillblade I", "15a"),
        ("Chillblade II", "15b"),
        ("Rimeblossom", "15c"),
    ]),
    ("Rathian Tree", [
        ("Wyvern Blade Verde I", "16a"),
        ("Wyvern Blade Verde II", "16b"),
        ("Wyvern Blade Holly", "16c"),
    ]),
    ("Rathalos Tree", [
        ("Wyvern Blade Blood I", "17a"),
        ("Wyvern Blade Blood II", "17b"),
        ("Wyvern Blade Maple", "17c"),
    ]),
    ("Bone Tree", [
        ("Serrated Jaw I", "18a"),
        ("Serrated Jaw II", "18b"),
        ("Serrated Maw", "18c"),
        ("Canine Katana I", "18d"),
        ("Canine Katana II", "18e"),
        ("Gnash Katana", "18f"),
    ]),
    ("Anjanath Tree", [
        ("Flammenschwert I", "19a"),
        ("Flammenschwert II", "19b"),
        ("Fervid Flammenschwert", "19c"),
    ]),
    ("Barioth Tree", [
        ("Bastine Edge I", "20a"),
        ("Bastine Edge II", "20b"),
        ("Bastizan Edge", "20c"),
    ]),
    ("Wroggi Tree", [
        ("Wroggi Sword I", "21a"),
        ("Wroggi Sword II", "21b"),
        ("Poison Barb", "21c"),
    ]),
    ("Baggi Tree", [
        ("Ananta Blade I", "22a"),
        ("Ananta Blade II", "22b"),
        ("Shadow Slasher", "22c"),
    ]),
    ("Bone Scythe Tree", [
        ("Bone Scythe I", "23a"),
        ("Bone Scythe II", "23b"),
        ("Bone Reaper", "23c"),
        ("Spark Slicer I", "23d"),
        ("Spark Slicer II", "23e"),
        ("Shocking Slicer", "23f"),
    ]),
    ("Jyuratodus Tree", [
        ("Jyura Saber I", "24a"),
        ("Jyura Saber II", "24b"),
        ("Jyura Reaver", "24c"),
    ]),
    ("Anteka Tree", [
        ("Anteka Blade I", "25a"),
        ("Anteka Blade II", "25b"),
        ("Anteka Rack", "25c"),
    ]),
    ("Somnacanth Tree", [
        ("Frilled Slash I", "26a"),
        ("Frilled Slash II", "26b"),
        ("Illusory Frilled Slash", "26c"),
    ]),
    ("Royal Ludroth Tree", [
        ("Drowning Shaft I", "27a"),
        ("Drowning Shaft II", "27b"),
        ("Douser Bardiche", "27c"),
    ]),
    ("Arzuros Tree", [
        ("Arzuros Naginata I", "28a"),
        ("Arzuros Naginata II", "28b"),
        ("Arzuros Strikequill", "28c"),
    ]),
    ("Izuchi Tree", [
        ("Wind Thief Scimitar I", "29a"),
        ("Wind Thief Scimitar II", "29b"),
        ("Gale Scimitar", "29c"),
    ]),
    ("Bone Scythe Tree 2", [
        ("Dark Scythe I", "30a"),
        ("Tormentor", "30b"),
    ]),
    ("Poison Tree", [
        ("Scythe of Menace I", "31a"),
        ("Scythe of Menace II", "31b"),
        ("Big Menacing Scythe", "31c"),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Long Sword I", "32a"),
        ("Sinister Long Sword II", "32b"),
        ("Sinister Shade Sword", "32c"),
    ]),
    ("Rajang Tree", [
        ("Demon Halberd I", "33a"),
        ("Demon Halberd II", "33b"),
        ("Great Demon Halberd", "33c"),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Long Sword I", "34a"),
        ("Azure Elder Long Sword II", "34b"),
        ("Abyssal Gale Sword", "34c"),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Long Sword I", "35a"),
        ("Abyssal Storm Sword", "35b"),
    ]),
    ("Bazelgeuse Tree", [
        ("Rookslayer Saber I", "36a"),
        ("Rookslayer Saber II", "36b"),
        ("Bazel Varga Rookslayer", "36c"),
    ]),
    ("Kushala Daora Tree", [
        ("Icesteel Blade I", "37a"),
        ("Daora's Raid", "37b"),
    ]),
    ("Teostra Tree", [
        ("Imperial Saber I", "38a"),
        ("Imperial Shimmer", "38b"),
    ]),
    ("Chameleos Tree", [
        ("Mirage Finsword I", "39a"),
        ("Phantom Mirage", "39b"),
    ]),
    ("Valstrax Tree", [
        ("Redwing Long Sword I", "40a"),
        ("Reddnaught Blade", "40b"),
    ]),
    ("Death Stench Tree", [
        ("Cawscythe I", "41a"),
        ("Cawscythe II", "41b"),
        ("Cawscythe III", "41c"),
        ("Squawkscythe", "41d"),
    ]),
    ("Hand-Me-Down Tree", [
        ("Hand-Me-Down Sword I", "42a"),
        ("Hand-Me-Down Sword II", "42b"),
        ("Kamura's Inheritance", "42c"),
    ]),
    ("Rampage Tree", [
        ("Rampage Blade I"  , "43a"),
        ("Rampage Blade II" , "43b"),
        ("Rampage Blade III", "43c"),
        ("Rampage Blade IV" , "43d"),
        ("Rampage Blade V"  , "43e"),
        ("Rampage Blade S"  , "43f"),
    ]),
]

