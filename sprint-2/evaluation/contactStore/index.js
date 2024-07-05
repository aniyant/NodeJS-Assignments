const express = require('express');
const dotenv = require('dotenv');
const contactRouter = require('./routes/contactRoutes');
const sequelize = require('./config/database');
const morgan = require('morgan');
const authRouter = require('./routes/authRoutes');
const authenticate = require('./middlewares/auth');
dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.status(200).send("This is home page");
})

app.use('/api',contactRouter);
app.use('/auth',authRouter);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    sequelize.sync()
       .then(() => console.log('Database connected successfully.'))
       .catch(err => console.error('Unable to connect to the database:', err));
});
