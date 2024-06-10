module.exports = (sequelize, Sequelize) => {
  const EmployeeTeams = sequelize.define(
    "employee_teams",
    {
      emp_id: {
        type: Sequelize.INTEGER,
      },
      team_id: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return EmployeeTeams;
};
