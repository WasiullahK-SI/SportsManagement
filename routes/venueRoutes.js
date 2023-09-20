const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

// Create a new venue
router.post('/', async (req, res) => {
  try {
    const { name, duration, sport } = req.body;
    const venue = new Venue({ name, duration, sport });
    const savedVenue = await venue.save();
    res.status(201).json(savedVenue);
  } catch (error) {
    res.status(500).json({ error: 'Could not save venue' });
  }
});

// Get a list of all venues for a specific sport
router.get('/:sportId', async (req, res) => {
  try {
    const { sportId } = req.params;
    const venues = await Venue.find({ sport: sportId });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve venues' });
  }
});

module.exports = router;
