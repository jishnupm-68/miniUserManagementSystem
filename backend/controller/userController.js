const hashGenerator = require("../helper/hashGenerator");

const getUserData =  async(req,res)=>{
    try {
        let user =req.user;
        res.json({
            status:true,
            message:"User fetched successfully",
            data:user
        })
        
    } catch (error) {
        console.log("Error while fetching the user information");
        res.json({
            status:true,
            message:"Error while fetching the user information"
        })
    }
}

const editUserData = async (req,res)=>{
    try {
        const {email, fullName } = req.body;
        const existingUser = await User.findOne({email:email});
        if(existingUser) return res.json({
            status:false,message:"This email already exists"
        })
        const {_id}= req.user;
        const updatedUser = await User.findByIdAndUpdate({_id:_id}, {
            fullName:fullName,
            email:email
        });
        if(!updatedUser) return res.json({
            status:false,
            message:"Updation failed"
        })
        console.log("user data updated successfully");
        res.json({
            status:true,
            message:"User data updated successfully",
            data:updatedUser
        });
    } catch (error) {
        console.log("error while editing the user profile ", error.message)
        res.json({
            status:false,
            message:"Error while updating the profile "
        })
    }
}

const editUserPassword = async(req, res)=>{
    try {
        const {_id} = req.user;
        const {password} = req.body;
        const hashedPassword = hashGenerator(password);
        const updatedUser = await User.findByIdAndUpdate({_id:_id},{password:hashedPassword});
        if(!updatedUser) return res.json({status:false, message:"Password updation failed"})
        console.log("password successfully updated")
        return res.json({status:true,message:"Password successfully updated" , data:updatedUser})
    } catch (error) {
        console.log("error while updating the password");
        res.json({
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