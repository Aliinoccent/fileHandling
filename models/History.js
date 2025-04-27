
const mongoose=require("mongoose");
const HistorySchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    path:{
        type:String,
        require:true
    }
   
},{timestamps:true})

const HistoryTracking=mongoose.model("history",HistorySchema);

module.exports=HistoryTracking