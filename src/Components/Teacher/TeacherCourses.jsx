// TeacherCourses.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TeacherCourses.css'



const TeacherCourses = () => {
   const { teacherId } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/course/teacher/${teacherId}`);
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


  return (
    <div className="teacher-courses-container">
      <h2 className="teacher-courses-title">Assigned Courses</h2>
      {courses.length === 0 ? (
        <p>No courses assigned.</p>
      ) : (
        <table className="courses-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Credit</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.Code}>
                <td>{course.Code}</td>
                <td>{course.Title}</td>
                <td>{course.Credit}</td>
                <td>{course.Semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherCourses;
