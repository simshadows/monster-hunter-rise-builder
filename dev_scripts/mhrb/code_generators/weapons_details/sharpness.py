"""
Filename: sharpness.py
Author:   simshadows <contact@simshadows.com>

Processes weapon sharpness data.
"""

import json

_fmt = """\
    baseSharpness: {base},
    maxSharpness:  {max},\
"""

def generate_sharpness_source_lines(obj):
    base_sharpness = obj["baseSharpness"]
    max_sharpness = obj["maxSharpness"]
    assert isinstance(base_sharpness, list) and all(isinstance(x, int) for x in base_sharpness)
    assert isinstance(max_sharpness, list) and all(isinstance(x, int) for x in base_sharpness)
    return _fmt.format(
        base=json.dumps(base_sharpness),
        max=json.dumps(max_sharpness),
    )

