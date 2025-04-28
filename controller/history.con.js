const HistoryTracking = require("../models/History");
const User = require('../models/User')
const {historyLogger}=require("../config/witson")
exports.getAllHistory = async (req, res) => {
    const page=req.query.page||1;
    const limit=req.query.limit||5;

    try {
        const skipItems=(page-1)*limit;
        const allhistory = await HistoryTracking.find().skip(skipItems).limit(limit).sort({createdAt:1});
        if (!allhistory) {
            historyLogger.error("history list empty")
            return res.status(400).json("histry list empty")
        }
        historyLogger.info("user list show successfully");
        res.status(200).json(allhistory)
    }
    catch (error) {
        historyLogger.error("internal server error in getAllhistory()")
        return res.status(500).json({ messege: "internal server error" })
    }
}

exports.getHistoryById = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    console.log(id, userId)
    try {
        const user = await User.findOne({ _id: userId });
        const userInParams=await User.findOne({_id:id});
        
        if (user.role !== "admin" && user.role !== "superAdmin" && userId !== id) {
            historyLogger.error("only admin and valid User see own history")
            return res.status(404).json({ messege: "only admin and valid User see own history" })
        }

        const history = await HistoryTracking.find({ user: id })
        if (!history) {
            historyLogger.error("histroy list empty")
            return res.status(404).json({ messege: "histroy list empty" })
        }
        if(!userInParams){
            historyLogger.error("user not found")
            return res.status(404).json("user not found")
        }
        if(userInParams.role==='superAdmin'&& user.role==="admin"){
            historyLogger.error("admin see only users history, not superadmin")
            return res.status(400).json("admin see only users history, not superadmin");
        }
        if(userInParams.role==="admin"&& user.role==="admin"){
            historyLogger.error("admin see only users history, not admin")
            return res.status(400).json("admin see only users history, not admin");
        }
        historyLogger.info("history show successfully");
        return res.status(200).json(history);

    }
    catch (error) {
        return res.status(500).json(error)
    }
}




