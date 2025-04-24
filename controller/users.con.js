
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

exports.roleChange= async(req,res) =>{
    const {id}=req.params;
    const{email,userId}=req.user
    console.log(email,userId);
    console.log("userId",id);
    try {
        const isSuperAdmin=await User.findById({_id:userId});
        console.log("isSuperAdmin",isSuperAdmin);
        if(isSuperAdmin.role!=="superAdmin"){
          return  res.status(200).json({messege:"only superAdmin can change role"})
        }
        const userExist=await User.findById({_id:id})
        console.log(userExist)
        if(!userExist){
            res.status(403).json({messege:"user not exist"})
        }
        const updateRole=await User.updateOne({_id:userExist._id},{$set:{role:"admin"}});
        res.status(201).json({updateRole});
    } catch (error) {
        res.status(500).json(error)
    }

}