"""
Filename: insectglaive.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Insect Glaive data
"""

# Specification to build the data
# {category: [(tree name, parent_weapon_id, [(name, id, rarity), ...]), ...]}
HARDCODED_IG_SPEC = [
    ("Kamura Tree", None, [
        ("Kamura Glaive I"    , "1a"),
        ("Kamura Glaive II"   , "1b"),
        ("Kamura Glaive III"  , "1c"),
        ("Kamura Glaive IV"   , "1d"),
        ("Kamura Glaive V"    , "1e"),
        ("Kamura Ninja Glaive", "1f"),
    ]),
    ("Nargacuga Tree", "1c", [
        ("Hidden Scythe I", "2a"),
        ("Hidden Scythe II", "2b"),
        ("Evening Calm", "2c"),
    ]),
    ("Mizutsune Tree", "1c", [
        ("Fox Halberd I", "3a"),
        ("Fox Halberd II", "3b"),
        ("Curved Naganagi", "3c"),
    ]),
    ("Somnacanth Tree", "1c", [
        ("Frilled Jab I", "4a"),
        ("Frilled Jab II", "4b"),
        ("Illusory Frilled Jab", "4c"),
    ]),
    ("Tigrex Tree", "4b", [
        ("Tigrex Kaina I", "5a"),
        ("Tigrex Kaina II", "5b"),
        ("Tigerclaw Glaive", "5c"),
    ]),
    ("Tetranadon Tree", "1b", [
        ("Leaping Glaive I", "6a"),
        ("Leaping Glaive II", "6b"),
        ("Leapfrog", "6c"),
    ]),
    ("Ore Tree", None, [
        ("Iron Blade I", "7a"),
        ("Iron Blade II", "7b"),
        ("Steel Blade", "7c"),
        ("Iron Bayonet I", "7d"),
        ("Iron Bayonet II", "7e"),
        ("Hiten Blade", "7f"),
    ]),
    ("Rathalos Tree", "7e", [
        ("Rathmaul I", "8a"),
        ("Rathmaul II", "8b"),
        ("Firedance Rathmaul", "8c"),
    ]),
    ("Khezu Tree", "7d", [
        ("Bolt Chamber I", "9a"),
        ("Bolt Chamber II", "9b"),
        ("Full Bolt Chamber", "9c"),
    ]),
    ("Rathian Tree", "7b", [
        ("Princess Regalia I", "10a"),
        ("Princess Regalia II", "10b"),
        ("Queen Regalia", "10c"),
    ]),
    ("Aknosom Tree", "7b", [
        ("Aknosom Pike I", "11a"),
        ("Aknosom Pike II", "11b"),
        ("Daybreak Glaive", "11c"),
    ]),
    ("Kulu-Ya-Ku Tree", "7b", [
        ("Kulu Glaive I", "12a"),
        ("Kulu Glaive II", "12b"),
        ("Kulu Pike", "12c"),
    ]),
    ("Tobi-Kadachi Tree", "12a", [
        ("Kadachi Glaive I", "13a"),
        ("Kadachi Glaive II", "13b"),
        ("Shocking Pike", "13c"),
    ]),
    ("Lagombi Tree", "7a", [
        ("Lagombaglaive I", "14a"),
        ("Lagombaglaive II", "14b"),
        ("Lagombavarice", "14c"),
    ]),
    ("Bone Tree", None, [
        ("Bone Staff I", "15a"),
        ("Bone Staff II", "15b"),
        ("Aerial Glaive", "15c"),
        ("Sturdy Glaive I", "15d"),
        ("Sturdy Glaive II", "15e"),
        ("Sturdy Glaive Redux", "15f"),
    ]),
    ("Paralysis Tree", "15d", [
        ("Sky-High Glaive I", "16a"),
        ("Sky-High Glaive II", "16b"),
        ("Highest of Glaives", "16c"),
    ]),
    ("Diablos Tree", "16b", [
        ("Diablos Rod I", "17a"),
        ("Diablos Rod II", "17b"),
        ("Tyrant Rod", "17c"),
    ]),
    ("Anjanath Tree", "15c", [
        ("Flammenkaefer I", "18a"),
        ("Flammenkaefer II", "18b"),
        ("Gnashing Flammenkaefer", "18c"),
    ]),
    ("Goss Harag Tree", "18a", [
        ("Gossglaive I", "19a"),
        ("Gossglaive II", "19b"),
        ("Abominable Glaive", "19c"),
    ]),
    ("Pukei-Pukei Tree", "15c", [
        ("Pukei Rod I", "20a"),
        ("Pukei Rod II", "20b"),
        ("Datura Pike", "20c"),
    ]),
    ("Barioth Tree", "15b", [
        ("Amber Piton I", "21a"),
        ("Amber Piton II", "21b"),
        ("Fenrir Storm", "21c"),
    ]),
    ("Royal Ludroth Tree", "15b", [
        ("Royal Bloom I", "22a"),
        ("Royal Bloom II", "22b"),
        ("Bloom Royale", "22c"),
    ]),
    ("Zinogre Tree", "22a", [
        ("Royal Bolt Scepter I", "23a"),
        ("Royal Bolt Scepter II", "23b"),
        ("Despot's Twinbolt", "23c"),
    ]),
    ("Altaroth Tree", None, [
        ("Hortadent I", "24a"),
        ("Hortadent II", "24b"),
        ("Hortadent Brada", "24c"),
    ]),
    ("Bnahabra Tree", "24a", [
        ("Rielle Nulo I", "25a"),
        ("Rielle Nulo II", "25b"),
        ("Rielle Unu", "25c"),
        ("Rielle Nulo Red I", "25d"),
        ("Rielle Nulo Red II", "25e"),
        ("Rielle Vermiglio", "25f"),
    ]),
    ("Bnahabra (Dragon)", "25c", [
        ("Rielle Nulo Black I", "26a"),
        ("Rielle Nulo Black II", "26b"),
        ("Rielle Nerissimo", "26c"),
    ]),
    ("Bnahabra (Ice)", "25b", [
        ("Rielle Nulo White I", "27a"),
        ("Rielle Nulo White II", "27b"),
        ("Rielle Unu White", "27c"),
    ]),
    ("Bnahabra (Paralysis)", "25a", [
        ("Rielle Nulo Green I", "28a"),
        ("Rielle Nulo Green II", "28b"),
        ("Rielle Unu Green", "28c"),
    ]),
    ("Magnamalo Tree", None, [
        ("Sinister Staff I", "29a"),
        ("Sinister Staff II", "29b"),
        ("Sinister Shadowstaff", "29c"),
    ]),
    ("Rajang Tree", None, [
        ("Metal Mauler I", "30a"),
        ("Metal Mauler II", "30b"),
        ("Metalmangler", "30c"),
    ]),
    ("Ibushi Tree", None, [
        ("Azure Elder Glaive I", "31a"),
        ("Azure Elder Glaive II", "31b"),
        ("Abyssal Gale Glaive", "31c"),
    ]),
    ("Narwa Tree", None, [
        ("Thunderbolt Glaive I", "32a"),
        ("Abyssal Storm Glaive", "32b"),
    ]),
    ("Kushala Daora Tree", None, [
        ("Daora's Entom I", "33a"),
        ("Daora's Tethidine", "33b"),
    ]),
    ("Chameleos Tree", None, [
        ("Caster's Rod I", "34a"),
        ("Hazy Caster", "34b"),
    ]),
    ("Valstrax Tree", None, [
        ("Redwing Glaive I", "35a"),
        ("Reddnaught Shuma", "35b"),
    ]),
    ("Death Stench Tree", None, [
        ("Deathport Staff I", "36a"),
        ("Deathport Staff II", "36b"),
        ("Garamorse", "36c"),
    ]),
    ("Magia Tree", None, [
        ("Magia Pitareen I", "37a"),
        ("Magia Pitareen II", "37b"),
        ("Magia Pitareen III", "37c"),
        ("Magia Crescent", "37d"),
    ]),
    ("Smithy Tree", None, [
        ("Brush Glaive I", "38a"),
        ("Brush Glaive II", "38b"),
        ("Watercolor Glaive", "38c"),
    ]),
    ("Rampage Tree", None, [
        ("Rampage Glaive I"  , "ra"),
        ("Rampage Glaive II" , "rb"),
        ("Rampage Glaive III", "rc"),
        ("Rampage Glaive IV" , "rd"),
        ("Rampage Glaive V"  , "re"),
        ("Rampage Glaive S"  , "rf"),
    ]),
]

