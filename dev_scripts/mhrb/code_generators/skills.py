"""
Filename: skills.py
Author:   simshadows <contact@simshadows.com>

Parses './hardcoded_data/skills.json' and uses 'templates/skills.ts' to generate the corresponding source file.
"""

import os
import json

from utils import append_generated_code_notice

DATA_PATH = "./dev_scripts/mhrb/code_generators/hardcoded_data/skills.json"
TEMPLATE_PATH = "./dev_scripts/mhrb/code_generators/templates/skills.ts"
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

array_entry_fmt = """\
    {{
        id: {id},
        shortId: {short_id},
        name: {name},
        maxLevels: {max_levels},

        iconImgID: {icon_image_id},
    }},\
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

    entries = []
    for obj in input_data:
        print(obj)
        assert isinstance(obj["id"], str)
        assert isinstance(obj["shortId"], int)
        assert isinstance(obj["name"], str)
        assert isinstance(obj["maxLevels"], int)
        assert isinstance(obj["icon"], str)

        image_id = icon_name_to_image_id[obj["icon"]]

        entries.append(array_entry_fmt.format(
            id=           json.dumps(obj["id"]),
            short_id=     json.dumps(obj["shortId"]),
            name=         json.dumps(obj["name"]),
            max_levels=   json.dumps(obj["maxLevels"]),
            icon_image_id=json.dumps(image_id),
        ))
    
    output_data = file_template.replace("%SKILLS_ARRAY_GOES_HERE%", "\n".join(entries))

    write_source_file(append_generated_code_notice(output_data))
    return input_data

