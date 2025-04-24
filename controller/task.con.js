const Tasks = require("../models/Tasks");
const moment = require('moment');
const User = require("../models/User");

exports.createTask = async (req, res) => {
  const { name, discription } = req.body;
  const { id } = req.params;
  console.log(name, discription, id);
  try {
    if (!name || !discription || !id) {
      res.status(400).json({ messege: "required all field" });
      return;
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

  try {

    if (!id) {
      return res.status(400).json({ messege: "required userId" })
    }

    const userHoldTask = await Tasks.find({ user: id });

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
  console.log("taskid", taskid);
  try {
    if (!taskid || !status) {
      return res.status(401).json({ messege: "required all fields" })
    }
    const isTask = await Tasks.find({ taskid });
    if (!isTask) {
      return res.status(400).json({ messege: "invalid task id" });
    }
    const userTasks = await Tasks.find({ user: userId });
    if (!userTasks) {
      return res.json(201).json({ messege: "user has null task" });
    }
    const userInTask = await Tasks.findOne({ user: userId });

    console.log(userInTask, "userid")


    const taskUserId = JSON.stringify(userInTask.user)

    if (JSON.stringify(userId) !== taskUserId) {
      return res.status(402).json({ messege: "Alert! another user (illigial user) want to update task status" })
    }

    const updateData = await Tasks.updateOne({ _id: taskid }, { $set: { status } }, { new: true, runValidators: true })

    return res.status(200).json({ messege: "updaete", updateData });

  } catch (error) {
    res.json({ error: error.message })
  }
}
