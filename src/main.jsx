import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import repos from "./repos.json";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {json: ""};
    }

    componentDidMount() {
        this.setState(state => {
            const sorted = repos.slice().sort((a, b) => {
                const d1 = new Date(a.updated_at);
                const d2 = new Date(b.updated_at);
                if (d1 < d2) return 1;
                if (d1 > d2) return -1;
                return 0;
            });

            console.log(sorted);

            return {
                ...state,
                json: sorted,
            };
        });
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
