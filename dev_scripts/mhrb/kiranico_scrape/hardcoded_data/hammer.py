"""
Filename: hammer.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Hammer data
"""

# Specification to build the data
# {category: [(tree name, parent_weapon_id, [(name, id, rarity), ...]), ...]}
HARDCODED_H_SPEC = [
    ("Kamura Tree", None, [
        ("Kamura Hammer I"    , "1a"),
        ("Kamura Hammer II"   , "1b"),
        ("Kamura Hammer III"  , "1c"),
        ("Kamura Hammer IV"   , "1d"),
        ("Kamura Hammer V"    , "1e"),
        ("Kamura Ninja Hammer", "1f"),
    ]),
    ("Mizutsune Tree", "1c", [
        ("Purity Hammer I", "2a"),
        ("Purity Hammer II", "2b"),
        ("Sinter Hammer", "2c"),
    ]),
    ("Volvidon Tree", "1c", [
        ("Binding Bludgeon I", "3a"),
        ("Binding Bludgeon II", "3b"),
        ("Armored Gogue", "3c"),
    ]),
    ("Almudron Tree", "3a", [
        ("Almudron Hammer I", "4a"),
        ("Almudron Hammer II", "4b"),
        ("Doom Bringer Hammer", "4c"),
    ]),
    ("Bishaten Tree", "1c", [
        ("Five-Pronged Hammer I", "5a"),
        ("Five-Pronged Hammer II", "5b"),
        ("Great Pronged Hammer", "5c"),
    ]),
    ("Wroggi Tree", "1b", [
        ("Wroggi Hammer I", "6a"),
        ("Wroggi Hammer II", "6b"),
        ("Dirty Hammer", "6c"),
    ]),
    ("Fire Tree", "1b", [
        ("Gun Hammer I", "7a"),
        ("Gun Hammer II", "7b"),
        ("Deadeye Revolver", "7c"),
    ]),
    ("Ore Tree", None, [
        ("Iron Hammer I", "8a"),
        ("Iron Devil", "8b"),
        ("War Hammer I", "8c"),
        ("War Mace", "8d"),
        ("War Stamp I", "8e"),
        ("War Basher", "8f"),
    ]),
    ("Thunder Tree", "8e", [
        ("Great Nova I", "9a"),
        ("Great Nova II", "9b"),
        ("Super Nova", "9c"),
    ]),
    ("Tigrex Tree", "8d", [
        ("Striped Striker I", "10a"),
        ("Striped Striker II", "10b"),
        ("Tigrex Hammer", "10c"),
    ]),
    ("Anjanath Tree", "8c", [
        ("Flaming Fury I", "11a"),
        ("Flaming Fury II", "11b"),
        ("Phoenix Fury", "11c"),
    ]),
    ("Barioth Tree", "8c", [
        ("Glacial Bash I", "12a"),
        ("Glacial Bash II", "12b"),
        ("Glacial Crunch", "12c"),
    ]),
    ("Kulu-Ya-Ku Tree", "8b", [
        ("Kulu Bludgeon I", "13a"),
        ("Kulu Bludgeon II", "13b"),
        ("Kulu Crusher", "13c"),
    ]),
    ("Paralysis Tree", "13b", [
        ("Devil Masher I", "14a"),
        ("Devil Masher II", "14b"),
        ("Iron Devil's Soul", "14c"),
    ]),
    ("Arzuros Tree", "8a", [
        ("Unbearable Hammer I", "15a"),
        ("Unbearable Hammer II", "15b"),
        ("Barbearic Hammer", "15c"),
    ]),
    ("Somnacanth Tree", "15b", [
        ("Frilled Blow I", "16a"),
        ("Frilled Blow II", "16b"),
        ("Illusory Frilled Blow", "16c"),
    ]),
    ("Khezu Tree", "15a", [
        ("Bag o' Horrors I", "17a"),
        ("Bag o' Horrors II", "17b"),
        ("Bag o' Thunder", "17c"),
    ]),
    ("Ice Tree", "8a", [
        ("Frozen Core I", "18a"),
        ("Frozen Core II", "18b"),
        ("Cocytus", "18c"),
    ]),
    ("Bone Tree", None, [
        ("Bone Hammer I", "19a"),
        ("Bone Hammer II", "19b"),
        ("Hard Bone Hammer", "19c"),
        ("Bone Bludgeon I", "19d"),
        ("Bone Bludgeon II", "19e"),
        ("Heavy Bone Bludgeon", "19f"),
    ]),
    ("Diablos Tree", "19f", [
        ("Diablos Hammer I", "20a"),
        ("Diablos Hammer II", "20b"),
        ("Diablos Tail", "20c"),
    ]),
    ("Bone Tree 2", "19d", [
        ("Cyclo-Hammer I", "21a"),
        ("Cyclo-Hammer II", "21b"),
        ("Atlas Hammer", "21c"),
    ]),
    ("Pukei-Pukei Tree", "21a", [
        ("Pukei Hammer I", "22a"),
        ("Pukei Hammer II", "22b"),
        ("Datura Club", "22c"),
    ]),
    ("Basarios Tree", "19b", [
        ("Basarios Blow I", "23a"),
        ("Basarios Blow II", "23b"),
        ("Basarios Bash", "23c"),
    ]),
    ("Rathalos Tree", "23c", [
        ("Red Bludgeon I", "24a"),
        ("Red Bludgeon II", "24b"),
        ("Huracan Hammer", "24c"),
    ]),
    ("Goss Harag Tree", "23a", [
        ("Yeti Hammer I", "25a"),
        ("Yeti Hammer II", "25b"),
        ("Yeti Hammer III", "25c"),
        ("Abominable Hammer", "25d"),
    ]),
    ("Zinogre Tree", "23a", [
        ("Usurper's Thunder I", "26a"),
        ("Usurper's Thunder II", "26b"),
        ("Despot's Crackle", "26c"),
    ]),
    ("Remobra Tree", "19b", [
        ("Calamitous Portent I", "27a"),
        ("Calamitous Portent II", "27b"),
        ("Catastrophic Portent", "27c"),
    ]),
    ("Royal Ludroth Tree", "19b", [
        ("Droth Splashhammer I", "28a"),
        ("Droth Splashhammer II", "28b"),
        ("Ludroth Dousehammer", "28c"),
    ]),
    ("Izuchi Tree", "19a", [
        ("Izuchi Hammer I", "29a"),
        ("Izuchi Hammer II", "29b"),
        ("Snapper Hammer", "29c"),
    ]),
    ("Nargacuga Tree", "29b", [
        ("Hidden Breaker I", "30a"),
        ("Hidden Breaker II", "30b"),
        ("Night Eternal", "30c"),
    ]),
    ("Barroth Tree", "29b", [
        ("Carapace Hammer I", "31a"),
        ("Carapace Hammer II", "31b"),
        ("Barroth Hammer", "31c"),
    ]),
    ("Magnamalo Tree", None, [
        ("Sinister Hammer I", "32a"),
        ("Sinister Hammer II", "32b"),
        ("Sinister Shade Hammer", "32c"),
    ]),
    ("Gargwa Tree", None, [
        ("Egg Hammer I", "33a"),
        ("Egg Hammer II", "33b"),
        ("Gargwa Hammer", "33c"),
    ]),
    ("Rajang Tree", None, [
        ("Mane Malice I", "34a"),
        ("Mane Malice II", "34b"),
        ("Mane Malice Rajang", "34c"),
    ]),
    ("Ibushi Tree", None, [
        ("Azure Elder Hammer I", "35a"),
        ("Azure Elder Hammer II", "35b"),
        ("Abyssal Gale Mauler", "35c"),
    ]),
    ("Narwa Tree", None, [
        ("Thunderbolt Hammer I", "36a"),
        ("Abyssal Storm Mauler", "36b"),
    ]),
    ("Kushala Daora Tree", None, [
        ("Icesteel Hammer I", "37a"),
        ("Daora's Colossus", "37b"),
    ]),
    ("Teostra Tree", None, [
        ("Teostra Cratermaker I", "38a"),
        ("Teostra Cratergouger", "38b"),
    ]),
    ("Chameleos Tree", None, [
        ("Genie's Expanse I", "39a"),
        ("Diamalto's Dream", "39b"),
    ]),
    ("Valstrax Tree", None, [
        ("Redwing Drill I", "40a"),
        ("Reddnaught Hammer", "40b"),
    ]),
    ("Guild Tree", None, [
        ("Teddybear I", "41a"),
        ("Teddybear II", "41b"),
        ("Sleepy Bear", "41c"),
    ]),
    ("Death Stench Tree", None, [
        ("Graceful Death I", "42a"),
        ("Graceful Death II", "42b"),
        ("Graceful Death III", "42c"),
        ("Yadora Morte", "42d"),
    ]),
    ("Mosgharl Tree", None, [
        ("Pumpking I", "43a"),
        ("Pumpking II", "43b"),
        ("Jack-'o-lantern King", "43c"),
    ]),
    ("Rampage Tree", None, [
        ("Rampage Hammer I"  , "ra"),
        ("Rampage Hammer II" , "rb"),
        ("Rampage Hammer III", "rc"),
        ("Rampage Hammer IV" , "rd"),
        ("Rampage Hammer V"  , "re"),
        ("Rampage Hammer S"  , "rf"),
    ]),
]

