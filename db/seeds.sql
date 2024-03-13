
CREATE DATABASE IF NOT EXISTS staff_db;
-- Insert department seeds

INSERT INTO department (id, name) VALUES
(1, 'Engineering'),
(2, 'Finance'),
(3, 'Marketing'),
(4, 'Sales');

-- Create Role table
CREATE TABLE IF NOT EXISTS role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    salary DECIMAL(10, 2),
    department_id INT
);


-- Insert role seeds
INSERT INTO role (id, title, salary, department_id) VALUES
(1, "Engineering Lead", 12000, 1),
(2, "Software Developer", 10000, 1),
(3, "Data Analyst", 9000, 2),
(4, "Product Manager", 11000, 3),
(5, "QA Engineer", 9500, 1),
(6, "Marketing Specialist", 8500, 4),
(7, "Financial Analyst", 9500, 2),
(8, "HR Manager", 10500, 3);

-- Create Employee table
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Insert employee seeds
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Mario', 'Lopez', 1, NULL),
(2, 'Zach', 'Scott', 2, 1),
(3, 'Justin', 'Thomas', 3, 1),
(4, 'Mary', 'Poppins', 4, 1),
(5, 'Willy', 'Jones', 5, 2),
(6, 'Ramon', 'Jr', 6, 3),
(7, 'Eddie', 'Brock', 7, 3),
(8, 'Wade', 'Wilson', 8, 4),
(9, 'Christopher', 'Nolan', 1, 2);



