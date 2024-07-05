const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

// const MONGO_URI=`mongodb+srv://sunny:sunnykumar@cluster0.d6rrq.mongodb.net/masai?retryWrites=true&w=majority&appName=Cluster0`


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(process.env.MONGO_URI,clientOptions)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {console.log('error',err);});
// console.log(mongoose);
app.get('/', function(req, res){
  res.send('Hello from the server!');
});

app.use('/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
