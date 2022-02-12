"""
Filename: rampage_skills_procedural.py
Author:   simshadows <contact@simshadows.com>

Procedurally generates some rampage skills since it would otherwise be laborious to input manually.
"""

import json
from itertools import chain

_to_roman = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
}

def _ele(name, short_id_prefix):
    id_prefix = name.lower()
    return chain(
        ({
            "id":      f"{id_prefix}_boost_{i}",
            "shortID": f"{short_id_prefix}b{i}",
            "name":    f"{name} Boost {_to_roman[i]}",
        } for i in range(1, 5)),
        ({
            "id":      f"{id_prefix}_{i}",
            "shortID": f"{short_id_prefix}x{i}",
            "name":    f"{name} {_to_roman[i]}",
        } for i in range(1, 5)),
        ({
            "id":      f"secondary_{id_prefix}_{i}",
            "shortID": f"{short_id_prefix}s{i}",
            "name":    f"Secondary {name} {_to_roman[i]}",
        } for i in range(1, 4)),
        ({
            "id":      f"{id_prefix}_effect_{i}",
            "shortID": f"{short_id_prefix}e{i}",
            "name":    f"{name} Effect {_to_roman[i]}",
        } for i in range(1, 3)),
        [{
            "id":      f"rapid_fire_{id_prefix}",
            "shortID": f"{short_id_prefix}r1",
            "name":    f"Rapid Fire {name}",
        }],
    )

def _stat(name, short_id_prefix, generate_effect):
    id_prefix = name.lower()
    return chain(
        ({
            "id":      f"{id_prefix}_boost_{i}",
            "shortID": f"{short_id_prefix}b{i}",
            "name":    f"{name} Boost {_to_roman[i]}",
        } for i in range(1, 4)),
        ({
            "id":      f"{id_prefix}_{i}",
            "shortID": f"{short_id_prefix}x{i}",
            "name":    f"{name} {_to_roman[i]}",
        } for i in range(1, 4)),
        ({
            "id":      f"{id_prefix}_effect_{i}",
            "shortID": f"{short_id_prefix}e{i}",
            "name":    f"{name} Effect {_to_roman[i]}",
        } for i in range(1, 3)) if generate_effect else [],
    )

def get_procedural_rampage_skills():
    return list(chain(
        _ele("Fire"      , "fi"),
        _ele("Water"     , "wa"),
        _ele("Thunder"   , "th"),
        _ele("Ice"       , "ic"),
        _ele("Dragon"    , "dr"),
        _stat("Poison"   , "po", True ),
        _stat("Paralysis", "pa", True ),
        _stat("Sleep"    , "sl", True ),
        _stat("Blast"    , "bl", False),
    ))

# For debugging
if __name__ == "__main__":
    print(json.dumps(get_procedural_rampage_skills(), indent=4))

