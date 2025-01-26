# Fragrencia - Perfume Shop Website 🧴🌸

## Overview

**Fragrencia** is an e-commerce web application for a perfume shop. The website is designed to provide a seamless shopping experience for users, featuring an aesthetic design with a responsive navbar, product browsing, product details, reviews, and checkout functionalities. Additionally, it includes an admin panel for managing products and order summaries.

The project is built with the MERN stack and integrates third-party services like PayPal 💳 and Cloudinary ☁️ for payments and image management, respectively.

## Features

### 1. **Homepage** 🏠

The **homepage** is the first interaction point for users, and it is designed to be visually appealing and user-friendly. It features:
- **Responsive Navbar**: The navigation bar adjusts based on screen size 📱💻, ensuring that users on mobile, tablet, or desktop devices have a consistent experience. The navbar allows easy access to different sections of the site such as Home, Products, Checkout, and User Account.
- **Banners**: The homepage includes large, attractive banners that can be used to showcase new arrivals, seasonal promotions, or best-selling perfumes 🎉. These banners are strategically placed to capture the user's attention and encourage engagement.
- **Aesthetic Design**: As a perfume shop, the design reflects a sense of elegance and luxury 💅. The color palette includes soft, sophisticated tones, which make the user feel the essence of fragrance while browsing. The layout emphasizes clean lines, high-quality product images, and subtle animations for an enhanced browsing experience.
- **Hover Effects on Product Cards**: Each product card includes interactive hover effects ✨. When users hover over a product, additional information, such as the perfume name, price, and a brief description, is revealed. This feature adds a dynamic touch to the UI and encourages users to explore the products further.

### 2. **Product Page** 🛍️

When a user clicks on any product card, they are redirected to the **Product Details Page**, where they can find:
- **Detailed Description**: Information about the perfume, including its fragrance notes, size options, and any other important details 📝.
- **Review Section**: This section allows users to leave reviews and ratings ⭐ for the product based on their experience. Reviews help other customers make informed decisions, providing social proof of the product's quality.
- **Social Media Share Button**: The product details page also includes a share button, allowing users to share the product on various social media platforms like Facebook, Twitter, Instagram, and more 📲. This feature is designed to drive more traffic and awareness to the website by enabling users to easily share products they like.

### 3. **Product Reviews and Ratings** 🌟

The **Review Section** is integrated into both the product page and the admin panel. It allows users to share their experiences with a particular product by leaving a review and rating (out of 5 stars). Key features include:
- **User Reviews**: Customers can write reviews about the perfume's scent, quality, and overall satisfaction 💬. This helps new customers in their buying decision-making process.
- **Rating System**: Users can rate a product on a scale of 1 to 5 stars 🌠. The higher the rating, the more likely it is to attract new customers.
- **Admin Management**: Admins can moderate reviews, ensuring that the content posted is appropriate and relevant 👩‍💻.

### 4. **Social Media Share Functionality** 📤

The **share functionality** makes it easy for users to share their favorite products with their friends and followers on social media platforms like Facebook, Twitter, Instagram, and others. This is achieved through a dedicated **Share Button** integrated into the product details page. By clicking this button:
- Users can share a product's details, including an image, description, and link, directly to their social media accounts 📸.
- This not only helps in boosting the product's visibility but also generates organic traffic for the website, as it encourages social interaction and word-of-mouth marketing.

### 5. **Search Functionality** 🔍

The website allows users to search for perfumes based on:
- **Brand**: Users can search for perfumes by brand names (e.g., Chanel, Gucci, Dior, etc.). This makes it easier for customers who are loyal to a particular brand or want to explore perfumes from specific manufacturers.

### 6. **Checkout and Payment** 💳

Users can proceed to checkout by adding their shipping address and selecting a payment method. The website integrates **PayPal** for secure payment processing. A **dummy sandbox PayPal account** is used for testing transactions during development, which ensures that the payment flow works smoothly in a real-world scenario.

### 7. **Admin Panel** ⚙️

The **Admin Panel** is designed for the website's admin to manage products and orders. Key features include:
- **Add, Update, and Delete Products**: Admins have full control over the product catalog 🛒. They can add new products, update existing ones, and delete products that are no longer in stock or available.
- **Order Summary**: Admins can review all the orders placed by users, view the order status (pending, shipped, completed), and initiate the delivery process once the order is confirmed 📦.
- **Delivery Management**: Admins can manage the order fulfillment process by updating the status of each order and ensuring it is delivered to customers in a timely manner 🚚.

### 8. **Cloudinary Integration** ☁️

**Cloudinary** is used for managing and storing images of the products. It ensures that the product images are served with high quality and optimized for web performance ⚡. Cloudinary also provides features like image transformation, which allows the website to dynamically adjust images based on size and resolution.

### 9. **SHADCN Components** 🎨

The frontend uses **SHADCN** to import customizable UI components that help in building accessible and high-quality design elements. SHADCN enables:
- Consistent styling across all UI elements such as buttons, modals, dropdowns, and more 🧩.
- Fast, reusable components that ensure the application looks and feels polished and professional 💼.

## Backend Functionality

The backend is built using **Node.js** with **Express** to handle API routes, and **MongoDB** is used for data storage. The following models are used in the backend:

- **User Model**: Stores user details like name, email, and password.
- **Product Model**: Stores product details like name, description, price, image, and brand.
- **Order Model**: Stores the order details placed by users, including shipping addresses, payment status, and products ordered.
- **Cart Model**: Manages the shopping cart for users, storing selected products before checkout.
- **Review Model**: Stores the reviews and ratings given by users for each product.
- **Feature Model**: Used to store special features for the products (e.g., "Best Seller," "Limited Edition").
- **Address Model**: Stores multiple shipping addresses for users.

### Routes & Controllers
- The backend routes handle different operations, including:
  - **Authentication**: User login, registration, and authentication using JWT (JSON Web Token).
  - **Product Routes**: Add, delete, update, and get product information.
  - **Order Routes**: Place, update, and fetch orders.
  - **Review Routes**: Post and fetch product reviews.
  - **Cart Routes**: Add and remove items from the cart, as well as fetch the cart contents.

## Technologies Used

### Frontend
- **React**: JavaScript library for building the user interface.
- **Vite**: A fast and optimized build tool for React projects.
- **Tailwind CSS**: Utility-first CSS framework for building responsive layouts and designs quickly.
- **GSAP**: Animation library for creating smooth and interactive animations.
- **Framer Motion**: Animation library for React to create smooth transitions and animations.
- **React Router**: For client-side routing and navigation.
- **Radix UI**: Low-level UI components for building accessible and customizable design elements.
- **SHADCN**: Component library used to import UI elements that are easy to customize and integrate.

### Backend
- **Node.js**: JavaScript runtime for building the server-side of the application.
- **Express**: Web framework for Node.js that simplifies routing and middleware usage.
- **MongoDB & Mongoose**: NoSQL database to store data for products, orders, reviews, etc.
- **JWT (JSON Web Token)**: For handling user authentication and authorization.
- **bcryptjs**: Library for securely hashing passwords.
- **Paypal REST SDK**: Integration of PayPal payments for secure checkout.
- **Cloudinary**: Used for image storage and management.

## Conclusion

**Fragrencia** offers a fully functional perfume e-commerce platform that allows users to browse and purchase perfumes, leave reviews, and make payments. The admin panel provides easy management of products and orders, while the backend ensures secure transactions and user data management.

This project is built using modern web technologies and integrates with third-party services to enhance the user experience, including PayPal for payments and Cloudinary for image management.

---

