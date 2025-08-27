import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './ViewResult.css'

const ViewResult = () => {
  const { teacherId } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [results, setResults] = useState([]);

  // ✅ Fetch courses for the teacher
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/course/teacher/${teacherId}`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, [teacherId]);

  // ✅ Fetch sessions
 

  // ✅ Handle fetch result
  const handleFetchResults = () => {
    if (!selectedCourse || !selectedSession) {
      alert("Please select both course and session");
      return;
    }

    axios
      .get("http://localhost:5000/api/course/results", {
        params: { course: selectedCourse, session: selectedSession },
      })
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="view-result-container">
      <h2>View Results</h2>

      <div className="filters">
        <div>
          <label>Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.Code} value={c.Code}>
                {c.Title}
              </option>
            ))}
          </select>
        </div>

        <div>
           <label>Select Session</label>
        <select name="session" value={selectedSession}   onChange={(e) => setSelectedSession(e.target.value)}>
          <option value="">--Select--</option>
           <option value="2020-21">2020-21</option>
            <option value="2021-22">2021-22</option>
          <option value="2022-23">2022-23</option>
          <option value="2023-24">2023-24</option>
          <option value="2024-25">2024-25</option>
        </select>
        </div>

        <button onClick={handleFetchResults}>Fetch Results</button>
      </div>

      {results.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Assignment</th>
              <th>Midterm</th>
              <th>Final</th>
              <th>Total</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, index) => (
              <tr key={index}>
                <td>{r.ID}</td>
                <td>{r.Name}</td>
                <td>{r.Assignment ?? "-"}</td>
                <td>{r.Midterm ?? "-"}</td>
                <td>{r.Final ?? "-"}</td>
                <td>
                  {(r.Assignment || 0) + (r.Midterm || 0) + (r.Final || 0)}
                </td>
                <td>{r.Grade ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewResult;
