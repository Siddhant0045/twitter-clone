const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Update path as needed

// POST /api/updatebio
router.post('/', async (req, res) => {
    const { uid, bio } = req.body;

  if (!uid || typeof bio !== 'string') {
    return res.status(400).json({ message: 'UID and bio are required' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { bio },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Bio updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating bio:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
