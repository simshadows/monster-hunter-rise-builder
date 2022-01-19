"""
Filename: gunlance.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Gunlance data
"""

# Specification to build the data
# {category: [(tree name, parent_weapon_id, [(name, id, rarity), ...]), ...]}
HARDCODED_GL_SPEC = [
    ("Kamura Tree", None, [
        ("Kamura Gunlance I"    , "1a"),
        ("Kamura Gunlance II"   , "1b"),
        ("Kamura Gunlance III"  , "1c"),
        ("Kamura Gunlance IV"   , "1d"),
        ("Kamura Gunlance V"    , "1e"),
        ("Kamura Ninja Gunlance", "1f"),
    ]),
    ("Mizutsune Tree", "1c", [
        ("Ukiyo no Yamiwo I", "2a"),
        ("Ukiyo no Yamiwo II", "2b"),
        ("Mizumori", "2c"),
    ]),
    ("Rathian Tree", "1c", [
        ("Princess Panoply I", "3a"),
        ("Princess Panoply II", "3b"),
        ("Ortlinde", "3c"),
    ]),
    ("Rathalos Tree", "3b", [
        ("Red Rook I", "4a"),
        ("Red Rook II", "4b"),
        ("Crimson Rook", "4c"),
    ]),
    ("Delex Tree", "1b", [
        ("Delex Harpoon I", "5a"),
        ("Delex Harpoon II", "5b"),
        ("Sand Blaster Gunlance", "5c"),
    ]),
    ("Zinogre Tree", "5b", [
        ("Usurper's Roar I", "6a"),
        ("Usurper's Roar II", "6b"),
        ("Despot's Phlogiston", "6c"),
    ]),
    ("Barioth Tree", "5a", [
        ("Twinfang I", "7a"),
        ("Twinfang II", "7b"),
        ("Ambermarch", "7c"),
    ]),
    ("Ore Tree", None, [
        ("Iron Gunlance I", "8a"),
        ("Iron Gunlance II", "8b"),
        ("Eizenlitter", "8c"),
        ("Striker's Gunlance I", "8d"),
        ("Striker's Gunlance II", "8e"),
        ("Imperial Guardlance", "8f"),
    ]),
    ("Ore Tree 2", "8d", [
        ("General's Arbalance I", "9a"),
        ("General's Arbalance II", "9b"),
        ("Admiral's Arbalance", "9c"),
    ]),
    ("Pukei-Pukei Tree", "9a", [
        ("Pukei Gunlance I", "10a"),
        ("Pukei Gunlance II", "10b"),
        ("Datura Gunlance", "10c"),
    ]),
    ("Diablos Tree", "8d", [
        ("Diablos Gunlance I", "11a"),
        ("Diablos Gunlance II", "11b"),
        ("Diablos Cannon", "11c"),
    ]),
    ("Aknosom Tree", "8b", [
        ("Aknosom Gunlance I", "12a"),
        ("Aknosom Gunlance II", "12b"),
        ("Aknosom Gunlance III", "12c"),
        ("Dawnbreaker Gunlance", "12d"),
    ]),
    ("Almudron Tree", "12b", [
        ("Almudron Gunlance I", "13a"),
        ("Almudron Gunlance II", "13b"),
        ("Doombringer Gunlance", "13c"),
    ]),
    ("Khezu Tree", "8b", [
        ("Full Voltage I", "14a"),
        ("Full Voltage II", "14b"),
        ("High Volt Gunlance", "14c"),
    ]),
    ("Volvidon Tree", "14a", [
        ("Shattershot I", "15a"),
        ("Shattershot II", "15b"),
        ("Shatter God", "15c"),
    ]),
    ("Baggi Tree", "8a", [
        ("Baggi Gunlance I", "16a"),
        ("Baggi Gunlance II", "16b"),
        ("Baggi Gunlance III", "16c"),
        ("Lullabyte Sleeplance", "16d"),
    ]),
    ("Tobi-Kadachi Tree", "16a", [
        ("Kadachi Striker I", "17a"),
        ("Kadachi Striker II", "17b"),
        ("Mythic Kadachi Striker", "17c"),
    ]),
    ("Bone Tree", None, [
        ("Bone Gunlance I", "18a"),
        ("Bone Gunlance II", "18b"),
        ("Wyvern Bone Gunlance", "18c"),
        ("Golem Gunlance I", "18d"),
        ("Golem Gunlance II", "18e"),
        ("Behemoth Gunlance", "18f"),
    ]),
    ("Nargacuga Tree", "18e", [
        ("Hidden Gunlance I", "19a"),
        ("Hidden Gunlance II", "19b"),
        ("Fading Night", "19c"),
    ]),
    ("Anjanath Tree", "18c", [
        ("Flaming Gunlance I", "20a"),
        ("Flaming Gunlance II", "20b"),
        ("Flaming Gunlance III", "20c"),
        ("Barbarous Firelance", "20d"),
    ]),
    ("Barroth Tree", "18b", [
        ("Barroth Loader I", "21a"),
        ("Barroth Loader II", "21b"),
        ("Rugged Loader", "21c"),
    ]),
    ("Tigrex Tree", "21b", [
        ("Tiger Blast I", "22a"),
        ("Tiger Blast II", "22b"),
        ("Tigrex Gunlance", "22c"),
    ]),
    ("Lagombi Tree", "18a", [
        ("Lagomberator I", "23a"),
        ("Lagomberator II", "23b"),
        ("Lagomberator III", "23c"),
        ("Lagomberatrix", "23d"),
    ]),
    ("Royal Ludroth Tree", "23a", [
        ("Ludroth Harpoon I", "24a"),
        ("Ludroth Harpoon II", "24b"),
        ("Ludroth Harpoon III", "24c"),
        ("Ludroth Shellbreaker", "24d"),
    ]),
    ("Bnahabra Tree", None, [
        ("Fiore Nulo I", "25a"),
        ("Fiore Nulo II", "25b"),
        ("Fiore Unu", "25c"),
    ]),
    ("Rakna-Kadaki Tree", "25c", [
        ("Rakna Gunlance I", "26a"),
        ("Rakna Gunlance II", "26b"),
        ("Araknalance", "26c"),
    ]),
    ("Bnahabra (Dragon)", "25b", [
        ("Fiore Nulo Black I", "27a"),
        ("Fiore Nulo Black II", "27b"),
        ("Fiore Unu Black", "27c"),
    ]),
    ("Bnahabra (Ice)", "25a", [
        ("Fiore Nulo White I", "28a"),
        ("Fiore Nulo White II", "28b"),
        ("Fiore Unu White", "28c"),
    ]),
    ("Bnahabra (Paralysis)", "25a", [
        ("Fiore Nulo Green I", "29a"),
        ("Fiore Nulo Green II", "29b"),
        ("Fiore Unu Green", "29c"),
    ]),
    ("Magnamalo Tree", None, [
        ("Sinister Gunlance I", "30a"),
        ("Sinister Gunlance II", "30b"),
        ("Sinister Shadowshot", "30c"),
    ]),
    ("Rajang Tree", None, [
        ("Demon Gunlance I", "31a"),
        ("Demon Gunlance II", "31b"),
        ("Great Demon Gunlance", "31c"),
    ]),
    ("Ibushi Tree", None, [
        ("Azure Elder Gunlance I", "32a"),
        ("Azure Elder Gunlance II", "32b"),
        ("Abyssal Gale Gunlance", "32c"),
    ]),
    ("Narwa Tree", None, [
        ("Thunderbolt Gunlance I", "33a"),
        ("Abyssal Storm Gunlance", "33b"),
    ]),
    ("Bazelgeuse Tree", None, [
        ("Bazel Buster I", "34a"),
        ("Bazel Buster II", "34b"),
        ("Bazel Destroyer", "34c"),
    ]),
    ("Kushala Daora Tree", None, [
        ("Icesteel Gunlance I", "35a"),
        ("Daora's Brigia", "35b"),
    ]),
    ("Chameleos Tree", None, [
        ("Venomous Cologne I", "36a"),
        ("Venomous Attar", "36b"),
    ]),
    ("Valstrax Tree", None, [
        ("Redwing Gunlance I", "37a"),
        ("Reddnaught Gunlance", "37b"),
    ]),
    ("Canyne Tree", None, [
        ("Canyne Cannon I", "38a"),
        ("Canyne Cannon II", "38b"),
        ("Howlitzer", "38c"),
    ]),
    ("Guild Tree", None, [
        ("Cornpopper I", "39a"),
        ("Cornpopper II", "39b"),
        ("Mighty Cornpopper", "39c"),
    ]),
    ("Shell-Studded Tree", None, [
        ("Sleepy Shellgun I", "40a"),
        ("Sleepy Shellgun II", "40b"),
        ("Soporific Shellgun", "40c"),
    ]),
    ("Rampage Tree", None, [
        ("Rampage Gunlance I"  , "ra"),
        ("Rampage Gunlance II" , "rb"),
        ("Rampage Gunlance III", "rc"),
        ("Rampage Gunlance IV" , "rd"),
        ("Rampage Gunlance V"  , "re"),
        ("Rampage Gunlance S"  , "rf"),
    ]),
]

