"""
Filename: switchaxe.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Switch Axe data
"""

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
HARDCODED_SA_SPEC = [
    ("Kamura Tree", [
        ("Kamura Iron Axe I"  , "1a"),
        ("Kamura Iron Axe II" , "1b"),
        ("Kamura Iron Axe III", "1c"),
        ("Kamura Iron Axe IV" , "1d"),
        ("Kamura Iron Axe V"  , "1e"),
        ("Kamura Ninja Axe"   , "1f"),
    ]),
    ("Mizutsune Tree", [
        ("Fond Farewell I", "2a"),
        ("Fond Farewell II", "2b"),
        ("Parting Slice", "2c"),
    ]),
    ("Rathalos Tree", [
        ("Rath Flamesplitter I", "3a"),
        ("Rath Flamesplitter II", "3b"),
        ("Rath Flamesplitter III", "3c"),
        ("Rath Blaze Splitter", "3d"),
    ]),
    ("Bishaten Tree", [
        ("Wheel Axe I", "4a"),
        ("Wheel Axe II", "4b"),
        ("Axe of Wisdom", "4c"),
    ]),
    ("Delex Tree", [
        ("Delex Sail I", "5a"),
        ("Delex Sail II", "5b"),
        ("Delex Cleaver", "5c"),
    ]),
    ("Khezy Tree", [
        ("Khezu Axe I", "6a"),
        ("Khezu Axe II", "6b"),
        ("Khezu Cleaver", "6c"),
    ]),
    ("Arzuros Tree", [
        ("Arzuros Axe I", "7a"),
        ("Arzuros Axe II", "7b"),
        ("Arzuros Revelax", "7c"),
    ]),
    ("Barioth Tree", [
        ("Amber Slash I", "8a"),
        ("Amber Slash II", "8b"),
        ("Amber Slash III", "8c"),
        ("Amber Hoarfrost", "8d"),
    ]),
    ("Ore Tree", [
        ("Proto Iron Axe I", "9a"),
        ("Proto Iron Axe II", "9b"),
        ("Improved Steel Axe", "9c"),
        ("Elite Switch Axe I", "9d"),
        ("Elite Switch Axe II", "9e"),
        ("Czar Switch Axe", "9f"),
    ]),
    ("Jyuratodus Tree", [
        ("Limus Os I", "10a"),
        ("Limus Os II", "10b"),
        ("Luto Ascia", "10c"),
    ]),
    ("Rathian Tree", [
        ("Dragonmaiden Axe I", "11a"),
        ("Dragonmaiden Axe II", "11b"),
        ("Gr\u00ed\u00f0r's Landmaker", "11c"),
    ]),
    ("Ore Tree 2", [
        ("General's Strongaxe I", "12a"),
        ("General's Strongaxe II", "12b"),
        ("Conqueress", "12c"),
    ]),
    ("Thunder Tree", [
        ("The Shredder I", "13a"),
        ("The Shredder II", "13b"),
        ("The Power Shredder", "13c"),
    ]),
    ("Dragon Tree", [
        ("Ash Drache I", "14a"),
        ("Ash Drache II", "14b"),
        ("Fall Drache", "14c"),
    ]),
    ("Almudron Tree", [
        ("Almudron Axe I", "15a"),
        ("Almudron Axe II", "15b"),
        ("Doom Bringer Axe", "15c"),
    ]),
    ("Aknosom Tree", [
        ("Axenosom I", "16a"),
        ("Axenosom II", "16b"),
        ("Axenosom III", "16c"),
        ("Daybreak Silvaris", "16d"),
    ]),
    ("Barroth Tree", [
        ("Assault Axe I", "17a"),
        ("Assault Axe II", "17b"),
        ("Blitzkrieg", "17c"),
    ]),
    ("Baggi Tree", [
        ("Snowfall Axe I", "18a"),
        ("Snowfall Axe II", "18b"),
        ("Snowfall Axe III", "18c"),
        ("Dewdrop Dream", "18d"),
    ]),
    ("Bone Tree", [
        ("Bone Axe I", "19a"),
        ("Bone Axe II", "19b"),
        ("Daidalos Axe", "19c"),
        ("Power Gasher I", "19d"),
        ("Power Gasher II", "19e"),
        ("Maximal Gasher", "19f"),
    ]),
    ("Anjanath Tree", [
        ("Flammenbeil I", "20a"),
        ("Flammenbeil II", "20b"),
        ("Gnashing Flammenbeil", "20c"),
    ]),
    ("Tigrex Tree", [
        ("Rex Slasher I", "21a"),
        ("Rex Slasher II", "21b"),
        ("Rex Gnasher", "21c"),
    ]),
    ("Diablos Tree", [
        ("Axe Semper Tyrannis I", "22a"),
        ("Axe Semper Tyrannis II", "22b"),
        ("Grand Chaos", "22c"),
    ]),
    ("Remobra Tree", [
        ("Venom Hatchet I", "23a"),
        ("Venom Hatchet II", "23b"),
        ("Mortal Serpent", "23c"),
    ]),
    ("Nargacuga Tree", [
        ("Hidden Axe I", "24a"),
        ("Hidden Axe II", "24b"),
        ("Night's Crescent", "24c"),
    ]),
    ("Volvidon Tree", [
        ("Binding Roller I", "25a"),
        ("Binding Roller II", "25b"),
        ("Binding Roller III", "25c"),
        ("Vermilingua", "25d"),
    ]),
    ("Royal Ludroth Tree", [
        ("Ludroth Axe I", "26a"),
        ("Ludroth Axe II", "26b"),
        ("Splish Splax", "26c"),
    ]),
    ("Zinogre Tree", [
        ("Usurper's Downpour I", "27a"),
        ("Usurper's Downpour II", "27b"),
        ("Despot's Cloudburst", "27c"),
    ]),
    ("Lagombi Tree", [
        ("Longear Axe I", "28a"),
        ("Longear Axe II", "28b"),
        ("Longear Axe III", "28c"),
        ("Longear Weiss", "28d"),
    ]),
    ("Magnamalo Tree", [
        ("Sinister Axe I", "29a"),
        ("Sinister Axe II", "29b"),
        ("Sinister Shadowslice", "29c"),
    ]),
    ("Rajang Tree", [
        ("Undying Axe I", "30a"),
        ("Undying Axe II", "30b"),
        ("Undying Light", "30c"),
    ]),
    ("Ibushi Tree", [
        ("Azure Elder Axe I", "31a"),
        ("Azure Elder Axe II", "31b"),
        ("Abyssal Gale Axe", "31c"),
    ]),
    ("Narwa Tree", [
        ("Thunderbolt Axe I", "32a"),
        ("Abyssal Storm Axe", "32b"),
    ]),
    ("Bazelgeuse Tree", [
        ("Rookslayer Axe I", "33a"),
        ("Rookslayer Axe II", "33b"),
        ("Bazelrush Rookslayer", "33c"),
    ]),
    ("Kushala Daora Tree", [
        ("Daora's Farasa I", "34a"),
        ("Daora's Janah", "34b"),
    ]),
    ("Teostra Tree", [
        ("Teostra's Arx I", "35a"),
        ("Teostra's Castle", "35b"),
    ]),
    ("Chameleos Tree", [
        ("Waxglare Wand I", "36a"),
        ("Balor's Mirage", "36b"),
    ]),
    ("Valstrax Tree", [
        ("Redwing Switch Axe I", "37a"),
        ("Reddnaught Dunat", "37b"),
    ]),
    ("Smithy Tree", [
        ("Origami Axe I", "38a"),
        ("Origami Axe II", "38b"),
        ("Petal Cloud", "38c"),
    ]),
    ("Felyne Tree", [
        ("Grim Cat I", "39a"),
        ("Grim Cat II", "39b"),
        ("Grimmige Katze", "39c"),
    ]),
    ("Death Stench Tree", [
        ("Infernal Axe I", "40a"),
        ("Infernal Axe II", "40b"),
        ("Hellish Edge", "40c"),
    ]),
    ("Shell-Studded Tree", [
        ("Sleepy Shellslice I", "41a"),
        ("Sleepy Shellslice II", "41b"),
        ("Schale Batis", "41c"),
    ]),
    ("Rampage Tree", [
        ("Rampage Slicer I"  , "42a"),
        ("Rampage Slicer II" , "42b"),
        ("Rampage Slicer III", "42c"),
        ("Rampage Slicer IV" , "42d"),
        ("Rampage Slicer V"  , "42e"),
        ("Rampage Slicer S"  , "42f"),
    ]),
]

