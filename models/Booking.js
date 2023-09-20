const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true,
  },
  venue: {
    type: String,
    ref: 'Venue',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  selectedEquipment: [
    {
      equipment: {
        type: String,
        ref: 'Equipment',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending',
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
  },
});

const BookingRequest = mongoose.model('BookingRequest', bookingSchema);

module.exports = BookingRequest;
