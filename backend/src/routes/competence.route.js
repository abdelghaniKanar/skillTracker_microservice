const express = require("express");
const {
  createCompetence,
  getCompetences,
  updateCompetence,
  deleteCompetence,
  updateSubCompetence,
} = require("../controllers/competence.controller");

const router = express.Router();

router.post("/", createCompetence);
router.get("/", getCompetences);
router.get("/:id", getCompetences);
router.put("/:id", updateCompetence);
router.delete("/:id", deleteCompetence);
router.put("/:competenceId/sub/:subId", updateSubCompetence);

module.exports = router;
