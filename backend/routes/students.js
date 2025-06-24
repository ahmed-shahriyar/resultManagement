// routes/student.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get profile info
router.get('/student/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Student WHERE ID = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});



// Get semesters
router.get('/semesters/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT DISTINCT c.Semester FROM Course c JOIN Takes t ON c.Code = t.Code WHERE t.ID = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result.map(r => r.Semester));
  });
});

// Get result by semester
router.get('/results/:id', (req, res) => {
  const { id } = req.params;
  const { semester } = req.query;

  const query = `
    SELECT c.Title, r.Assignment, r.Mid, r.Final
    FROM Result r
    JOIN Course c ON r.Code = c.Code
    WHERE r.ID = ? AND c.Semester = ?
  `;

  db.query(query, [id, semester], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
