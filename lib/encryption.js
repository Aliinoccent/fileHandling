
const encrypt=require ("bcrypt");
const saltRounds = 10;
const gensalt=encrypt.genSalt(saltRounds,(err,salt)=>{
    if(err){
        return console.log("salt not genrate");
    }
    if(salt){
        console.log("slat genrate successfully ", salt)
        return salt;
    }
})


console.log(gensalt)
const hashingPassword= async(plainPassword)=>{
    try { console.log(plainPassword ,"yes")
          let hashPas= await encrypt.hash(JSON.stringify(plainPassword),saltRounds);
          console.log("password hash successfully",hashPas)
          return hashPas;
      
    } 
    catch (error) {
        console.log("hash pasword not created",error)
        return;
    }
   
}

const varifyPass=async(pas,hashPassword)=>{
console.log(pas,"this is pas")
try {
    const compaire=await encrypt.compare(pas,hashPassword)
    if(compaire){
        return true

    }
    else{
        
        return false 
    }
} catch (error) {
    console.log(error);
}
  
}
module.exports={hashingPassword,varifyPass}