import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BatchResult.css";

const BatchResult = () => {
  const [semester, setSemester] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available semesters on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/course/semesters")
      .then(res => setSemesters(res.data))
      .catch(err => {
        console.error("Error fetching semesters:", err);
        alert("Failed to load semesters");
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!semester.trim()) {
      return alert("Please select a semester");
    }

    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/course/batch", {
        params: { semester: semester.trim() }
      });
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching results:", err);
      alert("Failed to fetch batch results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="batch-result-container">
      <h2>📊 Batch-wise Result</h2>

      <form onSubmit={handleSubmit} className="result-form">
        <div className="form-group">
          <label htmlFor="semester">Semester:</label>
          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            <option value="">-- Select Semester --</option>
            {semesters.map((s, idx) => (
              <option key={idx} value={s.semester}>
                {s.semester}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">Get Batch Result</button>
      </form>

      {loading && <p>Loading results...</p>}

      {!loading && results.length === 0 && semester && (
        <p>No results found for semester: <strong>{semester}</strong></p>
      )}

      {!loading && results.length > 0 && (
        <div className="results-section">
          {results.map(student => (
            <div key={student.studentId} className="student-result">
              <h3>{student.studentName} (ID: {student.studentId})</h3>
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Marks</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {student.courses.map((c, idx) => (
                    <tr key={`${student.studentId}-${c.code}-${idx}`}>
                      <td>{c.code}</td>
                      <td>{c.title}</td>
                      <td>{c.marks}</td>
                      <td>{c.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4>GPA: {student.gpa}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BatchResult;
