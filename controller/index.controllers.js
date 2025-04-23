 


     const {signUp,signIn,forgetPassword,isUserValid,newPassword}=require("../controller/auth.con")
     const {getAllUsers}=require("./users.con");
     const {createTask,getTaskByUserId}=require("./task.con")

    module.exports={
        signUp,
        signIn,
        forgetPassword,
        isUserValid,
        newPassword,
        getAllUsers,
        createTask,
        getTaskByUserId
    }