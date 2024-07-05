const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const DBConnect = require('./config/database/db');
const MovieModel = require('./models/movieModel');
const MovieRouter = require('./Routes/allRoutes');

dotenv.config();

//constants from env

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the movie store API');
})
app.use('/movies', MovieRouter);

app.listen(port, (req, res)=>{
    console.log(`Server is running on port ${port}`);
    DBConnect(dbUrl);
})