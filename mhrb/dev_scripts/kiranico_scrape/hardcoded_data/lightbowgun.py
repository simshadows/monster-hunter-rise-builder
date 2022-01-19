"""
Filename: lightbowgun.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Light Bowgun data
"""

# Specification to build the data
# {category: [(tree name, parent_weapon_id, [(name, id, rarity), ...]), ...]}
HARDCODED_LBG_SPEC = [
    ("Kamura Tree", None, [
        ("Kamura L. Bowgun I"    , "1a"),
        ("Kamura L. Bowgun II"   , "1b"),
        ("Kamura L. Bowgun III"  , "1c"),
        ("Kamura L. Bowgun IV"   , "1d"),
        ("Kamura L. Bowgun V"    , "1e"),
        ("Kamura Ninja L. Bowgun", "1f"),
    ]),
    ("Nargacuga Tree", "1c", [
        ("Hidden Eye I", "2a"),
        ("Hidden Eye II", "2b"),
        ("Night Owl", "2c"),
    ]),
    ("Rakna-Kadaki Tree", "2b", [
        ("Lumier Bowgun I", "3a"),
        ("Lumier Bowgun II", "3b"),
        ("Araknabolt", "3c"),
    ]),
    ("Bishaten Tree", "1c", [
        ("Lotus Bowgun I", "4a"),
        ("Lotus Bowgun II", "4b"),
        ("Great Lotus Bowgun", "4c"),
    ]),
    ("Khezu Tree", "1b", [
        ("Khezu Syringe I", "5a"),
        ("Khezu Syringe II", "5b"),
        ("Khezu Syringe III", "5c"),
        ("Khezu Hypo", "5d"),
    ]),
    ("Remobra Tree", "1b", [
        ("Shotgun (Viper) I", "6a"),
        ("Shotgun (Viper) II", "6b"),
        ("Shotgun (Viper) III", "6c"),
        ("Bullet Rain (Viper)", "6d"),
    ]),
    ("Barroth Tree", "6a", [
        ("Barro Barrel I", "7a"),
        ("Barro Barrel II", "7b"),
        ("Barro Blaster", "7c"),
    ]),
    ("Goss Harag Tree", "7b", [
        ("Gossgun I", "8a"),
        ("Gossgun II", "8b"),
        ("Gossgun III", "8c"),
        ("Abominable Bowgun", "8d"),
    ]),
    ("Ore Tree", None, [
        ("Hunter's Rifle I", "9a"),
        ("Hunter's Rifle II", "9b"),
        ("Sniper Shot", "9c"),
        ("Jaeger I", "9d"),
        ("Jaeger II", "9e"),
        ("Jaeger Prime", "9f"),
    ]),
    ("Zinogre Tree", "9c", [
        ("Usurper's Crime I", "10a"),
        ("Usurper's Crime II", "10b"),
        ("Despot's Wildfire", "10c"),
    ]),
    ("Almudron Tree", "10a", [
        ("Almudron Bowgun I", "11a"),
        ("Almudron Bowgun II", "11b"),
        ("Doom Bringer Bowgun", "11c"),
    ]),
    ("Uroktor Tree", "9b", [
        ("Scale Tornado I", "12a"),
        ("Scale Tornado II", "12b"),
        ("Uroktor Vortex", "12c"),
    ]),
    ("Mizutsune Tree", "12a", [
        ("Desolate Mist I", "13a"),
        ("Desolate Mist II", "13b"),
        ("Nifl Mist", "13c"),
    ]),
    ("Izuchi Tree", "9a", [
        ("Wind Thief L. Bowgun I", "14a"),
        ("Wind Thief L. Bowgun II", "14b"),
        ("Wind Thief L. Bowgun III", "14c"),
        ("Gale Bowgun", "14d"),
    ]),
    ("Anjanath Tree", "14c", [
        ("Flammengewehr I", "15a"),
        ("Flammengewehr II", "15b"),
        ("Furious Flammengewehr", "15c"),
    ]),
    ("Rathian Tree", "14b", [
        ("Valkyrie Fire I", "16a"),
        ("Valkyrie Fire II", "16b"),
        ("Valkyrie Blaze", "16c"),
    ]),
    ("Bone Tree", None, [
        ("Cross Bowgun I", "17a"),
        ("Cross Bowgun II", "17b"),
        ("Cross Blitz", "17c"),
        ("Yakt Shooter I", "17d"),
        ("Yakt Shooter II", "17e"),
        ("Wyvern Chaser", "17f"),
    ]),
    ("Jyuratodus Tree", "17e", [
        ("Wishing Star I", "18a"),
        ("Wishing Star II", "18b"),
        ("Comet Bolt", "18c"),
    ]),
    ("Rathalos Tree", "17c", [
        ("Rathling Gun I", "19a"),
        ("Rathling Gun II", "19b"),
        ("Rathling Phoenix", "19c"),
    ]),
    ("Barioth Tree", "17c", [
        ("Blizzard Cannon I", "20a"),
        ("Blizzard Cannon II", "20b"),
        ("Blizzard Volley", "20c"),
    ]),
    ("Basarios Tree", "17c", [
        ("Grenade Launcher I", "21a"),
        ("Grenade Launcher II", "21b"),
        ("Grenade Launcher III", "21c"),
        ("Grenade Revolver", "21d"),
    ]),
    ("Tigrex Tree", "21c", [
        ("Tigrex Tank I", "22a"),
        ("Tigrex Tank II", "22b"),
        ("Tigrex Wargun", "22c"),
    ]),
    ("Royal Ludroth Tree", "17b", [
        ("Royal Launcher I", "23a"),
        ("Royal Launcher II", "23b"),
        ("Royal Torrent", "23c"),
    ]),
    ("Magnamalo Tree", None, [
        ("Sinister Bowgun I", "24a"),
        ("Sinister Bowgun II", "24b"),
        ("Sinister Shadow Bolt", "24c"),
    ]),
    ("Rajang Tree", None, [
        ("Rajang Barrage I", "25a"),
        ("Rajang Barrage II", "25b"),
        ("Ten Thousand Volts", "25c"),
    ]),
    ("Ibushi Tree", None, [
        ("Azure Elder Bowgun I", "26a"),
        ("Azure Elder Bowgun II", "26b"),
        ("Abyssal Gale Bolt", "26c"),
    ]),
    ("Narwa Tree", None, [
        ("Thunderbolt Bowgun I", "27a"),
        ("Abyssal Storm Bolt", "27b"),
    ]),
    ("Bazelgeuse Tree", None, [
        ("Rookslayer Bowgun I", "28a"),
        ("Rookslayer Bowgun II", "28b"),
        ("Bazelfetter Rookslayer", "28c"),
    ]),
    ("Kushala Daora Tree", None, [
        ("Icesteel Wasp I", "29a"),
        ("Daora's Hornet", "29b"),
    ]),
    ("Teostra Tree", None, [
        ("Teostra's Dart I", "30a"),
        ("Teostra's Flamebolt", "30b"),
    ]),
    ("Chameleos Tree", None, [
        ("Blessed Lamp I", "31a"),
        ("Cursed Lamp", "31b"),
    ]),
    ("Valstrax Tree", None, [
        ("Redwing Shooter I", "32a"),
        ("Reddnaught Bowgun", "32b"),
    ]),
    ("Canyne Tree", None, [
        ("Wooden Dog Bowgun I", "33a"),
        ("Wooden Dog Bowgun II", "33b"),
        ("Watchdog's Howl", "33c"),
    ]),
    ("Makluva Tree", None, [
        ("Springnight Shot I", "34a"),
        ("Springnight Shot II", "34b"),
        ("Springnight Spawn", "34c"),
    ]),
    ("Rampage Tree", None, [
        ("Rampage L. Bowgun I"  , "ra"),
        ("Rampage L. Bowgun II" , "rb"),
        ("Rampage L. Bowgun III", "rc"),
        ("Rampage L. Bowgun IV" , "rd"),
        ("Rampage L. Bowgun V"  , "re"),
        ("Rampage L. Bowgun S"  , "rf"),
    ]),
]

