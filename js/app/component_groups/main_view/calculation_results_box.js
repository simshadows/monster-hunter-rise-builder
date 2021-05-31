/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

const element = React.createElement;

function CalculationResultsBox() {
    return element("div",
        {
        id: "calculation-results-box",
        className: "sub-box",
        },
        "Calculation results (such as EFR) go here,",
        element("br", null, null),
        "but I haven't made a layout for it yet.",
    );
}

export default CalculationResultsBox;

