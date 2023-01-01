const User = require("../models/auth");
const jwt = require("jsonwebtoken");

const auth = async(req, res, next) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) return res.status(401).json({msg: "Authentication failed"});
    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.AUTH_KEY);
        req.user = {userId: payload.userId, name: payload.name};
        next();
    } catch (error) {
        res.status(401).json({msg: "Authentication failed"});
    }

};

module.exports = auth;