// backend/models/Team.js
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  formation: {
    type: String,
    required: false,
  },
  coachName: {
    type: String,
    required: false,
  },
  players: [
    {
      id: Number,
      name: String,
      position: String,
      number: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Team', TeamSchema);
