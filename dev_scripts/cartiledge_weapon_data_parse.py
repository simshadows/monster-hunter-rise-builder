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
Known duplicates:
    Dual Blades: Flammenschild
        For now, both downloaded data is modified to include "I" and "II" to distinguish them, but the final data
        must be manually modified to change them back to simply "Flammenschild".

Special characters (like accents) aren't handled well right now.
Fix them in the downloaded data, then add these names to UNICODE_NAME_MAP.

The data set is limited in not having info in specific rampage skill slots, so the script will just output a single
big list, which will then be separated out manually and added to each file's map.

!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!

"""

import os
import re
import csv
from itertools import chain, zip_longest
from collections import defaultdict, OrderedDict

from cartiledge_weapon_data_hardcoded_support.greatsword import HARDCODED_GS_SPEC, HARDCODED_RAMP_SKILLS_GS
from cartiledge_weapon_data_hardcoded_support.longsword import HARDCODED_LS_SPEC, HARDCODED_RAMP_SKILLS_LS
from cartiledge_weapon_data_hardcoded_support.swordandshield import HARDCODED_SNS_SPEC, HARDCODED_RAMP_SKILLS_SNS
from cartiledge_weapon_data_hardcoded_support.dualblades import HARDCODED_DB_SPEC, HARDCODED_RAMP_SKILLS_DB
from cartiledge_weapon_data_hardcoded_support.lance import HARDCODED_L_SPEC, HARDCODED_RAMP_SKILLS_L
from cartiledge_weapon_data_hardcoded_support.gunlance import HARDCODED_GL_SPEC, HARDCODED_RAMP_SKILLS_GL
from cartiledge_weapon_data_hardcoded_support.hammer import HARDCODED_H_SPEC, HARDCODED_RAMP_SKILLS_H
from cartiledge_weapon_data_hardcoded_support.huntinghorn import HARDCODED_HH_SPEC, HARDCODED_RAMP_SKILLS_HH
from cartiledge_weapon_data_hardcoded_support.switchaxe import HARDCODED_SA_SPEC, HARDCODED_RAMP_SKILLS_SA
from cartiledge_weapon_data_hardcoded_support.chargeblade import HARDCODED_CB_SPEC, HARDCODED_RAMP_SKILLS_CB
from cartiledge_weapon_data_hardcoded_support.insectglaive import HARDCODED_IG_SPEC, HARDCODED_RAMP_SKILLS_IG

DATABASE_DIR = "../data/"
SRC_DIR = "./cartiledge_weapon_data/"

FILE_MAP = [
    ("greatsword"    , "./MHR v3.0 - Weapon Statuses - GS.csv"    ),
    ("longsword"     , "./MHR v3.0 - Weapon Statuses - LS.csv"    ),
    ("swordandshield", "./MHR v3.0 - Weapon Statuses - SnS.csv"   ),
    ("dualblades"    , "./MHR v3.0 - Weapon Statuses - DB.csv"    ),
    ("lance"         , "./MHR v3.0 - Weapon Statuses - Lance.csv" ),
    ("gunlance"      , "./MHR v3.0 - Weapon Statuses - GL.csv"    ),
    ("hammer"        , "./MHR v3.0 - Weapon Statuses - Hammer.csv"),
    ("huntinghorn"   , "./MHR v3.0 - Weapon Statuses - HH.csv"    ),
    ("switchaxe"     , "./MHR v3.0 - Weapon Statuses - SA.csv"    ),
    ("chargeblade"   , "./MHR v3.0 - Weapon Statuses - CB.csv"    ),
    ("insectglaive"  , "./MHR v3.0 - Weapon Statuses - IG.csv"    ),
]

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
DATA_SPEC_HARDCODED = {
    "greatsword"    : HARDCODED_GS_SPEC,
    "longsword"     : HARDCODED_LS_SPEC,
    "swordandshield": HARDCODED_SNS_SPEC,
    "dualblades"    : HARDCODED_DB_SPEC,
    "lance"         : HARDCODED_L_SPEC,
    "gunlance"      : HARDCODED_GL_SPEC,
    "hammer"        : HARDCODED_H_SPEC,
    "huntinghorn"   : HARDCODED_HH_SPEC,
    "switchaxe"     : HARDCODED_SA_SPEC,
    "chargeblade"   : HARDCODED_CB_SPEC,
    "insectglaive"  : HARDCODED_IG_SPEC,
}

HARDCODED_RAMP_SKILLS = {
    "greatsword"    : HARDCODED_RAMP_SKILLS_GS,
    "longsword"     : HARDCODED_RAMP_SKILLS_LS,
    "swordandshield": HARDCODED_RAMP_SKILLS_SNS,
    "dualblades"    : HARDCODED_RAMP_SKILLS_DB,
    "lance"         : HARDCODED_RAMP_SKILLS_L,
    "gunlance"      : HARDCODED_RAMP_SKILLS_GL,
    "hammer"        : HARDCODED_RAMP_SKILLS_H,
    "huntinghorn"   : HARDCODED_RAMP_SKILLS_HH,
    "switchaxe"     : HARDCODED_RAMP_SKILLS_SA,
    "chargeblade"   : HARDCODED_RAMP_SKILLS_CB,
    "insectglaive"  : HARDCODED_RAMP_SKILLS_IG,
}

UNICODE_NAME_MAP = {
    "huntinghorn": {"Teostra's Orphee": "Teostra's Orph\\u00e9e"},
    "switchaxe":   {"Grior's Landmaker": "Gr\\u00ed\\u00f0r's Landmaker"},
    "chargeblade": {"Die Walkure": "Die Walk\\u00fcre"},
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
# STAGE 3: Rearrange to match spec ordering.
#          Also, we check for weapons present in the spec but not in the data.
#          Also, we check for duplicate keys in the spec.
#          Also, we convert unicode names.
#

# {category: {tree name: {id: {weapon data}, ...}, ...}, ...}
tmp_data = {}
for (weapon_category, category_spec) in DATA_SPEC_HARDCODED.items():
    submap = tmp_data[weapon_category] = OrderedDict()
    for (tree_name, tree_data) in category_spec:

        if tree_name in submap:
            raise ValueError("Duplicate tree name: " + weapon_category + " " + tree_name)

        subsubmap = submap[tree_name] = OrderedDict()
        submap.move_to_end(tree_name, last=True)
        for (weapon_name, weapon_id, _) in tree_data:

            if weapon_id in subsubmap:
                raise ValueError("Duplicate weapon id: " + weapon_category + " " + tree_name + " " + weapon_id)

            try:
                subsubmap[weapon_id] = data[weapon_category][tree_name][weapon_id] # Throws exception if data is missing
            except KeyError:
                raise KeyError("Missing in data: " + weapon_category + " " + tree_name + " " + weapon_name + " " + weapon_id)
            subsubmap.move_to_end(weapon_id, last=True)

            if subsubmap[weapon_id]["name"] != weapon_name:
                raise ValueError("Something went wrong here.")

            actual_name = UNICODE_NAME_MAP.get(weapon_category, {}).get(weapon_name, None)
            if actual_name is not None:
                subsubmap[weapon_id]["name"] = actual_name
data = tmp_data

#
# STAGE 4: Produce Output
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
    #dst_file_name = "TODO.weapons_" + weapon_category + ".json"
    dst_file_name = "weapons_" + weapon_category + ".json"
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

