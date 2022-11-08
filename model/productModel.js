const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    pCatagory: String,
    decription: String,
    pCatagoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
