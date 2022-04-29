/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import {
    type SharpnessMutable,
    type EleStatMapMutable,

    type GLStats,
    type HHSongs,
    type SAStats,
    type CBStats,
    type IGStats,

    type BowChargeShotType,
    type BowChargeShotLevel,
    type BowChargeLevelLimit,
    type BowStatsMutable,
    type BowStats,

    type BowgunStatsMutable,
    type BowgunStats,

    type Weapon,
    isMelee,
    isBowgun,
    isGL,
    isHH,
    isSA,
    isCB,
    isIG,
    isBow,
} from "../../common/types";

// TODO: Make it a standard type?
// TODO: remove export?
export interface BasicMeleeStatistics {
    // TODO: Another weird naming thing. Fix this!
    minSharpness: SharpnessMutable;
    maxSharpness: SharpnessMutable;
}

type BowStatsModified = BowStatsMutable & {chargeLevelLimit: BowChargeLevelLimit};

function createMutableBowgunStats(obj: BowgunStats): BowgunStatsMutable {
    return {
        deviation: {...obj.deviation},
        recoil: obj.recoil,
        reload: obj.reload,
        ammo:   {...obj.ammo},
    };
}

function createMutableBowStats(obj: BowStats): BowStatsModified {
    const newChargeShotMap: [BowChargeShotType, BowChargeShotLevel][] = [];
    for (const x of obj.chargeShot) {
        newChargeShotMap.push([...x]);
    }
    return {
        arcShot:              obj.arcShot,
        baseChargeLevelLimit: obj.baseChargeLevelLimit,
        chargeLevelLimit:     obj.baseChargeLevelLimit,
        chargeShot:           newChargeShotMap,
        compatibleCoatings:   {...obj.compatibleCoatings},
    };
}

// TODO: We should unify this with other types.
// TODO: Mapping type?
export interface EleStatObj {
    fire:    number;
    water:   number;
    thunder: number;
    ice:     number;
    dragon:  number;
    
    poison:    number;
    paralysis: number;
    sleep:     number;
    blast:     number;
}

// All fields are publicly mutable, with convenience methods provided.
export class BaseStatistics {
    baseRaw:      number;
    baseAffinity: number;
    baseEleStat:  EleStatMapMutable;
    baseDefense:  number;

    // Immutable objects unless noted otherwise
    // TODO: This mutability inconsistency is a little weird. Change it?
    meleeStats:  null | BasicMeleeStatistics = null; // Mutable
    glStats:     null | GLStats              = null;
    hhStats:     null | HHSongs              = null;
    saStats:     null | SAStats              = null;
    cbStats:     null | CBStats              = null;
    igStats:     null | IGStats              = null;
    bowgunStats: null | BowgunStatsMutable   = null; // Mutable
    bowStats:    null | BowStatsMutable      = null; // Mutable

    baseRawAdd:      number = 0;
    baseRawMul:      number = 1;
    rawPostTruncMul: number = 1;

    affinityAdd: number = 0;

    eleStatMul: EleStatObj = {
        fire:      1,
        water:     1,
        thunder:   1,
        ice:       1,
        dragon:    1,

        poison:    1,
        paralysis: 1,
        sleep:     1,
        blast:     1,
    };

    narwaSoulActive: boolean = false;

    constructor(w: Weapon) {
        this.baseRaw      = w.attack;
        this.baseAffinity = w.affinity;
        this.baseEleStat  = new Map(w.eleStat.entries());
        this.baseDefense  = w.defense;

        if (isMelee(w)) {
            this.meleeStats = {
                minSharpness: [...w.baseSharpness],
                maxSharpness: [...w.maxSharpness],
            };

            if (isGL(w))      {this.glStats = w.gunlanceStats;    }
            else if (isHH(w)) {this.hhStats = w.huntinghornSongs; }
            else if (isSA(w)) {this.saStats = w.switchaxeStats;   }
            else if (isCB(w)) {this.cbStats = w.chargebladeStats; }
            else if (isIG(w)) {this.igStats = w.insectglaiveStats;}
        } else if (isBowgun(w)) {
            this.bowgunStats = createMutableBowgunStats(w.bowgunStats);
        } else if (isBow(w)) {
            this.bowStats = createMutableBowStats(w.bowStats);
        } else {
            throw "Unhandled weapon type.";
        }
    }
}

