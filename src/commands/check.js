import { getConflictFiles } from "../core/git-commands.js";
import { info } from "../core/colors.js";

export function checkConflicts(path) {
  try {
    const files = getConflictFiles(path);

    if (files.length === 0) {
      console.log(info("No merge conflicts found."));
      return;
    }

    for (const file of files) {
      console.log(file);
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}