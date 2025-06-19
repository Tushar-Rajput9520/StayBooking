// Importing dependencies using CommonJS


const express = require('express');
require('dotenv').config();
const connectToDB = require('./config/db.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Importing routes
const userRouter = require('./routes/user.routes.js');
const bookingRouter = require('./routes/booking.routes.js');
const nextRouter = require('./routes/next.routes.js');
const homepg = require('./routes/Home.routes.js');
const contactRoutes = require('./routes/contact.routes.js');
const contactHome = require('./routes/contacthome.routes.js');
const stayroom = require('./routes/stayview.routes.js');
const adminRouter = require('./routes/adminlog.routes.js');
const uploadRouter = require('./routes/upload.routes.js');

// DB connection


// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to database
connectToDB();

// View engine setup
app.set('view engine', 'ejs');

// Middleware
app.use(cookieParser());
app.use(session({
    secret: 'yourSecretKey', // Change in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/', uploadRouter);
app.use('/book', bookingRouter);
app.use('/user', userRouter);
app.use(nextRouter);
app.use('/', contactRoutes);
app.use('/', contactHome);
app.use('/', homepg);
app.use('/', stayroom);
app.use('/admin', adminRouter);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
