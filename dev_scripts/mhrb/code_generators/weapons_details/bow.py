"""
Filename: bow.py
Author:   simshadows <contact@simshadows.com>

Processes bow-specific data.
"""

import json

_fmt = """\
    bowStats: {{
        arcShot: {arc_shot},
        baseChargeLevelLimit: {bcll},
        chargeShot: [
{charge_shot}
        ],
        compatibleCoatings: {{
            close_range_coating: {close_range_coating},
            power_coating: {power_coating},
            poison_coating: {poison_coating},
            para_coating: {para_coating},
            sleep_coating: {sleep_coating},
            blast_coating: {blast_coating},
            exhaust_coating: {exhaust_coating},
        }},
    }},\
"""

_charge_shot_fmt = """\
            [{type}, {value}],\
"""

def _make_charge_shot_str(so):
    assert isinstance(so["chargeShot"], list)
    assert (len(so["chargeShot"]) == so["baseChargeLevelLimit"]) or (len(so["chargeShot"]) == so["baseChargeLevelLimit"] + 1)
    entries = []
    for [cs_type, cs_value] in so["chargeShot"]:
        entries.append(_charge_shot_fmt.format(type=json.dumps(cs_type), value=json.dumps(cs_value)))
    return "\n".join(entries)

def generate_bow_source_lines(obj):
    so = obj["bowStats"]
    cc = so["compatibleCoatings"]

    # Quick spot check. We'll let static type checking handle the rest.
    assert isinstance(cc, dict) and len(cc) == 7

    return _fmt.format(
        arc_shot=json.dumps(so["arcShot"]),
        bcll=json.dumps(so["baseChargeLevelLimit"]),
        charge_shot=_make_charge_shot_str(so),

        close_range_coating=json.dumps(cc["close_range_coating"]),
        power_coating=      json.dumps(cc["power_coating"]),
        poison_coating=     json.dumps(cc["poison_coating"]),
        para_coating=       json.dumps(cc["para_coating"]),
        sleep_coating=      json.dumps(cc["sleep_coating"]),
        blast_coating=      json.dumps(cc["blast_coating"]),
        exhaust_coating=    json.dumps(cc["exhaust_coating"]),
    )

