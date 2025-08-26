import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EnroolCourse.css";

const EnrollCourse = () => {
  const [students, setStudents] = useState([]);
  const [semesters, setSemesters] = useState([]); // list of semesters
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ ID: "", Semester: "", Code: "" });
  const [message, setMessage] = useState("");

  // Fetch students and semesters on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/course/semesters") // new endpoint to fetch semesters
      .then(res => setSemesters(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch courses when semester changes
  useEffect(() => {
    if (form.Semester) {
      axios.get(`http://localhost:5000/api/course/courses/${form.Semester}`)
        .then(res => setCourses(res.data))
        .catch(err => console.error(err));
    } else {
      setCourses([]);
    }
  }, [form.Semester]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/course/enroll", form);
      setMessage(res.data.message);
      setForm({ ID: "", Semester: "", Code: "" });
      setCourses([]);
    } catch (err) {
      setMessage("Error enrolling student");
    }
  };

  return (
    <div className="enroll-container">
      <h2>Enroll Student in Course</h2>
      {message && <p className="message">{message}</p>}

      <form className="enroll-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student:</label>
          <select
            value={form.ID}
            onChange={(e) => setForm({ ...form, ID: e.target.value })}
            required
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.ID} value={s.ID}>
                {s.Name} ({s.ID})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Semester:</label>
         <select
  value={form.Semester}
  onChange={(e) => setForm({ ...form, Semester: e.target.value })}
  required
>
  <option value="">Select Semester</option>
  {semesters.map((s) => (
    <option key={s.semester} value={s.semester}>
      {s.semester}
    </option>
  ))}
</select>

        </div>

        <div className="form-group">
          <label>Course:</label>
          <select
            value={form.Code}
            onChange={(e) => setForm({ ...form, Code: e.target.value })}
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.Code} value={c.Code}>
                {c.Title}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Enroll</button>
      </form>
    </div>
  );
};

export default EnrollCourse;
