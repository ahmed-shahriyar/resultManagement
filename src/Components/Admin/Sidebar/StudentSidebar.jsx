import React from 'react';
import { User, FileText, LogOut } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './StudentSidebar.css';

const StudentSidebar = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Student Panel</h2>
        <ul className="sidebar-menu">
          <li>
            <Link className="sidebar-btn" to={`/dashboard/${studentId}/profile`}>
              <span className="sidebar-icon"><User size={18} /></span>
              <span className="sidebar-label">Profile</span>
            </Link>
          </li>
          <li>
            <Link className="sidebar-btn" to={`/dashboard/${studentId}/result`}>
              <span className="sidebar-icon"><FileText size={18} /></span>
              <span className="sidebar-label">Result</span>
            </Link>
          </li>
        </ul>

        <div className="logout-section">
          <button className="sidebar-btn logout-btn" onClick={handleLogout}>
            <span className="sidebar-icon"><LogOut size={18} /></span>
            <span className="sidebar-label">Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default StudentSidebar;
