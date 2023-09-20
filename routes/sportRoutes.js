const express = require('express');
const router = express.Router();
const Sport = require('../models/Sport');

// Create a new sport
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const sport = new Sport({ name });
    const savedSport = await sport.save();
    res.status(201).json(savedSport);
  } catch (error) {
    res.status(500).json({ error: 'Could not save sport' });
  }
});

// Get a list of all sports
router.get('/', async (req, res) => {
  try {
    const sports = await Sport.find();
    res.json(sports);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve sports' });
  }
});

module.exports = router;
