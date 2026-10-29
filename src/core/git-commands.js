import { execSync } from "node:child_process";
import {err} from "./colors.js";

function run(command, cwd = process.cwd()) {
  try {
    return execSync(command, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    const message = error.stderr?.toString().trim();

    if (message.includes("Not a git repository")) {
      console.log(err("Not a Git repository."));
      process.exit(1);
    }

    console.log(err(message || error.message));
    process.exit(1);
  }
}

export function getConflictFiles(path = process.cwd()) {
  return run(
    "git diff --name-only --diff-filter=U",
    path,
  )
    .split("\n")
    .map((file) => file.trim())
    .filter(Boolean);
}

export function getDiffCheck(path = process.cwd()) {
  return run("git diff --check", path);
}

export function getStatus(path = process.cwd()) {
  return run("git status --short", path);
}

export function getBranches(path = process.cwd()) {
  return run("git branch --list", path);
}

export function getHistory(file, path = process.cwd()) {
  return run(
    `git log --format="%H|%ad|%an|%s" --date=short -- "${file}"`,
    path,
  );
}