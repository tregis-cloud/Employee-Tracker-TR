DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL (10,4) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id),
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NULL,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Add employee
INSERT INTO employee (first_name, last_name, role_id, manager_id);
--  VALUE("Jeff", "Fuller", 15, Null),
-- Value("Scott", "Rogers", 5, 1)
-- ("Domanic", "Studdard", 7, 1)
-- ("Jeff","Staples", 10,1)
-- ("Kristina", "Agelera", 11, 1)
-- ("Valrie", "Gerald",14, 1)
-- Value("Dennis", "Cosby", 2, 2 ),
-- ("Devin", "Diamond",4, 2),
-- ("Debbie", "Cameron", 9, 4 ),
-- ("Natalia", "Rojas",6, 3),
-- ("Natasha","Pips", 11,5),
-- ("Burnie", "MacDonald", 13,6)
;




--Add Department
INSERT INTO department (name)
VALUE
("Engineering"),
("Finance"),
("Human Resources"),
("Product"),
("Sales")
("Business")
;

--Add Role
INSERT INTO role (title, salary, department_id)
VALUE("Engineer", 98000.00, 1 ),
("Enginnering Manager", 140000.00, 1),
("Quality Assurance", 90000.00,1),
("Quality Manager", 130000.00, 1),
("Financial Analyst", 75000.00, 2),
("VP Finance", 250000.00, 2),
("Recruiter", 80000.00,3),
("HR Manager", 100000.00,3),
("Product Manager", 120000.00, 4),
("VP Product Management", 150000.00,4),
("Account Executive", 90000.00, 5),
("VP Sales", 180000.00, 5),
("CEO", 500000.00, 6),
("VP HR",200000.00, 3)
("VP Engineering",250000.00, 1),
;

UPDATE employee 
SET role_id = 13, 
WHERE id = 2;

-- View Employees
SELECT * FROM employee;


--View Department
SELECT * FROM departments;

-- View Role
SELECT * FROM roles;

-- Update Employee Role
UPDATE employee
SET role_id = 2
WHERE id = 1;

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;




 