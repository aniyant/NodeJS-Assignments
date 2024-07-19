const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
//Auth controllers

const registerUser = async(req,res) => {
    //code to register user
    const {username,email,password,role} = req.body;
    console.log(username, email, password,role);

    //check all exists 
    if(!email ||!password ||!username) return res.status(400).send('All fields are required');

    //check if username is already exists 
    const usernameExist = await User.findOne({username: username});
    console.log(usernameExist)
    if(usernameExist) return res.status(400).send('username already exists');

    //check if user already exists
    const emailExist = await User.findOne({email: email});
    if(emailExist) return res.status(400).send('user email already exists');

    //create new user
    try{
        const hashedPassword = bcrypt.hashSync(password, 20);
        const newUser = new User({email,password:hashedPassword,username,role});
        newUser.save();
        res.status(200).send('User registered successfully');
    }
    catch(err){
        return res.status(500).send('Error registering user');
    }

}

const loginUser = async (req,res) => {
    //code to login user
    try{
        const {username,password} = req.body;

        if(!username || !password) return res.status(400).send('All fields are required');

        //check if user exists
        const user = await User.findOne({username: username});
        if(!user) return res.status(401).send('Invalid username or password');

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).send('Invalid username or password');

        // token generation
        const token = jwt.sign({username:user.username,email:user.email,role:user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
        req.session.username = user.username;
        req.session.email = user.email;
        req.session.role = user.role;
        req.session.token = token;

        res.status(200).json({token});
    }
    catch(error){
        return res.status(500).send("error in logging");
    }
}

module.exports = {registerUser, loginUser};