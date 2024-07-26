const { prompt } = require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');
const { Pool } = require('pg');

const pool = new Pool(
    {
        // TODO: Enter PostgreSQL username
        user: 'postgres',
        // TODO: Enter PostgreSQL password
        password: 'rootroot',
        host: 'localhost',
        database: 'department_db'
    },
    console.log(`Connected to the department_db database.`)
)

pool.connect();

init();

function init() {
    mainChoices();
}

function mainChoices() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'view all employees',
                    value: 'VIEW_EMPLOYEES',
                },
                {
                    name: ' view all roles',
                    value: 'VIEW_ROLES',
                },
                {
                    name: 'view all departments',
                    value: 'VIEW_DEPARTMENTS',
                },
                {
                    name: ' add a department',
                    value: 'ADD_DEPARTMENT',
                },
                {
                    name: 'add a role',
                    value: 'ADD_ROLE',
                },
                {
                    name: 'add an employee',
                    value: 'ADD_EMPLOYEE',
                },
                {
                    name: 'update an employee role',
                    value: 'UPDATE_EMPLOYEE_ROLE',
                }
            ]
        }
    ]).then(({ choice }) => {

        console.log(choice);

        if (choice === 'VIEW_EMPLOYEES') {
            viewEmployees();
        } else if (choice === 'VIEW_ROLES') {
            viewRoles();
        } else if (choice === 'VIEW_DEPARTMENTS') {
            viewDepartments();
        } else if (choice === 'ADD_DEPARTMENT') {
            prompt([{
                type: 'input',
                name: 'name'
            }]).then((answers) => {
                // sql statement to add department

                const sql = `INSERT INTO department (department_name)
                VALUES ($1)`;
                const params = [answers.name];

                pool.query(sql, params, (err, result) => {
                    console.log('\n');
                    console.table('department added');
                    console.log('\n');
                    mainChoices();
                })
            })
        } else if (choice === 'ADD_ROLE') {
            prompt([{
                type: 'input',
                name: 'title',
                message: 'title'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'salary'
            },
            {
                type: 'input',
                name: 'department',
                message: 'department'
            }]).then((answers) => {
                // sql statement to add department

                const sql = `INSERT INTO role (role_title, role_salary, department_id)
                VALUES ($1, $2, $3)`;
                const params = [answers.title, answers.salary, answers.department];

                pool.query(sql, params, (err, result) => {
                    console.log(err)
                    console.log('\n');
                    console.table('role added');
                    console.log('\n');
                    mainChoices();
                })
            })
        } else if (choice === 'ADD_EMPLOYEE') {
            prompt([{
                type: 'input',
                name: 'first',
                message: 'First name'
                },
                {
                type: 'input',
                name: 'last',
                message: 'Last name'
                },
                {
                    type: 'input',
                    name: 'role',
                    message: 'role id'
                },
                {
                    type: 'input',
                    name: 'manager',
                    message: 'manager id'
                }]).then((answers) => {
                // sql statement to add department

                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ($1, $2, $3, $4)`;
                const params = [answers.first, answers.last, answers.role, answers.manager];

                pool.query(sql, params, (err, result) => {
                    console.log('\n');
                    console.table('employee added');
                    console.log('\n');
                    mainChoices();
                })
            })
        }
        else if (choice === 'UPDATE_EMPLOYEE_ROLE') {
            updateEmployee()
        }
    })
}

function viewEmployees() {
    const sql = `SELECT * FROM employee`;
    const params = [];

    pool.query(sql, params, (err, result) => {
        console.log('\n');
        console.table(result.rows);
        console.log('\n');
        mainChoices();
    })
}

function viewRoles() {
    const sql = `SELECT * FROM role`;
    const params = [];

    pool.query(sql, params, (err, result) => {
        console.log('\n');
        console.table(result.rows);
        console.log('\n');
        mainChoices();
    })

}


function viewDepartments() {
    const sql = `SELECT * FROM department`;
    const params = [];

    pool.query(sql, params, (err, result) => {
        console.log('\n');
        console.table(result.rows);
        console.log('\n');
        mainChoices();
    })
}



const updateEmployee = () => {
    const sql = 'SELECT * FROM employee';

    pool.query(sql, (err, {rows}) => {
        if (err) {
            console.log(err);
        }
        const employees = rows.map((person) => {
            return {
                value: person.id,
                name: `${person.first_name} ${person.last_name}`
            }
        });
        console.log(employees);

        prompt([
            {
                type: 'list',
                name: 'employee',
                choices: employees
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'Enter the new role id'
            }
        ]).then((val) => {
            const employeeID = val.employee

            const sql = 'UPDATE employee SET role_id = $1 WHERE id = $2';
            const params = [val.roleId, val.employee];
            pool.query(sql, params, (err, result) => {
                console.log(err)
                console.log('\n');
                console.table('role updated');
                console.log('\n');
                mainChoices();
            })
        })
    })
}