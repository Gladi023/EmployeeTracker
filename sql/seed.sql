INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
  ("Health", 20000, 1), 
  ("Sales", 3000, 1), 
  ("Paralegal", 150000, 2), 
  ("Software", 120000, 2), 
  ("Accountant", 2000, 3), 
  ("Team", 30000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
  ("Glar", "V", 1), 
  ("Isa", "O", 2), 
  ("jOE", "M", 3),
  ("Kyl", "h", 4), 
  ("Love", "S", 5), 
  ("Dita", "T", 6);
