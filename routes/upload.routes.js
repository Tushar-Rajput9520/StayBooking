const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadmodel = require('../models/upload.model.js');

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // use full path
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const uploadMiddleware = multer({ storage });

// GET: Render Upload Form
router.get('/upload', (req, res) => {
  res.render('upload'); // Ensure upload.ejs exists in views/
});

// POST: Handle Form Submission
router.post('/upload', uploadMiddleware.single('photo'), async (req, res) => {
  try {
    const { type, location, price, name, contact } = req.body;

    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const newProperty = new uploadmodel({
      type,
      location,
      price,
      name,
      contact,
      photo: req.file.filename
    });

    await newProperty.save();

    // Success Response with Tailwind-styled HTML
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Upload Success</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gradient-to-br from-green-400 to-blue-500 min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
          <h2 class="text-3xl font-bold text-green-600 mb-4">✅ Upload Successful!</h2>
          <p class="text-gray-700 mb-6">Your property details have been uploaded successfully.</p>
          <div class="flex justify-center gap-4">
            <a href="/upload" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">Upload Another</a>
            <a href="/" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition">Go Home</a>
          </div>
        </div>
      </body>
      </html>
    `);

  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
