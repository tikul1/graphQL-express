const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  description: String,
  brandId: String,
});

module.exports = mongoose.model("Product", productSchema);
