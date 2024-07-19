const express = require('express');
const { signup, verifyOtp, signin, signout, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/signin', signin);
router.get('/signout', signout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/protected', protect, (req, res) => {
    res.json({ message: 'Welcome to the protected route!' });
});

module.exports = router;
