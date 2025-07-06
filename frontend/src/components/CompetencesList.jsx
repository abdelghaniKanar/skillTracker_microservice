import React, { useEffect, useState } from "react";
import axios from "axios";

const CompetencesList = ({ onAddClick }) => {
  const [competences, setCompetences] = useState([]);

  useEffect(() => {
    fetchCompetences();
  }, []);

  const fetchCompetences = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/competence");
      setCompetences(res.data);
    } catch (error) {
      console.error("Error fetching competences", error);
    }
  };

  return (
    <div>
      <h2>Competences List</h2>
      {competences.length === 0 ? (
        <p>No competences found. Click below to add one.</p>
      ) : (
        <ul>
          {competences.map((comp) => (
            <li key={comp._id}>
              <strong>{comp.code}</strong> - {comp.name} (Validated:{" "}
              {comp.validated ? "Yes" : "No"})
              <ul>
                {comp.subCompetences.map((sub) => (
                  <li key={sub._id}>
                    {sub.name} - Validated: {sub.validated ? "Yes" : "No"} -
                    Importance: {sub.importance}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onAddClick}>Add Competence</button>
    </div>
  );
};

export default CompetencesList;
