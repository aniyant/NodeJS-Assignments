const jwt = require('jsonwebtoken');

const auth = async(req,res,next) => {
    // const token = req.header.get('Authorization').split(' ')[1];
    const token = req.session.token;
    // console.log(token);
    if(!token) return res.status(401).json({message: 'No token provided.'});
    try{
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("req.users",req.user);
        next();
    }
    catch(err){
        res.status(400).json({message: 'Invalid token.',error:err.message});
    }
}

module.exports = auth;