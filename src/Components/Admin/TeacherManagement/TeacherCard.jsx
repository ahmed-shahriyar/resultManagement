import React from "react";
import { User, Mail, Phone, Briefcase, Edit2, Trash2 } from "lucide-react";
import "./TeacherCard.css";

const TeacherCard = ({ teacher, onEdit, onDelete }) => {
  return (
    <div className="teacher-card">
      <h3><User size={18} /> {teacher.Name}</h3>
      <p><Mail size={14} /> {teacher.Email}</p>
      <p><Phone size={14} /> {teacher.Phone}</p>
      <p><Briefcase size={14} /> Dept: {teacher.Dept}</p>
      <p>ID: {teacher.T_ID}</p>

      <div className="card-actions">
        <button className="edit-btn" onClick={onEdit}><Edit2 size={14} /> Edit</button>
        <button className="delete-btn" onClick={onDelete}><Trash2 size={14} /> Delete</button>
      </div>
    </div>
  );
};

export default TeacherCard;
