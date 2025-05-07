const express = require('express');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

router.get('/dashboard', auth, async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'email'] });
  res.json(users);
});

module.exports = router;