const joi = require("joi");
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "authors",

    },
    descripition: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    cover: {
        type: String,
        required: true,
        enum: ["soft cover", "hard cover"]
    }
}, { timestamps: true });

const Book = mongoose.model("Book", BookSchema);

function validateCreatBook(obj) {
    const schema = joi.object({
        title: joi.string().trim().min(3).max(100).required(),
        author: joi.string().required(),
        descripition: joi.string().trim().min(3).required(),
        price: joi.number().min(0).required(),
        cover: joi.string().valid("soft cover", "hard cover").required()
    });
    return schema.validate(obj);
}
function validateUpdateBook(obj) {
    const schema = joi.object({
        title: joi.string().trim().min(3).max(100).required(),
        author: joi.string().required(),
        descripition: joi.string().trim().min(3).required(),
        price: joi.number().min(0).required(),
        cover: joi.string().valid("soft cover", "hard cover").required()
    });
    return schema.validate(obj);
}

module.exports = {
    Book, validateCreatBook, validateUpdateBook
} 