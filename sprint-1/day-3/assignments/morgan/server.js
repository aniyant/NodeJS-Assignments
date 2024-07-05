// index.js
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

// Create a write stream (in append mode)

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'src', 'access.log'), { flags: 'a' });

// Setup the logger
app.use(morgan(':method :status :res[content-length] - :response-time ms :date[clf] :http-version :url', {
  stream: accessLogStream
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/get-users', (req, res) => {
  res.status(200).send('Users List');
});

app.post('/add-user', (req, res) => {
  res.status(201).send('User added successfully');
});

app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  res.status(201).send(`User with id ${id} updated successfully`);
});

app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  res.send(`User with id ${id} deleted successfully`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
