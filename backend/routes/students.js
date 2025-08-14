const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all students (GET /api/students)
router.get('/', (req, res) => {
  const sql = `SELECT * FROM student`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch error:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json(results);
  });
});

// Get semesters info for a student (GET /api/students/semesters/:id)
router.get('/semesters/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    'SELECT * FROM course c JOIN takes t on c.Code = t.code WHERE t.ID = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
      if (result.length === 0) return res.status(404).json({ error: 'Student not found' });
      res.json(result);
    }
  );
});

// Get student by ID (GET /api/students/:id)
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log("Backend received ID:", id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid student ID' });
  }

  db.query('SELECT * FROM student WHERE ID = ?', [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(result[0]);
  });
});

// Add a new student (POST /api/students/add-student)
router.post('/add-student', (req, res) => {
  const { ID, Name, DOB, Email, Phone, Session } = req.body;
  if (!ID || !Name || !DOB || !Email || !Phone || !Session) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    INSERT INTO Student (ID, Name, DOB, Email, Phone, Session)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [ID, Name, DOB, Email, Phone, Session], (err, result) => {
    if (err) {
      console.error("Database insert error:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json({ message: "Student added successfully!" });
  });
});

module.exports = router;
