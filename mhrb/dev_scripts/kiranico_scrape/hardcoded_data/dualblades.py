"""
Filename: dualblades.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Dual Blades data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_DB_SPEC = [
    ("Kamura Tree", [
        ("Kamura Glintblades I"  , "1a"),
        ("Kamura Glintblades II" , "1b"),
        ("Kamura Glintblades III", "1c"),
        ("Kamura Glintblades IV" , "1d"),
        ("Kamura Glintblades V"  , "1e"),
        ("Kamura Ninja Blades"   , "1f"),
    ]),
    ("Almudron Tree", [
        ("Mud Ripper I" , "2a"),
        ("Mud Ripper II", "2b"),
        ("Mud Twister"  , "2c"),
    ]),
    ("Zinogre Tree", [
        ("Usurper's Fulgur I" , "3a"),
        ("Usurper's Fulgur II", "3b"),
        ("Despot's Blitz"     , "3c"),
    ]),
    ("Barioth Tree", [
        ("Blizzarioths I"       , "4a"),
        ("Blizzarioths II"      , "4b"),
        ("Mountain Blizzarioths", "4c"),
    ]),
    ("Wroggi Tree", [
        ("Desperado I"  , "5a"),
        ("Desperado II" , "5b"),
        ("The Kid", "5c"),
    ]),
    ("Khezu Tree", [
        ("Khezu Daggers I" , "6a"),
        ("Khezu Daggers II", "6b"),
        ("Khezu Skards"    , "6c"),
    ]),
    ("Ore Tree", [
        ("Matched Slicers I" , "7a"),
        ("Matched Slicers II", "7b"),
        ("Dual Daggers"      , "7c"),
        ("Hurricane I"       , "7d"),
        ("Hurricane II"      , "7e"),
        ("Cyclone"           , "7f"),
    ]),
    ("Tigrex Tree", [
        ("Rex Slicers I" , "8a"),
        ("Rex Slicers II", "8b"),
        ("Tigrex Claws"  , "8c"),
    ]),
    ("Mizutsune Tree", [
        ("Morning Dawn I" , "9a"),
        ("Morning Dawn II", "9b"),
        ("Evening Dusk"   , "9c"),
    ]),
    ("Aknosom Tree", [
        ("Schirmscorn I"   , "10a"),
        ("Schirmscorn II"  , "10b"),
        ("Daybreak Daggers", "10c"),
    ]),
    ("Kulu-Ya-Ku Tree", [
        ("Kulu's Peck I" , "11a"),
        ("Kulu's Peck II", "11b"),
        ("Kulu's Lasher" , "11c"),
    ]),
    ("Ice Tree", [
        ("Gelid Mind I" , "12a"),
        ("Gelid Mind II", "12b"),
        ("Gelid Soul"   , "12c"),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Gemini I" , "13a"),
        ("Hidden Gemini II", "13b"),
        ("Night Wings"     , "13c"),
    ]),
    ("Thunder Tree", [
        ("Twin Chainsaws I" , "14a"),
        ("Twin Chainsaws II", "14b"),
        ("Guillotines"      , "14c"),
    ]),
    ("Ore Tree 2", [
        ("Dual Hatchets I" , "15a"),
        ("Dual Hatchets II", "15b"),
        ("Dual Cleavers"   , "15c"),
    ]),
    ("Arzuros Tree", [
        ("Cerulean Axes I" , "16a"),
        ("Cerulean Axes II", "16b"),
        ("Ashigara Axes"   , "16c"),
    ]),
    ("Anjanath Tree", [
        ("Flammenschild I"       , "17a"), # Real name: "Flammenschild"
        ("Flammenschild II"      , "17b"), # Real name: "Flammenschild"
        ("Gnashing Flammenschild", "17c"),
    ]),
    ("Bone Tree", [
        ("Bone Hatchets I"   , "18a"),
        ("Bone Hatchets II"  , "18b"),
        ("Wild Hatchets"     , "18c"),
        ("Talon Carvers I"   , "18d"),
        ("Talon Carvers II"  , "18e"),
        ("Talon Twins", "18f"),
    ]),
    ("Rathalos Tree", [
        ("Twin Flames I" , "19a"),
        ("Twin Flames II", "19b"),
        ("Wyvern Lovers" , "19c"),
    ]),
    ("Diablos Tree", [
        ("Diablos Bashers I" , "20a"),
        ("Diablos Bashers II", "20b"),
        ("Diablos Mashers"   , "20c"),
    ]),
    ("Jyuratodus Tree", [
        ("Jyura Duo I"      , "21a"),
        ("Jyura Duo II"     , "21b"),
        ("Jyura Pulverizers", "21c"),
    ]),
    ("Tobi-Kadachi Tree", [
        ("Kadachi Twinblades I" , "22a"),
        ("Kadachi Twinblades II", "22b"),
        ("Shockblades"          , "22c"),
    ]),
    ("Fire Tree", [
        ("Blazeblades I"  , "23a"),
        ("Blazeblades II" , "23b"),
        ("Infernal Furies", "23c"),
    ]),
    ("Royal Ludroth Tree", [
        ("Ludroth Pair I" , "24a"),
        ("Ludroth Pair II", "24b"),
        ("Double Droth"   , "24c"),
    ]),
    ("Somnacanth Tree", [
        ("Frilled Claw I"       , "25a"),
        ("Frilled Claw II"      , "25b"),
        ("Illusory Frilled Claw", "25c"),
    ]),
    ("Lagombi Tree", [
        ("Snow Slicers I" , "26a"),
        ("Snow Slicers II", "26b"),
        ("Snow Sisters"   , "26c"),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Blades I"    , "27a"),
        ("Sinister Blades II"   , "27b"),
        ("Sinister Famineblades", "27c"),
    ]),
    ("Rajang Tree", [
        ("Suzuka Takamaru I" , "28a"),
        ("Suzuka Takamaru II", "28b"),
        ("Suzuka Otakemaru"  , "28c"),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Blades I" , "29a"),
        ("Azure Elder Blades II", "29b"),
        ("Abyssal Gale Blades"  , "29c"),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Blades I", "30a"),
        ("Abyssal Storm Blades", "30b"),
    ]),
    ("Bazelgeuse Tree", [
        ("Rookslayer Handaxes I" , "31a"),
        ("Rookslayer Handaxes II", "31b"),
        ("Bazelhawk Rookslayer"  , "31c"),
    ]),
    ("Kushala Daora Tree", [
        ("Icesteel Fang I", "32a"),
        ("Daora's Hook"   , "32b"),
    ]),
    ("Teostra Tree", [
        ("Twin Nails I", "33a"),
        ("Fire and Ice", "33b"),
    ]),
    ("Chameleos Tree", [
        ("Rouge Flames I", "34a"),
        ("Dual Chameleos", "34b"),
    ]),
    ("Valstrax Tree", [
        ("Redwing Blades I"      , "35a"),
        ("Reddnaught Dragon Wing", "35b"),
    ]),
    ("Felyne Tree", [
        ("Felyne Claws I" , "36a"),
        ("Felyne Claws II", "36b"),
        ("Raging Claws"   , "36c"),
    ]),
    ("Jelly Tree", [
        ("Rainy Jelly I" , "37a"),
        ("Rainy Jelly II", "37b"),
        ("Rain of Gore"  , "37c"),
    ]),
    ("Aelucanth Tree", [
        ("Qornu Waga I" , "38a"),
        ("Qornu Waga II", "38b"),
        ("Ro Waga"      , "38c"),
    ]),
    ("Guild Tree", [
        ("Sworn Rapiers I" , "39a"),
        ("Sworn Rapiers II", "39b"),
        ("Holy Sabers"     , "39c"),
    ]),
    ("Guild Tree 2", [
        ("Altair I"   , "40a"),
        ("Altair II"  , "40b"),
        ("Fortis Gran", "40c"),
    ]),
    ("Smithy Tree", [
        ("Stealth Dango I" , "41a"),
        ("Stealth Dango II", "41b"),
        ("Perfected Dango" , "41c"),
    ]),
    ("Rampage Tree", [
        ("Rampage Twinblades I"  , "42a"),
        ("Rampage Twinblades II" , "42b"),
        ("Rampage Twinblades III", "42c"),
        ("Rampage Twinblades IV" , "42d"),
        ("Rampage Twinblades V"  , "42e"),
        ("Rampage Twinblades S"  , "42f"),
    ]),
]

