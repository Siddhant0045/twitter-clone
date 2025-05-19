const express = require('express');
const router = express.Router();
const Follow = require('../models/Follow');
const User = require('../models/User');

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

    // Create new follow document
    const follow = new Follow({ follower: followerUser._id, following });
    await follow.save();

    // Update User followers/following arrays
    await User.findByIdAndUpdate(following, {
      $addToSet: { followers: followerUser._id }
    });

    await User.findByIdAndUpdate(followerUser._id, {
      $addToSet: { following: following }
    });

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

    // Remove from User followers/following arrays
    await User.findByIdAndUpdate(following, {
      $pull: { followers: followerUser._id }
    });

    await User.findByIdAndUpdate(followerUser._id, {
      $pull: { following: following }
    });

    res.json({ message: 'Unfollowed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
});

module.exports = router;