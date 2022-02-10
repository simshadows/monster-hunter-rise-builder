"""
Filename: skills.py
Author:   simshadows <contact@simshadows.com>

Parses skills from './hardcoded_data/' and uses './templates/' to generate the corresponding source file.
"""

import os
import json

from utils import append_generated_code_notice, skill_id_to_object_name, to_name_filter_string

DATA_PATH = "./dev_scripts/mhrb/code_generators/hardcoded_data/skills.json"
TEMPLATE_PATH = "./dev_scripts/mhrb/code_generators/templates/skills_template.ts"
OUTPUT_PATH = "./src/mhrb/_assets/database/generated_code/_generated_skills.ts"

icon_name_to_image_id = {
    "blue"     : "skill_icon_blue",
    "brown"    : "skill_icon_brown",
    "darkblue" : "skill_icon_darkblue",
    "gold"     : "skill_icon_gold",
    "green"    : "skill_icon_green",
    "grey"     : "skill_icon_grey",
    "lightblue": "skill_icon_lightblue",
    "orange"   : "skill_icon_orange",
    "pink"     : "skill_icon_pink",
    "purple"   : "skill_icon_purple",
    "red"      : "skill_icon_red",
    "white"    : "skill_icon_white",
    "yellow"   : "skill_icon_yellow",
}

object_fmt = """\
export const {object_name}: SkillRO = {{
    id: {id},
    shortId: {short_id},
    name: {name},
    maxLevels: {max_levels},

    iconImgID: {icon_image_id},
    filterHelpers: {{
        nameLower: {filter_helper_name_lower},
    }}
}};\
"""

array_entry_fmt = """\
    {object_name},\
"""

def read_skills_data():
    with open(DATA_PATH, encoding="utf-8", mode="r") as f:
        return json.loads(f.read())

def read_source_template():
    with open(TEMPLATE_PATH, encoding="utf-8", mode="r") as f:
        return f.read()

def write_source_file(data):
    with open(OUTPUT_PATH, "w") as f:
        f.write(data)

def generate_and_get_skills():
    print("Generating skills data...")
    input_data = read_skills_data()
    file_template = read_source_template()

    assert isinstance(input_data, list)

    objects_entries = []
    array_entries = []
    for obj in input_data:
        assert isinstance(obj["id"], str)
        assert isinstance(obj["shortId"], int)
        assert isinstance(obj["name"], str)
        assert isinstance(obj["maxLevels"], int)
        assert isinstance(obj["icon"], str)

        object_name = skill_id_to_object_name(obj["id"])
        image_id = icon_name_to_image_id[obj["icon"]]
        filter_helper_name_lower = to_name_filter_string(obj["name"])

        objects_entries.append(object_fmt.format(
            object_name=  object_name,
            id=           json.dumps(obj["id"]),
            short_id=     json.dumps(obj["shortId"]),
            name=         json.dumps(obj["name"]),
            max_levels=   json.dumps(obj["maxLevels"]),
            icon_image_id=json.dumps(image_id),

            filter_helper_name_lower=json.dumps(filter_helper_name_lower),
        ))

        array_entries.append(array_entry_fmt.format(object_name=object_name))
    
    output_data = file_template.replace("%SKILL_OBJECTS_GOES_HERE%", "\n\n".join(objects_entries))
    output_data = output_data.replace("%SKILLS_ARRAY_CONTENTS_GOES_HERE%", "\n".join(array_entries))

    write_source_file(append_generated_code_notice(output_data))
    return input_data

