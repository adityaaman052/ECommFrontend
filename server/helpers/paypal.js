const paypal = require("paypal-rest-sdk");

// Configure PayPal with sandbox mode and credentials
paypal.configure({
  mode: "sandbox", // Use 'sandbox' for testing
  client_id: "your-sandbox-client-id", // Replace with your sandbox client ID
  client_secret: "your-sandbox-client-secret", // Replace with your sandbox client secret
});

module.exports = paypal;
