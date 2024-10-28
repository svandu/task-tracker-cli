import chalk from "chalk";
import { Command } from "commander";
import prompts from "prompts";
import fs from "fs";

export const init = new Command()
  .name("init")
  .description("Intitalize your task-cli")
  .action(async () => {
    //prompt for filename

    const { fileName } = await prompts({
      type: "text",
      name: "fileName",
      message: `${chalk.cyanBright("Enter the name of your json file")}`,
    });

    if (fileName) {
      const result = fileName.split(".")[0];
      const taskFileName = `${result}.json`;

      fs.writeFileSync(taskFileName, JSON.stringify({}));

      const config = {taskFileName};

      //save the filename to config.json
      fs.writeFileSync("config.json", JSON.stringify(config, null, 2));

      console.log("\n");
      console.log(
        `${chalk.green(`Your file ${result}.json is successfully created.`)}`
      );
      console.log("\n");
      
    }
  });
