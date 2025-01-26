# Fragrencia - Perfume Shop Website 🌸

**Fragrencia** is an elegant and aesthetic perfume shop website designed for users to browse, review, and purchase perfumes. It features an intuitive interface, smooth animations, and a fully functional admin panel to manage products and orders. This project is built using React for the frontend, Node.js for the backend, and MongoDB for the database.

## Features ✨

### **Homepage & Design** 🏠
The homepage is designed to provide an aesthetically pleasing experience to the user. It has:
- **Responsive Navbar**: A navigation bar that adjusts for desktop and mobile views.
- **Banners**: Eye-catching banners promoting special offers or new arrivals.
- **Hover Effects**: Smooth hover effects on product cards to enhance user interactivity.
- **Product Card Redirection**: Clicking on a product card redirects the user to the product details page.

### **Product Reviews & Social Sharing** 💬
- **Review Section**: Users can write reviews for products they’ve purchased, contributing to the community and helping others make informed decisions.
- **Social Media Sharing**: Each product page has a share button, allowing users to share their favorite products on various social media platforms.

### **Admin Panel** 👩‍💻
The admin panel enables administrators to:
- **Manage Products**: Add, update, or delete products.
- **Review Orders**: View the order summary and manage the delivery process.

### **User Features** 🛒
- **Product Search**: Users can search for perfumes by brand, making it easier to find specific products.
- **Checkout & Payment**: Users can add shipping addresses, proceed to checkout, and pay through PayPal (sandbox account used for payments).
- **Address Management**: Users can save multiple shipping addresses for future purchases.

### **Tech Stack** 🛠️
- **Frontend**: React, Vite, Tailwind CSS, SHADCN component library, GSAP animations, Redux for state management
- **Backend**: Node.js, Express, MongoDB, Mongoose, Cloudinary (for image storage), PayPal REST SDK (for payments)
- **Authentication**: JWT (JSON Web Tokens) for secure login and authentication

## Folder Structure 📁

### **Client Side** (React)

Here’s the final, updated README file with detailed explanations about the project, folder structure, tech stack, and features:

markdown
Copy
Edit
# Fragrencia - Perfume Shop Website 🌸

**Fragrencia** is an elegant and aesthetic perfume shop website designed for users to browse, review, and purchase perfumes. It features an intuitive interface, smooth animations, and a fully functional admin panel to manage products and orders. This project is built using React for the frontend, Node.js for the backend, and MongoDB for the database.

## Features ✨

### **Homepage & Design** 🏠
The homepage is designed to provide an aesthetically pleasing experience to the user. It has:
- **Responsive Navbar**: A navigation bar that adjusts for desktop and mobile views.
- **Banners**: Eye-catching banners promoting special offers or new arrivals.
- **Hover Effects**: Smooth hover effects on product cards to enhance user interactivity.
- **Product Card Redirection**: Clicking on a product card redirects the user to the product details page.

### **Product Reviews & Social Sharing** 💬
- **Review Section**: Users can write reviews for products they’ve purchased, contributing to the community and helping others make informed decisions.
- **Social Media Sharing**: Each product page has a share button, allowing users to share their favorite products on various social media platforms.

### **Admin Panel** 👩‍💻
The admin panel enables administrators to:
- **Manage Products**: Add, update, or delete products.
- **Review Orders**: View the order summary and manage the delivery process.

### **User Features** 🛒
- **Product Search**: Users can search for perfumes by brand, making it easier to find specific products.
- **Checkout & Payment**: Users can add shipping addresses, proceed to checkout, and pay through PayPal (sandbox account used for payments).
- **Address Management**: Users can save multiple shipping addresses for future purchases.

### **Tech Stack** 🛠️
- **Frontend**: React, Vite, Tailwind CSS, SHADCN component library, GSAP animations, Redux for state management
- **Backend**: Node.js, Express, MongoDB, Mongoose, Cloudinary (for image storage), PayPal REST SDK (for payments)
- **Authentication**: JWT (JSON Web Tokens) for secure login and authentication

## Folder Structure 📁

### **Client Side** (React)
### **Server Side** (Node.js/Express)
client/
│
├── public/                        # Public assets (images, icons, etc.)
│
├── src/
│   ├── assets/                    # Static assets like images, fonts, etc.
│   ├── components/                # React components for different views
│   │   ├── admin-view/            # Admin-specific components
│   │   ├── auth/                  # Authentication components (Login, Signup)
│   │   ├── common/                # Common components like Header, Footer, etc.
│   │   ├── shopping-view/         # Shopping page components (Product Cards, etc.)
│   │   ├── ui/                    # SHADCN UI components
│   │   └── footer/                # Footer component
│   ├── config/                    # Configuration files for environment settings
│   ├── lib/                       # Utility functions (e.g., API requests, helpers)
│   ├── pages/                     # Pages mapped to routes
│   │   ├── admin-view/            # Admin pages like Dashboard, Order Management
│   │   ├── auth/                  # Auth-related pages (Login, Register, etc.)
│   │   ├── page-not-found/        # 404 Page Not Found
│   │   ├── shopping-view/         # Shopping pages (Product List, Cart, etc.)
│   │   └── unauth/                # Unauthenticated user pages (Access Denied)
│   ├── store/                     # Redux state management (Slices for auth, cart, etc.)
│   │   ├── auth-slice/            # Handles auth state (user login/logout)
│   │   ├── admin/                 # Admin-related state (product management)
│   │   ├── common-slice/          # Common state management (cart, etc.)
│   │   ├── shop/                  # Shop-related state (products, orders, cart)
│   ├── app.jsx                    # Main App component (entry point for React app)
│
server/
│
├── controllers/                   # Logic for handling incoming API requests
├── helpers/                       # Utility functions (e.g., JWT token validation)
├── models/                        # Mongoose models for database schemas (Product, User, etc.)
├── routes/                        # Express routes to handle API endpoints
└── server.js                      # Main entry point for the server (starts Express app)


## How the Application Works 💻

### **Frontend** (React)
The frontend is developed using **React** to provide a smooth, component-based architecture. The **Vite** tool is used for fast development builds. Tailwind CSS and SHADCN UI components enhance the visual experience, with animations powered by **GSAP**.

- The **Shopping Page** lists products with hover effects, and clicking on a product card redirects the user to the **Product Details Page**.
- Users can search for products by brand and view detailed information, including reviews and images hosted on **Cloudinary**.
- The **Checkout Page** allows users to enter their address and proceed to payment via **PayPal**.
- The **Admin Panel** allows administrators to manage products, orders, and review user feedback.

### **Backend** (Node.js/Express)
The backend is built using **Node.js** and **Express**, with a **MongoDB** database managed by **Mongoose**. The server handles all API requests for products, user authentication, orders, and reviews. Cloudinary is used to store images, and PayPal's REST SDK facilitates the payment gateway.

- **Controllers** handle business logic for managing products, orders, and reviews.
- **Routes** expose the necessary endpoints for the frontend to interact with (e.g., POST to create products, GET to fetch products, etc.).
- **JWT Authentication** ensures that only authenticated users can access certain routes (e.g., placing an order).

---

## Contributing 🛠️

If you'd like to contribute to the development of **Fragrencia**, feel free to fork this repository and submit a pull request with your changes. Please make sure to follow the coding standards and ensure everything is well-documented.

---

## License 📜

This project is licensed under the **ISC License**.

---

Thank you for checking out **Fragrencia**! Happy shopping! 🎉
