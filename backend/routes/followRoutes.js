const express = require('express');
const router = express.Router();
const Follow = require('../models/Follow');

// Follow a user
router.post('/', async (req, res) => {
  try {
    const { follower, following } = req.body;
    if (follower === following) return res.status(400).json({ error: "Can't follow yourself" });
    const follow = new Follow({ follower, following });
    await follow.save();
    res.status(201).json(follow);
  } catch (err) {
    res.status(400).json({ error: 'Failed to follow or already following' });
  }
});

// Unfollow a user
router.delete('/', async (req, res) => {
  try {
    const { follower, following } = req.body;
    const result = await Follow.findOneAndDelete({ follower, following });
    if (!result) return res.status(404).json({ error: 'Follow not found' });
    res.json({ message: 'Unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
});

// Get followers of a user
router.get('/followers/:userId', async (req, res) => {
  try {
    const followers = await Follow.find({ following: req.params.userId }).populate('follower', 'username profilePicUrl');
    res.json(followers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get followers' });
  }
});

// Get following of a user
router.get('/following/:userId', async (req, res) => {
  try {
    const following = await Follow.find({ follower: req.params.userId }).populate('following', 'username profilePicUrl');
    res.json(following);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get following' });
  }
});

module.exports = router;
