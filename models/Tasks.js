
const mongoose=require("mongoose");

const Task=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    discription:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","completed","start"],
        default:"pending"
    },
    time: {
        type: String,
        
    },
    // refernce of users
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
   
})
const Tasks =mongoose.model("task",Task);
module.exports=Tasks