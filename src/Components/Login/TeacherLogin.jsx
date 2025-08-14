// TeacherLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TeacherLogin.css'; // Keep your styling file

const TeacherLogin = ({ onLogin }) => {
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Added navigation

  const handleLogin = async (e) => {
    e.preventDefault();
     const trimmedId = teacherId.trim();
    const numericId = Number(trimmedId);
    console.log(numericId);

    if (isNaN(numericId)) {
      setError('Invalid Student ID. Please enter numbers only.');
      return;
    }
   try {
  const res = await axios.get(`http://localhost:5000/api/teachers/${numericId}`);
  onLogin && onLogin(res.data);
  navigate(`/teacher-dashboard/${numericId}/profile`);

  setError('');
} catch (err) {
  setError('Login failed. Please check your ID and try again.');
}

  };

  return (
    <div className="login-container">
      <h2>Teacher Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Teacher ID"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          required
        />
          <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default TeacherLogin;
