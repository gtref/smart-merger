import { getStatus, getBranches } from "../core/git-commands.js";
import { info } from "../core/colors.js";

export function repoStatus(path = ".") {
  const status = getStatus(path);
  const branches = getBranches(path);

  const files = status
    .split("\n")
    .filter(Boolean)
    .map((line) => ({
      index: line[0],
      workingTree: line[1],
      file: line.slice(3),
    }));

  const rBranches = branches
    .split("\n")
    .filter(Boolean)
    .map((line) => ({
        name: line.replace(/\*/g, " ").trim(),
        current: line.startsWith("*"),
    }));

  return {
    totalFiles: files.length,
    files,
    branches: rBranches
  };
}

function getStatusText(index, workingTree) {
  if (
    index === "U" ||
    workingTree === "U" ||
    (index === "A" && workingTree === "A") ||
    (index === "D" && workingTree === "D")
  ) {
    return "! CONFLICT";
  }

  if (index === "?" && workingTree === "?") {
    return "Untracked";
  }

  if (index === "A") {
    return "+ Added";
  }

  if (index === "M" || workingTree === "M") {
    return "Modified";
  }

  if (index === "D" || workingTree === "D") {
    return "- Deleted";
  }

  if (index === "R") {
    return "Renamed";
  }

  return "Changed";
}

export function renderStatus(data) {
  if (data.totalFiles === 0) {
    console.log(info("Working tree clean."));
    return;
  }

  console.log(info(`Found ${data.totalFiles} changed file(s):\n`));

  for (const file of data.files) {
    console.log(
      `${getStatusText(file.index, file.workingTree)}: ${file.file}`,
    );
  }

  console.log(info("\nBranches:"));
  for (const branch of data.branches) {
    console.log(
        `${branch.current ? "*" : " "} ${branch.name}`
    );
  }
}