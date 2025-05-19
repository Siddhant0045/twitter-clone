const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const likeRoutes = require('./routes/likeRoutes');
const followRoutes = require('./routes/followRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://Siddhant_Shinde:siddhant%4045@twitterclonehaha.it7tny4.mongodb.net/?retryWrites=true&w=majority&appName=TwitterCloneHaHa')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Mount routes with base paths
app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/api/tweets/test', (req, res) => {
  res.json({ message: "Test route works!" });
});