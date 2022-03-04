import React from "react";
import ReactDOM from "react-dom";
function Menu({json}) {
    if (!json.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {json.map(d => {
                return (
                    <div key={d.name}>
                        <h3>{d.name}</h3>
                        <div className="readme" dangerouslySetInnerHTML={{__html: d.readme}}></div>
                    </div>
                );
            })}
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {json: ""};
    }

    componentDidMount() {
        fetch("./repos.json")
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
            return json.filter(d => !d.fork);
        }
    }

    render() {
        const {json} = this.state;
        return (
            <div>
                <h1>alexosedotdom</h1>
                <Menu json={json} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
