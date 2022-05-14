# alexose.com

This is my personal site! It uses GitHub Pages, and is designed around my known shortcomings around writing
documentation.

Briefly, I don't like going back and documenting old projects, because they never seem "finished" and therefore don't
warrant a bunch of extra effort to document. My most effective writing usually happens before I start on a project, as I
describe (to myself) what it's _going_ to do. Then, when I call it quits, I generally go back and adjust the early
predictions to match the actual result.

GitHub seems to be a natural fit for this. My projects seem to be increasingly "code-like", even if they're not strictly
code (Perhaps the mental model I use for programming has imprinted itself on my other hobbies). I think of almost
everything I do in terms of commits and branches. In other words, I try to use version control for everything these
days: From the written word, to 3D models, to code, to tabular data, to drawings.

I also don't love it when documentation (or discussions, feedback, "writeups", blog posts, etc.) are separate from the
codebase. This only seems to lead to broken links over time. I much prefer to keep all musings either in README.md files
or as GitHub issues.

## Theory of operation

The theory of operation is that the main page (/index.html) is simply a prettified version of the
[GitHub API /repos endpoint](https://api.github.com/users/alexose/repos?per_page=100), augmented with the README.md file
for each individual repository. This data is assembled via a nodejs script called `index.js` and displayed using Vue.

The main page is meant to give a simple chronological overview of what I'm working on. From here, visitors can click
into each individual project to learn more. If the project has an associated GitHub Pages link, it'll take them to that.
Otherwise, it just links right to the repo.
