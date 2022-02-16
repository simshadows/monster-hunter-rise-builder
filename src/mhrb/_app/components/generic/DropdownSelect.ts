/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const el = React.createElement;

interface Props<T> {
    readonly currentlySelected: T;
    readonly optionsArray:      Readonly<T[]>;
    readonly onChange:    (selectedValue: string) => void; // Returns a value, not the item!

    readonly cspecGetOptionValue: (item: T) => string;
    readonly cspecGetOptionName:  (item: T) => string;

    readonly implementationClassNames: {
        readonly select: string;
    };
}

export function DropdownSelect<T>(props: Props<T>) {
    const {
        currentlySelected,
        optionsArray,
        onChange,

        cspecGetOptionValue,
        cspecGetOptionName,

        implementationClassNames,
    } = props;

    const classNames = implementationClassNames;

    const optionsElements = [];
    for (const rampSkillObj of optionsArray) {
        optionsElements.push(
            el("option", {value: cspecGetOptionValue(rampSkillObj)},
                cspecGetOptionName(rampSkillObj),
            ),
        );
    }

    const _onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v: string = e.target.value;
        console.assert(v !== undefined); // Not guaranteed
        onChange(v);
    };
    
    return el("select", { className: classNames.select,
                          value: cspecGetOptionValue(currentlySelected),
                          onChange: _onChange },
        ...optionsElements,
    );
}

