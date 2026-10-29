import chalk from "chalk";

export function exportJson(data) {
  if (data === undefined) {
    console.error(
      chalk.red("Error: Command did not return any data to export."),
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    chalk.yellow(
      JSON.stringify(data, null, 2),
    ),
  );
}