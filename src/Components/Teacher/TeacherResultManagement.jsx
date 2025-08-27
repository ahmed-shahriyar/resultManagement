import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TeacherResultManagement.css";

const TeacherResultManagement = () => {
  const { teacherId } = useParams();
 

  const [form, setForm] = useState({
    session: "",
    semester: "",
    course: "",
    examType: "Assignment", // default exam type
  });

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
     const [semesters, setSemesters] = useState([]);
  const [marks, setMarks] = useState({}); // { studentId: mark }
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Fetch courses for teacher
  useEffect(() => {
    if (teacherId) {
      setLoadingCourses(true);
      axios
        .get(`http://localhost:5000/api/course/teacher/${teacherId}`)
        .then((res) => setCourses(res.data))
        .catch((err) => console.error("Error fetching courses:", err))
        .finally(() => setLoadingCourses(false));
    }
  }, [teacherId]);
    useEffect(() => {
    axios
      .get("http://localhost:5000/api/course/semesters")
      .then((res) => setSemesters(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch students when session or course changes
  useEffect(() => {
    if (form.session && form.course) {
      setLoadingStudents(true);
      axios
        .get(`http://localhost:5000/api/results/students`, {
          params: { session: form.session, course: form.course },
        })
        .then((res) => {
          setStudents(res.data);
          const initialMarks = {};
          res.data.forEach((s) => (initialMarks[s.id] = ""));
          setMarks(initialMarks);
        })
        .catch((err) => console.error("Error fetching students:", err))
        .finally(() => setLoadingStudents(false));
    } else {
      setStudents([]);
      setMarks({});
    }
  }, [form.session, form.course]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMarkChange = (studentId, value) => {
    let val = Number(value);
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    setMarks({ ...marks, [studentId]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/results/marks", {
        course: form.course,
        examType: form.examType,
        marks,
      })
      .then(() => alert("Marks saved successfully!"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="form-container">
      <h2>Teacher Result Management</h2>
      <form onSubmit={handleSubmit}>
        {/* Session */}
        <label>Select Session</label>
        <select name="session" value={form.session} onChange={handleChange} required>
          <option value="">--Select--</option>
            <option value="2021-22">2021-22</option>
          <option value="2022-23">2022-23</option>
          <option value="2023-24">2023-24</option>
          <option value="2024-25">2024-25</option>
        </select>

        {/* Semester */}
         <label>Semester:</label>
          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((s) => (
              <option key={s.semester} value={s.semester}>
                {s.semester}
              </option>
            ))}
          </select>

        {/* Course */}
        <label>Select Course</label>
        {loadingCourses ? (
          <p>Loading courses...</p>
        ) : (
          <select name="course" value={form.course} onChange={handleChange} required>
            <option value="">--Select--</option>
            {courses.map((course) => (
              <option key={course.Code} value={course.Code}>
                {course.Code} - {course.Title}
              </option>
            ))}
          </select>
        )}

        {/* Exam Type */}
        <label>Select Exam Type</label>
        <select name="examType" value={form.examType} onChange={handleChange} required>
          <option value="Assignment">Assignment</option>
          <option value="Mid">Mid</option>
          <option value="Final">Final</option>
        </select>

        {/* Students Table */}
        {loadingStudents ? (
          <p>Loading students...</p>
        ) : students.length > 0 ? (
          <div className="students-table">
            <h3>Enter {form.examType} Marks</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>{form.examType} Marks (0-100)</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>
                      <input
                        type="number"
                        value={marks[student.id]}
                        onChange={(e) => handleMarkChange(student.id, e.target.value)}
                        required
                        min="0"
                        max="100"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No students found.</p>
        )}

        <button type="submit" disabled={students.length === 0}>
          Save Marks
        </button>
      </form>
    </div>
  );
};

export default TeacherResultManagement;
