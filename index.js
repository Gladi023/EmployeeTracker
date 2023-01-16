//require in your dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// CREATING Connection TO MYSQL
const connection = mysql.createConnection({ 
    host: "localhost",
    port: "3306",
    user: "root",
    password: "ROOTROOT",
    database: "employeesDataBase"
})
//CONNECT TO MYSQL
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  firstPrompt();
});

const choices = [
    'View All Employees',
    'View Employees By Department',
    'Add Employee',
    'Remove Employee',
    'Update Employee Role',
    'Add Role',
    'Add Department',
    'Exit'
  ];
  
  function firstPrompt() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'userChoice',
          message: 'What would you like to do?',
          choices: choices,
        },
      ])
      .then((res) => {
        switch (res.userChoice) {
          case 'View All Employees':
            viewAllEmployees();
            break;
          case 'View Employees By Department':
            viewEmployeesByDepartment();
            break;
          case 'Add Employee':
            addEmployee();
            break;
          case 'Remove Employee':
            removeEmployee();
            break;
          case 'Update Employee Role':
            updateEmployeeRole();
            break;
          case 'Add Role':
            addRole();
            break;
          case 'Add Department':
            addDepartment();
            break;
          case 'Exit':
            connection.end();
            break;
          default:
            console.log('Invalid selection');
            firstPrompt();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
