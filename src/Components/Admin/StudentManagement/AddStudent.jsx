import React, { useState } from "react";
import axios from "axios";
import "./AddStudent.css";

const AddStudent = () => {
  const [student, setStudent] = useState({
    ID: "",
    Name: "",
    DOB: "",
    Email: "",
    Phone: "",
    Session: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/add-student", student);
      setMessage("Student added successfully!");
      setStudent({
        ID: "",
        Name: "",
        DOB: "",
        Email: "",
        Phone: "",
        Session: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add student.");
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          name="ID"
          value={student.ID}
          onChange={handleChange}
          placeholder="Student ID"
          required
        />
        <input
          type="text"
          name="Name"
          value={student.Name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="date"
          name="DOB"
          value={student.DOB}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="Email"
          value={student.Email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="Phone"
          value={student.Phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <input
          type="text"
          name="Session"
          value={student.Session}
          onChange={handleChange}
          placeholder="Session"
          required
        />
        <button type="submit">Add Student</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AddStudent;
