const db = require("../models");
const Sports = db.sports;
const Op = db.Sequelize.Op;

const getAllSports = (req, res) => {
  const { name, category, page, perPage } = req.query;
  let condition = {};

  if (name) {
    condition.name = { [Op.like]: `%${name}%` };
  }

  if (category) {
    condition.category = { [Op.like]: `%${category}%` };
  }

  const limit = perPage ? parseInt(perPage) : 10;
  const offset = page ? (parseInt(page) - 1) * limit : 0;

  Sports.findAndCountAll({
    where: condition,
    limit: limit,
    offset: offset,
  })
    .then((data) => {
      const { count, rows } = data;

      const totalPages = Math.ceil(count / limit);

      res.status(200).send({
        data: rows,
        totalCount: count,
        totalPages: totalPages,
        currentPage: page ? parseInt(page) : 1,
        perPage: limit,
        message: "Sports listed successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

const getSportById = async (req, res) => {
  try {
    const data = await Sports.findByPk(req.params.id);
    if (data) {
      res
        .status(200)
        .send({ data: data, message: "Sport retrieved successfully" });
    } else {
      res.status(404).send({
        message: `Cannot find Sport with id=${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving Sport with id=${req.params.id}.`,
    });
  }
};

const addSport = async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    const tutorial = {
      name: req.body.name,
      description: req.body.description,
    };

    const data = await Sports.create(tutorial);
    res
      .status(201)
      .send({ data: data, message: "A new Sport created successfully" });
  } catch (error) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Sport.",
    });
  }
};

const updateSport = (req, res) => {
  const id = req.params.id;

  Sports.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Sport was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Sport with id=${id}. Maybe Sport was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Sport with id=" + id,
      });
    });
};

const deleteSport = (req, res) => {
  const id = req.params.id;

  Sports.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Sports was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Sports with id=${id}. Maybe Sports was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Sports with id=" + id,
      });
    });
};

module.exports = {
  getAllSports,
  getSportById,
  addSport,
  updateSport,
  deleteSport,
};
