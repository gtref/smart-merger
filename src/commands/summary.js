import {
    getHistory,
    getBranches,
    getStatus,
    getConflictFiles
} from "../core/git-commands.js";

export function showSummary(path) {
    const status = getStatus(path);
    const branches = getBranches(path);
    const files = getConflictFiles(path);

    const conflictHistory = [];

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
                    message
                };
            });

        conflictHistory.push({
            file,
            history
        });
    }

    return {
        repository: path,
        hasConflicts: files.length > 0,
        conflictCount: files.length,
        changedFileCount: status.length,
        branches,
        status,
        conflictingFiles: files,
        conflictHistory
    };
}

export function renderSummary(data) {
    console.log(`Repository: ${data.repository}`);
    console.log(`Changed files: ${data.changedFileCount}`);
    console.log(`Conflicts: ${data.conflictCount}`);
    console.log("");

    if (data.branches) {
        console.log("Branches:");
        console.log(data.branches);
        console.log("");
    }

    if (data.conflictingFiles.length) {
        console.log("Conflicting Files:");

        for (const file of data.conflictingFiles) {
            console.log(`  ! ${file}`);
        }

        console.log("");
    }

    if (data.conflictHistory?.length) {
        console.log("Conflict History:");

        for (const item of data.conflictHistory) {
            console.log(`  ${item.file}`);

            if (!item.history.length) {
                console.log("    No history found");
                continue;
            }

            for (const commit of item.history.slice(0, 5)) {
                console.log(
                    `    ${commit.hash.slice(0, 7)} | ${commit.date} | ${commit.author}`
                );
                console.log(`      ${commit.message}`);
            }

            console.log("");
        }
    }
}
