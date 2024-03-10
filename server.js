const inquirer = require("inquirer");
//import and require mysql2
const mysql = require("mysql2");

//encryption is required
require("dotenv").config();

// DOTENV variables
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.staff_db;

// Connect to staff db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "staff_db",
});

//empty variables for the query, returns and prompt responses

let returnRowsFromDB = [];
let returnedOutput = [];

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which action would you like to take?",
        name: "selection",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      let selectedAnswers = answers.selection;

      switch (selectedAnswers) {
        // id, name
        case "View all departments":
          db.query("SELECT * FROM department", function (err, department) {
            if (err) console.error(err);
            console.table(department); // needs to be part of array?
          });
          break;
        // role id, job title, department value, salary value
        case "View all roles":
          returnRowsFromDB = db.query(`
                      SELECT
                          role.id,
                          role.title,
                          role.salary,
                          department.name AS department
                      FROM role
                      JOIN department ON role.department_id = department.id
                      `);
          console.log(returnRowsFromDB[0]);
          break;
      }
    });
};

const viewAllEmployees = () =>
  db.query(
    `SELECT employee.id AS employee_id
SELECT employee.id.first_name,
SELECT employee.id.last_name,
SELECT employee.id.role_id,
SELECT employee.id.manager_id`,
    function (err, results) {
      console.log(`\n`);
      console.table(results);
      promptUser();
    }
  );

const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new department?",
        name: "name",
      },
    ])
    .then((data) => {
      db.query(
        `INSERT INTO department (name) (?)`,
        data.name,
        (err, results) => {
          console.log("\nNew department has been added.");
          viewAllDepartments();
        }
      );
    });
};

const addRole = () => {
  let departmentArray = [];
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.error(err); // Handle error if query fails
      return;
    }
    for (let i = 0; i < results.length; i++) {
      departmentArray.push(results[i].name); // Populate department names array
    }
    // Now you can proceed with further processing or return the departmentArray
  });
};
