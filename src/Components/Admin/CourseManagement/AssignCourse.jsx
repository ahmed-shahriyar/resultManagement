import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AssignCourse.css";

const AssignCourse = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherRes = await axios.get("http://localhost:5000/api/teachers");
        const courseRes = await axios.get("http://localhost:5000/api/course/courses");
        setTeachers(teacherRes.data);
        setCourses(courseRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleCourseToggle = (code) => {
    if (selectedCourses.includes(code)) {
      setSelectedCourses(selectedCourses.filter(c => c !== code));
    } else {
      setSelectedCourses([...selectedCourses, code]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/course/assign-course", {
        T_ID: selectedTeacher,
        Courses: selectedCourses
      });
      setMessage("Courses assigned successfully!");
      setSelectedTeacher("");
      setSelectedCourses([]);
    } catch (err) {
      console.error(err);
      setMessage("Failed to assign courses.");
    }
  };

  return (
    <div className="assign-course-container">
      <h2>Assign Course to Teacher</h2>
      <form onSubmit={handleSubmit} className="assign-form">
        <label>Select Teacher</label>
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          required
        >
          <option value="">-- Select --</option>
          {teachers.map((t) => (
            <option key={t.T_ID} value={t.T_ID}>
              {t.Name} ({t.T_ID})
            </option>
          ))}
        </select>

        <label>Select Courses</label>
        <div className="course-checkboxes">
          {courses.map((course) => (
            <label key={course.Code} className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.Code)}
                onChange={() => handleCourseToggle(course.Code)}
              />
              {course.Title} ({course.Code})
            </label>
          ))}
        </div>

        <button type="submit">Assign Courses</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AssignCourse;
