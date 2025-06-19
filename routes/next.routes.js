const express = require('express');
const router = express.Router();

router.get("/next", (req, res) => {
  res.render("next"); // This should match your .ejs file name
});
module.exports = router;


