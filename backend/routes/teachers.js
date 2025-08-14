// routes/teachers.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /add-teacher - Add a new teacher
router.post('/add-teacher', (req, res) => {
  const { T_ID, Name, DOB, Dept, Faculty, Salary, Email } = req.body;

  if (!T_ID || !Name || !DOB || !Dept || !Faculty || !Salary || !Email) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    INSERT INTO Teacher (T_ID, Name, Join_Date, Dept, Faculty, Salary, Email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [T_ID, Name, DOB, Dept, Faculty, Salary, Email], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json({ message: "Teacher added successfully!" });
  });
});

router.get('/',(req,res)=>
{
   const sql = `SELECT * FROM Teacher`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch error:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json(results); // Return all teacher records as JSON
  });
});

// Delet Teacher
router.delete('/delete-teacher/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Teacher WHERE T_ID = ?', [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ error: "Database delete error." });
    }
    res.status(200).json({ message: "Teacher deleted successfully!" });
  });
});

//Updatr
router.put('/update-teacher/:id', (req, res) => {
  const { id } = req.params;
  const { Name, DOB, Dept, Faculty, Email } = req.body;

  if (!Name || !DOB || !Dept || !Faculty || !Email) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    UPDATE teacher
    SET Name = ?, Date_join = ?, Dept = ?, Faculty = ?, Email = ?
    WHERE T_ID = ?
  `;

  db.query(sql, [Name, DOB, Dept, Faculty, Email, id], (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ error: "Update failed." });
    }
    res.status(200).json({ message: "Teacher updated successfully!" });
  });
});


// get teacher profile
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
 

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid Teacher ID' });
  }
   console.log("Received ID:", id);

  db.query('SELECT * FROM teacher WHERE T_ID = ?', [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(result[0]);
  });
});

module.exports = router;
