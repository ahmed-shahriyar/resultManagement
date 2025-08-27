import React, { useState } from 'react';
import { User, Book, FileText, LogOut, Eye } from 'lucide-react'; // 👈 Added Eye icon
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("teacherToken"); // Adjust if storing something else
    navigate('/');
  };

  const menuItems = [
    { key: 'profile', label: 'Profile', icon: <User size={18} />, path: `profile` },
    { key: 'course', label: 'Course', icon: <Book size={18} />, path: `course` },
    { key: 'result', label: 'Result Management', icon: <FileText size={18} />, path: `result` },
    { key: 'view-result', label: 'View Result', icon: <Eye size={18} />, path: `view-result` }, // 👈 New menu item
    { key: 'logout', label: 'Logout', icon: <LogOut size={18} />, action: handleLogout },
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Teacher Panel</h2>
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.key}>
              {item.path ? (
                <Link to={`/teacher-dashboard/${teacherId}/${item.path}`}>
                  <button
                    className={`sidebar-btn ${activeTab === item.key ? 'active' : ''}`}
                    onClick={() => setActiveTab(item.key)}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-label">{item.label}</span>
                  </button>
                </Link>
              ) : (
                <button className="sidebar-btn" onClick={item.action}>
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherDashboard;
