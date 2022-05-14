import fs from "fs";
import fetch from "node-fetch";

// set up tokens via https://github.com/settings/tokens
import {username, token} from "./config.js";

// Check to see which repos are available
fetch("https://api.github.com/users/alexose/repos?per_page=100", {
    headers: {
        Authorization: "Basic " + Buffer.from(`${username}:${token}`).toString("base64"),
    },
})
    .then(response => response.json())
    .then(process);

async function process(arr) {
    if (arr.length === 100) {
        console.error("TODO: more than 100 repos");
        sys.exit(1);
    }

    // Filter out forks
    const repos = arr.filter(d => !d.fork);

    // Get READMEs
    const names = repos.map(d => d.name);
    for (const i in names) {
        const name = names[i];
        const url = `https://api.github.com/repos/alexose/${name}/readme`;
        const res = await fetch(url, {
            headers: {
                Accept: "application/vnd.github.html+json",
                Authorization: "Basic " + Buffer.from(`${username}:${token}`).toString("base64"),
            },
        });
        const body = await res.text();

        if (res.status === 200) repos[i].readme = body;
        console.log(`${res.status === 200 ? "Found" : "No"} readme for ${name}... (${i} / ${names.length})`);

        await new Promise(r => setTimeout(r, 1000));
    }

    // Sort
    const sorted = repos.sort((a, b) => {
        const d1 = new Date(a.updated_at);
        const d2 = new Date(b.updated_at);
        if (d1 > d2) return 1;
        if (d2 < d1) return -1;
        return 0;
    });

    // Write to file
    fs.writeFileSync("docs/repos.json", JSON.stringify(sorted, null, 2));
}
