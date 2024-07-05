const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticate(req, res,next){
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
        if(err) return res.status(403).send('Access denied. Invalid token.');
        req.user = user;
        next();
    });
}

module.exports = authenticate;
