const express = require("express");
const employees = require("./Employee");
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use(express.json());

app.get("/employees", employees.getAllEmployees);
app.get("/employee/:id", employees.getEmployeeById);
app.post("/employees", employees.addEmployee);
app.put("/employee/:id", employees.updateEmployee);
app.delete("/employee/:id", employees.deleteEmployee);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
