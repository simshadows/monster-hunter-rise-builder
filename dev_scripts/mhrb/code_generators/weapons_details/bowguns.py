"""
Filename: bowguns.py
Author:   simshadows <contact@simshadows.com>

Processes bowgun-specific data.
"""

import json
from itertools import chain, product

_fmt = """\
    bowgunStats: {{
        deviation: {{
            severity: {dev_severity},
            left: {dev_left},
            right: {dev_right},
        }},
        recoil: {recoil},
        reload: {reload},
        ammo: {{
{ammo}
        }},
    }},\
"""

_ammo_fmt = """\
            {ammo_id}: {{available: {available}, ammoCapacity: {capacity}}},\
"""

def _numbered_ammo(a, keys, expected_lengths):
    for k in keys:
        t = a[k]
        assert isinstance(t, list)
        assert len(t) == expected_lengths
        for (i, [available, capacity]) in enumerate(t):
            yield _ammo_fmt.format(
                ammo_id=f"{k}_{i+1}",
                available=json.dumps(available),
                capacity=json.dumps(capacity),
            )
    return

def _unique_ammo(a, suffixes, *, make_piercing):
    prefixes = [""] if (not make_piercing) else ["", "piercing_"]
    for (prefix, suffix) in product(prefixes, suffixes):
        key = f"{prefix}{suffix}"
        [(available, capacity),] = a[key]
        yield _ammo_fmt.format(
            ammo_id=key,
            available=json.dumps(available),
            capacity=json.dumps(capacity),
        )
    return

def _make_ammo_str(so):
    a = so["ammo"]
    assert isinstance(a, dict)
    assert len(a) == 26
    return "\n".join(chain(
        _numbered_ammo(a, ["normal", "pierce", "spread", "shrapnel", "sticky", "cluster"], 3),
        _unique_ammo(a, ["fire", "water", "thunder", "ice", "dragon"], make_piercing=True),
        _numbered_ammo(a, ["poison", "paralysis", "sleep", "exhaust", "recover"], 2),
        _unique_ammo(a, ["demon", "armor", "slicing", "wyvern", "tranq"], make_piercing=False),
    ))

def _make_charge_shot_str(so):
    assert isinstance(so["chargeShot"], list)
    assert (len(so["chargeShot"]) == so["baseChargeLevelLimit"]) or (len(so["chargeShot"]) == so["baseChargeLevelLimit"] + 1)
    entries = []
    for [cs_type, cs_value] in so["chargeShot"]:
        entries.append(_charge_shot_fmt.format(type=json.dumps(cs_type), value=json.dumps(cs_value)))
    return "\n".join(entries)

def generate_bowgun_source_lines(obj):
    so = obj["bowgunStats"]

    return _fmt.format(
        dev_severity=json.dumps(so["deviation"]["severity"]),
        dev_left=    json.dumps(so["deviation"]["left"    ]),
        dev_right=   json.dumps(so["deviation"]["right"   ]),

        recoil=json.dumps(so["recoil"]),
        reload=json.dumps(so["reload"]),

        ammo=_make_ammo_str(so),
    )

