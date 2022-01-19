"""
Filename: swordandshield.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Sword and Shield data
"""

# Specification to build the data
# {category: [(tree name, parent_weapon_id, [(name, id, rarity), ...]), ...]}
HARDCODED_SNS_SPEC = [
    ("Kamura Tree", None, [
        ("Kamura Sword I"    , "1a"),
        ("Kamura Sword II"   , "1b"),
        ("Kamura Sword III"  , "1c"),
        ("Kamura Sword IV"   , "1d"),
        ("Kamura Sword V"    , "1e"),
        ("Kamura Ninja Sword", "1f"),
    ]),
    ("Nargacuga Tree", "1c", [
        ("Hidden Edge I", "2a"),
        ("Hidden Edge II", "2b"),
        ("Flash in the Night", "2c"),
    ]),
    ("Mizutsune Tree", "1c", [
        ("Hana no Nagoriwo I", "3a"),
        ("Hana no Nagoriwo II", "3b"),
        ("Kurenawi Ougi", "3c"),
    ]),
    ("Bishaten Tree", "1c", [
        ("Exorcising Sword I", "4a"),
        ("Exorcising Sword II", "4b"),
        ("Shaucha Pureblade", "4c"),
    ]),
    ("Zinogre Tree", "4a", [
        ("Usurper's Firebolt I", "5a"),
        ("Usurper's Firebolt II", "5b"),
        ("Despot's Crookbolt", "5c"),
    ]),
    ("Wroggi Tree", "1b", [
        ("Dirty Baron I", "6a"),
        ("Dirty Baron II", "6b"),
        ("Dirty Marquis", "6c"),
    ]),
    ("Royal Ludroth Tree", "1b", [
        ("Royal Claw I", "7a"),
        ("Royal Claw II", "7b"),
        ("Royal Ludroth Claw", "7c"),
    ]),
    ("Tigrex Tree", "7b", [
        ("Rex Talon I", "8a"),
        ("Rex Talon II", "8b"),
        ("Tigrex Sword", "8c"),
    ]),
    ("Ice Tree", "1b", [
        ("Frost Edge I", "9a"),
        ("Frost Edge II", "9b"),
        ("Hi Frost Edge", "9c"),
    ]),
    ("Ore Tree", None, [
        ("Hunter's Knife I", "10a"),
        ("Hunter's Knife II", "10b"),
        ("Fighter Sword", "10c"),
        ("Iron Beater I", "10d"),
        ("Iron Beater II", "10e"),
        ("Smithy's Pride", "10f"),
    ]),
    ("Jaggi & Jaggia Tree", "10e", [
        ("Soldier's Dagger I", "11a"),
        ("Soldier's Dagger II", "11b"),
        ("Commander's Dagger", "11c"),
    ]),
    ("Water Tree", "10c", [
        ("Odyssey Blade I", "12a"),
        ("Odyssey Blade II", "12b"),
        ("Master Odyssey", "12c"),
    ]),
    ("Pukei-Pukei Tree", "10c", [
        ("Pukei Sword I", "13a"),
        ("Pukei Sword II", "13b"),
        ("Venomedge", "13c"),
    ]),
    ("Rathalos Tree", "13a", [
        ("Djinn I", "14a"),
        ("Djinn II", "14b"),
        ("Blazing Falchion", "14c"),
    ]),
    ("Barioth Tree", "10c", [
        ("Icicle Spike I", "15a"),
        ("Icicle Spike II", "15b"),
        ("Nardebosche", "15c"),
    ]),
    ("Tetranadon Tree", "10b", [
        ("Cunning Riposte I", "16a"),
        ("Cunning Riposte II", "16b"),
        ("Guard Breaker", "16c"),
    ]),
    ("Khezu Tree", "10b", [
        ("Khezu Razor I", "17a"),
        ("Khezu Razor II", "17b"),
        ("Painful Razor", "17c"),
    ]),
    ("Baggi Tree", "10a", [
        ("Hypnos Knife I", "18a"),
        ("Hypnos Knife II", "18b"),
        ("Morpheus Knife", "18c"),
    ]),
    ("Bone Tree", None, [
        ("Bone Kukri I", "19a"),
        ("Bone Kukri II", "19b"),
        ("Chief Kukri", "19c"),
        ("Bone Barong I", "19d"),
        ("Bone Barong II", "19e"),
        ("Grand Barong", "19f"),
    ]),
    ("Rathian Tree", "19d", [
        ("Princess Rapier I", "20a"),
        ("Princess Rapier II", "20b"),
        ("Queen Rapier", "20c"),
    ]),
    ("Bone Tree 2", "19c", [
        ("Bone Tabar I", "21a"),
        ("Bone Tabar II", "21b"),
        ("Ragdos Tabar", "21c"),
    ]),
    ("Barroth Tree", "19b", [
        ("Carapace Mace I", "22a"),
        ("Carapace Mace II", "22b"),
        ("Barroth Club", "22c"),
    ]),
    ("Diablos Tree", "22b", [
        ("Studded Club I", "23a"),
        ("Studded Club II", "23b"),
        ("Spiked Bat", "23c"),
    ]),
    ("Bullfango Tree", "19b", [
        ("Brash Buddies I", "24a"),
        ("Brash Buddies II", "24b"),
        ("Cocky Comrades", "24c"),
    ]),
    ("Anjanath Tree", "24c", [
        ("Flammensucher I", "25a"),
        ("Flammensucher II", "25b"),
        ("Gnashing Flammensucher", "25c"),
    ]),
    ("Goss Harag Tree", "24a", [
        ("Mincing Blade I", "26a"),
        ("Mincing Blade II", "26b"),
        ("Chef's Knife", "26c"),
    ]),
    ("Izuchi Tree", "19a", [
        ("Izuchi Sickle I", "27a"),
        ("Izuchi Sickle II", "27b"),
        ("Snapper Sickle", "27c"),
    ]),
    ("Uroktor Tree", "27b", [
        ("Lava Pick I", "28a"),
        ("Lava Pick II", "28b"),
        ("Burly Beak", "28c"),
    ]),
    ("Bnahabra Tree", None, [
        ("Secta Nulo I", "29a"),
        ("Secta Unu", "29b"),
        ("Secta Nulo White I", "29c"),
        ("Secta Unu White", "29d"),
    ]),
    ("Bnahabra (Dragon)", "29c", [
        ("Secta Nulo Black I", "30a"),
        ("Secta Nulo Black II", "30b"),
        ("Secta Unu Black", "30c"),
    ]),
    ("Bnahabra (Paralysis)", "29b", [
        ("Secta Nulo Green I", "31a"),
        ("Secta Unu Green", "31b"),
    ]),
    ("Bnahabra (Thunder)", "29b", [
        ("Secta Nulo Yellow I", "32a"),
        ("Secta Unu Yellow", "32b"),
    ]),
    ("Bnahabra (Fire)", "29a", [
        ("Secta Nulo Red I", "33a"),
        ("Secta Nulo Red II", "33b"),
        ("Secta Unu Red", "33c"),
    ]),
    ("Magnamalo Tree", None, [
        ("Sinister Sword I", "34a"),
        ("Sinister Sword II", "34b"),
        ("Sinister Shadekeeper", "34c"),
    ]),
    ("Rajang Tree", None, [
        ("Rajang Club I", "35a"),
        ("Rajang Club II", "35b"),
        ("Banned Rajang Club", "35c"),
    ]),
    ("Ibushi Tree", None, [
        ("Azure Elder Sword I", "36a"),
        ("Azure Elder Sword II", "36b"),
        ("Abyssal Gale Shredder", "36c"),
    ]),
    ("Narwa Tree", None, [
        ("Thunderbolt Sword I", "37a"),
        ("Abyssal Storm Shredder", "37b"),
    ]),
    ("Kushala Daora Tree", None, [
        ("Icesteel Dagger I", "38a"),
        ("Daora's Razor", "38b"),
    ]),
    ("Teostra Tree", None, [
        ("Teostra's Spada I", "39a"),
        ("Teostra's Emblem", "39b"),
    ]),
    ("Valstrax Tree", None, [
        ("Redwing Swiftblade I", "40a"),
        ("Vermilion Orgul", "40b"),
    ]),
    ("Shell-Studded Tree", None, [
        ("Sleepy Shellsword I", "41a"),
        ("Sleepy Shellsword II", "41b"),
        ("Waking Nightmare", "41c"),
    ]),
    ("Felyne Tree", None, [
        ("Catspaw I", "42a"),
        ("Catspaw II", "42b"),
        ("Catburglar", "42c"),
    ]),
    ("Guild Tree", None, [
        ("Ninja Sword I", "43a"),
        ("Hi Ninja Sword", "43b"),
    ]),
    ("Rampage Tree", None, [
        ("Rampage Sword I"  , "ra"),
        ("Rampage Sword II" , "rb"),
        ("Rampage Sword III", "rc"),
        ("Rampage Sword IV" , "rd"),
        ("Rampage Sword V"  , "re"),
        ("Rampage Sword S"  , "rf"),
    ]),
]

