const express = require('express');
const Room = require('../models/room.model');

const router = express.Router();

router.get('/stay', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.render('stayview', { rooms }); // make sure `views/stayview.ejs` exists
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
