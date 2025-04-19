const db=require("mongoose");
require("dotenv").config()
const dbConnection=async()=>{
    try {
     const isconnect=  await  db.connect(process.env.uri)
           isconnect? console.log("db connected"):console.log("db error");
        
    } catch (error) {
        console.log('db not connected',error)
    }
}
 
module.exports={dbConnection};
   
