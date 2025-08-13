import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import './StudentProfile.css';
const StudentProfile = () => {
  const { studentId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    
    axios.get(`http://localhost:5000/api/students/${studentId}`)
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error loading profile:', error));
  }, [studentId]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    
    <div className="profile-container">
      <h2 className="profile-title">Student Profile</h2>
      <div className="profile-info">
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
