DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

\c department_db;


CREATE TABLE department (
id SERIAL PRIMARY KEY,
department_name VARCHAR(30) UNIQUE NOT NULL,
);

CREATE TABLE role (
id SERIAL PRIMARY KEY,
role_title VARCHAR(30) UNIQUE NOT NULL,
role_salary DECIMAL NOT NULL,
department_id INTEGER NOT NULL
SERIAL PRIMARY KEY (id),
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL

);

CREATE TABLE employee (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER,
SERIAL PRIMARY KEY (id),
FOREIGN KEY (role_id)
REFERENCES roles(id)
ON DELETE SET NULL
);
