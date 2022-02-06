#!/usr/bin/env python3

"""
Filename: process_downloaded_data.py
Author:   simshadows <contact@simshadows.com>

This script was built to parse the downloaded Kiranico data, as downloaded by kiranico_scrape.py.

!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!! NOTE !!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!

There are some duplicate weapon names. These aren't mistakes and will just need to be fixed in the final output manually.
Known duplicates:
    Dual Blades: Flammenschild
        For now, both downloaded data is modified to include "I" and "II" to distinguish them, but the final data
        must be manually modified to change them back to simply "Flammenschild".

!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!

"""

import os
import re
import json
from itertools import chain, zip_longest
from collections import defaultdict, OrderedDict

from hardcoded_data.greatsword     import HARDCODED_GS_SPEC
from hardcoded_data.longsword      import HARDCODED_LS_SPEC
from hardcoded_data.swordandshield import HARDCODED_SNS_SPEC
from hardcoded_data.dualblades     import HARDCODED_DB_SPEC
from hardcoded_data.lance          import HARDCODED_L_SPEC
from hardcoded_data.gunlance       import HARDCODED_GL_SPEC
from hardcoded_data.hammer         import HARDCODED_H_SPEC
from hardcoded_data.huntinghorn    import HARDCODED_HH_SPEC
from hardcoded_data.switchaxe      import HARDCODED_SA_SPEC
from hardcoded_data.chargeblade    import HARDCODED_CB_SPEC
from hardcoded_data.insectglaive   import HARDCODED_IG_SPEC
from hardcoded_data.lightbowgun    import HARDCODED_LBG_SPEC
from hardcoded_data.heavybowgun    import HARDCODED_HBG_SPEC
from hardcoded_data.bow            import HARDCODED_B_SPEC

DATABASE_DIR = "../../data/"
SRC_FILE_PATH = "./downloaded_data/downloaded_data.json"

# Specification to build the data
# {category: [(tree name, [(name, id, rarity), ...]), ...]}
DATA_SPEC_HARDCODED = {
    "greatsword"    : (HARDCODED_GS_SPEC , {"melee"}),
    "longsword"     : (HARDCODED_LS_SPEC , {"melee"}),
    "swordandshield": (HARDCODED_SNS_SPEC, {"melee"}),
    "dualblades"    : (HARDCODED_DB_SPEC , {"melee"}),
    "lance"         : (HARDCODED_L_SPEC  , {"melee"}),
    "gunlance"      : (HARDCODED_GL_SPEC , {"melee"}),
    "hammer"        : (HARDCODED_H_SPEC  , {"melee"}),
    "huntinghorn"   : (HARDCODED_HH_SPEC , {"melee"}),
    "switchaxe"     : (HARDCODED_SA_SPEC , {"melee"}),
    "chargeblade"   : (HARDCODED_CB_SPEC , {"melee"}),
    "insectglaive"  : (HARDCODED_IG_SPEC , {"melee"}),
    "lightbowgun"   : (HARDCODED_LBG_SPEC, set()),
    "heavybowgun"   : (HARDCODED_HBG_SPEC, set()),
    "bow"           : (HARDCODED_B_SPEC  , set()),
}

module_dir_abs = os.path.dirname(os.path.abspath(__file__))

#
# STAGE 1: Reprocess the hardcoded part
#

data_spec = {}

for (weapon_category, (weapon_trees, tagset)) in DATA_SPEC_HARDCODED.items():
    submap = data_spec[weapon_category] = {}
    ids_seen = set()
    for (tree_name, base_parent_weapon_id, weapons_array) in weapon_trees:
        curr_parent_weapon_id = base_parent_weapon_id
        for (i, (weapon_name, weapon_id)) in enumerate(weapons_array):

            if weapon_id in ids_seen:
                raise ValueError("IDs must be unique within each weapon category. Bad ID: " + weapon_id)
            ids_seen.add(weapon_id)

            submap[weapon_name] = {
                    "id":        weapon_id,
                    "parent_id": curr_parent_weapon_id,
                    "tree_name": tree_name,
                    "endline_tag": ("hr" if (i == (len(weapons_array) - 1)) else ""),
                    "tagset": tagset,
                }

            curr_parent_weapon_id = weapon_id

