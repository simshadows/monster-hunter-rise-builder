"""
Filename: switchaxe.py
Author:   simshadows <contact@simshadows.com>

Processes switch axe-specific data.
"""

import json

_fmt = """\
    switchaxeStats: {{
        phialType: {type},
        phialValue: {value},
    }},\
"""

def generate_switchaxe_source_lines(obj):
    so = obj["switchaxeStats"]
    return _fmt.format(
        type=json.dumps(so["phialType"]),
        value=json.dumps(so["phialValue"]),
    )

