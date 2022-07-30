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

def generate_decos_source_file(json_data, scraped_json_data):
    assert isinstance(json_data, list)
    assert isinstance(scraped_json_data, list)

    ##########################################################################
    # STEP 1: Process scraped data (which will be used later for validation) #
    ##########################################################################

    scraped_names = set()
    for obj in scraped_json_data:
        scraped_names.add(obj["deco_name"])

    #######################################
    # STEP 2: Process the real input data #
    #######################################

    entries = []
    skills_found = set()
    names_found = set()
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
        names_found.add(actual_name)

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

    ######################
    # STEP 3: Validation #
    ######################

    if scraped_names == names_found:
        print("    Decorations validated against scraped data. No issues found.")
    if scraped_names != names_found:
        print("    WARNING: Hardcoded decorations does not match scraped decorations.")
        s1 = scraped_names - names_found
        s2 = names_found - scraped_names
        if len(s1) > 0:
            print("        Names unique to scraped data:")
            print("\n".join(f"            {x}" for x in s1))
        if len(s2) > 0:
            print("        Names unique to hardcoded data:")
            print("\n".join(f"            {x}" for x in s2))

    return source_template.format(
        skill_imports="\n".join(skills_entries),
        array_entries="\n".join(entries),
    )

