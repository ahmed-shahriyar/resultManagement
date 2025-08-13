import React from "react";
import { BookOpen, List } from "lucide-react";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h3><BookOpen size={18} /> {course.Title}</h3>
      <p><List size={14} /> Code: {course.Code}</p>
      <p>Credit: {course.Credit}</p>
    </div>
  );
};

export default CourseCard;
