// Import dotenv and configure it to read the .env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");

// Database connection using Mongoose with credentials from .env file
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Initialize Express app
const app = express();

// Define the port for the server to run on (from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// Set up CORS (Cross-Origin Resource Sharing) configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend requests from this origin
    methods: ["GET", "POST", "DELETE", "PUT"], // Allow these HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ], // Allow these headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Use middlewares for cookie parsing and JSON body parsing
app.use(cookieParser()); 
app.use(express.json());

// Define routes for different API endpoints
app.use("/api/auth", authRouter); // Auth-related routes
app.use("/api/admin/products", adminProductsRouter); // Admin product routes
app.use("/api/admin/orders", adminOrderRouter); // Admin order routes

app.use("/api/shop/products", shopProductsRouter); // Shop product routes
app.use("/api/shop/cart", shopCartRouter); // Shop cart routes
app.use("/api/shop/address", shopAddressRouter); // Shop address routes
app.use("/api/shop/order", shopOrderRouter); // Shop order routes
app.use("/api/shop/search", shopSearchRouter); // Shop search routes
app.use("/api/shop/review", shopReviewRouter); // Shop review routes

app.use("/api/common/feature", commonFeatureRouter); // Common feature routes

// Start the server
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
