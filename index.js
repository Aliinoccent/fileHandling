const {dbConnection}=require("./config/db");
require("dotenv").config();
const mainrouter=require("./routers/index")
const express=require("express");
const app=express();
const User=require("./routers/user.ro")
app.use(express.json());
app.use("/mainRouter",mainrouter)
dbConnection();

const port=8000||process.env.POR
app.listen(port,()=>{
    console.log("server is listening",port);
})

