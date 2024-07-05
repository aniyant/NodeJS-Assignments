const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
const User = require('../models/user');

require('dotenv').config();

async function loginAdmin(req,res){
    const {username,password} = req.body;

    try{
        const user = await User.findOne({username});
        if(!user) return res.status(400).json({message: 'User not found'});

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid) return res.status(400).json({message: 'Invalid password'});

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}

async function registerAdmin(req, res){
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({message: 'Please provide both username and password'});
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword});
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}
module.exports = {loginAdmin,registerAdmin};