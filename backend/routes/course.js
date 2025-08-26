// routes/course.js
const express = require('express');
const router = express.Router();
const db = require('../db');
//Admin
//Add Couse
router.post('/add-course', (req, res) => {
  const { Code, Title, Credit, Semester, Dept } = req.body;

  // Basic validation
  if (!Code || !Title || !Credit || !Semester || !Dept) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    INSERT INTO Course (Code, Title, Credit, Semester, Dept)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [Code, Title, Credit, Semester, Dept], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json({ message: "Course added successfully!" });
  });
});

//-----------------Assign Course-------------------------
router.post('/assign-course', (req, res) => {
  const { T_ID, Courses } = req.body;

  if (!T_ID || !Array.isArray(Courses) || Courses.length === 0) {
    return res.status(400).json({ error: "Teacher ID and at least one course are required." });
  }

  // Prepare bulk insert values: [(T_ID, course1), (T_ID, course2), ...]
  const values = Courses.map(courseId => [T_ID, courseId]);

  const sql = `
    INSERT INTO teaches (T_ID, Code)
    VALUES ?
  `;

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Database insert error:', err);
      return res.status(500).json({ error: 'Database error while assigning courses.' });
    }
    res.status(200).json({ message: 'Courses assigned successfully!' });
 });
});

//Courses teches by teacher
router.get('/teacher-courses/:id', (req, res) => {
  const teacherId = req.params.id;

  const query = `
    SELECT c.Code, c.Title, c.Credit, c.Semester
    FROM course c
    JOIN teaches  tc ON c.Code = tc.Course_Code
    WHERE tc.T_ID = ?
  `;

  db.query(query, [teacherId], (err, results) => {
    if (err) {
      console.error("Error fetching teacher courses:", err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// COurse By semester
router.get('/courses/:semester', (req, res) => {
  const semester = req.params.semester; // get semester from URL

  const query = `
    SELECT Code, Title
    FROM course
    WHERE semester = ?
  `;

  db.query(query, [semester], (err, results) => { // use semester here
    if (err) {
      console.error("Error fetching courses:", err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// All Course
router.get('/courses',(req,res)=>
{
   const sql = `SELECT * FROM course`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch error:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json(results); // Return all teacher records as JSON
  });
});

//Semester
router.get('/semesters',(req,res)=>
{
   const sql = `SELECT DISTINCT semester FROM course`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch error:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json(results); // Return all teacher records as JSON
  });
});

//Teacher Course
router.get('/teacher/:teacherId', (req, res) => {
  const teacherId = parseInt(req.params.teacherId);

  if (isNaN(teacherId)) {
    return res.status(400).json({ error: 'Invalid teacher ID' });
  }

  console.log("Received teacherId:", teacherId);

  const sql = `
    SELECT c.Code, c.Title, c.Credit, c.Semester
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

    res.json(results); // return all matched courses
  });
});

//Emrool COurse

router.post('/enroll', (req, res) => {
  const { ID, Semester, Code } = req.body;

  if (!ID || !Code) {
    return res.status(400).json({ error: 'Student ID and Course Code are required' });
  }

  const sql = `INSERT INTO takes (ID, Code) VALUES (?, ?)`;

  db.query(sql, [ID, Code], (err, result) => {
    if (err) {
      console.error('Database insert error:', err);
      return res.status(500).json({ error: 'Database error while assigning courses.' });
    }
    res.status(200).json({ message: 'Course assigned successfully!' });
  });
});

module.exports = router; 
