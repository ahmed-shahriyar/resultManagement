// TeacherProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeacherProfile = () => {
  const { teacherId } = useParams(); // Get teacherId from URL
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/teachers/${teacherId}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [teacherId]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="teacher-profile-container">
      <h2 className="teacher-profile-title">Teacher Profile</h2>
      <div className="teacher-profile-info">
        <p><strong>ID:</strong> {profile.T_ID}</p>
        <p><strong>Name:</strong> {profile.Name}</p>
        <p><strong>Department:</strong> {profile.Dept}</p>
        <p><strong>Faculty:</strong> {profile.Faculty}</p>
        <p><strong>Email:</strong> {profile.Email}</p>
        <p><strong>Salary:</strong> ${profile.Salary}</p>
      </div>
    </div>
  );
};

export default TeacherProfile;
