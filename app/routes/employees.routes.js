const express = require("express");
const router = express.Router();
const employees = require("../controllers/employees.controller");
const {
  employeeValidationRules,
  validate,
} = require("../validations/EmployeeValidations");

router.get("/", employees.EmployeesList);
router.post("/", employeeValidationRules(), validate, employees.createEmployee);

module.exports = router;
