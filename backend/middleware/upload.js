const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dkblqemw6", 
    api_key: "228236138866173",      
    api_secret: "0sbPnU-cmVxdwrcmUJMP8wVumwA",
});

// Set up storage engine using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'twitter-clone',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
});

const upload = multer({ storage });

module.exports = upload;