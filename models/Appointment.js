const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id:      { type: String, required: true, unique: true },
  name:    { type: String, required: true, trim: true },
  phone:   { type: String, required: true, trim: true },
  service: { type: String, required: true },
  date:    { type: String, default: '', index: true },
  time:    { type: String, default: '' },
  msg:     { type: String, default: '' },
  status:  { type: String, enum: ['New','Confirmed','Done','Cancelled'], default: 'New', index: true },
  created: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', schema);