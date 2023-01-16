const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('employeesDataBase', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Department = sequelize.define('department', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  }
});

const Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING
  },
  salary: {
    type: Sequelize.DECIMAL(10, 3)
  },
  department_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Department,
      key: 'id'
    }
  }
});

const Employee = sequelize.define('employee', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  role_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  },
  manager_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Employee,
      key: 'id'
    }
  }
});
