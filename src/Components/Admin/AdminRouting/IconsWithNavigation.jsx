import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IconsWithNavigation.css';

const adminIcon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
  </svg>
);

const teacherIcon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20v-6" />
    <circle cx="12" cy="10" r="4" />
    <path d="M5 21h14" />
  </svg>
);

const studentIcon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <circle cx="12" cy="14" r="3" />
  </svg>
);

const IconsWithNavigation = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: adminIcon, label: 'Admin', path: '/admin' },
    { icon: teacherIcon, label: 'Teacher', path: '/teacher' },
    { icon: studentIcon, label: 'Student', path: '/student' },
  ];

  const handleKeyDown = (e, path) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <div className="icons-container">
      {navItems.map(({ icon, label, path }) => (
        <div
          key={label}
          role="button"
          tabIndex={0}
          onClick={() => navigate(path)}
          onKeyDown={(e) => handleKeyDown(e, path)}
          className="icon-button"
          title={label}
          aria-label={`Go to ${label} login`}
        >
          {icon}
          <div className="icon-label">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default IconsWithNavigation;
