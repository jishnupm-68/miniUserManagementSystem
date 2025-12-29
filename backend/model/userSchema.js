const mongoose =require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Please provide a email")
        }
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    fullName: {
        type:String,
        minLength:[3, "full name must have atleast 3 characters"],
        maxLength:[120, "full name must have atmost 120 characters"],
        required:true
    },
    role:{
        type:String,
        enum:["admin", "user"],
        required:true
    },
    status:{
        type:String,
        enum:["active", "inactive"],
        default:"active",
    },
    lastLogin:{
        type:Date,
        default:null
    }
}, {timestamps:true})

userSchema.methods.getJwt = async function(){
    let user = this;
    const token = await jwt.sign(
        {_id:user?._id},
        process.env.JWT_SECRET,
        {expiresIn:"12h"}
    )
    return token;
}

userSchema.methods.comparePassword = async function(inputPassword){
    let user =this;
    let hash = user.password;
    const result = await bcrypt.compare(inputPassword, hash);
    return result
}

const User = mongoose.model("User", userSchema);

module.exports = User