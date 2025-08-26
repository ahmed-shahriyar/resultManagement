// App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Admin
import AdminSidebar from './Components/Admin/Sidebar/AdminSidebar';
import IconsWithNavigation from './Components/Admin/AdminRouting/IconsWithNavigation';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import AddStudent from './Components/Admin/StudentManagement/AddStudent';
import AllStudent from './Components/Admin/StudentManagement/AllStudent';
import AddTeacher from './Components/Admin/TeacherManagement/AddTeacher';
import AllTeacher from './Components/Admin/TeacherManagement/AllTeacher';
import AddCourse from './Components/Admin/CourseManagement/AddCourse';
import AllCourse from './Components/Admin/CourseManagement/AllCourse';
import AssignCourse from './Components/Admin/CourseManagement/AssignCourse';
import EnroolCourse from './Components/Admin/CourseManagement/EnrollCourse';
import IndividualResult from './Components/Admin/ResultManagement/IndividualResult';

// Teacher
import TeacherLogin from './Components/Login/TeacherLogin';
import TeacherDashboard from './Components/Dashboard/TeacherDashboard';
import TeacherProfile from './Components/Teacher/TeacherProfile';
import TeacherResultManagement from './Components/Teacher/TeacherResultManagement';
import TeacherCourses from './Components/Teacher/TeacherCourses';

// Student
import StudentLogin from './Components/StudentLogin/StudentLogin';
import StudentDashboard from './Components/Dashboard/StudentDashboard';
import StudentProfile from './Components/Student/StudentProfile';
import StudentResult from './Components/Student/StudentResult';

// Admin Layout
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
        {/* Landing with role icons */}
        <Route path="/" element={<IconsWithNavigation />} />

        {/* ==================== ADMIN ROUTES ==================== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="all-student" element={<AllStudent />} />
          <Route path="add-teacher" element={<AddTeacher />} />
          <Route path="all-teacher" element={<AllTeacher />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="all-course" element={<AllCourse />} />
          <Route path="assign-course" element={<AssignCourse />} />
           <Route path="enrool-course" element={<EnroolCourse/>}/>
            <Route path="individual-result" element={<IndividualResult />} />
        </Route>

        {/* ==================== TEACHER ROUTES ==================== */}
        <Route path="/teacher" element={<TeacherLogin />} />
        <Route path="/teacher-dashboard/:teacherId" element={<TeacherDashboard />}>
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="result" element={<TeacherResultManagement />} />
          <Route path="course" element={<TeacherCourses />} />
        </Route>

        {/* ==================== STUDENT ROUTES ==================== */}
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/student-dashboard/:studentId" element={<StudentDashboard />}>
          <Route path="profile" element={<StudentProfile />} />
          <Route path="result" element={<StudentResult />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