#
# STAGE 2: Read the input
#

# {category: {tree name: {id: {weapon data}, ...}, ...}, ...}
data = defaultdict(lambda : defaultdict(dict))

# {category: {id: {weapon data}, ...}, ...}
# This one will be used for graph traversal.
# Usefully, it also helps us check for duplicates.
data_flat_per_category = defaultdict(dict)

raw_data = None
with open(SRC_FILE_PATH, encoding="utf-8", mode="r") as f:
    raw_data = json.loads(f.read())

for (weapon_category, spec_subdict) in data_spec.items():
    raw_sublist = raw_data[weapon_category]

    for obj in raw_sublist:

            name = obj["name"]

            if name not in spec_subdict:
                raise ValueError(f"Weapon {name} ({weapon_category}) present in data file, but not in the hardcoded spec.")

            weapon_id = spec_subdict[name]["id"]
            rarity = obj["rarity"]
            tree_name = spec_subdict[name]["tree_name"]
            endline_tag = spec_subdict[name]["endline_tag"]

            d = {
                    "id":          weapon_id, # This is here for convenience
                    "parent_id":   spec_subdict[name]["parent_id"],
                    "rarity":      rarity,
                    "endline_tag": endline_tag,

                    "name":       name,
                    "attack":     int(obj["attack"]),
                    "affinity":   int(obj["affinity"]),
                    "defense":    int(obj["defense"]),
                    "deco_slots": obj["decos"],
                    "elestat":    obj["elestat"],

                    "ramp_skills": [x for x in obj["ramps"] if (len(x) > 0)], # Filter out empty ramp option lists
                }
            if "melee" in spec_subdict[name]["tagset"]:
                d["base_sharpness"] = obj["base_sharpness"][:-1] # Remove the last sharpness level
                d["max_sharpness"] = obj["max_sharpness"][:-1] # Remove the last sharpness level
            if weapon_category == "gunlance":
                d["gunlance_stats"] = obj["gunlance_stats"]
            if weapon_category == "huntinghorn":
                d["huntinghorn_songs"] = obj["huntinghorn_songs"]
            if weapon_category == "switchaxe":
                d["switchaxe_stats"] = obj["switchaxe_stats"]
            if weapon_category == "chargeblade":
                d["chargeblade_stats"] = obj["chargeblade_stats"]
            if weapon_category == "insectglaive":
                d["insectglaive_stats"] = obj["insectglaive_stats"]
            if weapon_category == "bow":
                d["bow_stats"] = obj["bow_stats"]
            if (weapon_category == "lightbowgun") or (weapon_category == "heavybowgun"):
                d["bowgun_stats"] = obj["bowgun_stats"]

            data[weapon_category][tree_name][weapon_id] = d

            if weapon_id in data_flat_per_category[weapon_category]:
                raise ValueError(f"Duplicate weapon ID: {weapon_id}")
            data_flat_per_category[weapon_category][weapon_id] = d

#
# STAGE 3: Process rampage skill inheritance
#

