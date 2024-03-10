DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

USE staff_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- // const viewAllEmployees = () => {
-- //     db.query(`
-- //     SELECT
-- //     employees_with_managers.id AS employee_id,
-- //     employees_with_managers.first_name,
-- //     employees_with_managers.last_name,
-- //     employee_info.title,
-- //     employee_info.salary,
-- //     employee_info.department_name,
-- //     employees_with_managers.manager_name
-- //     FROM employee_info
-- //     JOIN employees_with_managers on employee_info.role_id = employees_with_managers.role_id;
-- //     `, function (err, results) {
-- //         console.log(`\n`);
-- //         console.table(results);
-- //         promptUser();
-- //     })