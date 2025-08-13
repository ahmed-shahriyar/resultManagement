import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserPlus,
  Book,
  BookPlus,
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    teacher: false,
    student: false,
    course: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus({ ...openMenus, [menu]: !openMenus[menu] });
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>
          <LayoutDashboard size={24} /> Admin Panel
        </h2>
        <ul className="sidebar-menu">
          {/* Dashboard Menu */}
          <li>
            <Link to="/admin-route" className="menu-item">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Teacher Menu */}
          <li onClick={() => toggleMenu("teacher")}>
            <div className="menu-item">
              <Users size={20} />
              <span>Teacher</span>
              {openMenus.teacher ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {openMenus.teacher && (
              <ul className="submenu">
                <li>
                  <Link to="all-teacher">
                    <Users size={16} /> All Teachers
                  </Link>
                </li>
                <li>
                  <Link to="add-teacher">
                    <UserPlus size={16} /> Add Teacher
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Student Menu */}
          <li onClick={() => toggleMenu("student")}>
            <div className="menu-item">
              <Users size={20} />
              <span>Student</span>
              {openMenus.student ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {openMenus.student && (
              <ul className="submenu">
                <li>
                  <Link to="all-student">
                    <Users size={16} /> All Students
                  </Link>
                </li>
                <li>
                  <Link to="add-student">
                    <UserPlus size={16} /> Add Student
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Course Menu */}
          <li onClick={() => toggleMenu("course")}>
            <div className="menu-item">
              <Book size={20} />
              <span>Course Management</span>
              {openMenus.course ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {openMenus.course && (
              <ul className="submenu">
                <li>
                  <Link to="add-course">
                    <BookPlus size={16} /> Add Course
                  </Link>
                </li>
                <li>
                  <Link to="all-course">
                    <Book size={16} /> All Courses
                  </Link>
                </li>
                <li>
                  <Link to="assign-course">
                    <Users size={16} /> Assign Course
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default AdminSidebar;
