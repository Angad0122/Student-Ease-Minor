const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    producttype:{
        type:String,
        required: false
    },
    orderPrice:{
        type:Number,
        required:true
    },
    customer:{
        type:String,
        required: false
    },
    OrderedproductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    size:{
        type: String,
        required: false
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Cancelled","Delivered"],
        default:"Pending"
    }
},{timestamps:true})
const Order =  mongoose.model("Order", orderSchema)
module.exports=Order;