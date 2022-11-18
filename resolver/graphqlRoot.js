const products = require("../model/productModel");
const brands = require("../model/brandModel");

const root = {
  getBrands: async (args) => {
    let brand = await brands.find({});
    return brand;
  },
  getProducts: async (args) => {
    let product = await products.find({}).populate("brandId", "name");
    return product;
  },
  brand: async (args) => {
    let brand = await brands.findOne({ id: args.id });
    return brand;
  },
  product: async (args) => {
    return await products.findOne({ id: args.id });
  },
  createProduct: async (args) => {
    return await products.create({ name: args.name, description: args.description, brandId: args.brandId, brand: args.brand });
  },
  createBrand: async (args) => {
    return await brands.create({ name: args.name });
  },
};

module.exports = { root };
