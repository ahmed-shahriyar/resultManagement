const express = require('express');
const router = express.Router();
const db = require('../db'); // your database connection module

// GET semesters for a student by studentId
router.get('/:studentId', (req, res) => {
  const studentId = Number(req.params.studentId);
  if (isNaN(studentId)) {
    return res.status(400).json({ error: 'Invalid student ID' });
  }

  const sql = `
    SELECT DISTINCT c.semester FROM course c JOIN takes t on c.Code = t.code WHERE t.ID = ?`;

  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No courses found for this student' });
    }

    res.json(results);
  });
});



module.exports = router;
