const Joi = require("joi");
const mongoose=require("mongoose");
const AuthorsSchema=new mongoose.Schema({
name:{
     type:String,
     required:true,
     trim:true,
     minlength:3,
     maxlength:30
}
},
{
    timestamps:true
}
);

const Author=mongoose.model("Author",AuthorsSchema);


function validateCreatAuthor(obj){
    const schema = Joi.object({
        name: Joi.string().trim()
            .min(3)
            .max(30)
            .required()});
       return   schema.validate(obj);
}
function validateUpdateAuthor(obj){
    const schema = Joi.object({
        name: Joi.string().trim()
            .min(3)
            .max(30)
            });
       return schema.validate(obj);
}
module.exports={
    Author,validateCreatAuthor,validateUpdateAuthor
}