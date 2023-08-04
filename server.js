const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'rootroot',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);

//db.query('SHOW TABLE department')
db.query('SELECT * FROM department', (err, results) => {
  if (err) {
    console.log(err);
  }
  console.table(results);
});


db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON department.id = role.department_id  ', (err, results) => {
  if (err) {
    console.log(err);
  }
  console.table(results);
});


db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT (m.first_name," ", m.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee m ON employee.manager_id = m.id ', (err, results) => {
  if (err) {
    console.log(err);
  }
  console.table(results);
});