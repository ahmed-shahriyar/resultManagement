import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom'; 
import 'jspdf-autotable';
import './StudentResult.css';

const StudentResult = () => {
   const { studentId } = useParams();
  const [semester, setSemester] = useState('');
  const [semesters, setSemesters] = useState([]);
  const [results, setResults] = useState([]);
useEffect(() => {
  axios.get(`http://localhost:5000/api/semesters/${studentId}`)
    .then(res => {
      setSemesters(res.data);
      console.log('Fetched results:', res.data);  // <-- inside then block
    })
    .catch(err => console.error('Semester load failed:', err));
}, [studentId]);


  useEffect(() => {
    if (semester) {
      axios.get(`http://localhost:5000/api/result/${studentId}?semester=${semester}`)
        .then(res => setResults(res.data))
        .catch(err => console.error('Result fetch failed:', err));
    }
  }, [semester, studentId]);

  const getLetterGrade = (total) => {
    if (total >= 80) return 'A+';
    if (total >= 75) return 'A';
    if (total >= 70) return 'A-';
    if (total >= 65) return 'B+';
    if (total >= 60) return 'B';
    if (total >= 55) return 'B-';
    if (total >= 50) return 'C+';
    if (total >= 45) return 'C';
    if (total >= 40) return 'D';
    return 'F';
  };

  const getGradePoint = (grade) => {
    const map = {
      'A+': 4.00,
      'A': 3.75,
      'A-': 3.50,
      'B+': 3.25,
      'B': 3.00,
      'B-': 2.75,
      'C+': 2.50,
      'C': 2.25,
      'D': 2.00,
      'F': 0.00
    };
    return map[grade] || 0;
  };

  const calculateGPA = () => {
    if (results.length === 0) return 0;
    const totalGP = results.reduce((acc, row) => {
      const total = row.Assignment + row.Mid + row.Final;
      const grade = getLetterGrade(total);
      return acc + getGradePoint(grade);
    }, 0);
    return (totalGP / results.length).toFixed(2);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Result Sheet - Semester: ${semester}`, 14, 16);

    const tableData = results.map(row => {
      const total = row.Assignment + row.Mid + row.Final;
      const grade = getLetterGrade(total);
      return [row.Title, grade];
    });

    doc.autoTable({ head: [['Course Title', 'Grade']], body: tableData, startY: 20 });
    doc.text(`GPA: ${calculateGPA()}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save(`Result_${semester}.pdf`);
  };

  return (
    <div className="result-container">
      <h2 className="result-title">View Result</h2>
      <div className="dropdown-wrapper">
        <label>Select Semester:</label>
        <select
          className="result-dropdown"
          value={semester}
          onChange={e => setSemester(e.target.value)}
        >
          <option value="">-- Select Semester --</option>

         {semesters.map((s, index) => (
    <option key={index} value={s.semester}>{s.semester}</option>
  ))}
        </select>
      </div>

      {results.length > 0 ? (
        <>
          <table className="result-table">
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => {
                const total = row.Assignment + row.Mid + row.Final;
                const grade = getLetterGrade(total);
                return (
                  <tr key={index}>
                    <td>{row.Title}</td>
                    <td>{grade}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="gpa-section">
            <p><strong>GPA:</strong> {calculateGPA()}</p>
            <button className="export-btn" onClick={exportPDF}>Export as PDF</button>
          </div>
        </>
      ) : semester && (
        <p>No results found for this semester.</p>
      )}
    </div>
  );
};

export default StudentResult;
