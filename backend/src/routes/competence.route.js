const express = require("express");
const {
  createCompetence,
  getCompetences,
} = require("../controllers/competence.controller");

const router = express.Router();

// create competence
router.post("/", createCompetence);

// get competences
router.get("/:id", getCompetences);

module.exports = router;
