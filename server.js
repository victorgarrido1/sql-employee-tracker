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
  console.log("Connnected to the database");
  start();
})

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
        // Add logic for viewing all roles
        break;
      case "View all employees":
        // Add logic for viewing all employees
        break;
      case "Add a department":
        // Add logic for adding a department
        break;
      case "Add a role":
        // Add logic for adding a role
        break;
      case "Add an employee":
        // Add logic for adding an employee
        break;
      case "Update an employee role":
        // Add logic for updating an employee role
        break;
    }
  });
}
//this is where we viewAllDepartments
function viewAllDepartments() {
  const query = 'SELECT * FROM department';
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    //app restart
    start();
  })
}


  
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
