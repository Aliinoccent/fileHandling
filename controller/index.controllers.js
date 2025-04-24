 


     const {signUp,signIn,forgetPassword,isUserValid,newPassword}=require("../controller/auth.con")
     const {getAllUsers,roleChange,activeUserBehaviour}=require("./users.con");
     const {createTask,getTaskByUserId,updatetaskStatus}=require("./task.con")

    module.exports={
        signUp,
        signIn,
        forgetPassword,
        isUserValid,
        newPassword,
        getAllUsers,
        createTask,
        getTaskByUserId,
        updatetaskStatus,
        roleChange,
        activeUserBehaviour
    }