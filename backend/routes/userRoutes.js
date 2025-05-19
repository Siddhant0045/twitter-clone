const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this path is correct

// Get all users (optional)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash'); // Exclude password hash
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get single user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create new user (POST route you need)
router.post('/', async (req, res) => {
  try {
    const { uid, name, email, photoURL } = req.body;

    // Optional: Check if user already exists by uid or email (avoid duplicates)
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({
      uid,
      name,
      email,
      photoURL,
      username: email.split('@')[0] || name.split(' ')[0], // Default username from email if not provided
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;
