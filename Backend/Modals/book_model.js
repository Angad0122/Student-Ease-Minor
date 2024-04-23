const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true,
        unique: true 
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    author: {
        type: String
    },
    description:{
        type:String
    },
    sellername:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    image: {
        type: String // Store the file path or URL
    }
}, { timestamps: true });

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
