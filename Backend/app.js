const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const connection = require('./db');
const multer = require('multer');
const path = require('path');

const User_model = require("./Modals/user_model.js");
const Book_model = require("./Modals/book_model.js");
const Uniform_model = require("./Modals/uniform_model.js");
const Category_model = require("./Modals/category_model.js");
const Order_model = require("./Modals/order_model.js");
const { log } = require('handlebars');

dotenv.config();
const app = express();
app.use( express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

connection();
const PORT = process.env.PORT;




//=========================================================================================================================================================
//Login Signup


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
    res.status(200).json({ message: 'Login successful', username: user.username,email:user.email,phoneNumber:user.phonenumber });
});




















//=========================================================================================================================================================
//Defining Multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets'); // Destination folder for storing images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with original extension
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.fieldname === "image") { // Ensure fieldname matches the name attribute in the form
            cb(null, true);
        } else {
            cb(new Error("Unexpected field"));
        }
    }
});


//=========================================================================================================================================================
//Sell Book
app.post("/auth/sellbook", upload.single('image'), async (req, res) => {
    try {
        const { title, author, price, bookId , description ,sellername, phoneNumber} = req.body;

        // Validate incoming data
        if (!title || !author || !price || !description || !req.file) {
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
            bookId,
            author,
            price,
            description,
            sellername,
            phoneNumber,
            image: req.file.path // Save the file path if uploaded
        });

        // Save the new book entry
        const savedBook = await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: savedBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create book' });
    }
});











//=========================================================================================================================================================
// View Books And Uniforms


app.get("/viewbooks", async (req, res) => {
    try {
        const books = await Book_model.find(); // Fetch all books from the database
        res.status(200).json({ books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

app.get("/viewuniforms", async (req, res) => {
    try {
        const uniforms = await Uniform_model.find(); // Fetch all books from the database
        res.status(200).json({ uniforms });
    } catch (error) {
        console.error('Error fetching uniforms:', error);
        res.status(500).json({ error: 'Failed to fetch uniforms' });
    }
});




















//=========================================================================================================================================================
// Admin Panel



// User Control
app.get("/admin/userPage", async (req, res) => {
    try {
        const users = await User_model.find(); // Fetch all users from the database
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
app.delete('/admin/userPage/:username', async (req, res) => {
    const { username } = req.params;
    try {
        // Find the user by username and delete it
        const deletedUser = await User_model.findOneAndDelete({ username });
        
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});




//=========================================================================
//Books Control
app.get("/admin/bookPage", async (req, res) => {
    try {
        const books = await Book_model.find(); // Fetch all users from the database
        res.status(200).json({ books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});
app.delete('/admin/bookPage/:bookId', async (req, res) => {
    const { bookId } = req.params;
    try {
        // Find the user by username and delete it
        const deletedBook = await Book_model.findOneAndDelete({ bookId });
        
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Failed to delete book' });
    }
});



//============================================================================

//Uniform Control
app.get("/admin/uniformPage", async (req, res) => {
    try {
        const uniforms = await Uniform_model.find();
        res.status(200).json({ uniforms });
    } catch (error) {
        console.error('Error fetching uniforms:', error);
        res.status(500).json({ error: 'Failed to fetch uniforms' });
    }
});

app.post("/admin/addUniform", upload.single('image'), async (req, res) => {
    try {
        const { type, organization, price, description } = req.body;

        if (!type || !organization || !price || !description || !req.file) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newUniform = new Uniform_model({
            type,
            organization,
            price,
            description,
            image: req.file.path
        });

        const savedUniform = await newUniform.save();
        res.status(201).json({ message: 'Uniform added successfully', uniform: savedUniform });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to add uniform' });
    }
});

app.delete('/admin/uniformPage/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        // Find the user by username and delete it
        const deletedUniform = await Uniform_model.findOneAndDelete({ _id });
        
        if (!deletedUniform) {
            return res.status(404).json({ error: 'Uniform not found' });
        }

        res.status(204).send(); 
    } catch (error) {
        console.error('Error deleting Uniform:', error);
        res.status(500).json({ error: 'Failed to delete uniform' });
    }
});











app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
});