const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

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
// GLOBAL ARRAY VARIABLES FOR PROMPT CHOICES
const managers = db.query('SELECT CONCAT (m.first_name," ", m.last_name) AS manager FROM employee LEFT JOIN employee m ON employee.manager_id = m.id');
const roles= db.query()


//INQUIRER FUNCTIONS
function viewDepartment(){
db.query('SELECT * FROM department', (err, results) => {
  if (err) {
    console.log(err);
    init()
  }
  console.table(results);
  init()
});
}

function viewRole(){
db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON department.id = role.department_id  ', (err, results) => {
  if (err) {
    console.log(err);
    init()
  }
  console.table(results);
  init()
});
}

function viewEmployee(){
db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT (m.first_name," ", m.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee m ON employee.manager_id = m.id ', (err, results) => {
  if (err) {
    console.log(err);
    init()
  }
  console.table(results);
    init()
});
}

function addEmployee(){
  inquirer.prompt([{
    type: 'input',
    message: 'Enter employee first name',
    name: 'firstName',
  },
  {
    type: 'input',
    message: 'Enter employee first name',
    name: 'firstName',
  },
  {
    type: 'list',
    message: 'Enter employee role',
    name: 'role',
    choices: roles,
  },
  {
    type: 'list',
    message: 'Enter employee manager',
    name: 'manager',
    choices: managers,
  }




]

}





function init() {
  inquirer.prompt([{
    type: 'list',
    message: 'What do you want to do?',
    name: 'question',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'quit']
  }]
  )
    .then((answer) => {
      if (answer.question === 'View All Employees'){
        viewEmployee();
      }
      else if (answer.question === 'Add Employee') {
        addEmployee();
      }
      else if (answer.question === 'Update Employee Role') {
        updateEmployee();
      }
      else if (answer.question === 'View All Roles') {
        viewRole();
      }
      else if (answer.question === 'Add Role') {
        addRole();
      }
      else if (answer.question === 'View All Departments') {
        viewDepartment();
      }
      else if (answer.question === 'Add Department') {
        addDepartment();
      }
      else {
        console.log("Bye!");
      }
    });
}
console.log(managers);
console.log(roles);
init()