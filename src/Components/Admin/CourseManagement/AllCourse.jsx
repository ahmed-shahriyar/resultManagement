import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import "./AllCourse.css";

const AllCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/course/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="all-courses-container">
      <h2>All Courses</h2>
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard key={course.Code} course={course} />
        ))}
      </div>
    </div>
  );
};

export default AllCourse;
