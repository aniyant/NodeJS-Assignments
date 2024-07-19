const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const MongoStore = require("connect-mongo");
const session = require("express-session");
const authRouter = require('./src/routes/authRoutes');
const auth = require('./src/middlewares/auth');
const connectToDB = require('./src/config/db');
const role = require('./src/middlewares/role');
const bookRouter = require('./src/routes/bookRoutes');
const swaggerUi = require('swagger-ui-express');
const openapiSpecification = require('./src/config/jsDocs');

// load environment variables
dotenv.config();
port = process.env.PORT || 4500;

// initialize express app
const app = express();

// middleware setup
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI}),
    cookie: {
      // secure: true,
      httpOnly: true,
    },
  })
);

// home root;

app.get('/', (req, res) => {
  res.send('Hello, from the server!');
});
app.get('/test',auth,role(['user']), (req, res) => {
  res.json({ msg: 'This is a test route of authentication' });
})
app.use('/auth', authRouter);
app.use('/books', bookRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// app listening on port
app.listen(port, () =>{
  connectToDB(process.env.MONGO_URI);
  console.log(`Server running on port ${port}`)
});