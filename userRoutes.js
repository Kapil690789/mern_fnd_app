const express = require('express');
const User = require('../models/User');


const router = express.Router();

// Search users by username
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const users = await User.find({ username: { $regex: query, $options: 'i' } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error searching users' });
    }
});

// Get user profile (including friends and requests)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('friends').populate('friendRequests');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user' });
    }
});

module.exports = router;
