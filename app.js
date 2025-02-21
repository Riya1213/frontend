import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data) throw new Error("Invalid JSON format");

      const res = await axios.post("https://your-backend-url.vercel.app/bfhl", parsedData);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON input. Please provide a valid JSON format.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>BFHL API Frontend</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON (e.g. {"data": ["A", "1", "B"]})'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <h3>Response</h3>
          <label>Filter Data: </label>
          <select multiple onChange={(e) => setSelectedFilters([...e.target.selectedOptions].map(o => o.value))}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          <div>
            {selectedFilters.includes("alphabets") && <p>Alphabets: {JSON.stringify(response.alphabets)}</p>}
            {selectedFilters.includes("numbers") && <p>Numbers: {JSON.stringify(response.numbers)}</p>}
            {selectedFilters.includes("highest_alphabet") && <p>Highest Alphabet: {JSON.stringify(response.highest_alphabet)}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
