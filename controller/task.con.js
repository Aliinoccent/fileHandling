const Tasks = require("../models/Tasks");
const moment = require('moment');

exports.createTask=async(req,res)=>{
    const {name,discription}=req.body;
    const {id}=req.params;
    console.log(name,discription,id);
    try {
        if(!name ||!discription ||!id){
            res.status(400).json({messege:"required all field"});
            return;
        }
        const now = new Date();
      const time= moment().format("YYYY-MM-DD HH:mm:ss");
        const taskSave= await Tasks.insertOne({name,discription,user:id,time});
     return  res.status(200).json(taskSave)
    } catch (error) {
     return   res.json({messege:error});
    }
}
exports.getTaskByUserId=async(req,res)=>{
  const {id}= req.params;
    try {
      if(!id){
       return res.status(400).json({messege:"required userId"})
      }
      const userHoldTask=await User.findOne({_id:id});
      if(!userHoldTask){
       return res.status(200).json({messege:"user not have eny task"});
      }
      return res.status(200).json({userHoldTask})
      
        
    } catch (error) {
      return  res.json({messege:'error'})
    }
}