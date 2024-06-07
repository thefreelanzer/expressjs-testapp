const express = require("express");
const employeesRoutes = require("./routes/employeeRoutes");
const winston = require("winston");

const app = express();
const port = 3000;

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

app.use(express.json());
app.use((req, res, next) => {
  req.createdAt = new Date().toISOString();
  next();
});
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, { timestamp: req.createdAt });
  next();
});

// app.get(
//   "/success",
//   handler((req, res) => {
//     res.send("Yay!");
//   })
// );
// app.get(
//   "/error",
//   handler((req, res) => {
//     throw new Error("Doh!");
//   })
// );

// app.get("/employees", employees.getAllEmployees);
// app.get("/employee/:id", employees.getEmployeeById);
// app.post("/employees", employees.addEmployee);
// app.put("/employee/:id", employees.updateEmployee);
// app.delete("/employee/:id", employees.deleteEmployee);

app.use("/employees", employeesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
