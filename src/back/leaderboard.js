const express = require('express');
const router = express.Router();
const pool = require('./db');

// Get leaderboard entries
router.get('/leaderboard', (req, res) => {
    pool.query('SELECT * FROM LeaderBoard ORDER BY time ASC', (error, results) => {
        if (error) {
            console.error('Error retrieving leaderboard:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});

// Add new entry to leaderboard
router.post('/leaderboard', (req, res) => {
    const { nickname, time } = req.body;
    if (!nickname || !time) {
        return res.status(400).json({ error: 'Nickname and time are required' });
    }
    pool.query('INSERT INTO LeaderBoard (nickname, time) VALUES (?, ?)', [nickname, time], (error, results) => {
        if (error) {
            console.error('Error adding to leaderboard:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ message: 'Leaderboard entry added successfully' });
        }
    });
});

module.exports = router;
