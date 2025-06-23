const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const likeRoutes = require('./routes/likeRoutes');
const followRoutes = require('./routes/followRoutes');
const checkingRoutes = require('./routes/checkingroute');
const giveObjectIdRoutes = require('./routes/giveobjectid');
const userlikedRoutes = require('./routes/userlikedtweets');
const userTweetsRoute = require('./routes/usertweets');
const updateBioRoute = require('./routes/updatebio');
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure your Cloudinary credentials here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

require('dotenv').config();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "twitter_clone_images",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

const upload = multer({ storage: storage });
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Mount routes with base paths
app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/checking', checkingRoutes);
app.use('/api/objectid', giveObjectIdRoutes);
app.use('/api/userlikedtweets', userlikedRoutes);
app.use('/api/usertweets', userTweetsRoute);
app.use('/api/updatebio', updateBioRoute);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/api/tweets/test', (req, res) => {
  res.json({ message: "Test route works!" });
});