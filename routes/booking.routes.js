const express = require('express');
const router = express.Router();
const BookingModel = require('../models/booking.model');

// GET booking form page
router.get('/booking', (req, res) => {
  const options = [
    { type: 'hostel', name: 'Hostel', price: '1 Lakh/year' },
    { type: 'pg', name: 'PG', price: '₹8000/month' },
    { type: 'flat', name: 'Flat', price: '₹1000/month' }
  ];

  res.render('booking', {
    rooms: options,
    selectedRoomType: req.query.type || 'pg',
    selectedLocation: req.query.location || '',
    selectedPhoto: req.query.photo || ''
  });
});

// POST booking form data
router.post('/booking', async (req, res) => {
  try {
    const { name, phone, email, roomType, checkin, checkout, location, photo } = req.body;

    if (!name || !phone || !email || !roomType || !checkin || !checkout || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newBooking = await BookingModel.create({
      name,
      phone,
      email,
      roomType,
      checkin,
      checkout,
      location,
      photo
    });

    console.log('✅ New booking created:', newBooking);

    res.status(200).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });

  } catch (error) {
    console.error('❌ Booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
