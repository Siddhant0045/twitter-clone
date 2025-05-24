const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const Tweet = require('../models/Tweet');

// GET /likes/:userId
// Fetch all tweets liked by a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all likes by the user and populate the tweet info
    const likes = await Like.find({ user: userId })
      .populate({
        path: 'tweet',
        populate: { path: 'author', select: 'username name' }
      })
      .sort({ createdAt: -1 });

    // Extract the tweets from the like documents
    const likedTweets = likes.map(like => like.tweet);

    res.status(200).json(likedTweets);
  } catch (err) {
    console.error('Error fetching liked tweets:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
