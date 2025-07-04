const mongoose = require("mongoose");

const SubCompetenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    validated: {
      type: Boolean,
    },
    importance: {
      type: String,
      enum: ["High", "Normal", "Low"],
      required: true,
    },
  },
  {
    _id: false,
  }
);

const competenceSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  subCompetences: [SubCompetenceSchema],
  validated: {
    type: Boolean,
  },
});

const Competence = mongoose.model("Competence", competenceSchema);
module.exports = Competence;
