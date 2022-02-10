"""
Filename: decorations.py
Author:   simshadows <contact@simshadows.com>

Parses decorations from './hardcoded_data/' and uses './templates/' to generate the corresponding source file.
"""

import os
import json

from utils import append_generated_code_notice, skill_id_to_object_name, to_name_filter_string

DATA_PATH = "./dev_scripts/mhrb/code_generators/hardcoded_data/decorations.json"
TEMPLATE_PATH = "./dev_scripts/mhrb/code_generators/templates/decorations_template.ts"
OUTPUT_PATH = "./src/mhrb/_assets/database/generated_code/_generated_decorations.ts"

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

def read_data():
    with open(DATA_PATH, encoding="utf-8", mode="r") as f:
        return json.loads(f.read())

def read_source_template():
    with open(TEMPLATE_PATH, encoding="utf-8", mode="r") as f:
        return f.read()

def write_source_file(data):
    with open(OUTPUT_PATH, "w") as f:
        f.write(data)

def generate_and_get_decorations():
    print("Generating decorations data...")
    input_data = read_data()
    file_template = read_source_template()

    assert isinstance(input_data, list)

    entries = []
    skills_found = set()
    for [deco_id, obj] in input_data:
        assert isinstance(deco_id, int)
        assert isinstance(obj, dict)

        assert isinstance(obj["name"], str)
        assert isinstance(obj["slotSize"], int)
        assert isinstance(obj["rarity"], int)
        assert isinstance(obj["skills"], dict)
        assert isinstance(obj["icon"], str)

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

    output_data = file_template.replace("%SKILL_OBJ_NAMES_GO_HERE%", "\n".join(skills_entries))
    output_data = output_data.replace("%DECORATIONS_ARRAY_CONTENTS_GOES_HERE%", "\n".join(entries))

    write_source_file(append_generated_code_notice(output_data))
    return input_data

