import React, { useState } from "react";

const IndividualResult = () => {
  const [form, setForm] = useState({ studentId: "", semester: "" });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example: Fetch result from API
    try {
      const response = await fetch(
        `/api/results/individual?studentId=${form.studentId}&semester=${form.semester}`
      );
      const data = await response.json();
      setResult(data); // Set the result to state
    } catch (err) {
      console.error(err);
      alert("Failed to fetch result");
    }
  };

  return (
    <div className="individual-result">
      <h2>Individual Result</h2>
      <form onSubmit={handleSubmit} className="result-form">
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Semester:</label>
          <input
            type="text"
            name="semester"
            value={form.semester}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Get Result</button>
      </form>

      {result && result.courses && (
        <div className="result-table">
          <h3>Result for Student ID: {form.studentId}</h3>
          <table border="1">
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
                  <td>{course.name}</td>
                  <td>{course.marks}</td>
                  <td>{course.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>GPA: {result.gpa}</h4>
        </div>
      )}
    </div>
  );
};

export default IndividualResult;
