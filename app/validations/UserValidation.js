const { body, validationResult } = require("express-validator");

const UserValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Userame is required!"),
    body("email").isEmail().withMessage("Email must be a valid email address!"),
    body("password").notEmpty().withMessage("Password id required!"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { UserValidationRules, validate };
