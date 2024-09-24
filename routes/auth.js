const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const bcyrpt=require("bcryptjs");
const { User, validateLoginUser, validateRegisterUser } = require("../models/User");

router.post("/register", asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(404).json({ message: message.error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "this user already registered " });
    }
const salt =await bcyrpt.genSalt(10);
req.body.password=await bcyrpt.hash(req.body.password,salt);
    user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });
    const result = await user.save();
    const token=null;
     const {password,...other}=result._doc;
    res.status(201).json({ ...other,token })
}));

module.exports = router;