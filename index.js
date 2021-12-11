import http from "http";
import fetch from "node-fetch";

let json = "";

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(json, null, 2));
};

const server = http.createServer(requestListener);
server.listen(8088);

// Check to see which repos are available
const {username, token} = process.env;
fetch("https://api.github.com/users/alexose/repos", {
    headers: {
        Authorization: "Basic " + `${username}:${token}`.toString("base64"),
    },
})
    .then(response => response.json())
    .then(_json => (json = _json));

// Do we have this in /experiments?

// How about a non-experiment repo?
