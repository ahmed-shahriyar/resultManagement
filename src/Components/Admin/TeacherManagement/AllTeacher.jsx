import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherCard from "./TeacherCard";
import "./AllTeacher.css";

const AllTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers");
      setTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setError("Failed to load teachers.");
    }
  };

  const handleDelete = async (T_ID) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/teachers/delete-teacher/${T_ID}`);
      fetchTeachers(); // reload after delete
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete teacher.");
    }
  };

  const handleEdit = async (updatedTeacher) => {
  try {
    await axios.put(`http://localhost:5000/api/update-teacher/${updatedTeacher.T_ID}`, {
      Name: updatedTeacher.Name,
      DOB: updatedTeacher.DOB,
      Dept: updatedTeacher.Dept,
      Faculty: updatedTeacher.Faculty,
      Email: updatedTeacher.Email,
    });

    alert("Teacher updated successfully!");
    fetchTeachers(); // Refresh the list after update
  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update teacher.");
  }
};


  const filteredTeachers = teachers.filter(t =>
    t.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.Dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="all-teachers-container">
      <h2>All Teachers</h2>
      <input
        type="text"
        placeholder="Search by name or department"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {error && <p className="error">{error}</p>}
      <div className="teacher-list">
        {filteredTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.T_ID}
            teacher={teacher}
            onDelete={() => handleDelete(teacher.T_ID)}
            onEdit={() => handleEdit(teacher)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllTeacher;
