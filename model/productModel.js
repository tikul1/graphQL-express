const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  description: String,
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
});

module.exports = mongoose.model("Product", productSchema);
