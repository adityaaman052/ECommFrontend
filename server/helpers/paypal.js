const paypal = require("paypal-rest-sdk");

// Configure PayPal with sandbox mode and credentials
paypal.configure({
  mode: "sandbox", // Use 'sandbox' for testing
  client_id: "ATr594rfFJg20cyuzMhLmDOBenuDs8KNrmPlP7RpqMSfP6KwlqXqVmKv87Cuj2uj_SkaVzT5d6u1xA8J", // Replace with your sandbox client ID
  client_secret: "EH1dsDadQv4WU_dPUj-lD_BGSvkYgB4KNHa7HT52nFVvD-Cu4sYhxiDYuyfKMy8DnBhyh43u03FD2e_O", // Replace with your sandbox client secret
});

module.exports = paypal;
