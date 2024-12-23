import { Command } from "commander";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import { update } from "./commands/update.js";
import { deleteTask } from "./commands/delete.js";
import { list } from "./commands/lists.js";

function exec() {
  // console.log(chalk.cyan("Welcome to Task Tracker CLI:::"));
  const program = new Command()
    .name("task-cli")
    .description(
      "Task tracker is a project used to track and manage your tasks. A simple command line interface (CLI) to track what you need to do, what you have done, and what you are currently working on."
    )
    .version("2.0.0", "-v", "--version", "Display task-cli version");

  program.addCommand(init);
  program.addCommand(add);
  program.addCommand(update);
  program.addCommand(deleteTask);
  program.addCommand(list);
  program.parse();
}

exec();
