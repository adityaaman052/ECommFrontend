const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Function to register a new user
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if a user with the same email already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with the same email! Please try again",
      });
    }

    // Hash the user's password for secure storage
    const hashPassword = await bcrypt.hash(password, 12);

    // Create a new user instance and save it to the database
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    // Handle errors during registration
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    // Verify the provided password matches the stored hashed password
    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY", // Replace with an environment variable in production
      { expiresIn: "60m" }
    );

    // Set the token as an HTTP-only cookie and return user details
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    // Handle errors during login
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Function to log out a user
const logoutUser = (req, res) => {
  // Clear the token cookie to log out the user
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// Middleware to authenticate users
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  // Check if a token is present in the request cookies
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    // Verify the token and decode its contents
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY"); // Replace with an environment variable in production
    req.user = decoded; // Attach user details to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle invalid or expired tokens
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

// Export the functions and middleware
module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
