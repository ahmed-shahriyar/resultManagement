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




//Batch result

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

router.get("/batch", (req, res) => {
  const semester = req.query.semester;
  console.log(semester);

  if (!semester) {
    return res.status(400).json({ message: "Semester is required" });
  }

  const query = `
    SELECT s.ID AS studentId, s.Name AS studentName, c.Code AS courseCode, c.Title AS courseTitle,
           r.Assignment, r.Mid, r.Final
    FROM student s
    JOIN takes t ON s.ID = t.ID
    JOIN course c ON t.Code = c.Code
    LEFT JOIN result r ON t.ID = r.ID AND t.Code = r.Code
    WHERE c.Semester = ?
    ORDER BY s.ID, c.Code
  `;

  db.query(query, [semester], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    // Group results by student
    const batchResults = {};
    results.forEach(r => {
      const totalMarks = (r.Assignment || 0) + (r.Mid || 0) + (r.Final || 0);
      const grade = getLetterGrade(totalMarks);

      if (!batchResults[r.studentId]) {
        batchResults[r.studentId] = {
          studentId: r.studentId,
          studentName: r.studentName,
          courses: [],
          gpa: 0
        };
      }

      batchResults[r.studentId].courses.push({
        code: r.courseCode,
        title: r.courseTitle,
        marks: totalMarks,
        grade
      });
    });

    // Calculate GPA for each student
    Object.values(batchResults).forEach(student => {
      const totalPoints = student.courses.reduce(
        (sum, c) => sum + gradePointsMap[c.grade], 0
      );
      student.gpa = (totalPoints / student.courses.length).toFixed(2);
    });

    res.json(Object.values(batchResults));
  });
});

//Individual
router.get("/individual", (req, res) => {
  console.log("Individual");

  const studentId = parseInt(req.query.studentId, 10); // from query
  const semester = req.query.semester;
  console.log(studentId, semester);

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

    console.log("DB results:", results);

    // Process results
    let totalPoints = 0;
    const processedCourses = results.map(course => {
      const assignment = course.Assignment || 0;
      const mid = course.Mid || 0;
      const final = course.Final || 0;
      const totalMarks = assignment + mid + final;

      const grade = getLetterGrade(totalMarks);
      const gradePoint = gradePointsMap[grade];

      totalPoints += gradePoint;

      return {
        Code: course.Code,
        Title: course.Title,
        Assignment: assignment,
        Mid: mid,
        Final: final,
        TotalMarks: totalMarks,
        Grade: grade,
        GradePoint: gradePoint
      };
    });

    // Calculate GPA (simple average of grade points)
    const gpa = processedCourses.length > 0 ? (totalPoints / processedCourses.length).toFixed(2) : 0;

    res.json({ courses: processedCourses, gpa });
  });
});

//Add mark
router.get("/students", (req, res) => {
  const { session, course } = req.query;
  console.log(course);
  if (!session || !course) {
    return res.status(400).json({ error: "Session and course are required" });
  }

  const query = "SELECT s.ID as id , Name as name FROM student s JOIN takes t ON s.ID =t.ID  WHERE Code = ?";
  db.query(query, [ course], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log(results);
    res.json(results);
  });
});


// Add student Mark
router.post("/marks", (req, res) => {
  const { course, examType, marks } = req.body; // marks = { studentId: mark }
   console.log(req.body);

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


module.exports = router; 
