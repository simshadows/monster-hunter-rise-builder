/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * TODO: Refactor FrozenMap usage into just using Typescript's ReadonlyMap.
 */

export class FrozenMap<K, V> {
    private readonly _underlying: Readonly<Map<K, V>>;

    // TODO: How do I get something like this to work?
    //constructor(...args: ConstructorParameters<Map<K, V>>) {
    //    this._underlying = new Map<K, V>(...args);
    //}

    // TODO: Highly constrained for now since I'm not sure how to forward the arguments without losing type safety.
    constructor(toBeFrozen: Map<K, V>) {
        this._underlying = new Map<K, V>(toBeFrozen);
    }

    // TODO: Rather than define each method individually, why not generate them?
    get(...args: Parameters<Map<K, V>["get"]>): ReturnType<Map<K, V>["get"]> {
        return this._underlying.get(...args);
    }
    has(...args: Parameters<Map<K, V>["has"]>): ReturnType<Map<K, V>["has"]> {
        return this._underlying.has(...args);
    }
    keys(...args: Parameters<Map<K, V>["keys"]>): ReturnType<Map<K, V>["keys"]> {
        return this._underlying.keys(...args);
    }
    values(...args: Parameters<Map<K, V>["values"]>): ReturnType<Map<K, V>["values"]> {
        return this._underlying.values(...args);
    }
    entries(...args: Parameters<Map<K, V>["entries"]>): ReturnType<Map<K, V>["entries"]> {
        return this._underlying.entries(...args);
    }
    get size(): Map<K, V>["size"] {
        return this._underlying.size;
    }
}

