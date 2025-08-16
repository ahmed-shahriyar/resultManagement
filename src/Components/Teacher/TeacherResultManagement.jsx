import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert
} from '@mui/material';

const TeacherResultManagement = ({ teacherId }) => {
  // Form state
  const [form, setForm] = useState({
    session: '',
    semester: '',
    courseCode: '',
    examType: ''
  });

  // Data states
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});

  // Status states
  const [loading, setLoading] = useState({
    courses: false,
    students: false,
    submission: false
  });
  const [error, setError] = useState({
    courses: '',
    students: '',
    submission: ''
  });

  // Constants
  const semesters = ['Spring', 'Summer', 'Fall'];
  const examTypes = ['Assignment', 'Mid', 'Final'];

  // Fetch courses for the teacher
useEffect(() => {
  const fetchCourses = async () => {
    if (!teacherId) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/result/teacher/${teacherId}`);
      console.log('Courses API Response:', res.data); // <-- check console
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  fetchCourses();
}, [teacherId]);

  // Fetch students when filters change
  useEffect(() => {
    const fetchStudents = async () => {
      const { session, semester, courseCode } = form;
      if (!session || !semester || !courseCode) return;

      setLoading(prev => ({ ...prev, students: true }));
      setError(prev => ({ ...prev, students: '' }));
      
      try {
        const res = await axios.get(
          `http://localhost:5000/api/result/students?session=${session}&semester=${semester}&courseCode=${courseCode}`
        );
        
        if (!res.data || res.data.length === 0) {
          setError(prev => ({ ...prev, students: 'No students found for these filters' }));
          return;
        }
        
        setStudents(res.data);
        setMarks({});
      } catch (err) {
        console.error('Failed to fetch students:', err);
        const errorMessage = err.response?.data?.error || 
                            err.message || 
                            'Failed to fetch students';
        setError(prev => ({ ...prev, students: errorMessage }));
      } finally {
        setLoading(prev => ({ ...prev, students: false }));
      }
    };
    
    fetchStudents();
  }, [form.session, form.semester, form.courseCode]);

  // Handlers
  const handleChange = e => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = ${value}`);
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleMarkChange = (studentId, value) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setMarks(prev => ({ ...prev, [studentId]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validate all marks are entered
    const missingMarks = students.some(student => !marks[student.ID]);
    if (missingMarks) {
      setError(prev => ({ ...prev, submission: 'Please enter marks for all students' }));
      return;
    }

    const payload = {
      ...form,
      results: Object.entries(marks).map(([studentId, mark]) => ({
        studentId,
        mark: Number(mark)
      }))
    };

    setLoading(prev => ({ ...prev, submission: true }));
    setError(prev => ({ ...prev, submission: '' }));
    
    try {
      await axios.post('http://localhost:5000/api/result/add-multiple', payload);
      
      // Reset form on success
      setForm({
        session: '',
        semester: '',
        courseCode: '',
        examType: ''
      });
      setStudents([]);
      setMarks({});
      setError(prev => ({ ...prev, submission: 'Marks submitted successfully!' }));
    } catch (err) {
      console.error('Error submitting result:', err);
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          'Submission failed';
      setError(prev => ({ ...prev, submission: errorMessage }));
    } finally {
      setLoading(prev => ({ ...prev, submission: false }));
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
          Student Marks Management
        </Typography>
        
        {/* Error alerts */}
        {error.courses && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.courses}
          </Alert>
        )}
        
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          {/* Filter section */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Academic Session"
              name="session"
              value={form.session}
              onChange={handleChange}
              required
              fullWidth
              sx={{ flex: 1 }}
              placeholder="e.g., 2023-2024"
            />
            
            <FormControl required sx={{ flex: 1 }}>
              <InputLabel>Semester</InputLabel>
              <Select
                name="semester"
                value={form.semester}
                label="Semester"
                onChange={handleChange}
              >
                <MenuItem value="">Select Semester</MenuItem>
                {semesters.map(sem => (
                  <MenuItem key={sem} value={sem}>{sem}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl required fullWidth error={!!error.courses}>
              <InputLabel>Course</InputLabel>
              <Select
                name="courseCode"
                value={form.courseCode}
                label="Course"
                onChange={handleChange}
                disabled={loading.courses}
              >
                <MenuItem value="" disabled>
                  {loading.courses ? 'Loading courses...' : 'Select Course'}
                </MenuItem>
                {courses.map(course => (
                  <MenuItem key={course.Code} value={course.Code}>
                    {course.Code} - {course.Title}
                  </MenuItem>
                ))}
              </Select>
              {error.courses && (
                <FormHelperText>{error.courses}</FormHelperText>
              )}
            </FormControl>
            
            <FormControl required sx={{ flex: 1 }}>
              <InputLabel>Exam Type</InputLabel>
              <Select
                name="examType"
                value={form.examType}
                label="Exam Type"
                onChange={handleChange}
              >
                <MenuItem value="">Select Exam Type</MenuItem>
                {examTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          {/* Students loading indicator */}
          {loading.students && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          )}
          
          {/* Students error */}
          {error.students && (
            <Alert severity="error">{error.students}</Alert>
          )}
          
          {/* Students table */}
          {students.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell width="150px">Marks (0-100)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map(student => (
                    <TableRow key={student.ID}>
                      <TableCell>{student.ID}</TableCell>
                      <TableCell>{student.Name}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={marks[student.ID] || ''}
                          onChange={e => handleMarkChange(student.ID, e.target.value)}
                          required
                          fullWidth
                          inputProps={{ 
                            min: 0, 
                            max: 100,
                            step: "0.01"
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          {/* Submission status */}
          {error.submission && (
            <Alert 
              severity={
                error.submission.includes('success') ? 'success' : 'error'
              }
            >
              {error.submission}
            </Alert>
          )}
          
          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={
              students.length === 0 || 
              loading.submission || 
              Object.keys(marks).length !== students.length
            }
            sx={{ 
              alignSelf: 'flex-start', 
              mt: 2,
              minWidth: '150px'
            }}
          >
            {loading.submission ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Submit Marks'
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TeacherResultManagement;