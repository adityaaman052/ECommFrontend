const Product = require("../../models/Product");

// Function to search products based on a keyword
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params; // Extract keyword from request parameters

    // Validate the keyword input
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false, // Typo corrected (succes -> success)
        message: "Keyword is required and must be in string format", // If the keyword is invalid, return an error message
      });
    }

    // Create a case-insensitive regular expression for the keyword
    const regEx = new RegExp(keyword, "i");

    // Build the search query to match the keyword in any of these fields: title, description, category, or brand
    const createSearchQuery = {
      $or: [
        { title: regEx }, // Search for products whose title contains the keyword
        { description: regEx }, // Search for products whose description contains the keyword
        { category: regEx }, // Search for products in categories that match the keyword
        { brand: regEx }, // Search for products by brand that match the keyword
      ],
    };

    // Execute the search query on the Product model
    const searchResults = await Product.find(createSearchQuery);

    // Return the search results in the response
    res.status(200).json({
      success: true,
      data: searchResults, // Send the found products as the response data
    });
  } catch (error) {
    console.log(error); // Log any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Error", // Return an error response if something goes wrong
    });
  }
};

module.exports = { searchProducts };
