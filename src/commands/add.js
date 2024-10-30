import chalk from "chalk";
import { Command } from "commander";
import prompts from "prompts";
import fs from "fs";

export const add = new Command()
  .name("add-task")
  .description("Add your task in the file")
  .action(async () => {
    // read the filnename from config.json
    let taskFileName;

    if (fs.existsSync("config.json")) {
      const configData = fs.readFileSync("config.json", "utf-8");
      const config = JSON.parse(configData);
      taskFileName = config.taskFileName;
    } else {
      console.log(
        chalk.red(
          "Configuration file not found. Please runt 'task-cli init' first."
        )
      );
      return;
    }

    // create a new task
    const { taskDescription } = await prompts({
      type: "text",
      name: "taskDescription",
      message: `${chalk.cyanBright("Enter the task description")}`,
    });

    // load the existing tasks from the specified JSON file
    if (taskDescription) {
      let tasks = [];
      if (fs.existsSync(taskFileName)) {
        const data = fs.readFileSync(taskFileName, "utf-8");
        try {
          tasks = JSON.parse(data);

          if (!Array.isArray(tasks)) {
            tasks = [];
          }
        } catch (error) {
          console.log(chalk.red("Error while getting the tasks file. "));
          tasks = [];
        }
      }

      // Create a new task
      const newTask = {
        id: tasks.length + 1,
        description: taskDescription,
        status: "not started",
      };

      // Add the new task to the list
      tasks.push(newTask);

      // Save the updated tasks back to the JSON file
      fs.writeFileSync(taskFileName, JSON.stringify(tasks, null, 2));

      console.log(
        chalk.green(`Task "${taskDescription}" has been added successfully.`)
      );
    } else {
      console.log(`${chalk.red("Task desctiption cannot be empty")}`);
    }
  });
