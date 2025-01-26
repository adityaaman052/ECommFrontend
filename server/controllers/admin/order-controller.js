const Order = require("../../models/Order");

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find({});

    // Return a message if no orders are found
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    // Return the list of orders if found
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    // Handle any errors and return a 500 status
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    // Get the order ID from request parameters and fetch the order details
    const { id } = req.params;
    const order = await Order.findById(id);

    // Return a message if the order is not found
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Return the order details if found
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    // Handle any errors and return a 500 status
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    // Get the order ID from request parameters and the new status from request body
    const { id } = req.params;
    const { orderStatus } = req.body;

    // Fetch the order by its ID to check if it exists
    const order = await Order.findById(id);

    // Return a message if the order is not found
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Update the status of the order in the database
    await Order.findByIdAndUpdate(id, { orderStatus });

    // Return a success message after the update
    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!",
    });
  } catch (e) {
    // Handle any errors and return a 500 status
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
