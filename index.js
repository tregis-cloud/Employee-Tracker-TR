const inquirer = require("inquirer");
const mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "Add Employee",
          "Add Department",
          "Add Role",
          "View Employees",
          "View Department",
          "View Role",
          "Update Employee Role",
        ],
      },
    ])
    .then(function (answer) {
      if (answer.options === "Add Employee") {
        addEmployee();
      }
      if (answer.options === "Add Department") {
        addDepartment();
      }
      if (answer.options === "Add Role") {
        addRole();
      }
      if (answer.options === "View Employees") {
        viewEmployees();
      }
    });
}

function addEmployee() {
  connection.query("SELECT title, id FROM role", function (err, results) {
    if (err) throw err;

    // console.log("A", results);

    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What's the employee's first name? ",
        },
        {
          type: "input",
          name: "lastName",
          message: "What's the employee's last name?",
        },
        {
          type: "rawlist",
          name: "role",
          choices: function () {
            const rolesArray = [];
            for (let i = 0; i < results.length; i++) {
              const roleID = {
                name: results[i].title,
                value: results[i].id,
              };
              rolesArray.push(roleID);
            }
            console.log("B", rolesArray);
            return rolesArray;
          },
          message: "Please select the employee's role.",
        },
      ])
      .then(function (answer) {
        console.log("C", answer);
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role,
          },
          function (err) {
            if (err) throw err;
            console.log("C", "Employee was successfully created!");
            start();
          }
        );
      });
  });
}

function addDepartment() {
  // console.log("You've reached Department");
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department would you like to add? ",
      },
    ])
    .then(function (answer) {
      console.log("C", answer.department);
      connection.query(
        "INSERT INTO department SET ?",
        { name: answer.department },
        function (err) {
          if (err) throw err;
          console.log("C", "Department was successfully created!");
          start();
        }
      );
    });
}

function addRole() {
  console.log("1", "You've reached Role");
  connection.query("SELECT id, name FROM department", function (err, results) {
    if (err) throw err;

    console.log("2", results);

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What role would you like to add? ",
        },
        {
          type: "input",
          name: "salary",
          message: "What's the salary for this role ",
        },
        {
          type: "rawlist",
          name: "deptID",
          choices: function () {
            const deptIDArray = [];
            for (let i = 0; i < results.length; i++) {
              const deptID = {
                name: result[i].name,
                value: result[i].id,
              };
              deptIDArray.push(deptID);
            }
            console.log("3", deptIDArray);
            return deptIDArray;
          },
          message: "Please select the employee's department.",
        },
      ])
      .then(function (answer) {
        console.log("4", answer);
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.deptID,
          },
          function (err) {
            if (err) throw err;
            console.log("C", "Employee role was successfully created!");
            start();
          }
        );
      });
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
  });
}
