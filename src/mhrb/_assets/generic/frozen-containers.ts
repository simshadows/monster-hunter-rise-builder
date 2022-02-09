/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

export class FrozenMap<K, V> {
    readonly #underlying: Readonly<Map<K, V>>;

    // TODO: How do I get something like this to work?
    //constructor(...args: ConstructorParameters<Map<K, V>>) {
    //    this.#underlying = new Map<K, V>(...args);
    //}

    // TODO: Highly constrained for now since I'm not sure how to forward the arguments without losing type safety.
    constructor(toBeFrozen: Map<K, V>) {
        this.#underlying = new Map<K, V>(toBeFrozen);
    }

    // TODO: Rather than define each method individually, why not generate them?
    get(...args: Parameters<Map<K, V>["get"]>): ReturnType<Map<K, V>["get"]> {
        return this.#underlying.get(...args);
    }
    has(...args: Parameters<Map<K, V>["has"]>): ReturnType<Map<K, V>["has"]> {
        return this.#underlying.has(...args);
    }
    keys(...args: Parameters<Map<K, V>["keys"]>): ReturnType<Map<K, V>["keys"]> {
        return this.#underlying.keys(...args);
    }
    values(...args: Parameters<Map<K, V>["values"]>): ReturnType<Map<K, V>["values"]> {
        return this.#underlying.values(...args);
    }
    entries(...args: Parameters<Map<K, V>["entries"]>): ReturnType<Map<K, V>["entries"]> {
        return this.#underlying.entries(...args);
    }
    get size(): Map<K, V>["size"] {
        return this.#underlying.size;
    }
}

