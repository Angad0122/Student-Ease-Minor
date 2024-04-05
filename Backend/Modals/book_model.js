const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    image: {
        type: String // Store the file path or URL
    }
}, { timestamps: true });

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
