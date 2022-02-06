"""
Filename: dualblades.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Dual Blades data
"""

# Specification to build the data
# {category: [(tree name, parent_weapon_id, [(name, id, rarity), ...]), ...]}
HARDCODED_DB_SPEC = [
    ("Kamura Tree", None, [
        ("Kamura Glintblades I"  , "1a"),
        ("Kamura Glintblades II" , "1b"),
        ("Kamura Glintblades III", "1c"),
        ("Kamura Glintblades IV" , "1d"),
        ("Kamura Glintblades V"  , "1e"),
        ("Kamura Ninja Blades"   , "1f"),
    ]),
    ("Almudron Tree", "1c", [
        ("Mud Ripper I" , "2a"),
        ("Mud Ripper II", "2b"),
        ("Mud Twister"  , "2c"),
    ]),
    ("Zinogre Tree", "1c", [
        ("Usurper's Fulgur I" , "3a"),
        ("Usurper's Fulgur II", "3b"),
        ("Despot's Blitz"     , "3c"),
    ]),
    ("Barioth Tree", "1c", [
        ("Blizzarioths I"       , "4a"),
        ("Blizzarioths II"      , "4b"),
        ("Mountain Blizzarioths", "4c"),
    ]),
    ("Wroggi Tree", "1b", [
        ("Desperado I"  , "5a"),
        ("Desperado II" , "5b"),
        ("The Kid", "5c"),
    ]),
    ("Khezu Tree", "1b", [
        ("Khezu Daggers I" , "6a"),
        ("Khezu Daggers II", "6b"),
        ("Khezu Skards"    , "6c"),
    ]),
    ("Ore Tree", None, [
        ("Matched Slicers I" , "7a"),
        ("Matched Slicers II", "7b"),
        ("Dual Daggers"      , "7c"),
        ("Hurricane I"       , "7d"),
        ("Hurricane II"      , "7e"),
        ("Cyclone"           , "7f"),
    ]),
    ("Tigrex Tree", "7d", [
        ("Rex Slicers I" , "8a"),
        ("Rex Slicers II", "8b"),
        ("Tigrex Claws"  , "8c"),
    ]),
    ("Mizutsune Tree", "7b", [
        ("Morning Dawn I" , "9a"),
        ("Morning Dawn II", "9b"),
        ("Evening Dusk"   , "9c"),
    ]),
    ("Aknosom Tree", "7a", [
        ("Schirmscorn I"   , "10a"),
        ("Schirmscorn II"  , "10b"),
        ("Daybreak Daggers", "10c"),
    ]),
    ("Kulu-Ya-Ku Tree", "7a", [
        ("Kulu's Peck I" , "11a"),
        ("Kulu's Peck II", "11b"),
        ("Kulu's Lasher" , "11c"),
    ]),
    ("Ice Tree", "11b", [
        ("Gelid Mind I" , "12a"),
        ("Gelid Mind II", "12b"),
        ("Gelid Soul"   , "12c"),
    ]),
    ("Nargacuga Tree", "11b", [
        ("Hidden Gemini I" , "13a"),
        ("Hidden Gemini II", "13b"),
        ("Night Wings"     , "13c"),
    ]),
    ("Thunder Tree", "7a", [
        ("Twin Chainsaws I" , "14a"),
        ("Twin Chainsaws II", "14b"),
        ("Guillotines"      , "14c"),
    ]),
    ("Ore Tree 2", "7a", [
        ("Dual Hatchets I" , "15a"),
        ("Dual Hatchets II", "15b"),
        ("Dual Cleavers"   , "15c"),
    ]),
    ("Arzuros Tree", "15b", [
        ("Cerulean Axes I" , "16a"),
        ("Cerulean Axes II", "16b"),
        ("Ashigara Axes"   , "16c"),
    ]),
    ("Anjanath Tree", "15b", [
        ("Flammenschild I"       , "17a"), # Real name: "Flammenschild"
        ("Flammenschild II"      , "17b"), # Real name: "Flammenschild"
        ("Gnashing Flammenschild", "17c"),
    ]),
    ("Bone Tree", None, [
        ("Bone Hatchets I"   , "18a"),
        ("Bone Hatchets II"  , "18b"),
        ("Wild Hatchets"     , "18c"),
        ("Talon Carvers I"   , "18d"),
        ("Talon Carvers II"  , "18e"),
        ("Talon Twins", "18f"),
    ]),
    ("Rathalos Tree", "18e", [
        ("Twin Flames I" , "19a"),
        ("Twin Flames II", "19b"),
        ("Wyvern Lovers" , "19c"),
    ]),
    ("Diablos Tree", "18d", [
        ("Diablos Bashers I" , "20a"),
        ("Diablos Bashers II", "20b"),
        ("Diablos Mashers"   , "20c"),
    ]),
    ("Jyuratodus Tree", "20a", [
        ("Jyura Duo I"      , "21a"),
        ("Jyura Duo II"     , "21b"),
        ("Jyura Pulverizers", "21c"),
    ]),
    ("Tobi-Kadachi Tree", "18c", [
        ("Kadachi Twinblades I" , "22a"),
        ("Kadachi Twinblades II", "22b"),
        ("Shockblades"          , "22c"),
    ]),
    ("Fire Tree", "18b", [
        ("Blazeblades I"  , "23a"),
        ("Blazeblades II" , "23b"),
        ("Infernal Furies", "23c"),
    ]),
    ("Royal Ludroth Tree", "18b", [
        ("Ludroth Pair I" , "24a"),
        ("Ludroth Pair II", "24b"),
        ("Double Droth"   , "24c"),
    ]),
    ("Somnacanth Tree", "24a", [
        ("Frilled Claw I"       , "25a"),
        ("Frilled Claw II"      , "25b"),
        ("Illusory Frilled Claw", "25c"),
    ]),
    ("Lagombi Tree", "18a", [
        ("Snow Slicers I" , "26a"),
        ("Snow Slicers II", "26b"),
        ("Snow Sisters"   , "26c"),
    ]),
    ("Magnamalo Tree", None, [
        ("Sinister Blades I"    , "27a"),
        ("Sinister Blades II"   , "27b"),
        ("Sinister Famineblades", "27c"),
    ]),
    ("Rajang Tree", None, [
        ("Suzuka Takamaru I" , "28a"),
        ("Suzuka Takamaru II", "28b"),
        ("Suzuka Otakemaru"  , "28c"),
    ]),
    ("Ibushi Tree", None, [
        ("Azure Elder Blades I" , "29a"),
        ("Azure Elder Blades II", "29b"),
        ("Abyssal Gale Blades"  , "29c"),
    ]),
    ("Narwa Tree", None, [
        ("Thunderbolt Blades I", "30a"),
        ("Abyssal Storm Blades", "30b"),
    ]),
    ("Bazelgeuse Tree", None, [
        ("Rookslayer Handaxes I" , "31a"),
        ("Rookslayer Handaxes II", "31b"),
        ("Bazelhawk Rookslayer"  , "31c"),
    ]),
    ("Kushala Daora Tree", None, [
        ("Icesteel Fang I", "32a"),
        ("Daora's Hook"   , "32b"),
    ]),
    ("Teostra Tree", None, [
        ("Twin Nails I", "33a"),
        ("Fire and Ice", "33b"),
    ]),
    ("Chameleos Tree", None, [
        ("Rouge Flames I", "34a"),
        ("Dual Chameleos", "34b"),
    ]),
    ("Valstrax Tree", None, [
        ("Redwing Blades I"      , "35a"),
        ("Reddnaught Dragon Wing", "35b"),
    ]),
    ("Felyne Tree", None, [
        ("Felyne Claws I" , "36a"),
        ("Felyne Claws II", "36b"),
        ("Raging Claws"   , "36c"),
    ]),
    ("Jelly Tree", None, [
        ("Rainy Jelly I" , "37a"),
        ("Rainy Jelly II", "37b"),
        ("Rain of Gore"  , "37c"),
    ]),
    ("Aelucanth Tree", None, [
        ("Qornu Waga I" , "38a"),
        ("Qornu Waga II", "38b"),
        ("Ro Waga"      , "38c"),
    ]),
    ("Guild Tree", None, [
        ("Sworn Rapiers I" , "39a"),
        ("Sworn Rapiers II", "39b"),
        ("Holy Sabers"     , "39c"),
    ]),
    ("Guild Tree 2", None, [
        ("Altair I"   , "40a"),
        ("Altair II"  , "40b"),
        ("Fortis Gran", "40c"),
    ]),
    ("Smithy Tree", None, [
        ("Stealth Dango I" , "41a"),
        ("Stealth Dango II", "41b"),
        ("Perfected Dango" , "41c"),
    ]),
    ("Rampage Tree", None, [
        ("Rampage Twinblades I"  , "ra"),
        ("Rampage Twinblades II" , "rb"),
        ("Rampage Twinblades III", "rc"),
        ("Rampage Twinblades IV" , "rd"),
        ("Rampage Twinblades V"  , "re"),
        ("Rampage Twinblades S"  , "rf"),
    ]),
]

