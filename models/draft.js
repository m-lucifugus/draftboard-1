const mongoose = require('mongoose');

const Draft = mongoose.model('Draft', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  teams: {
    type: Array
  },
  picks: {
    type: Array
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Draft};
