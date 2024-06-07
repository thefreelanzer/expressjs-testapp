const express = require("express");
const router = express.Router();
const tutorials = require("../controllers/tutorial.controller");

router.get("/", tutorials.findAll);
router.post("/", tutorials.create);
router.get("/tutorial/:id", tutorials.findOne);
router.put("/tutorial/:id", tutorials.update);
router.delete("/tutorial/:id", tutorials.delete);
router.delete("/", tutorials.deleteAll);

module.exports = router;
