
// routes/student.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/result/add-multiple', (req, res) => {
  const { session, semester, courseCode, examType, results } = req.body;

  if (!session || !semester || !courseCode || !examType || !Array.isArray(results)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const values = results.map(({ studentId, mark }) => [
    studentId,
    courseCode,
    session,
    semester,
    examType,
    mark
  ]);

  const query = `
    INSERT INTO Result (Student_ID, Course_Code, Session, Semester, Exam_Type, Mark)
    VALUES ?
    ON DUPLICATE KEY UPDATE Mark = VALUES(Mark)
  `;

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error inserting results:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Results submitted successfully', affectedRows: result.affectedRows });
  });
});


router.get('/:studentId', (req, res) => {
  const studentId = Number(req.params.studentId);
  const semester = req.query.semester;
  console.log('StudentId:', studentId, 'Semester:', semester);


  if (!semester) {
    return res.status(400).json({ error: 'Semester is required' });
  }

  const sql = 
  `  SELECT *
FROM course c JOIN result r ON c.Code = r.Code 
WHERE r.ID =? AND c.semester =?`;
  ;

  db.query(sql, [studentId, semester], (err, results) => {
    if (err) {
      console.error('Error fetching results:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
});

//
router.get('/teacher/:teacherId', (req, res) => {
  const teacherId = parseInt(req.params.teacherId);

  if (isNaN(teacherId)) {
    return res.status(400).json({ error: 'Invalid teacher ID' });
  }

  console.log("Received teacherId:", teacherId);

  const sql = `
    SELECT c.Code, c.Title
    FROM Course c
    JOIN teaches tc ON c.Code = tc.Code 
    WHERE tc.T_ID = ?
  `;

  db.query(sql, [teacherId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No courses found for this teacher' });
    }

    // Convert RowDataPacket to plain objects
    const courses = results.map(row => ({
      Code: row.Code,
      Title: row.Title,
    }));

    console.log('Courses sent to frontend:', courses);

    // Send the plain JSON instead of raw results
    res.json(courses);
  });
});

module.exports = router; 
