// TeacherResultManagement.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeacherResultManagement = ({ teacherId }) => {
  const [form, setForm] = useState({
    session: '',
    semester: '',
    courseCode: '',
    examType: ''
  });

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});

 useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/result/teacher/${teacherId}`);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  if (teacherId) {
    fetchCourses();
  }
}, [teacherId]);

 

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMarkChange = (studentId, value) => {
    setMarks({ ...marks, [studentId]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      ...form,
      results: Object.entries(marks).map(([studentId, mark]) => ({ studentId, mark }))
    };
    axios.post('http://localhost:5000/api/result/add-multiple', payload)
      .then(() => {
        alert('Marks submitted successfully!');
        setForm({ session: '', semester: '', courseCode: '', examType: '' });
        setStudents([]);
        setMarks({});
      })
      .catch(err => {
        console.error('Error submitting result:', err);
        alert('Submission failed.');
      });
  };

  const semesters = ['Spring', 'Summer', 'Fall'];

  return (
    <div className="result-management-container">
      <h2 className="result-management-title">Add Marks</h2>
      <form className="result-form" onSubmit={handleSubmit}>
        <input type="text" name="session" value={form.session} onChange={handleChange} placeholder="Session" required />
        <select name="semester" value={form.semester} onChange={handleChange} required>
          <option value="">Select Semester</option>
          {semesters.map(sem => (
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select>
        <select name="courseCode" value={form.courseCode} onChange={handleChange} required>
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.Code} value={course.Code}>{course.Title}</option>
          ))}
        </select>
        <select name="examType" value={form.examType} onChange={handleChange} required>
          <option value="">Select Exam Type</option>
          <option value="Assignment">Assignment</option>
          <option value="Mid">Mid</option>
          <option value="Final">Final</option>
        </select>

        {students.length > 0 && (
          <div className="student-marks-list">
            {students.map(student => (
              <div key={student.ID} className="student-mark-row">
                <span>{student.ID} - {student.Name}</span>
                <input
                  type="number"
                  placeholder="Marks"
                  value={marks[student.ID] || ''}
                  onChange={e => handleMarkChange(student.ID, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TeacherResultManagement;
