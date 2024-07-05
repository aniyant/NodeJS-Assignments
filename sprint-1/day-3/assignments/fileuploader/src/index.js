const express = require('express');
const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: 'your_cloud_name',
//   api_key: 'your_api_key',
//   api_secret: 'your_api_secret'
// });

// // Multer configuration for Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads',
//     format: async (req, file) => 'png', // supports promises as well
//     public_id: (req, file) => file.originalname.split('.')[0],
//   },
// });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage: storage });

const app = express();

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle file upload
app.post('/upload', upload.single('avatar'), (req, res) => {
    console.log(req.file);
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const imageUrl = req.file.path;
  res.status(200).json({
    message: 'file uploaded successfully',
    imageUrl: imageUrl
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
