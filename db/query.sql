-- View Departments --
SELECT * FROM department
-- View Roles --
SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON department.id = role.department_id  
-- View employees (Show role as title, department as name, salary, and manager as name) --
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id
-- Add department (Name) --
IINSERT INTO department (name)
VALUES(?)
-- Add role (Name, salary, department) --
INSERT INTO role (title, salary, department_id)
VALUES(?)
-- Add employee (employee’s first name, last name, role, and manager) --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES(?)
-- Update employee role (select an employee to update and their new role)
UPDATE employee SET role_id = ? WHERE id = ?

