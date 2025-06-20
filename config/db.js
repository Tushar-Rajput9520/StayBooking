require('dotenv').config();
const mongoose = require('mongoose');

function connectToDB() {
  console.log("🔍 MONGO_URI =", process.env.MONGO_URI); // Debug
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
}

module.exports = connectToDB; // ✅ Use CommonJS
