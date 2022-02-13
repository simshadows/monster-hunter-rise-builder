"""
Filename: huntinghorn.py
Author:   simshadows <contact@simshadows.com>

Processes hunting horn-specific data.
"""

import json

_fmt = """\
    huntinghornSongs: {{
        x: {x},
        a: {a},
        xa: {xa},
    }},\
"""

def generate_huntinghorn_source_lines(obj):
    so = obj["huntinghornSongs"]
    return _fmt.format(
        x=json.dumps(so["x_x"]),
        a=json.dumps(so["a_a"]),
        xa=json.dumps(so["xa_xa"]),
    )

