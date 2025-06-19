const express = require("express");
const router = express.Router();
const Contact = require('../models/contact.model'); // No .js needed in CommonJS

// POST /stay route to handle contact form submissions
router.post('/stay', async (req, res) => {
  try {
    console.log('📩 Incoming POST to /stay');
    console.log('📝 Request body:', req.body);

    const { name, email, phone, message } = req.body;

    // Check for required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Create and save contact entry
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('❌ Error saving contact:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again.' 
    });
  }
});

module.exports = router;
