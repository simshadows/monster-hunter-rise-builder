"""
Filename: insectglaive.py
Author:   simshadows <contact@simshadows.com>

Processes insect glaive-specific data.
"""

import json

_fmt = """\
    insectglaiveStats: {{
        kinsectLevel: {kinsect_level},
    }},\
"""

def generate_insectglaive_source_lines(obj):
    so = obj["insectglaiveStats"]
    return _fmt.format(
        kinsect_level=json.dumps(so["kinsectLevel"]),
    )

