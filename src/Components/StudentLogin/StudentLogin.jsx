import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import axios from 'axios';
import './StudentLogin.css';

const StudentLogin = ({ onLogin }) => {
  const [studentId, setStudentId] = useState('');
   const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedId = studentId.trim();
    const numericId = Number(trimmedId);
    console.log(numericId);

    if (isNaN(numericId)) {
      setError('Invalid Student ID. Please enter numbers only.');
      return;
    }

  try {
  const res = await axios.get(`http://localhost:5000/api/students/${numericId}`);
  onLogin && onLogin(res.data);
  
  // ✅ Correct route for student
  navigate(`/student-dashboard/${numericId}/profile`);
  
  setError('');
} catch (err) {
  console.error('Login error:', err);

  if (err.response) {
    if (err.response.status === 404) {
      setError(`Student with ID ${numericId} not found.`);
    } else {
      setError(`Server error (${err.response.status}): ${err.response.data?.error || 'Unknown error'}`);
    }
  } else if (err.request) {
    setError('No response from server. Please check your network or try again later.');
  } else {
    setError(`Unexpected error: ${err.message}`);
  }
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

export default StudentLogin;
