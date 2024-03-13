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

app.post("/signup", async (req, res) => {
    try {
        const user = await User_model.create(req.body);
        console.log(user);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});



app.post("/auth/login",(req,res)=>{
    res.status(200).json({message:"Login Successfull"});
})









const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running at Port ${PORT}`);
})