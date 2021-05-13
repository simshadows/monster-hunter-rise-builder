const elem = React.createElement;

// Component
class TestComponent extends React.Component {

    constructor() {
        super();
        this.state = {message: null};
    }
    
    async componentDidMount() {
        this.setState({message: "Hello, world!"});
    }

    render() {
        return elem("p", null, this.state.message);
    }
}

ReactDOM.render(
    elem("div", null, elem(TestComponent, null, null)),
    document.getElementById("appcontainer")
);

