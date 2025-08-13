import React, { useState } from "react";
import axios from "axios";
import "./AddTeacher.css";

const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    T_ID: "",
    Name: "",
    DOB: "",
    Dept: "",
    Faculty: "",
    Salary: "",
    Email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/add-teacher", teacher);
      setMessage("Teacher added successfully!");
      setTeacher({
        T_ID: "",
        Name: "",
        DOB: "",
        Dept: "",
        Faculty: "",
        Salary: "",
        Email: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add teacher.");
      
    }
  };

  return (
    <div className="add-teacher-container">
      <h2>Add New Teacher</h2>
      <form onSubmit={handleSubmit} className="teacher-form">
        <input
          type="text"
          name="T_ID"
          value={teacher.T_ID}
          onChange={handleChange}
          placeholder="Teacher ID"
          required
        />
        <input
          type="text"
          name="Name"
          value={teacher.Name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="date"
          name="DOB"
          value={teacher.DOB}
          onChange={handleChange}
          placeholder="Date of Birth"
          required
        />
        <input
          type="text"
          name="Dept"
          value={teacher.Dept}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <input
          type="text"
          name="Faculty"
          value={teacher.Faculty}
          onChange={handleChange}
          placeholder="Faculty"
          required
        />
          <input
          type="number"
          name="Salary"
          value={teacher.Salary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />
        <input
          type="email"
          name="Email"
          value={teacher.Email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Add Teacher</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AddTeacher;
