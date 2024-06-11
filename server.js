const express = require("express");
const cors = require("cors");
const tutorialRoutes = require("./app/routes/tutorial.routes");
const sportsRoutes = require("./app/routes/sports.routes");
const EmployeesRoutes = require("./app/routes/employees.routes");
const TeamsRoutes = require("./app/routes/teams.routes");
const AuthRoutes = require("./app/routes/auth.routes");
const UserRoutes = require("./app/routes/user.routes");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  console.log("GET / request received");
  res.json({ message: "Welcome to my application." });
});

/** Importing route files */
app.use("/tutorials", tutorialRoutes);
app.use("/sports", sportsRoutes);
app.use("/employees", EmployeesRoutes);
app.use("/teams", TeamsRoutes);
app.use("/users", UserRoutes);
app.use("/api", AuthRoutes);

const db = require("./app/models");
// const Role = db.role;

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "moderator",
//   });

//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// }

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
