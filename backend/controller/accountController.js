const isPasswordStrength = require("../helper/passwordStrengthChecker")
const User = require("../model/userSchema")
const hashGenerator = require("../helper/hashGenerator")
const signup = async(req, res)=>{
    try {
        const {email, password, role, status, fullName, adminValidator} = req.body;
        if(!email || !password || !role|| !fullName ) return res.json({
            status:false,
            message:"Required fields must be filled"
        })
        if(!isPasswordStrength(password)) return res.json({
            status:false,
            message:"Password must contain uppercase, lowercase, number, and special character"
        })
        if(adminValidator.length>0 && adminValidator !==process.env.ADMIN_VALIDATOR) return res.json({
            status:false,
            message:"The secret key is not matching, please try again"
        })
        const existingUser = await User.findOne({email:email})
        if(existingUser) return res.json({
            status:false,
            message:"This email has already registered with us"
        })
        const hashedPassword = await hashGenerator(password)
        const newUser = new User({
            email:email,
            password:hashedPassword,
            fullName:fullName,
            role:role,
            status:status,
            lastLogin:new Date()
        })
        const saveUser = await newUser.save();
        if(!saveUser) return res.json({
            status:false,
            message:"Unable to create new user"
        })
        const data =await User.findOne({email:email})
        const token = await saveUser.getJwt()
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
            });

        console.log("account created successfully: " ,token);
        return res.json({
            status:true,
            message:"Account created successfully",
            data:data
        })
    } catch (error) {
        console.log("error while signup", error);
        res.status(500).json({
            status:false,
            message:"Error while signup: "+error.message
        })
    }
}

const login  = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.json({
            status:false,
            message:"Input must be filled"
        })
        const existingUser = await User.findOne({email:email}).select("+password")
        if(!existingUser) return res.json({
            status:false,
            message:"Please enter a registered email"
        })
        const result = existingUser.comparePassword(password);
        if(!result) return res.json({
            status:false,
            message:"Login failed , invalid credentials"
        })
        const user = await User.findOneAndUpdate({email:email},{lastLogin:new Date()});
        console.log("login success  ", user);
        const token = await user.getJwt()
        res.cookie("token", token);
        return res.json({
            status:true,
            message:"Login success",
            data:user
        })
    } catch (error) {
        console.log("error while login ", error.message);
        res.json({
            status:false,
            message:"Error while login " + error.message
        })
    }
}
const logout = async(req,res)=>{
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
            });
        res.status(200).json({ status:true, message: "Logged out successfully" });
    } catch (error) {
        console.log("error while logout "+error.message);
        res.json({status:false, message:"Error while logout"});
    }
}
module.exports={
    signup,
    login,
    logout
}