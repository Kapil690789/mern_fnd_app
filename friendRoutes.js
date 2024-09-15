const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Send friend request
router.post('/request', async (req, res) => {
    const { userId, friendId } = req.body;
    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);
        if (friend && !friend.friendRequests.includes(userId)) {
            friend.friendRequests.push(userId);
            await friend.save();
        }
        res.json({ message: 'Friend request sent' });
    } catch (err) {
        res.status(500).json({ message: 'Error sending request' });
    }
});

// Accept friend request
router.post('/accept', async (req, res) => {
    const { userId, friendId } = req.body;
    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (user && friend) {
            user.friends.push(friendId);
            friend.friends.push(userId);

            // Remove friend request
            user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);
            await user.save();
            await friend.save();
        }

        res.json({ message: 'Friend request accepted' });
    } catch (err) {
        res.status(500).json({ message: 'Error accepting request' });
    }
});

// Get friend recommendations based on mutual friends
router.get('/recommendations/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).populate('friends');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const recommendations = await User.find({
            _id: { $nin: user.friends.map(f => f._id), $ne: userId }
        });

        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching recommendations' });
    }
});

module.exports = router;
