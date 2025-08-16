import React, { useState } from "react";
import "./TeacherResultManagement.css"; // Import CSS file

const TeacherResultManagement = () => {
  const [form, setForm] = useState({
    session: "",
    semester: "",
    course: "",
    examType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
  };

  return (
    <div className="form-container">
      <h2>Teacher Result Management</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Session */}
        <label>Select Session</label>
        <select name="session" value={form.session} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="2022-23">2022-23</option>
          <option value="2023-24">2023-24</option>
          <option value="2024-25">2024-25</option>
        </select>

        {/* Semester */}
        <label>Select Semester</label>
        <select name="semester" value={form.semester} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
        </select>

        {/* Course */}
        <label>Select Course</label>
        <select name="course" value={form.course} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="CSE101">CSE101</option>
          <option value="CSE102">CSE102</option>
          <option value="CSE201">CSE201</option>
        </select>

        {/* Exam Type */}
        <label>Select Exam Type</label>
        <select name="examType" value={form.examType} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="Midterm">Midterm</option>
          <option value="Final">Final</option>
          <option value="Quiz">Quiz</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TeacherResultManagement;
