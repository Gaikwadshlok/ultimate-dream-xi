const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Access Denied. No token provided.' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};

// Save a new team
router.post('/save', verifyToken, async (req, res) => {
  const { teamName, players, formation, coachName } = req.body;

  if (!teamName || !players || players.length !== 11 /* || !formation */) {
    return res.status(400).json({ error: 'Team name, formation, and 11 players are required' });
  }

  // Ensure player objects have the necessary fields (id, name, position, number)
  const validatedPlayers = players.map(p => ({
    id: p.id, // Keep id if your schema uses it
    name: p.name,
    position: p.position,
    number: p.number // Explicitly include number
  }));

  try {
    const newTeam = new Team({
      userId: req.userId,
      teamName,
      players: validatedPlayers, // Use the validated/mapped players array
      formation,
      coachName,
    });
    await newTeam.save();
    res.status(201).json({ message: 'Team saved successfully!' });
  } catch (err) {
    console.error('Error saving team:', err);
    // Check for validation errors specifically
    if (err.name === 'ValidationError') {
        console.error('Validation Errors:', err.errors);
        return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    res.status(500).json({ error: 'Error saving team' });
  }
});

// Get all teams of the logged-in user
router.get('/my-teams', verifyToken, async (req, res) => {
  try {
    const teams = await Team.find({ userId: req.userId })
                            .populate('userId', 'username')
                            .sort({ createdAt: -1 });

    res.json(teams);
  } catch (err) {
    console.error('Error fetching teams:', err);
    res.status(500).json({ error: 'Error fetching teams' });
  }
});

// Delete a team by ID
router.delete('/:teamId', verifyToken, async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const userId = req.userId;

    const team = await Team.findOne({ _id: teamId, userId: userId });

    if (!team) {
      return res.status(404).json({ error: 'Team not found or unauthorized' });
    }

    await Team.deleteOne({ _id: teamId });

    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (err) {
    console.error('Error deleting team:', err);

    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid Team ID format' });
    }
    
    res.status(500).json({ error: 'Error deleting team' });
  }
});

module.exports = router;
