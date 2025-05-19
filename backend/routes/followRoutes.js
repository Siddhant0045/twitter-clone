const express = require('express');
const router = express.Router();
const Follow = require('../models/Follow');
const User = require('../models/User'); // Import your User model

// Follow a user
router.post('/', async (req, res) => {
  try {
    const { follower: followerFirebaseUID, following } = req.body;

    // Find follower user by Firebase UID
    const followerUser = await User.findOne({ uid: followerFirebaseUID });
    if (!followerUser) return res.status(400).json({ error: 'Follower user not found' });

    if (followerUser._id.toString() === following) {
      return res.status(400).json({ error: "Can't follow yourself" });
    }

    // Check if follow relationship already exists
    const existingFollow = await Follow.findOne({
      follower: followerUser._id,
      following,
    });

    if (existingFollow) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    const follow = new Follow({ follower: followerUser._id, following });
    await follow.save();
    res.status(201).json(follow);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to follow user' });
  }
});

// Unfollow a user
router.delete('/', async (req, res) => {
  try {
    const { follower: followerFirebaseUID, following } = req.body;

    // Find follower user by Firebase UID
    const followerUser = await User.findOne({ uid: followerFirebaseUID });
    if (!followerUser) return res.status(400).json({ error: 'Follower user not found' });

    const result = await Follow.findOneAndDelete({
      follower: followerUser._id,
      following,
    });

    if (!result) return res.status(404).json({ error: 'Follow relationship not found' });

    res.json({ message: 'Unfollowed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
});

// Get followers of a user
router.get('/followers/:userId', async (req, res) => {
  try {
    const followers = await Follow.find({ following: req.params.userId }).populate('follower', 'username profilePicUrl');
    res.json(followers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get followers' });
  }
});

// Get following of a user
router.get('/following/:userId', async (req, res) => {
  try {
    const following = await Follow.find({ follower: req.params.userId }).populate('following', 'username profilePicUrl');
    res.json(following);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get following' });
  }
});

module.exports = router;
