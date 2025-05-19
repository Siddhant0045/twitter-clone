const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const Tweet = require('../models/Tweet');
const User = require('../models/User');


// Like a tweet
router.post('/', async (req, res) => {
  try {
    const { tweet, user: firebaseUid } = req.body;

    const user = await User.findOne({ uid: firebaseUid }); // 'uid' should be Firebase UID field in your User model
    if (!user) return res.status(400).json({ error: 'User not found' });

    const tweetExists = await Tweet.exists({ _id: tweet });
    if (!tweetExists) return res.status(400).json({ error: 'Tweet not found' });

    const like = new Like({ tweet, user: user._id });
    await like.save();
    res.status(201).json(like);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to like tweet or already liked' });
  }
});



// Unlike a tweet
router.delete('/', async (req, res) => {
  try {
    const { tweet, user: firebaseUid } = req.body;

    const user = await User.findOne({ uid: firebaseUid });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const result = await Like.findOneAndDelete({ tweet, user: user._id });
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

// GET /api/likes/isLiked?tweetId=xxx&userId=FIREBASE_UID
router.get('/isLiked', async (req, res) => {
  try {
    const { tweetId, userId: firebaseUid } = req.query;

    const user = await User.findOne({ uid: firebaseUid });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const liked = await Like.exists({ tweet: tweetId, user: user._id });
    res.json({ liked: !!liked });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check like status' });
  }
});



module.exports = router;
