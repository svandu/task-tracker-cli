import chalk from "chalk";
import { Command } from "commander";
import prompts from "prompts";
import fs from "fs";

export const update = new Command()
  .name("update-task")
  .description("Update an existing task")
  .action(async () => {
    let taskFileName;

    if (fs.existsSync("config.json")) {
      const configData = fs.readFileSync("config.json", "utf-8");
      const config = JSON.parse(configData);
      taskFileName = config.taskFileName;
    } else {
      console.log(chalk.red("COnfiguration file not found"));
      return;
    }

    if (fs.existsSync(taskFileName)) {
      const data = fs.readFileSync(taskFileName, "utf-8");
      let tasks = JSON.parse(data);

      const { taskId } = await prompts({
        type: "number",
        name: "taskId",
        message: `${chalk.cyanBright("Enter the id of the task to update")}`,
      });

      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) {
        console.log(chalk.red("Task not found"));
        return;
      }

      const { newDescription, newStatus } = await prompts([
        {
          type: "text",
          name: "newDescription",
          message: `${chalk.cyanBright(
            "Enter the new task description (leave blank to keep current)"
          )}`,
        },
        {
          type: "select",
          name: "newStatus",
          message: `${chalk.cyanBright("Select the new status")}`,
          choices: [
            { title: "not started", value: "not started" },
            { title: "in progress", value: "in progress" },
            { title: "completed", value: "completed" },
          ],
        },
      ]);

      if (newDescription) {
        tasks[taskIndex].description = newDescription;
      }
      tasks[taskIndex].status = newStatus;

      fs.writeFileSync(taskFileName, JSON.stringify(tasks, null, 2));
      console.log(chalk.green(`Task ${taskId} has been updated successfully.`));
    } else {
      console.log(chalk.red(`Task file ${taskFileName} not found.`));
    }
  });
