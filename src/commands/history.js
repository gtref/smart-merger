import { getHistory, getConflictFiles } from "../core/git-commands.js";

export function repoHistory(path) {
    const files = getConflictFiles(path);

    const data = [];

    for (const file of files) {
        const history = getHistory(file, path)
            .split("\n")
            .filter(Boolean)
            .map((entry) => {
                const [hash, date, author, message] = entry.split("|");

                return {
                    hash,
                    date,
                    author,
                    message,
                };
            });

        data.push({
            file,
            history,
        });
    }

    return data;
}

export function renderRepoHistory(data) {
    for (const item of data) {
        console.log();
        console.log(`Conflicting file: ${item.file}`);
        console.log();

        for (const commit of item.history) {
            console.log(
                `  ${commit.hash.slice(0, 7)} ${commit.date} ${commit.author} ${commit.message}`,
            );
        }
    }
}