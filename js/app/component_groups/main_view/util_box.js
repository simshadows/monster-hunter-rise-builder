/*
 * Author:  simshadows <contact@simshadows.com>
 * License: GNU Affero General Public License v3 (AGPL-3.0)
 *
 * Requires React and ReactDOM to be imported in HTML.
 */

const element = React.createElement;

function UtilBox() {
    return element("div",
        {
        id: "util-box",
        },
        element("div",
            {
            id: "settings-button",
            },
            "\u2699" // TODO: Replace with a proper icon
        ),
    );
}

export default UtilBox;

