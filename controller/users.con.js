
const User=require("../models/User")

exports.getAllUsers=async(req,res)=>{
    try {
        const allUsers=await User.find();
        if(!allUsers){
            return res.status(200).json({messege:'empty '})
        }
        return res.status(200).json({allUsers});
    } catch (error) {
        res.status(500).json({messege:error,status:false})
    }
}