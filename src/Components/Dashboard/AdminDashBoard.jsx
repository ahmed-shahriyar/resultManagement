import React from "react";
import { Users, BookOpen, DollarSign, GraduationCap } from "lucide-react";
import "./AdminDashBoard.css"; // attach css file

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
  // Stat data
  const stats = [
    { title: "Total Students", value: "1,245", icon: <Users size={24} color="#fff" />, color: "blue" },
    { title: "Total Teachers", value: "87", icon: <GraduationCap size={24} color="#fff" />, color: "green" },
    { title: "Classes", value: "32", icon: <BookOpen size={24} color="#fff" />, color: "purple" },
    { title: "Fees Collected", value: "$45,000", icon: <DollarSign size={24} color="#fff" />, color: "orange" },
  ];

  // Activity data
  const activities = [
    { id: 1, activity: "New student admitted", time: "2 hrs ago" },
    { id: 2, activity: "Teacher added result", time: "5 hrs ago" },
    { id: 3, activity: "Fee payment received", time: "1 day ago" },
    { id: 4, activity: "New course created", time: "2 days ago" },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

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
