const elem = React.createElement;

// Component
class HelloWorldComponent extends React.Component {

    constructor() {
        super();
        this.state = {message: null};
    }
    
    async componentDidMount() {
        this.setState({message: "Hello, world! Successfully imported a separate component file."});
    }

    render() {
        return elem("p", null, this.state.message);
    }
}

export default HelloWorldComponent;

