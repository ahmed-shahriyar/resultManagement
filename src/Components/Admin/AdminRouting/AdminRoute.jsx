import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "../../Dashboard/AdminDashBoard";
import AdminSidebar from "../Sidebar/AdminSidebar";
import AddTeacher from "../TeacherManagement/AddTeacher"
import AllTeacher from "../TeacherManagement/AllTeacher"
import AddStudent from "../StudentManagement/AddStudent"
import AllStudent from "../StudentManagement/AllStudent"
import AddCourse from "../CourseManagement/AddCourse"
import AllCourse from "../CourseManagement/AllCourse"
import AssignCourse from "../CourseManagement/AssignCourse"
import AssignCourse from "../CourseManagement/EnrollCourse"




// Optional future components
     // You can create this later

const AdminRoutes = () => {
  return (
    
    <Router>
      <div style={{ display: "flex" }}>
        <AdminSidebar/>
        <main style={{ flex: 1, padding: "20px" }}>
      <Routes>
        
        <Route path="/" element={<AdminDashboard/>} />
          <Route path="/add-student" element={<AddStudent/>} />
            <Route path="/all-student" element={<AllStudent/>} />

          <Route path="/add-teacher" element={<AddTeacher/>} />
           <Route path="/all-teacher" element={<AllTeacher/>} />
          <Route path="/add-course" element={<AddCourse/>} />
           <Route path="/all-course" element={<AllCourse/>} />
           <Route path="/assign-course" element={<AssignCourse/>} />
           <Route path="/enrool-course" element={<EnroolCourse/>}/>
         
      </Routes>
      </main>
      </div>
    </Router>
  );
};

export default AdminRoutes;
