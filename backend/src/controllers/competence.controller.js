const Competence = require("../models/Competence");

// create a new competence with its sub-ones
const createCompetence = async (req, res) => {
  try {
    const { code, name, subCompetences } = req.body;
    if (!code || !name || !Array.isArray(subCompetences)) {
      return res
        .status(400)
        .json({ message: "Code, name, and subCompetences are required." });
    }

    const existing = await Competence.findOne({ code });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Competence with this code already exists." });
    }

    const newCompetence = new Competence({
      code,
      name,
      subCompetences,
    });

    await newCompetence.save();
    res.status(201).json(newCompetence);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get competences
const getCompetences = async (req, res) => {
  try {
    const { id } = req.params;
    const competences = await Competence.findById(id);
    res.status(201).json(competences);
  } catch (error) {
    console.error("Get competences error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCompetence,
  getCompetences,
};
