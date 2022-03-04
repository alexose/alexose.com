import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

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
            <Router>
                <div>
                    <h1>alexosedotdom</h1>
                </div>
                <Routes>
                    <Route path="/weather" element={<h2>Weather!</h2>} />
                    <Route path="/" element={<Menu json={json} />} />
                </Routes>
            </Router>
        );
    }
}

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

ReactDOM.render(<App />, document.getElementById("app"));
