/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    isObj,
    isInt,
    isStr,
    assert,
} from "../../check.js";


function generateEleMap(idPrefix, name) {
    return new Map([
        [idPrefix + "b1", {
            name: name + " Boost I",
        }],
        [idPrefix + "b2", {
            name: name + " Boost II",
        }],
        [idPrefix + "b3", {
            name: name + " Boost III",
        }],
        [idPrefix + "b4", {
            name: name + " Boost IV",
        }],

        [idPrefix + "x1", {
            name: name + " I",
        }],
        [idPrefix + "x2", {
            name: name + " II",
        }],
        [idPrefix + "x3", {
            name: name + " III",
        }],
        [idPrefix + "x4", {
            name: name + " IV",
        }],
    ]);
}

function generateStatMap(idPrefix, name) {
    return new Map([
        [idPrefix + "b1", {
            name: name + " Boost I",
        }],
        [idPrefix + "b2", {
            name: name + " Boost II",
        }],
        [idPrefix + "b3", {
            name: name + " Boost III",
        }],

        [idPrefix + "x1", {
            name: name + " I",
        }],
        [idPrefix + "x2", {
            name: name + " II",
        }],
        [idPrefix + "x3", {
            name: name + " III",
        }],
    ]);
}

const hardcodedRampageSkillsMap = new Map([

    ["attb1", {
        name: "Attack Boost I",
    }],
    ["attb2", {
        name: "Attack Boost II",
    }],
    ["attb3", {
        name: "Attack Boost III",
    }],
    ["attb4", {
        name: "Attack Boost IV",
    }],

    ["affb1", {
        name: "Affinity Boost I",
    }],
    ["affb2", {
        name: "Affinity Boost II",
    }],
    ["affb3", {
        name: "Affinity Boost III",
    }],
    ["affb4", {
        name: "Affinity Boost IV",
    }],

    ["eleb1", {
        name: "Elemental Boost I",
    }],
    ["eleb2", {
        name: "Elemental Boost II",
    }],
    ["eleb3", {
        name: "Elemental Boost III",
    }],

    ["defb1", {
        name: "Defense Boost I",
    }],
    ["defb2", {
        name: "Defense Boost II",
    }],
    ["defb3", {
        name: "Defense Boost III",
    }],

    ["sht1", {
        name: "Sharpness Type I",
    }],
    ["sht2", {
        name: "Sharpness Type II",
    }],
    ["sht3", {
        name: "Sharpness Type III",
    }],

    ["attsu", {
        name: "Attack Surge",
    }],
    ["elesu", {
        name: "Elemental Surge",
    }],
    ["affsu", {
        name: "Affinity Surge",
    }],

    ["neb", {
        name: "Non-elemental Boost",
    }],
    ["mr", {
        name: "Master Rider",
    }],
    ["bs", {
        name: "Brutal Strike",
    }],
    ["wbe", {
        name: "Waterblight Exploit",
    }],
    ["las", {
        name: "Lasting Arc Shot",
    }],

]);

// TODO: Verify no ID collisons?
const rampageSkillsMap = new Map([
    ...hardcodedRampageSkillsMap,
    ...generateEleMap("fir", "Fire"),
    ...generateEleMap("wat", "Water"),
    ...generateEleMap("thu", "Thunder"),
    ...generateEleMap("ice", "Ice"),
    ...generateEleMap("dra", "Dragon"),
    ...generateStatMap("poi", "Poison"),
    ...generateStatMap("par", "Paralysis"),
    ...generateStatMap("sle", "Sleep"),
    ...generateStatMap("bla", "Blast"),
]);
// For convenience, we also attach IDs to each object
for (const [rampSkillID, rampSkillObj] of rampageSkillsMap.entries()) {
    rampSkillObj.id = rampSkillID;
}

export {rampageSkillsMap};

