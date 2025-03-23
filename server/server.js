// Import dotenv and configure it to read the .env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

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

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// ✅ Check if MONGO_URI is properly set (Debugging for Render)
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined! Check your environment variables.");
  process.exit(1); // Stop the server if no MongoDB URI
}

// ✅ Connect to MongoDB (Fix for Render & Local)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, bufferCommands: false })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit if MongoDB fails to connect
  });

// Initialize Express app
const app = express();

// ✅ Fix CORS Allowed Origins for Local & Render
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    credentials: true,
  })
);

// Apply security middlewares
app.use(helmet());
app.use(compression()); // Add compression
app.use(limiter); // Apply rate limiting

// Use middlewares for cookie parsing and JSON body parsing
app.use(cookieParser());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Define routes for different API endpoints
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

// ✅ Ensure the Server Always Binds to a Port (Fix for Render)
const PORT = process.env.PORT || 10000; // Render assigns PORT dynamically
const HOST = "0.0.0.0"; // Required for Render

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});

// ✅ Increase Keep-Alive Timeout to Avoid Worker Crashes on Render
server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds

module.exports = app; // Export for potential testing or Vercel use
