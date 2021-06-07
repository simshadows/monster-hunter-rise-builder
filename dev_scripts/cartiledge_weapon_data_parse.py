#!/usr/bin/env python3

"""
Filename: parse_cartiledge_weapon_data.py
Author:   simshadows <contact@simshadows.com>

This script was built to parse CSV files downloaded from /u/Cartiledge's weapon data sheets.

URL for Monster Hunter Rise v3.0:
<https://docs.google.com/spreadsheets/d/1zFJ6Rnroi8su0NLStlZEeduVWUX_XyOU-H6adocBrYo/>

(I'd myself run the scraping scripts contained within, but I'm feeling lazy to understand how it works, so
I'll just rely on CSV exports.)

!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!! NOTE !!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!

There are some duplicate weapon names. These aren't mistakes and will just need to be fixed in the final output manually.

All known duplicates:
    Dual Blades: Flammenschild

Also, the data set is limited in not having info in specific rampage skill slots, so the script will just output a single
big list, which will then be separated out manually. We're just going to have to fix those up manually.

!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!

"""

import os
import re
import csv
from itertools import chain, zip_longest
from collections import defaultdict

from cartiledge_weapon_data_hardcoded_support.greatsword import HARDCODED_GS_SPEC, HARDCODED_RAMP_SKILLS_GS
from cartiledge_weapon_data_hardcoded_support.longsword import HARDCODED_LS_SPEC, HARDCODED_RAMP_SKILLS_LS
from cartiledge_weapon_data_hardcoded_support.dualblades import HARDCODED_DB_SPEC, HARDCODED_RAMP_SKILLS_DB

DATABASE_DIR = "../data/"
SRC_DIR = "./cartiledge_weapon_data/"

FILE_MAP = [
    ("greatsword", "./MHR v3.0 - Weapon Statuses - GS.csv"),
    ("longsword" , "./MHR v3.0 - Weapon Statuses - LS.csv"),
    ("dualblades", "./MHR v3.0 - Weapon Statuses - DB.csv"),
]

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
DATA_SPEC_HARDCODED = {
    "greatsword": HARDCODED_GS_SPEC,
    "longsword": HARDCODED_LS_SPEC,
    "dualblades": HARDCODED_DB_SPEC,
}

HARDCODED_RAMP_SKILLS = {
    "greatsword": HARDCODED_RAMP_SKILLS_GS,
    "longsword": HARDCODED_RAMP_SKILLS_LS,
    "dualblades": HARDCODED_RAMP_SKILLS_DB,
}

module_dir_abs = os.path.dirname(os.path.abspath(__file__))

#
# STAGE 1: Reprocess the hardcoded part
#

data_spec = {}

for (weapon_category, weapon_trees) in DATA_SPEC_HARDCODED.items():
    submap = data_spec[weapon_category] = {}
    ids_seen = set()
    for (tree_name, weapons_array) in weapon_trees:
        for (i, (weapon_name, weapon_id, rarity)) in enumerate(weapons_array):

            if weapon_id in ids_seen:
                raise ValueError("IDs must be unique within each weapon category. Bad ID: " + weapon_id)
            ids_seen.add(weapon_id)

            submap[weapon_name] = {
                    "id":        weapon_id,
                    "rarity":    rarity,
                    "tree_name": tree_name,
                    "endline_tag": ("hr" if (i == (len(weapons_array) - 1)) else ""),
                }

#
# STAGE 2: Read the input
#

# {category: {tree name: {id: {weapon data}, ...}, ...}, ...}
data = defaultdict(lambda : defaultdict(dict))

