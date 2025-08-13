import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeacherLogin from '../../Login/TeacherLogin'
import TeacherDashboard from "../../Dashboard/TeacherDashBoard";
import TeacherProfile from "../../Teacher/TeacherProfile";
import TeacherCourses from "../../Teacher/TeacherCourses"
import TeacherResultManagement from "../../Teacher/TeacherResultManagement"

const TeacherRouting = () => {
  return (
    <div>
      
       <Router>
      <Routes>
        <Route path="/" element={<TeacherLogin/>} />
        <Route path="/dashboard/:teacherId" element={<TeacherDashboard />}>
          <Route path="profile" element={<TeacherProfile/>} />
          <Route path="result" element={<TeacherResultManagement/>} />
            <Route path="course" element={<TeacherCourses/>} />
        </Route>
      </Routes>
    </Router>
    </div>
  )
}

export default TeacherRouting;
