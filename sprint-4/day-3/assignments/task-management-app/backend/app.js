const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const subtaskRoutes = require('./routes/subtaskRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const { sequelize } = require('./models');

const app = express();

app.use(bodyParser.json());

app.use('/api', taskRoutes);
app.use('/api', subtaskRoutes);
app.use('/api', userRoutes);

app.use(errorHandler);

sequelize.sync();

module.exports = app;
