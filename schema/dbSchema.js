const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLNonNull } = graphql;
const products = require("../model/productModel");
const brands = require("../model/brandModel");

const brandType = new GraphQLObjectType({
  name: "ProductCatagory",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    products: {
      type: new GraphQLList(productType),
      resolve: async (pCatagory) => {
        let product = await products.find({ brandId: pCatagory.id });
        // console.log(product);
        let result = product.filter((p) => p.brandId.equals(pCatagory.id));
        // console.log(result);
        return product;
      },
    },
  }),
});

const productType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    brandId: { type: new GraphQLNonNull(GraphQLString) },
    brand: {
      type: brandType,
      resolve: async (product) => {
        let brand = await brands.findById({ _id: product.brandId });
        return brand;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    product: {
      type: productType,
      description: "List of single product",
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        let product = await products.findOne({ id: args.id });
        return product;
      },
    },
    brand: {
      type: brandType,
      description: "List of single product Type",
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        let brand = await brands.findOne({ id: args.id });
        return brand;
      },
    },
    getProducts: {
      type: new GraphQLList(productType),
      description: "List of all products",
      async resolve(parent, args) {
        let product = await products.find({});
        return product;
      },
    },
    getBrands: {
      type: new GraphQLList(brandType),
      description: "List of all catagories of products",
      async resolve(parent, args) {
        let brand = await brands.find({});
        return brand;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createProduct: {
      type: productType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        brand: { type: new GraphQLNonNull(GraphQLString) },
        brandId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let product = new products({
          name: args.name,
          brand: args.brand,
          description: args.description,
          brandId: args.brandId,
        });
        return product.save();
      },
    },
    updateProduct: {
      type: productType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        brand: { type: new GraphQLNonNull(GraphQLString) },
        brandId: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        let product = await products.findOne({ id: args.id });
        // console.log(product);
        Object.assign(product, args);
        // console.log(product);
        // console.log(args.id);
        return product.save();
      },
    },
    createBrand: {
      type: brandType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let brand = new brands({
          name: args.name,
        });
        return brand.save();
      },
    },
    updateBrand: {
      type: brandType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        let brand = await brands.findOne({ id: args.id });
        Object.assign(brand, args);
        return brand.save();
      },
    },
    deleteProduct: {
      type: brandType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        let product = await products.findOneAndRemove({ id: args.id });
        return product;
      },
    },
    deleteBrand: {
      type: productType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        let brand = await brands.findOneAndRemove({ id: args.id });
        return brand;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
