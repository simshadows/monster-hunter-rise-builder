"""
Filename: bow.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Bow data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_B_SPEC = [
    ("Kamura Tree", [
        ("Kamura Iron Bow I"  , "1a"),
        ("Kamura Iron Bow II" , "1b"),
        ("Kamura Iron Bow III", "1c"),
        ("Kamura Iron Bow IV" , "1d"),
        ("Kamura Iron Bow V"  , "1e"),
        ("Kamura Ninja Bow"   , "1f"),
    ]),
    ("Rakna-Kadaki Tree", [
        ("Weaver of Flame I", "2a"),
        ("Weaver of Flame II", "2b"),
        ("Araknatorch", "2c"),
    ]),
    ("Mizutsune Tree", [
        ("Blessed Rain I", "3a"),
        ("Blessed Rain II", "3b"),
        ("Heaven's Manna", "3c"),
    ]),
    ("Bishaten Tree", [
        ("Dawn Ray Bow I", "4a"),
        ("Dawn Ray Bow II", "4b"),
        ("Summit's Grand Glow", "4c"),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Bow I", "5a"),
        ("Hidden Bow II", "5b"),
        ("Night Flight", "5c"),
    ]),
    ("Tobi-Kadachi Tree", [
        ("Kadachi Strikebow I", "6a"),
        ("Kadachi Strikebow II", "6b"),
        ("Kadachi Strikebow III", "6c"),
        ("Flying Kadachi Striker", "6d"),
    ]),
    ("Barioth Tree", [
        ("Ice Crest I", "7a"),
        ("Ice Crest II", "7b"),
        ("Ice Crest III", "7c"),
        ("Edelweiss", "7d"),
    ]),
    ("Wroggi Tree", [
        ("Wroggi Revolver I", "8a"),
        ("Wroggi Revolver II", "8b"),
        ("Hoodwinker's Revolver", "8c"),
    ]),
    ("Arzuros Tree", [
        ("Arzuros Bow I", "9a"),
        ("Arzuros Bow II", "9b"),
        ("Arzuros' Honeypot", "9c"),
    ]),
    ("Ore Tree", [
        ("Iron Bow I", "10a"),
        ("Iron Bow II", "10b"),
        ("Steel Bow", "10c"),
        ("Hunter's Stoutbow I", "10d"),
        ("Hunter's Stoutbow II", "10e"),
        ("Hunter's Proudbow", "10f"),
    ]),
    ("Ore Tree 2", [
        ("Yekla Arc I", "11a"),
        ("Yekla Arc II", "11b"),
        ("Herald's Battlebow", "11c"),
    ]),
    ("Ice Tree", [
        ("Crystalline Flower I", "12a"),
        ("Crystalline Flower II", "12b"),
        ("Heaven's Glaze", "12c"),
    ]),
    ("Almudron Tree", [
        ("Mud Shot I", "13a"),
        ("Mud Shot II", "13b"),
        ("Hail of Mud", "13c"),
    ]),
    ("Rathian Tree", [
        ("Queen Blaster I", "14a"),
        ("Queen Blaster II", "14b"),
        ("Queen's Melody", "14c"),
    ]),
    ("Rathalos Tree", [
        ("Prominence Bow I", "15a"),
        ("Prominence Bow II", "15b"),
        ("Dark Filament", "15c"),
    ]),
    ("Kulu-Ya-Ku Tree", [
        ("Kulu's Flight I", "16a"),
        ("Kulu's Flight II", "16b"),
        ("Kulu Piercer", "16c"),
    ]),
    ("Khezu Tree", [
        ("Khezu Bow I", "17a"),
        ("Khezu Bow II", "17b"),
        ("Galvanized Core", "17c"),
    ]),
    ("Bone Tree", [
        ("Bone Gun I", "18a"),
        ("Bone Gun II", "18b"),
        ("Hyper Bone Gun", "18c"),
        ("Hunter's Bow I", "18d"),
        ("Hunter's Bow II", "18e"),
        ("Master Hunter's Bow", "18f"),
    ]),
    ("Tigrex Tree", [
        ("Tigrex Archer I", "19a"),
        ("Tigrex Archer II", "19b"),
        ("Tigrex Whisker", "19c"),
    ]),
    ("Diablos Tree", [
        ("Diablos Coilbender I", "20a"),
        ("Diablos Coilbender II", "20b"),
        ("Tyrant Bow", "20c"),
    ]),
    ("Zinogre Tree", [
        ("Usurper's Rumble I", "21a"),
        ("Usurper's Rumble II", "21b"),
        ("Despot's Earlybolt", "21c"),
    ]),
    ("Pukei-Pukei Tree", [
        ("Pukei Bow I", "22a"),
        ("Pukei Bow II", "22b"),
        ("Venomtongue Strike", "22c"),
    ]),
    ("Anjanath Tree", [
        ("Flammenbogen I", "23a"),
        ("Flammenbogen II", "23b"),
        ("Flaming Rage Bow", "23c"),
    ]),
    ("Royal Ludroth Tree", [
        ("Spongia Bow I", "24a"),
        ("Spongia Bow II", "24b"),
        ("Spongia Bow III", "24c"),
        ("Porifera Bow", "24d"),
    ]),
    ("Baggi Tree", [
        ("Baggi Bow I", "25a"),
        ("Baggi Bow II", "25b"),
        ("Hypnoshot", "25c"),
    ]),
    ("Bnahabra Tree", [
        ("Arko Nulo I", "26a"),
        ("Arko Nulo II", "26b"),
        ("Arko Unu", "26c"),
        ("Arko Nulo Black I", "26d"),
        ("Arko Nulo Black II", "26e"),
        ("Arko Unu Black", "26f"),
    ]),
    ("Bnahabra (Thunder)", [
        ("Arko Nulo Yellow I", "27a"),
        ("Arko Nulo Yellow II", "27b"),
        ("Arko Unu Yellow", "27c"),
    ]),
    ("Bnahabra (Fire)", [
        ("Arko Nulo Red I", "28a"),
        ("Arko Nulo Red II", "28b"),
        ("Arko Unu Red", "28c"),
    ]),
    ("Bnahabra (Ice)", [
        ("Arko Nulo White I", "29a"),
        ("Arko Nulo White II", "29b"),
        ("Arko Unu White", "29c"),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Bow I", "30a"),
        ("Sinister Bow II", "30b"),
        ("Sinister Soulpiercer", "30c"),
    ]),
    ("Kelbi Tree", [
        ("Kelbi Stingshot I", "31a"),
        ("Kelbi Stingshot II", "31b"),
        ("Kelbi Strongshot", "31c"),
    ]),
    ("Rajang Tree", [
        ("Beast Thunderbow I", "32a"),
        ("Beast Thunderbow II", "32b"),
        ("Beastking Thunderbow", "32c"),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Bow I", "33a"),
        ("Azure Elder Bow II", "33b"),
        ("Abyssal Gale Bow", "33c"),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Bow I", "34a"),
        ("Abyssal Storm Bow", "34b"),
    ]),
    ("Kushala Daora Tree", [
        ("Icesteel Bow I", "35a"),
        ("Daora's Sagittarii", "35b"),
    ]),
    ("Teostra Tree", [
        ("Bow of Hope & Valor I", "36a"),
        ("Bow of Light & Courage", "36b"),
    ]),
    ("Chameleos Tree", [
        ("Genie's Grimoire I", "37a"),
        ("Demon's Guidance", "37b"),
    ]),
    ("Valstrax Tree", [
        ("Redwing Bow I", "38a"),
        ("Reddnaught Dragon Arc", "38b"),
    ]),
    ("Speartuna Tree", [
        ("Morsel Bowfish I", "39a"),
        ("Morsel Bowfish II", "39b"),
        ("Ample Bowfish", "39c"),
    ]),
    ("Felyne Tree", [
        ("Felyne Bow I", "40a"),
        ("Felyne Bow II", "40b"),
        ("Felyne Trickbow", "40c"),
    ]),
    ("Chaos Tree", [
        ("Chaos Bow I", "41a"),
        ("Chaos Bow II", "41b"),
        ("Chaotic Rapture", "41c"),
    ]),
    ("Edel Tree", [
        ("Ivory Bow I", "42a"),
        ("Ivory Bow II", "42b"),
        ("Frozen Bow", "42c"),
    ]),
    ("Spio Tree", [
        ("Arachnid Bow I", "43a"),
        ("Arachnid Bow II", "43b"),
        ("Arachnid Silverstring", "43c"),
    ]),
    ("Rampage Tree", [
        ("Rampage Bow I"  , "44a"),
        ("Rampage Bow II" , "44b"),
        ("Rampage Bow III", "44c"),
        ("Rampage Bow IV" , "44d"),
        ("Rampage Bow V"  , "44e"),
        ("Rampage Bow S"  , "44f"),
    ]),
]

