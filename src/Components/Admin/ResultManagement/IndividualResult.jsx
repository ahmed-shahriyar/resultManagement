import React, { useState, useEffect } from "react";
import axios from "axios";
import "./IndividualResult.css";

const IndividualResult = () => {
  const [form, setForm] = useState({ studentId: "", semester: "" });
  const [result, setResult] = useState(null);
  const [semesters, setSemesters] = useState([]);

  // Fetch semesters from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/course/semesters")
      .then((res) => setSemesters(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.studentId || !form.semester) {
    alert("Student ID and Semester are required");
    return;
  }

  try {
    console.log("Sending studentId:", form.studentId);
    console.log("Sending semester:", form.semester);

    const response = await axios.get(
      `http://localhost:5000/api/result/individual`,
      {
        params: { studentId: form.studentId, semester: form.semester },
      }
    );

    setResult(response.data);
  } catch (err) {
    console.error(err);
    alert("Failed to fetch result");
  }
};


  return (
    <div className="individual-result-container">
      <h2>Individual Result</h2>
      <form onSubmit={handleSubmit} className="result-form">
        <div className="form-group">
          <label>Student ID:</label>
         <input
  type="number"
  name="studentId"
  value={form.studentId}
  onChange={(e) =>
    setForm({ ...form, studentId: parseInt(e.target.value) || "" })
  }
  placeholder="Enter Student ID"
  required
/>

        </div>
        <div className="form-group">
          <label>Semester:</label>
          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((s) => (
              <option key={s.semester} value={s.semester}>
                {s.semester}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Get Result
        </button>
      </form>

      {result && result.courses && (
        <div className="result-table-container">
          <h3>Result for Student ID: {form.studentId}</h3>
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
              {result.courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.code}</td>
                  <td>{course.title}</td>
                  <td>{course.marks}</td>
                  <td>{course.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="gpa">GPA: {result.gpa}</h4>
        </div>
      )}
    </div>
  );
};

export default IndividualResult;
