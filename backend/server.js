const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/students', require('./routes/students'));
app.use('/api/course', require('./routes/course'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/result', require('./routes/result'));
app.use('/api/semesters', require('./routes/semesters'));




// Start server

app.listen(5000, () => {
    console.log('Backend running In http://localhost:5000');
  });