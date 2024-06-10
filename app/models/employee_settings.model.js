module.exports = (sequelize, Sequelize) => {
  const EmployeeSettings = sequelize.define(
    "employee_settings",
    {
      emp_id: {
        type: Sequelize.INTEGER,
      },
      theme: {
        type: Sequelize.STRING,
      },
      auto_login: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return EmployeeSettings;
};
