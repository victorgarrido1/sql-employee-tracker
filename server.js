const inquirer = require("inquirer");
const mysql = require("mysql2");
let stream = require("stream");

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
        console.log(answers)
        //TODO: Needs to be fixed. Does not like data to be passed
        const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(
          query,
          [
            answers.title,
            Number(answers.salary),
            answers.department,
            ],
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

//function to addEmployee()
function addEmployee() {
  //first get the list of the employees
  db.query("SELECT id FROM employee", (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    const roles = res.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
  });

  const managers = res.map(({ id, name }) => ({
    name,
    value: id,
}));

  //retrieving list of employees from the database to use for as a manager
  db.query('SELECT id FROM employee')

  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the employee's first name: ",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter the employee's last name: ",
    },
    {
      type: "input",
      name: "roleId",
      message: "Select the employees role: ",
    },
    {
      type: "list",
      name: "managerId",
      message: "Select the employee manager: ",
      choices: [
       { name: "None", value: null},
       ...managers,

      ]
    },
  ])
  .then((answers) => {
    //apply the answers into the DB

  })
}

// inquirer
// .prompt({
//   type: "input",
//   name: "name"
// })

//     switch (selectedAnswer) {
//       case "View all departments":
//         db.query("SELECT * FROM department", function (err, answers) {
//           if (err) console.error(err);
//           console.table(answers);
//         });
//         break;

//         case "View all roles":
//           db.query("SELECT * FROM role", function (err, answers) {
//             if (err) console.error(err);
//             console.table(answers);
//           });
//           break;

//           // please continue working here, to be adding department logic
//           function viewAllDepartments() => {
//             db.query("SELECT * FROM department", function (err, answers) {
//               if (err) console.error(err);
//               console.table(answers);
//             });
//             }

//             case "Add a department":
//               {
//                 return inquirer
//                 .prompt([
//                   {
//                     type: "input",
//                     message: "What is the name of the new department?",
//                     name: "name",
//                   },
//                 ])
//                 .then((data) => {
//                   db.query(
//                     `INSERT INTO department(name) VALUES (?)`,
//                     data.name,
//                     (err, results) => {
//                       console.log("\nNew department was added!");
//                       function viewAllDepartments() {
//                         db.query("SELECT * FROM department", function (err, answers) {
//                           if (err) console.error(err);
//                           console.table(answers);
//                         });
//                       }
//                     }
//                     );
//                   });
//                 }
//                 case "View all departments":
//                   db.query("SELECT * FROM department", function (err, answers) {
//                     if (err) console.error(err);
//                     console.table(answers);
//                   });
//                   break;

//                     promptUser();
//                     break;

//                   case "View all employees":
//                     db.query(
//                       `SELECT employee.id,
//                         employee.first_name,
//                         employee.last_name,
//                         role.id AS role_id,
//                         manager.id AS manager_id
//                         FROM employee
//                         JOIN role ON employee.role_id = role.id
//                         LEFT JOIN employee AS manager ON employee.manager_id = manager.id`,
//                       function (err, results) {
//                         if (err) console.error(err);
//                         console.table(results);
//                       }
//                     );
//                     break;
//                 }
//                 promptUser();
//               // Remove the unnecessary closing curly brace here
//               promptUser(); // Add a missing semicolon here
//               });
//           };

//           promptUser();
// function handleQueryResults(err, results) {
//   console.log(`\n`);
//   console.table(results);
//   promptUser();
// }

// // const addDepartment = () => {
// //   return inquirer
// //     .prompt([
// //       {
// //         type: "input",
// //         message: "What is the name of the new department?",
// //         name: "name",
// //       },
// //     ])
// //     .then((data) => {
// //       db.query(
// //         `INSERT INTO department (name) (?)`,
// //         data.name,
// //         (err, results) => {
// //           console.log("\nNew department has been added.");
// //           viewAllDepartments();
// //         }
// //       );
// //     });
// // };

// const addRole = () => {
//   let departmentArray = [];
//   db.query(`SELECT * FROM department`, function (err, results) {
//     if (err) {
//       console.error(err); // Handle error if query fails
//       return;
//     }
//     for (let i = 0; i < results.length; i++) {
//       departmentArray.push(results[i].name);
//       // Populate department names array
//     }
//     return inquirer
//       .prompt([
//         {
//           type: "input",
//           message: "What is the name of the new role?",
//           name: "title",
//         },
//         {
//           type: "input",
//           message: 'What is the salary of the new role?"',
//           name: "salary",
//         },
//         {
//           type: "list",
//           message: 'What department is the role under?"',
//           name: "department",
//           choices: departmentArray,
//         },
//       ])
//       .then((data) => {
//         // Get the department id
//         db.query(
//           `SELECT id FROM department WHERE department.name = ?`,
//           data.department,
//           (err, result) => {
//             if (err) {
//               console.error("Error getting department id:", err);
//               return;
//             }

//             if (result.length === 0) {
//               console.error("Department not found.");
//               return;
//             }
//             // Insert new role
//             db.query(
//               `INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`,
//               [data.title, data.salary, department_id],
//               (err, result) => {
//                 if (err) {
//                   console.error("Error inserting new role:", err);
//                   return;
//                 }

//                 console.log("\nNew role added.");
//                 viewAllRoles(); // Assuming viewAllRoles is a function that displays all roles
//               }
//             );
//           }
//         );
//       })
//       .catch((err) => {
//         console.error("Error:", err);
//       });

//     // Now you can proceed with further processing or return the departmentArray
//   });
// };

// promptUser();
