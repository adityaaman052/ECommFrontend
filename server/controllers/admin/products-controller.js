const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

// Function to handle image uploads
const handleImageUpload = async (req, res) => {
  try {
    // Convert the uploaded file into a base64-encoded string
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload the image to the cloud using a helper utility
    const result = await imageUploadUtil(url);

    // Return the uploaded image details if successful
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    // Handle any errors during the upload process
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Function to add a new product
const addProduct = async (req, res) => {
  try {
    // Extract product details from the request body
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    // Create a new product instance with the provided details
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    // Save the new product to the database
    await newlyCreatedProduct.save();

    // Return the newly created product details
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    // Handle any errors during product creation
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Function to fetch all products from the database
const fetchAllProducts = async (req, res) => {
  try {
    // Get all products from the database
    const listOfProducts = await Product.find({});

    // Return the list of products
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    // Handle any errors during fetching
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Function to edit an existing product
const editProduct = async (req, res) => {
  try {
    // Get the product ID from request parameters
    const { id } = req.params;

    // Extract updated product details from the request body
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    // Find the product by its ID
    let findProduct = await Product.findById(id);

    // If the product is not found, return a 404 error
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update the product details (only the provided fields)
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    // Save the updated product back to the database
    await findProduct.save();

    // Return the updated product details
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    // Handle any errors during the update
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Function to delete a product
const deleteProduct = async (req, res) => {
  try {
    // Get the product ID from request parameters
    const { id } = req.params;

    // Find and delete the product by its ID
    const product = await Product.findByIdAndDelete(id);

    // If the product is not found, return a 404 error
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Return a success message after deletion
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    // Handle any errors during the deletion
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Exporting all functions so they can be used elsewhere
module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
