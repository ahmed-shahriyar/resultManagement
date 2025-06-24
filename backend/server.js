const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/api', require('./routes/students'));

// Start server

app.listen(3001, () => {
    console.log('Backend running In http://localhost:3001');
  });