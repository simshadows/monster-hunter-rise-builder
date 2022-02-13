"""
Filename: chargeblade.py
Author:   simshadows <contact@simshadows.com>

Processes charge blade-specific data.
"""

import json

_fmt = """\
    chargebladeStats: {{
        phialType: {type},
    }},\
"""

def generate_chargeblade_source_lines(obj):
    so = obj["chargebladeStats"]
    return _fmt.format(
        type=json.dumps(so["phialType"]),
    )

