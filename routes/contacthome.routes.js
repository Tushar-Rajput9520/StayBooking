const express = require('express');
const Contact = require('../models/contacthome.model');

const router = express.Router();

// POST / — Handle contact form submissions
router.post('/', async (req, res) => {
  try {
    console.log('📥 Incoming POST to /');
    console.log('📝 Request Body:', req.body);

    const { name, email, phone, message } = req.body;

    // Validate all required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });

  } catch (error) {
    console.error('❌ Error saving contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, please try again later.',
    });
  }
});

module.exports = router;
