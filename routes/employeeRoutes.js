const express = require("express");
const router = express.Router();
const employees = require("../Employee");
// const { handler } = require("../handler");

router.get("/", employees.getAllEmployees);
router.get("/employee/:id", employees.getEmployeeById);
router.post("/", employees.addEmployee);
router.put("/employee/:id", employees.updateEmployee);
router.delete("/employee/:id", employees.deleteEmployee);

// using logger as a seperate  file
// router.get("/", handler(employees.getAllEmployees));
// router.get("/employee/:id", handler(employees.getEmployeeById));
// router.post("/", handler(employees.addEmployee));
// router.put("/employee/:id", handler(employees.updateEmployee));
// router.delete("/employee/:id", handler(employees.deleteEmployee));

module.exports = router;
