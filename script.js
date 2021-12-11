function Menu(props) {
    return <pre>{JSON.stringify(props.json, null, 2)}</pre>;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {json: ""};
    }

    componentDidMount() {
        fetch("https://api.github.com/users/alexose/repos")
            .then(response => response.json())
            .then(json => process(json))
            .then(json =>
                this.setState(state => {
                    return {
                        ...state,
                        json,
                    };
                })
            );

        function process(json) {
            return json.filter(d => d.has_pages);
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h1>alexosedotdom</h1>
                <Menu json={this.state.json} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