for (weapon_category, src_file_name) in FILE_MAP:
    src_file_path = os.path.join(module_dir_abs, SRC_DIR, src_file_name)
    spec_subdict = data_spec[weapon_category]
    with open(src_file_path, "r") as f:
        for row in csv.DictReader(f):

            name = row["Weapon Name"]

            if name not in spec_subdict:
                raise ValueError("Weapon " + name + " present in data file, but not in the hardcoded spec.")

            weapon_id = spec_subdict[name]["id"]
            rarity = spec_subdict[name]["rarity"]
            tree_name = spec_subdict[name]["tree_name"]
            endline_tag = spec_subdict[name]["endline_tag"]

            deco_slots = []
            for slot_size in [3, 2, 1]:
                to_add = int(row["Gem Slot " + str(slot_size)])
                assert (to_add >= 0) and (to_add <=3)
                for _ in range(to_add):
                    deco_slots.append(slot_size)

            elestat = {}
            for elestat_type in ["Fire", "Water", "Thunder", "Ice", "Dragon", "Poison", "Paralysis", "Sleep", "Blast"]:
                elestat_value = int(row[elestat_type])
                assert (elestat_value >= 0)
                if elestat_value > 0:
                    elestat[elestat_type.lower()] = elestat_value

            max_sharpness = [
                    int(row["Max Sharpness Red"   ]) * 5,
                    int(row["Max Sharpness Orange"]) * 5,
                    int(row["Max Sharpness Yellow"]) * 5,
                    int(row["Max Sharpness Green" ]) * 5,
                    int(row["Max Sharpness Blue"  ]) * 5,
                    int(row["Max Sharpness White" ]) * 5,
                ]

            def process_ramp_skill(s):
                s = s.strip().replace("-", " ").split() # Convert dashes to spaces, then split by space
                m = {"I": "1", "II": "2", "III": "3", "IV": "4", "V": "5", "VI": "6"}
                a = [(m[x] if (x in m) else x.lower()) for x in s] # Convert roman numerals and force to all-lowercase
                return "_".join(re.sub("[^a-z0-9]+", "", x) for x in a) # Filter out non-alphanumeric

            data[weapon_category][tree_name][weapon_id] = {
                    "rarity":      rarity,
                    "endline_tag": endline_tag,

                    "name":       name,
                    "attack":     int(row["Raw"]),
                    "affinity":   int(row["Affinity"]),
                    "defense":    int(row["Defense Bonus"]),
                    "deco_slots": deco_slots,
                    "elestat":    elestat,

                    "ramp_skills": [process_ramp_skill(x) for x in row["Rampage Skill Names"].split(",")],

                    "max_sharpness": max_sharpness,
                }

#
# STAGE 3: Produce Output
#

outer_fmt = """\
{{
{children}
}}\
"""

tree_fmt = """\
    "{tree_name}": {{
{weapons}
    }}\
"""

weapon_fmt = """\
        "{weapon_id}": {{
            "rarity": {rarity},
            "endlineTag": "{endline_tag}",

            "name": "{name}",
            "attack": {attack},
            "affinity": {affinity},
            "defense": {defense},
            "decoSlots": [{deco_slots}],
            "eleStat": {{{elestat}}},

            "rampSkills": [
{ramp_skills}
            ],

            "maxSharpness": [{max_sharpness}]
        }}\
"""

ramp_fmt = """\
                [{ramp_skills}]\
"""

ramp_fmt2 = """\
                [
{ramp_skills}
                ]\
"""
ramp_fmt2_subfmt = """\
                    "{ramp_skill}"\
"""


def process_ramp_skills(weapon_name, weapon_category, ramp_skill_id_list):
    if len(ramp_skill_id_list) == 3:
        return ramp_fmt.format(ramp_skills=", ".join(f"\"{x}\"" for x in ramp_skill_id_list))
    else:
        if weapon_name in HARDCODED_RAMP_SKILLS[weapon_category]:
            slot_strs = []
            for slot in HARDCODED_RAMP_SKILLS[weapon_category][weapon_name]:
                inner = ",\n".join(ramp_fmt2_subfmt.format(ramp_skill=ramp_skill) for ramp_skill in slot)
                slot_strs.append(ramp_fmt2.format(ramp_skills=inner))
            return ",\n".join(slot_strs)
        else:
            s = ",\n".join([ramp_fmt2_subfmt.format(ramp_skill=x) for x in ramp_skill_id_list])
            return ramp_fmt2.format(ramp_skills=s)


for (weapon_category, _) in FILE_MAP:
    dst_file_name = "TODO.weapons_" + weapon_category + ".json"
    dst_file_path = os.path.join(module_dir_abs, DATABASE_DIR, dst_file_name)

    spec_subdict = data_spec[weapon_category]
    data_subdict = data[weapon_category]

    tree_strs = []
    for (tree_name, tree_data) in data_subdict.items():

        weapon_strs = []
        for (weapon_id, weapon_data) in tree_data.items():
            weapon_strs.append(weapon_fmt.format(
                    weapon_id=weapon_id,

                    rarity=str(weapon_data["rarity"]),
                    endline_tag=weapon_data["endline_tag"],
                    
                    name=weapon_data["name"],
                    attack=str(weapon_data["attack"]),
                    affinity=str(weapon_data["affinity"]),
                    defense=str(weapon_data["defense"]),
                    deco_slots=",".join(str(x) for x in weapon_data["deco_slots"]),
                    elestat=", ".join(f"\"{k}\": {v}" for (k, v) in weapon_data["elestat"].items()),
                    
                    ramp_skills=process_ramp_skills(weapon_data["name"], weapon_category, weapon_data["ramp_skills"]),

                    max_sharpness=",".join(str(x) for x in weapon_data["max_sharpness"]),
                ))

        tree_strs.append(tree_fmt.format(
                tree_name=tree_name,
                weapons=",\n".join(weapon_strs),
            ))

    file_data = outer_fmt.format(children=",\n".join(tree_strs))
    print(file_data)

    with open(dst_file_path, "w") as f:
        f.write(file_data)

