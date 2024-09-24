const joi = require("joi");
const mongoose = require("mongoose");

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
        ,trim:true,
        minlength:5
        ,maxlength:100
        ,uniqie:true
    },
    username:{
        type:String,
        required:true
        ,trim:true,
        minlength:2
        ,maxlength:100
         
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
          
    },
    isAdmin:{
        type:Boolean, 
        trim:true,
        default:false
          
    },
},{timestamps:true});

const User=mongoose.model("User",UserSchema);

function validateRegisterUser(obj) {
    const Schema=joi.object({
        email:joi.string().trim().required().max(100).min(5).email(),
        username:joi.string().trim().min(2).max(100).required(),
        password:joi.string().trim().min(2).required(),
        isAdmin:joi.bool(),

    });
    return Schema.validate(obj);
}
function validateLoginUser(obj) {
    const Schema=joi.object({
        email:joi.string().trim().required().max(100).min(5).email(),
        password:joi.string().trim().min(2).required(),
    });
    return Schema.validate(obj);
}
function validateUpdateUser(obj) {
    const Schema=joi.object({
        email:joi.string().trim().max(100).min(5).email(),
        username:joi.string().trim().min(2).max(100),
        password:joi.string().trim().min(2),
        isAdmin:joi.bool(),
    });
    return Schema.validate(obj);
}

module.exports={
    User,validateLoginUser,validateRegisterUser,validateUpdateUser

}