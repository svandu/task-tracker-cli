import chalk from "chalk";
import { Command } from "commander";
import fs from "fs";

export const list = new Command()
  .name("list-tasks")
  .description("List the tasks based on the different filters.")
  .option("-a, --all", "Lists all the tasks")
  .option("-d, --done", "Lists that are done")
  .option("-n --not-done", "Lists that are not done")
  .option("-p --progress", "Lists that are in progress")
  .action(async (options) => {
    let taskFileName;

    // read the filename from config.json

    if (fs.existsSync("config.json")) {
      const configData = fs.readFileSync("config.json", "utf-8");
      const config = JSON.parse(configData);
      taskFileName = config.taskFileName;
    } else {
      console.log(chalk.red("Configuration not found"));
      return;
    }

    if (fs.existsSync(taskFileName)) {
      const data = fs.readFileSync(taskFileName, "utf-8");
      const tasks = JSON.parse(data);

      let filteredTasks = tasks;

      //apply filter based on the options
      if (options.done) {
        filteredTasks = tasks.filter((task) => task.status === "completed");
        console.log(chalk.green("Completed Tasks: "));
      } else if (options.progress) {
        filteredTasks = tasks.filter((task) => task.status === "in progress");
        console.log(chalk.yellow("Task in progress: "));
      } else if (options.notDone) {
        filteredTasks = tasks.filter((task) => task.status === "not started");
        console.log(chalk.cyan("Not started tasks"));
      } else if (options.all) {
        console.log(chalk.blue("All tasks: "));
      } else {
        console.log(
          chalk.red(
            "Please spcify an option: --all, --done, --progress, --not-done"
          )
        );
        return;
      }

      filteredTasks.forEach((task) => {
        console.log(
          `- ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`
        );
      });
    } else {
      console.log(chalk.red(`Task file ${taskFileName} not found.`));
    }
  });
