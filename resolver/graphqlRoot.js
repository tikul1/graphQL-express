const products = require("../model/productModel");
const brands = require("../model/brandModel");

const root = {
  getBrands: async (args) => {
    return await brands.find({});
  },
  getProducts: async (args) => {
    let product = await products.find({}).populate("brandId", "name");
    return product;
  },
  brand: async (args) => {
    return await brands.findOne({ id: args.id });
  },

  product: async (args) => {
    return await products.findOne({ id: args.id });
  },
};

module.exports = { root };
