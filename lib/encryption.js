
const encrypt = require("bcrypt");
require("dotenv").config
const saltRounds = process.env.SALTROUNDE;

const hashingPassword = async (plainPassword) => {
    try {
        console.log(plainPassword, "yes")
        let hashPas = await encrypt.hash(JSON.stringify(plainPassword), saltRounds);
        console.log("password hash successfully", hashPas)
        return hashPas;
    }
    catch (error) {
        console.log("hash pasword not created", error)
        return;
    }
}
const varifyPass = async (pas, hashPassword) => {
    try {
        const compaire = await encrypt.compare(pas, hashPassword)
        if (compaire) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.log(error);
    }

}
module.exports = { hashingPassword, varifyPass }