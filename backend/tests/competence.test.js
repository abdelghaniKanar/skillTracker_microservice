require("dotenv").config();
const mongoose = require("mongoose");
const Competence = require("../src/models/Competence");

// Wrap tests inside describe
describe("Competence model", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // This is the actual test (needed!)
  it("should create a competence with valid data", async () => {
    const competence = new Competence({
      code: "TEST1",
      name: "Test Competence",
      subCompetences: [{ name: "Sub1", validated: true, importance: "High" }],
      validated: true,
    });

    const saved = await competence.save();
    expect(saved.code).toBe("TEST1");
  });
});
