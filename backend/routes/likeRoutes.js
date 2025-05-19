const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const Tweet = require('../models/Tweet');
const User = require('../models/User');


// Like a tweet
router.post('/', async (req, res) => {
  try {
    const { tweet, user } = req.body;

    // Optional: Validate tweet and user existence
    const tweetExists = await Tweet.exists({ _id: tweet });
    const userExists = await User.exists({ _id: user });
    if (!tweetExists || !userExists) {
      return res.status(400).json({ error: 'Tweet or User not found' });
    }

    const like = new Like({ tweet, user });
    await like.save();
    res.status(201).json(like);
  } catch (err) {
    console.error(err); // 👈 important
    res.status(400).json({ error: 'Failed to like tweet or already liked' });
  }
});


// Unlike a tweet
router.delete('/', async (req, res) => {
  try {
    const { tweet, user } = req.body;
    const result = await Like.findOneAndDelete({ tweet, user });
    if (!result) return res.status(404).json({ error: 'Like not found' });
    res.json({ message: 'Unliked successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unlike tweet' });
  }
});

// Get likes count for a tweet
router.get('/count/:tweetId', async (req, res) => {
  try {
    const count = await Like.countDocuments({ tweet: req.params.tweetId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get like count' });
  }
});

module.exports = router;
