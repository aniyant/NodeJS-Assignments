const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const Token = require('../models/Token');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = async (user) => {
  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  await new Token({ token, userId: user._id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }).save();
  return token;
};

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).send('User already exists.');

    user = new User({ username, password });
    await user.save();

    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: info ? info.message : 'Login failed', user });
    }
    req.login(user, { session: false }, async (err) => {
      if (err) {
        return res.send(err);
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);
      return res.status(200).json({ accessToken, refreshToken });
    });
  })(req, res, next);
});

router.post('/token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).send('No refresh token provided.');

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const tokenRecord = await Token.findOne({ token: refreshToken, userId: decoded.id });
    if (!tokenRecord) return res.status(401).send('Invalid refresh token.');

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).send('User not found.');

    const newAccessToken = generateAccessToken(user);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/logout', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).send('No refresh token provided.');

  try {
    await Token.findOneAndDelete({ token: refreshToken });
    res.status(200).send('Logged out successfully.');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
