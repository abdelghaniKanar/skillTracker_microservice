const Competence = require("../models/Competence");

// Create competence
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

    const validatedCount = subCompetences.filter((sc) => sc.validated).length;
    const notValidatedCount = subCompetences.length - validatedCount;

    const newCompetence = new Competence({
      code,
      name,
      subCompetences,
      validated: validatedCount >= notValidatedCount,
    });

    await newCompetence.save();
    res.status(201).json(newCompetence);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all competences or one by ID
const getCompetences = async (req, res) => {
  try {
    if (req.params.id) {
      const competence = await Competence.findById(req.params.id);
      if (!competence) {
        return res.status(404).json({ message: "Competence not found" });
      }
      return res.status(200).json(competence);
    }
    const competences = await Competence.find();
    res.status(200).json(competences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update competence + recompute validated
const updateCompetence = async (req, res) => {
  try {
    const competence = await Competence.findById(req.params.id);
    if (!competence) {
      return res.status(404).json({ message: "Competence not found" });
    }

    // Apply updates
    if (req.body.code) competence.code = req.body.code;
    if (req.body.name) competence.name = req.body.name;
    if (req.body.subCompetences)
      competence.subCompetences = req.body.subCompetences;

    // Recompute validated
    const validatedCount = competence.subCompetences.filter(
      (sc) => sc.validated
    ).length;
    const notValidatedCount = competence.subCompetences.length - validatedCount;
    competence.validated = validatedCount >= notValidatedCount;

    await competence.save();
    res.status(200).json(competence);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete competence
const deleteCompetence = async (req, res) => {
  try {
    const deleted = await Competence.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Competence not found" });
    }
    res.status(200).json({ message: "Competence deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a subCompetence validation
const updateSubCompetence = async (req, res) => {
  try {
    const { competenceId, subId } = req.params;
    const { validated } = req.body;

    const competence = await Competence.findById(competenceId);
    if (!competence) {
      return res.status(404).json({ message: "Competence not found" });
    }

    const sub = competence.subCompetences.id(subId);
    if (!sub) {
      return res.status(404).json({ message: "SubCompetence not found" });
    }

    sub.validated = validated;

    // Recompute main validated
    const validatedCount = competence.subCompetences.filter(
      (sc) => sc.validated
    ).length;
    const notValidatedCount = competence.subCompetences.length - validatedCount;
    competence.validated = validatedCount >= notValidatedCount;

    await competence.save();
    res.status(200).json(competence);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCompetence,
  getCompetences,
  updateCompetence,
  deleteCompetence,
  updateSubCompetence,
};
