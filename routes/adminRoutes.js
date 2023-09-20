// adminRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin  = require('../models/Admin');

// Admin registration
router.post('/register/admin', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hashedPassword });
  await admin.save();
  res.sendStatus(201); // Created
});

// Admin login
router.post('/login/admin', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) {
    res.status(401).json({ message: 'Username not found' });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);
  if (passwordMatch) {
    res.status(200).json({ message: 'Admin authenticated' });
  } else {
    res.status(401).json({ message: 'Password incorrect' });
  }
});

module.exports = router;
