import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentProfile.css';
const StudentProfile = ({ studentId }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/student/${studentId}`)
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error loading profile:', error));
  }, [studentId]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="student-container">
      <h2 className="title">Student Profile</h2>
      <div className="info">
        <p><strong>ID:</strong> {profile.ID}</p>
        <p><strong>Name:</strong> {profile.Name}</p>
        <p><strong>Date of Birth:</strong> {profile.DOB}</p>
        <p><strong>Email:</strong> {profile.Email}</p>
        <p><strong>Phone:</strong> {profile.Phone}</p>
        <p><strong>Session:</strong> {profile.Session}</p>
      </div>
    </div>
  );
};
export default StudentProfile;
