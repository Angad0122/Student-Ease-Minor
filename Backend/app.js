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
    res.status(200).json({ message: 'Login successful', username: user.username,email:user.email,phoneNumber:user.phonenumber,userId:user._id, orders:user.orders, cart:user.cart });
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

app.get("/vieworders/:orderId", async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order_model.findById(orderId);
        res.status(200).json({ order });
        console.log(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

app.get("/vieworder_uniforms/:uniformId", async (req, res) => {
    const { uniformId } = req.params;
    try {
        const product = await Uniform_model.findById(uniformId);
        if (!product) {
            return res.status(404).json({ error: 'Uniform not found' });
        }
        res.status(200).json({ product });
        console.log(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});


app.get("/vieworder_books/:bookId", async (req, res) => {
    const { bookId } = req.params;
    try {
        const product = await Book_model.findById(bookId);
        if (!product) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ product });
        console.log(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});


app.get("/viewcart/:productId", async (req, res) => {
    const { productId } = req.params;
    try {
        // Check if the product exists in the Uniform_model
        let product = await Uniform_model.findById(productId);

        // If the product is not found in the Uniform_model, check in the Book_model
        if (!product) {
            product = await Book_model.findById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            } else {
                // If found in Book_model, add producttype key with value 'book'
                product = { ...product.toObject(), producttype: 'book' };
            }
        } else {
            // If found in Uniform_model, add producttype key with value 'uniform'
            product = { ...product.toObject(), producttype: 'uniform' };

        }

        // Return the product with producttype
        res.status(200).json({ product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
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













//=========================================================================================================================================================
//Orders

//Uniform Order
app.post("/auth/orderuniform", async (req, res) => {
    try {
        const { orderPrice, OrderedproductId,size, address, customer,customerId} = req.body;
        const producttype = 'uniform'
        console.log("Backend request Log",orderPrice, OrderedproductId, address, customer);
        // Validate incoming data
        if (!customer || !OrderedproductId || !orderPrice || !address) {
            return res.status(400).json({ error: 'Missing required field' });
        }


        // Create a new Order entry
        const newOrder = new Order_model({
            producttype,
            orderPrice,
            OrderedproductId,
            size,
            address,
            customer,
            customerId
        });

        // Save the new Order entry
        const savedOrder = await newOrder.save();

        // Find the user by ID
        const user = await User_model.findById(customerId);

        // Push the newly created order ID into the orders array of the user
        user.orders.push(savedOrder._id);

        // Save the updated user document
        await user.save();

        res.status(201).json({ message: 'Order created successfully', order: savedOrder, orderId: savedOrder._id });


        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});


app.post("/auth/orderbook", async (req, res) => {
    try {
        const { orderPrice, OrderedproductId, address, customer,customerId} = req.body;
        const producttype = 'book'
        console.log("Backend request Log", orderPrice, OrderedproductId, address, customer);
        // Validate incoming data
        if (!customer || !OrderedproductId || !orderPrice || !address) {
            return res.status(400).json({ error: 'Missing required field' });
        }

        // Create a new Order entry
        const newOrder = new Order_model({
            producttype,
            orderPrice,
            OrderedproductId,
            address,
            customer,
            customerId
        });

        // Save the new Order entry
        const savedOrder = await newOrder.save();

        // Find the user by ID
        const user = await User_model.findById(customerId);

        // Push the newly created order ID into the orders array of the user
        user.orders.push(savedOrder._id);

        // Save the updated user document
        await user.save();

        res.status(201).json({ message: 'Order created successfully', order: savedOrder, orderId: savedOrder._id });


        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});


//===========================================================
//Add to Cart

// Assuming you have routes defined using Express.js
app.post("/auth/addtocartbook", async (req, res) => {
    try {
        // Extract productId and userId from the request body
        const { productId, userId } = req.body;

        // Validate incoming data
        if (!productId || !userId) {
            return res.status(400).json({ error: 'Missing required field' });
        }

        // Fetch the user from the database
        const user = await User_model.findById(userId);

        // Check if the productId already exists in the user's cart
        if (user.cart.includes(productId)) {
            return res.status(400).json({ error: 'Item is already in the cart' });
        }

        // Add the productId to the user's cart
        user.cart.push(productId);

        // Save the updated user document
        await user.save();

        // Return success response
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});

app.post("/auth/addtocartuniform", async (req, res) => {
    try {
        // Extract productId and userId from the request body
        const { productId, userId } = req.body;

        // Validate incoming data
        if (!productId || !userId) {
            return res.status(400).json({ error: 'Missing required field' });
        }

        // Fetch the user from the database
        const user = await User_model.findById(userId);

        // Check if the productId already exists in the user's cart
        if (user.cart.includes(productId)) {
            return res.status(400).json({ error: 'Item is already in the cart' });
        }

        // Add the productId to the user's cart
        user.cart.push(productId);

        // Save the updated user document
        await user.save();

        // Return success response
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});


app.post("/auth/removeuniformfromcart", async (req, res) => {
    const { productId, userId } = req.body;
    try {
        // Validate incoming data
        if (!productId || !userId) {
            return res.status(400).json({ error: 'Missing required field' });
        }

        // Find the user by userId
        const user = await User_model.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove the productId from the user's cart array
        user.cart = user.cart.filter(cartItem => cartItem.toString() !== productId.toString());

        // Save the updated user document
        await user.save();

        // Return success response
        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
});
app.post("/auth/removebookfromcart", async (req, res) => {
    const { productId, userId } = req.body;
    try {
        // Validate incoming data
        if (!productId || !userId) {
            return res.status(400).json({ error: 'Missing required field' });
        }

        // Find the user by userId
        const user = await User_model.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove the productId from the user's cart array
        user.cart = user.cart.filter(cartItem => cartItem.toString() !== productId.toString());

        // Save the updated user document
        await user.save();

        // Return success response
        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
});







app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
});