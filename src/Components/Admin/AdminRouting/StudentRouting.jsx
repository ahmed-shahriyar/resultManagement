import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from "../../Dashboard/StudentDashBoard";
import StudentSidebar from "../Sidebar/StudentSidebar";
import StudentLogin from "../../StudentLogin/StudentLogin"
import StudentProfile from "../../Student/StudentProfile"
import StudentResult from "../../Student/StudentResult"


const StudentRouting = () => {
  return (
  
      <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/dashboard/:studentId" element={<StudentDashboard />}>
          <Route path="profile" element={<StudentProfile />} />
          <Route path="result" element={<StudentResult />} />
        </Route>
      </Routes>
    </Router>
   
  )
}

export default StudentRouting;
