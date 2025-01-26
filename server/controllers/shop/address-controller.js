const Address = require("../../models/Address");

// Function to add a new address
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    // Validate required fields
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Create a new Address document
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });

    // Save the address to the database
    await newlyCreatedAddress.save();

    // Respond with the newly created address
    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    // Handle errors during address creation
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Function to fetch all addresses for a specific user
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    // Retrieve all addresses for the user
    const addressList = await Address.find({ userId });

    // Respond with the list of addresses
    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    // Handle errors during data retrieval
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Function to edit an existing address
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    // Validate userId and addressId
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    // Find and update the address
    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId }, // Match address by ID and userId
      formData, // Update fields with the provided data
      { new: true } // Return the updated document
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Respond with the updated address
    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    // Handle errors during update
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Function to delete an address
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    // Validate userId and addressId
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    // Find and delete the address
    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (e) {
    // Handle errors during deletion
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Export the functions for use in other parts of the application
module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
