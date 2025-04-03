const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
  regNo: {
    type: String,
    required: [true, 'Registration number is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{2}[A-Z]{3}\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid registration number! Format should be: 23CSE0001`
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s]*$/.test(v);
      },
      message: props => `${props.value} can only contain letters and spaces!`
    }
  },
  block: {
    type: String,
    required: [true, 'Block is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^[A-Z]$/.test(v);
      },
      message: props => `${props.value} must be a single uppercase letter!`
    }
  },
  roomNumber: {
    type: String,
    required: [true, 'Room number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{3}$/.test(v);
      },
      message: props => `${props.value} must be a 3-digit number!`
    }
  },
  mess: {
    type: String,
    required: [true, 'Mess selection is required'],
    enum: ['Anna Mess', 'Bharathiar Mess', 'Tagore Mess', 'Gandhi Mess']
  },
  messType: {
    type: String,
    required: [true, 'Mess type is required'],
    enum: ['Veg', 'Non-Veg', 'Special', 'Night mess']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better query performance
studentSchema.index({ regNo: 1 });
studentSchema.index({ block: 1, roomNumber: 1 });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student; 