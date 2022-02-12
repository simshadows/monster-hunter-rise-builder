"""
Filename: weapons.py
Author:   simshadows <contact@simshadows.com>

Processes weapon data to generate the corresponding source file.
"""

import os
import json

from weapons_details.sharpness import generate_sharpness_source_lines

from utils import ramp_id_to_object_name, to_name_filter_string

source_template = """\
import {{
    type EleStatStr,
    type {category_type_ref},
}} from "../../common/types";
import {{
    FrozenMap,
}} from "../../generic/frozen-containers";

import {{
{ramps_imports}
}} from "./_generated_rampage_skills";

{objects}

export const {category}sArray: Readonly<{category_type_ref}[]> = [
{array_entries}
];
"""

ramps_import_fmt = """\
    {obj_name},\
"""

object_fmt = """\
const {object_name}: {category_type_ref} = {{
    category: {category},
    id: {weapon_id},

    name: {name},
    treeName: {tree_name},
    rarity: {rarity},
    endlineTag: {endline_tag},

    attack: {attack},
    affinity: {affinity},
    defense: {defense},
    decoSlots: {decoSlots},
    eleStat: new FrozenMap<EleStatStr, number>(new Map([{elestat}])),

    rampSkills: [
{ramp_skills}
    ],\
{special_mechanics}

    filterHelpers: {{
        nameLower: {filter_helper_name_lower},
        treeNameLower: {filter_helper_tree_name_lower},
    }},
}};\
"""

array_entry_fmt = """\
    {object_name},\
"""

ramp_skill_slot_fmt = """\
        [
{content}
        ],\
"""

ramp_skill_entry_fmt = """\
            [{ramp_ref}, {inherited_from_weapon}],\
"""

_to_type_ref = {
    "greatsword": "GreatswordRO",
}

_melee_weapons = {
    "greatsword",
    "longsword",
    "swordandshield",
    "dualblades",
    "lance",
    "gunlance",
    "hammer",
    "huntinghorn",
    "switchaxe",
    "chargeblade",
    "insectglaive",
}

def _weapon_id_to_object_name(category, weapon_id):
    return f"__generated_{category}__{weapon_id}"

def _get_elestat_str(elestat_json_data):
    entries = []
    for (elestat, value) in elestat_json_data.items():
        assert isinstance(elestat, str)
        assert isinstance(value, int)
        entries.append(f"[{json.dumps(elestat)}, {json.dumps(value)}]")
    return ", ".join(entries)

def _get_ramp_skills_str(category, ramps_json_data, seen_ramp_objs):
    slots_entries = []
    for slot_json_data in ramps_json_data:
        assert isinstance(slot_json_data, list)
        possibilities_entries = []
        for [ramp_id, inherited_from_weapon_id] in slot_json_data:
            ramp_ref = ramp_id_to_object_name(ramp_id)
            inherited_from = _weapon_id_to_object_name(category, inherited_from_weapon_id) if inherited_from_weapon_id else "null"

            seen_ramp_objs.add(ramp_ref)
            possibilities_entries.append(ramp_skill_entry_fmt.format(
                ramp_ref=ramp_ref,
                inherited_from_weapon=inherited_from,
            ))
        slots_entries.append(ramp_skill_slot_fmt.format(
            content="\n".join(possibilities_entries),
        ))
    return "\n".join(slots_entries)

def _get_special_mechanics_str(category, obj):
    entries = []
    if category in _melee_weapons:
        entries.append(generate_sharpness_source_lines(obj))
    return "".join(f"\n\n{x}" for x in entries)

def _generate_category_source_file(category, category_data):
    category_type_ref = _to_type_ref[category]

    objects_entries = []
    array_entries = []
    seen_ramp_objs = set()

    for (tree_name, tree_data) in category_data.items():
        assert isinstance(tree_name, str)

        for (weapon_id, obj) in tree_data.items():
            assert isinstance(weapon_id, str)

            assert isinstance(obj["rarity"], int)
            assert obj["endlineTag"] in {"", "hr"}
            assert isinstance(obj["name"], str)
            assert isinstance(obj["attack"], int)
            assert isinstance(obj["affinity"], int)
            assert isinstance(obj["defense"], int)
            assert isinstance(obj["decoSlots"], list) and all(isinstance(x, int) for x in obj["decoSlots"])
            assert isinstance(obj["eleStat"], dict)
            assert isinstance(obj["rampSkills"], list)

            obj_name = _weapon_id_to_object_name(category, weapon_id)

            objects_entries.append(object_fmt.format(
                object_name=      obj_name,
                category_type_ref=category_type_ref,

                category= json.dumps(category),
                weapon_id=json.dumps(weapon_id),

                name=       json.dumps(obj["name"]),
                tree_name=  json.dumps(tree_name),
                rarity=     json.dumps(obj["rarity"]),
                endline_tag=json.dumps(obj["endlineTag"]),

                attack=   json.dumps(obj["attack"]),
                affinity= json.dumps(obj["affinity"]),
                defense=  json.dumps(obj["defense"]),
                decoSlots=json.dumps(obj["decoSlots"]),
                elestat=  _get_elestat_str(obj["eleStat"]),

                ramp_skills=      _get_ramp_skills_str(category, obj["rampSkills"], seen_ramp_objs),
                special_mechanics=_get_special_mechanics_str(category, obj),

                filter_helper_name_lower=     json.dumps(to_name_filter_string(obj["name"])),
                filter_helper_tree_name_lower=json.dumps(to_name_filter_string(tree_name)),
            ))

            array_entries.append(array_entry_fmt.format(
                object_name=obj_name,
            ))

    ramps_entries = []
    for ramp_obj_name in seen_ramp_objs:
        ramps_entries.append(ramps_import_fmt.format(obj_name=ramp_obj_name))
    ramps_entries.sort() # Makes the final output stable so we don't get git diffs all the time

    return source_template.format(
        category_type_ref=category_type_ref,
        ramps_imports="\n".join(ramps_entries),

        objects="\n\n".join(objects_entries),

        category=category,
        array_entries="\n".join(array_entries),
    )

def generate_weapon_source_files(weapon_data):
    return {cat: _generate_category_source_file(cat, cat_data) for (cat, cat_data) in weapon_data.items()}

