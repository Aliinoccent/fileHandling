const Joi = require('joi');

const userValidation=(req,res,next)=>{
    const validation = Joi.object({
        fullName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(100),
    });
    const {error}=validation.validate(req.body);
    if(error){
        res.status(400).json({error:error.message})
    }
    else{
        next();
    }
}

module.exports=userValidation
