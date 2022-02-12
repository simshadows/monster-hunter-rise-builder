"""
Filename: rampage_skills.py
Author:   simshadows <contact@simshadows.com>

Parses rampage skills from './hardcoded_data/' to generate the corresponding source file.
"""

import os
import json

from utils import ramp_id_to_object_name, to_name_filter_string

source_template = """\
import {{type RampageSkillRO}} from "../../common/types";

{objects}

export const rampsArray: Readonly<RampageSkillRO[]> = [
{array_entries}
];
"""

object_fmt = """\
export const {object_name}: RampageSkillRO = {{
    id: {id},
    shortId: {short_id},
    name: {name},
}};\
"""

array_entry_fmt = """\
    {object_name},\
"""

def generate_ramps_source_file(json_data):
    assert isinstance(json_data, list)

    objects_entries = []
    array_entries = []
    for obj in json_data:
        assert isinstance(obj["id"], str)
        assert isinstance(obj["shortID"], str)
        assert isinstance(obj["name"], str)

        object_name = ramp_id_to_object_name(obj["id"])

        objects_entries.append(object_fmt.format(
            object_name=object_name,
            id=         json.dumps(obj["id"]),
            short_id=   json.dumps(obj["shortID"]),
            name=       json.dumps(obj["name"]),
        ))

        array_entries.append(array_entry_fmt.format(object_name=object_name))

    return source_template.format(
        objects="\n\n".join(objects_entries),
        array_entries="\n".join(array_entries),
    )

