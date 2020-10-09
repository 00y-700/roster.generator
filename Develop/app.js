const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


let employees = [];
// and to create objects for each team member (using the correct classes as blueprints!)
function startUp() {
    inquirer.prompt([
        {
        type: "confirm",
        message: "Do you want to create an Employee?",
        name: "employee"   
        }
    ]).then(function(res) {
        console.log(res.employee)
        if (res.employee === true) {
            createEmployee()
        }
        else {
            createHTML()
        }
    })
}

function createEmployee() {
     
        inquirer.prompt( [
            {
                type: "input",
                name: "name",
                message: "What is the Employees's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the Employees's id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the Employees's email?"
            },
            {
                type: "list", 
                name: "role",
                message: "What is the Employee's role?",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ]
            }
        ]).then(function(answers) {
        switch (answers.role) {
            case "Manager":
                inquirer.prompt({
                    type: "input",
                    name: "office",
                    message: "What is the Manager's Office Number?"
                }).then(function(boss) {
                    const manager = new Manager(answers.name, answers.id, answers.email, boss.office)
                    employees.push(manager)
                    console.log(employees)
                    startUp()
                });
                break;
            case "Engineer":
                inquirer.prompt({
                    type: "input",
                    name: "github",
                    message: "What is the Engineer's github Username?"
                }).then(function(eng) {
                    const engineer = new Engineer(answers.name, answers.id, answers.email, eng.github)
                    employees.push(engineer)
                    console.log(employees)
                    startUp()
                });
                break;
            case "Intern":
                inquirer.prompt({
                    type: "input",
                    name: "school",
                    message: "What is the Intern's School?"
                }).then(function(int) {
                    const intern = new Intern(answers.name, answers.id, answers.email, int.school)
                    employees.push(intern)
                    console.log(employees)
                    startUp()
                })
        }
    })
}

function createHTML() {
    fs.writeFile(outputPath, render(employees), function (err) {
        if (err) throw err
        console.log("Done");
    })
}

startUp()
