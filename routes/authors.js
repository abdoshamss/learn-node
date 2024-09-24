const express =require("express");
const router =express.Router();
const asyncHandler = require('express-async-handler');
const { Author,validateCreatAuthor,validateUpdateAuthor}=require("../models/Author");




router.get('/',asyncHandler(
    async(req,res)=>{
        
          const authorsList=await Author.find().sort({name:1});
          res.status(200).json(authorsList);
       
          res.status(500).json({message:"something went wrong"});
        
      }
));

router.get('/:id',asyncHandler(async(req,res)=>{
    
        const author=await Author.findById(req.params.id);
        if(author){
            res.status(200).json(author);
        }else{
           res.status(500).json({message:"something went wrong"})
        }
   
        res.status(500).json({message:"something went wrong"});
     
    }));


 router.post("/",asyncHandler(async (req,res)=>{
    const {error}=validateCreatAuthor(req.body);
    if (error){
    return res.status(400).json(error.details[0].message);
    }
    
        const author=new Author({
        
            name:req.body.name
        });
         const result=await author.save();
        res.status(201).json(result);
   
        console.log(error);
        res.status(500).json({message:"something went wrong"});
     
     }));



router .put("/:id",asyncHandler(async(req,res)=>{
    const {error}=validateUpdateAuthor(req.body);
    if(error){
        res.status(400).json(error.details[0].message);
    }
     
      const author=  await Author.findByIdAndUpdate(req.params.id,{
        $set:{ 
            name:req.body.name
        }
        
    },{
        new:true
    });
     const result=await author.save();
    res.status(200).json(author);
 
        console.log(error);
        res.status(500).json({message:"something went wrong"});
     
    
    }));



router.delete("/:id",asyncHandler(async(req,res)=>{
     
        const author=await Author.findById( req.params.id);
    if(author){
        await Author.findByIdAndDelete( req.params.id);
        res.status(200).json({message:"author has been deleted"});
    }else{
        res.status(404).json({message:"author not found"});
    }
   
        console.log(error);
        res.status(500).json({message:"something went wrong"});
   
    
    }));


module.exports=router;