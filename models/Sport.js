const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
