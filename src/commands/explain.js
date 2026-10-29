import fs from "node:fs";
import { getConflictFiles } from "../core/git-commands.js";
import { info } from "../core/colors.js"

export function explainConflicts(path = ".") {
  const files = getConflictFiles(path);

  const results = [];

  for (const file of files) {
    const contents = fs.readFileSync(
      `${path}/${file}`,
      "utf8",
    );

    const lines = contents.split("\n");

    let ours = [];
    let theirs = [];
    let state = "normal";
    let conflictNumber = 0;

    const conflicts = [];

    for (const line of lines) {
      if (line.startsWith("<<<<<<<")) {
        conflictNumber++;
        ours = [];
        theirs = [];
        state = "ours";
        continue;
      }

      if (line.startsWith("=======")) {
        state = "theirs";
        continue;
      }

      if (line.startsWith(">>>>>>>")) {
        conflicts.push({
          number: conflictNumber,
          identical:
            ours.join("\n") === theirs.join("\n"),
          current: {
            lineCount: ours.length,
            content: ours,
          },
          incoming: {
            lineCount: theirs.length,
            content: theirs,
          },
        });

        state = "normal";
        continue;
      }

      if (state === "ours") {
        ours.push(line);
      }

      if (state === "theirs") {
        theirs.push(line);
      }
    }

    results.push({
      file,
      conflicts,
    });
  }

  return {
    totalFiles: results.length,
    files: results,
  };
}

export function renderExplain(data) {
  if (!data.files.length) {
    console.log(info("No merge conflicts found."));
    return;
  }

  for (const file of data.files) {
    console.log(info(`\nFile ${file.file}`));

    for (const conflict of file.conflicts) {
      console.log(info(`\nConflict: #${conflict.number}`));
      console.log(info("\nSummary:"));

      if (conflict.identical) {
        console.log(info("Both sides are identical"));
      } else {
        console.log(
          info(
            `- Current branch has ${conflict.current.lineCount} line(s).`,
          ),
        );

        console.log(
          info(
            `- Incoming branch has ${conflict.incoming.lineCount} line(s).`,
          ),
        );

        console.log(info("- The content differs."));
      }

      console.log("\nCurrent:");
      console.log(
        conflict.current.content
          .map((line) => `  ${line}`)
          .join("\n"),
      );

      console.log("\nIncoming:");
      console.log(
        conflict.incoming.content
          .map((line) => `  ${line}`)
          .join("\n"),
      );
    }
  }
}