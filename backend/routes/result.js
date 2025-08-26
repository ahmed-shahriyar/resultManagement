
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

router.get("/students", (req, res) => {
  const { session, course } = req.query;

  if (!session || !course) {
    return res.status(400).json({ error: "Session and course are required" });
  }

  const query = "SELECT ID as id , Name as name FROM student s JOIN takes t ON s.ID =t.ID  WHERE session = ? AND course_code = ?";
  db.query(query, [session, course], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/marks", (req, res) => {
  const { course, examType, marks } = req.body; // marks = { studentId: mark }

  const queries = Object.keys(marks).map(studentId => {
    const mark = Number(marks[studentId]);
    if (isNaN(mark) || mark < 0 || mark > 100) return null;

    // UPSERT query
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO result (ID, Code, ${examType})
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE ${examType} = ?
      `;
      db.query(sql, [studentId, course, mark, mark], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }).filter(q => q !== null);

  Promise.all(queries)
    .then(() => res.json({ message: `${examType} marks saved successfully!` }))
    .catch(err => res.status(500).json({ error: err.message }));
});



// Get Individula Result
// Helper: Get letter grade
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

const gradePointsMap = {
  'A+': 4.00, 'A': 3.75, 'A-': 3.50,
  'B+': 3.25, 'B': 3.00, 'B-': 2.75,
  'C+': 2.50, 'C': 2.25, 'D': 2.00, 'F': 0.00
};

// API: Fetch individual student result
router.get("/individual", (req, res) => {
   const studentId = parseInt(req.query.studentId);
  const semester = req.query.semester;

  // Check for invalid ID
  if (!studentId || isNaN(studentId)) {
    return res.status(400).json({ message: "Invalid Student ID" });
  }

  if (!semester) {
    return res.status(400).json({ message: "Semester is required" });
  }

  const query = `
    SELECT c.Title, c.Semester, t.Code, r.Assignment, r.Mid, r.Final
    FROM takes t
    JOIN course c ON t.Code = c.Code
    LEFT JOIN result r ON t.ID = r.ID AND t.Code = r.Code
    WHERE t.ID = ? AND c.Semester = ?
  `;

  db.query(query, [studentId, semester], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ courses: results });
  });
});

// API: Fetch all semesters for
module.exports = router; 
