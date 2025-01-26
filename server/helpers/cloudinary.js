
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Load environment variables from .env file
require("dotenv").config();

// Configure Cloudinary with environment variables for sensitive data
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer memory storage for file handling
const storage = new multer.memoryStorage();

// Function to upload image to Cloudinary
async function imageUploadUtil(file) {
  // Upload the file to Cloudinary and return the result
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto", // Automatically detect file type
  });

  return result;
}

// Configure multer upload middleware
const upload = multer({ storage });

// Export the upload middleware and image upload utility function
module.exports = { upload, imageUploadUtil };
