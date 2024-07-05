const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const movieRouter = require('./src/routes/allRoutes');

const app = express();
dotenv.config();

// app level middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// app level routes
app.get('/', (req, res) => {
    res.status(200).send('This is the home page of the movie listing.');
}
);

// movie routes
app.use('/movies',movieRouter);


// listen server

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
