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
const Product=require('./models/Product');

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

mongoose
  .connect("mongodb+srv://adityaamancodex:anurag011206@cluster0.ctkpp.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

const dummyProducts = [
  {
    image: "https://via.placeholder.com/600",
    title: "Wireless Bluetooth Headphones",
    description: "Experience high-quality sound with noise cancellation.",
    category: "Electronics",
    brand: "SoundMax",
    price: 199.99,
    salePrice: 149.99,
    totalStock: 50,
    averageReview: 4.5,
  },
  {
    image: "https://via.placeholder.com/600",
    title: "Smart LED TV 55 Inch",
    description: "Ultra HD 4K display with built-in streaming apps.",
    category: "Home Appliances",
    brand: "VisionTech",
    price: 799.99,
    salePrice: 699.99,
    totalStock: 20,
    averageReview: 4.7,
  },
  {
    image: "https://via.placeholder.com/600",
    title: "Men's Running Shoes",
    description: "Comfortable and lightweight shoes for daily workouts.",
    category: "Fashion",
    brand: "SpeedX",
    price: 69.99,
    salePrice: 59.99,
    totalStock: 100,
    averageReview: 4.3,
  },
  {
    image: "https://via.placeholder.com/600",
    title: "Gaming Laptop",
    description:
      "High-performance laptop with RTX graphics and 16GB RAM.",
    category: "Electronics",
    brand: "GamePro",
    price: 1299.99,
    salePrice: 1199.99,
    totalStock: 10,
    averageReview: 4.8,
  },
  {
    image: "https://via.placeholder.com/600",
    title: "Stainless Steel Cookware Set",
    description: "Durable and stylish cookware set for all your cooking needs.",
    category: "Home & Kitchen",
    brand: "ChefEase",
    price: 249.99,
    salePrice: 199.99,
    totalStock: 30,
    averageReview: 4.6,
  },
  {
    image: "https://via.placeholder.com/600",
    title: "Ergonomic Office Chair",
    description: "Comfortable chair with lumbar support and adjustable height.",
    category: "Furniture",
    brand: "SitRight",
    price: 179.99,
    salePrice: 149.99,
    totalStock: 15,
    averageReview: 4.4,
  },
];

// Function to add products
async function addProducts() {
  try {
    await Product.insertMany(dummyProducts);
    console.log("Products added successfully!");
  } catch (error) {
    console.error("Error adding products:", error);
  }
}

// Call the function
addProducts();

app.use(cookieParser());
app.use(express.json());
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

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