for (weapon_category, category_data) in data_flat_per_category.items():
    for (weapon_id, weapon_data) in category_data.items():

        if not all(all(isinstance(y, str) for y in x) for x in weapon_data["ramp_skills"]):
            raise TypeError("Expected strings.")

        ramp_skills = [[(y, "") for y in x] for x in weapon_data["ramp_skills"]] # Pre-fill with native ramp skills
        ramp_skills_seen = [set(x) for x in weapon_data["ramp_skills"]]

        def traverse(d):
            if d["parent_id"] == None:
                return # No parent
            d = category_data[d["parent_id"]] # Move up to parent

            if len(d["ramp_skills"]) != len(ramp_skills):
                raise Exception("Not allowed for children to have different number of rampage skill slots (for now).")

            for (i, ramp_slot_options) in enumerate(d["ramp_skills"]):
                for ramp_skill_id in ramp_slot_options:

                    if ramp_skill_id in ramp_skills_seen[i]:
                        continue

                    ramp_skills[i].append((ramp_skill_id, d["id"]))
                    ramp_skills_seen[i].add(ramp_skill_id)
            traverse(d)

        traverse(weapon_data)

        weapon_data["ramp_skills_including_inheritance"] = ramp_skills # Add new field

#
# STAGE 4: Rearrange to match spec ordering.
#          Also, we check for weapons present in the spec but not in the data.
#          Also, we check for duplicate keys in the spec.
#          Also, we unicode-encode strings here.
#

# {category: {tree name: {id: {weapon data}, ...}, ...}, ...}
tmp_data = {}
for (weapon_category, (category_spec, _)) in DATA_SPEC_HARDCODED.items():
    submap = tmp_data[weapon_category] = OrderedDict()
    for (tree_name, _, tree_data) in category_spec:

        if tree_name in submap:
            raise ValueError("Duplicate tree name: " + weapon_category + " " + tree_name)

        subsubmap = submap[tree_name] = OrderedDict()
        submap.move_to_end(tree_name, last=True)
        for (weapon_name, weapon_id) in tree_data:

            if weapon_id in subsubmap:
                raise ValueError("Duplicate weapon id: " + weapon_category + " " + tree_name + " " + weapon_id)

            try:
                subsubmap[weapon_id] = data[weapon_category][tree_name][weapon_id] # Throws exception if data is missing
            except KeyError:
                raise KeyError("Missing in data: " + weapon_category + " " + tree_name + " " + weapon_name + " " + weapon_id)
            subsubmap.move_to_end(weapon_id, last=True)

            if subsubmap[weapon_id]["name"] != weapon_name:
                raise ValueError("Something went wrong here.")

            subsubmap[weapon_id]["name"] = subsubmap[weapon_id]["name"]
data = tmp_data

#
# STAGE 5: Produce Output
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

            "name": {name},
            "attack": {attack},
            "affinity": {affinity},
            "defense": {defense},
            "decoSlots": [{deco_slots}],
            "eleStat": {{{elestat}}},

            "rampSkills": [
{ramp_skills}
            ]{special_mechanics}
        }}\
"""

sharpness_fmt = """,

            "baseSharpness": [{base_sharpness}],
            "maxSharpness": [{max_sharpness}]\
"""

ramp_fmt = """\
                [
{ramp_skills}
                ]\
"""
ramp_fmt_subfmt = """\
                    ["{ramp_skill}", "{inheritance_weapon_id}"]\
"""

gunlance_stats_fmt = """,

            "gunlanceStats": {{
                "shellingType": "{shelling_type}",
                "shellingLevel": {shelling_level}
            }}\
"""

huntinghorn_songs_fmt = """,

            "huntinghornSongs": {{{songs}}}\
"""

switchaxe_stats_fmt = """,

            "switchaxeStats": {{
                "phialType": "{phial_type}",
                "phialValue": {phial_value}
            }}\
"""

chargeblade_stats_fmt = """,

            "chargebladeStats": {{
                "phialType": "{phial_type}"
            }}\
"""

insectglaive_stats_fmt = """,

            "insectglaiveStats": {{
                "kinsectLevel": {kinsect_level}
            }}\
