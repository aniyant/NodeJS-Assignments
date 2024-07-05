const express = require('express');
const { loginAdmin, registerAdmin } = require('../controllers/authController');
const authRouter = express.Router();

authRouter.post('/loginAdmin',loginAdmin);
authRouter.post('/registerAdmin',registerAdmin);

module.exports = authRouter;