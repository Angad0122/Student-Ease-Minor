const mongoose = require("mongoose");

const UniformSchema = new mongoose.Schema({
    // uniformId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    organization: {
        type: String
    },
    description:{
        type:String
    },
    image: {
        type: String // Store the file path or URL
    }
}, { timestamps: true });

const Uniform = mongoose.model("Uniform", UniformSchema);
module.exports = Uniform;
