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







// adds employee based on responses to inquirer promts //
function addEmployee() {
  //get managers names to feed into inquirer prompt
  db.query('SELECT CONCAT (m.first_name," ", m.last_name) AS manager FROM employee LEFT JOIN employee m ON employee.manager_id = m.id', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var managers = data;
      var managerNames = managers.filter(manager => manager.manager !== null).map(manager => manager.manager);
    }
    //get role titles to feed into inquirer prompt
    db.query('SELECT title FROM role', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var roles = data;
        var roleTitles = roles.map(role => role.title);
      }
      //questions
      inquirer.prompt([{
        type: 'input',
        message: 'Enter employee first name',
        name: 'firstName',
      },
      {
        type: 'input',
        message: 'Enter employee last name',
        name: 'lastName'
      },
      {
        type: 'list',
        message: 'Select employee role',
        name: 'role',
        choices: roleTitles,
      },
      {
        type: 'list',
        message: 'Select employee manager',
        name: 'manager',
        choices: managerNames,
      }
      ]).then((answers) => {
        //get role_id for corresponding title from answers
        db.query(`SELECT role.id FROM role WHERE role.title = ?;`, answers.role, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            var roleID = data.map(role => role.id);
            console.log(roleID);
          }
          //get employee id for corresponding manager from answers
          db.query(`SELECT employee.id FROM employee WHERE CONCAT(employee.first_name," ",employee.last_name) = ?;`, answers.manager, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              var managerID = data.map(manager => manager.id);
              console.log(managerID);
            }

            //add employee to table
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?);`, [answers.firstName, answers.lastName, roleID, managerID], (err, data) => {
              if (err) {
                console.log(err);
              } else {

                console.log('Employee Added!');
                init();
              }
            })

          })
        })
      })
    })
  })
};











//INQUIRER FUNCTIONS
function viewDepartment() {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.log(err);
      init()
    }
    console.table(results);
    init()
  });
}

function viewRole() {
  db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON department.id = role.department_id  ', (err, results) => {
    if (err) {
      console.log(err);
      init()
    }
    console.table(results);
    init()
  });
}

function viewEmployee() {
  db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT (m.first_name," ", m.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee m ON employee.manager_id = m.id ', (err, results) => {
    if (err) {
      console.log(err);
      init()
    }
    console.table(results);
    init()
  });
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
      if (answer.question === 'View All Employees') {
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

init()