INSERT INTO department (department_name)
VALUES('Maintenance'),
      ('Nursing'),
      ('HR'),
      ('Administration');


INSERT INTO role (role_title, role_salary, department_id)
VALUES('Director of nursing', 200000, 2),
      ('Maintenance supervisor', 999999, 1),
      ('Nursing coordinator', 300000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Chadwick', 'Boseman', 1, null),
      ('Elizabeth', 'Oleson', 2, 1),
      ('chris', 'Pratt', 3, 1),
      ('Robert', 'Downey', 1, 1),
      ('Chris', 'Evans', 1, 1),
      ('Mark', 'Ruffalo', 1, 1),
      ('Jeremy', 'Renner', 1, 1);