const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const productRoutes = require('./routes/products');
const errorHandling = require('./middlewares/errorHandling');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);

app.use(errorHandling);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
