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

NOTE2: The script is AGPL-licensed, but the data is not.
"""

import os
import re
import json
import requests
import multiprocessing as mp

from bs4 import BeautifulSoup

WEAPON_URLS = [
    ("greatsword", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=0", {"elestat", "melee"}),
    ("longsword", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=3", {"elestat", "melee"}),
    ("swordandshield", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=1", {"elestat", "melee"}),
    ("dualblades", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=2", {"elestat", "melee"}),
    ("lance", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=6", {"elestat", "melee"}),
    ("gunlance", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=7", {"elestat", "melee"}),
    ("hammer", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=4", {"elestat", "melee"}),
    ("huntinghorn", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=5", {"elestat", "melee"}),
    ("switchaxe", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=8", {"elestat", "melee"}),
    ("chargeblade", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=9", {"elestat", "melee"}),
    ("insectglaive", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=10", {"elestat", "melee"}),
    ("lightbowgun", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=13", set()),
    ("heavybowgun", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=12", set()),
    ("bow", "https://mhrise.kiranico.com/data/weapons?scope=wp&value=11", {"elestat"}),
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

def process_ramp_skill(s):
    s = s.strip().replace("-", " ").split() # Convert dashes to spaces, then split by space
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

    rarity = int(c.contents[2].contents[1].contents[0].strip())
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
        ramp_skill = process_ramp_skill(ramp_skill)

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
        elestat = None
        base_sharpness = None
        max_sharpness = None

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
            elestat = {}

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
            
        #data = {}
        data = scrape_weapon_page(weapon_page_url, weapon_name, weapon_category, tagset)

        data["name"] = str(weapon_name)
        data["decos"] = decos
        if elestat is not None:
            data["elestat"] = elestat
        if base_sharpness is not None:
            data["base_sharpness"] = base_sharpness
        if max_sharpness is not None:
            data["max_sharpness"] = max_sharpness

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

