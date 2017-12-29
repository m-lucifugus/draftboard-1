const mongoose = require('mongoose');

const draftSchema = mongoose.Schema({
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

draftSchema.methods.roundsComplete = function () {
  return Math.floor(this.picks.length / 10);
}

draftSchema.methods.currentRound = function () {
  return this.roundsComplete() + 1;
}

draftSchema.methods.pickInRound = function () {
  return this.picks.length % 10;
}

draftSchema.methods.snakeRound = function () {
  return roundsComplete % 2 !== 0;
}

draftSchema.methods.current_team_picking = function () {
  var picksCount = this.picks.length;
  var roundsComplete = Math.floor(picksCount / 10);
  var pickInRound = picksCount % 10;
  var reverseRound = roundsComplete % 2 !== 0;

  var teamIndex = reverseRound ? 9 - pickInRound : pickInRound;
  var team = this.teams[teamIndex];

  return team;
}

const Draft = mongoose.model('Draft', draftSchema);

module.exports = {Draft};
