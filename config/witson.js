const { createLogger, format, level, transports } = require("winston");
const path=require('path')
const createLoggers=(apiName)=>{
    return createLogger({
        level: "info",
        format: format.combine((format.timestamp({format:"YYYY-MM-DD hh:mm:ss"})),
                format.printf(({timestamp, level, message}) => {
            return `${timestamp}, [${level}] messege: ${message}`
        })),
        transports: [
            new transports.Console(),
            new transports.File({ filename: path.join("logs" , apiName) })
        ]
    })
}

const authloger=createLoggers('auth.logs');
const userLogger=createLoggers("user.logs");
const historyloger=createLoggers("history.logs");

module.exports={
    authloger,
    userLogger,
    historyloger,
}