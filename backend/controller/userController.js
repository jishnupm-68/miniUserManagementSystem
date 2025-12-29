const { isStrongPassword } = require("validator");
const hashGenerator = require("../helper/hashGenerator");
const User = require("../model/userSchema");

const getUserData =  async(req,res)=>{
    try {
        let user =req.user;
        res.status(200).json({
            status:true,
            message:"User fetched successfully",
            data:user
        })
    } catch (error) {
        console.log("Error while fetching the user information");
        res.status(500).json({
            status:true,
            message:"Error while fetching the user information"
        })
    }
}

const editUserData = async (req,res)=>{
    try {
        const {email, fullName } = req.body;
        const existingUser = await User.findOne({email:email});
        if(existingUser) return res.status(409).json({
            status:false,message:"This email already exists"
        })
        const {_id}= req.user;
        const updatedUser = await User.findByIdAndUpdate(
            {_id:_id}, 
            {
                fullName:fullName,
                email:email
            }, 
            {
                new:true, 
                runValidators:true
            });
        if(!updatedUser) return res.status(400).json({
            status:false,
            message:"Updation failed"
        })
        console.log("user data updated successfully");
        res.status(200).json({
            status:true,
            message:"User data updated successfully",
            data:updatedUser
        });
    } catch (error) {
        console.log("error while editing the user profile ", error.message)
        res.status(500).json({
            status:false,
            message:"Error while updating the profile "
        })
    }
}

const editUserPassword = async(req, res)=>{
    try {
        const {_id} = req.user;
        const {password} = req.body;
        if(!isStrongPassword(password)) return res.status(400).json({
            status:false,
            message:"Password must contain uppercase, lowercase, number, and special character"
        })
        const hashedPassword = await hashGenerator(password);
        const updatedUser = await User.findByIdAndUpdate(
            {_id:_id},
            {password:hashedPassword},
            {
                new:true,
                runValidators:true
            }
        );
        if(!updatedUser) return res.status(400).json({status:false, message:"Password updation failed"})
        console.log("password successfully updated")
        return res.status(200).json({status:true,message:"Password successfully updated" , data:updatedUser})
    } catch (error) {
        console.log("error while updating the password", error.message);
        res.status(500).json({
            status:false,
            message:"Error while updating the password"
        });
    }
}

module.exports = {
    getUserData,
    editUserData,
    editUserPassword
}