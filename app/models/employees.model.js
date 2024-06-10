const EmployeeSettings = require("./employee_settings.model");

module.exports = (sequelize, Sequelize) => {
  const Employees = sequelize.define("employees", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING,
    },
  });

  return Employees;
};
