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

    // Get extra data
    await augmentCommits(repos);
    await augmentReadmes(repos);

    // Sort
    const sorted = repos.sort((a, b) => {
        const d1 = new Date(a.last_commit_at);
        const d2 = new Date(b.updated_at);
        if (d1 > d2) return 1;
        if (d2 < d1) return -1;
        return 0;
    });

    // Write to file
    fs.writeFileSync("src/repos.json", JSON.stringify(sorted, null, 2));
}

async function augmentReadmes(repos) {
    return new Promise(async (resolve, reject) => {
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
        resolve();
    });
}

async function augmentCommits(repos) {
    return new Promise(async (resolve, reject) => {
        const names = repos.map(d => d.name);
        for (const i in names) {
            const name = names[i];
            const url = `https://api.github.com/repos/alexose/${name}/commits`;
            const res = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Basic " + Buffer.from(`${username}:${token}`).toString("base64"),
                },
            });
            const arr = await res.json();

            let abridged = [];
            if (arr && Array.isArray(arr)) {
                abridged = arr.map(d => d.commit.committer);
                if (res.status === 200) repos[i].commits = abridged;
            } else {
                console.log(arr);
            }

            repos[i].commits = abridged;

            let lastCommit;
            try {
                lastCommit = abridged
                    .filter(d => d.name === "Alexander Ose" || d.name === "Alex Ose")
                    .map(d => new Date(d.date))
                    .sort()[0]
                    .toString();
            } catch (e) {
                console.log("Couldn't figure out last commit date: " + e);
                lastCommit = "Unknown";
            }

            repos[i].last_commit_at = lastCommit;

            console.log(
                `${
                    res.status === 200 ? "Found" : "No"
                } commits for ${name}... last commit on ${lastCommit.toLocaleString()} (${i} / ${names.length})`
            );
            await new Promise(r => setTimeout(r, 1000));
        }
        resolve();
    });
}
