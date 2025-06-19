const mongoose = require('mongoose');

const contactHomeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  // Add other fields as needed
});

// Avoid recompiling the model if already defined
module.exports = mongoose.models.Contact || mongoose.model('Contact', contactHomeSchema);
