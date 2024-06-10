const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Employees = require("./employees.model.js")(sequelize, Sequelize);
const EmployeeSettings = require("./employee_settings.model.js")(
  sequelize,
  Sequelize
);
const EmployeeTeams = require("./employee_teams.model.js")(
  sequelize,
  Sequelize
);
const Teams = require("./teams.model.js")(sequelize, Sequelize);

/** Employee Relations */
Employees.hasOne(EmployeeSettings, {
  foreignKey: "emp_id",
  as: "settings",
});
Employees.hasMany(EmployeeTeams, {
  foreignKey: "emp_id",
  as: "teams",
});

/** Employee Settings */
EmployeeSettings.belongsTo(Employees, {
  as: "employee",
});

/** Employee Teams */
EmployeeTeams.belongsTo(Teams, {
  foreignKey: "team_id",
  as: "team",
});
EmployeeTeams.belongsTo(Employees, { foreignKey: "emp_id" });

Teams.hasMany(EmployeeTeams, {
  foreignKey: "team_id",
  as: "employeeTeams",
});

/** Employee & Teams many-to-many relation */
Employees.belongsToMany(Teams, {
  through: EmployeeTeams,
  as: "teamlist",
  foreignKey: "emp_id",
});
Teams.belongsToMany(Employees, {
  through: EmployeeTeams,
  as: "members",
  foreignKey: "team_id",
});

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.sports = require("./sports.model.js")(sequelize, Sequelize);
db.teams = Teams;
db.employee_teams = EmployeeTeams;
db.employees = Employees;
db.employee_settings = EmployeeSettings;

module.exports = db;
