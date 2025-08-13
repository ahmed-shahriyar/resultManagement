// AdminLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css'; // Optional: you can reuse StudentLogin.css if design is same

const AdminLogin = ({ onLogin }) => {
  const [adminId, setAdminId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3001/api/admin/${adminId}`);
      if (res.data && res.data.ID) {
        onLogin(adminId); // Pass admin ID up to parent
      } else {
        setError('Admin not found.');
      }
    } catch (err) {
      setError('Login failed. Please check your ID and try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
