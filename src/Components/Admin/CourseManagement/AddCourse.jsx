import React, { useState } from "react";
import axios from "axios";
import "./AddCourse.css";

const AddCourse = () => {
  const [course, setCourse] = useState({
    Code: "",
    Title: "",
    Credit: "",
    Semester: "",
    Dept: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/add-course", course);
      setMessage("Course added successfully!");
      setCourse({
        Code: "",
        Title: "",
        Credit: "",
        Semester: "",
        Dept: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add course.");
    }
  };

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <input
          type="text"
          name="Code"
          value={course.Code}
          onChange={handleChange}
          placeholder="Course Code"
          required
        />
        <input
          type="text"
          name="Title"
          value={course.Title}
          onChange={handleChange}
          placeholder="Course Title"
          required
        />
        <input
          type="number"
          name="Credit"
          value={course.Credit}
          onChange={handleChange}
          placeholder="Credit Hours"
          required
        />
        <input
          type="text"
          name="Semester"
          value={course.Semester}
          onChange={handleChange}
          placeholder="Semester"
          required
        />
        <input
          type="text"
          name="Dept"
          value={course.Dept}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <button type="submit">Add Course</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AddCourse;
