import React, { useState } from "react";
import axios from "axios";

const Form = ({ onSuccess, onCancel }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [subCompetences, setSubCompetences] = useState([
    { name: "", validated: false, importance: "Normal" },
  ]);

  const handleSubChange = (index, field, value) => {
    const subs = [...subCompetences];
    subs[index][field] = value;
    setSubCompetences(subs);
  };

  const addSubCompetence = () => {
    setSubCompetences([
      ...subCompetences,
      { name: "", validated: false, importance: "Normal" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/competence", {
        code,
        name,
        subCompetences,
      });
      onSuccess();
    } catch (error) {
      console.error("Error creating competence", error);
    }
  };

  return (
    <div>
      <h2>Add Competence</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <h3>Sub-Competences</h3>
        {subCompetences.map((sub, index) => (
          <div key={index}>
            <input
              placeholder="Sub name"
              value={sub.name}
              onChange={(e) => handleSubChange(index, "name", e.target.value)}
              required
            />
            <select
              value={sub.importance}
              onChange={(e) =>
                handleSubChange(index, "importance", e.target.value)
              }
            >
              <option value="High">High</option>
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
            </select>
            <label>
              <input
                type="checkbox"
                checked={sub.validated}
                onChange={(e) =>
                  handleSubChange(index, "validated", e.target.checked)
                }
              />
              Validated
            </label>
          </div>
        ))}
        <button type="button" onClick={addSubCompetence}>
          Add Sub-Competence
        </button>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Form;
