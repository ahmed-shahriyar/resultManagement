import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BatchResult.css";

const BatchResult = () => {
  const [semester, setSemester] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/course/semesters")
      .then(res => setSemesters(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!semester) return alert("Select a semester");

    try {
      const res = await axios.get("http://localhost:5000/api/result/batch", {
        params: { semester }
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch batch results");
    }
  };

  return (
    <div className="batch-result-container">
      <h2>Batch-wise Result</h2>
      <form onSubmit={handleSubmit} className="result-form">
        <div className="form-group">
          <label>Semester:</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            <option value="">Select Semester</option>
            {semesters.map(s => (
              <option key={s.semester} value={s.semester}>
                {s.semester}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">Get Batch Result</button>
      </form>

      {results.length > 0 && results.map(student => (
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
                <tr key={idx}>
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
  );
};

export default BatchResult;
