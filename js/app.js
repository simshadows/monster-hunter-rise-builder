const elem = React.createElement;

import HelloWorldComponent from "./components/HelloWorldComponent.js";

ReactDOM.render(
    elem("div", null, elem(HelloWorldComponent, null, null)),
    document.getElementById("mhr-builder-app-container")
);

