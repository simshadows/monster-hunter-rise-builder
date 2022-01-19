#!/usr/bin/env python3

"""
Filename: kiranico_scrape.py
Author:   simshadows <contact@simshadows.com>
License:  GNU Affero General Public License v3 (AGPL-3.0)

This script was built to scrape <https://mhrise.kiranico.com/> and dump the files into `./downloaded_data`.

The contents of `./downloaded_data` will need to be processed by another script to use in the builder program.

Dependencies:
    python3 -m pip install requests
    python3 -m pip install beautifulsoup4

NOTE: To avoid server-side request limits, we intentionally don't download pages aggressively.
      This script will take a while to run.
"""

import os
import sys
import re
import json
import requests
import multiprocessing as mp

from bs4 import BeautifulSoup

WEAPON_URLS = [
    ("greatsword"    , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=0" , {"elestat", "melee"}),
    ("longsword"     , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=3" , {"elestat", "melee"}),
    ("swordandshield", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=1" , {"elestat", "melee"}),
    ("dualblades"    , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=2" , {"elestat", "melee"}),
    ("lance"         , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=6" , {"elestat", "melee"}),
    ("gunlance"      , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=7" , {"elestat", "melee"}),
    ("hammer"        , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=4" , {"elestat", "melee"}),
    ("huntinghorn"   , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=5" , {"elestat", "melee"}),
    ("switchaxe"     , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=8" , {"elestat", "melee"}),
    ("chargeblade"   , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=9" , {"elestat", "melee"}),
    ("insectglaive"  , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=10", {"elestat", "melee"}),
    ("lightbowgun"   , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=13", set()),
    ("heavybowgun"   , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=12", set()),
    ("bow"           , "https://mhrise.kiranico.com/data/weapons?scope=wp&value=11", {"elestat"}),
]

module_dir_abs = os.path.dirname(os.path.abspath(__file__))

#
# UTILITIES
#

def download(url):
    return BeautifulSoup(requests.get(url).content, "html.parser")

def fwrite_json(path, data=None):
    with open(path, encoding="utf-8", mode="w") as f:
        f.write(json.dumps(data, sort_keys=True, indent=4))
    return

def process_string_to_identifier(s):
    s = s.strip().replace("-", " ").replace("+", "plus").split()
    m = {"I": "1", "II": "2", "III": "3", "IV": "4", "V": "5", "VI": "6"}
    a = [(m[x] if (x in m) else x.lower()) for x in s] # Convert roman numerals and force to all-lowercase
    return "_".join(re.sub("[^a-z0-9]+", "", x) for x in a) # Filter out non-alphanumeric

#
# SCRAPER
#

def scrape_weapon_page(url, name, category, tagset):
    soup = download(url)

    c = soup.find_all("dl", "grid")
    assert len(c) == 1
    c = c[0]

    rarity = int(c.contents[2].contents[1].contents[0].strip()) + 1
    attack = int(c.contents[6].contents[1].contents[0].strip())
    affinity = int(c.contents[7].contents[1].contents[0].strip())
    defense = int(c.contents[8].contents[1].contents[0].strip())

    rampage_skills = [[], [], [], [], [], []]

    c = soup.find_all("tbody", "divide-gray-200")
    assert len(c) == 3
    c = c[0]

    for c2 in c.contents:
        ramp_slot = int(c2.contents[0].contents[0].strip()) - 1

        assert (ramp_slot >= 0) and (ramp_slot < 6)
        #if not ((ramp_slot >= 0) and (ramp_slot < 6)):
        #    print(f"WARNING: ramp slot {ramp_slot} for {category} {name}")
        #    continue

        ramp_skill = c2.contents[1].contents[0].contents[0].strip()
        ramp_skill = process_string_to_identifier(ramp_skill)

        rampage_skills[ramp_slot].append(str(ramp_skill))

    return {
            "rarity": int(rarity),
            "attack": int(attack),
            "affinity": int(affinity),
            "defense": int(defense),

            "ramps": rampage_skills,
        }

def scrape_weapon_category_page(weapon_category, url, tagset):
    soup = download(url)

    c = soup.find_all("tbody", "bg-white")
    assert len(c) == 1
    c = c[0]

    #print(weapon_category + ": " + str(len(c.contents)) + " children.")

    ret = []
    for (table_index, c2) in enumerate(c.contents):
        print(str(weapon_category) + " " + str(table_index) + " / " + str(len(c.contents)))

        assert len(c2) == 7
        weapon_name = c2.contents[1].contents[0].contents[0].contents[0]
        weapon_page_url = c2.contents[1].contents[0].contents[0]["href"]
        decos = []
        elestat = {}
        base_sharpness = None
        max_sharpness = None

        gunlance_stats = None
        huntinghorn_songs = None
        switchaxe_stats = None
        chargeblade_stats = None
        insectglaive_stats = None
        bow_stats = None
        bowgun_stats = None

        num_decos = len(c2.contents[1].contents) - 1
        assert (num_decos >= 0) and (num_decos <= 3)
        for i in range(num_decos):
            v2 = c2.contents[1].contents[i + 1]["src"]
            if "deco1.png" in v2:
                decos.append(1)
            elif "deco2.png" in v2:
                decos.append(2)
            elif "deco3.png" in v2:
                decos.append(3)
        decos.sort(reverse=True)

        if "elestat" in tagset:
            for c3 in c2.contents[4].contents:
                if (len(c3.contents) == 2) and (c3.contents[0].name == "svg"):
                    icon = c3.contents[0].contents[0]["src"]
                    elestat_value = int(c3.contents[1].strip())

                    elestat_type = None
                    if "ElementType1.png" in icon:
                        elestat_type = "fire"
                    elif "ElementType2.png" in icon:
                        elestat_type = "water"
                    elif "ElementType3.png" in icon:
                        elestat_type = "thunder"
                    elif "ElementType4.png" in icon:
                        elestat_type = "ice"
                    elif "ElementType5.png" in icon:
                        elestat_type = "dragon"
                    elif "ElementType6.png" in icon:
                        elestat_type = "poison"
                    elif "ElementType7.png" in icon:
                        elestat_type = "sleep"
                    elif "ElementType8.png" in icon:
                        elestat_type = "paralysis"
                    elif "ElementType9.png" in icon:
                        elestat_type = "blast"

                    assert elestat_type is not None
                    assert elestat_value > 0

                    assert elestat_type not in elestat
                    elestat[elestat_type] = elestat_value

        if "melee" in tagset:
            base_sharpness = []
            max_sharpness = []

            v2a = c2.contents[5].contents[0].contents[0]
            v2b = c2.contents[5].contents[0].contents[1]
            assert (len(v2a) == 7) and (len(v2b) == 7) # sharpness levels
            for c3 in v2a.contents:
                sharpness_value = int(c3["style"][7:-28]) * 5
                base_sharpness.append(sharpness_value)
            for c3 in v2b.contents:
                sharpness_value = int(c3["style"][7:-28]) * 5
                max_sharpness.append(sharpness_value)

        if weapon_category == "gunlance":
            gunlance_stats = {}
            special_mech_str = str(c2.contents[6].contents[0].contents[0]).strip()
            substrs = special_mech_str.split()

            gunlance_stats["shelling_type"] = process_string_to_identifier(" ".join(substrs[:-1]))
            gunlance_stats["shelling_level"] = int(substrs[-1])

        if weapon_category == "huntinghorn":
            huntinghorn_songs = {}
            huntinghorn_songs["x_x"] = process_string_to_identifier(str(c2.contents[6].contents[0].contents[0]))
            huntinghorn_songs["a_a"] = process_string_to_identifier(str(c2.contents[6].contents[1].contents[0]))
            huntinghorn_songs["xa_xa"] = process_string_to_identifier(str(c2.contents[6].contents[2].contents[0]))

        if weapon_category == "switchaxe":
            switchaxe_stats = {}
            special_mech_str = str(c2.contents[6].contents[0].contents[0]).strip()

            # We see if there's a number at the end of the string
            substrs = special_mech_str.split()
            phial_value = None
            try:
                phial_value = int(substrs[-1])
                special_mech_str = " ".join(substrs[:-1])
            except ValueError: # Happens if the last string isn't an int, which can happen
                pass

            switchaxe_stats["phial_type"] = process_string_to_identifier(special_mech_str)
            switchaxe_stats["phial_value"] = phial_value

        if weapon_category == "chargeblade":
            chargeblade_stats = {}
            chargeblade_stats["phial_type"] = process_string_to_identifier(str(c2.contents[6].contents[0].contents[0]).strip())

        if weapon_category == "insectglaive":
            insectglaive_stats = {}
            special_mech_str = str(c2.contents[6].contents[0].contents[0]).strip()
            assert special_mech_str[:14] == "Kinsect Level "
            kinsect_level = int(special_mech_str[14:])
            insectglaive_stats["kinsect_level"] = kinsect_level

        if weapon_category == "bow":
            bow_stats = {}

            special_mech_1_str = str(c2.contents[5].contents[0].contents[0]).strip()
            special_mech_2 = c2.contents[5].contents[1:]
            special_mech_3 = c2.contents[6].contents

            bow_stats["arc_shot"] = process_string_to_identifier(special_mech_1_str)
            assert len(bow_stats["arc_shot"]) != 0

            bow_stats["charge_shot"] = []
            bow_stats["base_charge_level_limit"] = None # We calculate this in the loop
            in_grey = False # For debugging
            for (i, c3) in enumerate(special_mech_2):
                if len(c3.contents) == 0:
                    continue

                classes = c3.get("class", [])
                if len(classes) == 0:
                    assert not in_grey
                    bow_stats["base_charge_level_limit"] = i + 1
                else:
                    assert len(classes) == 1
                    in_grey = True

                substrs = str(c3.contents[0]).split()
                assert len(substrs) == 3
                assert substrs[1] == "Level"
                charge_shot_type_id = process_string_to_identifier(substrs[0])
                charge_shot_level = int(substrs[2]) # Implicit check for string formatting
                assert charge_shot_level > 0
                bow_stats["charge_shot"].append([charge_shot_type_id, charge_shot_level])

            bow_stats["compatible_coatings"] = {}
            def read_coating(c3, expected_coating_type):
                coating_type_id = process_string_to_identifier(expected_coating_type)
                compatibility = None # We calculate soon

                classes = c3.get("class", [])
                if len(classes) == 0:
                    # Text is not specially formatted, so it's a regular coating
                    compatibility = 1
                else:
                    assert len(classes) == 1
                    # Text is either formatted grey (meaning disabled), or green (meaning it's the "plus" version)
                    if classes[0] == "text-gray-400":
                        compatibility = 0
                    elif classes[0] == "text-green-500":
                        compatibility = 2
                    else:
                        raise ValueError("Unexpected HTML class name.")

                bow_stats["compatible_coatings"][coating_type_id] = compatibility

            assert len(special_mech_3) == 7
            read_coating(special_mech_3[0], "Close-range Coating")
            read_coating(special_mech_3[1], "Power Coating"      )
            read_coating(special_mech_3[2], "Poison Coating"     )
            read_coating(special_mech_3[3], "Para Coating"       )
            read_coating(special_mech_3[4], "Sleep Coating"      )
            read_coating(special_mech_3[5], "Blast Coating"      )
            read_coating(special_mech_3[6], "Exhaust Coating"    )

        if weapon_category == "lightbowgun" or weapon_category == "heavybowgun":
            bowgun_stats = {}

            c3 = c2.contents[5].contents[0].contents[0]

            assert len(c3) == 5 # Number of tables in c3
            c4a = c3.contents[0]
            c4b = c3.contents[1].contents[0]
            c4c = c3.contents[2].contents[0]
            c4d = c3.contents[3].contents[0]
            c4e = c3.contents[4].contents[0]

            assert len(c4a) == 3 # Number of rows
            deviation_str = str(c4a.contents[0].contents[0]).strip()
            recoil_str    = str(c4a.contents[1].contents[0]).strip()
            reload_str    = str(c4a.contents[2].contents[0]).strip()

            deviation_substrs = deviation_str.split()
            if len(deviation_substrs) == 2:
                assert deviation_substrs[0] == "Deviation"
                assert deviation_substrs[1] == "None" # Can only be None
                bowgun_stats["deviation"] = {
                    "severity": 0,
                    "left": False,
                    "right": False,
                }
            elif len(deviation_substrs) == 3:
                assert deviation_substrs[0] == "Deviation"
                severity = 0
                left = False
                right = False
                
                if deviation_substrs[1] == "L":
                    left = True
                elif deviation_substrs[1] == "R":
                    right = True
                elif deviation_substrs[1] == "LR":
                    left = True
                    right = True
                else:
                    raise ValueError("Unexpected string")

                severity = {
                    "Mild": 1,
                    "Severe": 2
                }[deviation_substrs[2]]

                bowgun_stats["deviation"] = {
                    "severity": severity,
                    "left": left,
                    "right": right,
                }
            else:
                raise ValueError("Unexpected length")

            recoil_substrs = recoil_str.split()
            assert recoil_substrs[0] == "Recoil"
            recoil_tup = tuple(recoil_substrs[1:])
            bowgun_stats["recoil"] = {
                #("Smallest",): 0, # Doesn't exist at base configuration
                #("Very", "Low"): 1, # Doesn't exist at base configuration
                #("Low",): 2, # (See the last entry...)
                ("Some",): 3,
                ("Average",): 4,
                ("High",): 5,

                ("Very", "Low"): 2, # Kiranico mistakenly writes "Very Low" instead of "Low".
            }[recoil_tup]

            reload_substrs = reload_str.split()
            assert reload_substrs[0] == "Reload"
            reload_tup = tuple(reload_substrs[1:])
            bowgun_stats["reload"] = {
                #("Slowest",): 0, # Doesn't exist at base configuration
                ("Very", "Slow"): 1,
                ("Slow",): 2,
                ("Below", "Avg."): 3,
                ("Average",): 4,
                ("Above", "Avg."): 5,
                ("Fast",): 6,
                #("Very", "Fast"): 7, # Doesn't exist at base configuration
                #("Fastest",): 8, # Doesn't exist at base configuration
            }[reload_tup]

            ammo_stats = bowgun_stats["ammo"] = {}
            def parse_row(c5, expected_first_cell, expected_cols):
                assert len(c5) == expected_cols
                assert str(c5.contents[0].contents[0]) == expected_first_cell

                ret2 = []
                for c6 in c5.contents[1:]:
                    classes = tuple(c6.get("class", []))

                    if classes == tuple():
                        available = True
                    elif classes == ("text-gray-400",):
                        available = False
                    else:
                        raise ValueError("Unexpected HTML classes: " + str(classes))

                    ammo_capacity = int(c6.contents[0])

                    assert ammo_capacity >= 0
                    assert ammo_capacity < 10 # Sanity check. If a new weapon comes out that exceeds this, update the check!
                    assert not (available and (ammo_capacity == 0)) # This shouldn't exist

                    ret2.append({"available": available, "ammo_capacity": ammo_capacity})
                return ret2

            assert len(c4b) == 6 # Number of rows
            ammo_stats["normal"]   = parse_row(c4b.contents[0], "Nrm", 4)
            ammo_stats["pierce"]   = parse_row(c4b.contents[1], "Prc", 4)
            ammo_stats["spread"]   = parse_row(c4b.contents[2], "Spr", 4)
            ammo_stats["shrapnel"] = parse_row(c4b.contents[3], "Shr", 4)
            ammo_stats["sticky"]   = parse_row(c4b.contents[4], "Sti", 4)
            ammo_stats["cluster"]  = parse_row(c4b.contents[5], "Clu", 4)

            assert len(c4c) == 5 # Number of rows
            ammo_stats["fire"]    = parse_row(c4c.contents[0], "Fir/P.", 3)
            ammo_stats["water"]   = parse_row(c4c.contents[1], "Wat/P.", 3)
            ammo_stats["thunder"] = parse_row(c4c.contents[2], "Thn/P.", 3)
            ammo_stats["ice"]     = parse_row(c4c.contents[3], "Ice/P.", 3)
            ammo_stats["dragon"]  = parse_row(c4c.contents[4], "Dra/P.", 3)

            assert len(c4d) == 5 # Number of rows
            ammo_stats["poison"]    = parse_row(c4d.contents[0], "Poi", 3)
            ammo_stats["paralysis"] = parse_row(c4d.contents[1], "Par", 3)
            ammo_stats["sleep"]     = parse_row(c4d.contents[2], "Sle", 3)
            ammo_stats["exhaust"]   = parse_row(c4d.contents[3], "Exh", 3)
            ammo_stats["recover"]   = parse_row(c4d.contents[4], "Rec", 3)

            assert len(c4e) == 5 # Number of rows
            ammo_stats["demon"]   = parse_row(c4e.contents[0], "Dem", 2)
            ammo_stats["armor"]   = parse_row(c4e.contents[1], "Amr", 2)
            ammo_stats["slicing"] = parse_row(c4e.contents[2], "Sli", 2)
            ammo_stats["wyvern"]  = parse_row(c4e.contents[3], "Wyv", 2)
            ammo_stats["tranq"]   = parse_row(c4e.contents[4], "Tra", 2)

            # Now, we do some further processing to separate the piercing elemental ammo

            def reprocess_ele_ammo(k):
                x = ammo_stats[k]
                assert len(x) == 2
                ammo_stats["piercing_"+k] = [x.pop()]
                assert len(x) == 1
            reprocess_ele_ammo("fire")
            reprocess_ele_ammo("water")
            reprocess_ele_ammo("thunder")
            reprocess_ele_ammo("ice")
            reprocess_ele_ammo("dragon")
            
        #data = {}
        data = scrape_weapon_page(weapon_page_url, weapon_name, weapon_category, tagset)

        data["name"] = str(weapon_name)
        data["decos"] = decos
        data["elestat"] = elestat
        if base_sharpness is not None:
            data["base_sharpness"] = base_sharpness
        if max_sharpness is not None:
            data["max_sharpness"] = max_sharpness
        if gunlance_stats is not None:
            data["gunlance_stats"] = gunlance_stats
        if huntinghorn_songs is not None:
            data["huntinghorn_songs"] = huntinghorn_songs
        if switchaxe_stats is not None:
            data["switchaxe_stats"] = switchaxe_stats
        if chargeblade_stats is not None:
            data["chargeblade_stats"] = chargeblade_stats
        if insectglaive_stats is not None:
            data["insectglaive_stats"] = insectglaive_stats
        if bow_stats is not None:
            data["bow_stats"] = bow_stats
        if bowgun_stats is not None:
            data["bowgun_stats"] = bowgun_stats

        ret.append(data)
    return ret

def op(obj):
    (weapon_category, weapon_category_url, tagset) = obj
    return (weapon_category, scrape_weapon_category_page(weapon_category, weapon_category_url, tagset))

def run():
    with mp.Pool(len(WEAPON_URLS)) as pool:
        result = pool.map(op, WEAPON_URLS)

        data = {}
        for (weapon_category, obj) in result:
            data[weapon_category] = obj

        try:
            os.makedirs("downloaded_data")
        except FileExistsError:
            pass
        fwrite_json("downloaded_data/downloaded_data.json", data=data)
    return

if __name__ == '__main__':
    run()

