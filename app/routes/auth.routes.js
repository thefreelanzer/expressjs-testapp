const express = require("express");
const router = express.Router();
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const {
  UserValidationRules,
  validate,
} = require("../validations/UserValidation");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/auth/signup",
  [
    UserValidationRules(),
    validate,
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  controller.signup
);

router.post("/auth/signin", controller.signin);

module.exports = router;
