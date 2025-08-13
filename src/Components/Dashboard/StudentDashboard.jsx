import React from 'react';
import { Outlet, useParams, Link, useNavigate } from 'react-router-dom';
import { User, FileText, LogOut } from 'lucide-react'; // icons
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>🎓 Student Panel</h2>
          <p>ID: <span>{studentId}</span></p>
        </div>
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link to="profile">
                <User size={18} className="nav-icon" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="result">
                <FileText size={18} className="nav-icon" />
                <span>Result</span>
              </Link>
            </li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} className="nav-icon" />
          <span>Logout</span>
        </button>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentDashboard;
