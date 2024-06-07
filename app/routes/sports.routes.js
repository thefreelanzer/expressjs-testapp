const express = require("express");
const router = express.Router();
const sports = require("../controllers/sports.controller");

router.get("/", sports.getAllSports);
router.post("/", sports.addSport);
router.get("/sport/:id", sports.getSportById);
router.put("/sport/:id", sports.updateSport);
router.delete("/sport/:id", sports.deleteSport);
// router.delete("/", sports.deleteAll);

module.exports = router;