"""

bow_stats_fmt = """,

            "bowStats": {{
                "arcShot": "{arc_shot}",
                "baseChargeLevelLimit": {base_charge_level_limit},
                "chargeShot": [
{charge_shot}
                ],
                "compatibleCoatings": {{
                    "close_range_coating": {close_range_coating},
                    "power_coating": {power_coating},
                    "poison_coating": {poison_coating},
                    "para_coating": {para_coating},
                    "sleep_coating": {sleep_coating},
                    "blast_coating": {blast_coating},
                    "exhaust_coating": {exhaust_coating}
                }}
            }}\
"""
charge_shot_fmt = """\
                    ["{charge_shot_type}", {level}]\
"""

bowgun_stats_fmt = """,

            "bowgunStats": {{
                "deviation": {{"severity": {deviation_severity}, "left": {deviation_left}, "right": {deviation_right}}},
                "recoil": {recoil},
                "reload": {reload},
                "ammo": {{
                    "normal":   {ammo_normal},
                    "pierce":   {ammo_pierce},
                    "spread":   {ammo_spread},
                    "shrapnel": {ammo_shrapnel},
                    "sticky":   {ammo_sticky},
                    "cluster":  {ammo_cluster},

                    "fire":    {ammo_fire},
                    "water":   {ammo_water},
                    "thunder": {ammo_thunder},
                    "ice":     {ammo_ice},
                    "dragon":  {ammo_dragon},

                    "piercing_fire":    {ammo_piercing_fire},
                    "piercing_water":   {ammo_piercing_water},
                    "piercing_thunder": {ammo_piercing_thunder},
                    "piercing_ice":     {ammo_piercing_ice},
                    "piercing_dragon":  {ammo_piercing_dragon},

                    "poison":    {ammo_poison},
                    "paralysis": {ammo_paralysis},
                    "sleep":     {ammo_sleep},
                    "exhaust":   {ammo_exhaust},
                    "recover":   {ammo_recover},

                    "demon":   {ammo_demon},
                    "armor":   {ammo_armor},
                    "slicing": {ammo_slicing},
                    "wyvern":  {ammo_wyvern},
                    "tranq":   {ammo_tranq}
                }}
            }}\
