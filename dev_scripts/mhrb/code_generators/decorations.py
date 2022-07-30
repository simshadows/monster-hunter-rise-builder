"""
Filename: decorations.py
Author:   simshadows <contact@simshadows.com>

Parses skills from './hardcoded_data/' to generate the corresponding source file.
"""

import os
import json

from utils import skill_id_to_object_name, to_name_filter_string

source_template = """\
import {{type Decoration}} from "../../common/types";

import {{
{skill_imports}
}} from "./_generated_skills";

export const decosArray: Readonly<Decoration[]> = [
{array_entries}
];
"""

skills_import_fmt = """\
    {obj_name},\
"""

array_entry_fmt = """\
    {{
        id: {id},
        name: {name},

        slotSize: {slot_size},
        rarity: {rarity},
        skills: [
{skills}
        ],

        icon: {icon},
        filterHelpers: {{
            nameLower: {filter_helper_name_lower},
        }}
    }},\
"""

def generate_decos_source_file(json_data):
    assert isinstance(json_data, list)

    entries = []
    skills_found = set()
    for [deco_id, obj] in json_data:
        assert isinstance(deco_id, int)
        assert isinstance(obj, dict)

        assert isinstance(obj.get("name"), str) or isinstance(obj.get("verbatimName"), str)
        assert isinstance(obj["slotSize"], int)
        assert isinstance(obj["rarity"], int)
        assert isinstance(obj["skills"], dict)
        assert isinstance(obj["icon"], str)

        actual_name = None
        if isinstance(obj.get("verbatimName"), str):
            actual_name = obj["verbatimName"]
            assert str(obj["slotSize"]) in actual_name # We expect the jewel size to be in there somewhere
        else:
            actual_name = obj["name"] + " Jewel " + str(obj["slotSize"])

        skills_entries = []
        for (k, v) in obj["skills"].items():
            skill_obj_name = skill_id_to_object_name(k)
            skills_entries.append(f"            [{skill_obj_name}, {json.dumps(v)}],")
            skills_found.add(skill_obj_name)

        filter_helper_name_lower = to_name_filter_string(actual_name)

        entries.append(array_entry_fmt.format(
            id=           json.dumps(deco_id),
            name=         json.dumps(actual_name),
            slot_size=    json.dumps(obj["slotSize"]),
            rarity=       json.dumps(obj["rarity"]),
            skills=       "\n".join(skills_entries),
            icon=         json.dumps(obj["icon"]),
            filter_helper_name_lower=json.dumps(filter_helper_name_lower),
        ))
    
    skills_entries = []
    for skill_obj_name in skills_found:
        skills_entries.append(skills_import_fmt.format(obj_name=skill_obj_name))
    skills_entries.sort() # Makes the final output stable so we don't get git diffs all the time

    return source_template.format(
        skill_imports="\n".join(skills_entries),
        array_entries="\n".join(entries),
    )

