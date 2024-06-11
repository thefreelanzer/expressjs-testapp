const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (user) {
      if (req.body.roles) {
        const roles = await Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        });

        if (roles) {
          await user.setRoles(roles);
        }
      } else {
        await user.setRoles([1]);
      }
    }
    res.status(200).send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: config.algorithm,
      allowInsecureKeySizes: config.allowInsecureKeySizes,
      expiresIn: config.expiresIn,
    });

    var authorities = [];

    const roles = await user.getRoles();
    if (roles) {
      roles.forEach((role) => {
        authorities.push("ROLE_" + role.name.toUpperCase());
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  signup,
  signin,
};
