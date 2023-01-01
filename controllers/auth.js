const User = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const signUp = async(req, res) =>{
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) return res.status(400).json({msg: "Please provide all values"});
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({msg: "User with this email already exist"});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({name, email, password: hashedPassword});
        const token = jwt.sign({ userId: user._id, name: user.name}, process.env.AUTH_KEY, { expiresIn: process.env.JWT_EXPIRATION});
        res.status(200).json({name: user.name, token, msg: "Registration successful"});
        
    } catch (error) {
        res.status(400).json(error);
    } 
};

const signIn = async(req, res) =>{
    const { email, password } = req.body;
    try {
        console.log(req.body)
        if (!email || !password) return res.status(400).json({msg: "Please provide all values"});
        const existingUser = await User.findOne({email});
        
        if (!existingUser) return res.status(400).json({msg: "Invalid Credentials"});
        const token = jwt.sign({ userId:existingUser._id, name:existingUser.name}, process.env.AUTH_KEY, { expiresIn: process.env.JWT_EXPIRATION});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid Credentials'});
        
        res.status(200).json({name:existingUser.name, token, msg: `Welcome Back ${existingUser.name}`});
        // console.log(existingUser)
    } catch (error) {
        res.status(400).json(error);
    }
};


module.exports = {
    signIn, signUp
}