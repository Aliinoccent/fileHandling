
const HistoryTracking=require("../models/History")
exports.HistoryTrack=async(req,res,next)=>{
    const {userId}=req.user;
    try {
     await HistoryTracking.insertOne({user:userId,path:req.originalUrl});
        next();
    } catch (error) {
        res.status(500).json({messege:error});
    }
}
