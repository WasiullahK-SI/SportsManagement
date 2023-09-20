const express = require('express');
const router = express.Router();
const BookingRequest = require('../models/Booking');
const Employee = require('../models/Employee'); // Import the Employee model for employee data

// Create a new booking request
router.post('/', async (req, res) => {
  try {
    const { sport, venue, startTime, selectedEquipment, status } = req.body;
    console.log('Received booking request:', req.body); // Log the received data
    const newBookingRequest = new BookingRequest({
      sport,
      venue,
      startTime,
      selectedEquipment,
      status,
    });
    const savedBookingRequest = await newBookingRequest.save();
    res.status(201).json(savedBookingRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not save booking request' });
  }
});

// Get a list of all pending booking requests for a specific sport
// Get a list of all pending booking requests for a specific sport
router.get('/', async (req, res) => {
  try {
    const pendingRequests = await BookingRequest.find({
      status: 'pending',
    }).populate('sport', 'venue'); // Populate the 'sport' field to get the sport name

    res.json(pendingRequests);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve pending booking requests' });
  }
});


// Admin approves a booking request
router.put('/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Check if the booking request is in 'pending' state
    const bookingRequest = await BookingRequest.findById(bookingId);
    if (!bookingRequest) {
      return res.status(404).json({ error: 'Booking request not found' });
    }

    if (bookingRequest.status !== 'pending') {
      return res.status(400).json({ error: 'Booking request is not in pending state' });
    }

    // Update the booking request status to approved
    await BookingRequest.findByIdAndUpdate(bookingId, { status: 'approved' });

    // Retrieve the employee's socket ID (you need to implement this part)
    const employeeSocketId = getEmployeeSocketId(bookingRequest.employeeId);

    // Emit a real-time notification to the employee
    if (employeeSocketId) {
      const notificationMessage = 'Your booking request has been approved!';
      io.to(employeeSocketId).emit('notification', notificationMessage);
    }

    res.json({ message: 'Booking request approved' });
  } catch (error) {
    res.status(500).json({ error: 'Could not approve booking request' });
  }
});





module.exports = router;
