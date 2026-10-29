#!/usr/bin/env node

import { Command } from "commander";
import { checkConflicts } from "./src/commands/check.js";
import { explainConflicts, renderExplain } from "./src/commands/explain.js";
import { repoStatus, renderStatus } from "./src/commands/status.js";
import { exportJson } from "./src/core/json.js";
import { repoHistory, renderRepoHistory } from "./src/commands/history.js";

const program = new Command();

program
  .name("SmartMerger")
  .description("A tool to help with merging of git conflicts")
  .version("1.0.0")
  .option("--no-color", "Output with no color")
  .option("--json", "Output in machine readable json format");

program
  .command("check")
  .description("Check for git conflicts")
  .argument("<path>", "Path to the git repository")
  .action((path) => {
    checkConflicts(path);
  });

program
  .command("explain")
  .description("Explain git conflicts")
  .argument("<path>", "Path to the git repository")
  .action((path) => {
    const options = program.opts();
    const data = explainConflicts(path);

    if (options.json) {
      exportJson(data);
      return;
    }

    renderExplain(data);
  });

program
  .command("status")
  .description("Show current git repository status")
  .argument("<path>", "Path to the git repository")
  .action((path) => {
    const options = program.opts();
    const data = repoStatus(path);

    if (options.json) {
        exportJson(data);
        return;
    } 
    renderStatus(data);
  });

program
  .command("history")
  .description("Show commit history for conflicting files")
  .argument("<path>", "Path to the git repository")
  .action((path) => {
    const options = program.opts();
    const data = repoHistory(path);

    if (options.json) {
        exportJson(data);
        return;
    }
    renderRepoHistory(data);
  })


program.parse(process.argv);