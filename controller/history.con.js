const HistoryTracking = require("../models/History");
const User = require('../models/User')
exports.getAllHistory = async (req, res) => {
    try {
        const allhistory = await HistoryTracking.find();
        if (!allhistory) {
            return res.status(400).json("histry list empty")
        }
        res.status(200).json(allhistory)
    }
    catch (error) {
        return res.status(500).json({ messege: "internal server error" })
    }
}

exports.getHistoryById = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    console.log(id, userId)
    try {
        const user = await User.findOne({ _id: userId });
        
        if (user.role !== "admin" && user.role !== "superAdmin" && userId !== id) {

            return res.status(404).json({ messege: "only admin and valid User see own history" })
        }

        const history = await HistoryTracking.find({ user: id })
        if (!history) {
            return res.status(404).json({ messege: "histroy list empty" })
        }
        return res.status(200).json(history);

    }
    catch (error) {
        return res.status(500).json(error)
    }
}




