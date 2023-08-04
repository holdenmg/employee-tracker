-- View Departments --
SELECT * FROM department
-- View Roles --
SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON department.id = role.department_id  
-- View employees (Show role as title, department as name, salary, and manager as name) --
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id
-- Add department (Name) --

-- Add role (Name, salary, department) --

-- Add employee (employee’s first name, last name, role, and manager) --

-- Update employee (select an employee to update and their new role)