"""


def process_ramp_skills(lst):
    slot_strs = []
    for slot in lst:
        inner = []
        for (ramp_skill, inheritance_weapon_id) in slot:
            inner.append(ramp_fmt_subfmt.format(ramp_skill=ramp_skill, inheritance_weapon_id=inheritance_weapon_id))
        slot_strs.append(ramp_fmt.format(ramp_skills=",\n".join(inner)))
    return ",\n".join(slot_strs)


for (weapon_category, _) in data_spec.items():
    #dst_file_name = "TODO.weapons_" + weapon_category + ".json"
    dst_file_name = "weapons_" + weapon_category + ".json"
    dst_file_path = os.path.join(module_dir_abs, DATABASE_DIR, dst_file_name)

    spec_subdict = data_spec[weapon_category]
    data_subdict = data[weapon_category]

    tree_strs = []
    for (tree_name, tree_data) in data_subdict.items():

        weapon_strs = []
        for (weapon_id, weapon_data) in tree_data.items():
            special_mechanics = ""
            
            if "max_sharpness" in weapon_data:
                special_mechanics += sharpness_fmt.format(
                        base_sharpness=",".join(str(x) for x in weapon_data["base_sharpness"]),
                        max_sharpness=",".join(str(x) for x in weapon_data["max_sharpness"]),
                    )

            if "gunlance_stats" in weapon_data:
                special_mechanics += gunlance_stats_fmt.format(
                        shelling_type=str(weapon_data["gunlance_stats"]["shelling_type"]),
                        shelling_level=str(weapon_data["gunlance_stats"]["shelling_level"]),
                    )

            if "huntinghorn_songs" in weapon_data:
                special_mechanics += huntinghorn_songs_fmt.format(
                        songs=", ".join(f"\"{k}\":\"{v}\"" for (k, v) in weapon_data["huntinghorn_songs"].items()),
                    )

            if "switchaxe_stats" in weapon_data:
                phial_value_str = "null"
                if weapon_data["switchaxe_stats"]["phial_value"] != None:
                    phial_value_str = str(weapon_data["switchaxe_stats"]["phial_value"])

                special_mechanics += switchaxe_stats_fmt.format(
                        phial_type=str(weapon_data["switchaxe_stats"]["phial_type"]),
                        phial_value=phial_value_str,
                    )

            if "chargeblade_stats" in weapon_data:
                special_mechanics += chargeblade_stats_fmt.format(
                        phial_type=str(weapon_data["chargeblade_stats"]["phial_type"]),
                    )

            if "insectglaive_stats" in weapon_data:
                special_mechanics += insectglaive_stats_fmt.format(
                        kinsect_level=str(weapon_data["insectglaive_stats"]["kinsect_level"]),
                    )

            if "bow_stats" in weapon_data:
                charge_shot_substrs = []
                for (charge_shot_type, level) in weapon_data["bow_stats"]["charge_shot"]:
                    charge_shot_substrs.append(charge_shot_fmt.format(
                            charge_shot_type=charge_shot_type,
                            level=level,
                        ))

                compatible_coatings = weapon_data["bow_stats"]["compatible_coatings"]

                special_mechanics += bow_stats_fmt.format(
                        arc_shot=str(weapon_data["bow_stats"]["arc_shot"]),
                        base_charge_level_limit=str(weapon_data["bow_stats"]["base_charge_level_limit"]),
                        charge_shot=",\n".join(charge_shot_substrs),

                        close_range_coating=str(compatible_coatings["close_range_coating"]),
                        power_coating=str(compatible_coatings["power_coating"]),
                        poison_coating=str(compatible_coatings["poison_coating"]),
                        para_coating=str(compatible_coatings["para_coating"]),
                        sleep_coating=str(compatible_coatings["sleep_coating"]),
                        blast_coating=str(compatible_coatings["blast_coating"]),
                        exhaust_coating=str(compatible_coatings["exhaust_coating"]),
                    )

            if "bowgun_stats" in weapon_data:
                so = weapon_data["bowgun_stats"]

                assert len(so["ammo"]) == 6 + 5 + 5 + 5 + 5
                ammo_kwargs = {}
                # We're not gonna check every individual key because it will be caught later anyway
                for (k, v) in so["ammo"].items():
                    ammo_kwargs["ammo_" + k] = json.dumps([[x["available"], x["ammo_capacity"]] for x in v])

                special_mechanics += bowgun_stats_fmt.format(
                        deviation_severity=so["deviation"]["severity"],
                        deviation_left=str(so["deviation"]["left"]).lower(),
                        deviation_right=str(so["deviation"]["right"]).lower(),

                        recoil=so["recoil"],
                        reload=so["reload"],

                        **ammo_kwargs,
                    )

            weapon_strs.append(weapon_fmt.format(
                    weapon_id=weapon_id,

                    rarity=str(weapon_data["rarity"]),
                    endline_tag=weapon_data["endline_tag"],
                    
                    name=json.dumps(weapon_data["name"]),
                    attack=str(weapon_data["attack"]),
                    affinity=str(weapon_data["affinity"]),
                    defense=str(weapon_data["defense"]),
                    deco_slots=",".join(str(x) for x in weapon_data["deco_slots"]),
                    elestat=", ".join(f"\"{k}\": {v}" for (k, v) in weapon_data["elestat"].items()),
                    
                    ramp_skills=process_ramp_skills(weapon_data["ramp_skills_including_inheritance"]),

                    special_mechanics=special_mechanics,
                ))

        tree_strs.append(tree_fmt.format(
                tree_name=tree_name,
                weapons=",\n".join(weapon_strs),
            ))

    file_data = outer_fmt.format(children=",\n".join(tree_strs))
    print(file_data)

    with open(dst_file_path, "w") as f:
        f.write(file_data)

