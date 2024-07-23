const {prompt} = require('inquirer');
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

function init(){
    mainChoices();
}

function mainChoices() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices:[
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
        }else if (choice === 'ADD_DEPARTMENT') {
            prompt([{
                type: 'input',
                name: 'name'
            }]).then((answers) => {
                // sql statement to add department

                const sql =`INSERT INTO department (department_name)
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
                name: 'name'
            }]).then((answers) => {
                // sql statement to add department

                const sql =`INSERT INTO role (role_title)
                VALUES ($1)`;
                const params = [answers.name];
            
                pool.query(sql, params, (err, result) => {
                    console.log('\n');
                    console.table('role added');
                    console.log('\n');
                    mainChoices();
                })
            })
        } else if (choice === 'ADD_EMPLOYEE') {
            prompt([{
                type: 'input',
                name: 'name'
            }]).then((answers) => {
                // sql statement to add department

                const sql =`INSERT INTO employee (first_name, last_name)
                VALUES ($1)`;
                const params = [answers.name];
            
                pool.query(sql, params, (err, result) => {
                    console.log('\n');
                    console.table('department added');
                    console.log('\n');
                    mainChoices();
                })
            })
        }

    })
}

function viewEmployees() {
    const sql =`SELECT * FROM employee`;
    const params = [];

    pool.query(sql, params, (err, result) => {
        console.log('\n');
        console.table(result);
        console.log('\n');
        mainChoices();
    })
}

function viewRoles() {
    db.findAllRoles()
    .then(({roles}) => {
        let role = roles;
        console.log('\n');
        console.table(role);
    })
    .then(() => mainChoices())
}