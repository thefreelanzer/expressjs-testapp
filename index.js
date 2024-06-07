const express = require("express");
const winston = require("winston");
const employees = require("./Employee");
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// const logger = function (req, res, next) {
//   console.log("Custom middleware is called!");
//   next();
// };

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

// winstonLogger.info("What rolls down stairs");
// winstonLogger.info("alone or in pairs,");
// winstonLogger.info("and over your neighbors dog?");
// winstonLogger.warn("Whats great for a snack,");
// winstonLogger.info("And fits on your back?");
// winstonLogger.error("Its log, log, log");

app.use(express.json());
// app.use(logger);
app.use((req, res, next) => {
  req.createdAt = new Date().toISOString();
  next();
});

const handler = (func) => (req, res) => {
  try {
    logger.info("server.handler.begun");
    func(req, res, logger);
  } catch (e) {
    logger.info("server.handler.failed");
    res.send("Oh no, something did not go well!");
  }
};
app.get(
  "/success",
  handler((req, res) => {
    res.send("Yay!");
  })
);
app.get(
  "/error",
  handler((req, res) => {
    throw new Error("Doh!");
  })
);

app.get("/employees", employees.getAllEmployees);
app.get("/employee/:id", employees.getEmployeeById);
app.post("/employees", employees.addEmployee);
app.put("/employee/:id", employees.updateEmployee);
app.delete("/employee/:id", employees.deleteEmployee);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
