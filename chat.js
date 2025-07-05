const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.json({ msg: 'chat endpoint' });
});
module.exports = router;