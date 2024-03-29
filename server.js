const inquirer = require("inquirer");
const mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "staff_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which would you like to do today?",
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
      switch (answers.selection) {
        case "View all departments":
          viewAllDepartments();
          break;
        // Add more cases as needed
        case "View all roles":
          viewAllRoles();
          // Add logic for viewing all roles
          break;
        case "View all employees":
          viewAllEmployees();
          // Add logic for viewing all employees
          break;
        case "Add a department":
          addDepartment();
          // Add logic for adding a department
          break;
        case "Add a role":
          addRole();
          // Add logic for adding a role
          break;
        case "Add an employee":
          // Add logic for adding an employee
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          // Add logic for updating an employee role
          break;
      }
    });
}
//this is where we viewAllDepartments
function viewAllDepartments() {
  const query = "SELECT * FROM department";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    //app restart
    start();
  });
}

//function to viewAllRoles
function viewAllRoles() {
  const query = "SELECT * FROM role";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    //app restart
    start();
  });
}

//function that viewAllEmployees
function viewAllEmployees() {
  const query =
    "SELECT id, first_name, last_name, role_id, manager_id FROM employee";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    //application restart
    start();
  });
}

//function to addDepartment
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "What is the name of the new department?",
    })
    .then((answers) => {
      console.log(answers.name);
      const query = `INSERT INTO department (name) VALUES ("${answers.name}")`;
      db.query(query, (err) => {
        if (err) throw err;
        console.log(`Added department ${answers.name} to the database`);
        //application reset
        start();
        console.log(answers.name);
      });
    });
}

//function to addRole();
function addRole() {
  const query = "SELECT * FROM department";
  db.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the new role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary of the role:",
        },
        {
          type: "list",
          name: "department",
          message: "Enter the department for the new role:",
          choices: res.map((department) => department.id),
        },
      ])
      .then((answers) => {
        console.log(answers);
        //TODO: Needs to be fixed. Does not like data to be passed
        const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(
          query,
          [answers.title, Number(answers.salary), answers.department],
          (err) => {
            if (err) throw err;
            console.log(
              `Added role ${answers.title} with salary ${answers.salary} to the ${answers.department} department in the database.`
            );
            start();
          }
        );
      });
  });
}

function addEmployee() {
  // First get the list of the employees
  db.query(
    "SELECT id, first_name, last_name, role_id, manager_id FROM employee",
    (err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      const roles = res.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      // Retrieving list of employees from the database to use as a manager
      db.query(
        'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
        (err, res) => {
          if (err) {
            console.log(err);
            return;
          }

          const manager = res.map(({ id, name }) => ({
            name,
            value: id,
          }));

          // Prompt the user for input
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "Enter the employee's first name: ",
              },
              {
                type: "input",
                name: "lastName",
                message: "Enter the employee's last name: ",
              },
              {
                type: "list",
                name: "roleId",
                message: "Select the employee's role: ",
                choices: roles,
              },
              {
                type: "list",
                name: "managerId",
                message: "Select the employee's manager: ",
                choices: [{ name: "None", value: null }, ...manager],
              },
            ])
            .then((answers) => {
              // Apply the answers into the DB
              const sql =
                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";

              const values = [
                answers.firstName,
                answers.lastName,
                answers.roleId,
                answers.managerId,
              ];
              db.query(sql, values, (err) => {
                if (err) {
                  console.log(err);
                }
                console.log("Employee added successfully!");
                start();
              });
            });
        }
      );
    }
  );
}


//last part to work on 
function updateEmployeeRole() {
  const queryEmployees =
    "SELECT employee.id, employee.first_name, employee.last_name FROM employee LEFT JOIN role ON employee.role_id = role.id";
  const queryRoles = "SELECT * FROM role";

  db.query(queryEmployees, (err, resEmployee) => {
    if (err) throw err;

    db.query(queryRoles, (err, resRoles) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Select the employee to update:",
            choices: resEmployee.map(
              (employee) => ({name: `${employee.first_name} ${employee.last_name}`,value: employee.id}),

            ), 
          },
          {
            type: "list",
            name: "role",
            message: "Select the new role:",
            choices: resRoles.map((role) => ({name:role.title,value: role.id} )),
          },
        ])
        .then((answers) => {
          console.log(answers);
          const employee = resEmployee.find(
            (employee) =>
              `${employee.first_name} ${employee.last_name}` ===
              answers.employee
          );
          const selectedRole = resRoles.find(
            (role) => role.title === answers.role
          );

          const role = resRoles.find((role) => role.title === answers.role);
          

          const query = "UPDATE employee SET role_id = ? WHERE id = ?";
          db.query(query, [answers.role, answers.employee], (err, res) => {
            if (err) {
              console.log(err);
              throw err;
            }
            console.log(`Updated employee's role in the database!`);
            
            // Since you're updating the database asynchronously, you should call `start()` inside the callback function
            start();
          });
          
        });
    });
  });
}

