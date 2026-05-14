const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
  date: String,
  weight: Number,
  steps: Number,
  water: Number,
  sleep: Number,
  calories: Number,
  mood: String,
  notes: String
});

module.exports = mongoose.model('Health', healthSchema);