const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Create a new order and initiate PayPal payment
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // Prepare the PayPal payment JSON for creating the payment
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return", // URL for success
        cancel_url: "http://localhost:5173/shop/paypal-cancel", // URL for cancellation
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title, // Product title
              sku: item.productId, // Product ID
              price: item.price.toFixed(2), // Product price
              currency: "USD", // Currency for payment
              quantity: item.quantity, // Quantity of the product
            })),
          },
          amount: {
            currency: "USD", // Currency for the payment
            total: totalAmount.toFixed(2), // Total amount to be paid
          },
          description: "description", // Optional description of the payment
        },
      ],
    };

    // Create the PayPal payment using the payment details
    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error); // Log error if PayPal payment creation fails

        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment", // Return error response
        });
      } else {
        // If payment creation is successful, save the order in the database
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        // Find the approval URL for the PayPal payment and return it to the client
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL, // URL to redirect for payment approval
          orderId: newlyCreatedOrder._id, // Newly created order ID
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!", // Handle server error
    });
  }
};

// Capture the payment after the user approves the PayPal payment
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId); // Find the order by ID

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found", // Return error if order not found
      });
    }

    // Update order status after payment capture
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    // Reduce the stock of the products in the order
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`, // Handle out-of-stock product
        });
      }

      // Reduce the product stock based on quantity purchased
      product.totalStock -= item.quantity;

      await product.save(); // Save the updated product
    }

    // Delete the cart once the order is confirmed
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save(); // Save the updated order

    res.status(200).json({
      success: true,
      message: "Order confirmed", // Return confirmation of successful order
      data: order, // Return the updated order details
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!", // Handle server error
    });
  }
};

// Fetch all orders placed by a specific user
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }); // Find all orders by userId

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!", // Return error if no orders are found
      });
    }

    res.status(200).json({
      success: true,
      data: orders, // Return the user's orders
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!", // Handle server error
    });
  }
};

// Fetch details of a specific order by its ID
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id); // Find order by ID

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!", // Return error if order not found
      });
    }

    res.status(200).json({
      success: true,
      data: order, // Return the order details
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!", // Handle server error
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
