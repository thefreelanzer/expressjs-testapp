const express = require("express");
const router = express.Router();
const employees = require("../controllers/employees.controller");

router.get("/", employees.EmployeesList);
router.post("/", employees.createEmployee);

module.exports = router;
