const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const connection = require('./db');
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

connection();

app.post("/auth/login",(req,res)=>{
    console.log(req.body);
    res.send("login success");
})

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running at Port ${PORT}`);
})