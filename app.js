// app.js
const express = require('express');
const path = require('path');
const connection = require('./config');
const app = express();
const PORT = process.env.APP_PORT;

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para buscar estudiantes
app.get('/student/:id', (req, res) => {
  const studentId = req.params.id;
  const query = 'SELECT * FROM students WHERE id = ?';

  connection.query(query, [studentId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching student data' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    const student = results[0];
    res.json({ name: student.name, score: student.score });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//miau