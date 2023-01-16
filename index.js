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
  
//view all employees
async function viewAllEmployees() {
    try {
        const query = 
        `SELECT 
            employee.id, 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            department.name AS department, 
            role.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role
            ON employee.role_id = role.id
        LEFT JOIN department
            ON department.id = role.department_id
        LEFT JOIN employee manager
            ON manager.id = employee.manager_id`

        const result = await connection.query(query);
        console.table(result);
    } catch (err) {
        throw err;
    }
    firstPrompt();
}

//VIEW EMPLOYEES BY DEPARTMENT
   async function viewEmployeesByDepartment(){
    try{ 
    const query =
    `SELECT 
        department.id, 
        department.name, 
        role.salary
    FROM employee
    LEFT JOIN role 
        ON employee.role_id = role.id
    LEFT JOIN department
        ON department.id = role.department_id
    GROUP BY department.id, department.name, role.salary`;
  
    const result = await connection.query(query);
    console.table(result);
} catch (err) {
    throw err;
}
firstPrompt();
}

// GET DEPARTMENT
const getDept = async (deptChoices) => {
    const { department } = await inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: 'Departments: ',
        choices: deptChoices
      }
    ]);
    try {
        const query = `SELECT 
                            employee.id, 
                            employee.first_name, 
                            employee.last_name, 
                            role.title, 
                            department.name
                        FROM employee
                        JOIN role
                            ON employee.role_id = role.id
                        JOIN department
                            ON department.id = role.department_id
                        WHERE department.id = ?`;
        const results = await connection.query(query, department);
        console.table(results);
        firstPrompt();
    } catch (err) {
        console.log(err);
        throw err;
    }
};

//create employee

async function createEmployee() {
    try {
      const roles = await connection.query(`SELECT id, title, salary FROM role`);
      const roleChoices = roles.map(({ id, title, salary }) => ({ value: id, title: `${title} (${salary})` }));
      const { firstName, lastName, roleId } = await inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "Employee First Name: "
        },
        {
          type: "input",
          name: "lastName",
          message: "Employee Last Name: "
        },
        {
          type: "list",
          name: "roleId",
          message: "Employee Role: ",
          choices: roleChoices
        }
      ]);
      await connection.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`, [firstName, lastName, roleId]);
console.log("Employee added successfully.");
firstPrompt();
} catch (err) {
    throw err;
  }
};
  
// REMOVE EMPL
async function removeEmployee() {
    try {
      const employees = await connection.query(`SELECT id, first_name, last_name FROM employee`);
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({ value: id, name: `${first_name} ${last_name}` }));
      const { employee } = await inquirer.prompt([
        {
          type: "list",
          name: "employee",
          message: "Employee To Be Deleted: ",
          choices: employeeChoices
        }
      ]);
      await connection.query(`DELETE FROM employee WHERE id = ?`, [employee]);
      console.log("Employee removed successfully.");
      firstPrompt();
    } catch (err) {
      throw err;
    }
  }
  //UPDATE EMPLOYEE ROLE

  async function updateEmployeeRole() {
    try {
      const employees = await connection.query(`SELECT id, first_name, last_name FROM employee`);
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({ value: id, name: `${first_name} ${last_name}` }));
      const roles = await connection.query(`SELECT id, title, salary FROM role`);
      const roleChoices = roles.map(({ id, title, salary }) => ({ value: id, title: `${title} (${salary})` }));
      const { employeeId, roleId } = await inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select an employee: ",
          choices: employeeChoices
        },
        {
          type: "list",
          name: "roleId",
          message: "Select a new role for the employee: ",
          choices: roleChoices
        }
      ]);
      await connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId]);
      console.log("Employee role updated successfully.");
      firstPrompt();
    } catch (err) {
      console.error(err);
    }
  }
  //ADD ROLE
  async function addToRole(department) {
    try {
      const { title, salary, department } = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Role title: "
        },
        {
          type: "input",
          name: "salary",
          message: "Role Salary: "
        },
        {
          type: "list",
          name: "department",
          message: "Department: ",
          choices: department
        },
      ]);
      await connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [title, salary, department]
      );
      console.log("Role added successfully.");
      firstPrompt();
    } catch (err) {
      throw err;
    }
  }
  