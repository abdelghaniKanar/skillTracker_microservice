import React, { useState } from "react";
import CompetencesList from "./components/CompetencesList";
import Form from "./components/Form";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {showForm ? (
        <Form
          onSuccess={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <CompetencesList onAddClick={() => setShowForm(true)} />
      )}
    </div>
  );
};

export default App;
