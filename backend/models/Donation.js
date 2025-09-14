const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['produce', 'bakery', 'canned goods', 'prepared meals', 'other'],
    required: true,
  },
  pickupTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'picked up'],
    default: 'available',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Donation', donationSchema);