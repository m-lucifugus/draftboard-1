const mongoose = require('mongoose');

const Pick = mongoose.model('Pick', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  position: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  team: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  bye: {
    type: Number,
  },
  selected_by: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
});

module.exports = {Pick};
