// index.js
const express = require('express');
const {validateRequest} = require('./middleware/validateRequest');

const app = express();
app.use(express.json());


app.post('/', validateRequest, (req, res) => {
    res.status(200).send('data received');
})

// app.use((req, res) => {
//     res.status(404).send('Not Found');
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
