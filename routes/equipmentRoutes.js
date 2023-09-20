const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// Create a new equipment
router.post('/', async (req, res) => {
  try {
    const { name, description, quantity, sport } = req.body;
    const equipment = new Equipment({ name, description, quantity, sport });
    const savedEquipment = await equipment.save();
    res.status(201).json(savedEquipment);
  } catch (error) {
    res.status(500).json({ error: 'Could not save equipment' });
  }
});

// Get a list of all equipment for a specific sport
router.get('/:sportId', async (req, res) => {
  try {
    const { sportId } = req.params;
    const equipment = await Equipment.find({ sport: sportId });
   
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve equipment' });
  }
});

module.exports = router;
