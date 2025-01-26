const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Add a product to the user's cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate request data
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!", // Return error if data is invalid
      });
    }

    // Find the product in the database
    const product = await Product.findById(productId);

    // If product is not found, return an error
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found", // Return error if product is not found
      });
    }

    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] }); // Create a new cart if user doesn't have one
    }

    // Check if the product is already in the cart
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // If the product isn't in the cart, add it
    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      // If the product is already in the cart, update the quantity
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    // Save the updated cart
    await cart.save();
    
    res.status(200).json({
      success: true,
      data: cart, // Return updated cart
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error", // Handle server error
    });
  }
};

// Fetch all items in the user's cart
const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate that userId is provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory!", // Error if userId is missing
      });
    }

    // Find the user's cart and populate product details
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice", // Populate specific product details
    });

    // If the cart is not found, return an error
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!", // Cart doesn't exist
      });
    }

    // Filter out invalid items (products that no longer exist in the database)
    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    // Update cart if there are invalid products and save
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    // Map the cart items with the populated product details
    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    // Return populated cart items
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc, // Include all other cart data
        items: populateCartItems, // Include the updated items
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error", // Handle server error
    });
  }
};

// Update the quantity of a product in the cart
const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input data
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!", // Error if data is invalid
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!", // Return error if cart doesn't exist
      });
    }

    // Find the product in the cart
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // If product isn't found, return error
    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present !", // Error if product isn't in cart
      });
    }

    // Update the quantity of the product
    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    // Populate cart with updated product details
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice", // Populate product details
    });

    // Map cart items with updated details
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    // Return updated cart data
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems, // Return updated items
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error", // Handle server error
    });
  }
};

// Delete a product from the cart
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Validate that both userId and productId are provided
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!", // Error if missing data
      });
    }

    // Find the user's cart and populate product details
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice", // Populate product details
    });

    // If cart isn't found, return error
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!", // Return error if cart doesn't exist
      });
    }

    // Filter out the product to be deleted
    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    // Save updated cart
    await cart.save();

    // Populate updated cart with product details
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice", // Populate product details
    });

    // Map cart items with updated details
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    // Return updated cart data
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems, // Return updated items
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error", // Handle server error
    });
  }
};

module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
};
