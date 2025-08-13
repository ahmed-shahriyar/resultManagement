import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "./StudentCard";
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
      <div className="student-list">
        {filtered.map((student) => (
          <StudentCard key={student.ID} student={student} />
        ))}
      </div>
    </div>
  );
};

export default AllStudent;
