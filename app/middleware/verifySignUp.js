const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  const userByUsername = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (userByUsername) {
    res.status(400).send({
      message: "Failed! Username is already in use!",
    });
    return;
  }

  // Email
  const userByEmail = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (userByEmail) {
    res.status(400).send({
      message: "Failed! Email is already in use!",
    });
    return;
  }
  next();
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
