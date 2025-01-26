const Feature = require("../../models/Feature");

// Function to add a new feature image
const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body; // Extract the image URL or data from the request body

    console.log(image, "image"); // Log the image data for debugging purposes

    // Create a new Feature document with the provided image
    const featureImages = new Feature({
      image,
    });

    // Save the new feature image to the database
    await featureImages.save();

    // Respond with the created feature image and a success message
    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    // Handle errors during image creation
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Function to fetch all feature images
const getFeatureImages = async (req, res) => {
  try {
    // Retrieve all feature images from the database
    const images = await Feature.find({});

    // Respond with the list of feature images and a success message
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    // Handle errors during data retrieval
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Export the functions for use in other parts of the application
module.exports = { addFeatureImage, getFeatureImages };
