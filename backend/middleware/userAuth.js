const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const userAuth = async(req,res, next)=>{
    try {
        const {token} = req.cookies;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {_id} = decoded;
        const user = await User.findById({_id:_id})
        if((!user) || (user.role != "user") ) return res.status(401).json({
            status:false,message:"Please login"
        })
        if(user.status=="inactive") return res.status(400).json({
            status:false,
            message:"Account inactive please contact admin"
        })

        req.user = user;
        console.log("auth success")
        next();
    } catch (error) {
        console.log("Error in auth: "+error.message);
        res.status(500).json({
            status:false,
            message:"Error in authentication, please login"
        })
    }
}

module.exports = {
    userAuth
}