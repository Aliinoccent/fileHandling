const file=require("fs");
require ("dotenv").config();
const encrypt=require("bcrypt");

// ______________________Async non blocking mathod___________________________


const plain_Text="i am abdul , i working in node js";



file.writeFile("Text.txt","Text file created done",(error)=>{
    try{
        if(error){
        console.log(error)
        return
        }

        console.log("data save successful");
        
    }
    catch(error){
        console.log("not response from server ",error)
    }
   
})
            // _________asyn read file________________

file.readFile("Text.txt","utf-8",(error,data)=>{
    console.log("read file",data);
})
             // _________asyn append file________________

file.appendFile("Text.txt","/n i wish to become node js developer",(error)=>{
    if(error){
        console.log(error);
    }
    console.log("updated code ");
})

             // _________asyn delete file________________

// file.unlink("Text.txt",(error)=>{
//     console.log("delete successfully")
// });



// _________________________sync mathod______________________________________
try{
    file.writeFileSync("Sync.txt","file is created ")
    console.log("file created succesffly synchronus");
}
catch(error){
    console.log(error)
}
            //    _________sync append file_____________
try{
    file.appendFileSync("Sync.txt","it is blocking system","utf-8");
    console.log("update sync ")
}
catch(error){
    console.log("eror",error)
}
            // ______________sync read file______________
try{
    const data=file.readFileSync("Sync.txt","utf-8");
    console.log("sync read file",data)
}
catch(error){
    console.log(error);
}

// _______________________________ Async json data file_________________________________

const User={
    name:"abdul Rehman",
    intern:"node js",
    software:"TAKHAQS",
    intern_Duration:"2 months",    
    
}
file.writeFile("json_format.json",JSON.stringify(User,null,2),(error)=>{
    if(error){
        console.log(" error ",error);
    }
    else console.log("file created successful")
})


file.readFile("json_format.json","utf-8",(error,res)=>{
    if(error){
        console.log(error);
    }
    const objectFormat=JSON.parse(res)
    // console.log(typeof(objectFormat), objectFormat);
})

    // _________________ add keys values ____________________

    file.writeFile("json_format.json",  JSON.stringify({...User , future_plan:"nodejs developer"},null,2),(error)=>{
        if(error){
            console.log(error)
        }
        console.log("append data in it")
    })
    