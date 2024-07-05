const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
const { DBConnectUsingMongdbDriver } = require('./src/config/database2');

let collection;

dotenv.config();

const app = express();

// Connect to database
// connectDB();
DBConnectUsingMongdbDriver();

app.use(morgan('dev'));
app.use(express.json());

app.get('/',(req,res)=>{
  res.status(200).send("This is a homepage.");
})

// Use routes
app.use('/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
