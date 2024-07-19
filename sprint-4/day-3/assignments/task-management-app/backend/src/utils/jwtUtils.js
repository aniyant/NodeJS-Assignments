const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = (user) => {
    return jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};
