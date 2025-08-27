import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllStudent.css";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  // ✅ Filter students by name AND session
  const filtered = students.filter((s) => {
    const matchesName = s.Name.toLowerCase().includes(search.toLowerCase());
    const matchesSession = selectedSession
      ? s.Session === selectedSession
      : true;
    return matchesName && matchesSession;
  });

  return (
    <div className="all-students-container">
      <h2>All Students</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
          className="session-select"
        >
          <option value="">--All Sessions--</option>
          <option value="2020-21">2020-21</option>
          <option value="2021-22">2021-22</option>
          <option value="2022-23">2022-23</option>
          <option value="2023-24">2023-24</option>
          <option value="2024-25">2024-25</option>
        </select>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Session</th>
            <th>Phone</th>
            <th>Courses</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((student) => (
            <tr key={student.ID}>
              <td>{student.ID}</td>
              <td>{student.Name}</td>
              <td>{student.Session}</td>
              <td>{student.Phone}</td>
              <td>
                {Array.isArray(student.Courses) && student.Courses.length > 0 ? (
                  student.Courses.map((c, i) => (
                    <div key={i} className="course-item">
                      <span className="course-title">
                        {c.Title} ({c.Code})
                      </span>
                      <span className="course-teacher"> — {c.Teacher}</span>
                    </div>
                  ))
                ) : (
                  <em>No Courses Assigned</em>
                )}
              </td>
              <td>{student.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudent;
