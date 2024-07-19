const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        await sendEmail(user.email, 'OTP Verification', `Your OTP is ${otp}`);

        res.status(201).json({ message: 'User registered. Please check your email for OTP.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'OTP verified. User logged in.', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: 'Please verify your email first.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'User logged in.', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.signout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.json({ message: 'User signed out.' });
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        await sendEmail(user.email, 'Password Reset OTP', `Your OTP is ${otp}`);

        res.json({ message: 'OTP sent to email.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        user.password = newPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: 'Password reset successful.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
