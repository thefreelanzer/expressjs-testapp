const db = require("../models");
const Employees = db.employees;
const EmployeeSettings = db.employee_settings;
const EmployeeTeams = db.employee_teams;
const Teams = db.teams;
const Op = db.Sequelize.Op;

const List = async (req, res) => {
  const { page, perPage } = req.query;
  const limit = perPage ? parseInt(perPage) : 10;
  const offset = page ? (parseInt(page) - 1) * limit : 0;

  try {
    const data = await Teams.findAndCountAll({
      include: [
        {
          model: EmployeeTeams,
          include: [
            {
              model: Employees,
              attributes: ["name", "email", "position"],
            },
          ],
          as: "employeeTeams",
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

module.exports = {
  List,
};
