"""
Filename: greatsword.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Greatsword data
"""

# Specification to build the data
# {category: [(tree name, parent_weapon_id, [(name, id, rarity), ...]), ...]}
HARDCODED_GS_SPEC = [
    ("Kamura Tree", None, [
        ("Kamura Cleaver I"    , "1a"),
        ("Kamura Cleaver II"   , "1b"),
        ("Kamura Cleaver III"  , "1c"),
        ("Kamura Cleaver IV"   , "1d"),
        ("Kamura Cleaver V"    , "1e"),
        ("Kamura Ninja Cleaver", "1f"),
    ]),
    ("Goss Harag Tree", "1c", [
        ("Gossblade I", "2a"),
        ("Gossblade II", "2b"),
        ("Abominable Great Sword", "2c"),
    ]),
    ("Mizutsune Tree", "1c", [
        ("Hanayako Yohino I", "3a"),
        ("Hanayako Yohino II", "3b"),
        ("Akanesasu", "3c"),
    ]),
    ("Great Sword Tree", "1c", [
        ("Axeblade I", "4a"),
        ("Axeblade II", "4b"),
        ("Colossal Axeblade", "4c"),
    ]),
    ("Barroth Tree", "1b", [
        ("Carapace Sword I", "5a"),
        ("Carapace Sword II", "5b"),
        ("Carapace Blade", "5c"),
    ]),
    ("Tigrex Tree", "5b", [
        ("Tiger Jawblade I", "6a"),
        ("Tiger Jawblade II", "6b"),
        ("Tigrex Great Sword", "6c"),
    ]),
    ("Khezu Tree", "1b", [
        ("Khezu Shock Sword I", "7a"),
        ("Khezu Shock Sword II", "7b"),
        ("Khezu Shock Blade", "7c"),
    ]),
    ("Izuchi Tree", "1a", [
        ("Izuchi Blade I", "8a"),
        ("Izuchi Blade II", "8b"),
        ("Snapper Blade", "8c"),
    ]),
    ("Remobra Tree", "8b", [
        ("Deadly Serpentblade I", "9a"),
        ("Deadly Serpentblade II", "9b"),
        ("Poison Serpentblade", "9c"),
    ]),
    ("Nargacuga Tree", "9a", [
        ("Hidden Blade I", "10a"),
        ("Hidden Blade II", "10b"),
        ("Dark of Night", "10c"),
    ]),
    ("Somnacanth Tree", "8b", [
        ("Frilled Blade I", "11a"),
        ("Frilled Blade II", "11b"),
        ("Illusory Frilled Blade", "11c"),
    ]),
    ("Ore Tree", None, [
        ("Iron Sword I", "12a"),
        ("Steel Sword", "12b"),
        ("Buster Sword I", "12c"),
        ("Buster Blade", "12d"),
        ("Chrome Razor I", "12e"),
        ("Chrome Quietus", "12f"),
    ]),
    ("Fire Tree", "12c", [
        ("Barbaroi Blade I", "13a"),
        ("Barbaroi Blade II", "13b"),
        ("Crimson Goat", "13c"),
    ]),
    ("Pukei-Pukei Tree", "12c", [
        ("Pukei Edge I", "14a"),
        ("Pukei Edge II", "14b"),
        ("Datura Cleaver", "14c"),
    ]),
    ("Barioth Tree", "12b", [
        ("Icicle Fang I", "15a"),
        ("Icicle Fang II", "15b"),
        ("Paladire", "15c"),
    ]),
    ("Aknosom Tree", "12b", [
        ("Aknosom Blade I", "16a"),
        ("Aknosom Blade II", "16b"),
        ("Daybreak Cleaver", "16c"),
    ]),
    ("Tetranadon Tree", "12b", [
        ("Tetranadon Edge I", "17a"),
        ("Tetranadon Edge II", "17b"),
        ("Tetranadon Cutter", "17c"),
    ]),
    ("Bone Tree", None, [
        ("Bone Cleaver I", "18a"),
        ("Bone Slasher", "18b"),
        ("Jawblade I", "18c"),
        ("Giant Jawblade", "18d"),
        ("Wyvern Fang I", "18e"),
        ("Great Wyvern Fang", "18f"),
    ]),
    ("Bone Tree 2", "18d", [
        ("Golem Blade I", "19a"),
        ("Blade of Talos", "19b"),
    ]),
    ("Rathian Tree", "19a", [
        ("Valkyrie Blade I", "20a"),
        ("Valkyrie Blade II", "20b"),
        ("Sieglinde", "20c"),
    ]),
    ("Jyuratodus Tree", "19a", [
        ("Jyura Mudblade I", "21a"),
        ("Jyura Mudblade II", "21b"),
        ("Terracutter", "21c"),
    ]),
    ("Rathalos Tree", "21a", [
        ("Red Wing I", "22a"),
        ("Red Wing II", "22b"),
        ("Rathalos Firesword", "22c"),
    ]),
    ("Diablos Tree", "18d", [
        ("Quarrel Hornsword I", "23a"),
        ("Quarrel Hornsword II", "23b"),
        ("Feud Hornsword", "23c"),
    ]),
    ("Jaggi & Jaggia Tree", "18b", [
        ("Hack Blade I", "24a"),
        ("Hack Blade II", "24b"),
        ("Jaggi Greatblade", "24c"),
    ]),
    ("Anjanath Tree", "24b", [
        ("Flammenzahn I", "25a"),
        ("Flammenzahn II", "25b"),
        ("Gnashing Flammenzahn", "25c"),
    ]),
    ("Zinogre Tree", "24b", [
        ("Usurper's Storm I", "26a"),
        ("Usurper's Storm II", "26b"),
        ("Despot's Blackstorm", "26c"),
    ]),
    ("Royal Ludroth Tree", "18b", [
        ("Cataclysm Sword I", "27a"),
        ("Cataclysm Sword II", "27b"),
        ("Cataclysm Blade", "27c"),
    ]),
    ("Lagombi Tree", "18a", [
        ("Snowclad I", "28a"),
        ("Snowclad II", "28b"),
        ("Lagombi Charlotte", "28c"),
    ]),
    ("Magnamalo Tree", None, [
        ("Sinister Blade I", "29a"),
        ("Sinister Blade II", "29b"),
        ("Sinister Shadowblade", "29c"),
    ]),
    ("Rajang Tree", None, [
        ("Demon Rod I", "30a"),
        ("Demon Rod II", "30b"),
        ("Great Demon Rod", "30c"),
    ]),
    ("Ibushi Tree", None, [
        ("Azure Elder Great Sword I", "31a"),
        ("Azure Elder Great Sword II", "31b"),
        ("Abyssal Galeblade", "31c"),
    ]),
    ("Narwa Tree", None, [
        ("Thunderbolt Great Sword I", "32a"),
        ("Abyssal Storm Cleaver", "32b"),
    ]),
    ("Kushala Daora Tree", None, [
        ("Icesteel Edge I", "33a"),
        ("Daora's Decimator", "33b"),
    ]),
    ("Teostra Tree", None, [
        ("Teostra Blade I", "34a"),
        ("King Teostra Blade", "34b"),
    ]),
    ("Chameleos Tree", None, [
        ("Grand Shamshir I", "35a"),
        ("Foreboding Shamshir", "35b"),
    ]),
    ("Valstrax Tree", None, [
        ("Redwing Claymore I", "36a"),
        ("Reddnaught Claymore", "36b"),
    ]),
    ("Chaos Tree", None, [
        ("Wyvern's Perch I", "37a"),
        ("Wyvern's Perch II", "37b"),
        ("Roguish Deathcap", "37c"),
    ]),
    ("Shell-Studded Tree", None, [
        ("Sleepy Shellblade I", "38a"),
        ("Sleepy Shellblade II", "38b"),
        ("Soporific Shellblade", "38c"),
    ]),
    ("Speartuna Tree", None, [
        ("Frozen Speartuna I", "39a"),
        ("Frozen Speartuna II", "39b"),
        ("Freezer Speartuna", "39c"),
    ]),
    ("Smithy Tree", None, [
        ("Ninja Parasol I", "40a"),
        ("Ninja Parasol II", "40b"),
        ("Dragonslayer Parasol", "40c"),
    ]),
    ("Felyne Tree", None, [
        ("Cat's Soul I", "41a"),
        ("Cat's Soul II", "41b"),
        ("Cat's Curse", "41c"),
    ]),
    ("Rampage Tree", None, [
        ("Rampage Cleaver I"  , "ra"),
        ("Rampage Cleaver II" , "rb"),
        ("Rampage Cleaver III", "rc"),
        ("Rampage Cleaver IV" , "rd"),
        ("Rampage Cleaver V"  , "re"),
        ("Rampage Cleaver S"  , "rf"),
    ]),
]

