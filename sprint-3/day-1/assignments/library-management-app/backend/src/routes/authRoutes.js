const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers/authControllers');

const authRouter = Router();

//auth routes
authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser)

module.exports = authRouter;