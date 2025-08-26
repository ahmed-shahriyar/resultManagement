import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllStudent.css";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

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


  const filtered = students.filter((s) =>
    s.Name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="all-students-container">
      <h2>All Students</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

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
        <span className="course-title">{c.Title} ({c.Code})</span>
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
