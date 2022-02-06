"""
Filename: chargeblade.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Charge Blade data
"""

# Specification to build the data
# {category: [(tree name, parent_weapon_id, [(name, id, rarity), ...]), ...]}
HARDCODED_CB_SPEC = [
    ("Kamura Tree", None, [
        ("Kamura C. Blade I"    , "1a"),
        ("Kamura C. Blade II"   , "1b"),
        ("Kamura C. Blade III"  , "1c"),
        ("Kamura C. Blade IV"   , "1d"),
        ("Kamura C. Blade V"    , "1e"),
        ("Kamura Ninja C. Blade", "1f"),
    ]),
    ("Rathian Tree", "1c", [
        ("Dear Lutemis I", "2a"),
        ("Dear Lutemis II", "2b"),
        ("Dear Lutemia", "2c"),
    ]),
    ("Barioth Tree", "1c", [
        ("Weissritter I", "3a"),
        ("Weissritter II", "3b"),
        ("Weissritter III", "3c"),
        ("Pavadira", "3d"),
    ]),
    ("Zinogre Tree", "3a", [
        ("Usurper's Lightning I", "4a"),
        ("Usurper's Lightning II", "4b"),
        ("Despot's Thundergale", "4c"),
    ]),
    ("Tetranadon Tree", "1b", [
        ("Shovedown Blade I", "5a"),
        ("Shovedown Blade II", "5b"),
        ("Spinning Takedown", "5c"),
    ]),
    ("Basarios Tree", "5a", [
        ("Giga Grips I", "6a"),
        ("Giga Grips II", "6b"),
        ("Giga Grips III", "6c"),
        ("Titan's Vise", "6d"),
    ]),
    ("Goss Harag Tree", "6a", [
        ("Surprise Axe I", "7a"),
        ("Surprise Axe II", "7b"),
        ("Stunning Axe", "7c"),
    ]),
    ("Ore Tree", None, [
        ("Hyperguard I", "8a"),
        ("Hyperguard II", "8b"),
        ("Regas Hyper", "8c"),
        ("Elite Blade I", "8d"),
        ("Elite Blade II", "8e"),
        ("Kaiser Blade", "8f"),
    ]),
    ("Thunder Tree", "8d", [
        ("K. Captain's Blade I", "9a"),
        ("K. Captain's Blade II", "9b"),
        ("Die Walk\u00fcre", "9c"),
    ]),
    ("Rakna-Kadaki Tree", "9b", [
        ("Biting Edge I", "10a"),
        ("Biting Edge II", "10b"),
        ("Araknablade", "10c"),
    ]),
    ("Tigrex Tree", "8d", [
        ("Tigrex Divide I", "11a"),
        ("Tigrex Divide II", "11b"),
        ("Tigrex Blade", "11c"),
    ]),
    ("Mizutsune Tree", "8c", [
        ("Mizuniya Drill I", "12a"),
        ("Mizuniya Drill II", "12b"),
        ("Final Fieldblade", "12c"),
    ]),
    ("Tobi-Kadachi Tree", "8b", [
        ("Kadachi Slasher I", "13a"),
        ("Kadachi Slasher II", "13b"),
        ("Kadachi Otenta", "13c"),
    ]),
    ("Izuchi Tree", "8a", [
        ("Wind Thief Sickle I", "14a"),
        ("Wind Thief Sickle II", "14b"),
        ("Gale Sickle", "14c"),
    ]),
    ("Nargacuga Tree", "14b", [
        ("Hidden Arsenal I", "15a"),
        ("Hidden Arsenal II", "15b"),
        ("Scream in the Night", "15c"),
    ]),
    ("Bone Tree", None, [
        ("Bone Strongarm I", "16a"),
        ("Bone Strongarm II", "16b"),
        ("Hard Bone Strongarm", "16c"),
        ("Bone Blade I", "16d"),
        ("Bone Blade II", "16e"),
        ("Bonesilt Veil", "16f"),
    ]),
    ("Jyuratodus Tree", "16e", [
        ("Jyura Silt I", "17a"),
        ("Jyura Silt II", "17b"),
        ("Clutch of the Deep", "17c"),
    ]),
    ("Rathalos Tree", "16c", [
        ("Axelion Blade I", "18a"),
        ("Axelion Blade II", "18b"),
        ("Bardichion Blade", "18c"),
    ]),
    ("Somnacanth Tree", "16c", [
        ("Bellowing Blow I", "19a"),
        ("Bellowing Blow II", "19b"),
        ("Illusory Frilled Wail", "19c"),
    ]),
    ("Poison Tree", "16b", [
        ("Poisonous Veil I", "20a"),
        ("Poisonous Veil II", "20b"),
        ("Infected Veil", "20c"),
    ]),
    ("Dragon Tree", "20a", [
        ("Dragon Veil I", "21a"),
        ("Dragon Veil II", "21b"),
        ("Dragonsong", "21c"),
    ]),
    ("Barroth Tree", "16b", [
        ("Barroth Anchor I", "22a"),
        ("Barroth Anchor II", "22b"),
        ("Rugged Anchor", "22c"),
    ]),
    ("Diablos Tree", "22c", [
        ("Diablos Strongarm I", "23a"),
        ("Diablos Strongarm II", "23b"),
        ("Cera Strongarm", "23c"),
    ]),
    ("Volvidon Tree", "22a", [
        ("Rough Roller I", "24a"),
        ("Rough Roller II", "24b"),
        ("Rotaxion", "24c"),
    ]),
    ("Magnamalo Tree", None, [
        ("Sinister Slasher I", "25a"),
        ("Sinister Slasher II", "25b"),
        ("Sinister Shade Axe", "25c"),
    ]),
    ("Rajang Tree", None, [
        ("Undying Blade I", "26a"),
        ("Undying Blade II", "26b"),
        ("Ikaji Immortal", "26c"),
    ]),
    ("Ibushi Tree", None, [
        ("Azure Elder Blade I", "27a"),
        ("Azure Elder Blade II", "27b"),
        ("Abyssal Gale Ward", "27c"),
    ]),
    ("Narwa Tree", None, [
        ("Thunderbolt Sawtooth I", "28a"),
        ("Abyssal Storm Ward", "28b"),
    ]),
    ("Kushala Daora Tree", None, [
        ("Daora's Casca I", "29a"),
        ("Daora's Thwartoise", "29b"),
    ]),
    ("Teostra Tree", None, [
        ("Teostra's Striker I", "30a"),
        ("Teostra's Nova", "30b"),
    ]),
    ("Chameleos Tree", None, [
        ("Arcane Draw I", "31a"),
        ("Etherward", "31b"),
    ]),
    ("Valstrax Tree", None, [
        ("Redwing Edge I", "32a"),
        ("Skaltecore", "32b"),
    ]),
    ("Smithy Tree", None, [
        ("Ricebane I", "33a"),
        ("Ricebane II", "33b"),
        ("Pounder of Rice", "33c"),
    ]),
    ("Felyne Tree", None, [
        ("Cuddly Cat I", "34a"),
        ("Cuddly Cat II", "34b"),
        ("Felyne Fancy", "34c"),
    ]),
    ("Aelucanth Tree", None, [
        ("Mandible Blade I", "35a"),
        ("Mandible Blade II", "35b"),
        ("Maxilla Edge", "35c"),
    ]),
    ("Vaik Tree", None, [
        ("Vaik Veil I", "36a"),
        ("Vaik Veil II", "36b"),
        ("Shieldraad", "36c"),
    ]),
    ("Rampage Tree", None, [
        ("Rampage C. Blade I"  , "ra"),
        ("Rampage C. Blade II" , "rb"),
        ("Rampage C. Blade III", "rc"),
        ("Rampage C. Blade IV" , "rd"),
        ("Rampage C. Blade V"  , "re"),
        ("Rampage C. Blade S"  , "rf"),
    ]),
]

