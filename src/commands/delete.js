import chalk from "chalk";
import { Command } from "commander";
import prompts from "prompts";
import fs from "fs";

export const deleteTask = new Command()
  .name("delete-task")
  .description("Delete an existing task")
  .action(async () => {
    let taskFileName;

    if (fs.existsSync("config.json")) {
      const configData = fs.readFileSync("config.json", "utf-8");
      const config = JSON.parse(configData);
      taskFileName = config.taskFileName;
    } else {
      console.log(chalk.red("Configuration file not found"));
      return;
    }

    if (fs.existsSync(taskFileName)) {
      const data = fs.readFileSync(taskFileName, "utf-8");
      let tasks = JSON.parse(data);

      const { taskId } = await prompts({
        type: "number",
        name: "taskId",
        message: `${chalk.cyanBright("Enter the ID of the task to delete")}`,
      });

      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) {
        console.log(chalk.red("Task not found"));
        return;
      }

      // remove the task
      tasks.splice(taskIndex, 1);

      fs.writeFileSync(taskFileName, JSON.stringify(tasks, null, 2));
      console.log(
        chalk.green(`Task ${taskId} has been deleted successfully. `)
      );
    } else {
      console.log(chalk.red(`Task file ${taskFileName} not found`));
    }
  });
