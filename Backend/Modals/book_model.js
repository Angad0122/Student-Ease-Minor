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
        data: Buffer, // Binary data
        contentType: String, // MIME type of the file
    }
}, { timestamps: true });

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
 