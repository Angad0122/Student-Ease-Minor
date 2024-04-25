const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },    
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
        default:[]
    }],
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        
    }]
},{timestamps:true});

const User = mongoose.model("User", userSchema);
module.exports = User;
