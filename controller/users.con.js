
const User = require("../models/User")

exports.getAllUsers = async (req, res) => {
    const { userId } = req.user;
    try {
        const admin = await User.findOne({ _id: userId });
        console.log("Admin", admin);
        if (admin.role === "admin" && admin.role !== "superAdmin") {
            const allUsers = await User.find({ role: "user" })
            return res.status(200).json(allUsers)
        }
        if (admin.role === "superAdmin") {
            const allUsers =await User.find({})
            return res.status(200).json(allUsers)
        }
        if (admin.role === "user") {
            res.status(403).json({ messege: "user not able to see list" });
        }

    } catch (error) {
        res.status(500).json({ error })
    }
}

exports.roleChange = async (req, res) => {
    const { id } = req.params;
    const { email, userId } = req.user
    console.log(email, userId);
    console.log("userId", id);
    try {
        const isSuperAdmin = await User.findById({ _id: userId });
        console.log("isSuperAdmin", isSuperAdmin);
        if(!isSuperAdmin){
            res.status(404).json({messege:"check the token of User"});
        }
        if (isSuperAdmin.role !== "superAdmin") {
            return res.status(200).json({ messege: "only superAdmin can change role" })
        }
        const userExist = await User.findById({ _id: id })
        console.log(userExist)
        if (!userExist) {
            res.status(403).json({ messege: "user not exist" })
        }
        const updateRole = await User.updateOne({ _id: userExist._id }, { $set: { role: "admin" } });
        res.status(201).json({ updateRole });
    } catch (error) {
        res.status(500).json(error)
    }

}
exports.activeUserBehaviour=async(req,res)=>{
    const{userId}=req.user;
    const {id}=req.params;
    try {
        const isAdmin=await User.findOne({_id:userId});
        console.log("isAdmin",isAdmin);
        if(isAdmin.role!="admin" && isAdmin.role==="user"){
            return res.status(401).json({messege:"user not able to work active or unactive"});
        }
        if(isAdmin.role==="admin"){
            const userObj=await User.findOne({_id:id});

            if(!userObj){
               return res.status(404).json({messege:"user not found"})
            }
            if(userObj.role==="admin" || userObj.role==="superAdmin"){
                return res.status(403).json({messege:"only change acitivites of users"})
            }
           if(userObj.role==="user"){
            const updateData= await User.updateOne({email:userObj.email},{$set:{active:!userObj.active}});
            return res.status(200).json(updateData)
           }
        }


        if(isAdmin.role==="superAdmin"){
            const userObj=await User.findOne({_id:id});

            if(!userObj){
               return res.status(404).json({messege:"user not found"})
            }
            if(userObj.role==="superAdmin"){
                return res.status(403).json({messege:"only change acitivites of users or admins"})
            }
        
            const updateData= await User.updateOne({email:userObj.email},{$set:{active:!userObj.active}});
            return res.status(200).json(updateData)
           
        }
        else{
            res.status(403).json({messege:"only admin and superAdmin change the role"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
}