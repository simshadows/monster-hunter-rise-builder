/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 */

import React from "react";
const el = React.createElement;

interface Props<T> {
    // If the null option is currently selected, currentlySelected is the empty string.
    readonly currentlySelected: T;

    readonly optionsArray:      Readonly<T[]>;

    // When the user selects an item, this will trigger.
    // selectedValue is the option value, not the associated item!
    // If the null option is chosen, selectedValue is the empty string.
    readonly onChange:          (selectedValue: string) => void;

    // Include the null option
    readonly addNull:             boolean;

    // Maps items from optionsArray to values and names.
    // cspecGetOptionValue must never produce an empty string since that's reserved for the null value.
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

        addNull,
        cspecGetOptionValue,
        cspecGetOptionName,

        implementationClassNames,
    } = props;

    const classNames = implementationClassNames;

    const optionsElements = [];
    if (addNull) {
        optionsElements.push(el("option", {value: ""}, "---"));
    }
    for (const rampSkillObj of optionsArray) {
        const v = cspecGetOptionValue(rampSkillObj);
        if (v === "") console.error("An option value as an empty string must be reserved for the null option.");
        optionsElements.push(
            el("option", {value: v},
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

