# Monster Hunter Rise Builder - Developer Notes

## Minor Notes

All files where type annotations haven't been fully implemented yet will include `// @ts-nocheck` as the first line. This will serve as a marker to indicate refactoring progress.

## React component constructors

I set three fields in a React class component contructor:

- `this._ttl`: ttl value. This field is taken as ttl truth, but its value must always be copied to `this.state.ttl` via. `this.setState()`. This field is implemented to get past the `this.state` update delay, but the `this.setState()` call is required to update the page.
- `this.state`: React's state management field.
- `this.myRefs`: References to children.

## Software Architecture: `ttlDecr()`

### Overview

To implement pop-up UI elements (such as div-implemented dropdowns and modals), we implement a `ttlDecr()` method in all React components that can be closed in a "standard way" (i.e. clicking outside the pop-up element, pressing ESC, etc.). The method is also implemented in all components that contain components that implement `ttlDecr()`.

This method must always be callable from the component's parent via. refs. All `ttlDecr()` methods must be reachable from the app root component (`MHRBuilderApp`).

Visually, this might look like:

```
         <MHRBuilderApp>
                |
                |  calls ttlDecr(1)
                v
       <MHRBuilderAppInner>
                |
                |  calls ttlDecr(1) in all children that have the method
                v
     |--------------|-------------------|--------------------|-------------|----- ...
     |              |                   |                    |             |
     |              |                   |                    |             |
     v              v                   v                    v             v
<MainView>  <BuffsSelectView>  <WeaponSelectView>  <WeaponCustomizeView>  ...
     |              |                   |                    |             |
     |              |                   |                    |             |
     v              v                   v                    v             v
    ...            ...                 ...                  ...           ...
```

However, the `ttlDecr()` method may also be called in other places as needed.

### The `ttlDecr()` method

The `ttlDecr()` method takes a single parameter `v`. `v` must only be allowed a value of `1` or `2`.

In components that are closable via. `ttlDecr()`, we also usually implement `this._ttl`. `this._ttl` should be restricted as close as possible to the range `(this._ttl >= 0) && (this._ttl <= 2)`, but for practical purposes, we instead restrict it to `(this._ttl >= -2) && (this._ttl <= 2)`.

A class component that implements both of these (and another common methods) might look like:

```Javascript
class MyReactComponent extends React.Component {

    constructor(props) {
        super(props);
        this._ttl = 0; // Initialize to 0 if MyReactComponent is initially not visible.
                       // Initialize to 1 if MyReactComponent is initially visible.

        this.state = {
                ttl: this._ttl,
            };

        this.myRefs = {
                child1: React.createRef(),
                child2: React.createRef(),
                child3: React.createRef(),
                ...
            };
    }

    ...

    ttlDecr(v) {
        console.assert((v === 1) || (v === 2));
        if (this._ttl > 0) {
            this._ttl -= v;
            this.setState({ttl: this._ttl});
        }

        // We call ttlDecr() in all children
        for (const [refLabel, refObj] of Object.entries(this.myRefs)) {
            if (typeof refObj.current !== "function") continue;
            refObj.current.ttlDecr(v);
        }
    }

    makeVisible() {
        this._ttl = 2;
        this.setState({ttl: 2});
    }

    ...

}
```

This `ttl` state field (NOT the `_ttl` attribute) determines whether or not to render a component.

For example, you might conditionally block a render:

```Javascript
class MyReactComponent extends React.Component {

    ...

    render() {
        console.assert((this.state.ttl >= -2) && (this.state.ttl <= 2));
        if (this.state.ttl <= 0) return null;

        // Rendering logic goes here
    }
}
```

I strongly recommend adding the `console.assert` lines to warn in case of logic issues.

### How does it work?

When making something visible, we set the `_ttl` value to 2.

This is because it is expected that making something visible usually comes from user interaction, which we allow to propagate up the DOM tree. This will eventually be captured by a component listening on `onClick`, which will then propagate `ttlDecr()` calls down the component tree to decrement all `_ttl` values by 1.

The `ttlDecr()` propagation eventually reaches the component we just made visible, decrementing it to 1, allowing it to remain visible until the next 

### Helpers

To simplify things, some helpers are included in `/mhrb/js/utils.js`, which also include assertions so you don't have to add assertions elsewhere.

