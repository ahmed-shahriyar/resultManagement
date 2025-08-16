import React from "react";
import { Users, BookOpen, FileCheck, Timer } from "lucide-react";
import "./AdminDashBoard.css";

// Reusable Card Component
const Card = ({ title, value, icon, color }) => {
  return (
    <div className="card">
      <div className={`card-icon ${color}`}>{icon}</div>
      <div>
        <p className="card-title">{title}</p>
        <h2 className="card-value">{value}</h2>
      </div>
    </div>
  );
};

const AdminDashBoard = () => {
  // Stat data for University Result Management
  const stats = [
    { title: "Total Students", value: "3,520", icon: <Users size={24} color="#fff" />, color: "blue" },
    { title: "Total Courses", value: "156", icon: <BookOpen size={24} color="#fff" />, color: "green" },
    { title: "Results Published", value: "1,120", icon: <FileCheck size={24} color="#fff" />, color: "purple" },
    { title: "Pending Results", value: "245", icon: <Timer size={24} color="#fff" />, color: "orange" },
  ];

  // Recent activities related to results
  const activities = [
    { id: 1, activity: "Result published for CSE 3rd Semester", time: "2 hrs ago" },
    { id: 2, activity: "GPA updated for Student ID 202312", time: "6 hrs ago" },
    { id: 3, activity: "Course MAT201 added", time: "1 day ago" },
    { id: 4, activity: "Pending results decreased by 20", time: "2 days ago" },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">University Result Management Dashboard</h1>

      {/* Stats Cards */}
      <div className="cards-container">
        {stats.map((stat, index) => (
          <Card
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Recent Activities */}
      <div className="activities">
        <h2 className="activities-title">Recent Activities</h2>
        <table className="activities-table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((item) => (
              <tr key={item.id}>
                <td>{item.activity}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashBoard;
