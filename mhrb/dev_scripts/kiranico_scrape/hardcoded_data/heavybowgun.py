"""
Filename: heavybowgun.py
Author:   simshadows <contact@simshadows.com>

Hardcoded parts for Heavy Bowgun data
"""

# Specification to build the data
# {category: [(tree name, parent_weapon_id, [(name, id, rarity), ...]), ...]}
HARDCODED_HBG_SPEC = [
    ("Kamura Tree", None, [
        ("Kamura H. Bowgun I"    , "1a"),
        ("Kamura H. Bowgun II"   , "1b"),
        ("Kamura H. Bowgun III"  , "1c"),
        ("Kamura H. Bowgun IV"   , "1d"),
        ("Kamura H. Bowgun V"    , "1e"),
        ("Kamura Ninja H. Bowgun", "1f"),
    ]),
    ("Tigrex Tree", "1c", [
        ("Tigrex Howl I", "2a"),
        ("Tigrex Howl II", "2b"),
        ("Tigrex Skull", "2c"),
    ]),
    ("Mizutsune Tree", "1c", [
        ("Cirrus Blaster I", "3a"),
        ("Cirrus Blaster II", "3b"),
        ("Mountainous Roar", "3c"),
    ]),
    ("Tetranadon Tree", "1b", [
        ("Reversal Shot I", "4a"),
        ("Reversal Shot II", "4b"),
        ("Reversal Shot III", "4c"),
        ("Reversal Barrage", "4d"),
    ]),
    ("Rathian Tree", "4a", [
        ("Queen's Longfire I", "5a"),
        ("Queen's Longfire II", "5b"),
        ("Queen's Farflier", "5c"),
    ]),
    ("Barioth Tree", "5b", [
        ("Guerrera Cannon I", "6a"),
        ("Guerrera Cannon II", "6b"),
        ("Thorn Cannon", "6c"),
    ]),
    ("Arzuros Tree", "1b", [
        ("Arzuros Gun I", "7a"),
        ("Arzuros Gun II", "7b"),
        ("Arzuros Fishergun", "7c"),
    ]),
    ("Zinogre Tree", "7b", [
        ("Usurper's Tremor I", "8a"),
        ("Usurper's Tremor II", "8b"),
        ("Despot's Paroxysm", "8c"),
    ]),
    ("Ore Tree", None, [
        ("Iron Assault I", "9a"),
        ("Iron Assault II", "9b"),
        ("Steel Assault", "9c"),
        ("Striker's Bowgun I", "9d"),
        ("Striker's Bowgun II", "9e"),
        ("Elite Bowgun", "9f"),
    ]),
    ("Anjanath Tree", "9e", [
        ("Flammenkanone I", "10a"),
        ("Flammenkanone II", "10b"),
        ("Gnashing Flammenkanone", "10c"),
    ]),
    ("Ore Tree 2", "9b", [
        ("Meteor Bazooka I", "11a"),
        ("Meteor Bazooka II", "11b"),
        ("Meteor Cannon", "11c"),
    ]),
    ("Basarios Tree", "11a", [
        ("Rock Eater I", "12a"),
        ("Rock Eater II", "12b"),
        ("Earth Eater", "12c"),
    ]),
    ("Rhenoplos Tree", "9b", [
        ("Marino Burst I", "13a"),
        ("Marino Burst II", "13b"),
        ("Marino Cannon", "13c"),
    ]),
    ("Volvidon Tree", "13a", [
        ("Carom Shot I", "14a"),
        ("Carom Shot II", "14b"),
        ("Rebound Shot", "14c"),
    ]),
    ("Izuchi Tree", "9a", [
        ("Wind Thief Crossbow I", "15a"),
        ("Wind Thief Crossbow II", "15b"),
        ("Wind Thief Crossbow III", "15c"),
        ("Gale Crossbow", "15d"),
    ]),
    ("Rakna-Kadaki Tree", "15c", [
        ("Fulgent Shot I", "16a"),
        ("Fulgent Shot II", "16b"),
        ("Araknamortar", "16c"),
    ]),
    ("Bone Tree", None, [
        ("Bone Shooter I", "17a"),
        ("Bone Shooter II", "17b"),
        ("Bone Buster", "17c"),
        ("Pukei Launcher I", "17d"),
        ("Pukei Launcher II", "17e"),
        ("Venomhail", "17f"),
    ]),
    ("Anteka Tree", "17b", [
        ("Anteka Burst I", "18a"),
        ("Anteka Burst II", "18b"),
        ("Anteka Blaster", "18c"),
    ]),
    ("Diablos Tree", "18b", [
        ("Dual Threat I", "19a"),
        ("Dual Threat II", "19b"),
        ("Diablazooka", "19c"),
    ]),
    ("Tobi-Kadachi Tree", "17b", [
        ("Kadachi Cannon I", "20a"),
        ("Kadachi Cannon II", "20b"),
        ("Kadachi Raijodo", "20c"),
    ]),
    ("Kelbi Tree", "17a", [
        ("Rapidcaster I", "21a"),
        ("Rapidcaster II", "21b"),
        ("Cyclecaster", "21c"),
    ]),
    ("Nargacuga Tree", "21b", [
        ("Hidden Gambit I", "22a"),
        ("Hidden Gambit II", "22b"),
        ("Baleful Night", "22c"),
    ]),
    ("Bishaten Tree", "21b", [
        ("Highpriest Bowgun I", "23a"),
        ("Highpriest Bowgun II", "23b"),
        ("Bishaten's Grace", "23c"),
    ]),
    ("Lagombi Tree", "17a", [
        ("Spheniscine Slayer I", "24a"),
        ("Spheniscine Slayer II", "24b"),
        ("Spheniscine Ruler", "24c"),
    ]),
    ("Magnamalo Tree", None, [
        ("Sinister Volley I", "25a"),
        ("Sinister Volley II", "25b"),
        ("Sinister Dreadvolley", "25c"),
    ]),
    ("Rajang Tree", None, [
        ("Rajang Shooter I", "26a"),
        ("Rajang Shooter II", "26b"),
        ("Rajang's Rage", "26c"),
    ]),
    ("Ibushi Tree", None, [
        ("Azure Elder Cannon I", "27a"),
        ("Azure Elder Cannon II", "27b"),
        ("Abyssal Gale Barrage", "27c"),
    ]),
    ("Narwa Tree", None, [
        ("Thunderbolt Cannon I", "28a"),
        ("Abyssal Storm Barrage", "28b"),
    ]),
    ("Kushala Daora Tree", None, [
        ("Daora's Delphinidae I", "29a"),
        ("Daora Grande", "29b"),
    ]),
    ("Teostra Tree", None, [
        ("Teostra's Artillery I", "30a"),
        ("Teostra's Flames", "30b"),
    ]),
    ("Chameleos Tree", None, [
        ("Kamaeleon I", "31a"),
        ("Veiled Kamaeleon", "31b"),
    ]),
    ("Valstrax Tree", None, [
        ("Redwing Cannon I", "32a"),
        ("Diabolica", "32b"),
    ]),
    ("Mosgharl Tree", None, [
        ("Carrozza Bazooka I", "33a"),
        ("Carrozza Bazooka II", "33b"),
        ("Cendrillon", "33c"),
    ]),
    ("Jelly Tree", None, [
        ("Journey Jelly I", "34a"),
        ("Journey Jelly II", "34b"),
        ("Guiding Light", "34c"),
    ]),
    ("Smithy Tree", None, [
        ("Ladybug Cannon I", "35a"),
        ("Ladybug Cannon II", "35b"),
        ("Ladybug Mortar", "35c"),
    ]),
    ("Felyne Tree", None, [
        ("Felyne Bowgun I", "36a"),
        ("Felyne Bowgun II", "36b"),
        ("Felyne Cannon", "36c"),
    ]),
    ("Rampage Tree", None, [
        ("Rampage H. Bowgun I"  , "ra"),
        ("Rampage H. Bowgun II" , "rb"),
        ("Rampage H. Bowgun III", "rc"),
        ("Rampage H. Bowgun IV" , "rd"),
        ("Rampage H. Bowgun V"  , "re"),
        ("Rampage H. Bowgun S"  , "rf"),
    ]),
]

