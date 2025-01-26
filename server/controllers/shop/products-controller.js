const Product = require("../../models/Product");

// Fetch filtered products based on category, brand, and sorting options
const getFilteredProducts = async (req, res) => {
  try {
    // Destructure query parameters with default values
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    // Initialize filters object for querying products
    let filters = {};

    // Add category filter if provided
    if (category.length) {
      filters.category = { $in: category.split(",") }; // Filter by categories passed in the query
    }

    // Add brand filter if provided
    if (brand.length) {
      filters.brand = { $in: brand.split(",") }; // Filter by brands passed in the query
    }

    // Initialize sorting object
    let sort = {};

    // Set the sorting order based on the provided `sortBy` value
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1; // Sort by price from low to high
        break;
      case "price-hightolow":
        sort.price = -1; // Sort by price from high to low
        break;
      case "title-atoz":
        sort.title = 1; // Sort by title from A to Z
        break;
      case "title-ztoa":
        sort.title = -1; // Sort by title from Z to A
        break;
      default:
        sort.price = 1; // Default sort by price (low to high)
        break;
    }

    // Fetch products from the database with the applied filters and sorting
    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products, // Return filtered and sorted products
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured", // Handle any error during the process
    });
  }
};

// Fetch the details of a specific product by its ID
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract product ID from the request parameters
    const product = await Product.findById(id); // Find the product by ID

    // If the product is not found, return a 404 response
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!", // Handle case where product doesn't exist
      });

    // Return the product details if found
    res.status(200).json({
      success: true,
      data: product, // Return product details in the response
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured", // Handle any error during the process
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails }; 
