"""
Filename: armour.py
Author:   simshadows <contact@simshadows.com>

Parses armour from './hardcoded_data/' to generate the corresponding source file.
"""

import os
import json

from utils import skill_id_to_object_name, to_name_filter_string

source_template = """\
import {{
    type ArmourSet,
}} from "../../common/types";

import {{
{skill_imports}
}} from "./_generated_skills";

export const armourSetsArray: Readonly<ArmourSet[]> = [
{array_entries}
];
"""

skills_import_fmt = """\
    {obj_name},\
"""

set_fmt = """\
    {{
        id: {set_id},
        name: {name},
        head: {head},
        chest: {chest},
        arms: {arms},
        waist: {waist},
        legs: {legs},
    }},\
"""

piece_fmt = """\
{{
            setID: {set_id},
            slotID: {slot_id},
    
            setName: {set_name},
            name: {name},
            rarity: {rarity},
            tierID: {tier_id},
            decorationSlots: {deco_slots},
            skills: [
{skills}
            ],

            defenseAtLevel1: {def_at_lvl1},

            fireRes:{fire_res},
            waterRes: {water_res},
            thunderRes: {thunder_res},
            iceRes: {ice_res},
            dragonRes: {dragon_res},
    
            filterHelpers: {{
                nameLower: {filter_helper_name_lower},
                setNameLower: {filter_helper_set_name_lower},
                hintStrLower: {filter_helper_hint_str_lower},
            }},
        }}\
"""

skills_fmt = """\
                [{skill_ref}, {level}],\
"""

def slot_id_to_index(slot_id):
    return {
        "head":  0,
        "chest": 1,
        "arms":  2,
        "waist": 3,
        "legs":  4,
    }[slot_id]

def make_skills_str(skills, seen_skill_objs):
    entries = []
    for (skill_id, level) in skills.items():
        assert isinstance(skill_id, str)
        assert isinstance(level, int) and (level > 0)
        obj_name = skill_id_to_object_name(skill_id)
        entries.append(skills_fmt.format(skill_ref=obj_name, level=json.dumps(level)))
        seen_skill_objs.add(obj_name)
    return "\n".join(entries)

def generate_armour_source_file(armour_data, naming_schemes_data):
    assert isinstance(armour_data, list)
    assert isinstance(naming_schemes_data, dict)
    for (k, v) in naming_schemes_data.items():
        assert isinstance(k, str) and len(k) > 0
        assert isinstance(v, list) and len(v) == 5
        assert all(isinstance(x, str) for x in v)
        assert all(len(x) > 0 for x in v)

    armour_sets_array_entries = []
    seen_skill_objs = set()

    for [set_id, obj] in armour_data:

        piece_strs = {}

        # obj["prefix"] can be either a single string or a list of 5 (corresponding to slots)
        prefixes = [obj["prefix"]]*5 if isinstance(obj["prefix"], str) else obj["prefix"]
        naming_scheme = naming_schemes_data[obj["namingScheme"]]
        suffix = obj["suffix"]
        assert isinstance(prefixes, list)
        assert len(prefixes) == 5
        assert all(isinstance(x, str) for x in prefixes)
        
        assert set(obj["pieces"].keys()) == {"head", "chest", "arms", "waist", "legs"}
        for (slot_id, piece_data) in obj["pieces"].items():
            if piece_data is None:
                piece_strs[slot_id] = "undefined"
                continue
            (deco_slots, skills) = piece_data

            assert isinstance(deco_slots, list)
            assert len(deco_slots) <= 3
            assert all(isinstance(x, int) for x in deco_slots)

            assert isinstance(skills, dict)
            assert all(isinstance(k, str) and isinstance(v, int) for (k, v) in skills.items())

            name_components = []

            prefix = prefixes[slot_id_to_index(slot_id)]
            if prefix != "":
                name_components.append(prefix)
            name_components.append(naming_scheme[slot_id_to_index(slot_id)])
            if suffix != "":
                name_components.append(suffix)

            name = " ".join(name_components)

            piece_strs[slot_id] = piece_fmt.format(
                set_id= json.dumps(set_id),
                slot_id=json.dumps(slot_id),
        
                set_name=  json.dumps(obj["setName"]),
                name=      json.dumps(name),
                rarity=    json.dumps(obj["rarity"]),
                tier_id=   json.dumps(obj["tier"]),
                deco_slots=json.dumps(deco_slots),
                skills=    make_skills_str(skills, seen_skill_objs),
        
                def_at_lvl1=json.dumps(obj["defenses"]["defLvl1"]),
                fire_res=   json.dumps(obj["defenses"]["f"]),
                water_res=  json.dumps(obj["defenses"]["w"]),
                thunder_res=json.dumps(obj["defenses"]["t"]),
                ice_res=    json.dumps(obj["defenses"]["i"]),
                dragon_res= json.dumps(obj["defenses"]["d"]),
        
                filter_helper_name_lower=json.dumps(to_name_filter_string(name)),
                filter_helper_set_name_lower=json.dumps(to_name_filter_string(obj["setName"])),
                filter_helper_hint_str_lower=json.dumps(to_name_filter_string(obj["searchHint"])),
            )

        assert set(piece_strs.keys()) == {"head", "chest", "arms", "waist", "legs"}

        armour_sets_array_entries.append(set_fmt.format(
            set_id=set_id,
            name=  json.dumps(obj["setName"]),
            head=  piece_strs["head" ],
            chest= piece_strs["chest"],
            arms=  piece_strs["arms" ],
            waist= piece_strs["waist"],
            legs=  piece_strs["legs" ],
        ))
    
    skills_entries = []
    for skill_obj_name in seen_skill_objs:
        skills_entries.append(skills_import_fmt.format(obj_name=skill_obj_name))
    skills_entries.sort() # Makes the final output stable so we don't get git diffs all the time

    return source_template.format(
        skill_imports="\n".join(skills_entries),
        array_entries="\n".join(armour_sets_array_entries)
    )

