import React from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";
import "./StudentCard.css";

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <h3><User size={18} /> {student.Name}</h3>
      <p><Mail size={14} /> {student.Email}</p>
      <p><Phone size={14} /> {student.Phone}</p>
      <p><Calendar size={14} /> Session: {student.Session}</p>
      <p>ID: {student.ID}</p>
    </div>
  );
};

export default StudentCard;
