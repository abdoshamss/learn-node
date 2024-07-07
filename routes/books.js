const express =require("express");
const asyncHandler = require('express-async-handler');
const mongoose =require("mongoose");
const {Book,validateCreatBook,validateUpdateBook}=require("../models/Book");
const router =express.Router();


 
router.get("/",asyncHandler(async(req,res)=>{
    const books=await Book.find();
    res.status(200).json(books);
}));


router.get("/:id",asyncHandler(async(req,res)=>{
    const book=await Book.findById(req.params.id);
    if(book){ 
        res.status(200).json(book);
    }else{
        res.status(404).json({message:"book not found"});
    }
}));


router.post("/",asyncHandler(async (req,res)=>{
    const{error}=validateCreatBook(req.body);
    
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }
        const book =new Book(
            {
                title:req.body.title,
                author:req.body.author,
                descripition:req.body.descripition,
                price:req.body.price,
                cover:req.body.cover
            }
        );
        const result=await book.save();
        res.status(201).json(result);
    }));


router.put("/:id",asyncHandler(async(req,res)=>{
 
    const{error}=validateUpdateBook(req.body);
    
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }
        const updatedBook=await Book.findByIdAndUpdate(req.params.id,{
            $set:  {
                title:req.body.title,
                author:req.body.author,
                descripition:req.body.descripition,
                price:req.body.price,
                cover:req.body.cover
            }
        },{new:true});
        res.status(200).json(updatedBook);
    }));


router.delete("/:id",asyncHandler(async(req,res)=>{

    const deletedBook=await Book.findById(req.params.id,)
if(deletedBook){
    await Book.findByIdAndDelete(req.params.id,)
    res.status(200).json({message:"book has been deleted"});
}else{
    res.status(404).json({message:"book not found"});
}
}));

module.exports=router;