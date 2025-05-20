const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust path as needed

// Route 4: Check if Firebase UID user follows target user by _id
router.get('/follows', async (req, res) => {
    try {
      const { firebaseUid, targetObjectId } = req.query;
  
      if (!firebaseUid || !targetObjectId) {
        return res.status(400).json({ error: 'firebaseUid and targetObjectId are required' });
      }
  
      const currentUser = await User.findOne({ uid: firebaseUid });
      if (!currentUser) return res.status(404).json({ error: 'User with given uid not found' });
  
      const follows = currentUser.following.some(
        (_id) => _id.equals(targetObjectId)
    );
  
      res.json({ follows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
router.get('/test', (req, res) => {
    res.send('Router is working');
  });

module.exports = router;
