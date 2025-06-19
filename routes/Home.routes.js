const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('Homepage'); // make sure Homepage view exists
});

module.exports = router;
