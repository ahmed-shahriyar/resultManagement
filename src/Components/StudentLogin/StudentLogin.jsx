import React, { useState } from 'react';
import axios from 'axios';
import './StudentLogin.css';

const StudentLogin = ({ onLogin }) => {
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3001/api/student/${studentId}`);
      if (res.data && res.data.ID) {
        onLogin(studentId); // Pass the ID to parent
      } else {
        setError('Student not found.');
      }
    } catch (err) {
      setError('Login failed. Check your ID and try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default StudentLogin;
