"""
Filename: skills.py
Author:   simshadows <contact@simshadows.com>

Parses skills from './hardcoded_data/' to generate the corresponding source file.
"""

import os
import json

from utils import skill_id_to_object_name, to_name_filter_string

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

source_template = """\
import {{type Skill}} from "../../common/types";

{objects}

export const skillsArray: Readonly<Skill[]> = [
{array_entries}
];
"""

object_fmt = """\
export const {object_name}: Skill = {{
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

def generate_skills_source_file(json_data):
    assert isinstance(json_data, list)

    objects_entries = []
    array_entries = []
    for obj in json_data:
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

    return source_template.format(
        objects="\n\n".join(objects_entries),
        array_entries="\n".join(array_entries),
    )

