let employeeData = [
  { id: 1, firstName: "Davaraj", lastName: "PD", age: "18" },
  { id: 2, firstName: "Shivaraj", lastName: "T", age: "17" },
];

// List of all employees
const getAllEmployees = (req, res) => {
  try {
    res.status(200).json({
      data: employeeData,
      message: "Employees retrieved successfully",
      request_created_at: req.createdAt,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving employees", error: error.message });
  }
};

// Fetch Employee by ID
const getEmployeeById = (req, res) => {
  try {
    const employee = employeeData.find(
      (emp) => emp.id === parseInt(req.params.id)
    );
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res
      .status(200)
      .json({ data: employee, message: "Employee retrieved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving employee", error: error.message });
  }
};

// Add new employee
const addEmployee = (req, res) => {
  try {
    const newEmployee = {
      id: employeeData.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
    };
    employeeData.push(newEmployee);
    res
      .status(201)
      .json({ data: newEmployee, message: "Employee added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while adding employee", error: error.message });
  }
};

// Update an employee
const updateEmployee = (req, res) => {
  try {
    const employee = employeeData.find(
      (emp) => emp.id === parseInt(req.params.id)
    );
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.age = req.body.age;
    res
      .status(200)
      .json({ data: employee, message: "Employee Updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating employee", error: error.message });
  }
};

//Delete employee
const deleteEmployee = (req, res) => {
  try {
    const employeeIndex = employeeData.findIndex(
      (emp) => emp.id === parseInt(req.params.id)
    );
    if (employeeIndex === -1) return res.status(404).send("Employee not found");

    const deletedEmployee = employeeData.splice(employeeIndex, 1);
    res.status(200).json({
      data: deletedEmployee,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting employee", error: error.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
