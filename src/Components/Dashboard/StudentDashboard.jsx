// StudentDashboard.jsx
import React, { useState } from 'react';
import { User, FileText } from 'lucide-react';
import StudentResult from '../Student/StudentResult';
import StudentProfile from '../Student/studentProfile';
import './StudentDashboard.css';

const StudentDashboard = ({ studentId }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const menuItems = [
    { key: 'profile', label: 'Profile', icon: <User size={18} /> },
    { key: 'result', label: 'Result', icon: <FileText size={18} /> },
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Student Panel</h2>
        <ul className="sidebar-menu">
          {menuItems.map(item => (
            <li key={item.key}>
              <button
                className={`sidebar-btn ${activeTab === item.key ? 'active' : ''}`}
                onClick={() => setActiveTab(item.key)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        {activeTab === 'profile' && <StudentProfile studentId={studentId} />}
        {activeTab === 'result' && <StudentResult studentId={studentId} />}
      </main>
    </div>
  );
};

export default StudentDashboard;
