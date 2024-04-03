const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const connection = require('./db');
const multer = require('multer');
const path = require('path');

const User_model = require("./Modals/user_model.js")
const Book_model = require("./Modals/book_model.js")
const Category_model = require("./Modals/category_model.js")
const Order_model = require("./Modals/order_model.js")
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connection();



app.post("/signup", async (req, res) => {
    console.log(req.body); 
    const { username, email } = req.body;
    
    // Check if email or username already exists
    const existingUser = await User_model.findOne({ $or: [{ username }, { email }] });
    
    if (existingUser) {
        // If email or username already exists, return an error response
        return res.status(400).json({ error: 'Email or username already exists' });
    }
    
    try {
        const user = await User_model.create(req.body);
        console.log(user);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});



app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    
    // Find the user by email or username
    const user = await User_model.findOne({ $or: [{ email }, { username: email }] })
    
    if (!user) {
        // If user does not exist, return an error response
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if the provided password matches the password stored in the database
    if (password !== user.password) {
        // If passwords do not match, return an error response
        return res.status(401).json({ error: 'Incorrect password' });
    }
    
    // If email and password match, consider it a successful login
    res.status(200).json({ message: 'Login successful', username: user.username });
});





// Multer setup for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for storing images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with original extension
    }
});

const upload = multer({ storage: storage });

app.post("/auth/sellbook", upload.single('image'), async (req, res) => {
    try {
        const { title, author, price } = req.body;

        // Validate incoming data
        if (!title || !author || !price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if the title already exists
        const existingBook = await Book_model.findOne({ title });
        if (existingBook) {
            return res.status(400).json({ error: 'Book title already exists' });
        }

        // Create a new book entry
        const newBook = new Book_model({
            title,
            author,
            price,
            image: req.file ? req.file.path : null // Save the image path if uploaded
        });

        // Save the new book entry
        const savedBook = await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: savedBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create book' });
    }
});













const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running at Port ${PORT}`);
})