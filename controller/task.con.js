const Tasks = require("../models/Tasks");
const moment = require('moment');
const User = require("../models/User");

exports.createTask = async (req, res) => {
  const { name, discription } = req.body;
  const { id } = req.params;
  const {userId}=req.user;

  console.log(name, discription, id);
  try {
    if (!name || !discription || !id) {
      res.status(400).json({ messege: "required all field" });
      return;
    }
    if(id!==userId){
      return res.status(400).json("user not authenticate");
    }
    const now = new Date();
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    const taskSave = await Tasks.insertOne({ name, discription, user: id, time });
    return res.status(200).json(taskSave)
  } catch (error) {
    return res.json({ messege: error });
  }
}
exports.getTaskByUserId = async (req, res) => {
  const { id } = req.params;
  const {userId}=req.user;
  const page=req.query.page|| 1;
  const limit=req.query.limit||2;
  try {
    const skipItems=(page-1)*limit;
    const userInToken = await User.findOne({_id:userId});
    if (!id) {
      return res.status(400).json({ messege: "required userId" })
    }
    
    if(userInToken.role==="user" && userId!==id){
      return res.status(400).json("user is unauthrized")
    }
    const userHoldTask = await Tasks.find({ user: id }).skip(skipItems).limit(limit).sort({createdAt:1});
  

    if (!userHoldTask) {
      return res.status(200).json({ messege: "user not have eny task" });
    }
    return res.status(200).json({ userHoldTask })


  } catch (error) {
    return res.json({ error })
  }
}
exports.updatetaskStatus = async (req, res) => {
  const { userId } = req.user;
  const { taskid } = req.params;
  const { status } = req.body;
  
  try {
    if (!taskid || !status) {
      return res.status(401).json({ messege: "required all fields" })
    }
    const isTask = await Tasks.findOne({ _id:taskid });
    if (!isTask) {
      return res.status(400).json({ messege: "invalid task id" });
    }
    const user=await User.findOne({_id:userId});
    if(user.role==="admin"|| user.role==="superAdmin"){
      return res.status(403).json("admin not able to update the status");
    }
     
    console.log(isTask.user.toString()===userId);
    console.log(isTask.user.toString(), userId)

    if(user.role==="user" && isTask.user.toString()!==userId ){
      return res.status(402).json({ messege: "Alert! another user (illigial user) want to update task status" })

    }
    const updateData=await Tasks.updateOne({_id:isTask._id} , {$set:{status}});
    return res.status(200).json({updateData})

  } catch (error) {
    res.json({ error: error.message })
  }
}
