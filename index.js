import Manager from "./lib/Manager";
import Engineer from "./lib/Engineer";
import Intern from "./lib/Intern";
import { prompt } from "inquirer";
import { resolve, join } from "path";
import { existsSync, writeFileSync, mkdirSync } from "fs";

const OUTPUT_DIR = resolve(__dirname, "output");
const outputPath = join(OUTPUT_DIR, "team.html");

import render from "./src/page-template.js";

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const employees = [];

const managerQuestions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your office number?",
    name: "officeNumber",
  },
];

const menuQuestions = [
  {
    type: "list",
    message: "What do you want to do next?",
    choices: ["Add an engineer?", "Add an intern?", "Finish building the team"],
    name: "name",
  },
];

const engineerQuestions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your GitHub?",
    name: "github",
  },
];

const internQuestions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
  },
  {
    type: "input",
    message: "What course have you graduate?",
    name: "course",
  },
];

// Code to gather information about dev team members, and render the HTML file

async function createManager() {
  try {
    const userResponses = await prompt(managerQuestions);
    const manager = new Manager(
      userResponses.name,
      userResponses.id,
      userResponses.email,
      userResponses.officeNumber
    );
    employees.push(manager);
  } catch (error) {
    console.log(error);
  }
  await showMENU();
}

async function showMENU() {
  try {
    const userResponse = await prompt(menuQuestions);
    switch (userResponse.menu) {
      case "Add an engineer?":
        await createEngineer();
        break;
      case "Add an intern?":
        await createIntern();
        break;
      default:
        writeToFile();
    }
  } catch (error) {
    console.log(error);
  }
}

async function createEngineer() {
  try {
    const userResponses = await prompt(engineerQuestions);
    const engineer = new Engineer(
      userResponses.name,
      userResponses.id,
      userResponses.email,
      userResponses.github
    );
    employees.push(engineer);
  } catch (error) {
    console.log(error);
  }
  await showMENU();
}

async function createIntern() {
  try {
    const userResponses = await prompt(internQuestions);
    const intern = new Intern(
      userResponses.name,
      userResponses.id,
      userResponses.email,
      userResponses.school
    );
    employees.push(intern);
  } catch (error) {
    console.log(error);
  }
  await showMENU();
}

function writeToFile() {
  if (existsSync(OUTPUT_DIR)) {
    writeFileSync(outputPath, render(employees));
  } else {
    mkdirSync(OUTPUT_DIR);
    writeFileSync(outputPath, render(employees));
  }
}

async function main() {
  await createManager();
  writeToFile();
}

main();
