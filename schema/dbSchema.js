const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = graphql;
const products = require("../model/productModel");
const brands = require("../model/brandModel");

const brandType = new GraphQLObjectType({
  name: "ProductCatagory",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    products: {
      type: new GraphQLList(productType),
      resolve: (pCatagory) => {
        return products.filter((product) => product.brandId === pCatagory.id);
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
      resolve: (product) => {
        // return brands.find((catagory) => catagory.id === product.pCategoryId);
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
      resolve(parent, args) {
        let product = products.findOne({ id: args.id });
        return product;
      },
    },
    brand: {
      type: brandType,
      description: "List of single product Type",
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        let brand = brands.findOne({ id: args.id });
        return brand;
      },
    },
    getProducts: {
      type: new GraphQLList(productType),
      description: "List of all products",
      resolve(parent, args) {
        let product = products.find({});
        return product;
      },
    },
    getBrands: {
      type: new GraphQLList(brandType),
      description: "List of all catagories of products",
      resolve(parent, args) {
        let brand = brands.find({});
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
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        brand: { type: GraphQLString },
        brandId: { type: GraphQLString },
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
    createBrand: {
      type: brandType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        let brand = new brands({
          name: args.name,
        });
        return brand.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
