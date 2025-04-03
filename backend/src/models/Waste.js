const mongoose = require('mongoose');

const wasteSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
    enum: ['prep', 'plate', 'storage', 'other']
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  reason: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Waste = mongoose.model('Waste', wasteSchema);

module.exports = Waste; 