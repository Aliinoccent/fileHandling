
const mongoose=require("mongoose");
const HistorySchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    path:{
        type:String,
        require:true
    }
   
},{Timestamp:true})

const HistoryTracking=mongoose.model("history",HistorySchema);

module.exports=HistoryTracking