const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const connection = require('./db');

const User_model = require("./Modals/user_model.js")
const Product_model = require("./Modals/product_model.js")
const Category_model = require("./Modals/category_model.js")
const Order_model = require("./Modals/order_model.js")
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

connection();







app.post("/signup",(req,res)=>{
    User_model.create(req.body)
    console.log(req.body)
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})









const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running at Port ${PORT}`);
})