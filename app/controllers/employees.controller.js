const db = require("../models");
const Employees = db.employees;
const EmployeeSettings = db.employee_settings;
const EmployeeTeams = db.employee_teams;
const Teams = db.teams;
const Op = db.Sequelize.Op;

const EmployeesList = async (req, res) => {
  const { page, perPage } = req.query;
  const limit = perPage ? parseInt(perPage) : 10;
  const offset = page ? (parseInt(page) - 1) * limit : 0;

  try {
    const data = await Employees.findAndCountAll({
      include: [
        {
          model: EmployeeSettings,
          attributes: ["theme", "auto_login"],
          as: "settings",
        },
        {
          model: EmployeeTeams,
          as: "teams",
          include: [
            {
              model: Teams,
              attributes: ["name", "description"],
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      limit: limit,
      offset: offset,
    });

    const { count, rows } = data;

    const totalPages = Math.ceil(count / limit);

    res.status(200).send({
      data: rows,
      totalCount: count,
      totalPages: totalPages,
      currentPage: page ? parseInt(page) : 1,
      perPage: limit,
      message: "Employees listed successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Employees.",
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const attributes = req.body;

    const employee = {
      name: attributes.name,
      email: attributes.email,
      position: attributes.position,
    };

    const newEmployee = await Employees.create(employee);

    if (newEmployee) {
      const settings = {
        emp_id: newEmployee.id,
        auto_login: attributes.settings.auto_login,
        theme: attributes.settings.theme,
      };
      await EmployeeSettings.create(settings);

      const userTeams = attributes.teams;
      for (const element of userTeams) {
        const team = {
          emp_id: newEmployee.id,
          team_id: element,
        };
        await EmployeeTeams.create(team);
      }
    }
    res.status(201).send({
      data: newEmployee,
      message: "A new Employee created successfully",
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Employee.",
    });
  }
};

module.exports = {
  EmployeesList,
  createEmployee,
};
