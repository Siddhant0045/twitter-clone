const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet');

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId.trim();

    const tweets = await Tweet.find({ author: userId })
      .sort({ createdAt: -1 }); // Most recent tweets first

    res.status(200).json(tweets);
  } catch (err) {
    console.error('Error fetching user tweets:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
