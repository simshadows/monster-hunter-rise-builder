/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * This file is NOT generated code.
 * The generated code files are the '_generated_*.ts' files.
 *
 * This file specifically processes weapon data.
 */

import {
    isPositiveNZInt,
} from "../../generic/check";
import {
    sumArray,
} from "../../generic/utils";
import {
    FrozenMap,
} from "../../generic/frozen-containers";

import {
    type Weapon,
    type MeleeWeapon,
    
    type Greatsword,
    type Longsword,
    type SwordAndShield,
    type DualBlades,
    type Lance,
    type Gunlance,
    type Hammer,
    type HuntingHorn,

    type WeaponMap,

    isMelee, // Type Predicate
} from "../../common/types";
import {
    toNameFilterString,
} from "../../common/mappings";
import {
    populate,
} from "../_internals";

import {greatswordsArray    } from "./_generated_weapon_greatsword";
import {longswordsArray     } from "./_generated_weapon_longsword";
import {swordandshieldsArray} from "./_generated_weapon_swordandshield";
import {dualbladessArray    } from "./_generated_weapon_dualblades";
import {lancesArray         } from "./_generated_weapon_lance";
import {gunlancesArray      } from "./_generated_weapon_gunlance";
import {hammersArray        } from "./_generated_weapon_hammer";
import {huntinghornsArray   } from "./_generated_weapon_huntinghorn";

function validateMeleeWeapon(w: MeleeWeapon): void {
    const baseSum = sumArray(w.baseSharpness);
    const maxSum = sumArray(w.maxSharpness);

    console.assert((baseSum === maxSum) || (baseSum + 50 === maxSum));
    
    console.assert(w.baseSharpness.length === w.maxSharpness.length); // sanity check
    let levelMustBeEqual = false;
    for (let i = w.baseSharpness.length - 1; i >= 0; --i) {
        const b = w.baseSharpness[i]!; // DANGER: Type assertion!
        const m = w.maxSharpness[i]!;

        // Check to see that the assertions are correct
        console.assert(b !== undefined);
        console.assert(m !== undefined);

        console.assert((b % 1 === 0) && (b >= 0));
        console.assert((m % 1 === 0) && (m >= 0));

        if (levelMustBeEqual) {
            console.assert(b === m);
        } else {
            if (b > 0) levelMustBeEqual = true;
            console.assert(b <= m);
        }
    }
}

function processWeapon<W extends Weapon>(arr: Readonly<W[]>): FrozenMap<string, W> {
    return populate<W>(
        arr,
        (obj) => {

            // Validate common invariants
            console.assert(/^[a-z0-9]+$/.test(obj.id));
            console.assert(obj.name !== "");
            console.assert(obj.treeName !== "");
            console.assert(isPositiveNZInt(obj.attack));
            console.assert(obj.affinity % 1 === 0);
            console.assert((obj.defense % 1 === 0) && (obj.defense >= 0));
            for (const [_, eleStatValue] of obj.eleStat.entries()) {
                console.assert(isPositiveNZInt(eleStatValue));
            }

            console.assert(obj.filterHelpers.nameLower !== "");
            console.assert(obj.filterHelpers.nameLower === toNameFilterString(obj.name));

            console.assert(obj.filterHelpers.treeNameLower !== "");
            console.assert(obj.filterHelpers.treeNameLower === toNameFilterString(obj.treeName));

            if (isMelee(obj)) validateMeleeWeapon(obj);
            return obj;
        },
    );
}

const weaponsMap: Readonly<WeaponMap> = {
    greatsword:     processWeapon<Greatsword    >(greatswordsArray    ),
    longsword:      processWeapon<Longsword     >(longswordsArray     ),
    swordandshield: processWeapon<SwordAndShield>(swordandshieldsArray),
    dualblades:     processWeapon<DualBlades    >(dualbladessArray    ),
    lance:          processWeapon<Lance         >(lancesArray         ),
    gunlance:       processWeapon<Gunlance      >(gunlancesArray      ),
    hammer:         processWeapon<Hammer        >(hammersArray        ),
    huntinghorn:    processWeapon<HuntingHorn   >(huntinghornsArray   ),
};

export {
    weaponsMap,
};

