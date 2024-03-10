const inquirer = require("inquirer");
const mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "staff_db",
});

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
      let selectedAnswer = answers.selection;
  
      switch (selectedAnswer) {
        case "View all departments":
          db.query("SELECT * FROM department", function (err, answers) {
            if (err) console.error(err);
            console.table(answers);
          });
          break;

        case "View all roles":
          db.query("SELECT * FROM role", function (err, answers) {
            if (err) console.error(err);
            console.table(answers);
          });
          break;

          // please continue working here, to be adding department logic
        case "Add a department":
          db.query("SELECT * FROM department", function (err, department) {
            const addNewDepartment = () => {
              const insertDepartment = `INSERT INTO department (name) VALUES (?)`;
              connection.query(query, [response.name], (err, res) => {
                if (err) throw err;
                console.log(`Successfully added department ${response.name} department at  id ${response.id}}`);
              });
            };
          });
          break;


          

        case "View all employees":
          db.query(
            `SELECT employee.id,
              employee.first_name,
              employee.last_name,
              role.id AS role_id,
              manager.id AS manager_id
              FROM employee
              JOIN role ON employee.role_id = role.id
              LEFT JOIN employee AS manager ON employee.manager_id = manager.id`,
            function (err, results) {
              if (err) console.error(err);
              console.table(results);
            }
          );
          break;
      }
      promptUser();
    });
};




promptUser();
function handleQueryResults(err, results) {
  console.log(`\n`);
  console.table(results);
  promptUser();
}

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
      departmentArray.push(results[i].name);
      // Populate department names array
    }
    return inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the new role?",
          name: "title",
        },
        {
          type: "input",
          message: 'What is the salary of the new role?"',
          name: "salary",
        },
        {
          type: "list",
          message: 'What department is the role under?"',
          name: "department",
          choices: departmentArray,
        },
      ])
      .then((data) => {
        // Get the department id
        db.query(
          `SELECT id FROM department WHERE department.name = ?`,
          data.department,
          (err, result) => {
            if (err) {
              console.error("Error getting department id:", err);
              return;
            }

            if (result.length === 0) {
              console.error("Department not found.");
              return;
            }
            // Insert new role
            db.query(
              `INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`,
              [data.title, data.salary, department_id],
              (err, result) => {
                if (err) {
                  console.error("Error inserting new role:", err);
                  return;
                }

                console.log("\nNew role added.");
                viewAllRoles(); // Assuming viewAllRoles is a function that displays all roles
              }
            );
          }
        );
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    // Now you can proceed with further processing or return the departmentArray
  });
};

promptUser();