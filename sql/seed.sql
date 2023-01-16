const { Department, Role, Employee } = require('../models');

const departmentData = [
    { name: "Sales" },
    { name: "Engineering" },
    { name: "Health" },
    { name: "Legal" }
];

const roleData = [
    { title: "Ultrasound", salary: 20000, department_id: 1 },
    { title: "Rad", salary: 30, department_id: 1 },
    { title: "Engineer", salary: 3000, department_id: 2 },
    { title: "Software", salary: 400000, department_id: 2 },
    { title: "lAW", salary: 20000, department_id: 3 },
    { title: "pARALEGAL", salary: 20000, department_id: 4 },
    { title: "Lawyer", salary: 50000, department_id: 4 }
];

const employeeData = [
    { first_name: "Gladi", last_name: "Vill", role_id: 1 },
    { first_name: "Cam", last_name: "Kop", role_id: 2 },
    { first_name: "Kasper", last_name: "C", role_id: 3 },
    { first_name: "Isa", last_name: "O", role_id: 4 },
    { first_name: "Lorem", last_name: "Ipsum", role_id: 5 },
    { first_name: "Cait", last_name: "Snow", role_id: 6 },
    { first_name: "Val", last_name: "Vale", role_id: 7}
