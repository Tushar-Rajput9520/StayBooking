const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Render Registration Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register New User
router.post(
  '/register',
  body('email').trim().isEmail().withMessage('Enter a valid email'),
  body('password').trim().isLength({ min: 5 }).withMessage('Password too short'),
  body('username').trim().isLength({ min: 3 }).withMessage('Username too short'),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        message: 'Invalid Data',
      });
    }

    try {
      const { email, username, password } = req.body;

      const userExists = await usermodel.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await usermodel.create({
        email,
        username,
        password: hashPassword,
      });

      res.status(200).json({
        success: true,
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          email: newUser.email,
          username: newUser.username,
        },
      });
    } catch (err) {
      console.error('Registration Error:', err.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
);

// Render Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle Login
router.post(
  '/login',
  body('email').trim().isEmail().withMessage('Enter a valid email'),
  body('password').trim().isLength({ min: 5 }).withMessage('Password too short'),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        message: 'Invalid Data',
      });
    }

    try {
      const { email, password } = req.body;

      const user = await usermodel.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Email or password incorrect' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Email or password incorrect' });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.cookie('token', token, { httpOnly: true });

      res.status(200).json({
        success: true,
        message: 'Login successful',
        redirect: '/stay',
      });
    } catch (err) {
      console.error('Login Error:', err.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
);

// Logout Route
router.get('/logout', (req, res) => {
  req.session?.destroy((err) => {
    if (err) {
      console.log('Logout Error:', err);
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.clearCookie('token');
    res.redirect('/');
  });
});

module.exports = router;
