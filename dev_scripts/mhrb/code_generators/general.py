"""
Filename: general.py
Author:   simshadows <contact@simshadows.com>
"""

import os
import json

from utils import ramp_id_to_object_name, to_name_filter_string

source_template = """\
import {{type {obj_type}}} from "../../common/types";

{objects}

export const {array_name}: Readonly<{obj_type}[]> = [
{array_entries}
];
"""

object_fmt = """\
export const {obj_name}: {obj_type} = {{
{fields}
}};\
"""

field_fmt = """\
    {k}: {v},\
"""

array_entry_fmt = """\
    {obj_name},\
"""

def _get_fields_str(keys, obj):
    entries = []
    for k in keys:
        entries.append(field_fmt.format(
            k=k,
            v=json.dumps(obj[k]),
        ))
    return "\n".join(entries)

def generate_source_file(spec, json_data):
    keys         = spec["keys"]
    array_name   = spec["array"]
    obj_type     = spec["type"]
    obj_name_map = spec["obj_name_map"]

    assert isinstance(keys, list) and all(isinstance(x, str) for x in keys)
    assert isinstance(array_name, str)
    assert isinstance(obj_type, str)
    assert callable(obj_name_map)

    assert isinstance(json_data, list) and all(isinstance(x, dict) for x in json_data)

    objects_entries = []
    array_entries = []
    for obj in json_data:
        obj_name = obj_name_map(obj["id"])

        objects_entries.append(object_fmt.format(
            obj_name=obj_name,
            obj_type=obj_type,
            fields=_get_fields_str(keys, obj),
        ))

        array_entries.append(array_entry_fmt.format(
            obj_name=obj_name,
        ))

    return source_template.format(
        obj_type=obj_type,
        array_name=array_name,
        objects="\n\n".join(objects_entries),
        array_entries="\n".join(array_entries),
    )

