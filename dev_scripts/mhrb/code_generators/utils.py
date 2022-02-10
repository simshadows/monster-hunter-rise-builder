"""
Filename: utils.py
Author:   simshadows <contact@simshadows.com>

Parses './hardcoded_data/skills.json' and uses 'templates/skills.ts' to generate the corresponding source file.
"""

import re

def skill_id_to_object_name(skill_id):
    return f"__generated_skill__{skill_id}"

def to_name_filter_string(s):
    # IMPORTANT: Please maintain parity between this Python implementation and the Javascript implementation.
    # TODO: Also strip out punctuation?
    return re.sub("\\s", "", s.lower())

