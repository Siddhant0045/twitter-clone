const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet');
const User = require('../models/User');

// Get all tweets
router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .populate('author', 'name photoURL') 
      .sort({ createdAt: -1 });
    res.json(tweets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
});

// Create a new tweet
router.post('/', async (req, res) => {
  try {
    const { content, author: userUid, email } = req.body;

    if (!content || !userUid || !email) {
      return res.status(400).json({ error: 'Content and author uid are required' });
    }

    // Find user by uid
    const user = await User.findOne({ uid: userUid });
    if (!user) {
      return res.status(404).json({ error: 'User not found with this uid' });
    }

    // Create tweet with user's ObjectId
    const tweet = new Tweet({ content, author: user._id, email });
    await tweet.save();

    res.status(201).json(tweet);
  } catch (err) {
    console.error('Failed to create tweet:', err);
    res.status(400).json({ error: 'Failed to create tweet', details: err.message });
  }
});

// Get tweets by user UID (not ObjectId)
router.get('/user/:userUid', async (req, res) => {
  const userUid = req.params.userUid;
  const user = await User.findOne({ uid: userUid });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const tweets = await Tweet.find({ author: user._id })
    .populate('author', 'name photoURL uid')
    .sort({ createdAt: -1 });

  res.json(tweets);
});

module.exports = router;
