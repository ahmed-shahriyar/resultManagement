import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet  } from 'react-router-dom';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminSidebar from './Components/Admin/Sidebar/AdminSidebar'
import IconsWithNavigation from './Components/Admin/AdminRouting/IconsWithNavigation'
import AdminDashboard from './Components/Dashboard/AdminDashboard'
import TeacherDashboard from './Components/Dashboard/TeacherDashboard'
import StudentDashboard from './Components/Dashboard/StudentDashboard'
import AddStudent from './Components/Admin/StudentManagement/AddStudent'
import AllStudent from './Components/Admin/StudentManagement/AllStudent'
import AddTeacher from './Components/Admin/TeacherManagement/AddTeacher'
import AllTeacher from './Components/Admin/TeacherManagement/AllTeacher'
import AddCourse from './Components/Admin/CourseManagement/AddCourse'
import AllCourse from './Components/Admin/CourseManagement/AllCourse'
import AssignCourse from './Components/Admin/CourseManagement/AssignCourse'
import TeacherLogin from './Components/Login/TeacherLogin'
import TeacherProfile from './Components/Teacher/TeacherProfile'
import TeacherResultManagement from './Components/Teacher/TeacherResultManagement'
import TeacherCourses from './Components/Teacher/TeacherCourses'
import StudentLogin from './Components/StudentLogin/StudentLogin'
import StudentProfile from './Components/Student/StudentProfile'
import StudentResult from './Components/Student/StudentResult'
// Inline layout for admin with sidebar
const AdminLayout = () => (
  <div style={{ display: "flex" }}>
    <AdminSidebar />
    <main style={{ flex: 1, padding: "20px" }}>
      <Outlet />
    </main>
  </div>
);


function App() {
  

  return (
    <Router>
      <Routes>
        {/* Landing with Icons */}
        <Route path="/" element={<IconsWithNavigation />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="all-student" element={<AllStudent />} />
          <Route path="add-teacher" element={<AddTeacher />} />
          <Route path="all-teacher" element={<AllTeacher />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="all-course" element={<AllCourse />} />
          <Route path="assign-course" element={<AssignCourse />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLogin />} />
        <Route path="/dashboard/:teacherId" element={<TeacherDashboard />}>
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="result" element={<TeacherResultManagement />} />
          <Route path="course" element={<TeacherCourses />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/dashboard/:studentId" element={<StudentDashboard />}>
          <Route path="profile" element={<StudentProfile />} />
          <Route path="result" element={<StudentResult />} />
        </Route>
      </Routes>
    </Router>
  );
};


export default App
