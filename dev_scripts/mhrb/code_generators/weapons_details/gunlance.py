"""
Filename: gunlance.py
Author:   simshadows <contact@simshadows.com>

Processes gunlance-specific data.
"""

import json

_fmt = """\
    gunlanceStats: {{
        shellingType: {type},
        shellingLevel: {level},
    }},\
"""

def generate_gunlance_source_lines(obj):
    so = obj["gunlanceStats"]
    return _fmt.format(
        type=json.dumps(so["shellingType"]),
        level=json.dumps(so["shellingLevel"]),
    )

